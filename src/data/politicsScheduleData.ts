import { PoliticsWeekPlan, PoliticsSubTaskCategory } from '../types/kaoyan';

export interface PoliticsFlexibleDayItem {
  dayLabel: string;
  arrangement: string;
  tag: string;
}

export const POLITICS_FLEXIBLE_STUDY_DAYS: PoliticsFlexibleDayItem[] = [
  {
    dayLabel: '第 1 次',
    arrangement: '课程或知识点＋刷题',
    tag: '输入+初练',
  },
  {
    dayLabel: '第 2 次',
    arrangement: '刷题＋错题复盘',
    tag: '输出+纠偏',
  },
  {
    dayLabel: '第 3 次',
    arrangement: '刷题或肖八',
    tag: '套卷实战',
  },
  {
    dayLabel: '第 4 次',
    arrangement: '错题复盘＋手册',
    tag: '回炉定位',
  },
  {
    dayLabel: '第 5 次',
    arrangement: '本周核心任务＋阶段检查',
    tag: '周末验收',
  },
  {
    dayLabel: '机动日 A',
    arrangement: '补做未完成任务',
    tag: '弹性缓冲',
  },
  {
    dayLabel: '机动日 B',
    arrangement: '休息，或者轻量回忆',
    tag: '留白蓄能',
  },
];

export interface PoliticsOverallWeekSummary {
  weekNumber: number;
  dateRange: string;
  phaseTitle: string;
  inputLine: string;
  outputLine: string;
}

export const POLITICS_OVERALL_SUMMARIES: PoliticsOverallWeekSummary[] = [
  {
    weekNumber: 1,
    dateRange: '11月3日—11月9日',
    phaseTitle: '建立基础（以输入为主）',
    inputLine: '背诵手册精读-以马原为主-上册1~64页 + 下册-四大核心线索',
    outputLine: '建立五部分知识框架，重点补马原，开始小程序刷题（80～100题）',
  },
  {
    weekNumber: 2,
    dateRange: '11月10日—11月16日',
    phaseTitle: '肖八第一轮',
    inputLine: '背诵手册精读-以毛概、史纲为主-上册65~96+157~200页 + 下册核心专题背诵 一二三',
    outputLine: '完成肖八前四套选择题（第1～4套），每套复盘并建立错题记录',
  },
  {
    weekNumber: 3,
    dateRange: '11月17日—11月23日',
    phaseTitle: '肖八第二轮',
    inputLine: '背诵手册精读-以习思想、思修为主-上册97~156+201~235页 + 下册核心专题背诵 四五',
    outputLine: '完成肖八后四套选择题（第5～8套），开始回顾前四套错题',
  },
  {
    weekNumber: 4,
    dateRange: '11月24日—11月30日',
    phaseTitle: '选择题巩固',
    inputLine: '同步推进背诵手册精读、建立五部分知识框架 + 下册核心专题背诵 六七八九十',
    outputLine: '肖八八套错题复盘重做，薄弱知识点补充，完成一次30～35题选择题小测',
  },
  {
    weekNumber: 5,
    dateRange: '12月1日—12月7日',
    phaseTitle: '肖四启动',
    inputLine: '同步推进背诵手册下册-47~76页 分析题板块 + 结合肖四和手册查漏补缺时政',
    outputLine: '肖四四套选择题全部完成 + 肖四第1、2套主观题第一轮背诵',
  },
  {
    weekNumber: 6,
    dateRange: '12月8日—12月14日',
    phaseTitle: '肖四主攻（主观题集中）',
    inputLine: '每次学习先花10～15分钟回忆旧内容，逐步形成主观题滚动背诵',
    outputLine: '完成肖四四套主观题第一轮背诵（第3、4套首轮 + 第1、2套回忆）+ 选择题错题复习',
  },
  {
    weekNumber: 7,
    dateRange: '12月15日—12月18日',
    phaseTitle: '最后冲刺',
    inputLine: '重点热点和背诵手册查漏补缺，不再引入大量新资料',
    outputLine: '肖四四套主观题第二轮重点复习、肖四/肖八选择题错题回顾、时政查漏补缺',
  },
];

export const POLITICS_CATEGORY_LABELS: Record<
  PoliticsSubTaskCategory,
  { label: string; badgeClass: string }
> = {
  handbook: {
    label: '背诵手册精读',
    badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
  },
  memorize: {
    label: '下册线索/专题背诵',
    badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  },
  xiao8: {
    label: '肖八选择题',
    badgeClass: 'bg-red-500/20 text-red-300 border-red-500/40',
  },
  xiao4_mcq: {
    label: '肖四选择题',
    badgeClass: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
  },
  xiao4_essay: {
    label: '肖四主观题背诵',
    badgeClass: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40',
  },
  miniprogram: {
    label: '小程序刷题',
    badgeClass: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
  },
  review: {
    label: '错题复盘/小测',
    badgeClass: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
  },
  current_affairs: {
    label: '时政热点',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  },
  course: {
    label: '技巧课/状态',
    badgeClass: 'bg-slate-700/60 text-slate-300 border-slate-600/60',
  },
};

