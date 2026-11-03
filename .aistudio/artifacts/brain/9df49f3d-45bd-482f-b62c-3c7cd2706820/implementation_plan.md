# 考研政治最后阶段（11.3—12.18）按周动态规划重构方案

将原有的按日政治日程全面替换为 **7周动态推进规划（11月3日—12月18日）**，打造与英语按周视图并列的 **「📕 政治专属 (按周视图)」**，支持按套数/次数拆分的独立子任务打卡、每周验收标准核验、5+2弹性学习日指南、政治独立周记及全量备份导入导出。

## User Review & Critical Decisions

> [!IMPORTANT]
> 以下设计决策已根据你的确认全部锁定：

- **Confirmed Decision 1（视图替换与按日瘦身）**：日程表将原有的按日政治视图替换为 **「📕 政治专属 (按周视图)」**，首页同步展示本周政治任务与验收进度；**按日视图仅保留数学二与408专业课**，彻底实现「数二/408按日攻坚 + 政治/英语按周动态推进」的双轨架构。
- **Confirmed Decision 2（按套数/次数拆分子任务 + 验收标准清单）**：将肖八（1～8套）、肖四选择题（1～4套）、肖四主观题（每套拆分为第1次背诵一半、第2次背完并回顾）、背诵手册上下册精读及小程序刷题拆分为独立可打卡项，并在每周卡片底部附带可交互勾选的 **「本周验收标准」** 清单。
- **Confirmed Decision 3（政治按周独立笔记 + 5+2弹性学习日指南）**：政治复盘笔记切换为与周次绑定的 **「📕 政治独立周记」**（与数二日笔记、408日笔记、英语周记严格四科隔离），并在政治按周视图顶部常驻展示 **「一周 5+2 弹性学习日分配指南」** 与阶段核心策略。

---

## 1. Overview & Core Concept

- **What It Does**：
  1. **7周政治动态规划全量接入**：完整覆盖第1周（11.3–11.9 恢复基础）至第7周（12.15–12.18 考前冲刺），精准呈现每周的「输入/输出定位」、「拆分子任务打卡项」、「方法论指导（如肖八做题30-40m/订正20m/复盘20-30m、肖四主观题两次学习法与滚动背诵法）」与「本周验收标准」。
  2. **按日/按周双轨清爽解耦**：按日时间轴专注「数学二 + 408」硬核日任务；政治与英语则采用专属按周视图，避免死板的按日政治任务打乱每日刷题节奏。
  3. **首页当周政治看板**：在「今日仪表盘」顶部展示政治7周总进度，并在中部并列呈现「📕 本周政治动态清单」与「📗 本周英语动态清单」，支持在首页直接勾选子任务与验收标准。
- **Target Audience / Persona**：处于11月至考前冲刺阶段、需要兼顾数学/408高强度日计划与政治/英语按周弹性推进的考研学子。
- **Key Value**：消除政治按日排布带来的机械僵化感，用清晰的「输入页码定位 + 输出套卷拆分 + 周末验收标准」实现可控、低认知负担的政治冲刺。

---

## 2. User Experience & Visual Design

- **Key User Flows**：
  1. **政治按周视图浏览与打卡**：进入「全程日程表」点击 `📕 政治专属 (按周视图)` $\rightarrow$ 顶部查看「7周输入/输出战略总览」与「5+2弹性学习日分配表（第1~5次 + 机动日A/B）」 $\rightarrow$ 在各周卡片中逐项勾选拆好套数的肖八/肖四/背诵手册子任务 $\rightarrow$ 周末逐条勾选「本周验收标准」。
  2. **动态自定义本周政治计划**：点击任意政治周卡片右上角的 `自定义` 按钮 $\rightarrow$ 在弹窗中自由增删或修改本周子任务、调整核心目标/额外目标、编辑验收标准条目，或一键恢复默认。
  3. **四科隔离笔记记录**：在首页笔记区或日程表内切换 `📐 数二日笔记` | `💻 408日笔记` | `📕 政治第X周记` | `📗 英语第X周记`，四科独立存储、互不串扰。
- **Visual Identity & Theme**：
  - *Aesthetic Direction*：延续深色战术指挥室风格（Dark Slate Tactical Cockpit），政治模块采用鲜明且沉稳的绯红/珊瑚红（`rose-500` / `red-400`）视觉标识，与数学琥珀金（`amber`）、408科技青（`cyan`）、英语翡翠绿（`emerald`）形成清晰四科色彩锚点。
  - *Typography & Hierarchy*：所有页码范围（如 `上册 65~96 + 157~200页`）、题量（`80～100题`）、计时标准（`30～40分钟`）与完成进度百分比均采用等宽对齐数字（`font-mono tabular-nums`）。
  - *Component Styling & Layout*：每周卡片采用双栏/分区结构——上方为「阶段标签 + 输入/输出核心目标」，中部为「模块拆分子任务网格」与「做题/背诵方法提示」，下方为「本周验收标准核验区」与「政治专属周记区」。
- **Interactive Feedback & Motion**：勾选政治子任务或验收标准时触发平滑进度条动画与完成音效反馈；当某周子任务与验收标准全部达成时，卡片点亮完成徽章。

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1：按日视图移除政治日卡片，全面转为按周双轨制**
  - *Chosen Approach*：将 `DailyTimeline` 的轨道明确划分为 **按日轨道（📐 数学二、💻 408、📋 数二+408同屏）** 与 **按周轨道（📕 政治按周、📗 英语按周）**。
  - *Why*：政治与英语均已采用按周动态规划，若仍在每日卡片中展示旧版按日政治任务会产生新旧计划冲突与视觉噪音。
