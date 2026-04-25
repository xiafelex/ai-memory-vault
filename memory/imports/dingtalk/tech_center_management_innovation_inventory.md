# 技术中心知识库-管理创新清单

Generated: 2026-04-25

Source: DingTalk 技术中心知识库，`管理创新` 节点前两层同步结果。

## Summary

- Workspace: 技术中心
- Workspace ID: `xb8bkSMDMLG61aLo`
- Section: 管理创新
- Section node ID: `vy20BglGWOMz7xOBfbP1rGN9JA7depqY`
- Scope: 前两层目录与文档清单
- Nodes: 144
- Folders: 60
- Alidoc files: 84

## Text Extraction Audit

- Documents audited: 84
- Blocks: 3680
- Readable text blocks: 1708
- Readable text chars: 50763
- Table blocks: 8
- Table text chars: 4364
- Missing list items: 1579
- Other unsupported blocks: 93
- Read errors: 0

Current API extraction can read normal paragraphs, headings, and tables.
The main known gap is DingTalk list blocks: ordered and unordered list blocks are returned without item text.
This was reproduced with a reverse-write test using DingTalk's own Markdown overwrite API, so the gap is likely a read-API limitation rather than a parser error.

## Top-Level Buckets

| Bucket | Folders | Files | Notes |
| --- | ---: | ---: | --- |
| 根目录 | 14 | 7 | Management organization, department responsibilities, process and project-stage management notes. |
| 组织建设 | 0 | 10 | Organization change, questionnaire, monthly management reports, overseas/domestic management. |
| 研发管理办法 | 2 | 21 | R&D management, funding, tax deduction, enterprise technology center, science project materials. |
| 成果竞赛 | 7 | 12 | Awards, AI applications, technical reports, standards, application proofs. |
| 数字化代码 | 0 | 10 | Data team logs, Qiyun/ERP/OA scripts, salary and R&D application automation notes. |
| 产业工人 | 13 | 7 | Workforce planning, skill competition, recruitment, HR review, meeting panel tutorial. |
| 成本价值 | 8 | 4 | Settlement, progress payment, output value, Qiyun form data operations. |
| 管理工具 | 0 | 5 | Qiyun standardization, paired comparison, factor scoring, audit incentive theory. |
| 标准与规范 | 0 | 4 | BIM and petrochemical/fire design standards, journal search workflow. |
| 标准体系 | 7 | 1 | Standards-system folder structure with one synced Alidoc at this depth. |
| 南京市重大应用场景项目需求申报 | 0 | 3 | Policy, scenario list, demand summary table. |
| 工作总结与计划 | 3 | 0 | Folder-only at this depth. |
| 技术专利 | 1 | 0 | Folder-only at this depth. |
| 数据体系 | 3 | 0 | Folder-only at this depth. |
| 最佳管理实践 | 2 | 0 | Folder-only at this depth. |

## Important Documents By Bucket

### 根目录

- 管理创新组织.adoc
- 公司体系资料-技术中心部门及岗位职责.adoc
- 管理制度交流会前准备.adoc
- 物资管理全流程数字化升级与协同机制重构.adoc
- 项目不同阶段管理方法及部门责任划分.adoc
- 研发项目验收及付款流程.adoc
- 技术服务合同认定税务问题.adoc

### 组织建设

- 组织变革与管理创新的思路和过程记录.adoc
- 组织问卷.adoc
- 组织现状.adoc
- 关于建立数据科学中心化团队的工作建议.adoc
- 巴基斯坦分公司策划方案及工作计划.adoc
- 国内统一管理.adoc
- 海外项目驻国内期间管理办法.adoc
- 2026年2月份管理职能工作汇报.adoc
- 2026年3月份管理职能工作汇报.adoc

### 研发管理办法

- 研发管理办法.adoc
- 研发管理办法战略.adoc
- 技术中心研发资金使用管理办法.adoc
- 研发课题层级与架构.adoc
- 研发课题简要技术说明.adoc
- 企业技术中心.adoc
- 工程技术研究中心.adoc
- 工程研究中心.adoc
- 高新技术企业资质问题.adoc
- 研发费用税前加计扣除新政指引.adoc
- 国家税务总局-研发费用加计扣除政策执行指引2.0版.adoc
- 科技型中小企业.adoc
- 工程建造微创新技术.adoc
- 人工智能学习路线.adoc
- 化工建设科技论文评审会.adoc
- 科技论文申报成果.adoc
- 国资委-《中央科技型企业实施分红激励工作指引》.adoc
- 人力资源社会保障部办公厅关于印发《国有企业科技人才薪酬分配指引》的通知.adoc

### 成果竞赛

- 2025年化工建设AI+应用成果.adoc
- 2025年南京市重大科技专项（前沿技术）项目申报.adoc
- 2026年度安装领域科技成果评价活动.adoc
- 安全外审-技术中心.adoc
- 电子工业管道工程数字化技术标准.adoc
- 基于BIM的石化管道预制排产技术在境外生物燃油项目的应用技术报告.adoc
- 石化管道IDF文件架构解析与数据模型应用技术报告.adoc
- 技术汇报会议.adoc
- 住房城乡建设部办公厅关于印发智能建造技术导则（试行）的通知.adoc
- 应用证明-古雷项目.adoc
- 应用证明-河南金丹项目.adoc
- 应用证明-吉林美思德.adoc

### 数字化代码

- 数据组焊接日报等相关数据归集处理.adoc
- 数据组工作日志-氚云.adoc
- 数据组工作日志问题.adoc
- 关于氚云表单控件变动统计分值.adoc
- 薪资管理代码 .adoc
- 薪资管理问题.adoc
- 月度薪资管理.adoc
- 研发课题申报使用.adoc
- ERP视图增加.adoc
- OA审批-加班申请抓取代码.adoc

## Known Follow-Up

1. Build a fuller import pipeline that stores readable Markdown per document, plus raw block JSON for audit.
2. Use browser/PDF export fallback for documents with many missing list items, code blocks, images, sync blocks, or embedded attachments.
3. Treat this file as an initial evidence inventory, not the final knowledge-system conclusion.
