from __future__ import annotations

import argparse
from pathlib import Path

from .storage import (
    build_context,
    create_conversation,
    ensure_base_structure,
    expand_tags,
    export_pdf_text,
    find_pdf_files,
)


def cmd_init(_: argparse.Namespace) -> int:
    ensure_base_structure()
    print("Initialized memory vault in ./memory")
    return 0


def cmd_add(args: argparse.Namespace) -> int:
    tags = []
    if args.tags:
        tags = [item.strip() for item in args.tags.split(",")]
    tags = expand_tags(tags, category=args.category)

    record = create_conversation(
        title=args.title,
        model=args.model,
        tags=tags,
    )
    print(f"Created conversation: {record.path}")
    return 0


def cmd_build_context(args: argparse.Namespace) -> int:
    output = build_context(limit=args.limit)
    print(f"Built context: {output}")
    return 0


def cmd_extract_pdf(args: argparse.Namespace) -> int:
    input_path = Path(args.input).expanduser().resolve()
    pdf_files = find_pdf_files(input_path)
    if not pdf_files:
        print(f"No PDF files found: {input_path}")
        return 1

    source_root = input_path if input_path.is_dir() else None
    for pdf_file in pdf_files:
        output = export_pdf_text(pdf_file, source_root=source_root)
        print(f"Extracted: {pdf_file} -> {output}")
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="memory-vault",
        description="Git-based AI memory vault.",
    )
    subparsers = parser.add_subparsers(dest="command", required=True)

    init_parser = subparsers.add_parser("init", help="Initialize the memory structure.")
    init_parser.set_defaults(func=cmd_init)

    add_parser = subparsers.add_parser("add", help="Add a conversation folder.")
    add_parser.add_argument("--title", required=True, help="Conversation title.")
    add_parser.add_argument("--model", default="unknown", help="Model name.")
    add_parser.add_argument(
        "--category",
        default="",
        choices=["", "tech", "management", "expression", "thinking"],
        help="Primary conversation category.",
    )
    add_parser.add_argument(
        "--tags",
        default="",
        help="Comma-separated tags. Category presets are added automatically when --category is used.",
    )
    add_parser.set_defaults(func=cmd_add)

    build_parser_cmd = subparsers.add_parser(
        "build-context",
        help="Build a portable context snapshot for other AI models.",
    )
    build_parser_cmd.add_argument(
        "--limit",
        type=int,
        default=8,
        help="Maximum number of recent conversation summaries.",
    )
    build_parser_cmd.set_defaults(func=cmd_build_context)

    extract_parser = subparsers.add_parser(
        "extract-pdf",
        help="Extract text from one PDF file or all PDFs inside a directory.",
    )
    extract_parser.add_argument(
        "--input",
        required=True,
        help="Path to a PDF file or a directory containing PDFs.",
    )
    extract_parser.set_defaults(func=cmd_extract_pdf)

    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    return args.func(args)


if __name__ == "__main__":
    raise SystemExit(main())