- **Decision 2：「拆分子任务」与「本周验收标准」双清单并存**
  - *Chosen Approach*：在每周政治卡片中，既提供按套数拆分的执行清单（如 `肖八 第1套`、`肖八 第2套`、`肖四主观题第1套-第1次背诵`），又独立保留文档中的 `本周验收标准` 核验框。
  - *Why*：子任务用于周内日常推进打卡，验收标准用于周末结果自检（例如“能脱离答案回忆主要观点和关键词”），完整还原规划文档的「过程 + 验收」双闭环。
- **Decision 3：旧版政治日笔记无损兼容**
  - *Chosen Approach*：政治切换为按周独立周记（`weeklyNote`）后，若检测到用户在旧版曾记录过某日的 `politicsNote`，系统会自动按日期归并至对应周次的政治周记中，确保零数据丢失。

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

### Architecture & Component Diagram

```
┌────────────────────────────────────────────────────────────────────────────┐
│                        App.tsx (State & Persistence)                       │
│  • plans: DayPlan[] (Math II & 408 Daily Tasks + Isolated Daily Notes)     │
│  • politicsWeeks: PoliticsWeekPlan[] (7 Weeks, SubTasks, Criteria, Notes)  │
│  • englishWeeks: EnglishWeekPlan[] (7 Weeks, SubTasks, Mock Info, Notes)   │
│  • JSON Backup v11.0 (Full Export / Import across Daily + 2 Weekly Stores) │
└───────────────┬────────────────────────────────────────────┬───────────────┘
                │                                            │
                ▼                                            ▼
┌───────────────────────────────────────┐    ┌───────────────────────────────────────┐
│        DashboardOverview.tsx          │    │           DailyTimeline.tsx           │
│  • 4-Subject Progress Strip           │    │  • Daily Tracks: Math | 408 | Math+CS │
│  • Current Day Math II & 408 Cards    │    │  • Weekly Track: 📕 政治专属 (按周)   │
│  • Current Week Politics Card (📕)    │    │    - 7-Week Input/Output Overview     │
│  • Current Week English Card (📗)     │    │    - 5+2 Flexible Study Day Table     │
│  • 4-Way Isolated Note Switcher:      │    │    - Split SubTasks & Criteria Check  │
│    [数二日] [408日] [政治周] [英语周] │    │  • Weekly Track: 📗 英语专属 (按周)   │
└───────────────────┬───────────────────┘    └───────────────────┬───────────────────┘
                    │                                            │
                    └─────────────────────┬──────────────────────┘
                                          ▼
                    ┌───────────────────────────────────────────┐
                    │         PoliticsWeekEditModal.tsx         │
                    │  • Edit Week Title, Core/Extra Goals      │
                    │  • Add / Edit / Delete Split Sub-Tasks    │
                    │  • Add / Edit / Delete Acceptance Items   │
                    │  • Reset Week to Default Schedule         │
                    └───────────────────────────────────────────┘
```

### Data Model & State (`PoliticsWeekPlan`)

- **`PoliticsSubTaskCategory`**：涵盖 `'handbook'`（背诵手册精读）、`'memorize'`（核心线索/专题背诵）、`'xiao8'`（肖八选择题）、`'xiao4_mcq'`（肖四选择题）、`'xiao4_essay'`（肖四主观题）、`'miniprogram'`（小程序刷题）、`'review'`（错题复盘/小测）、`'current_affairs'`（时政查漏补缺）、`'course'`（技巧课/状态）。
- **`PoliticsAcceptanceItem`**：包含 `id`、`text`（验收标准原文）、`isCompleted`（是否达成）。
- **`PoliticsWeekPlan`**：
  - `id` (`pol-week-1` .. `pol-week-7`)、`weekNumber` (`1`..`7`)、`dateRange`、`startDate`、`endDate`
  - `phaseTitle`（如 `恢复基础阶段`、`肖八第一轮`、`肖四启动阶段`）
  - `inputFocus`（整体规划中的输入页码/范围）与 `outputFocus`（整体规划中的输出目标）
  - `coreGoal`（核心目标）与 `extraGoal`（额外目标，如毛概/史纲精读、习思想/思修精读）
  - `subTasks: PoliticsSubTask[]`（按套数/次数拆分的独立打卡项）
  - `acceptanceCriteria: PoliticsAcceptanceItem[]`（本周验收标准可勾选列表）
  - `guidance: string[]`（做题时间建议、主观题背诵法、优先级变化提醒等）
  - `weeklyNote?: string` & `weeklyNoteUpdatedAt?: string`（政治专属周记）
  - `isCustomized?: boolean` & `customizedAt?: string`

### Interactive Component & State Mapping

- **子任务与验收标准打卡**：`handleTogglePoliticsSubTask(weekId, subTaskId)` 与 `handleTogglePoliticsAcceptance(weekId, criteriaId)` 实时更新 `politicsWeeks` 并持久化至 `localStorage`（`kaoyan_politics_weeks_v1`）。
- **自定义周计划弹窗（`PoliticsWeekEditModal`）**：支持修改当周标题、核心/额外目标、输入/输出重点、增删改子任务与验收标准，以及一键重置该周为初始规划。
- **备份导入导出完备性**：导出 JSON 包含 `plans`、`politicsWeeks`、`englishWeeks` 三大完整数据集；导入时支持智能校验与状态恢复。