export const INITIAL_POLITICS_WEEK_PLANS: PoliticsWeekPlan[] = [
  // =========================================================================
  // 第 1 周：11 月 3 日—11 月 9 日（恢复基础阶段）
  // =========================================================================
  {
    id: 'pol-week-1',
    weekNumber: 1,
    title: '第 1 周：恢复基础阶段（以输入为主 · 建立基础）',
    dateRange: '11月3日—11月9日',
    startDate: '2026-11-03',
    endDate: '2026-11-09',
    stageGroup: 'foundation_xiao8',
    phaseTitle: '恢复基础阶段',
    inputFocus: '背诵手册精读-以马原为主-上册1~64页 + 下册-四大核心线索',
    outputFocus: '建立五部分知识框架，重点补马原，开始小程序刷题（80～100题）',
    coreGoal: '恢复知识框架，正式进入刷题状态。以马原为主，精读+记忆；其余有概览。',
    subTasks: [
      {
        id: 'pol-w1-mayuan-1',
        category: 'handbook',
        moduleName: '马原（精读+记忆）',
        title: '背诵手册上册 1~64页：唯物论与辩证法重点复习',
        detail: '以马原为主精读+记忆，重点梳理唯物论、辩证法核心原理与方法论',
        isCompleted: false,
      },
      {
        id: 'pol-w1-mayuan-2',
        category: 'handbook',
        moduleName: '马原（精读+记忆）',
        title: '背诵手册上册 1~64页：认识论与唯物史观重点复习',
        detail: '完成马原四个核心部分完整过一遍，攻克政经与唯物史观高频考点',
        isCompleted: false,
      },
      {
        id: 'pol-w1-clues',
        category: 'memorize',
        moduleName: '下册核心线索',
        title: '背诵手册下册：记忆四大核心线索',
        detail: '熟记下册四大核心线索脉络，建立跨模块串联视角',
        isCompleted: false,
      },
      {
        id: 'pol-w1-shigang',
        category: 'handbook',
        moduleName: '史纲',
        title: '史纲概览：浏览近代史开端及重要历史事件',
        detail: '梳理时间轴主干与关键历史节点基本框架',
        isCompleted: false,
      },
      {
        id: 'pol-w1-maozhongte-sixiu',
        category: 'handbook',
        moduleName: '毛中特 & 思修',
        title: '毛中特 + 思修：快速浏览两部分知识框架',
        detail: '建立五部分整体知识框架，做到其余模块心中有概览',
        isCompleted: false,
      },
      {
        id: 'pol-w1-course',
        category: 'course',
        moduleName: '技巧课',
        title: '腿姐选择题技巧课（可选）',
        detail: '按需选听选择题审题与排错技巧',
        isCompleted: false,
      },
      {
        id: 'pol-w1-mini-1',
        category: 'miniprogram',
        moduleName: '小程序刷题',
        title: '小程序刷题 第1组（40～50题）+ 建立错题记录',
        detail: '利用碎片时间开启刷题状态，随手标记易混概念',
        isCompleted: false,
      },
      {
        id: 'pol-w1-mini-2',
        category: 'miniprogram',
        moduleName: '小程序刷题',
        title: '小程序刷题 第2组（累计达 80～100题）',
        detail: '完成本周80～100题刷题目标，汇总第一周错题记录',
        isCompleted: false,
      },
    ],
    acceptanceCriteria: [
      {
        id: 'pol-w1-acc-1',
        text: '马原四个核心部分（唯物论、辩证法、认识论、唯物史观）至少过一遍。',
        isCompleted: false,
      },
      {
        id: 'pol-w1-acc-2',
        text: '其余部分（史纲、毛中特、思修、习思想）知道基本框架。',
        isCompleted: false,
      },
      {
        id: 'pol-w1-acc-3',
        text: '小程序完成 80～100 题。',
        isCompleted: false,
      },
      {
        id: 'pol-w1-acc-4',
        text: '建立错题记录。',
        isCompleted: false,
      },
      {
        id: 'pol-w1-acc-5',
        text: '记忆下册-四大核心线索。',
        isCompleted: false,
      },
    ],
    guidance: [
      '本周以输入为主，建立基础：背诵手册上册 1~64 页（以马原为主）精读+记忆，其余模块快速浏览建立五部分知识框架。',
      '同步记忆背诵手册下册「四大核心线索」，正式进入小程序刷题状态（80～100题）。',
    ],
  },

  // =========================================================================
  // 第 2 周：11 月 10 日—11 月 16 日（肖八第一轮）
  // =========================================================================
  {
    id: 'pol-week-2',
    weekNumber: 2,
    title: '第 2 周：肖八第一轮（前四套选择题 + 毛概/史纲精读）',
    dateRange: '11月10日—11月16日',
    startDate: '2026-11-10',
    endDate: '2026-11-16',
    stageGroup: 'foundation_xiao8',
    phaseTitle: '肖八第一轮',
    inputFocus: '同步推进 背诵手册精读-以毛概、史纲为主-上册65~96+157~200页 + 下册核心专题背诵 一二三',
    outputFocus: '肖八第一轮：完成肖八前四套选择题（第1～4套），每套至少复盘一次，建立错题记录',
    coreGoal: '完成肖八前四套选择题。',
    extraGoal: '毛概、史纲精读（上册65~96+157~200页）+ 下册核心专题背诵 一二三',
    subTasks: [
      {
        id: 'pol-w2-xiao8-1',
        category: 'xiao8',
        moduleName: '肖八第1套',
        title: '肖八 第 1 套选择题（做题30-40m + 订正20m + 复盘20-30m）',
        detail: '独立完成第1套选择题并完成首轮错题复盘记录',
        isCompleted: false,
      },
      {
        id: 'pol-w2-xiao8-2',
        category: 'xiao8',
        moduleName: '肖八第2套',
        title: '肖八 第 2 套选择题（做题30-40m + 订正20m + 复盘20-30m）',
        detail: '独立完成第2套选择题并完成首轮错题复盘记录',
        isCompleted: false,
      },
      {
        id: 'pol-w2-xiao8-3',
        category: 'xiao8',
        moduleName: '肖八第3套',
        title: '肖八 第 3 套选择题（做题30-40m + 订正20m + 复盘20-30m）',
        detail: '独立完成第3套选择题并完成首轮错题复盘记录',
        isCompleted: false,
      },
      {
        id: 'pol-w2-xiao8-4',
        category: 'xiao8',
        moduleName: '肖八第4套',
        title: '肖八 第 4 套选择题（做题30-40m + 订正20m + 复盘20-30m）',
        detail: '独立完成第4套选择题并完成首轮错题复盘记录',
        isCompleted: false,
      },
      {
        id: 'pol-w2-handbook-1',
        category: 'handbook',
        moduleName: '背诵手册（第1次翻阅）',
        title: '背诵手册精读（第1次）：毛概 上册 65~96页',
        detail: '精读毛概核心论断、会议、著作与分期特征',
        isCompleted: false,
      },
      {
        id: 'pol-w2-handbook-2',
        category: 'handbook',
        moduleName: '背诵手册（第2次翻阅）',
        title: '背诵手册精读（第2次）：史纲 上册 157~200页',
        detail: '精读史纲主线脉络，与毛概交叉对照记忆',
        isCompleted: false,
      },
      {
        id: 'pol-w2-handbook-3',
        category: 'handbook',
        moduleName: '背诵手册（第3次翻阅）',
        title: '背诵手册翻阅（第3次）：结合肖八1~4套错题回查手册',
        detail: '每周翻阅手册 2～3 次，只补充做题中暴露的问题',
        isCompleted: false,
      },
      {
        id: 'pol-w2-memorize-123',
        category: 'memorize',
        moduleName: '下册核心专题',
        title: '下册 核心专题背诵：专题一、二、三',
        detail: '完成背诵手册下册核心专题一、二、三的梳理与背诵',
        isCompleted: false,
      },
      {
        id: 'pol-w2-mini',
        category: 'miniprogram',
        moduleName: '小程序刷题',
        title: '小程序刷题：完成 70～100 题',
        detail: '结合技巧课（只补充做题中暴露的问题）巩固毛概与史纲考点',
        isCompleted: false,
      },
    ],
    acceptanceCriteria: [
      {
        id: 'pol-w2-acc-1',
        text: '肖八前四套选择题完成。',
        isCompleted: false,
      },
      {
        id: 'pol-w2-acc-2',
        text: '前四套错题至少复盘一轮。',
        isCompleted: false,
      },
      {
        id: 'pol-w2-acc-3',
        text: '下册 核心专题背诵 一二三。',
        isCompleted: false,
      },
      {
        id: 'pol-w2-acc-4',
        text: '毛概、史纲至少过一遍。',
        isCompleted: false,
      },
    ],
    guidance: [
      '每套肖八建议采用标准三步节奏：① 做题：约 30～40 分钟；② 订正：约 20 分钟；③ 复盘：约 20～30 分钟。',
      '背诵手册每周翻阅 2～3 次，重点推进上册 65~96 页（毛概）+ 157~200 页（史纲）及下册核心专题一二三。',
      '技巧课原则：只补充做题中暴露的问题，切忌盲目补课挤占刷题复盘时间。',
    ],
  },

  // =========================================================================
  // 第 3 周：11 月 17 日—11 月 23 日（肖八第二轮）
  // =========================================================================
  {
    id: 'pol-week-3',
    weekNumber: 3,
    title: '第 3 周：肖八第二轮（后四套选择题 + 习思想/思修精读）',
    dateRange: '11月17日—11月23日',
    startDate: '2026-11-17',
    endDate: '2026-11-23',
    stageGroup: 'foundation_xiao8',
    phaseTitle: '肖八第二轮',
    inputFocus: '同步推进 背诵手册精读-以习思想、思修为主-上册97~156+201~235页 + 下册核心专题背诵 四五',
    outputFocus: '肖八第二轮：完成肖八后四套选择题（第5～8套），复盘第5～8套并开始回顾第1～4套错题',
    coreGoal: '完成肖八后四套选择题，并开始重复错题。',
    extraGoal: '习思想、思修精读（上册97~156+201~235页）+ 下册核心专题背诵 四五',
    subTasks: [
      {
        id: 'pol-w3-xiao8-5',
        category: 'xiao8',
        moduleName: '肖八第5套',
        title: '肖八 第 5 套选择题 + 错题复盘（根据错题定位手册知识点）',
        detail: '完成第5套选择题，记录错题并在背诵手册中精准定位对应考点',
        isCompleted: false,
      },
      {
        id: 'pol-w3-xiao8-6',
        category: 'xiao8',
        moduleName: '肖八第6套',
        title: '肖八 第 6 套选择题 + 错题复盘（根据错题定位手册知识点）',
        detail: '完成第6套选择题，记录错题并在背诵手册中精准定位对应考点',
        isCompleted: false,
      },
      {
        id: 'pol-w3-xiao8-7',
        category: 'xiao8',
        moduleName: '肖八第7套',
        title: '肖八 第 7 套选择题 + 错题复盘（根据错题定位手册知识点）',
        detail: '完成第7套选择题，记录错题并在背诵手册中精准定位对应考点',
        isCompleted: false,
      },
      {
        id: 'pol-w3-xiao8-8',
        category: 'xiao8',
        moduleName: '肖八第8套',
        title: '肖八 第 8 套选择题 + 错题复盘（根据错题定位手册知识点）',
        detail: '完成第8套选择题，自此肖八八套选择题一刷全部收官',
        isCompleted: false,
      },
      {
        id: 'pol-w3-old-review',
        category: 'review',
        moduleName: '旧题回顾',
        title: '旧题复盘：回顾并重做肖八第 1～4 套错题',
        detail: '检验前四套错题是否真正消化，标记二次仍错的顽固考点',
        isCompleted: false,
      },
      {
        id: 'pol-w3-handbook-xi',
        category: 'handbook',
        moduleName: '背诵手册（习思想）',
        title: '背诵手册精读：习思想 上册 97~156页',
        detail: '重点掌握关键提法、根本任务、首要任务与帽子词对应',
        isCompleted: false,
      },
      {
        id: 'pol-w3-handbook-sixiu',
        category: 'handbook',
        moduleName: '背诵手册（思修）',
        title: '背诵手册精读：思修与法治 上册 201~235页',
        detail: '梳理道德与法治核心考点，确保习思想、思修至少完整过一遍',
        isCompleted: false,
      },
      {
        id: 'pol-w3-memorize-45',
        category: 'memorize',
        moduleName: '下册核心专题',
        title: '下册 核心专题背诵：专题四、五',
        detail: '完成背诵手册下册核心专题四、五的背诵与框架记忆',
        isCompleted: false,
      },
      {
        id: 'pol-w3-mini',
        category: 'miniprogram',
        moduleName: '小程序刷题',
        title: '小程序刷题：完成 70～100 题',
        detail: '主攻习思想、思修及前两周薄弱章节专项题',
        isCompleted: false,
      },
    ],
    acceptanceCriteria: [
      {
        id: 'pol-w3-acc-1',
        text: '肖八八套选择题全部完成。',
        isCompleted: false,
      },
      {
        id: 'pol-w3-acc-2',
        text: '八套错题均有记录。',
        isCompleted: false,
      },
      {
        id: 'pol-w3-acc-3',
        text: '至少重新做过前四套中的一部分错题。',
        isCompleted: false,
      },
      {
        id: 'pol-w3-acc-4',
        text: '习思想、思修至少过一遍。',
        isCompleted: false,
      },
      {
        id: 'pol-w3-acc-5',
        text: '下册 核心专题背诵 四五。',
        isCompleted: false,
      },
    ],
    guidance: [
      '输入与输出双线并进：输出端拿下肖八第 5～8 套选择题并回顾第 1～4 套错题；输入端精读上册 97~156 页（习思想）+ 201~235 页（思修）。',
      '手册用法：每做完一套肖八，根据错题直接回翻背诵手册定位知识点，把易混表述标在手册对应页码上。',
    ],
  },

  // =========================================================================
  // 第 4 周：11 月 24 日—11 月 30 日（选择题巩固阶段）
  // =========================================================================
  {
    id: 'pol-week-4',
    weekNumber: 4,
    title: '第 4 周：选择题巩固阶段（把肖八从“做过”变成“理解过”）',
    dateRange: '11月24日—11月30日',
    startDate: '2026-11-24',
    endDate: '2026-11-30',
    stageGroup: 'mcq_consolidate',
    phaseTitle: '选择题巩固阶段',
    inputFocus: '同步推进背诵手册精读、建立五部分知识框架 + 下册核心专题背诵 六七八九十 + 浏览手册时政',
    outputFocus: '肖八八套错题重新做一遍 + 薄弱知识点补充 + 随机完成一次30～35题选择题小测',
    coreGoal: '把肖八从“做过”变成“理解过”。',
    subTasks: [
      {
        id: 'pol-w4-xiao8-redo-1',
        category: 'review',
        moduleName: '肖八错题重做（上）',
        title: '肖八 第 1～4 套错题重新做一遍',
        detail: '遮住答案重做错题，区分是知识点不熟、题干理解错误还是选项辨析能力不足',
        isCompleted: false,
      },
      {
        id: 'pol-w4-xiao8-redo-2',
        category: 'review',
        moduleName: '肖八错题重做（下）',
        title: '肖八 第 5～8 套错题重新做一遍',
        detail: '完成肖八八套主要错题第二轮深度复习',
        isCompleted: false,
      },
      {
        id: 'pol-w4-quiz',
        category: 'review',
        moduleName: '模拟小测',
        title: '随机完成一次 30～35 题选择题小测',
        detail: '检验近期错题消化效果与选择题做题手感',
        isCompleted: false,
      },
      {
        id: 'pol-w4-memorize-6to10',
        category: 'memorize',
        moduleName: '下册核心专题',
        title: '下册 核心专题背诵：专题六、七、八、九、十',
        detail: '完成下册核心专题六至十的背诵，至此下册十大核心专题全部过完一轮',
        isCompleted: false,
      },
      {
        id: 'pol-w4-handbook-patch',
        category: 'handbook',
        moduleName: '手册查漏补缺',
        title: '背诵手册：针对错题查漏补缺 + 最薄弱知识模块重点突破',
        detail: '串联五部分知识框架，集中扫除高频失分盲区',
        isCompleted: false,
      },
      {
        id: 'pol-w4-current-affairs',
        category: 'current_affairs',
        moduleName: '时政浏览',
        title: '时政：浏览背诵手册中的时政内容',
        detail: '熟悉年度重大会议、周年纪念与时政关键词',
        isCompleted: false,
      },
      {
        id: 'pol-w4-mini',
        category: 'miniprogram',
        moduleName: '小程序刷题',
        title: '小程序刷题：完成 80～100 题',
        detail: '保持选择题每日刷题敏锐度',
        isCompleted: false,
      },
    ],
    acceptanceCriteria: [
      {
        id: 'pol-w4-acc-1',
        text: '肖八主要错题完成第二轮复习。',
        isCompleted: false,
      },
      {
        id: 'pol-w4-acc-2',
        text: '下册 核心专题背诵 六七八九十。',
        isCompleted: false,
      },
      {
        id: 'pol-w4-acc-3',
        text: '完成一次 选择题测试（30～35题小测）。',
        isCompleted: false,
      },
      {
        id: 'pol-w4-acc-4',
        text: '对最薄弱的知识模块重点突破。',
        isCompleted: false,
      },
    ],
    guidance: [
      '本周不再安排新课程，也不建议额外购买大量预测卷。',
      '如果你肖八正确率较低，也不用急着刷更多题。先区分是：① 知识点不熟、② 题干理解错误，还是 ③ 选项辨析能力不足。',
    ],
  },

  // =========================================================================
  // 第 5 周：12 月 1 日—12 月 7 日（肖四启动阶段）
  // =========================================================================
  {
    id: 'pol-week-5',
    weekNumber: 5,
    title: '第 5 周：肖四启动阶段（主观题背诵不再是可选任务！）',
    dateRange: '12月1日—12月7日',
    startDate: '2026-12-01',
    endDate: '2026-12-07',
    stageGroup: 'xiao4_sprint',
    phaseTitle: '肖四启动阶段',
    inputFocus: '同步推进 背诵手册下册-47~76页 分析题板块 + 结合肖四和手册查漏补缺时政',
    outputFocus: '肖四四套选择题全部完成 + 肖四第 1、2 套主观题完成第一轮背诵',
    coreGoal: '完成肖四选择题，并启动主观题背诵。（优先级变化：从这一周开始，主观题背诵不再是可选任务）',
    subTasks: [
      {
        id: 'pol-w5-xiao4-mcq-1',
        category: 'xiao4_mcq',
        moduleName: '肖四选择题',
        title: '肖四 第 1 套选择题完成 + 错题订正',
        detail: '独立完成肖四第1套选择题，结合背诵手册查漏补缺',
        isCompleted: false,
      },
      {
        id: 'pol-w5-xiao4-mcq-2',
        category: 'xiao4_mcq',
        moduleName: '肖四选择题',
        title: '肖四 第 2 套选择题完成 + 错题订正',
        detail: '独立完成肖四第2套选择题，结合背诵手册查漏补缺',
        isCompleted: false,
      },
      {
        id: 'pol-w5-xiao4-mcq-3',
        category: 'xiao4_mcq',
        moduleName: '肖四选择题',
        title: '肖四 第 3 套选择题完成 + 错题订正',
        detail: '独立完成肖四第3套选择题，结合背诵手册查漏补缺',
        isCompleted: false,
      },
      {
        id: 'pol-w5-xiao4-mcq-4',
        category: 'xiao4_mcq',
        moduleName: '肖四选择题',
        title: '肖四 第 4 套选择题完成 + 错题订正',
        detail: '独立完成肖四第4套选择题，至此肖四四套选择题全部完成',
        isCompleted: false,
      },
      {
        id: 'pol-w5-essay-s1-p1',
        category: 'xiao4_essay',
        moduleName: '肖四主观题第1套',
        title: '肖四主观题 第 1 套（第1次学习）：理解题目和答案结构，背诵一半',
        detail: '拆解答案逻辑层次与采分关键词，完成第1套前半部分背诵',
        isCompleted: false,
      },
      {
        id: 'pol-w5-essay-s1-p2',
        category: 'xiao4_essay',
        moduleName: '肖四主观题第1套',
        title: '肖四主观题 第 1 套（第2次学习）：背诵剩余部分，并回顾前半部分',
        detail: '完成第1套主观题首轮完整背诵，尝试脱离答案回忆主要观点',
        isCompleted: false,
      },
      {
        id: 'pol-w5-essay-s2-p1',
        category: 'xiao4_essay',
        moduleName: '肖四主观题第2套',
        title: '肖四主观题 第 2 套（第1次学习）：理解题目和答案结构，背诵一半',
        detail: '拆解答案逻辑层次与采分关键词，完成第2套前半部分背诵',
        isCompleted: false,
      },
      {
        id: 'pol-w5-essay-s2-p2',
        category: 'xiao4_essay',
        moduleName: '肖四主观题第2套',
        title: '肖四主观题 第 2 套（第2次学习）：背诵剩余部分，并回顾前半部分',
        detail: '完成第2套主观题首轮完整背诵，尝试脱离答案回忆主要观点',
        isCompleted: false,
      },
      {
        id: 'pol-w5-handbook-essay',
        category: 'handbook',
        moduleName: '下册分析题板块',
        title: '背诵手册下册 47~76页：分析题板块推进 + 时政结合肖四查漏补缺',
        detail: '同步推进下册47~76页分析题万能答题语料与时政热点补充',
        isCompleted: false,
      },
      {
        id: 'pol-w5-xiao8-mini',
        category: 'miniprogram',
        moduleName: '小程序与肖八',
        title: '小程序 40～60 题 + 肖八只复习高频错题',
        detail: '保持客观题手感，把主力时间让位给肖四主观题背诵',
        isCompleted: false,
      },
    ],
    acceptanceCriteria: [
      {
        id: 'pol-w5-acc-1',
        text: '肖四四套选择题完成。',
        isCompleted: false,
      },
      {
        id: 'pol-w5-acc-2',
        text: '肖四第 1、2 套主观题完成首轮背诵。',
        isCompleted: false,
      },
      {
        id: 'pol-w5-acc-3',
        text: '能脱离答案回忆主要观点和关键词。',
        isCompleted: false,
      },
    ],
    guidance: [
      '优先级变化：从这一周开始，主观题背诵不再是可选任务！同步推进背诵手册下册 47~76 页分析题板块。',
      '主观题按每套两次学习来安排：① 第一次理解题目和答案结构，背诵一半；② 第二次背诵剩余部分，并回顾前半部分。',
      '如果肖四尚未到手，就先复习肖八错题、背诵手册中的重点内容，不要为了等肖四而停止学习。',
    ],
  },

  // =========================================================================
  // 第 6 周：12 月 8 日—12 月 14 日（主观题集中阶段 · 肖四主攻）
  // =========================================================================
  {
    id: 'pol-week-6',
    weekNumber: 6,
    title: '第 6 周：主观题集中阶段（肖四主攻 · 形成滚动背诵）',
    dateRange: '12月8日—12月14日',
    startDate: '2026-12-08',
    endDate: '2026-12-14',
    stageGroup: 'xiao4_sprint',
    phaseTitle: '主观题集中阶段（肖四主攻）',
    inputFocus: '每次学习先花 10～15 分钟回忆之前背过的内容，不熟内容单独标记优先复习',
    outputFocus: '完成四套主观题第一轮背诵（第3、4套完成首轮 + 第1、2套重新回忆），开始滚动复习',
    coreGoal: '完成肖四四套主观题第一轮背诵，并开始复习旧内容。',
    subTasks: [
      {
        id: 'pol-w6-essay-s3-p1',
        category: 'xiao4_essay',
        moduleName: '肖四主观题第3套',
        title: '肖四主观题 第 3 套（第1次学习）：理解题目和答案结构，背诵一半',
        detail: '新内容每天争取掌握1～2道主观题，提炼核心得分句',
        isCompleted: false,
      },
      {
        id: 'pol-w6-essay-s3-p2',
        category: 'xiao4_essay',
        moduleName: '肖四主观题第3套',
        title: '肖四主观题 第 3 套（第2次学习）：背诵剩余部分，并回顾前半部分',
        detail: '完成第3套主观题第一轮完整背诵',
        isCompleted: false,
      },
      {
        id: 'pol-w6-essay-s4-p1',
        category: 'xiao4_essay',
        moduleName: '肖四主观题第4套',
        title: '肖四主观题 第 4 套（第1次学习）：理解题目和答案结构，背诵一半',
        detail: '拆解第4套主观题逻辑框架，背诵前半部分',
        isCompleted: false,
      },
      {
        id: 'pol-w6-essay-s4-p2',
        category: 'xiao4_essay',
        moduleName: '肖四主观题第4套',
        title: '肖四主观题 第 4 套（第2次学习）：背诵剩余部分，四套首轮全部收官',
        detail: '至此肖四四套主观题第一轮背诵全部完成！',
        isCompleted: false,
      },
      {
        id: 'pol-w6-essay-roll-12',
        category: 'xiao4_essay',
        moduleName: '主观题滚动复习',
        title: '主观题复习：肖四第 1、2 套重新回忆（滚动背诵）',
        detail: '每次学习先花10～15分钟回忆之前背过的内容，不熟内容单独标记优先复习',
        isCompleted: false,
      },
      {
        id: 'pol-w6-xiao4-mcq-rev',
        category: 'review',
        moduleName: '肖四选择题',
        title: '肖四选择题：复习四套错题并全部复盘闭环',
        detail: '扫清肖四选择题中的所有模糊选项与时政细节',
        isCompleted: false,
      },
      {
        id: 'pol-w6-xiao8-mini',
        category: 'miniprogram',
        moduleName: '肖八与小程序',
        title: '肖八选择题高频错题回顾 + 小程序 40～60 题',
        detail: '维持客观题判题直觉，不占过多整块时间',
        isCompleted: false,
      },
    ],
    acceptanceCriteria: [
      {
        id: 'pol-w6-acc-1',
        text: '肖四四套主观题完成第一轮。',
        isCompleted: false,
      },
      {
        id: 'pol-w6-acc-2',
        text: '第 1、2 套至少复习一次。',
        isCompleted: false,
      },
      {
        id: 'pol-w6-acc-3',
        text: '肖四选择题错题完成复盘。',
        isCompleted: false,
      },
    ],
    guidance: [
      '这周要逐步形成滚动背诵：① 新内容：每天争取掌握 1～2 道主观题；② 旧内容：每次学习先花 10～15 分钟回忆之前背过的内容；③ 不熟内容：单独标记，后面优先复习。',
    ],
  },

  // =========================================================================
  // 第 7 周：12 月 15 日—12 月 18 日（考前冲刺阶段）
  // =========================================================================
  {
    id: 'pol-week-7',
    weekNumber: 7,
    title: '第 7 周：考前冲刺阶段（最后冲刺 · 巩固已掌握内容）',
    dateRange: '12月15日—12月18日',
    startDate: '2026-12-15',
    endDate: '2026-12-18',
    stageGroup: 'xiao4_sprint',
    phaseTitle: '考前冲刺阶段',
    inputFocus: '重点热点和手册查漏补缺，不再引入大量新资料，不临时背诵其他老师预测题',
    outputFocus: '肖四四套主观题第二轮重点复习、肖四/肖八选择题错题回顾、时政查漏补缺',
    coreGoal: '巩固已经掌握的内容，不再引入大量新资料。',
    subTasks: [
      {
        id: 'pol-w7-essay-r2-12',
        category: 'xiao4_essay',
        moduleName: '肖四主观题二轮',
        title: '肖四主观题第二轮重点复习：第 1、2 套快速提取关键词与框架',
        detail: '看着题干快速在脑海中列出采分点，重点强化之前标记的不熟题目',
        isCompleted: false,
      },
      {
        id: 'pol-w7-essay-r2-34',
        category: 'xiao4_essay',
        moduleName: '肖四主观题二轮',
        title: '肖四主观题第二轮重点复习：第 3、4 套快速提取关键词与框架',
        detail: '完成四套主观题第二轮重点回顾，确保考场上有话可写、逻辑清晰',
        isCompleted: false,
      },
      {
        id: 'pol-w7-mcq-review',
        category: 'review',
        moduleName: '选择题错题回顾',
        title: '选择题终极复盘：肖四、肖八错题回顾',
        detail: '只看错题与易混帽词，不再做大量新题',
        isCompleted: false,
      },
      {
        id: 'pol-w7-current-affairs',
        category: 'current_affairs',
        moduleName: '时政查漏补缺',
        title: '时政：重点热点和背诵手册查漏补缺',
        detail: '过一遍核心时政纪念日、重要会议表述与手册重点标记处',
        isCompleted: false,
      },
      {
        id: 'pol-w7-mock-state',
        category: 'course',
        moduleName: '模拟与状态',
        title: '完成一次选择题限时练习（若之前未模拟过）+ 保持正常作息不熬夜突击',
        detail: '稳住心态与生物钟，从容迎接12月19日上午政治首战',
        isCompleted: false,
      },
    ],
    acceptanceCriteria: [
      {
        id: 'pol-w7-acc-1',
        text: '肖四四套主观题完成第二轮重点复习，核心采分词烂熟于心。',
        isCompleted: false,
      },
      {
        id: 'pol-w7-acc-2',
        text: '肖四、肖八选择题错题完成考前终极回顾。',
        isCompleted: false,
      },
      {
        id: 'pol-w7-acc-3',
        text: '重点时政热点与背诵手册完成查漏补缺，作息平稳不熬夜。',
        isCompleted: false,
      },
    ],
    guidance: [
      '这几天不建议再做大量新题，也不要临时背诵好几套其他老师的预测题。',
      '保持正常作息，不熬夜突击，带着清晰的五部分知识框架与肖四核心语料稳健上考场！',
    ],
  },
];

