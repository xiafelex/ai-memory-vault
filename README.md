# AI Memory Vault

一个从零开始的、基于 Git 的 AI 对话记忆仓库。

它解决的是这件事：

- 你和不同 AI 模型的重要对话，可以被结构化保存到仓库里
- 每次切换模型时，都能导出一份“与你有关的上下文”
- 这份上下文不依赖某一个平台，核心资产是你自己的 Git 仓库

## 设计原则

- 数据归你：对话保存在本地 Markdown 和 JSON 中，再同步到 GitHub
- 可读可检索：原始对话保留，可额外写摘要、标签、长期偏好
- 模型无关：任何模型只要能读取文本，就能使用这套上下文
- 先简单后增强：先做本地可用版本，再加自动化、语义检索、向量数据库

## 仓库结构

```text
memory/
  profiles/
    user.md                 # 你的长期画像
    preferences.md          # 偏好、风格、工作方式
    conversation_tags.md    # 会话标签模板
    domain_registry.md      # 固定主题索引
  domains/
    career/
    collaboration/
    strategy/
    technology/
  conversations/
    2026/
      2026-04-06-my-first-session/
        meta.json
        transcript.md
        summary.md
        evidence.md
        open_questions.md
        domain_updates.md
  snapshots/
    active_context.md       # 给新模型直接喂的上下文
src/
  ai_memory/
    cli.py
    storage.py
templates/
  user.md
  preferences.md
```

## 第一版能力

- 初始化记忆仓库目录
- 新建一次重要对话记录
- 按主类别自动补齐会话标签
- 自动生成 `meta.json`
- 自动生成“结论层 / 证据层 / 问题层”文件骨架
- 增加固定主题主档案层，避免每次遍历全部对话
- 根据已有摘要与长期资料导出 `active_context.md`
- 方便你提交到 Git / GitHub

## 快速开始

### 1. 初始化仓库

```bash
git init
python3 -m src.ai_memory.cli init
```

### 2. 编辑你的长期信息

先填写这两个文件：

- `memory/profiles/user.md`
- `memory/profiles/preferences.md`

它们是所有模型共享的长期背景。

### 3. 创建一条重要对话

```bash
python3 -m src.ai_memory.cli add \
  --title "构建 AI 记忆 Git 框架" \
  --model "Codex / GPT-5" \
  --category thinking \
  --tags ai-memory,github,knowledge-base
```

创建后会生成一个目录，建议这样使用：

- `transcript.md`：完整原始对话
- `summary.md`：你和 AI 共同确认后的结论
- `evidence.md`：保留关键原话、依据、原始判断
- `open_questions.md`：后续还需要追问、核实、校准的问题
- `domain_updates.md`：这次对话是否需要更新固定主题主档案

固定主题主档案放在：

- `memory/domains/`

建议把跨多次对话仍然稳定的重要内容，逐步沉淀到这里，例如：

- 工作经历
- 角色定义
- 长期目标
- AI 协作期待
- 表达风格
- 管道数字化主线

主类别目前支持：

- `tech`
- `management`
- `expression`
- `thinking`

标签模板见：

- `memory/profiles/conversation_tags.md`

### 4. 导出给新模型的上下文

```bash
python3 -m src.ai_memory.cli build-context
```

输出文件：

- `memory/snapshots/active_context.md`

把它发给新的 AI 模型，作为你的长期上下文起点。

## 推荐工作流

每次“重要对话”结束后做这几件事：

1. 新建一条会话
2. 粘贴原始对话到 `transcript.md`
3. 把关键原话和依据记到 `evidence.md`
4. 把可复用的信息提炼到 `summary.md`
5. 把还没完全确认的问题记到 `open_questions.md`
6. 检查主类别和标签是否准确
7. 如果这次对你画像有长期影响，就同步更新：
   - `memory/profiles/user.md`
   - `memory/profiles/preferences.md`
8. 重新构建上下文
9. `git add . && git commit -m "Add AI memory: ..."`

## 建议记录什么

优先记录高价值对话：

- 你的长期目标
- 正在做的项目
- 个人偏好与禁忌
- 沟通风格
- 常用工具链
- 已经讨论过的重要决策
- 不希望每次重复解释的背景

## 下一步扩展

这个仓库已经能作为第一版“可迁移记忆层”使用。下一步可以继续加：

- 自动从聊天导出 Markdown
- GitHub Actions 自动构建上下文
- 本地全文检索
- 语义检索 / 向量数据库
- MCP / API 接口，让别的 AI 工具直接调用

## GitHub 建议

建议把这个仓库设为私有仓库，因为里面可能包含：

- 私人偏好
- 项目背景
- 工作计划
- 个人决策记录

## 当前定位

这是一个“你拥有的 AI 记忆骨架”，不是绑定某个平台的聊天记录备份工具。

如果你愿意，我下一步可以继续帮你做这三件事中的任意一个：

1. 接着把它升级成自动摘要版本
2. 接着加上 GitHub 自动同步流程
3. 接着做一个更适合你个人的记忆模板
