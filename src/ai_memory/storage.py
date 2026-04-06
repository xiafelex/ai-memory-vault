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
DOMAINS_DIR = MEMORY_DIR / "domains"
TEMPLATES_DIR = ROOT_DIR / "templates"

TAG_PRESETS = {
    "tech": [
        "technical-rnd",
        "pipeline-digitalization",
    ],
    "management": [
        "management-innovation",
        "organization",
    ],
    "expression": [
        "reporting-expression",
        "writing",
    ],
    "thinking": [
        "learning-thinking",
        "strategy",
    ],
}


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
    DOMAINS_DIR.mkdir(parents=True, exist_ok=True)
    (DOMAINS_DIR / "career").mkdir(parents=True, exist_ok=True)
    (DOMAINS_DIR / "collaboration").mkdir(parents=True, exist_ok=True)
    (DOMAINS_DIR / "strategy").mkdir(parents=True, exist_ok=True)
    (DOMAINS_DIR / "technology").mkdir(parents=True, exist_ok=True)

    template_pairs = [
        (TEMPLATES_DIR / "user.md", PROFILE_DIR / "user.md"),
        (TEMPLATES_DIR / "preferences.md", PROFILE_DIR / "preferences.md"),
        (TEMPLATES_DIR / "conversation_tags.md", PROFILE_DIR / "conversation_tags.md"),
        (TEMPLATES_DIR / "domain_registry.md", PROFILE_DIR / "domain_registry.md"),
        (TEMPLATES_DIR / "work_history.md", DOMAINS_DIR / "career" / "work_history.md"),
        (TEMPLATES_DIR / "role_definition.md", DOMAINS_DIR / "career" / "role_definition.md"),
        (TEMPLATES_DIR / "ai_expectations.md", DOMAINS_DIR / "collaboration" / "ai_expectations.md"),
        (TEMPLATES_DIR / "writing_style.md", DOMAINS_DIR / "collaboration" / "writing_style.md"),
        (TEMPLATES_DIR / "long_term_goals.md", DOMAINS_DIR / "strategy" / "long_term_goals.md"),
        (TEMPLATES_DIR / "context_philosophy.md", DOMAINS_DIR / "strategy" / "context_philosophy.md"),
        (TEMPLATES_DIR / "pipeline_digitalization.md", DOMAINS_DIR / "technology" / "pipeline_digitalization.md"),
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
    (convo_dir / "evidence.md").write_text(
        f"# {title} 证据与原话\n\n"
        "## 原话摘录\n\n"
        "- 原话：\n"
        "  解释：\n"
        "  分类：\n\n"
        "## 可直接作为长期证据的内容\n\n"
        "- \n\n"
        "## 需要后续核实的点\n\n"
        "- \n",
        encoding="utf-8",
    )
    (convo_dir / "open_questions.md").write_text(
        f"# {title} 待确认问题\n\n"
        "## 高优先级\n\n"
        "- \n\n"
        "## 中优先级\n\n"
        "- \n\n"
        "## 已确认\n\n"
        "- \n",
        encoding="utf-8",
    )
    (convo_dir / "domain_updates.md").write_text(
        f"# {title} 主题更新判定\n\n"
        "## 这次对话涉及哪些固定主题\n\n"
        "- 主题：\n"
        "  是否已有：\n"
        "  是否需要更新：\n"
        "  对应文件：\n"
        "  更新说明：\n\n"
        "## 需要新建的主题\n\n"
        "- \n\n"
        "## 本次不需要更新的主题\n\n"
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


def expand_tags(tags: Iterable[str], category: str = "") -> List[str]:
    normalized = []
    seen = set()

    for tag in tags:
        clean = tag.strip()
        if clean and clean not in seen:
            normalized.append(clean)
            seen.add(clean)

    category_key = category.strip().lower()
    if category_key:
        preset = TAG_PRESETS.get(category_key, [])
        if category_key not in seen:
            normalized.append(category_key)
            seen.add(category_key)
        for tag in preset:
            if tag not in seen:
                normalized.append(tag)
                seen.add(tag)

    return normalized


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


def normalize_markdown_body(text: str) -> str:
    if not text:
        return ""
    lines = text.splitlines()
    if lines and lines[0].startswith("# "):
        lines = lines[1:]
        while lines and not lines[0].strip():
            lines = lines[1:]
    return "\n".join(lines).strip()


def build_context(limit: int = 8) -> Path:
    ensure_base_structure()
    profile = normalize_markdown_body(read_text_if_exists(PROFILE_DIR / "user.md"))
    preferences = normalize_markdown_body(read_text_if_exists(PROFILE_DIR / "preferences.md"))
    classification = normalize_markdown_body(read_text_if_exists(PROFILE_DIR / "classification.md"))
    domain_registry = normalize_markdown_body(read_text_if_exists(PROFILE_DIR / "domain_registry.md"))
    work_history = normalize_markdown_body(read_text_if_exists(DOMAINS_DIR / "career" / "work_history.md"))
    role_definition = normalize_markdown_body(read_text_if_exists(DOMAINS_DIR / "career" / "role_definition.md"))
    ai_expectations = normalize_markdown_body(read_text_if_exists(DOMAINS_DIR / "collaboration" / "ai_expectations.md"))
    long_term_goals = normalize_markdown_body(read_text_if_exists(DOMAINS_DIR / "strategy" / "long_term_goals.md"))
    context_philosophy = normalize_markdown_body(read_text_if_exists(DOMAINS_DIR / "strategy" / "context_philosophy.md"))
    pipeline_digitalization = normalize_markdown_body(read_text_if_exists(DOMAINS_DIR / "technology" / "pipeline_digitalization.md"))

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
        "## 记忆分类框架",
        "",
        classification or "_尚未填写 classification.md_",
        "",
        "## 主题主档案索引",
        "",
        domain_registry or "_尚未填写 domain_registry.md_",
        "",
        "## 关键主题主档案",
        "",
        "### 工作经历时间线",
        "",
        work_history or "_尚未填写 work_history.md_",
        "",
        "### 角色定义",
        "",
        role_definition or "_尚未填写 role_definition.md_",
        "",
        "### AI 协作期待",
        "",
        ai_expectations or "_尚未填写 ai_expectations.md_",
        "",
        "### 长期目标",
        "",
        long_term_goals or "_尚未填写 long_term_goals.md_",
        "",
        "### Context 哲学",
        "",
        context_philosophy or "_尚未填写 context_philosophy.md_",
        "",
        "### 管道数字化主线",
        "",
        pipeline_digitalization or "_尚未填写 pipeline_digitalization.md_",
        "",
        "## 使用提醒",
        "",
        "- `summary.md` 存结论层",
        "- `evidence.md` 存原话证据层",
        "- `open_questions.md` 存待确认问题层",
        "- `domain_updates.md` 存主题更新判定",
        "- `memory/domains/` 存跨对话聚合后的固定主题",
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
        summary = normalize_markdown_body(read_text_if_exists(summary_path)) or "_尚未填写 summary.md_"

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
