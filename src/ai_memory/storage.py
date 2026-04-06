from __future__ import annotations

import json
import re
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Iterable, List


ROOT_DIR = Path.cwd()
MEMORY_DIR = ROOT_DIR / "memory"
PROFILE_DIR = MEMORY_DIR / "profiles"
CONVERSATIONS_DIR = MEMORY_DIR / "conversations"
SNAPSHOT_DIR = MEMORY_DIR / "snapshots"
TEMPLATES_DIR = ROOT_DIR / "templates"


@dataclass
class ConversationRecord:
    slug: str
    title: str
    model: str
    created_at: str
    tags: List[str]
    path: Path


def slugify(text: str) -> str:
    text = text.strip().lower()
    text = re.sub(r"[^a-z0-9\u4e00-\u9fff]+", "-", text)
    text = re.sub(r"-{2,}", "-", text).strip("-")
    return text or "conversation"


def ensure_base_structure() -> None:
    PROFILE_DIR.mkdir(parents=True, exist_ok=True)
    CONVERSATIONS_DIR.mkdir(parents=True, exist_ok=True)
    SNAPSHOT_DIR.mkdir(parents=True, exist_ok=True)

    template_pairs = [
        (TEMPLATES_DIR / "user.md", PROFILE_DIR / "user.md"),
        (TEMPLATES_DIR / "preferences.md", PROFILE_DIR / "preferences.md"),
    ]

    for src, dst in template_pairs:
        if src.exists() and not dst.exists():
            dst.write_text(src.read_text(encoding="utf-8"), encoding="utf-8")


def create_conversation(title: str, model: str, tags: Iterable[str]) -> ConversationRecord:
    ensure_base_structure()
    now = datetime.now()
    date_prefix = now.strftime("%Y-%m-%d")
    year_dir = CONVERSATIONS_DIR / now.strftime("%Y")
    year_dir.mkdir(parents=True, exist_ok=True)

    slug = f"{date_prefix}-{slugify(title)}"
    convo_dir = year_dir / slug
    counter = 2
    while convo_dir.exists():
        slug = f"{date_prefix}-{slugify(title)}-{counter}"
        convo_dir = year_dir / slug
        counter += 1

    convo_dir.mkdir(parents=True, exist_ok=False)

    tag_list = [tag.strip() for tag in tags if tag.strip()]
    meta = {
        "title": title,
        "model": model,
        "created_at": now.isoformat(timespec="seconds"),
        "tags": tag_list,
        "status": "draft",
    }

    (convo_dir / "meta.json").write_text(
        json.dumps(meta, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    (convo_dir / "transcript.md").write_text(
        f"# {title}\n\n"
        "## 原始对话\n\n"
        "把完整对话粘贴到这里。\n",
        encoding="utf-8",
    )
    (convo_dir / "summary.md").write_text(
        f"# {title} 摘要\n\n"
        "## 这次对话解决了什么\n\n"
        "- \n\n"
        "## AI 后续应该记住什么\n\n"
        "- \n\n"
        "## 可复用约束 / 偏好 / 决策\n\n"
        "- \n",
        encoding="utf-8",
    )

    return ConversationRecord(
        slug=slug,
        title=title,
        model=model,
        created_at=meta["created_at"],
        tags=tag_list,
        path=convo_dir,
    )


def load_conversation_dirs() -> List[Path]:
    if not CONVERSATIONS_DIR.exists():
        return []
    return sorted(
        [path for path in CONVERSATIONS_DIR.glob("*/*") if path.is_dir()],
        reverse=True,
    )


def read_text_if_exists(path: Path) -> str:
    if not path.exists():
        return ""
    return path.read_text(encoding="utf-8").strip()


def build_context(limit: int = 8) -> Path:
    ensure_base_structure()
    profile = read_text_if_exists(PROFILE_DIR / "user.md")
    preferences = read_text_if_exists(PROFILE_DIR / "preferences.md")

    sections = [
        "# Active Context",
        "",
        "这是一份给新 AI 模型使用的用户长期上下文。",
        "请优先遵守这里的长期信息，并结合最近的重要对话继续协作。",
        "",
        "## 用户画像",
        "",
        profile or "_尚未填写 user.md_",
        "",
        "## 偏好与协作方式",
        "",
        preferences or "_尚未填写 preferences.md_",
        "",
        "## 最近重要对话摘要",
        "",
    ]

    for convo_dir in load_conversation_dirs()[:limit]:
        meta_path = convo_dir / "meta.json"
        summary_path = convo_dir / "summary.md"
        meta = {}
        if meta_path.exists():
            meta = json.loads(meta_path.read_text(encoding="utf-8"))
        title = meta.get("title", convo_dir.name)
        model = meta.get("model", "unknown")
        created_at = meta.get("created_at", "")
        tags = ", ".join(meta.get("tags", []))
        summary = read_text_if_exists(summary_path) or "_尚未填写 summary.md_"

        sections.extend(
            [
                f"### {title}",
                "",
                f"- 时间: {created_at}",
                f"- 模型: {model}",
                f"- 标签: {tags or '无'}",
                "",
                summary,
                "",
            ]
        )

    output_path = SNAPSHOT_DIR / "active_context.md"
    output_path.write_text("\n".join(sections).strip() + "\n", encoding="utf-8")
    return output_path
