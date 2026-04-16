#!/bin/zsh
set -euo pipefail

repo_root=$(git rev-parse --show-toplevel 2>/dev/null || true)
if [[ -z "${repo_root}" ]]; then
  echo "当前目录不在 Git 仓库中。"
  exit 1
fi

if [[ $# -lt 2 ]]; then
  cat <<'EOF'
用法：
  ./scripts/batch_push_untracked.sh <目标目录> <提交说明前缀> [单批上限MB]
  ./scripts/batch_push_untracked.sh auto <提交说明前缀> [单批上限MB]

示例：
  ./scripts/batch_push_untracked.sh "Felex 资料/管道数字化课题/论文" "Add pipeline paper PDFs"
  ./scripts/batch_push_untracked.sh "Felex 资料/管道数字化课题/会议纪要" "Add meeting PDFs" 100
  ./scripts/batch_push_untracked.sh auto "Add raw source files" 100

说明：
  1. 只处理未跟踪文件（untracked）。
  2. 默认单批上限为 100MB。
  3. 如果单个文件超过上限，会单独成批提交。
  4. 文件按体积从小到大分批，并在每批后自动 push。
  5. auto 模式会自动识别仓库中未跟踪的原始资料文件：
     pdf / doc / docx / xls / xlsx
EOF
  exit 1
fi

target_dir="$1"
commit_prefix="$2"
max_mb="${3:-100}"

cd "${repo_root}"

if [[ "${target_dir}" != "auto" && ! -d "${target_dir}" ]]; then
  echo "目标目录不存在：${target_dir}"
  exit 1
fi

max_bytes=$((max_mb * 1024 * 1024))

tmp_untracked=$(mktemp)
tmp_sorted=$(mktemp)
tmp_batch=$(mktemp)
trap 'rm -f "$tmp_untracked" "$tmp_sorted" "$tmp_batch"' EXIT

python3 - <<'PY' "${tmp_untracked}"
import subprocess
import sys

output_file = sys.argv[1]
result = subprocess.run(
    ["git", "ls-files", "--others", "--exclude-standard", "-z"],
    check=True,
    stdout=subprocess.PIPE,
)
items = [p for p in result.stdout.decode("utf-8", errors="surrogateescape").split("\x00") if p]
with open(output_file, "w", encoding="utf-8") as out:
    for item in items:
        out.write(item)
        out.write("\n")
PY

python3 - <<'PY' "${target_dir}" "${tmp_untracked}" "${tmp_sorted}"
import os
import sys

target_dir = os.path.normpath(sys.argv[1])
status_file = sys.argv[2]
output_file = sys.argv[3]
allowed_exts = {".pdf", ".doc", ".docx", ".xls", ".xlsx"}

paths = []
with open(status_file, "r", encoding="utf-8") as f:
    for raw in f:
        p = raw.rstrip("\n")
        if not p:
            continue
        norm = os.path.normpath(p)
        if not os.path.isfile(norm):
            continue
        try:
            size = os.path.getsize(norm)
        except OSError:
            continue

        if target_dir == "auto":
            _, ext = os.path.splitext(norm)
            if ext.lower() in allowed_exts:
                paths.append((size, norm))
        else:
            if norm == target_dir or norm.startswith(target_dir + os.sep):
                paths.append((size, norm))

paths.sort(key=lambda x: (x[0], x[1]))

with open(output_file, "w", encoding="utf-8") as out:
    for size, norm in paths:
        out.write(f"{size}\t{norm}\n")
PY

total_files=$(wc -l < "${tmp_sorted}" | tr -d ' ')
if [[ "${total_files}" == "0" ]]; then
  if [[ "${target_dir}" == "auto" ]]; then
    echo "仓库中没有可处理的未跟踪原始资料文件。"
  else
    echo "目标目录下没有可处理的未跟踪文件：${target_dir}"
  fi
  exit 0
fi

if [[ "${target_dir}" == "auto" ]]; then
  echo "准备处理 ${total_files} 个未跟踪原始资料文件（auto 模式）"
else
  echo "准备处理 ${total_files} 个未跟踪文件，目标目录：${target_dir}"
fi
echo "单批上限：${max_mb}MB"

batch_no=1
batch_bytes=0
batch_count=0

flush_batch() {
  local current_batch_no="$1"
  local current_batch_bytes="$2"
  local current_batch_count="$3"

  if [[ "${current_batch_count}" -eq 0 ]]; then
    return 0
  fi

  echo ""
  echo "开始提交第 ${current_batch_no} 批：${current_batch_count} 个文件，约 $((current_batch_bytes / 1024 / 1024))MB"
  sed '/^$/d' "${tmp_batch}"

  while IFS= read -r file; do
    [[ -z "${file:-}" ]] && continue
    git add -- "$file"
  done < "${tmp_batch}"

  git commit -m "${commit_prefix} (batch ${current_batch_no})"
  git push
  : > "${tmp_batch}"
}

while IFS=$'\t' read -r size file; do
  [[ -z "${file:-}" ]] && continue

  if [[ "${batch_count}" -gt 0 ]] && (( batch_bytes + size > max_bytes )); then
    flush_batch "${batch_no}" "${batch_bytes}" "${batch_count}"
    batch_no=$((batch_no + 1))
    batch_bytes=0
    batch_count=0
  fi

  echo "${file}" >> "${tmp_batch}"
  batch_bytes=$((batch_bytes + size))
  batch_count=$((batch_count + 1))

  if (( size > max_bytes )); then
    flush_batch "${batch_no}" "${batch_bytes}" "${batch_count}"
    batch_no=$((batch_no + 1))
    batch_bytes=0
    batch_count=0
  fi
done < "${tmp_sorted}"

flush_batch "${batch_no}" "${batch_bytes}" "${batch_count}"

echo ""
echo "全部批次处理完成。"
