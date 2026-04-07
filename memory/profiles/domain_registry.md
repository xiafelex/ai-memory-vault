# 主题主档案索引

这份索引用于管理跨对话的固定主题。后续 AI 应优先查阅这里列出的主题文件，而不是遍历全部历史会话。

注意：`memory/imports/` 是资料抽取和证据来源层，不是固定主题主档案层。只有从资料中提炼出的稳定结论，才应同步到下面这些 `memory/domains/` 主题文件。

## 当前固定主题

- `memory/domains/career/work_history.md`：工作经历时间线
- `memory/domains/career/role_definition.md`：角色定义与组织定位
- `memory/domains/management/research_management_plan.md`：技术中心季度研发管理计划
- `memory/domains/collaboration/ai_expectations.md`：AI 协作期待
- `memory/domains/collaboration/commit_workflow.md`：/commit 的使用规则与收尾流程
- `memory/domains/collaboration/style_calibration.md`：风格校准场景与材料采样规则
- `memory/domains/collaboration/traceable_response_style.md`：引用用户偏好时的可追溯回答方式
- `memory/domains/collaboration/writing_style.md`：表达风格与写作标准
- `memory/domains/strategy/long_term_goals.md`：长期目标
- `memory/domains/strategy/context_philosophy.md`：关于 context、模型、agent 与协作方式的底层认知
- `memory/domains/technology/pipeline_digitalization.md`：管道数字化主线
- `memory/domains/technology/pipeline_scheduling_system.md`：石化管道预制焊接排产系统核心课题

## 更新规则

- 每次重要对话后，先看 `domain_updates.md`
- 如果这次内容补充了既有主题，就更新对应主题文件
- 如果这次内容形成了新的稳定主题，就新增一个主题文件并在本索引登记
- 只有跨 2 次以上对话仍然有效，或对长期协作明显重要的信息，才值得进入主题主档案