/**
 * Finds the PoliticsWeekPlan matching a given YYYY-MM-DD date.
 * - If date < 2026-11-03, returns Week 1 with status 'pre'.
 * - If date > 2026-12-18, returns Week 7 with status 'post'.
 * - Otherwise returns the matching week with status 'active'.
 */
export function getPoliticsWeekForDate(
  date: string,
  weeks: PoliticsWeekPlan[]
): { weekPlan: PoliticsWeekPlan; status: 'pre' | 'active' | 'post' } {
  const safeWeeks = weeks.length > 0 ? weeks : INITIAL_POLITICS_WEEK_PLANS;
  if (date < '2026-11-03') {
    return { weekPlan: safeWeeks[0], status: 'pre' };
  }
  if (date > '2026-12-18') {
    return { weekPlan: safeWeeks[safeWeeks.length - 1], status: 'post' };
  }
  const found = safeWeeks.find((w) => date >= w.startDate && date <= w.endDate);
  if (found) {
    return { weekPlan: found, status: 'active' };
  }
  return { weekPlan: safeWeeks[0], status: 'active' };
}

export function getPoliticsTaskForDate(date: string) {
  const { weekPlan, status } = getPoliticsWeekForDate(date, INITIAL_POLITICS_WEEK_PLANS);
  return {
    phaseId: (status === 'pre'
      ? 'early'
      : weekPlan.weekNumber === 1
        ? 'phase1'
        : weekPlan.weekNumber <= 4
          ? 'phase2'
          : weekPlan.weekNumber <= 6
            ? 'phase3'
            : 'phase4') as 'early' | 'phase1' | 'phase2' | 'phase3' | 'phase4',
    phaseTitle: weekPlan.phaseTitle,
    dateRange: weekPlan.dateRange,
    dayType: 'weekly_check' as const,
    dayTypeLabel: `第${weekPlan.weekNumber}周动态规划`,
    title:
      status === 'pre'
        ? `政治按周预热 · 准备进入第1周（${weekPlan.dateRange}）`
        : `政治第${weekPlan.weekNumber}周动态规划（${weekPlan.dateRange}）`,
    durationRange: '按周动态分配（5+2学习日）',
    durationMinutes: 60,
    goal: weekPlan.coreGoal,
    keyDirectives: weekPlan.guidance,
  };
}

