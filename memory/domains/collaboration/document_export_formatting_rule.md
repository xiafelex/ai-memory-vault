# Document Export Formatting Rule

## 1. Purpose

This file records the default formatting rule to follow when exporting report-style content to Word documents.

It is intended to be reused for future `.docx` exports, especially when the user requests a formal paper-like or standard-style layout.

The current rule is based on the user's provided formatting reference file:

- `GBT+7713.2-2022.pdf`

Because text extraction from the reference PDF is partially garbled, the rule below captures the stable, usable layout requirements applied in practice rather than a clause-by-clause transcript.

## 2. Default Use Case

Use this rule when the user asks to:

- export a report to Word
- generate a formal `.docx`
- apply a paper-style layout
- format a management or technical document to a standard-looking Chinese document style

If the user provides a more specific template later, that template overrides this default.

## 3. Page Setup

- Paper size: `A4`
- Top margin: about `2.54 cm`
- Bottom margin: about `2.54 cm`
- Left margin: about `3.0 cm`
- Right margin: about `2.5 cm`

## 4. Font Rules

### 4.1 Main title

- Chinese font: `黑体`
- Centered
- Larger than body text
- Bold

### 4.2 Section headings

- Chinese font: `黑体`
- Bold
- Clear hierarchy by size difference

### 4.3 Body text

- Chinese font: `宋体`
- Western font: `Times New Roman`
- Standard body size close to formal Chinese document conventions

### 4.4 Table text

- Chinese font: `宋体`
- Heading cells can use `黑体`
- Slightly smaller than body text

## 5. Paragraph Rules

- Body text uses first-line indent
- Line spacing should be fixed and readable
- Section headings should keep moderate space before and after
- Body paragraphs should avoid excessive blank spacing

## 6. Table Rules

- Use full borders when the table is serving as evidence or structured support
- Table text can be slightly smaller than正文
- Header row should be visually distinct
- Keep tables readable rather than compressed for density

## 7. Page Number Rule

- Add centered page number in the footer by default

## 8. Practical Export Principle

When exporting Word documents, the goal is not only to make them look formal.

The formatting should support:

- clear hierarchy
- stable readability
- evidence presentation
- direct transition from report text to shareable document

In other words, formatting should help the structure, not compete with the content.

## 9. Default Application Pattern

Unless the user gives a stronger template, Word export should default to:

- A4 layout
- 黑体 titles
- 宋体 body
- readable fixed line spacing
- first-line paragraph indent
- bordered tables
- footer page numbers

## 10. Caution

If the user later provides:

- a university template
- a company red-head template
- a journal template
- a contract-specific template

those should take priority over this rule.
