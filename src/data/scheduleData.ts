import { DayPlan } from '../types/kaoyan';

// 以 documents/政治计划 为准。这里按当天数学是否全真模考，落入计划中的最低或完整要求。
const POLITICS_SCHEDULE_BY_DATE: Record<string, DayPlan['politicsTask']> = {
  '2026-10-31': {
    title: '恢复知识框架：背诵手册目录',
    action: '浏览腿姐背诵手册目录，了解马原、史纲、毛中特、思修、时政的内容分布；完成 10 道题。',
    durationMinutes: 50,
  },
  '2026-11-01': {
    title: '马原：哲学基本问题、唯物论、唯心论',
    action: '看对应知识点，完成 15～20 道题并订正。',
    durationMinutes: 50,
  },
  '2026-11-02': {
    title: '马原：联系、发展、矛盾规律、辩证法',
    action: '回顾易混概念，完成 10 道题。',
    durationMinutes: 50,
  },
  '2026-11-03': {
    title: '马原：实践与认识、真理与价值',
    action: '完成 15～20 道题，尝试解释每个错误选项。',
    durationMinutes: 50,
  },
  '2026-11-04': {
    title: '马原：唯物史观、社会基本矛盾、人民群众',
    action: '完成 15～20 道题，并完成本阶段马原错题回顾。',
    durationMinutes: 50,
  },
  '2026-11-05': {
    title: '史纲时间线与其余模块框架',
    action: '回顾史纲重要时间点，完成 10 道题。',
    durationMinutes: 50,
  },
  '2026-11-06': {
    title: '肖八第 1 套：选择题',
    action: '完成整套选择题，并进行初步订正。',
    durationMinutes: 60,
  },
  '2026-11-07': {
    title: '肖八第 1 套：复盘',
    action: '复盘错题和易混概念。',
    durationMinutes: 60,
  },
  '2026-11-08': {
    title: '肖八第 2 套：选择题',
    action: '完成整套选择题，并进行初步订正。',
    durationMinutes: 60,
  },
  '2026-11-09': {
    title: '肖八第 2 套：复盘',
    action: '回顾错误选项。',
    durationMinutes: 60,
  },
  '2026-11-10': {
    title: '肖八第 3 套：选择题',
    action: '完成整套选择题，并进行初步订正。',
    durationMinutes: 60,
  },
  '2026-11-11': {
    title: '肖八第 3 套：复盘',
    action: '复习马原相关错题。',
    durationMinutes: 60,
  },
  '2026-11-12': {
    title: '肖八第 4 套：选择题',
    action: '完成整套选择题，并进行初步订正。',
    durationMinutes: 60,
  },
  '2026-11-13': {
    title: '肖八第 4 套：复盘',
    action: '复习错题和手册标记。',
    durationMinutes: 60,
  },
  '2026-11-14': {
    title: '肖八第 5 套：选择题',
    action: '完成整套选择题，并进行初步订正。',
    durationMinutes: 60,
  },
  '2026-11-15': {
    title: '肖八第 5 套：复盘',
    action: '完整分析错项，重做错误题目。',
    durationMinutes: 60,
  },
  '2026-11-16': {
    title: '肖八第 6 套：选择题',
    action: '完成 15～20 道题，并标记疑问。',
    durationMinutes: 60,
  },
  '2026-11-17': {
    title: '肖八第 6 套：复盘',
    action: '完成整套复盘，整理反复出错的概念。',
    durationMinutes: 60,
  },
  '2026-11-18': {
    title: '肖八第 7 套：选择题',
    action: '完成 15～20 道题。',
    durationMinutes: 60,
  },
  '2026-11-19': {
    title: '肖八第 7 套：复盘',
    action: '完整复盘，检查前几套反复出现的错误。',
    durationMinutes: 60,
  },
  '2026-11-20': {
    title: '肖八第 8 套：选择题',
    action: '完成整套选择题，并进行初步订正。',
    durationMinutes: 60,
  },
  '2026-11-21': {
    title: '肖八第 8 套：复盘',
    action: '回顾高频错题。',
    durationMinutes: 60,
  },
  '2026-11-22': {
    title: '肖八第 1～2 套错题复做',
    action: '复做两套错题，整理仍然不理解的选项。',
    durationMinutes: 60,
  },
  '2026-11-23': {
    title: '肖八第 3～4 套错题复做',
    action: '复盘两套，回到手册定位知识点。',
    durationMinutes: 60,
  },
  '2026-11-24': {
    title: '肖八第 5～6 套错题复做',
    action: '复盘两套，分析重复错误。',
    durationMinutes: 60,
  },
  '2026-11-25': {
    title: '肖八第 7～8 套错题复做',
    action: '复盘两套，完成八套卷错题第一轮汇总。',
    durationMinutes: 60,
  },
  '2026-11-26': {
    title: '小程序混合练习 30～35 题',
    action: '完成 15～20 道题。',
    durationMinutes: 60,
  },
  '2026-11-27': {
    title: '混合练习复盘与薄弱模块定位',
    action: '逐题订正 11 月 26 日练习，并确定最薄弱的两个知识模块。',
    durationMinutes: 60,
  },
  '2026-11-28': {
    title: '专项巩固：马原与史纲',
    action: '复习各模块最容易混淆的概念。',
    durationMinutes: 60,
  },
  '2026-11-29': {
    title: '专项巩固：毛中特、思修与时政',
    action: '分模块练习，结合错题回到手册查漏。',
    durationMinutes: 60,
  },
  '2026-11-30': {
    title: '选择题小测 30～35 题',
    action: '完成 15～20 道题。',
    durationMinutes: 60,
  },
  '2026-12-01': {
    title: '肖八第 1～4 套高频错题复习',
    action: '分模块复习前四套卷错题，完成 10 道对应练习。',
    durationMinutes: 60,
  },
  '2026-12-02': {
    title: '肖八第 5～8 套高频错题复习',
    action: '复习一组高频错误。',
    durationMinutes: 60,
  },
  '2026-12-03': {
    title: '混合选择题练习与时政要点',
    action: '完成 30～35 道混合选择题，并回顾时政相关知识点。',
    durationMinutes: 60,
  },
  '2026-12-04': {
    title: '高频错题清单检查与肖四准备',
    action: '完成一次错题抽查，浏览肖四主观题题目与答案结构；肖四未到手则复习手册。',
    durationMinutes: 60,
  },
  '2026-12-05': {
    title: '肖四第 1 套：选择题与主观题前两题',
    action: '完成整套选择题并分析错项，背诵第 1 套主观题前两题。',
    durationMinutes: 80,
  },
  '2026-12-06': {
    title: '肖四第 1 套：主观题后两题与回顾',
    action: '完成后两题，回顾前两题；合上答案复述四道题的主要框架。',
    durationMinutes: 80,
  },
  '2026-12-07': {
    title: '肖四第 2 套：选择题与主观题前两题',
    action: '完成整套选择题，背诵主观题前两题，并简短回顾第 1 套。',
    durationMinutes: 80,
  },
  '2026-12-08': {
    title: '肖四第 2 套：主观题后两题与回顾',
    action: '完成第 2 套首轮背诵，复述第 1 套关键词。',
    durationMinutes: 80,
  },
  '2026-12-09': {
    title: '肖四第 3 套：选择题与主观题前两题',
    action: '完成部分选择题，并背诵主观题前两题的核心框架。',
    durationMinutes: 80,
  },
  '2026-12-10': {
    title: '肖四第 3 套：主观题后两题与回顾',
    action: '完成第 3 套首轮背诵，检查第 2 套记忆漏洞。',
    durationMinutes: 80,
  },
  '2026-12-11': {
    title: '肖四第 4 套：选择题与主观题前两题',
    action: '完成整套选择题，背诵主观题前两题。',
    durationMinutes: 80,
  },
  '2026-12-12': {
    title: '肖四第 4 套：主观题后两题与回顾',
    action: '完成四套主观题首轮学习，尝试口头回忆核心要点。',
    durationMinutes: 80,
  },
  '2026-12-13': {
    title: '肖四第一轮回顾：第 1～2 套主观题',
    action: '逐题回忆两套答案的核心观点、论述层次与关键词。',
    durationMinutes: 80,
  },
  '2026-12-14': {
    title: '肖四第一轮回顾：第 3～4 套主观题',
    action: '逐题回忆两套答案框架，补齐薄弱内容。',
    durationMinutes: 80,
  },
  '2026-12-15': {
    title: '肖四第二轮背诵：第 1～2 套薄弱题',
    action: '针对遗漏较多的题目进行第二轮背诵，并抽查第一轮内容。',
    durationMinutes: 80,
  },
  '2026-12-16': {
    title: '肖四第二轮背诵：第 3～4 套薄弱题',
    action: '完成后两套薄弱题复习，检查四套答案的熟练程度。',
    durationMinutes: 80,
  },
  '2026-12-17': {
    title: '肖四全部主观题框架总回顾',
    action: '不看答案回忆四套主观题结构，并复习肖四选择题易错点。',
    durationMinutes: 80,
  },
  '2026-12-18': {
    title: '考前轻量复习：主观题框架、易混点与时政',
    action: '完成最后检查，停止开新卷，不追求额外题量。',
    durationMinutes: 80,
  },
};

export const INITIAL_DAY_PLANS: DayPlan[] = [
  {
    "date": "2026-10-08",
    "formattedDate": "10月8日",
    "weekday": "周四",
    "theme": "数二偏微分化简与极值 · 计组数据表示收口",
    "math2Task": {
      "id": "math2-1008",
      "date": "2026-10-08",
      "dayIndex": 1,
      "subject": "math2",
      "phase": "高数下册极速收口",
      "title": "多元微分全通（偏微分方程化简 + 极值最值）",
      "focusArea": "变量代换链式二阶偏导求导 + 无条件与条件极值",
      "coreConcepts": [
        "变量代换极坐标/复合代换下的一阶与二阶偏导数求导公式",
        "无条件极值驻点判别式：Δ = AC - B²（A>0极大、A<0极小）",
        "拉格朗日乘数法：构造 L(x,y,λ) = f + λφ 联立方程求解"
      ],
      "mcqTarget": "做透多元微分可微/偏导连续等充要条件真题选择题 3~5 道",
      "bigQuestionTarget": "亲手在草稿纸上把 2 道经典的变量代换偏微分方程大题算到底",
      "recommendedProblems": [
        "张宇18讲例题：极坐标代换化简偏微分方程",
        "拉格朗日最值经典几何应用例题"
      ],
      "pitfallsToAvoid": [
        "不要看冗长概念视频，只看讲义链式求导树状图",
        "二阶偏导复合代换极易漏掉中间变量，务必一步步写清楚"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "co-1008",
      "date": "2026-10-08",
      "dayIndex": 1,
      "subject": "co",
      "phase": "计组决战13天",
      "title": "第2章 数据的表示与运算（强力收口日）",
      "focusArea": "IEEE 754 浮点数 + 补码溢出判定 + C语言强制类型转换",
      "coreConcepts": [
        "IEEE 754 浮点数：1位数符 + 8位阶码(移码，偏移量127) + 23位尾数(原码规格化)",
        "定点数溢出判断：双符号位变形补码与最高有效位/符号位进位异或判定",
        "C语言类型转换：无符号与有符号转换原值不变仅解释方式改变；短字长向长字长高位扩展（符号扩展/零扩展）"
      ],
      "mcqTarget": "只刷历年统考真题选择中关于浮点数与截断判断的题目（约6道）",
      "bigQuestionTarget": "攻克 1 道 C 语言数据表示与截断真题大题",
      "recommendedProblems": [
        "【2011年统考真题第43题】",
        "【2018年统考真题第43题】"
      ],
      "pitfallsToAvoid": [
        "不要花时间纠结复杂的硬件加法器逻辑门线路",
        "今天必须掐死第2章核心运算，后续稳住心态推进存储系统"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做与精读",
      "action": "限时 18 分钟精做 1 篇历年真题阅读，用 35 分钟精读长难句与生词，15 分钟复习昨日词汇（总时严格控制在 70 分钟内）",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "马原导论与唯物论核心",
      "action": "读背诵手册 15 分钟（物质与意识、实践观点），小程序刷对应真题核心选择 20 题，错题用荧光笔回填手册",
      "durationMinutes": 50
    }
  },
  {
    "date": "2026-10-09",
    "formattedDate": "10月9日",
    "weekday": "周五",
    "theme": "数二二重积分全通 · 【下午学校课程】408轻量保温",
    "math2Task": {
      "id": "math2-1009",
      "date": "2026-10-09",
      "dayIndex": 2,
      "subject": "math2",
      "phase": "高数下册极速收口",
      "title": "二重积分全通（直角/极坐标 + 对称性化简 + 综合大题）",
      "focusArea": "直角坐标与极坐标转换 + 奇偶性与轮换对称性化简",
      "coreConcepts": [
        "交换积分次序技巧：画出积分区域草图，找交点与投影区间",
        "极坐标转换要素：dxdy = r dr dθ，被积函数有 x²+y² 或区域为圆形时必用",
        "轮换对称性：若区域关于 y=x 对称，则 ∬ f(x) dσ = ∬ f(y) dσ = 1/2 ∬ [f(x)+f(y)] dσ"
      ],
      "mcqTarget": "做透二重积分比较大小、对称性化简真题选择题 3 道",
      "bigQuestionTarget": "精做 1 道带有绝对值或分块积分的二重积分综合大题",
      "recommendedProblems": [
        "讲义例题：分段函数/绝对值二重积分",
        "极坐标下交换积分次序综合题"
      ],
      "pitfallsToAvoid": [
        "极坐标二重积分切记别漏掉微元面积中的 r！",
        "看到复杂被积函数，第一时间先看区域对称性，奇偶化简能秒杀"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "co-course-1009",
      "date": "2026-10-09",
      "dayIndex": 2,
      "subject": "co",
      "phase": "课程机动与轻量保温",
      "title": "【下午学校课程占用】408错题反刍与数制基础轻量巩固",
      "focusArea": "下午专业课在校上课 · 晚间零碎时间巩固第2章 IEEE754 与补码溢出",
      "coreConcepts": [
        "今日下午因连续学校课程占用，408硬核大题向后顺延两天，集中精力打赢上午高数下二重积分攻坚战！",
        "利用课间或晚间零碎 45~60 分钟，快速翻看第2章错题，确保无符号/有符号强制转换和移码概念清晰",
        "轻装上阵，不打疲劳战，保质保量完成数学与英语，为后续存储系统大决战蓄力"
      ],
      "mcqTarget": "小程序刷 5 道浮点数选择题，保持手感即可",
      "bigQuestionTarget": "今日不安排硬核新大题，回顾昨日第43题错因",
      "recommendedProblems": [
        "昨日错题重做与公式速记"
      ],
      "pitfallsToAvoid": [
        "切勿因为下午有课而产生焦虑自责！动态顺延正是为了确保学一个吃透一个！"
      ],
      "suggestedDurationMinutes": 60,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做与昨日复盘",
      "action": "真题阅读 1 篇精做 + 长难句主干抓取分析 + 记下核心真题熟词生义",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "唯物辩证法核心（两大特征三大规律）",
      "action": "读手册 15 分钟（对立统一规律、矛盾分析法），小程序刷 20 道哲学经典错题陷阱",
      "durationMinutes": 50
    }
  },
  {
    "date": "2026-10-10",
    "formattedDate": "10月10日",
    "weekday": "周六",
    "theme": "数二微分方程一阶与降阶 · 【下午学校课程】408数制复盘",
    "math2Task": {
      "id": "math2-1010",
      "date": "2026-10-10",
      "dayIndex": 3,
      "subject": "math2",
      "phase": "高数下册极速收口",
      "title": "常微分方程基础（一阶方程公式 + 三种可降阶高阶方程）",
      "focusArea": "一阶线性微分方程公式法 + 可降阶方程令 y'=p 换元法",
      "coreConcepts": [
        "一阶线性非齐次公式：y = e^(-∫Pdx) * [ ∫ Q e^(∫Pdx) dx + C ]，务必带上常数C",
        "三种可降阶方程：y''=f(x) 直接积分；y''=f(x,y') 令 y'=p(x), y''=p'；y''=f(y,y') 令 y'=p(y), y''=p * dp/dy"
      ],
      "mcqTarget": "掌握一阶方程特解性质与通解结构真题选择题",
      "bigQuestionTarget": "亲手完整推导 1 道可降阶高阶微分方程求解大题",
      "recommendedProblems": [
        "讲义例题：几何切线斜率转化为一阶线性方程",
        "不显含x的可降阶微分方程求解"
      ],
      "pitfallsToAvoid": [
        "一阶线性方程积分因子中的负号切勿写错，C必须在括号内部一同乘外面的指数项"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "co-course-1010",
      "date": "2026-10-10",
      "dayIndex": 3,
      "subject": "co",
      "phase": "课程机动与轻量保温",
      "title": "【下午学校课程占用】408定点数溢出与浮点规格化速测",
      "focusArea": "下午专业课在校上课 · 晚间碎片时间完成第2章最后扫盲，蓄力明日主存攻坚",
      "coreConcepts": [
        "今日连续第二天下午上课，全天重点死守上午【数二常微分方程】黄金脑力期！",
        "408任务从明日（10.11）正式全力开启第3章存储系统（主存与芯片扩展）硬核攻坚！",
        "睡前用 30 分钟在草稿纸上速写 IEEE 754 阶码偏移量127与双符号位溢出判定逻辑"
      ],
      "mcqTarget": "小程序速刷 5 道数制与溢出判定选择题",
      "bigQuestionTarget": "今日不安排新大题，调整作息准备明日全天高强度",
      "recommendedProblems": [
        "讲义第2章关键概念树状图速览"
      ],
      "pitfallsToAvoid": [
        "连续两天下午有课结束！明天（10.11）周日整块时间全线扑向存储系统！"
      ],
      "suggestedDurationMinutes": 60,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做",
      "action": "做 1 篇真题阅读，分析错题原因（是偷换概念、因果倒置还是反向干扰），整理错题逻辑",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "认识论与真理价值",
      "action": "背诵手册读 15 分钟（实践与认识辩证关系、感性到理性飞跃），小程序刷对应真题",
      "durationMinutes": 50
    }
  },
  {
    "date": "2026-10-11",
    "formattedDate": "10月11日",
    "weekday": "周日",
    "theme": "数二二阶常系数微分方程 · 计组存储主存芯片扩展",
    "math2Task": {
      "id": "math2-1011",
      "date": "2026-10-11",
      "dayIndex": 4,
      "subject": "math2",
      "phase": "高数下册极速收口",
      "title": "微分方程核心（二阶常系数齐次/非齐次方程 + 解的结构定理）",
      "focusArea": "特征方程法求齐次通解 + 待定系数法求非齐次特解",
      "coreConcepts": [
        "齐次方程 r² + pr + q = 0：两不等实根、二重实根 (C1+C2x)e^(rx)、共轭复根 e^(αx)(C1 cosβx + C2 sinβx)",
        "非齐次特解型一：f(x) = e^(λx)Pm(x)，特解 y* = x^k Qm(x)e^(λx)，k为λ是特征根的重数",
        "非齐次特解型二：f(x) = e^(αx)[P cosβx + Q sinβx]，特解 y* = x^k e^(αx)[...], k取决于 α±iβ 是否为特征根"
      ],
      "mcqTarget": "熟练根据通解反求微分方程参数、线性微分方程解的线性组合性质选择题",
      "bigQuestionTarget": "精做 2 道非齐次二阶常系数微分方程特解求解解答题",
      "recommendedProblems": [
        "讲义例题：三角函数型非齐次特解设定与代入求系数",
        "解的结构定理综合证明与计算"
      ],
      "pitfallsToAvoid": [
        "特解形式中的 x^k 千万别忘了根据特征根判定 k=0, 1 还是 2！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "co-1009",
      "date": "2026-10-11",
      "dayIndex": 4,
      "subject": "co",
      "phase": "计组决战13天",
      "title": "第3章 存储系统（主存与芯片扩展）",
      "focusArea": "SRAM vs DRAM + DRAM刷新 + 主存芯片字位扩展与译码器连接",
      "coreConcepts": [
        "SRAM（双稳态触发器，Cache使用，快，成本高） vs DRAM（电容栅极电荷，主存使用，需定期刷新）",
        "DRAM 刷新方式：集中刷新（有死时间）、分散刷新（无死时间延长周期）、异步刷新（无死区，常用）",
        "芯片扩展：位扩展（并联数据线）、字扩展（译码器产生片选信号CS）、字位同时扩展"
      ],
      "mcqTarget": "刷透芯片引脚数计算（数据线+地址线+读写控制线+片选线）与刷新周期真题选择",
      "bigQuestionTarget": "攻克 1 道主存芯片扩展与地址译码器连接大题（画出连线草图）",
      "recommendedProblems": [
        "【2009年统考真题第43题】或【2012年真题大题】"
      ],
      "pitfallsToAvoid": [
        "DRAM 行列地址复用技术：地址线引脚数减半，切勿按常规引脚加总"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做",
      "action": "做 1 篇真题阅读，复习昨日错词，整理段落逻辑转折词",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "唯物史观与唯心史观辨析",
      "action": "读手册 15 分钟（生产力与生产关系、经济基础与上层建筑、人民群众历史地位），刷小程序 20 题",
      "durationMinutes": 50
    }
  },
  {
    "date": "2026-10-12",
    "formattedDate": "10月12日",
    "weekday": "周一",
    "theme": "数二高数下结课（方程应用） · 计组Cache映射与容量",
    "math2Task": {
      "id": "math2-1012",
      "date": "2026-10-12",
      "dayIndex": 5,
      "subject": "math2",
      "phase": "高数下册极速收口",
      "title": "微分方程应用大题（几何应用 + 物理应用）高数下大结课！",
      "focusArea": "数二专有12分大题：切线切距列方程 + 变力做功/变速运动物理建模",
      "coreConcepts": [
        "几何应用：切线方程 Y - y = y'(X - x)，截距、旋转体体积与侧面积微元积分列方程",
        "物理应用：牛顿第二定律 F = m * dv/dt = m * v * dv/dx，变速运动阻力模型",
        "变力做功：dW = F(x) dx；水流容器排液微元分析"
      ],
      "mcqTarget": "快速复盘高数下册易错选择题概念",
      "bigQuestionTarget": "亲手算透 1 道物理应用（牛顿定律运动）和 1 道几何应用解答题",
      "recommendedProblems": [
        "讲义经典物理应用大题（变速阻力运动求速度与位移）",
        "几何图形绕轴旋转体积列微分方程"
      ],
      "pitfallsToAvoid": [
        "注意物理量方向与符号！例如阻力与运动方向相反必须加负号 -kv！",
        "今日正式宣告高数下册强化彻底结束，明天全军转向线性代数！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "co-1010",
      "date": "2026-10-12",
      "dayIndex": 5,
      "subject": "co",
      "phase": "计组决战13天",
      "title": "第3章 Cache 核心映射与容量计算（极高频大题！）",
      "focusArea": "全相联/直接/组相联映射 + 主存地址 Tag/Index/Offset 拆解 + Cache总容量",
      "coreConcepts": [
        "地址拆分：块内偏移 Offset = log2(块大小B)；Cache组号 Index = log2(组数)；Tag = 主存地址位数 - Index - Offset",
        "Cache 行包含：有效位(1) + 脏位Dirty(1,写回法有) + 替换标记位Tag + 替换控制位(LRU log2组相联度) + 数据块Data",
        "Cache 总容量 = 行数 × (行开销标记位数 + 数据块位数)，绝对不等于单纯的数据容量！"
      ],
      "mcqTarget": "刷透主存地址字段位数划分选择题 4 道",
      "bigQuestionTarget": "精做 1 道统考组相联 Cache 容量与地址映射大题（必须一步步列式计算）",
      "recommendedProblems": [
        "【2010年统考真题第43题】（经典母题，必须吃透）"
      ],
      "pitfallsToAvoid": [
        "注意主存是按字节编址还是按字编址，块内地址位数根据编址单位计算",
        "计算 Cache 总容量时切勿漏掉有效位、脏位和 LRU 位！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做",
      "action": "做 1 篇真题阅读，复盘长难句拆分与修饰成分省略技巧",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "政治经济学核心（商品二因素与劳动二重性）",
      "action": "读手册 15 分钟（使用价值与价值、具体劳动与抽象劳动、不变资本与可变资本、剩余价值率计算），刷题清错",
      "durationMinutes": 50
    }
  },
  {
    "date": "2026-10-13",
    "formattedDate": "10月13日",
    "weekday": "周二",
    "theme": "数二线代矩阵运算全家桶 · 计组Cache替换与写策略",
    "math2Task": {
      "id": "math2-1013",
      "date": "2026-10-13",
      "dayIndex": 6,
      "subject": "math2",
      "phase": "线性代数闪电战",
      "title": "矩阵运算全家桶（乘法/幂 + 伴随矩阵A*八大公式 + 初等矩阵）",
      "focusArea": "A*核心性质 + 初等行变换左乘/列变换右乘 + 矩阵方程求解",
      "coreConcepts": [
        "A* 黄金恒等式：AA* = A*A = |A|E；|A*| = |A|^(n-1)；(A*)* = |A|^(n-2) A；(kA)* = k^(n-1) A*",
        "初等矩阵：初等行变换相当于左乘初等矩阵，初等列变换相当于右乘初等矩阵；初等矩阵求逆仍为同类初等矩阵",
        "A^n 常见求法：秩为1时 A = αβ^T 则 A^n = (β^T α)^(n-1) A；二项式定理；对角化法"
      ],
      "mcqTarget": "做透伴随矩阵性质、矩阵可逆等充要条件真题选择题 4 道",
      "bigQuestionTarget": "求解矩阵方程 AXB = C 与利用分块矩阵求逆大题",
      "recommendedProblems": [
        "讲义例题：利用初等变换求 (A|E) -> (E|A^-1)",
        "伴随矩阵与逆矩阵综合化简题"
      ],
      "pitfallsToAvoid": [
        "矩阵乘法不满足交换律！提取公因式时务必看清是在左侧还是右侧提取！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "co-1011",
      "date": "2026-10-13",
      "dayIndex": 6,
      "subject": "co",
      "phase": "计组决战13天",
      "title": "第3章 Cache 替换策略、写策略与平均访存时间",
      "focusArea": "全写法 vs 写回法 + 写分配 vs 非写分配 + LRU替换过程追踪",
      "coreConcepts": [
        "写命中策略：全写法(Write Through，同时写Cache和主存) vs 写回法(Write Back，只写Cache设脏位，淘汰时写回主存)",
        "写缺失策略：写分配法(Write Allocate，调块入Cache) vs 非写分配法(No-Write Allocate，直接写主存)",
        "平均访存时间公式：t_avg = t_cache + (1 - h) × t_miss_penalty"
      ],
      "mcqTarget": "做透写策略搭配组合与 LRU 计数器更新算法真题选择题 4 道",
      "bigQuestionTarget": "精做 1 道综合读写命中率与平均访存时间真题大题",
      "recommendedProblems": [
        "【2016年统考真题第43题】"
      ],
      "pitfallsToAvoid": [
        "全写法通常配合非写分配法使用；写回法通常配合写分配法使用"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做",
      "action": "做 1 篇真题阅读，提炼文章态度词（objective, skeptical, critical等高频词）",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "政经与科学社会主义",
      "action": "读手册 15 分钟（资本有机构成 c:v、超额剩余价值与相对剩余价值区别），刷小程序 20 题",
      "durationMinutes": 50
    }
  },
  {
    "date": "2026-10-14",
    "formattedDate": "10月14日",
    "weekday": "周三",
    "theme": "数二线代矩阵运算深度通关 · 计组第3章大捷收工（抢先开启第4章指令系统！）",
    "math2Task": {
      "id": "math2-1014-matrix-ops",
      "date": "2026-10-14",
      "dayIndex": 7,
      "subject": "math2",
      "phase": "线代特种战",
      "title": "【线代特种战 Day 1】矩阵运算深度通关（证明A=O + 计算A^n + 伴随/逆/初等矩阵 + 矩阵方程）",
      "focusArea": "张宇知识树：矩阵运算五大必考方向（5分小题+12分大题计算基石）",
      "coreConcepts": [
        "证 A=O 四大武器（5分）：① A^T A = O <=> A = O；② r(A)=0 <=> A=O；③ 对任意 x 恒有 Ax = 0 <=> A=O；④ 根据矩阵元素定义法证明",
        "计算 A^n 四大套路（5分/12分）：① 秩1分解法：若 A = αβ^T，则 A^n = (β^T α)^(n-1) A；② 二项式展开法：A = λE + B（其中 B 为严格上三角/零幂矩阵，B^k = O）；③ 递推猜想归纳法；④ 相似对角化法：A^n = P Λ^n P^-1（后续相似章节联动）",
        "A^T、A*、A^-1 与初等矩阵（5分）：A* 黄金八大恒等式（AA* = A*A = |A|E；|A*| = |A|^(n-1)；(A*)* = |A|^(n-2) A；(kA)* = k^(n-1) A*）；初等矩阵：行变换左乘，列变换右乘，初等矩阵求逆仍为同类初等矩阵",
        "分块矩阵（5分）：主对角分块矩阵与副对角分块矩阵的行列式、求逆与高次幂公式",
        "求解矩阵方程（5分/12分）：AX=B => X=A^-1 B 或行变换 (A|B) -> (E|X)；AXB=C 求解；方程两侧同乘必须看清左右，乘法不满足交换律！"
      ],
      "mcqTarget": "做透伴随矩阵代数余子式计算、矩阵可逆充要条件与初等矩阵乘法选择题 5 道",
      "bigQuestionTarget": "求解含参数矩阵方程 AXB = C 与分块矩阵初等变换大题",
      "recommendedProblems": [
        "讲义例题：A^T A = O 证明题与秩1矩阵 A = αβ^T 计算 A^n",
        "初等行变换求 (A|E) -> (E|A^-1) 及矩阵方程综合题"
      ],
      "pitfallsToAvoid": [
        "矩阵乘法绝无交换律！提取公因式时务必看清是在左侧还是右侧提取！",
        "切勿由 AB = AC 轻易推断 B = C！只有在 A 可逆（|A|≠0）时才能两边左乘 A^-1 消去！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "co-1014-ch4-start",
      "date": "2026-10-14",
      "dayIndex": 7,
      "subject": "co",
      "phase": "计组决战 · 极速破局",
      "title": "【第3章大题全歼大捷】抢跑第4章指令系统（指令格式与扩展操作码设计）",
      "focusArea": "第3章真题大题扫尾复盘 + 开启定长/变长指令与扩展操作码前缀编码设计",
      "coreConcepts": [
        "战斗力爆发！2天啃完第3章全部选择与大题真题，直接填平此前大学课程顺延，进入进攻冲刺节奏！",
        "扩展操作码核心规则：短操作码不能作为长操作码的前缀（前缀编码），保留部分编码状态向更长操作码扩展",
        "指令字长与存储字长、机器字长关系：指令字长取决于操作码位数与寻址地址码位数之和"
      ],
      "mcqTarget": "做透三地址/二地址/一地址指令最大条数计算真题选择题 4 道",
      "bigQuestionTarget": "攻克 1 道扩展操作码分配计算经典大题（送分题，必须拿满）",
      "recommendedProblems": [
        "讲义扩展操作码设计例题（如设计15条二地址、31条一地址、64条零地址指令）"
      ],
      "pitfallsToAvoid": [
        "扩展操作码计算切勿漏算保留状态乘 2^k！今晚趁热打铁打通前缀编码逻辑！"
      ],
      "suggestedDurationMinutes": 180,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做",
      "action": "做 1 篇真题阅读，复盘作者观点句与论据句的区别",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "史纲起点（近代中国国情与早期探索）",
      "action": "读手册 15 分钟（近代中国两大矛盾两大任务、洋务运动天朝田亩辛亥革命成败原因），刷选择题 20 题",
      "durationMinutes": 50
    }
  },
  {
    "date": "2026-10-15",
    "formattedDate": "10月15日",
    "weekday": "周四",
    "theme": "数二矩阵的秩与向量组相关性 · 计组指令寻址全攻坚（第4章全速大通关！）",
    "math2Task": {
      "id": "math2-1015-rank-vectors",
      "date": "2026-10-15",
      "dayIndex": 8,
      "subject": "math2",
      "phase": "线代特种战",
      "title": "【线代特种战 Day 2】矩阵的秩与向量组相关性/极大无关组（张宇知识树：求矩阵的秩 + 向量组）",
      "focusArea": "公式求秩 + 抽象/具体向量组相关性判别 + 向量组等价与极大无关组",
      "coreConcepts": [
        "求矩阵的秩（5分）：定义求秩（最高阶非零子式阶数）；公式求秩黄金不等式：r(AB) ≤ min(r(A), r(B))；r(A+B) ≤ r(A)+r(B)；若 AB = O 则 r(A)+r(B) ≤ n；r(A*) 三段论（若 r(A)=n 则 n，若 r(A)=n-1 则 1，若 r(A)<n-1 则 0）；初等变换不改变矩阵的秩",
        "研究具体型向量关系（5分）：将列向量拼成矩阵作初等行变换化为阶梯形，主元所在列为极大线性无关组，非主元列由主元列线性表出的系数直接在行最简形中读出",
        "研究抽象型向量关系（5分）：定义反设法（设 ∑k_i α_i = 0，通过矩阵乘法或反证法证明系数 k_i 全为0）；利用行列式 det(α1..αn) ≠ 0 等价于无关；部分相关则整体必相关，整体无关则部分必无关",
        "研究向量组等价（5分）：向量组 (I) 与 (II) 等价充要条件是能互相线性表出 <=> r(I) = r(II) = r(I, II)；切记：向量组等价要求能互相表出，矩阵等价只需同型同秩，二者概念千万不能混淆！"
      ],
      "mcqTarget": "做透抽象向量组相关性判定与矩阵乘积秩的不等式选择题 5 道（5分必考高频）",
      "bigQuestionTarget": "求向量组的极大线性无关组并将剩余向量线性表出（大题规范书写）",
      "recommendedProblems": [
        "讲义例题：AB=O 综合秩与解空间大题",
        "抽象向量组 α1+α2, α2+α3, α3+α1 相关性判定与反证法证明题"
      ],
      "pitfallsToAvoid": [
        "注意数二不考“向量空间”！讲义上看到“基、维数、坐标变换矩阵”直接跳过一秒都不看！",
        "求极大线性无关组必须只做【初等行变换】，严禁做列变换，否则会改变原向量之间的线性关系！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "co-1015-ch4-addressing",
      "date": "2026-10-15",
      "dayIndex": 8,
      "subject": "co",
      "phase": "计组决战 · 极速破局",
      "title": "第4章 指令寻址方式全攻坚 + CISC/RISC对比（第4章全速大通关！）",
      "focusArea": "常见寻址方式有效地址EA计算 + 相对/基址/变址寻址对比 + CISC vs RISC",
      "coreConcepts": [
        "相对寻址核心天坑：EA = (PC) + A，注意以指令当前执行为基准（执行取指后PC已自增！切勿拿原PC算偏移量！）",
        "基址寻址 EA = (BR) + A 面向OS程序重定位；变址寻址 EA = (IX) + A 面向用户数组遍历",
        "CISC（复杂指令集，指令长短不一，微程序多） vs RISC（精简指令集，指令定长，单周期，硬布线为主，寄存器多）"
      ],
      "mcqTarget": "刷透各类寻址方式访存次数比较与 CISC/RISC 特性选择题 5 道",
      "bigQuestionTarget": "攻克 1 道根据操作码与寻址字段翻译地址的大题（【2012年统考真题第43题】）",
      "recommendedProblems": [
        "【2012年统考真题第43题】"
      ],
      "pitfallsToAvoid": [
        "今日彻底封存第4章，绝不多留一天，明天全军挥师会师第5章CPU！"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做",
      "action": "做 1 篇真题阅读，摘录文中出现的高频书面表达句式（为下旬作文模板积累素材）",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "开天辟地与大革命、土地革命",
      "action": "读手册 15 分钟（五四运动、建党开天辟地、国共第一次合作、八七会议、遵义会议生死攸关），刷题清错",
      "durationMinutes": 50
    }
  },
  {
    "date": "2026-10-16",
    "formattedDate": "10月16日",
    "weekday": "周五",
    "theme": "数二线性方程组含参求解与公共解同解 · 计组CPU结构与微操作（提前挺进第5章CPU！）",
    "math2Task": {
      "id": "math2-1016-linear-systems",
      "date": "2026-10-16",
      "dayIndex": 9,
      "subject": "math2",
      "phase": "线代特种战",
      "title": "【线代特种战 Day 3】线性方程组全套突破（含参讨论、公共解与同解）（张宇知识树：线性方程组）",
      "focusArea": "解的判定与结构定理 + 含参方程组行列式分类讨论 + 齐次/非齐次公共解与同解",
      "coreConcepts": [
        "一般求解问题（含参常考）（5分/12分）：解的充要条件：r(A)=r(A|b)=n 唯一解；r(A)=r(A|b)<n 无穷多解（自由未知量个数 = n - r(A)）；r(A)<r(A|b) 无解；通解结构：非齐次通解 = 齐次基础解系线性组合 + 任意一个非齐次特解",
        "含参讨论标准化三步走：① 先求系数矩阵行列式 |A|，令 |A|=0 锁定参数临界值（|A|≠0 时必有唯一解，克拉默法则秒杀）；② 将临界参数代入增广矩阵 (A|b)，做初等行变换化为行阶梯形；③ 区分无解与无穷多解，求出对应的通解",
        "公共解问题（5分/12分）：① 齐次公共非零解：两方程组联立化为更高维方程组求解，或求出方程(I)的基础解系代入方程(II)验证约束；② 非齐次公共解：直接联立增广矩阵求解",
        "同解问题（5分/12分）：① 齐次同解充要条件：解集互相包含 <=> r(A) = r(B) = r(A/B并置矩阵)；② 非齐次同解充要条件：导出齐次方程同解，且共享至少一个公共特解"
      ],
      "mcqTarget": "做透线性方程组解的线性组合自由项性质与基础解系线性无关性选择题 4 道",
      "bigQuestionTarget": "精做 1 道 12 分含未知参数 a, b 的线性方程组讨论与公共解求解大题（标准母题规范书写）",
      "recommendedProblems": [
        "讲义例题：含参数 a, b 的 3 元非齐次线性方程组分类讨论及通解",
        "齐次线性方程组公共非零解与同解判定综合大题"
      ],
      "pitfallsToAvoid": [
        "含参数讨论时，务必先看系数行列式是否为0，当 |A|≠0 时千万不要去硬算行变换！",
        "跳过数一专属内容“线性方程组的几何意义”！一秒钟都不看！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "co-1016-cpu-structure",
      "date": "2026-10-16",
      "dayIndex": 9,
      "subject": "co",
      "phase": "计组决战 · 王牌章节",
      "title": "第5章 CPU结构与指令执行微操作周期【提前攻入王牌章节】",
      "focusArea": "运算器与控制器组成部件 + 通用/专用寄存器 + 指令周期数据流",
      "coreConcepts": [
        "专用寄存器（对汇编程序员透明不可见）：PC, IR, MAR, MDR；可见寄存器：通用寄存器, PSW, 基址/变址寄存器",
        "取指周期微操作：(PC) -> MAR -> 读主存 -> MDR -> IR；同时 (PC)+1 -> PC"
      ],
      "mcqTarget": "做透寄存器可见性判定与指令周期各阶段总线传输真题选择题 4 道",
      "bigQuestionTarget": "理清加法指令在取指、间址、执行周期的所有微操作流程",
      "recommendedProblems": [
        "讲义经典微操作信号分解例题"
      ],
      "pitfallsToAvoid": [
        "分清 MAR 和 MDR：MAR连接地址总线，MDR连接数据总线，二者均在CPU内部"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做",
      "action": "做 1 篇真题阅读，复习近 5 天整理的生词表",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "抗日战争与新民主主义革命胜利",
      "action": "读手册 15 分钟（洛川会议、论持久战、统一战线策略、延安整风、三大法宝、七届二中全会），刷题",
      "durationMinutes": 50
    }
  },
  {
    "date": "2026-10-17",
    "formattedDate": "10月17日",
    "weekday": "周六",
    "theme": "数二特征值特征向量核心性质与反求矩阵 · 计组数据通路与控制信号（提前攻坚最强痛点！）",
    "math2Task": {
      "id": "math2-1017-eigenvalues",
      "date": "2026-10-17",
      "dayIndex": 10,
      "subject": "math2",
      "phase": "线代特种战",
      "title": "【线代特种战 Day 4】求解/利用特征值与特征向量核心性质（张宇知识树：特征值与特征向量）",
      "focusArea": "特征方程 |λE-A|=0 + 迹与行列式性质 + 几何重数 vs 代数重数 + 反求矩阵 A",
      "coreConcepts": [
        "特征值基本功（5分/12分）：求解特征方程 det(λE - A) = 0 得到特征值 λ；求解齐次方程 (λE - A)x = 0 基础解系得到特征向量",
        "特征值两大黄金性质：∑λ_i = tr(A) = 主对角线元素之和；∏λ_i = det(A)；若 λ 是 A 的特征值，则 f(λ) 是 f(A) 的特征值；|A|/λ 是 A* 的特征值",
        "核心定理与几何/代数重数：不同特征值对应的特征向量必然线性无关；k重特征值至多有 k 个线性无关的特征向量，即几何重数 n - r(λE - A) ≤ 代数重数 k",
        "逆向思维大题（5分/12分）：由已知特征值与特征向量 Aα = λα 反求矩阵 A 中未知参数，或利用 A = P Λ P^-1 反求矩阵 A"
      ],
      "mcqTarget": "做透利用 tr(A) 与 |A| 联立快速求解未知参数特征值的选择题 5 道",
      "bigQuestionTarget": "精做 1 道给出特征向量反求矩阵未知参数 A 并求解矩阵方程的 12 分综合大题",
      "recommendedProblems": [
        "讲义例题：由已知特征值特征向量反求矩阵 A",
        "抽象矩阵特征值计算与结合伴随矩阵 A* 的特征值综合题"
      ],
      "pitfallsToAvoid": [
        "解特征向量时，解齐次方程 (λE - A)x = 0，务必仔细检查符号，代数计算错误一处全军覆没！",
        "特征向量绝不能为零向量！定义中 α 必须是非零向量！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "co-1017-datapath",
      "date": "2026-10-17",
      "dayIndex": 10,
      "subject": "co",
      "phase": "计组决战 · 王牌章节",
      "title": "第5章 【核心大题攻坚】数据通路与控制信号分析（408年年必考13分大杀器！）",
      "focusArea": "单周期数据通路 + 内部总线读图 + MUX多路选择器与控制信号判定",
      "coreConcepts": [
        "读图黄金工作流：从指令寄存器 IR 译码出发 -> 看操作数来源（寄存器还是立即数） -> 找经过哪个 MUX -> ALU执行什么运算 -> 结果写回哪里",
        "控制信号：如 RegWrite(写寄存器), ALUSrc(操作数选择), MemRead(读主存), MemWrite(写主存), MemtoReg(写回数据源)"
      ],
      "mcqTarget": "刷透数据通路部件连接真题选择题 3 道",
      "bigQuestionTarget": "攻克 1 道历年统考真题数据通路大题（写出每条指令所需微操作控制信号）",
      "recommendedProblems": [
        "【2015年统考真题第43题】或【2017年统考真题第43题】"
      ],
      "pitfallsToAvoid": [
        "若看数据通路图发懵，不要硬看书，直接看王道数据通路专项强化课 40 分钟快速打通思路！"
      ],
      "suggestedDurationMinutes": 220,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做",
      "action": "做 1 篇真题阅读，分析段落首末句与中心思想的呼应关系",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "新中国确立与社会主义改造",
      "action": "读手册 15 分钟（过渡时期总路线一化三改、三大改造完成标志、论十大关系、中共八大），刷题",
      "durationMinutes": 50
    }
  },
  {
    "date": "2026-10-18",
    "formattedDate": "10月18日",
    "weekday": "周日",
    "theme": "数二相似理论与相似对角化（非对称vs实对称★★★） · 计组控制器设计（硬布线vs微程序）",
    "math2Task": {
      "id": "math2-1018-similarity",
      "date": "2026-10-18",
      "dayIndex": 11,
      "subject": "math2",
      "phase": "线代特种战",
      "title": "★★★ 【线代特种战 Day 5】相似理论与相似对角化（非对称 vs 实对称异同 ★★★）（张宇知识树：相似理论）",
      "focusArea": "相似判定 + A可对角化充要条件 + 非对称 vs 实对称异同对比 + 施密特正交化与正交矩阵 + A^n应用",
      "coreConcepts": [
        "相似定义与判定（5分/12分）：A ~ B <=> 存在可逆阵 P 使 P^-1 A P = B；必要条件：同秩、同迹、同行列式、同特征多项式与同特征值；若 A, B 均可相似对角化，则 A ~ B 的充要条件是特征值完全相同！",
        "一般矩阵可相似对角化判定（5分）：充要条件是 A 有 n 个线性无关特征向量 <=> 每个特征值的几何重数 n - r(λE-A) = 代数重数 k；充分条件：A 有 n 个互异特征值",
        "★★★ 非对称矩阵 vs 实对称矩阵相似对角化的异同（5分/12分，高频核心）：① 实对称矩阵必可相似对角化（无需判定重数！），非对称矩阵不一定；② 实对称矩阵属于不同特征值的特征向量【天然正交】，非对称矩阵只保证线性无关；③ 实对称矩阵必可用【正交矩阵 P】（P^-1 = P^T）实现正交相似对角化 P^T A P = Λ",
        "正交矩阵与施密特正交化（5分）：P 为正交阵 <=> P^T P = E <=> 列向量组标准正交化；施密特正交化公式：β1 = α1；β2 = α2 - [(α2,β1)/(β1,β1)] β1；单位化 η = β / ||β||；只对重根特征向量正交化，不同特征值的特征向量直接单位化拼成 P",
        "相似对角化的应用（12分）：计算 A^n = P Λ^n P^-1；求解矩阵方程与多项式"
      ],
      "mcqTarget": "做透根据秩判定几何重数是否等于代数重数及相似关系充要条件选择题 5 道",
      "bigQuestionTarget": "亲手在草稿纸上规范写出 1 道实对称矩阵正交相似对角化完整 12 分解答大题（标准母题模板）",
      "recommendedProblems": [
        "讲义例题：3阶实对称矩阵施密特正交化求正交矩阵 P（标准12分解答大题）",
        "利用相似对角化计算 A^n 与含参矩阵能否对角化讨论"
      ],
      "pitfallsToAvoid": [
        "特征值相同不一定相似！必须看各自是否可对角化，若都可对角化且对角阵相同才相似！",
        "施密特正交化公式中的分子内积与分母模长平方千万别搞反！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "co-1018-controller",
      "date": "2026-10-18",
      "dayIndex": 11,
      "subject": "co",
      "phase": "计组决战 · 王牌章节",
      "title": "第5章 控制器设计（硬布线组合逻辑 vs 微程序控制器）",
      "focusArea": "微指令/微操作/微程序概念 + 水平型 vs 垂直型微指令 + 微地址断定方式",
      "coreConcepts": [
        "微程序核心关系：一条机器指令对应一个微程序；一个微程序由若干条微指令组成；一条微指令包含多个微操作控制信号",
        "水平型微指令（并行能力强，微指令字长长，微程序短，执行快） vs 垂直型微指令（类似机器指令，字长短，执行慢）",
        "断定方式（下地址字段）：微指令由“操作控制字段 + 下地址字段(断定字段)”组成"
      ],
      "mcqTarget": "做透水平型编码字段位数计算（直接控制法 vs 字段直接编码法）真题选择题",
      "bigQuestionTarget": "攻克 1 道微指令字长与控制字段编码计算大题",
      "recommendedProblems": [
        "讲义微指令格式设计与字段编译例题"
      ],
      "pitfallsToAvoid": [
        "注意互斥性微命令采用字段直接编码时，每段必须留出一个全0状态表示“不发任何命令”！"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做",
      "action": "做 1 篇真题阅读，复查本周错题集，严格控制在 70 分钟内",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "改革开放与中国特色社会主义理论",
      "action": "读手册 15 分钟（十一届三中全会伟大转折、邓小平理论、三个代表、科学发展观），刷题",
      "durationMinutes": 50
    }
  },
  {
    "date": "2026-10-19",
    "formattedDate": "10月19日",
    "weekday": "周一",
    "theme": "数二二次型化标准形与规范形（配方法vs正交变换法★★★） · 计组流水线冒险与性能分析",
    "math2Task": {
      "id": "math2-1019-quadratic-forms",
      "date": "2026-10-19",
      "dayIndex": 12,
      "subject": "math2",
      "phase": "线代特种战",
      "title": "★★★ 【线代特种战 Day 6】化二次型为标准形、规范形（配方法 vs 正交变换法 ★★★）（张宇知识树：二次型）",
      "focusArea": "二次型矩阵表示 + 配方法与正交变换法异同 + 伪配方法 + 正交变换大题 + 规范形与惯性定理",
      "coreConcepts": [
        "二次型矩阵表示（5分）：二次型 f(x) = x^T A x 中矩阵 A 必须写成实对称矩阵（平方项放主对角线，交叉项 2a_ij x_i x_j 中系数必须折半除以2）",
        "★★★ 配方法与正交变换法的异同（5分/12分，必考大题）：① 正交变换法 x = Py：变换矩阵 P 必须为正交矩阵（P^T = P^-1），不改变向量长度（保距变换），标准形的平方项系数严格等于 A 的特征值 λ_i！② 配方法 x = Cy：C 仅为普通可逆矩阵，纯代数运算速度快，但不保长度，标准形系数取决于配方顺序，不一定是特征值！但两者的正负项个数必然相同（惯性定理）",
        "伪配方法与无平方项配方（5分）：若二次型中无平方项（全是交叉项），先做可逆代换 x1 = y1 + y2, x2 = y1 - y2 产生平方项 y1^2 - y2^2，然后再按含平方项的方法配方",
        "正交变换法求标准形（12分）：标准五步法：写实对称矩阵 A -> 求特征方程 det(λE-A)=0 -> 求特征向量并施密特正交化、单位化 -> 得正交阵 P -> 写出标准形与正交变换 x = Py",
        "规范形与惯性定理（5分）：实二次型经可逆线性变换化为规范形，正惯性指数 p 与负惯性指数 q 是唯一由二次型决定的不变量；规范形为 y1^2 + .. + yp^2 - y_(p+1)^2 - .. - y_(p+q)^2"
      ],
      "mcqTarget": "做透惯性定理、正负惯性指数判定与二次型标准形选择题 4 道",
      "bigQuestionTarget": "分别用配方法和正交变换法求解 1 道二次型化标准形完整 12 分大题（务必写出坐标变换矩阵）",
      "recommendedProblems": [
        "讲义例题：正交变换化二次型为标准形并写出正交变换矩阵 P",
        "配方法化无平方项二次型为标准形并求坐标变换矩阵 C"
      ],
      "pitfallsToAvoid": [
        "配方法写坐标变换 x = Cy 时，切记配方得到的是 y 关于 x 的表达式，必须解出 x 关于 y（即求逆矩阵）才是变换矩阵 C！",
        "二次型矩阵 A 必须是对称阵，写矩阵时交叉项系数切勿忘记除以 2！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "co-1019-pipeline",
      "date": "2026-10-19",
      "dayIndex": 12,
      "subject": "co",
      "phase": "计组决战 · 王牌章节",
      "title": "第5章 【核心大题攻坚】指令流水线性能与三大冒险处理（RAW旁路转发与甘特图）",
      "focusArea": "吞吐率/加速比 + 结构/数据/控制冲突 + RAW写后读数据旁路技术",
      "coreConcepts": [
        "三大流水线冒险：结构冒险(多条指令同时访存 -> 增加指令/数据分离Cache)；数据冒险(写后读RAW -> 数据旁路/转发技术或插入NOP气泡)；控制冒险(分支指令 -> 分支预测)",
        "流水线时空图：吞吐率 TP = n / 时钟周期总数；加速比 S = 单周期总耗时 / 流水线总耗时"
      ],
      "mcqTarget": "刷透流水线冒险类型判别选择题 4 道",
      "bigQuestionTarget": "精做 1 道流水线时空图绘制与数据冲突分析大题",
      "recommendedProblems": [
        "【2014年统考真题第43题】或【2021年统考真题大题】"
      ],
      "pitfallsToAvoid": [
        "判断数据冲突时，仔细看数据写回寄存器在哪个时钟周期的前半段还是后半段！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做",
      "action": "做 1 篇真题阅读，准备明后天正式启动作文模板！",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "新思想核心概论与新时代成就",
      "action": "读手册 15 分钟（十个明确、十四个坚持、十三个方面成就、新时代主要矛盾），刷题清错",
      "durationMinutes": 50
    }
  },
  {
    "date": "2026-10-20",
    "formattedDate": "10月20日",
    "weekday": "周二",
    "theme": "数二合同理论与正定矩阵判定（10.20线代强化圆满收官！） · 计组总线与I/O全面大收官！",
    "math2Task": {
      "id": "math2-1020-congruence-positive",
      "date": "2026-10-20",
      "dayIndex": 13,
      "subject": "math2",
      "phase": "线代特种战",
      "title": "【线代特种战 Day 7】合同理论、正定判定与二次型最值（张宇知识树：合同理论）——10.20强化胜利收官！",
      "focusArea": "合同判定 + 正定矩阵充要条件与证明 + 瑞利商求二次型约束最值",
      "coreConcepts": [
        "合同理论与判定（5分）：实对称矩阵 A 合同于 B（A ≃ B <=> 存在可逆阵 C 使 C^T A C = B）；实对称矩阵合同的充要条件：正负惯性指数相同 <=> 规范形相同；实对称矩阵相似必合同，反之不成立！",
        "正定二次型与正定矩阵充要条件（5分/12分）：实对称矩阵 A 正定 <=> 对任意非零向量 x 恒有 x^T A x > 0 <=> A 的特征值全大于 0 <=> A 的各阶顺序主子式全大于 0 <=> 正惯性指数 p = n <=> A 与单位阵 E 合同 <=> 存在可逆阵 C 使 A = C^T C",
        "正定矩阵必要条件：主对角线元素全大于 0（a_ii > 0）；|A| > 0（若某对角元 ≤ 0 或 |A| ≤ 0 则秒杀非正定）",
        "正定矩阵性质与证明大题：若 A 正定，则 A^-1, A*, A^m 均正定；若 A, B 正定，则 A+B 正定，但 AB 不一定正定（除非 AB=BA）",
        "二次型在约束条件下的最值（瑞利商原理）：在 ||x|| = 1 条件下，二次型 x^T A x 的最大值为最大特征值 λ_max，最小值为最小特征值 λ_min",
        "【强化重大里程碑】：至今日（10.20），张宇线代知识树所有模块（矩阵运算、秩、向量、方程组、特征值、相似、二次型、合同）强化无死角全部胜利攻克！"
      ],
      "mcqTarget": "做透正定矩阵判定、顺序主子式与等价/相似/合同三大关系辨析选择题 5 道",
      "bigQuestionTarget": "攻克 1 道根据正定条件反求参数及求二次型在单位球面上最值的大题",
      "recommendedProblems": [
        "讲义例题：A、B正定推导 A+B 正定证明题",
        "含未知参数的矩阵正定性判别与二次型最值经典大题"
      ],
      "pitfallsToAvoid": [
        "各阶顺序主子式全 > 0 仅适用于判定正定矩阵！负定矩阵是奇数阶主子式 < 0，偶数阶主子式 > 0！",
        "判半正定矩阵时，不能只看顺序主子式 ≥ 0，必须所有主子式（共 2^n - 1 个）全 ≥ 0，最稳妥是用特征值全 ≥ 0！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "co-1020-bus-io",
      "date": "2026-10-20",
      "dayIndex": 13,
      "subject": "co",
      "phase": "计组决战 · 胜利闭幕",
      "title": "第6章 总线系统 + 第7章 I/O系统（计组全面大通关！）",
      "focusArea": "总线带宽计算 + 集中式仲裁对比 + 中断全流程/DMA与屏蔽字",
      "coreConcepts": [
        "总线带宽公式：带宽 = 总线工作频率 × (总线宽度 / 8) [B/s]",
        "集中式总线仲裁：链式查询(优先级固定，连线少3根)；计数器定时查询(设备号线数 log2 N)；独立请求方式(响应最快，连线多 2N根)",
        "中断全流程：中断请求 -> 判优 -> 中断隐指令(硬件完成：关中断、保存断点PC、引出中断向量) -> 中断服务程序",
        "DMA(直接内存访问)：周期挪用/窃取访存，数据在主存与外设间直接传递，完全不经过CPU寄存器！"
      ],
      "mcqTarget": "做透总线带宽、中断隐指令与DMA对比真题选择题 6 道",
      "bigQuestionTarget": "攻克 1 道多重中断屏蔽字与优先级分析大题（送分题，必须拿满）",
      "recommendedProblems": [
        "【2016年统考真题第44题】"
      ],
      "pitfallsToAvoid": [
        "计组今日全部彻底结课！明天（10.21）全军按计划无缝切入【操作系统 11 天精准打击】！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读维持 + 启动作文骨架",
      "action": "做 1 篇阅读 + 开始整理小作文（信件应用文）通用首尾段客套话与常用礼貌动词",
      "durationMinutes": 80
    },
    "politicsTask": {
      "title": "思修法基核心道德与法律规范",
      "action": "读手册 15 分钟（社会主义核心价值观、爱国主义、法律特征与权利义务），刷 20 道常识选择题",
      "durationMinutes": 50
    }
  },
  {
    "date": "2026-10-21",
    "formattedDate": "10月21日",
    "weekday": "周三",
    "theme": "数二线代八大模块一张网终极串联演练 · 操作系统概述（OS第1天启动！）",
    "math2Task": {
      "id": "math2-1021-linear-network",
      "date": "2026-10-21",
      "dayIndex": 14,
      "subject": "math2",
      "phase": "线代特种战",
      "title": "【线代特种战 Day 8·机动与大串联】打通线代一张网（矩阵-秩-向量-方程组-特征值-相似-二次型-合同）",
      "focusArea": "张宇线代一张网八大模块融会贯通 + 机动缓冲池 + 压轴综合大题 2 道实战",
      "coreConcepts": [
        "线代一张网全景闭环：矩阵运算与初等变换是基石 -> 矩阵的秩是度量标尺 -> 向量组线性表出刻画空间 -> 方程组有解性判定与解空间结构 -> 特征值与特征向量是坐标轴旋转压缩本质 -> 相似对角化是化简运算终极手段 -> 实对称正交相似是二次型标准形的数学桥梁 -> 合同理论与正定性完成几何曲面定性",
        "两大压轴综合母题套路：①【特征值 + 方程组结合】：已知特征向量求矩阵 A 未知参数，再求齐次/非齐次方程组通解；②【特征值 + 二次型 + 正定结合】：求实对称矩阵 A 特征值，正交变换化二次型为标准形，讨论参数使二次型正定",
        "【机动缓冲说明】：若 10.14-10.20 攻坚中有难点遗留，今天拥有充足机动时间做专项突破，不影响后续大盘进度！"
      ],
      "mcqTarget": "做透 3 道近5年真题线代跨章节多项概念综合选择题（掐表 10 分钟）",
      "bigQuestionTarget": "亲手限时 30 分钟独立完整书写 2 道跨章节线代压轴真题大题",
      "recommendedProblems": [
        "真题经典母题：特征向量反求矩阵未知参数并求解线性方程组通解",
        "真题经典母题：实对称矩阵正交相似对角化并化二次型为标准形判定正定"
      ],
      "pitfallsToAvoid": [
        "做线代大题草稿纸务必规整划分区域，初等变换时算错一个负号整道题前功尽弃！",
        "今日彻底完成线代强化大盘，明天做全科公式默写封存，明晚全力备战 10.23 真题套卷！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "os-1021",
      "date": "2026-10-21",
      "dayIndex": 1,
      "subject": "os",
      "phase": "【OS一阶段】计算机概述与调度",
      "title": "第1章 操作系统概述（内核态、中断与系统调用）",
      "focusArea": "内核态 vs 用户态 + 中断与异常分类 + 系统调用执行流程（访管指令）",
      "coreConcepts": [
        "内核态 vs 用户态：特权指令（清内存、改中断屏蔽字、设置时钟等）只能在内核态执行；用户态向内核态切换只能通过中断/异常！",
        "中断与异常分类：内中断/陷入/故障（CPU内部产生，如除以0、缺页、访管指令trap） vs 外中断（CPU外部产生，如时钟中断、I/O中断）",
        "系统调用执行流程：用户程序执行访管指令（trap指令，用户态执行）-> CPU硬件响应转入内核态 -> 执行系统调用服务程序",
        "微内核与大内核结构：大内核性能高扩展难；微内核高可靠易扩展但状态切换开销大"
      ],
      "mcqTarget": "只刷历年统考真题选择（重点看中断触发时CPU状态如何切换，约6道）",
      "bigQuestionTarget": "第1章无独立大题，迅速推进，为明日进程调度大题蓄力",
      "recommendedProblems": [
        "历年统考特权指令与中断分类选择题"
      ],
      "pitfallsToAvoid": [
        "访管指令(trap指令)是在用户态下执行的，执行后CPU硬件切换到内核态！切勿混淆！"
      ],
      "suggestedDurationMinutes": 180,
      "isCompleted": false
    },
    "englishTask": {
      "title": "大作文图画/图表三大段框架梳理",
      "action": "整理大作文三段式：第1段描述图表/图画 + 第2段分析原因/深层影响 + 第3段总结倡议/对策（避开烂大街套话）",
      "durationMinutes": 80
    },
    "politicsTask": {
      "title": "马原核心易错错题清零",
      "action": "睡前用 15 分钟清空小程序马原错题本，保证做错的概念不再犯第二次",
      "durationMinutes": 50
    }
  },
  {
    "date": "2026-10-22",
    "formattedDate": "10月22日",
    "weekday": "周四",
    "theme": "数二全科强化圆满收官！ · 操作系统进程与调度算法",
    "math2Task": {
      "id": "math2-1022",
      "date": "2026-10-22",
      "dayIndex": 15,
      "subject": "math2",
      "phase": "高数线代终极收官",
      "title": "数二全科公式默写与错题快速扫描（数二强化全部彻底终结！）",
      "focusArea": "闭卷默写四大母题模板 + 扫除最后疑点 + 准备明早拔剑真题！",
      "coreConcepts": [
        "模板1：偏微分方程链式求导代换标准解题步骤",
        "模板2：二阶常系数非齐次微分方程特解设定对照表",
        "模板3：伴随矩阵 A* 八大黄金恒等式与初等矩阵性质",
        "模板4：实对称矩阵正交相似对角化（施密特正交化）完整过程"
      ],
      "mcqTarget": "闭卷自测，确保所有公式无死角",
      "bigQuestionTarget": "在草稿纸上默写出上述四大母题的解题工作流",
      "recommendedProblems": [
        "近两年数二真题第一道大题试做感受真题风格"
      ],
      "pitfallsToAvoid": [
        "今晚不熬夜，准备明天上午 8:30 准时打响【数二历年真题套卷第一枪】！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "os-1022",
      "date": "2026-10-22",
      "dayIndex": 2,
      "subject": "os",
      "phase": "【OS一阶段】计算机概述与调度",
      "title": "第2章 进程管理（前段：概念与调度算法甘特图）",
      "focusArea": "PCB与进程五状态 + 内核级 vs 用户级线程 + 经典处理机调度算法",
      "coreConcepts": [
        "进程实体与PCB：PCB是进程存在的唯一标志；进程五状态转换图（运行、就绪、阻塞、创建、终止），阻塞只能转就绪！",
        "内核级线程 vs 用户级线程：内核级线程由OS内核管理，是独立调度单位；用户级线程由用户空间线程库管理，OS只感知进程",
        "经典调度算法：FCFS、SJF/SPF（短作业/进程优先，平均等待时间最短）、HRRN（高响应比优先：响应比 = 1 + 等待时间/运行时间）、时间片轮转RR、多级反馈队列"
      ],
      "mcqTarget": "刷透进程状态变迁条件、处理机调度周转时间/带权周转时间选择题 4 道",
      "bigQuestionTarget": "做 1 道调度算法甘特图计算大题（计算平均周转时间与平均带权周转时间）",
      "recommendedProblems": [
        "讲义调度算法甘特图计算经典题"
      ],
      "pitfallsToAvoid": [
        "周转时间 = 完成时刻 - 到达时刻；带权周转时间 = 周转时间 / 服务运行时间（必大于等于1）！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "englishTask": {
      "title": "小作文建议信/感谢信模板手写",
      "action": "动笔手写 1 篇感谢信 + 1 篇建议信，检查拼写错误与书写工整度",
      "durationMinutes": 80
    },
    "politicsTask": {
      "title": "史纲核心错题清零",
      "action": "小程序清空史纲错题本，用 15 分钟通读背诵手册土地政策与会议线索",
      "durationMinutes": 50
    }
  },
  {
    "date": "2026-10-23",
    "formattedDate": "10月23日",
    "weekday": "周五",
    "theme": "【数二拔剑真题套卷日！】 · 操作系统同步互斥与基础PV模型",
    "math2Task": {
      "id": "math2-1023",
      "date": "2026-10-23",
      "dayIndex": 16,
      "subject": "math2",
      "phase": "真题实战阶段",
      "title": "【历史时刻】数二历年真题全真模拟第1套（2010年数二真题）",
      "focusArea": "掐表 3 小时严格闭卷模考（08:30 - 11:30）+ 标记不确定题",
      "coreConcepts": [
        "考场策略：先易后难，遇到卡壳超过5分钟的题立刻跳过做标记；保证基本分稳稳入袋！",
        "真题试卷是最高规格检验器，第一套错得多完全正常，重点在暴露盲区！"
      ],
      "mcqTarget": "按考场标准涂卡/写答题纸",
      "bigQuestionTarget": "全套试卷大题完整书写步骤",
      "recommendedProblems": [
        "2010年全国硕士研究生招生考试数学二真题全套"
      ],
      "pitfallsToAvoid": [
        "模考期间严禁翻看任何公式手册或手机！严格模拟考场高压环境！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "os-1023",
      "date": "2026-10-23",
      "dayIndex": 3,
      "subject": "os",
      "phase": "【OS二阶段】进程同步死锁与PV专题",
      "title": "第2章 同步互斥原理与“基础PV模型”（全书第一核心！）",
      "focusArea": "临界区互斥原则 + 信号量机制原子性 + 生产者-消费者 + 读者-写者",
      "coreConcepts": [
        "临界区互斥四原则：空闲让进、忙则等待、有限等待、让权等待",
        "信号量机制：整型信号量（不满足让权等待） vs 记录型信号量（包含整型 value 与等待进程队列链表 L，实现让权等待）",
        "两大基石模型代码模板：\n1. 生产者-消费者问题：互斥 mutex=1，资源 empty=N, full=0；注意 P(empty) 在 P(mutex) 之前！\n2. 读者-写者问题：读优先（读者计数器 readcount + mutex + rwlock） vs 写优先逻辑"
      ],
      "mcqTarget": "做透临界区硬件实现(TSL, Swap)与软件实现(Peterson算法)真题选择题",
      "bigQuestionTarget": "手写生产者-消费者与读者-写者两大基石模型的标准伪代码",
      "recommendedProblems": [
        "手写生产者-消费者与读者-写者模板代码"
      ],
      "pitfallsToAvoid": [
        "同步 P 操作必须在互斥 P 操作之前！否则一旦先上互斥锁又缺资源，必然死锁！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做",
      "action": "做 1 篇真题阅读，复盘昨日作文语法细节",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "认识论与真理价值",
      "action": "背诵手册读 15 分钟（实践与认识辩证关系、感性到理性飞跃），小程序刷对应真题",
      "durationMinutes": 50
    }
  },
  {
    "date": "2026-10-24",
    "formattedDate": "10月24日",
    "weekday": "周六",
    "theme": "数二真题第2套演练 · 操作系统高级PV变种模型与真题大题攻坚",
    "math2Task": {
      "id": "math2-1024",
      "date": "2026-10-24",
      "dayIndex": 17,
      "subject": "math2",
      "phase": "真题实战阶段",
      "title": "数二历年真题全真模拟第2套（2011年数二真题）",
      "focusArea": "限时3小时闭卷模考（08:30 - 11:30）+ 标记生疏考点 + 统计第一遍真实得分",
      "coreConcepts": [
        "严格按照 08:30-11:30 考场时间作答，培养上午数学兴奋中枢",
        "注意真题中计算繁琐题目的草稿纸布局，避免由于字迹混乱引发的低级失误"
      ],
      "mcqTarget": "选择填空力争45分钟内高质量完成",
      "bigQuestionTarget": "大题书写逻辑规范，踩点给分步步为营",
      "recommendedProblems": [
        "2011年数二真题全套"
      ],
      "pitfallsToAvoid": [
        "做完后无论分数高低，不产生任何情绪波动，立刻开启红笔复盘！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "os-1024",
      "date": "2026-10-24",
      "dayIndex": 4,
      "subject": "os",
      "phase": "【OS二阶段】进程同步死锁与PV专题",
      "title": "第2章 高级PV变种模型与历年真题大题攻坚（8~10分必拿满！）",
      "focusArea": "哲学家进餐模型 + 多生产者-多消费者模型 + 统考真题PV大题精做",
      "coreConcepts": [
        "哲学家进餐模型：死锁规避技巧（至多允许4人同时拿筷子，或奇数号先左后右、偶数号先右后左）",
        "多生产者-多消费者模型：经典的吃水果问题（父亲放苹果/母亲放橘子/儿子吃橘子/女儿吃苹果）、吸烟者问题单向触发",
        "PV标准四步法：确定进程种类 -> 寻找动作关系 -> 定义信号量初值 -> 圈定P/V位置"
      ],
      "mcqTarget": "若手写PV毫无头绪，今天花 40 分钟看王道 PV 大题专项强化课打通四步法",
      "bigQuestionTarget": "精做 2 道统考真题PV大题（推荐：2014年独木桥/接水问题、2019年读者写者变种题）",
      "recommendedProblems": [
        "【2014年统考独木桥真题】",
        "【2019年统考真题第45题】"
      ],
      "pitfallsToAvoid": [
        "改卷老师按步骤给分，只要信号量声明初值正确、同步互斥位置合理，就能拿90%以上分数！"
      ],
      "suggestedDurationMinutes": 220,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做",
      "action": "做 1 篇真题阅读，复盘昨日长难句，整理段落逻辑转折词",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "唯物史观与唯心史观辨析",
      "action": "读手册 15 分钟（生产力与生产关系、经济基础与上层建筑），刷小程序 20 题",
      "durationMinutes": 50
    }
  },
  {
    "date": "2026-10-25",
    "formattedDate": "10月25日",
    "weekday": "周日",
    "theme": "数二真题两套错题大复盘 · 操作系统死锁机制与银行家算法",
    "math2Task": {
      "id": "math2-1025",
      "date": "2026-10-25",
      "dayIndex": 18,
      "subject": "math2",
      "phase": "真题实战阶段",
      "title": "数二 2010-2011 真题深度复盘与薄弱点母题重修",
      "focusArea": "整理两套真题所有失分点 + 回归讲义重做对应专题例题 2~3 道",
      "coreConcepts": [
        "真题的核心价值不是“测出多少分”，而是“通过错题像手术刀一样切除盲区”",
        "分类建立错题卡片：计算粗心卡、概念模糊卡、思路卡壳卡"
      ],
      "mcqTarget": "将两套试卷中所有蒙对或不确定的选择题彻底弄懂",
      "bigQuestionTarget": "将失分大题在白纸上从头到尾完整独立重写一遍",
      "recommendedProblems": [
        "2010-2011两套真题错题全部重写"
      ],
      "pitfallsToAvoid": [
        "看懂答案不等于自己会做，必须在白纸上独立算到底！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "os-1025",
      "date": "2026-10-25",
      "dayIndex": 5,
      "subject": "os",
      "phase": "【OS二阶段】进程同步死锁与PV专题",
      "title": "第2章 死锁机制全解析（银行家算法安全性检查）",
      "focusArea": "死锁4个必要条件 + 死锁预防 vs 死锁避免 + 银行家算法安全性检查表",
      "coreConcepts": [
        "死锁产生的4个必要条件：互斥条件、不剥夺条件、请求并保持条件、循环等待条件（破坏其中之一即可预防死锁）",
        "死锁避免（动态检查）：系统处于安全状态则绝无死锁；处于不安全状态不一定死锁",
        "银行家算法矩阵：Available(可用资源向量)；Need = Max - Allocation(尚需资源矩阵)；寻找 Need_i <= Work 的进程，执行完毕后释放资源 Work = Work + Allocation_i"
      ],
      "mcqTarget": "做透死锁充要条件判定、资源数计算题（m个资源分给n个进程，不发生死锁的条件：资源数 >= n*(w-1)+1）",
      "bigQuestionTarget": "精做 1 道银行家算法安全性检查大题（送分题，必须拿满满分！）",
      "recommendedProblems": [
        "讲义银行家算法安全性分析经典大题"
      ],
      "pitfallsToAvoid": [
        "写安全序列时必须写出详细的 Work、Need、Allocation 和 Work+Allocation 过程表！"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "小作文通知/邀请信模板手写",
      "action": "动笔手写 1 篇通知 + 1 篇邀请信，检查书写工整度与常用短语",
      "durationMinutes": 80
    },
    "politicsTask": {
      "title": "政治经济学核心（商品二因素与劳动二重性）",
      "action": "读手册 15 分钟（不变资本与可变资本、剩余价值率计算），刷题清错",
      "durationMinutes": 50
    }
  },
  {
    "date": "2026-10-26",
    "formattedDate": "10月26日",
    "weekday": "周一",
    "theme": "数二真题第3套模考 · 操作系统传统内存管理（分页分段）",
    "math2Task": {
      "id": "math2-1026",
      "date": "2026-10-26",
      "dayIndex": 19,
      "subject": "math2",
      "phase": "真题实战阶段",
      "title": "数二历年真题全真模拟第3套（2012年数二真题）",
      "focusArea": "掐表 3 小时严格闭卷模考（08:30 - 11:30）",
      "coreConcepts": [
        "限时完成，暴露多元积分与微分方程应用中的计算漏洞"
      ],
      "mcqTarget": "选择填空争取40分钟内搞定",
      "bigQuestionTarget": "大题规范写出全步骤",
      "recommendedProblems": [
        "2012年数二真题全套"
      ],
      "pitfallsToAvoid": [
        "不看答案，独立算完整套试卷"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "os-1026",
      "date": "2026-10-26",
      "dayIndex": 6,
      "subject": "os",
      "phase": "【OS三阶段】内存管理与跨学科联动",
      "title": "第3章 传统内存管理方式（连续分配、基本分页与分段）",
      "focusArea": "逻辑地址与物理地址 + 连续分配方式 + 基本分页存储（两级页表） vs 分段存储",
      "coreConcepts": [
        "连续分配方式：最佳适应（容量从小到大）、最坏适应（容量从大到小）、首次适应（地址从小到大，性能最好）",
        "基本分页存储管理：逻辑地址划分为 [页号 P + 页内偏移量 W]；页内偏移量直接等于物理地址块内偏移；两级页表解决页表过大占用连续内存问题",
        "分页 vs 分段：页是物理单位（对用户透明，一维地址空间）；段是逻辑单位（用户可见，二维地址空间 [段号, 段内地址]）"
      ],
      "mcqTarget": "刷透页内偏移量与页号计算、分段 vs 分页区别选择题 4 道",
      "bigQuestionTarget": "做 1 道分页/分段系统的逻辑地址到物理地址转换计算题",
      "recommendedProblems": [
        "讲义两级页表逻辑地址拆解与物理地址计算例题"
      ],
      "pitfallsToAvoid": [
        "判断地址越界时：分页系统比较页号是否大于等于页表长度；分段系统先比较段号是否越界，再比较段内偏移是否超过该段段长！"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做",
      "action": "做 1 篇真题阅读，提炼文章态度词与转折逻辑",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "政经与科学社会主义",
      "action": "读手册 15 分钟（资本有机构成 c:v、超额剩余价值与相对剩余价值区别），刷小程序 20 题",
      "durationMinutes": 50
    }
  },
  {
    "date": "2026-10-27",
    "formattedDate": "10月27日",
    "weekday": "周二",
    "theme": "【数二真题 Day 1】全真模考【2016 年真题】（上午 8:... · 第3章 虚拟内存管理与页面置换算法（极高频大",
    "math2Task": {
      "id": "math2-1027",
      "date": "2026-10-27",
      "dayIndex": 20,
      "subject": "math2",
      "phase": "【第一阶段】中近期硬仗练兵（Day 1）",
      "title": "全真模考【2016 年真题】（上午 8:30—11:30 严格闭卷掐表）",
      "focusArea": "攻克老题型硬仗卷的高强度大题计算，下午/晚间核对答案并初步标注错因",
      "coreConcepts": [
        "上午 8:30—11:30 严格闭卷掐表全真模考【2016 年真题】",
        "攻克老题型硬仗卷的高强度大题计算",
        "下午/晚间核对答案并初步标注错因"
      ],
      "mcqTarget": "客观题严格掐表在 50-60 分钟内完成，标记做题直觉与卡壳点",
      "bigQuestionTarget": "攻克 2016 年高强度计算大题与多元微分、微分方程综合大题",
      "recommendedProblems": [
        "2016 年数学二统考真题全卷"
      ],
      "pitfallsToAvoid": [
        "模考时严禁翻书看公式，无论卡壳与否必须逼真模拟考场环境；下午必须对答案并标注错因！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "os-1027",
      "date": "2026-10-27",
      "dayIndex": 7,
      "subject": "os",
      "phase": "【OS三阶段】内存管理与跨学科联动",
      "title": "第3章 虚拟内存管理与页面置换算法（极高频大题！）",
      "focusArea": "请求分页机制 + 页面置换算法（OPT/FIFO/LRU/CLOCK） + 缺页率计算",
      "coreConcepts": [
        "请求分页机制：页表项结构新增四位：状态位P（是否在内存）、访问位A（供替换算法参考）、修改位M（是否写回外存）、外存地址",
        "四大页面置换算法：\n1. OPT 最佳置换（理论最优，淘汰最长时间不再访问的页面，无法实现）；\n2. FIFO 先进先出（会有 Belady 异常）；\n3. LRU 最近最久未使用（性能接近OPT，硬件开销大）；\n4. CLOCK 时钟置换（使用位 0/1）及改进型 CLOCK（综合使用位与修改位：(0,0)->(0,1)->(0,0)->(0,1)四轮扫描）",
        "抖动与工作集：抖动现象由频繁页面调度引起；工作集是进程在某段时间内实际访问页面的集合"
      ],
      "mcqTarget": "刷透置换算法缺页次数计算选择题（注意判断给定的物理块数和初始是否为空）",
      "bigQuestionTarget": "精做 1 道页面置换缺页率计算大题（列出每次访问物理块中页面替换轨迹）",
      "recommendedProblems": [
        "历年页面置换算法轨迹追踪大题"
      ],
      "pitfallsToAvoid": [
        "计算缺页次数与发生页面置换次数的区别：若物理块未装满，调入新页面算缺页但不算页面置换！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做",
      "action": "做 1 篇真题阅读，复盘段落中心思想",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "史纲起点（近代中国国情与早期探索）",
      "action": "读手册 15 分钟，刷选择题 20 题",
      "durationMinutes": 50
    }
  },
  {
    "date": "2026-10-28",
    "formattedDate": "10月28日",
    "weekday": "周三",
    "theme": "【数二真题 Day 2】【2016 年深度订正】遮住答案独立重做... · 【重磅】计组 × OS 跨学科地址翻译综合大",
    "math2Task": {
      "id": "math2-1028",
      "date": "2026-10-28",
      "dayIndex": 21,
      "subject": "math2",
      "phase": "【第一阶段】中近期硬仗练兵（Day 2）",
      "title": "【2016 年深度订正】遮住答案独立重做所有错题",
      "focusArea": "重点攻克高强度计算大题与综合题",
      "coreConcepts": [
        "遮住答案独立重做所有错题",
        "重点攻克高强度计算大题与综合题",
        "排查草稿纸演算跳步与失误环节"
      ],
      "mcqTarget": "逐题分析 2016 年选择填空失误原因，提炼概念漏洞",
      "bigQuestionTarget": "在白纸上独立完整写出所有错题大题的规范解答步骤",
      "recommendedProblems": [
        "2016 年真题全部错题与卡壳题"
      ],
      "pitfallsToAvoid": [
        "切忌“看懂解析就当做会了”，必须遮住解析亲手算到底出正确数值！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "os-1028",
      "date": "2026-10-28",
      "dayIndex": 8,
      "subject": "os",
      "phase": "【OS三阶段】内存管理与跨学科联动",
      "title": "【重磅】计组 × OS 跨学科地址翻译综合大题攻坚（全书最核心联动！）",
      "focusArea": "虚拟地址 -> TLB快表 -> 多级页表 -> Cache -> 主存完整全链路寻址",
      "coreConcepts": [
        "跨学科联动闭环：虚拟地址 -> [虚页号 VPN + 页内偏移 PO] -> 硬件查 TLB 快表 -> (若命中得物理页号 PPN) / (若未命中查内存页表得 PPN 并更新TLB) -> 物理地址 [PPN + PO] -> 物理地址切分 [Tag + Index + Offset] -> 查 Cache -> (命中读数据) / (未命中读主存)",
        "黄金法则三定律：\n1. TLB 命中必然 Page 命中（必不缺页）；\n2. 若 Page 缺页则 TLB 必然不命中；\n3. 页内偏移量 PO 长度永远等于页面大小，且其低位直接对应 Cache 的块内偏移 Offset！"
      ],
      "mcqTarget": "做透 TLB、Page、Cache 各种命中与缺失组合的真伪判断选择题",
      "bigQuestionTarget": "精做 408 统考历史最高规格联动大题（推荐：【2011年统考真题第44题】或【2018年统考真题第44题】）",
      "recommendedProblems": [
        "【2011年统考真题第44题】",
        "【2018年统考真题第44题】"
      ],
      "pitfallsToAvoid": [
        "检验标准：给你一个32位十六进制地址，你能一步步拆出：虚页号、页内偏移、TLB标记、Cache组号、Cache块内地址，并准确判断是否缺页、是否命中Cache！"
      ],
      "suggestedDurationMinutes": 240,
      "isCompleted": false
    },
    "englishTask": {
      "title": "大作文段落论据论述展开训练",
      "action": "训练第二段原因分析 3 个因果逻辑连接句式",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "开天辟地与大革命、土地革命",
      "action": "读手册 15 分钟（遵义会议生死攸关），刷题清错",
      "durationMinutes": 50
    }
  },
  {
    "date": "2026-10-29",
    "formattedDate": "10月29日",
    "weekday": "周四",
    "theme": "【数二真题 Day 3】全真模考【2017 年真题】（上午 8:... · 第4章 文件管理（逻辑物理结构、目录与混合索",
    "math2Task": {
      "id": "math2-1029",
      "date": "2026-10-29",
      "dayIndex": 22,
      "subject": "math2",
      "phase": "【第一阶段】中近期硬仗练兵（Day 3）",
      "title": "全真模考【2017 年真题】（上午 8:30—11:30）",
      "focusArea": "上午 8:30—11:30 全真模考，批改试卷，梳理失分分布",
      "coreConcepts": [
        "全真模考【2017 年真题】（上午 8:30—11:30）",
        "批改试卷，梳理失分分布",
        "检验面对常规中档题时的计算准确率与速度"
      ],
      "mcqTarget": "选填题准确率提升，尽量控制在 2 题以内失误",
      "bigQuestionTarget": "完成 2017 年线代二次型及高数大题规范表达",
      "recommendedProblems": [
        "2017 年数学二统考真题全卷"
      ],
      "pitfallsToAvoid": [
        "遇到计算繁琐题目不要心态波动，严格按照答题时间分配推进"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "os-1029",
      "date": "2026-10-29",
      "dayIndex": 9,
      "subject": "os",
      "phase": "【OS四阶段】文件系统与I/O",
      "title": "第4章 文件管理（逻辑物理结构、目录与混合索引分配）",
      "focusArea": "文件逻辑结构 + 目录与 FCB / Inode + 连续/链接/混合索引分配大小计算",
      "coreConcepts": [
        "文件逻辑结构：无结构流式文件 vs 有结构记录式文件（顺序、索引、索引顺序文件）",
        "文件控制块 FCB 与索引结点 Inode：硬链接（多个目录项指向同一 Inode，共享计数 count，不能跨文件系统） vs 软链接/符号链接（独立 Inode，存路径，可跨文件系统）",
        "混合索引分配机制：直接地址项 + 一级间接 + 二级间接 + 三级间接；每个盘块大小 $B$，地址项占 $A$ 字节，则一个间接盘块可存 $B/A$ 个地址指针！"
      ],
      "mcqTarget": "做透 FCB 包含内容、硬链接 vs 软链接区别选择题 4 道",
      "bigQuestionTarget": "攻克多级索引文件大小计算大题（如：盘块4KB，直接索引10项，一级间接1项，二级间接1项，计算系统支持的最大文件大小）",
      "recommendedProblems": [
        "讲义多级混合索引文件最大容量与访盘次数计算经典题"
      ],
      "pitfallsToAvoid": [
        "计算访问特定偏移字节处的访盘次数时：注意 FCB 或 Inode 是否已经在内存中！若已在内存中则无需计入初次访盘！"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做",
      "action": "做 1 篇真题阅读，摘录文中高频书面表达句式",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "抗日战争与新民主主义革命胜利",
      "action": "读手册 15 分钟（洛川会议、三大法宝），刷题",
      "durationMinutes": 50
    }
  },
  {
    "date": "2026-10-30",
    "formattedDate": "10月30日",
    "weekday": "周五",
    "theme": "【数二真题 Day 4】【2017 年错题复盘】+【早期已做真题... · 第4章 磁盘组织 + 第5章 I/O核心速通",
    "math2Task": {
      "id": "math2-1030",
      "date": "2026-10-30",
      "dayIndex": 23,
      "subject": "math2",
      "phase": "【第一阶段】中近期硬仗练兵（Day 4）",
      "title": "【2017 年错题复盘】+【早期已做真题错题清扫（第一轮）】",
      "focusArea": "针对性重练薄弱模块，清扫早期已做真题遗留错题",
      "coreConcepts": [
        "【2017 年错题复盘】+【早期已做真题错题清扫（第一轮）】",
        "针对性重练薄弱模块",
        "清理早期真题中的易错概念题与反例题"
      ],
      "mcqTarget": "清理早期真题中的易错概念题与反例题",
      "bigQuestionTarget": "针对性重练薄弱大题模块（如定积分物理应用/微分方程应用）",
      "recommendedProblems": [
        "2017 年错题本",
        "早期真题错题集（第一轮）"
      ],
      "pitfallsToAvoid": [
        "不要只改 17 年新错题，早期错题必须翻开动手重新算一遍"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "os-1030",
      "date": "2026-10-30",
      "dayIndex": 10,
      "subject": "os",
      "phase": "【OS四阶段】文件系统与I/O",
      "title": "第4章 磁盘组织 + 第5章 I/O核心速通",
      "focusArea": "磁盘访问时间 + 磁盘调度算法（SSTF/SCAN/C-SCAN） + SPOOLing假脱机技术",
      "coreConcepts": [
        "磁盘访问时间：寻道时间 $T_s$（磁头移到指定磁道，耗时最长） + 旋转延迟时间 $T_r$（磁道转到指定扇区，平均转半圈） + 传输时间 $T_t$",
        "四大磁盘调度算法：\n1. FCFS 先来先服务；\n2. SSTF 最短寻道优先（贪心，会引起饥饿）；\n3. SCAN 电梯算法（磁道单向移动到头再掉头）；\n4. C-SCAN 循环扫描（单向扫描，掉头时不提供服务直接复位到端点）",
        "I/O软件层次结构：用户层 I/O -> 设备独立性软件（逻辑设备名映射物理设备名、LUT、设备保护） -> 设备驱动程序（直接与硬件通信） -> 中断处理程序",
        "SPOOLing 假脱机技术：利用预输入程序和缓输出程序，在磁盘上开辟输入井和输出井，将独占设备改造为逻辑共享设备！"
      ],
      "mcqTarget": "刷透磁盘调度磁头移动道数计算、I/O软件各层功能划分、SPOOLing特征选择题",
      "bigQuestionTarget": "做 1 道磁盘调度或磁盘格式化扇区排列大题",
      "recommendedProblems": [
        "讲义磁盘调度磁头寻道距离与交替扇区排列计算题"
      ],
      "pitfallsToAvoid": [
        "SCAN 算法务必看清当前磁头的移动方向（是向磁道号增大方向还是减小方向移动）！"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做",
      "action": "做 1 篇真题阅读，复习近 5 天整理的生词表",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "新中国确立与社会主义改造",
      "action": "读手册 15 分钟（三大改造完成标志），刷题",
      "durationMinutes": 50
    }
  },
  {
    "date": "2026-10-31",
    "formattedDate": "10月31日",
    "weekday": "周六",
    "theme": "【数二真题 Day 5】全真模考【2018 年真题】（上午 8:... · 操作系统全书核心母题盘点与脉络收尾（OS全书",
    "math2Task": {
      "id": "math2-1031",
      "date": "2026-10-31",
      "dayIndex": 24,
      "subject": "math2",
      "phase": "【第一阶段】中近期硬仗练兵（Day 5）",
      "title": "全真模考【2018 年真题】（上午 8:30—11:30）",
      "focusArea": "训练复杂大题的计算耐力与草稿纸规划",
      "coreConcepts": [
        "全真模考【2018 年真题】（上午 8:30—11:30）",
        "训练复杂大题的计算耐力与草稿纸规划",
        "高难度硬仗卷抗压演习，草稿纸分区规划"
      ],
      "mcqTarget": "面对高难度选填学会合理取舍与排除法",
      "bigQuestionTarget": "硬抗 2018 年高难度大题计算，能写几步算几步争取步骤分",
      "recommendedProblems": [
        "2018 年数学二统考真题全卷"
      ],
      "pitfallsToAvoid": [
        "2018年难度极大，分数低绝不气馁，核心是检验高压下的心理防线与计算耐力！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "os-1031",
      "date": "2026-10-31",
      "dayIndex": 11,
      "subject": "os",
      "phase": "【OS四阶段】全书大收官",
      "title": "操作系统全书核心母题盘点与脉络收尾（OS全书圆满大结课！）",
      "focusArea": "复盘三张王牌：PV模板默写 + TLB-页表-Cache全链路 + 历年真题错题清零",
      "coreConcepts": [
        "复盘王牌一：默写/过一遍 2 类经典 PV 伪代码模板（生产者-消费者缓冲区互斥+同步、读者-写者读优先/写优先）",
        "复盘王牌二：在脑海里闭眼默念一遍【虚拟地址 -> TLB -> 页表 -> 物理地址 -> Cache -> 主存】的完整判定与转换流程",
        "复盘王牌三：翻看过去 10 天做错的全部统考真题选择题（每章5-10道），确保概念不再错第二次！",
        "宣告：408两大半壁江山（计组45分 + 操作系统35分 = 80分）强化正式圆满收官！明天全军无缝杀入计算机网络！"
      ],
      "mcqTarget": "今天不做任何新题，彻底清空过去 10 天的 OS 错题本！",
      "bigQuestionTarget": "在白纸上闭卷默写出生产者-消费者标准伪代码与虚存寻址流程图",
      "recommendedProblems": [
        "OS全书核心大题解题工作流默写"
      ],
      "pitfallsToAvoid": [
        "今天不要做偏怪新题，守住已经攻下的高频真题阵地，保持胜势！"
      ],
      "suggestedDurationMinutes": 180,
      "isCompleted": false
    },
    "englishTask": {
      "title": "总结10月真题阅读高频错因模型",
      "action": "整理 10 月精读中遇到的 5 大干扰项类型（因果倒置、偷换概念、绝对化等）",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "10月政治核心选择错题清零",
      "action": "用 40 分钟快速翻阅背诵手册已划荧光笔的错题知识点，准备迎接11月肖八！",
      "durationMinutes": 50
    }
  },
  {
    "date": "2026-11-01",
    "formattedDate": "11月1日",
    "weekday": "周日",
    "theme": "【数二真题 Day 6】【2018 年深度订正】针对失分集中的大... · 第1章 体系结构 + 第2章 物理层（合体速",
    "math2Task": {
      "id": "math2-1101",
      "date": "2026-11-01",
      "dayIndex": 25,
      "subject": "math2",
      "phase": "【第一阶段】中近期硬仗练兵（Day 6）",
      "title": "【2018 年深度订正】针对失分集中的大题逐步排查失误",
      "focusArea": "针对失分集中的大题逐步排查失误，重写完整解答过程",
      "coreConcepts": [
        "【2018 年深度订正】针对失分集中的大题逐步排查失误",
        "重写完整解答过程",
        "总结大题采分点与步骤书写技巧"
      ],
      "mcqTarget": "吃透 18 年新颖概念题的命题切入点",
      "bigQuestionTarget": "在草稿纸上重写 18 年全部大题直至完全顺畅",
      "recommendedProblems": [
        "2018 年真题大题深度精析"
      ],
      "pitfallsToAvoid": [
        "不要被大题的复杂外表吓退，拆解到每一步其实都是基础定理的组合"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cn-1101",
      "date": "2026-11-01",
      "dayIndex": 1,
      "subject": "cn",
      "phase": "【计网一阶段】体系物理与数据链路",
      "title": "第1章 体系结构 + 第2章 物理层（合体速通日！）",
      "focusArea": "五层体系结构各层功能/PDU + 时延计算 + 奈氏准则 vs 香农定理",
      "coreConcepts": [
        "体系结构与 PDU：物理层（比特 bit）、数据链路层（帧 frame）、网络层（数据报/分组 packet）、传输层（报文段 segment）、应用层（报文 message）",
        "时延计算黄金对比：发送时延 = 数据长度 / 信道带宽（发生在网卡内部） vs 传播时延 = 信道长度 / 电磁波速率（发生在传输介质中，光纤约 2×10^8 m/s），绝不能混淆！",
        "物理层两大神级公式：\n1. 奈氏准则（无噪信道）：极限数据率 = 2W log2 V [b/s]（W 为带宽 Hz，V 为离散电平数）；\n2. 香农公式（有噪信道）：极限数据率 = W log2(1 + S/N) [b/s]（注意：若给出信噪比 SNR(dB) = 10 log10(S/N)，需先转换为无量纲 S/N，如 30dB -> S/N=1000）"
      ],
      "mcqTarget": "刷透历年统考真题中奈氏/香农结合题与时延计算选择题（约 6 道）",
      "bigQuestionTarget": "无大题，两小时内极速刷完前两章真题选择题并掌握公式",
      "recommendedProblems": [
        "历年奈氏准则与香农公式结合选择题"
      ],
      "pitfallsToAvoid": [
        "若题目同时给出无噪电平数和有噪信噪比，分别用两公式算出后必须取较小值！"
      ],
      "suggestedDurationMinutes": 180,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做",
      "action": "做 1 篇真题阅读，提炼文章主旨大意句",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "关注11月时政专题与背诵手册扫描",
      "action": "读手册 15 分钟（党的最新重大会议核心精神），刷题",
      "durationMinutes": 50
    }
  },
  {
    "date": "2026-11-02",
    "formattedDate": "11月2日",
    "weekday": "周一",
    "theme": "【数二真题 Day 7】全真模考【2020 年真题】（上午 8:... · 第3章 数据链路层（差错控制与滑动窗口三大协",
    "math2Task": {
      "id": "math2-1102",
      "date": "2026-11-02",
      "dayIndex": 26,
      "subject": "math2",
      "phase": "【第一阶段】中近期硬仗练兵（Day 7）",
      "title": "全真模考【2020 年真题】（上午 8:30—11:30，高难度硬仗卷抗压演练）",
      "focusArea": "高难度硬仗卷抗压演练，重点检验考场心态",
      "coreConcepts": [
        "全真模考【2020 年真题】（上午 8:30—11:30）",
        "高难度硬仗卷抗压演练，重点检验考场心态",
        "大题卡壳时冷静跳过、先拿稳基础分策略"
      ],
      "mcqTarget": "选填题控制失误，基础题一分不丢",
      "bigQuestionTarget": "检验 2020 年综合性大题（极值最值、中值定理、二次型综合题）",
      "recommendedProblems": [
        "2020 年数学二统考真题全卷"
      ],
      "pitfallsToAvoid": [
        "答题过程中一旦卡壳超过 8 分钟立即果断标记跳过，绝不死磕！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cn-1102",
      "date": "2026-11-02",
      "dayIndex": 2,
      "subject": "cn",
      "phase": "【计网一阶段】体系物理与数据链路",
      "title": "第3章 数据链路层（差错控制与滑动窗口三大协议）",
      "focusArea": "CRC 循环冗余校验码 + 滑动窗口（停止等待/GBN/SR）对比 + 窗口大小与利用率",
      "coreConcepts": [
        "CRC 循环冗余校验：模 2 除法（异或运算，不借位），生成多项式为 $r$ 阶则在原数据后补 $r$ 个 0，所得余数即为 $r$ 位 FCS 校验位！",
        "滑动窗口三大协议对比：\n1. 停止-等待：发送窗口 $W_T=1$，接收窗口 $W_R=1$，序号数至少 2；\n2. 后退 N 帧 GBN：$W_T > 1, W_R=1$（累计确认，接收方只按序接收，出错需重传已发的所有帧），$W_T le 2^n - 1$；\n3. 选择重传 SR：$W_T > 1, W_R > 1$（单独确认，有接收缓存），$W_T + W_R le 2^n$，通常 $W_T = W_R = 2^{n-1}$",
        "信道利用率公式：$U = (W \times T_{发送}) / (T_{发送} + RTT + T_{确认})$"
      ],
      "mcqTarget": "刷透 CRC 校验位计算、滑动窗口协议序号位数与窗口大小匹配选择题",
      "bigQuestionTarget": "做 1 道滑动窗口协议信道利用率与最大传输速率计算题",
      "recommendedProblems": [
        "讲义滑动窗口协议利用率与序号范围计算经典大题"
      ],
      "pitfallsToAvoid": [
        "生成多项式多长，补 0 是阶数（最高幂次），切勿将多项式的比特数误当成补 0 个数！"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做",
      "action": "做 1 篇真题阅读，复盘昨日作文语法细节",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "改革开放与中国特色社会主义理论",
      "action": "读手册 15 分钟（邓小平理论核心论断），刷题",
      "durationMinutes": 50
    }
  },
  {
    "date": "2026-11-03",
    "formattedDate": "11月3日",
    "weekday": "周二",
    "theme": "【数二真题 Day 8】【2020 年深度订正】逐题拆解卡壳点... · 第3章 介质访问控制（CSMA/CD 协议）",
    "math2Task": {
      "id": "math2-1103",
      "date": "2026-11-03",
      "dayIndex": 27,
      "subject": "math2",
      "phase": "【第一阶段】中近期硬仗练兵（Day 8）",
      "title": "【2020 年深度订正】逐题拆解卡壳点",
      "focusArea": "深挖高数综合应用和证明题的破题切入点",
      "coreConcepts": [
        "【2020 年深度订正】逐题拆解卡壳点",
        "深挖高数综合应用和证明题的破题切入点",
        "线代抽象矩阵与特征值综合题破题逻辑梳理"
      ],
      "mcqTarget": "彻底搞懂 2020 年选填题的命题套路",
      "bigQuestionTarget": "遮住答案独立写出证明题与综合应用题的每一步推导",
      "recommendedProblems": [
        "2020 年真题错题逐题精研"
      ],
      "pitfallsToAvoid": [
        "证明题要弄清辅助函数构造依据，而不是死记答案怎么设出来的"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cn-1103",
      "date": "2026-11-03",
      "dayIndex": 3,
      "subject": "cn",
      "phase": "【计网一阶段】体系物理与数据链路",
      "title": "第3章 介质访问控制（CSMA/CD 协议）+ 局域网交换机自学习",
      "focusArea": "CSMA/CD 原理 + 最小帧长公式 + 以太网交换机自学习与转发表建立",
      "coreConcepts": [
        "CSMA/CD 协议（先听后发、边听边发、冲突停发、随机重发）：只用于半双工总线型网络；争用期为往返传播时延 $2\tau$；二进制指数退避算法：从 $[0, 1, ..., 2^k - 1]$ 随机选一个数 $r$（$k = min(重传次数, 10)$），退避时间为 $r \times 2\tau$",
        "★神级最小帧长公式：最小帧长 $= 2\tau \times 数据传输速率 = 2 \times (信道长度 / 电磁波速度) \times 数据传输速率$（小于此长度的帧均为冲突碎片帧）",
        "以太网交换机自学习算法：收到帧时，先记录源 MAC 与到达端口到交换表；查目的 MAC，若表中已有则单播转发，若表中没有（或广播帧）则向除进入端口外的所有端口泛洪广播！"
      ],
      "mcqTarget": "做透 CSMA/CD 最小帧长计算题、交换机转发/过滤端口判断真题选择题 4 道",
      "bigQuestionTarget": "攻克 1 道交换机转发表动态更新大题（给网络拓扑，看主机发送数据帧后交换表如何记录）",
      "recommendedProblems": [
        "历年统考以太网交换机转发表与广播域划分大题"
      ],
      "pitfallsToAvoid": [
        "集线器（Hub，物理层，不能隔离冲突域，不能隔离广播域） vs 交换机（Switch，数据链路层，能隔离冲突域，不能隔离广播域） vs 路由器（Router，网络层，既隔离冲突域又隔离广播域）！"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做",
      "action": "做 1 篇真题阅读，分析段落首末句呼应",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "新思想核心概论与新时代成就",
      "action": "读手册 15 分钟（十个明确、十四个坚持），刷题",
      "durationMinutes": 50
    }
  },
  {
    "date": "2026-11-04",
    "formattedDate": "11月4日",
    "weekday": "周三",
    "theme": "【数二真题 Day 9】【第一阶段总结与错题扫尾】集中重做 16... · 第4章 网络层（IPv4 分片、CIDR 与",
    "math2Task": {
      "id": "math2-1104",
      "date": "2026-11-04",
      "dayIndex": 28,
      "subject": "math2",
      "phase": "【第一阶段】中近期硬仗练兵（Day 9）",
      "title": "【第一阶段总结与错题扫尾】集中重做 16/17/18/20 年错题",
      "focusArea": "集中重做 16/17/18/20 年错题，彻底清扫早期真题残留的易错知识点",
      "coreConcepts": [
        "【第一阶段总结与错题扫尾】集中重做 16/17/18/20 年错题",
        "彻底清扫早期真题残留的易错知识点",
        "形成第一阶段硬仗作战心得与答题时间表"
      ],
      "mcqTarget": "第一阶段全部错题二刷清零",
      "bigQuestionTarget": "将 4 套卷中卡壳的大题在无提示状态下完整书写",
      "recommendedProblems": [
        "16/17/18/20 年错题汇总本"
      ],
      "pitfallsToAvoid": [
        "第一阶段告一段落，明日准时进入 2022 年新大纲题型，保持高昂士气！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cn-1104",
      "date": "2026-11-04",
      "dayIndex": 4,
      "subject": "cn",
      "phase": "【计网二阶段】网络层决战",
      "title": "第4章 网络层（IPv4 分片、CIDR 与子网划分大题）",
      "focusArea": "IPv4 首部与分片计算 + CIDR 无分类编址 + 子网划分掩码 + 路由聚合超网",
      "coreConcepts": [
        "IPv4 首部核心字段：首部长度（以 4 字节为单位，乘4）；总长度（以 1 字节为单位）；片偏移（以 8 字节为单位，除以8，每个分片长度必须是 8 字节的整数倍，除最后一个分片外）；MF=1表示后续有分片，DF=1表示禁止分片",
        "CIDR 无分类编址与子网划分：斜线记法 `/24`；网络前缀 + 主机号；子网可用主机数 $= 2^h - 2$（全0网络地址、全1广播地址不可分给主机）；子网掩码按位与运算得到网络号",
        "路由聚合（构成超网）：将多个子网路由汇聚为更短前缀的单条路由，核心算法：找各网络地址的二进制最长公共前缀！"
      ],
      "mcqTarget": "做透 IP 分片计算（片偏移/MF计算）、子网掩码匹配选择题 4 道",
      "bigQuestionTarget": "精做 1 道统考必考 CIDR 子网划分大题（给一个网络前缀，为不同规模部门分配子网，推荐：【2012年统考真题第47题】）",
      "recommendedProblems": [
        "【2012年统考真题第47题】（经典必考母题）"
      ],
      "pitfallsToAvoid": [
        "子网划分分配地址时，务必先满足主机需求量最大的部门（从大到小分配），避免地址块重叠或碎片化！"
      ],
      "suggestedDurationMinutes": 220,
      "isCompleted": false
    },
    "englishTask": {
      "title": "小作文邀请信/道歉信模板书写",
      "action": "手写 1 篇邀请信 + 1 篇道歉信，检查格式及标点",
      "durationMinutes": 80
    },
    "politicsTask": {
      "title": "史纲核心错题清零",
      "action": "小程序清空史纲错题本，用 15 分钟通读会议线索",
      "durationMinutes": 50
    }
  },
  {
    "date": "2026-11-05",
    "formattedDate": "11月5日",
    "weekday": "周四",
    "theme": "【数二真题 Day 10】全真模考【2022 年真题】（新大纲极难... · 第4章 三大辅助协议（ARP/DHCP/NA",
    "math2Task": {
      "id": "math2-1105",
      "date": "2026-11-05",
      "dayIndex": 29,
      "subject": "math2",
      "phase": "【第二阶段】新大纲抗压与磨合（Day 10）",
      "title": "全真模考【2022 年真题】（新大纲极难卷，严格限时 3 小时）",
      "focusArea": "新大纲极难卷，严格限时 3 小时，客观题控制在 75～85 分钟",
      "coreConcepts": [
        "全真模考【2022 年真题】（新大纲极难卷，严格限时 3 小时）",
        "客观题控制在 75～85 分钟",
        "“10+6+6”新大纲题型（10选+6填，共80分；6大题共70分）"
      ],
      "mcqTarget": "在 80 分钟内完成 16 道选填，提高客观测验得分率",
      "bigQuestionTarget": "在余下 100 分钟内冲击 6 道大题，保住基础大题分",
      "recommendedProblems": [
        "2022 年数学二统考真题全卷"
      ],
      "pitfallsToAvoid": [
        "新大纲选填分值高达 80 分，得客观题者得天下，绝不能在选填上过于草率或过度耗时！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cn-1105",
      "date": "2026-11-05",
      "dayIndex": 5,
      "subject": "cn",
      "phase": "【计网二阶段】网络层决战",
      "title": "第4章 三大辅助协议（ARP/DHCP/NAT）与路由表转发机制",
      "focusArea": "ARP 过程 + DHCP 四步广播 + NAT 转换表 + 路由表最长前缀匹配转发",
      "coreConcepts": [
        "ARP 协议（解决同一局域网内 IP 到 MAC 的映射）：广播发送 ARP 请求帧（目的 MAC 为 FF-FF-FF-FF-FF-FF），目标主机单播返回 ARP 响应帧；跨网段寻址时，源主机先找网关的 MAC！跨路由转发时：IP 头部源/目的 IP 始终不变，MAC 帧头部的源/目的 MAC 每过一个路由器就被替换一次！",
        "DHCP 动态主机配置（应用层，基于 UDP 67/68）：客户机无 IP，以广播形式交互四步：Discover -> Offer -> Request -> ACK",
        "NAT 网络地址转换：私有 IP 地址范围（10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16）；通过 NAT 路由器的 IP+端口映射表转换出公网",
        "路由转发机制：按【最长前缀匹配原则】匹配目的 IP 与子网掩码相与后的网络前缀，选择匹配位数最长（最具体）的路由项转发！"
      ],
      "mcqTarget": "做透 ARP 跨网段寻址 MAC/IP 变化、NAT 转换表项真题选择题 4 道",
      "bigQuestionTarget": "精做 1 道路由表查找与下一跳转发大题（给目的 IP 和路由表，算出匹配项和输出接口）",
      "recommendedProblems": [
        "历年统考试卷路由表最长前缀匹配查找大题"
      ],
      "pitfallsToAvoid": [
        "跨网段寻址时牢记铁律：源 IP 与目的 IP 全程不变（除非有 NAT），源 MAC 与目的 MAC 逐跳改变！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做",
      "action": "做 1 篇真题阅读，复盘长难句拆分",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "新思想经济与现代化体系建设",
      "action": "读手册 15 分钟，刷小程序 20 题",
      "durationMinutes": 50
    }
  },
  {
    "date": "2026-11-06",
    "formattedDate": "11月6日",
    "weekday": "周五",
    "theme": "【数二真题 Day 11】【2022 年深度订正】复盘新结构下的时... · 第4章 路由算法（RIP / OSPF / ",
    "math2Task": {
      "id": "math2-1106",
      "date": "2026-11-06",
      "dayIndex": 30,
      "subject": "math2",
      "phase": "【第二阶段】新大纲抗压与磨合（Day 11）",
      "title": "【2022 年深度订正】复盘新结构下的时间分配",
      "focusArea": "复盘新结构下的时间分配，吃透选填题的技巧解法（排他法、特值法等）",
      "coreConcepts": [
        "【2022 年深度订正】复盘新结构下的时间分配",
        "吃透选填题的技巧解法（排他法、特值法等）",
        "总结 2022 年大题命题风格与失分细节"
      ],
      "mcqTarget": "选填错题必须掌握至少两种解法（通法 + 技巧法）",
      "bigQuestionTarget": "独立重做 22 年 6 道大题中的失分大题",
      "recommendedProblems": [
        "2022 年真题全卷深度复盘"
      ],
      "pitfallsToAvoid": [
        "做选择题绝不要每题都用大题步骤硬算，多总结特值与图形直觉快速破题！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cn-1106",
      "date": "2026-11-06",
      "dayIndex": 6,
      "subject": "cn",
      "phase": "【计网二阶段】网络层决战",
      "title": "第4章 路由算法（RIP / OSPF / BGP）与网络层综合真题大题收尾",
      "focusArea": "自治系统 AS + 内部路由协议（RIP vs OSPF） + 外部协议 BGP + 综合大题",
      "coreConcepts": [
        "自治系统 AS 内部与外部路由协议对比：\n1. RIP（应用层，基于 UDP 520）：基于距离-向量算法，度量值为跳数（最大15跳，16表示不可达），仅与相邻路由器交换整个路由表，“好消息传得快，坏消息传得慢”易产生路由环路；\n2. OSPF（网络层，直接基于 IP 协议号89）：基于链路状态算法与 Dijkstra 最短路径，向全网路由器泛洪发送本路由器与相邻路由器的链路状态，收敛速度极快，无路由环路，分层次（主干区域Area 0）；\n3. BGP（传输层，基于 TCP 179）：基于路径向量算法，在自治系统之间交换可达性信息",
        "各大路由协议工作层次记忆：RIP 用 UDP（应用层），OSPF 直接用 IP（网络层），BGP 用 TCP（应用层/传输层支撑）"
      ],
      "mcqTarget": "刷透 RIP/OSPF/BGP 协议工作层次、报文封装形式与算法特征选择题",
      "bigQuestionTarget": "精做 1 道统考网络层综合大题（推荐：【2015年统考真题第47题】或【2017年统考真题第47题】）",
      "recommendedProblems": [
        "【2015年统考真题第47题】",
        "【2017年统考真题第47题】"
      ],
      "pitfallsToAvoid": [
        "网络层今天正式彻底大收官！明天全速扑向计网第二大王牌——传输层 TCP！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做",
      "action": "做 1 篇真题阅读，复盘作者态度与推断题逻辑",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "史纲十一届三中全会与伟大转折",
      "action": "读手册 15 分钟，刷小程序 20 题",
      "durationMinutes": 50
    }
  },
  {
    "date": "2026-11-07",
    "formattedDate": "11月7日",
    "weekday": "周六",
    "theme": "【数二真题 Day 12】全真模考【张宇八套卷（套卷一）】（8:3... · 第5章 传输层（UDP vs TCP 协议与",
    "math2Task": {
      "id": "math2-1107",
      "date": "2026-11-07",
      "dayIndex": 31,
      "subject": "math2",
      "phase": "【第二阶段】新大纲抗压与磨合（Day 12）",
      "title": "全真模考【张宇八套卷（套卷一）】（8:30—11:30）",
      "focusArea": "全真模考张宇八套卷（套卷一），建立高难度模拟卷心理防线",
      "coreConcepts": [
        "全真模考【张宇八套卷（套卷一）】（8:30—11:30）",
        "建立高难度模拟卷心理防线",
        "检验高压环境下的客观题解题速度与心态稳健度"
      ],
      "mcqTarget": "掐表完成选填，记录偏怪题与常规错题的区别",
      "bigQuestionTarget": "尽可能抓住常规中档大题分值",
      "recommendedProblems": [
        "张宇八套卷（套卷一）全卷"
      ],
      "pitfallsToAvoid": [
        "模拟卷重在查漏补缺和心理抗压，分数高低切莫影响做题节奏与自信！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cn-1107",
      "date": "2026-11-07",
      "dayIndex": 7,
      "subject": "cn",
      "phase": "【计网三阶段】传输层决战",
      "title": "第5章 传输层（UDP vs TCP 协议与三次握手四次挥手时序分析）",
      "focusArea": "UDP 特点与首部 + TCP 报文首部字段 + 三次握手与四次挥手状态流转",
      "coreConcepts": [
        "UDP 协议：无连接、尽最大努力交付、面向报文（不拆分不合并），首部只有 8 字节（源端口、目的端口、长度、校验和，计算校验和需加 12 字节伪首部）",
        "TCP 报文首部（固定20字节）：序号 seq（报文段第一个字节的序号）、确认号 ack（期望收到的下一个字节序号）；控制位：URG, ACK（连接建立后恒为1）, PSH, RST, SYN（建立连接请求，消耗一个序号）, FIN（释放连接请求，消耗一个序号）；接收窗口 rwnd",
        "TCP 连接管理状态机：\n1. 三次握手：SYN=1, seq=x -> SYN=1, ACK=1, seq=y, ack=x+1 -> ACK=1, seq=x+1, ack=y+1（第三次握手可携带数据）；\n2. 四次挥手：FIN=1, seq=u -> ACK=1, ack=u+1 -> FIN=1, ACK=1, seq=w, ack=u+1 -> ACK=1, ack=w+1；客户端必须等待 2MSL（TIME_WAIT 状态）才真正关闭，确保最后一个 ACK 到达且旧报文消失！"
      ],
      "mcqTarget": "做透 TCP 首部标志位含义、握手与挥手阶段 seq/ack 数值计算选择题 4 道",
      "bigQuestionTarget": "手画三次握手与四次挥手时序图，标出两端的状态变化（ESTABLISHED, TIME_WAIT 的作用）",
      "recommendedProblems": [
        "历年统考 TCP 握手时序与字段计算真题"
      ],
      "pitfallsToAvoid": [
        "SYN 和 FIN 报文段不携带数据，但必须消耗一个序号！ACK 报文段若不携带数据则不消耗序号！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "englishTask": {
      "title": "大作文模板全篇手写与字迹打磨",
      "action": "动笔手写 1 篇完整大作文（图表或图画），计时 40 分钟以内",
      "durationMinutes": 80
    },
    "politicsTask": {
      "title": "肖八模拟卷上市前置准备与易错点复盘",
      "action": "读手册 15 分钟（新时代强军外交与一国两制），刷题",
      "durationMinutes": 50
    }
  },
  {
    "date": "2026-11-08",
    "formattedDate": "11月8日",
    "weekday": "周日",
    "theme": "【数二真题 Day 13】【张八（一）订正】精研常规错题... · 第5章 TCP 流量控制与拥塞控制折线图大题",
    "math2Task": {
      "id": "math2-1108",
      "date": "2026-11-08",
      "dayIndex": 32,
      "subject": "math2",
      "phase": "【第二阶段】新大纲抗压与磨合（Day 13）",
      "title": "【张八（一）订正】精研常规错题",
      "focusArea": "精研常规错题；若遇极偏怪题，看解析超过 25 分钟仍不理解果断放弃",
      "coreConcepts": [
        "【张八（一）订正】精研常规错题",
        "若遇极偏怪题，看解析超过 25 分钟仍不理解果断放弃",
        "总结通法，杜绝偏执于偏门技巧"
      ],
      "mcqTarget": "吸收选填中巧妙的思维切入点",
      "bigQuestionTarget": "重做卷一中符合统考命题风格的高质量大题",
      "recommendedProblems": [
        "张八（一）错题订正"
      ],
      "pitfallsToAvoid": [
        "坚决执行止损规则！考研拼的是通法熟练度，偏怪难题不会考第二遍！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cn-1108",
      "date": "2026-11-08",
      "dayIndex": 8,
      "subject": "cn",
      "phase": "【计网三阶段】传输层决战",
      "title": "第5章 TCP 流量控制与拥塞控制折线图大题（必考大题，送分必拿满！）",
      "focusArea": "滑动窗口流量控制 + 拥塞控制四大算法（慢开始/拥塞避免/快重传/快恢复） + 折线图",
      "coreConcepts": [
        "滑动窗口流量控制：接收方通过 rwnd 字段控制发送方的发送窗口；若接收方发送 rwnd=0 报文后窗口恢复，发送方需定期发送零窗口探测报文（防止死锁）",
        "TCP 拥塞控制四大算法：\n1. 慢开始（Slow Start）：从 cwnd = 1 开始，每收到一个 ACK，cwnd+1（每个 RTT cwnd 翻倍成指数增长），直到达到慢开始门限 ssthresh；\n2. 拥塞避免（Congestion Avoidance）：到达 ssthresh 后，每过一个 RTT，cwnd 线性加 1（加法增大）；\n3. 快重传与快恢复：收到 3 个重复冗余 ACK 时，立即重传丢失报文，同时门限减半：$ssthresh = cwnd / 2$，然后设 $cwnd = 新 ssthresh$，执行加法增大的快恢复！\n4. 超时重传（Timeout）：门限减半：$ssthresh = cwnd / 2$；但 cwnd 直接重置为 1！重新进入慢开始！",
        "发送方实际发送窗口：发送窗口 $= min(rwnd, cwnd)$！"
      ],
      "mcqTarget": "刷透各类拥塞事件触发时 ssthresh 与 cwnd 变迁选择题 4 道",
      "bigQuestionTarget": "攻克 1 道统考必考 TCP 拥塞控制折线图计算大题（送分题，必须拿满满分，推荐：【2013年统考真题第47题】或【2019年统考真题第47题】）",
      "recommendedProblems": [
        "【2013年统考真题第47题】",
        "【2019年统考真题第47题】"
      ],
      "pitfallsToAvoid": [
        "仔细审题是发生【超时重传 Timeout】还是收到【3 个冗余 ACK】！超时重传 cwnd 跌回 1，3个冗余 ACK 只是 cwnd 降到新门限！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "englishTask": {
      "title": "启动新题型（七选五/排序题）专项方法速通",
      "action": "学习新题型解题方法论（指代词一致、逻辑承接词、时间数字线索），精做 2 篇真题新题型",
      "durationMinutes": 80
    },
    "politicsTask": {
      "title": "思修道德常识错题清零",
      "action": "小程序清空思修错题本，用 15 分钟背诵核心法律原则",
      "durationMinutes": 50
    }
  },
  {
    "date": "2026-11-09",
    "formattedDate": "11月9日",
    "weekday": "周一",
    "theme": "【数二真题 Day 14】全真模考【2023 年真题】（8:30—... · 第6章 应用层核心协议通关（DNS、HTTP",
    "math2Task": {
      "id": "math2-1109",
      "date": "2026-11-09",
      "dayIndex": 33,
      "subject": "math2",
      "phase": "【第二阶段】新大纲抗压与磨合（Day 14）",
      "title": "全真模考【2023 年真题】（8:30—11:30）",
      "focusArea": "训练避开计算陷阱与细节失误的能力",
      "coreConcepts": [
        "全真模考【2023 年真题】（8:30—11:30）",
        "训练避开计算陷阱与细节失误的能力",
        "客观题耗时继续压制在 80 分钟左右"
      ],
      "mcqTarget": "选填题力争高准确率，注意定义域、负号、开方符号等细节陷阱",
      "bigQuestionTarget": "完成 2023 年大题书写，对比考场评分细则",
      "recommendedProblems": [
        "2023 年数学二统考真题全卷"
      ],
      "pitfallsToAvoid": [
        "2023年计算量偏大且陷阱多，算完一步多瞄一眼是否有明显的正负号疏漏！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cn-1109",
      "date": "2026-11-09",
      "dayIndex": 9,
      "subject": "cn",
      "phase": "【计网四阶段】应用层与全科大收官",
      "title": "第6章 应用层核心协议通关（DNS、HTTP与时延计算）",
      "focusArea": "DNS 递归/迭代解析 + HTTP/1.0 与 1.1 RTT 时延计算 + 邮件协议与 FTP",
      "coreConcepts": [
        "DNS 域名系统（基于 UDP 53）：递归查询（本地域名服务器代劳查到底，一路问到底） vs 迭代查询（本地域名服务器自己挨个问根、顶级、权限域名服务器，常用）；根域名服务器知道所有顶级域名服务器的地址",
        "HTTP 协议（基于 TCP 80）：\n1. HTTP/1.0：非持续连接，每个对象都需要经历 TCP 三次握手，获取一个包含 $n$ 个图片的网页需 $1 + 2n$ 个 RTT；\n2. HTTP/1.1：持续连接（非流水线方式：每个对象等上一个收到才请求，共 $1 + n$ 个 RTT；流水线方式：所有引用对象一次性并行发出，仅需 $1 + 1 = 2$ 个 RTT！）",
        "Cookie（客户端保存状态） vs Session（服务器端保存状态）；FTP（控制连接端口 21 持续整个会话，数据连接端口 20 传完即关闭）；邮件协议（SMTP 发送，POP3/IMAP 读取）"
      ],
      "mcqTarget": "做透 DNS 递归与迭代过程选择题、HTTP 响应与获取对象 RTT 耗时计算选择题",
      "bigQuestionTarget": "做 1 道非持续连接与持续连接流水线模式下获取网页及图片的 RTT 耗时计算大题",
      "recommendedProblems": [
        "历年统考 HTTP 与 DNS 交互时延计算真题"
      ],
      "pitfallsToAvoid": [
        "计算打开一个网页总 RTT 时：切勿漏掉 DNS 查询的 RTT（若 DNS 缓存未命中）以及建立初始 TCP 连接的三次握手 1 个 RTT！"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读手感维持",
      "action": "限时 18 分钟精做 1 篇真题阅读，保持高压解题直觉",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "读背诵手册时政专题",
      "action": "读背诵手册时政部分 20 分钟，做好迎接明日《肖八》的心理准备",
      "durationMinutes": 50
    }
  },
  {
    "date": "2026-11-10",
    "formattedDate": "11月10日",
    "weekday": "周二",
    "theme": "【数二真题 Day 15】【2023 年深度订正】逐题整理客观题丢... · 【终极串联】“浏览器输入URL全流程”与40",
    "math2Task": {
      "id": "math2-1110",
      "date": "2026-11-10",
      "dayIndex": 34,
      "subject": "math2",
      "phase": "【第二阶段】新大纲抗压与磨合（Day 15）",
      "title": "【2023 年深度订正】逐题整理客观题丢分原因",
      "focusArea": "逐题整理客观题丢分原因，归纳常考计算盲点",
      "coreConcepts": [
        "【2023 年深度订正】逐题整理客观题丢分原因",
        "归纳常考计算盲点",
        "总结大题完整规范步骤"
      ],
      "mcqTarget": "客观题丢分点逐一登记在错题清单",
      "bigQuestionTarget": "独立把失分大题重算一遍直到得出正确终值",
      "recommendedProblems": [
        "2023 年真题错题全套"
      ],
      "pitfallsToAvoid": [
        "订正时不仅要弄懂怎么做，还要反思“当时为什么掉进了出题人的陷阱”"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cn-1110",
      "date": "2026-11-10",
      "dayIndex": 10,
      "subject": "cn",
      "phase": "【计网四阶段】408全科大闭幕",
      "title": "【终极串联】“浏览器输入URL全流程”与408全科强化胜利大闭幕！",
      "focusArea": "从开机到网页显示的完整协议交互链路闭环复盘（终极打通计网脉络）",
      "coreConcepts": [
        "★神级考研母题演练：“在主机浏览器中输入 http://www.abc.com 并回车，直至页面显示，整个网络中发生了哪些协议交互？”",
        "完整协议链路闭环：\n1. DHCP 获取配置：主机通过 DHCP 广播获取本机 IP、子网掩码、默认网关 IP 与 DNS 服务器 IP；\n2. 查 DNS 缓存与发请求：主机查本地 DNS 缓存；若未命中，封装 UDP 数据报向 DNS 服务器发请求；\n3. ARP 广播解析网关 MAC：若主机无网关 MAC，发送 ARP 广播请求网关 MAC；网关单播应答；\n4. 路由器转发：各级路由器按最长前缀匹配原则，经 OSPF/BGP 转发表将 DNS 请求路由到 DNS 服务器，返回目标 Web 服务器 IP；\n5. TCP 三次握手：主机向 Web 服务器 80 端口发起 TCP 三次握手建立连接；\n6. HTTP 交互：建立连接后，主机发送 HTTP GET 请求报文，Web 服务器返回 200 OK 与 HTML 资源；\n7. 四次挥手：数据传输完毕后，双方通过四次挥手优雅释放连接！",
        "胜利宣告：408四大科目（数据结构45分 + 计组45分 + 操作系统35分 + 计网25分 = 150分）强化全线胜利闭幕！明日正式合流 2010–2024 历年真题全真模拟套卷！"
      ],
      "mcqTarget": "在草稿纸上独立画出【URL输入全流程协议交互时序图】，确保每一环清清楚楚！",
      "bigQuestionTarget": "闭卷默写 URL 输入全流程协议清单与各协议对应层次，给自己一个完美的强化期交代！",
      "recommendedProblems": [
        "浏览器输入URL全流程协议大综合复盘"
      ],
      "pitfallsToAvoid": [
        "恭喜你！到今天为止，你已经把考研最硬的两块骨头——数二与408强化全线推平！从明天开始，我们将全面合流真题套卷大决战！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "englishTask": {
      "title": "英语历年真题作文分类汇总与模板定型",
      "action": "整理个人专属的大作文（图画图表三大段）与小作文（书信告示通知）最终背诵版本",
      "durationMinutes": 80
    },
    "politicsTask": {
      "title": "《肖八》到手！全面开启《肖八》选择题狂刷冲刺模式！",
      "action": "收到《肖八》后，每天掐表 20-30 分钟精刷一套肖八选择题，错题用荧光笔死磕背诵手册！",
      "durationMinutes": 60
    }
  },
  {
    "date": "2026-11-11",
    "formattedDate": "11月11日",
    "weekday": "周三",
    "theme": "【数二真题 Day 16】全真模考【张宇八套卷（套卷二）】（8:3... · 408 统考真题模考第1套（2010年真题，...",
    "math2Task": {
      "id": "math2-1111",
      "date": "2026-11-11",
      "dayIndex": 35,
      "subject": "math2",
      "phase": "【第二阶段】新大纲抗压与磨合（Day 16）",
      "title": "全真模考【张宇八套卷（套卷二）】（8:30—11:30）",
      "focusArea": "全真模考张宇八套卷（套卷二）（8:30—11:30）",
      "coreConcepts": [
        "全真模考【张宇八套卷（套卷二）】（8:30—11:30）",
        "巩固 3 小时考场时间节奏分配",
        "检验高压环境下的客观题解题速度"
      ],
      "mcqTarget": "在限时内完成选填，保持良好考场心态",
      "bigQuestionTarget": "攻克常规板块大题",
      "recommendedProblems": [
        "张宇八套卷（套卷二）全卷"
      ],
      "pitfallsToAvoid": [
        "做模拟题时切莫瞻前顾后，拿稳能拿的分就是胜利"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1111",
      "date": "2026-11-11",
      "dayIndex": 35,
      "subject": "cs",
      "phase": "【408真题套卷大决战】",
      "title": "408 统考真题模考第1套（2010年真题，14:00-17:00 掐表）",
      "focusArea": "408 历年真题套卷大决战首战拔剑，严格闭卷 3 小时涂卡模考",
      "coreConcepts": [
        "检验 408 四科综合实战知识面与时间分配（客观题 ≤ 70分钟）",
        "数据结构算法题与计组浮点数大题"
      ],
      "mcqTarget": "客观题争取拿下 70 分以上",
      "bigQuestionTarget": "完整手写解答题与算法伪代码",
      "recommendedProblems": [
        "2010年408统考真题全卷"
      ],
      "pitfallsToAvoid": [
        "做完后立刻批改，统计各科失分率"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做保持高压手感 + 每周作文动笔",
      "action": "限时 18 分钟做 1 篇真题阅读，复盘长难句与核心词汇，每周手写 2 篇大小作文",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "《肖八》选择题疯狂轮刷模式（目标平均 40+ 分）",
      "action": "每天掐表 20-30 分钟精刷一套肖八选择题，错题用荧光笔在背诵手册上狠划一道！",
      "durationMinutes": 60
    }
  },
  {
    "date": "2026-11-12",
    "formattedDate": "11月12日",
    "weekday": "周四",
    "theme": "【数二真题 Day 17】【张八（二）订正】吸收新颖解题角度，偏怪... · 【2010年408深度订正】重做失分大题与算...",
    "math2Task": {
      "id": "math2-1112",
      "date": "2026-11-12",
      "dayIndex": 36,
      "subject": "math2",
      "phase": "【第二阶段】新大纲抗压与磨合（Day 17）",
      "title": "【张八（二）订正】吸收新颖解题角度，偏怪题限时止损",
      "focusArea": "吸收新颖解题角度，偏怪题限时止损",
      "coreConcepts": [
        "【张八（二）订正】吸收新颖解题角度，偏怪题限时止损",
        "严格执行偏怪题限时止损原则",
        "提炼常用代换技巧与化简规律"
      ],
      "mcqTarget": "总结选填中新颖的数形结合与特值思维",
      "bigQuestionTarget": "规范书写大题中档题步骤",
      "recommendedProblems": [
        "张八（二）订正"
      ],
      "pitfallsToAvoid": [
        "只收纳具有普遍性参考价值的错题，偏怪算式直接跳过"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1112",
      "date": "2026-11-12",
      "dayIndex": 36,
      "subject": "cs",
      "phase": "【408真题套卷大决战】",
      "title": "【2010年408深度订正】重做失分大题与算法代码",
      "focusArea": "遮住答案独立在草稿纸上重做错题，排查知识漏洞",
      "coreConcepts": [
        "逐题分析选择题陷阱与大题评分标准",
        "建立 408 真题错题本"
      ],
      "mcqTarget": "弄懂全部错题的对应考纲知识点",
      "bigQuestionTarget": "在白纸上重写数据结构算法与计组大题",
      "recommendedProblems": [
        "2010年真题错题本"
      ],
      "pitfallsToAvoid": [
        "看懂解析不等于会做，必须白纸独立写出"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做保持高压手感 + 每周作文动笔",
      "action": "限时 18 分钟做 1 篇真题阅读，复盘长难句与核心词汇，每周手写 2 篇大小作文",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "《肖八》选择题疯狂轮刷模式（目标平均 40+ 分）",
      "action": "每天掐表 20-30 分钟精刷一套肖八选择题，错题用荧光笔在背诵手册上狠划一道！",
      "durationMinutes": 60
    }
  },
  {
    "date": "2026-11-13",
    "formattedDate": "11月13日",
    "weekday": "周五",
    "theme": "【数二真题 Day 18】全真模考【张宇八套卷（套卷三）】（8:3... · 408 统考真题模考第2套（2011年真题，...",
    "math2Task": {
      "id": "math2-1113",
      "date": "2026-11-13",
      "dayIndex": 37,
      "subject": "math2",
      "phase": "【第二阶段】新大纲抗压与磨合（Day 18）",
      "title": "全真模考【张宇八套卷（套卷三）】（8:30—11:30）",
      "focusArea": "全真模考张宇八套卷（套卷三）（8:30—11:30）",
      "coreConcepts": [
        "全真模考【张宇八套卷（套卷三）】（8:30—11:30）",
        "检验客观题做题速度与准确率平衡点",
        "训练草稿纸工整度与复查技巧"
      ],
      "mcqTarget": "选填题保证基础 12 题稳定拿分",
      "bigQuestionTarget": "大题书写步骤分明，逻辑连贯",
      "recommendedProblems": [
        "张宇八套卷（套卷三）全卷"
      ],
      "pitfallsToAvoid": [
        "模考时留出 10-15 分钟检查草稿纸核心步骤算式"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1113",
      "date": "2026-11-13",
      "dayIndex": 37,
      "subject": "cs",
      "phase": "【408真题套卷大决战】",
      "title": "408 统考真题模考第2套（2011年真题，14:00-17:00）",
      "focusArea": "全真模考 2011 年真题，攻克 Cache 与虚存经典大题",
      "coreConcepts": [
        "2011年真题实战模拟",
        "第43题数据表示与第44题跨学科顶级大题"
      ],
      "mcqTarget": "巩固客观题解题节奏",
      "bigQuestionTarget": "攻克 43/44 题两大硬核大题",
      "recommendedProblems": [
        "2011年408统考真题全卷"
      ],
      "pitfallsToAvoid": [
        "遇到难题保持冷静，先抓容易得分的采分点"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做保持高压手感 + 每周作文动笔",
      "action": "限时 18 分钟做 1 篇真题阅读，复盘长难句与核心词汇，每周手写 2 篇大小作文",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "《肖八》选择题疯狂轮刷模式（目标平均 40+ 分）",
      "action": "每天掐表 20-30 分钟精刷一套肖八选择题，错题用荧光笔在背诵手册上狠划一道！",
      "durationMinutes": 60
    }
  },
  {
    "date": "2026-11-14",
    "formattedDate": "11月14日",
    "weekday": "周六",
    "theme": "【数二真题 Day 19】【张八（三）订正】重做选填错题，总结高频... · 【2011年408深度订正】吃透跨学科地址翻...",
    "math2Task": {
      "id": "math2-1114",
      "date": "2026-11-14",
      "dayIndex": 38,
      "subject": "math2",
      "phase": "【第二阶段】新大纲抗压与磨合（Day 19）",
      "title": "【张八（三）订正】重做选填错题，总结高频计算漏洞",
      "focusArea": "重做选填错题，总结高频计算漏洞",
      "coreConcepts": [
        "【张八（三）订正】重做选填错题，总结高频计算漏洞",
        "深度排查易混淆概念",
        "总结高频计算漏洞（极限展开项数不足、分部积分负号等）"
      ],
      "mcqTarget": "选填错题全部在草稿纸上独立复做一遍",
      "bigQuestionTarget": "攻克常规解答题中的失误环节",
      "recommendedProblems": [
        "张八（三）错题集"
      ],
      "pitfallsToAvoid": [
        "明日将进行选填专项回炉，今天把前三套张八的选填错题做好标记"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1114",
      "date": "2026-11-14",
      "dayIndex": 38,
      "subject": "cs",
      "phase": "【408真题套卷大决战】",
      "title": "【2011年408深度订正】吃透跨学科地址翻译综合大题",
      "focusArea": "彻底打通虚拟地址到物理地址到 Cache 的寻址全流程",
      "coreConcepts": [
        "TLB-Page-Cache 联动法则三定律",
        "C语言指针与强制转换截断"
      ],
      "mcqTarget": "排查操作系统与计组结合部选择题",
      "bigQuestionTarget": "重写 2011 年第44题全套寻址步骤",
      "recommendedProblems": [
        "2011年408深度复盘笔记"
      ],
      "pitfallsToAvoid": [
        "搞懂虚页号、页内偏移、Cache组号切分细节"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做保持高压手感 + 每周作文动笔",
      "action": "限时 18 分钟做 1 篇真题阅读，复盘长难句与核心词汇，每周手写 2 篇大小作文",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "《肖八》选择题疯狂轮刷模式（目标平均 40+ 分）",
      "action": "每天掐表 20-30 分钟精刷一套肖八选择题，错题用荧光笔在背诵手册上狠划一道！",
      "durationMinutes": 60
    }
  },
  {
    "date": "2026-11-15",
    "formattedDate": "11月15日",
    "weekday": "周日",
    "theme": "【数二真题 Day 20】【中期缓冲与选填回炉】暂停成套模考一天... · 【408 阶段错题清扫】集中二刷 10-11...",
    "math2Task": {
      "id": "math2-1115",
      "date": "2026-11-15",
      "dayIndex": 39,
      "subject": "math2",
      "phase": "【第二阶段】新大纲抗压与磨合（Day 20）",
      "title": "【中期缓冲与选填回炉】暂停成套模考一天",
      "focusArea": "暂停成套模考一天，集中重做 22、23 年真题与前三套张八的选填错题",
      "coreConcepts": [
        "【中期缓冲与选填回炉】暂停成套模考一天",
        "集中重做 22、23 年真题与前三套张八的选填错题",
        "集中强化客观题做题手感与准确率"
      ],
      "mcqTarget": "选填错题无盲点过一遍，保证再次遇到同类题 100% 做对",
      "bigQuestionTarget": "回顾整理前期大题常考步骤模板",
      "recommendedProblems": [
        "22、23真题选填错题",
        "张八(一)(二)(三)选填错题"
      ],
      "pitfallsToAvoid": [
        "不要贪多做新题，扎实消化已做试卷的价值远大于盲目刷题！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1115",
      "date": "2026-11-15",
      "dayIndex": 39,
      "subject": "cs",
      "phase": "【408真题套卷大决战】",
      "title": "【408 阶段错题清扫】集中二刷 10-11 年真题错题",
      "focusArea": "集中二刷 10-11 年前两套真题错题，重点攻克地址翻译与外部排序",
      "coreConcepts": [
        "地址翻译全链路巩固",
        "置换选择排序与最佳归并树"
      ],
      "mcqTarget": "清理前两套选择题盲点",
      "bigQuestionTarget": "不看提示完整写出算法与硬件流程",
      "recommendedProblems": [
        "10-11年真题错题合集"
      ],
      "pitfallsToAvoid": [
        "不要拖延订正，趁热打铁闭环巩固"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做保持高压手感 + 每周作文动笔",
      "action": "限时 18 分钟做 1 篇真题阅读，复盘长难句与核心词汇，每周手写 2 篇大小作文",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "《肖八》选择题疯狂轮刷模式（目标平均 40+ 分）",
      "action": "每天掐表 20-30 分钟精刷一套肖八选择题，错题用荧光笔在背诵手册上狠划一道！",
      "durationMinutes": 60
    }
  },
  {
    "date": "2026-11-16",
    "formattedDate": "11月16日",
    "weekday": "周一",
    "theme": "【数二真题 Day 21】全真模考【张宇八套卷（套卷四）】（8:3... · 408 统考真题模考第3套（2012年真题，...",
    "math2Task": {
      "id": "math2-1116",
      "date": "2026-11-16",
      "dayIndex": 40,
      "subject": "math2",
      "phase": "【第二阶段】新大纲抗压与磨合（Day 21）",
      "title": "全真模考【张宇八套卷（套卷四）】（8:30—11:30）",
      "focusArea": "全真模考张宇八套卷（套卷四）（8:30—11:30）",
      "coreConcepts": [
        "全真模考【张宇八套卷（套卷四）】（8:30—11:30）",
        "检验经过昨日选填回炉后的解题敏锐度",
        "巩固时间分配框架（客观题 ≤ 80分钟）"
      ],
      "mcqTarget": "选填题力争提速并保持高准确率",
      "bigQuestionTarget": "攻克微分方程与多元函数几何应用大题",
      "recommendedProblems": [
        "张宇八套卷（套卷四）全卷"
      ],
      "pitfallsToAvoid": [
        "做完后无论疲惫与否，立刻批改出分数并整理失误"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1116",
      "date": "2026-11-16",
      "dayIndex": 40,
      "subject": "cs",
      "phase": "【408真题套卷大决战】",
      "title": "408 统考真题模考第3套（2012年真题，14:00-17:00）",
      "focusArea": "全真模考 2012 年真题，检验指令格式与外部排序",
      "coreConcepts": [
        "指令编码扩展操作码",
        "双向链表/树遍历算法题"
      ],
      "mcqTarget": "选填题稳定在 65-75 分",
      "bigQuestionTarget": "大题字迹清晰，采分点明确",
      "recommendedProblems": [
        "2012年408统考真题全卷"
      ],
      "pitfallsToAvoid": [
        "严格限时，下午 17:00 准时停笔收卷"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做保持高压手感 + 每周作文动笔",
      "action": "限时 18 分钟做 1 篇真题阅读，复盘长难句与核心词汇，每周手写 2 篇大小作文",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "《肖八》选择题疯狂轮刷模式（目标平均 40+ 分）",
      "action": "每天掐表 20-30 分钟精刷一套肖八选择题，错题用荧光笔在背诵手册上狠划一道！",
      "durationMinutes": 60
    }
  },
  {
    "date": "2026-11-17",
    "formattedDate": "11月17日",
    "weekday": "周二",
    "theme": "【数二真题 Day 22】【张八（四）订正】总结压轴大题中可拿的步... · 【2012年408深度订正】吃透指令系统与磁...",
    "math2Task": {
      "id": "math2-1117",
      "date": "2026-11-17",
      "dayIndex": 41,
      "subject": "math2",
      "phase": "【第二阶段】新大纲抗压与磨合（Day 22）",
      "title": "【张八（四）订正】总结压轴大题中可拿的步骤分",
      "focusArea": "总结压轴大题中可拿的步骤分",
      "coreConcepts": [
        "【张八（四）订正】总结压轴大题中可拿的步骤分",
        "排查压轴大题中可拿的基础分（如写出定义式、列出特征方程）",
        "领悟考场“分分必争”得分策略"
      ],
      "mcqTarget": "消化选填错题，总结命题陷阱",
      "bigQuestionTarget": "整理压轴大题前 1-2 问的基础步骤分获取方法",
      "recommendedProblems": [
        "张八（四）错题与步骤复盘"
      ],
      "pitfallsToAvoid": [
        "面对难题即使做不出最终答案，前两问的定义和通式也必须写完整拿到3-5分！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1117",
      "date": "2026-11-17",
      "dayIndex": 41,
      "subject": "cs",
      "phase": "【408真题套卷大决战】",
      "title": "【2012年408深度订正】吃透指令系统与磁盘管理大题",
      "focusArea": "精研扩展操作码设计与磁盘多级索引结构",
      "coreConcepts": [
        "扩展操作码剩余状态数计算",
        "磁盘寻道时间与旋转延迟调度"
      ],
      "mcqTarget": "逐题攻克错选原因",
      "bigQuestionTarget": "独立推导指令格式位分配",
      "recommendedProblems": [
        "2012年408错题精修"
      ],
      "pitfallsToAvoid": [
        "重视磁盘组织细节，近几年依然常考"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做保持高压手感 + 每周作文动笔",
      "action": "限时 18 分钟做 1 篇真题阅读，复盘长难句与核心词汇，每周手写 2 篇大小作文",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "《肖八》选择题疯狂轮刷模式（目标平均 40+ 分）",
      "action": "每天掐表 20-30 分钟精刷一套肖八选择题，错题用荧光笔在背诵手册上狠划一道！",
      "durationMinutes": 60
    }
  },
  {
    "date": "2026-11-18",
    "formattedDate": "11月18日",
    "weekday": "周三",
    "theme": "【数二真题 Day 23】全真模考【张宇八套卷（套卷五）】（8:3... · 408 统考真题模考第4套（2013年真题，...",
    "math2Task": {
      "id": "math2-1118",
      "date": "2026-11-18",
      "dayIndex": 42,
      "subject": "math2",
      "phase": "【第二阶段】新大纲抗压与磨合（Day 23）",
      "title": "全真模考【张宇八套卷（套卷五）】（8:30—11:30）",
      "focusArea": "全真模考张宇八套卷（套卷五）（8:30—11:30）",
      "coreConcepts": [
        "全真模考【张宇八套卷（套卷五）】（8:30—11:30）",
        "完成第 5 套张八实战模考",
        "检验高难度模拟训练后的心理韧性"
      ],
      "mcqTarget": "客观题发挥平稳，心态冷静沉着",
      "bigQuestionTarget": "大题尽可能完整作答",
      "recommendedProblems": [
        "张宇八套卷（套卷五）全卷"
      ],
      "pitfallsToAvoid": [
        "张八做到第5套即可达到模拟练兵目的，后续重点精炼通法"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1118",
      "date": "2026-11-18",
      "dayIndex": 42,
      "subject": "cs",
      "phase": "【408真题套卷大决战】",
      "title": "408 统考真题模考第4套（2013年真题，14:00-17:00）",
      "focusArea": "全真模考 2013 年真题，重点检验 CPU 数据通路与控制信号",
      "coreConcepts": [
        "单周期数据通路控制信号",
        "二叉树带权路径长度WPL算法"
      ],
      "mcqTarget": "客观题提高排他法做题速度",
      "bigQuestionTarget": "攻克数据通路连线与控制信号真题",
      "recommendedProblems": [
        "2013年408统考真题全卷"
      ],
      "pitfallsToAvoid": [
        "数据通路题图大不要怕，顺着微操作执行顺序看图"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做保持高压手感 + 每周作文动笔",
      "action": "限时 18 分钟做 1 篇真题阅读，复盘长难句与核心词汇，每周手写 2 篇大小作文",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "《肖八》选择题疯狂轮刷模式（目标平均 40+ 分）",
      "action": "每天掐表 20-30 分钟精刷一套肖八选择题，错题用荧光笔在背诵手册上狠划一道！",
      "durationMinutes": 60
    }
  },
  {
    "date": "2026-11-19",
    "formattedDate": "11月19日",
    "weekday": "周四",
    "theme": "【数二真题 Day 24】【张八（五）订正】完成张八精选套卷收官复... · 【2013年408深度订正】打通数据通路与微...",
    "math2Task": {
      "id": "math2-1119",
      "date": "2026-11-19",
      "dayIndex": 43,
      "subject": "math2",
      "phase": "【第二阶段】新大纲抗压与磨合（Day 24）",
      "title": "【张八（五）订正】完成张八精选套卷收官复盘",
      "focusArea": "完成张八精选套卷收官复盘",
      "coreConcepts": [
        "【张八（五）订正】完成张八精选套卷收官复盘",
        "全面订正张八（五）错题",
        "总结 5 套卷中暴露的薄弱知识板块"
      ],
      "mcqTarget": "选填题归因梳理完毕",
      "bigQuestionTarget": "独立重算解答题核心难点",
      "recommendedProblems": [
        "张八（五）订正笔记"
      ],
      "pitfallsToAvoid": [
        "张八收官后，注意力准备重回真题逻辑，校准做题手感"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1119",
      "date": "2026-11-19",
      "dayIndex": 43,
      "subject": "cs",
      "phase": "【408真题套卷大决战】",
      "title": "【2013年408深度订正】打通数据通路与微操作节拍",
      "focusArea": "精研 2013 年 CPU 数据通路大题，写出各机器周期的微操作节拍",
      "coreConcepts": [
        "取指周期、间址周期、执行周期的控制信号有效电平",
        "WPL 递归与后序遍历算法规范"
      ],
      "mcqTarget": "彻底搞透微程序控制器与硬布线区别",
      "bigQuestionTarget": "在白纸上重画数据通路信号流",
      "recommendedProblems": [
        "2013年数据通路母题精练"
      ],
      "pitfallsToAvoid": [
        "控制信号是高电平有效还是低电平，注意审清题干说明"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做保持高压手感 + 每周作文动笔",
      "action": "限时 18 分钟做 1 篇真题阅读，复盘长难句与核心词汇，每周手写 2 篇大小作文",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "《肖八》选择题疯狂轮刷模式（目标平均 40+ 分）",
      "action": "每天掐表 20-30 分钟精刷一套肖八选择题，错题用荧光笔在背诵手册上狠划一道！",
      "durationMinutes": 60
    }
  },
  {
    "date": "2026-11-20",
    "formattedDate": "11月20日",
    "weekday": "周五",
    "theme": "【数二真题 Day 25】【张八体系精炼】系统复盘 5 套张八中的... · 【408 阶段错题清扫】集中二刷 12-13...",
    "math2Task": {
      "id": "math2-1120",
      "date": "2026-11-20",
      "dayIndex": 44,
      "subject": "math2",
      "phase": "【第二阶段】新大纲抗压与磨合（Day 25）",
      "title": "【张八体系精炼】系统复盘 5 套张八中的高质量中档题与通法",
      "focusArea": "系统复盘 5 套张八中的高质量中档题与通法，剔除偏怪结论",
      "coreConcepts": [
        "【张八体系精炼】系统复盘 5 套张八中的高质量中档题与通法",
        "剔除偏怪结论",
        "提炼适用于统考真题的核心通法与思维模型"
      ],
      "mcqTarget": "整理出一份属于自己的张八高频选填通法清单",
      "bigQuestionTarget": "重温中档大题的化简技巧与答题框架",
      "recommendedProblems": [
        "张八 1-5 套精选高质量题库"
      ],
      "pitfallsToAvoid": [
        "不要回头看那些偏怪算式，只看真题中可能复现的高价值中档好题！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1120",
      "date": "2026-11-20",
      "dayIndex": 44,
      "subject": "cs",
      "phase": "【408真题套卷大决战】",
      "title": "【408 阶段错题清扫】集中二刷 12-13 年错题",
      "focusArea": "集中二刷 12-13 年错题，打通数据通路与微程序控制",
      "coreConcepts": [
        "CPU 控制器核心原理",
        "死锁银行家算法与资源图化简"
      ],
      "mcqTarget": "做透计组第5章选择题错题",
      "bigQuestionTarget": "独立默写数据通路核心控制信号表",
      "recommendedProblems": [
        "12-13年真题错题专项"
      ],
      "pitfallsToAvoid": [
        "理清每个微操作对寄存器内容的影响"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做保持高压手感 + 每周作文动笔",
      "action": "限时 18 分钟做 1 篇真题阅读，复盘长难句与核心词汇，每周手写 2 篇大小作文",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "《肖八》选择题疯狂轮刷模式（目标平均 40+ 分）",
      "action": "每天掐表 20-30 分钟精刷一套肖八选择题，错题用荧光笔在背诵手册上狠划一道！",
      "durationMinutes": 60
    }
  },
  {
    "date": "2026-11-21",
    "formattedDate": "11月21日",
    "weekday": "周六",
    "theme": "【数二真题 Day 26】全真模考【2024 年真题】（8:30—... · 408 统考真题模考第5套（2014年真题，...",
    "math2Task": {
      "id": "math2-1121",
      "date": "2026-11-21",
      "dayIndex": 45,
      "subject": "math2",
      "phase": "【第二阶段】新大纲抗压与磨合（Day 26）",
      "title": "全真模考【2024 年真题】（8:30—11:30）",
      "focusArea": "以真题校准手感，检验新大纲适应度",
      "coreConcepts": [
        "全真模考【2024 年真题】（8:30—11:30）",
        "以真题校准手感，检验新大纲适应度",
        "全面检验经过张八磨砺后的新大纲实战适应度"
      ],
      "mcqTarget": "选填题沉着冷静，严格把控在 75-80 分钟",
      "bigQuestionTarget": "高质量规范作答 2024 年全部大题",
      "recommendedProblems": [
        "2024 年数学二统考真题全卷"
      ],
      "pitfallsToAvoid": [
        "做完 2024 真题会明显感受到真题的严谨性与通法导向，建立强大信心！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1121",
      "date": "2026-11-21",
      "dayIndex": 45,
      "subject": "cs",
      "phase": "【408真题套卷大决战】",
      "title": "408 统考真题模考第5套（2014年真题，14:00-17:00）",
      "focusArea": "全真模考 2014 年真题，硬核检验独木桥 PV 与网络层路由",
      "coreConcepts": [
        "2014年经典独木桥 PV 同步互斥模型",
        "CIDR 子网划分与转发表聚合"
      ],
      "mcqTarget": "客观题把握时间节奏",
      "bigQuestionTarget": "写出标准四步 PV 伪代码",
      "recommendedProblems": [
        "2014年408统考真题全卷"
      ],
      "pitfallsToAvoid": [
        "PV 伪代码初值必须标明含义与数量"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做保持高压手感 + 每周作文动笔",
      "action": "限时 18 分钟做 1 篇真题阅读，复盘长难句与核心词汇，每周手写 2 篇大小作文",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "《肖八》选择题疯狂轮刷模式（目标平均 40+ 分）",
      "action": "每天掐表 20-30 分钟精刷一套肖八选择题，错题用荧光笔在背诵手册上狠划一道！",
      "durationMinutes": 60
    }
  },
  {
    "date": "2026-11-22",
    "formattedDate": "11月22日",
    "weekday": "周日",
    "theme": "【数二真题 Day 27】【2024 年深度订正】精研试卷命题逻辑... · 【2014年408深度订正】精研独木桥 PV...",
    "math2Task": {
      "id": "math2-1122",
      "date": "2026-11-22",
      "dayIndex": 46,
      "subject": "math2",
      "phase": "【第二阶段】新大纲抗压与磨合（Day 27）",
      "title": "【2024 年深度订正】精研试卷命题逻辑",
      "focusArea": "精研试卷命题逻辑，对比近三年（22-24）出题角度演变",
      "coreConcepts": [
        "【2024 年深度订正】精研试卷命题逻辑",
        "对比近三年（22-24）出题角度演变",
        "找出新结构下命题人最青睐的考查交汇点"
      ],
      "mcqTarget": "搞透 2024 选填每一题的背景定理与快速解法",
      "bigQuestionTarget": "对照官方评分参考规范大题采分步骤",
      "recommendedProblems": [
        "2024 年真题深度精析"
      ],
      "pitfallsToAvoid": [
        "2024年是近几年最具代表性的最新试卷，订正要精细到每一个符号和推导逻辑！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1122",
      "date": "2026-11-22",
      "dayIndex": 46,
      "subject": "cs",
      "phase": "【408真题套卷大决战】",
      "title": "【2014年408深度订正】精研独木桥 PV 与网络大题",
      "focusArea": "逐行订正独木桥 PV 操作与 IP 路由转发表构建过程",
      "coreConcepts": [
        "变种读者写者/独木桥两端通行同步机制",
        "最长前缀匹配与掩码匹配运算"
      ],
      "mcqTarget": "清扫计网与操作系统选择题盲点",
      "bigQuestionTarget": "遮住答案重写独木桥完整代码",
      "recommendedProblems": [
        "2014年PV与网络大题精析"
      ],
      "pitfallsToAvoid": [
        "PV 信号量命名必须语义清晰（如 mutex, count_east, count_west）"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做保持高压手感 + 每周作文动笔",
      "action": "限时 18 分钟做 1 篇真题阅读，复盘长难句与核心词汇，每周手写 2 篇大小作文",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "《肖八》选择题疯狂轮刷模式（目标平均 40+ 分）",
      "action": "每天掐表 20-30 分钟精刷一套肖八选择题，错题用荧光笔在背诵手册上狠划一道！",
      "durationMinutes": 60
    }
  },
  {
    "date": "2026-11-23",
    "formattedDate": "11月23日",
    "weekday": "周一",
    "theme": "【数二真题 Day 28】2024 年真题大题规范书写与错题重做... · 408 统考真题模考第6套（2016年真题，...",
    "math2Task": {
      "id": "math2-1123",
      "date": "2026-11-23",
      "dayIndex": 47,
      "subject": "math2",
      "phase": "【第二阶段】新大纲抗压与磨合（Day 28）",
      "title": "2024 年真题大题规范书写与错题重做",
      "focusArea": "检验草稿纸演算成功率",
      "coreConcepts": [
        "2024 年真题大题规范书写与错题重做",
        "检验草稿纸演算成功率",
        "演练折叠草稿纸、字迹清晰度与计算复核机制"
      ],
      "mcqTarget": "排查选填中草稿纸演算跳步导致的失误",
      "bigQuestionTarget": "在正规答题卡纸张上完整手写 6 道解答题",
      "recommendedProblems": [
        "2024 年大题与草稿纸演练"
      ],
      "pitfallsToAvoid": [
        "严禁草稿纸乱写乱画导致回看时找不到中间变量！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1123",
      "date": "2026-11-23",
      "dayIndex": 47,
      "subject": "cs",
      "phase": "【408真题套卷大决战】",
      "title": "408 统考真题模考第6套（2016年真题，14:00-17:00）",
      "focusArea": "全真模考 2016 年真题，攻克流水线冒险与冲突",
      "coreConcepts": [
        "指令流水线数据冒险、结构冒险、控制冒险",
        "快速排序划分主元思想"
      ],
      "mcqTarget": "客观题稳扎稳打",
      "bigQuestionTarget": "计算流水线吞吐率与加速比",
      "recommendedProblems": [
        "2016年408统考真题全卷"
      ],
      "pitfallsToAvoid": [
        "时钟周期计算分清插入气泡周期数"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做保持高压手感 + 每周作文动笔",
      "action": "限时 18 分钟做 1 篇真题阅读，复盘长难句与核心词汇，每周手写 2 篇大小作文",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "《肖八》选择题疯狂轮刷模式（目标平均 40+ 分）",
      "action": "每天掐表 20-30 分钟精刷一套肖八选择题，错题用荧光笔在背诵手册上狠划一道！",
      "durationMinutes": 60
    }
  },
  {
    "date": "2026-11-24",
    "formattedDate": "11月24日",
    "weekday": "周二",
    "theme": "【数二真题 Day 29】【第二阶段闭环整理】盘点 22-24 新... · 【2016年408深度订正】攻坚流水线数据冒...",
    "math2Task": {
      "id": "math2-1124",
      "date": "2026-11-24",
      "dayIndex": 48,
      "subject": "math2",
      "phase": "【第二阶段】新大纲抗压与磨合（Day 29）",
      "title": "【第二阶段闭环整理】盘点 22-24 新大纲真题错题",
      "focusArea": "盘点 22-24 新大纲真题错题，整理新题型高频题眼",
      "coreConcepts": [
        "【第二阶段闭环整理】盘点 22-24 新大纲真题错题",
        "整理新题型高频题眼",
        "第二阶段圆满闭环收官，明日正式进驻张四手感保持期"
      ],
      "mcqTarget": "近三年新大纲 48 道选填全部吃透",
      "bigQuestionTarget": "近三年新大纲 18 道大题核心采分点胸有成竹",
      "recommendedProblems": [
        "2022-2024 新大纲真题错题合集"
      ],
      "pitfallsToAvoid": [
        "新大纲真题价值连城，今天彻底扫除近三年残留的任何疑问！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1124",
      "date": "2026-11-24",
      "dayIndex": 48,
      "subject": "cs",
      "phase": "【408真题套卷大决战】",
      "title": "【2016年408深度订正】攻坚流水线数据冒险与时钟计算",
      "focusArea": "精研指令流水线阻塞与转发技术（Forwarding）",
      "coreConcepts": [
        "硬件阻塞、软件插入 NOP 与数据旁路转发",
        "数组主元素统计高效算法"
      ],
      "mcqTarget": "搞透计组流水线选择题",
      "bigQuestionTarget": "画出指令流水线时空图与甘特图",
      "recommendedProblems": [
        "2016年流水线真题深度订正"
      ],
      "pitfallsToAvoid": [
        "注意分支预测失败引起的清空流水线惩罚周期"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做保持高压手感 + 每周作文动笔",
      "action": "限时 18 分钟做 1 篇真题阅读，复盘长难句与核心词汇，每周手写 2 篇大小作文",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "《肖八》选择题疯狂轮刷模式（目标平均 40+ 分）",
      "action": "每天掐表 20-30 分钟精刷一套肖八选择题，错题用荧光笔在背诵手册上狠划一道！",
      "durationMinutes": 60
    }
  },
  {
    "date": "2026-11-25",
    "formattedDate": "11月25日",
    "weekday": "周三",
    "theme": "【数二真题 Day 30】全面梳理 2024 年真题与前期核心错题... · 【408 阶段错题清扫】集中二刷 14-16...",
    "math2Task": {
      "id": "math2-1125",
      "date": "2026-11-25",
      "dayIndex": 49,
      "subject": "math2",
      "phase": "【第三阶段】张四手感保持（Day 30）",
      "title": "全面梳理 2024 年真题与前期核心错题",
      "focusArea": "全面梳理 2024 年真题与前期核心错题，巩固新大纲客观题解题节奏",
      "coreConcepts": [
        "全面梳理 2024 年真题与前期核心错题",
        "巩固新大纲客观题解题节奏",
        "调整身心，迎接张宇四套卷冲刺模考"
      ],
      "mcqTarget": "温习常用极值代换与泰勒公式展开技巧",
      "bigQuestionTarget": "回顾高数微分方程求解与二重积分计算范式",
      "recommendedProblems": [
        "前期精编核心错题清单"
      ],
      "pitfallsToAvoid": [
        "今日以稳心态、查漏补缺为主，不贪难，不慌乱"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1125",
      "date": "2026-11-25",
      "dayIndex": 49,
      "subject": "cs",
      "phase": "【408真题套卷大决战】",
      "title": "【408 阶段错题清扫】集中二刷 14-16 年真题错题",
      "focusArea": "集中二刷 14-16 年真题错题，总结 PV 操作与流水线通法",
      "coreConcepts": [
        "PV 操作模型标准化四步套路",
        "指令流水线时空图解法"
      ],
      "mcqTarget": "清扫近几套真题的全部错选记录",
      "bigQuestionTarget": "独立完成流水线与PV大题重做",
      "recommendedProblems": [
        "14-16年错题归纳本"
      ],
      "pitfallsToAvoid": [
        "错题不仅要知道正确答案，还要知道错误选项错在何处"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做保持高压手感 + 每周作文动笔",
      "action": "限时 18 分钟做 1 篇真题阅读，复盘长难句与核心词汇，每周手写 2 篇大小作文",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "《肖八》选择题疯狂轮刷模式（目标平均 40+ 分）",
      "action": "每天掐表 20-30 分钟精刷一套肖八选择题，错题用荧光笔在背诵手册上狠划一道！",
      "durationMinutes": 60
    }
  },
  {
    "date": "2026-11-26",
    "formattedDate": "11月26日",
    "weekday": "周四",
    "theme": "【数二真题 Day 31】全真模考【张宇四套卷（套卷一）】（8:3... · 408 统考真题模考第7套（2018年真题，...",
    "math2Task": {
      "id": "math2-1126",
      "date": "2026-11-26",
      "dayIndex": 50,
      "subject": "math2",
      "phase": "【第三阶段】张四手感保持（Day 31）",
      "title": "全真模考【张宇四套卷（套卷一）】（8:30—11:30）",
      "focusArea": "全真模考张宇四套卷（套卷一）（8:30—11:30）",
      "coreConcepts": [
        "全真模考【张宇四套卷（套卷一）】（8:30—11:30）",
        "严格按照上午 8:30—11:30 闭卷掐表",
        "保持思维敏锐度与考场应激状态"
      ],
      "mcqTarget": "选填题以稳为主，杜绝非智力失误",
      "bigQuestionTarget": "大题清晰呈现核心关键步",
      "recommendedProblems": [
        "张宇四套卷（套卷一）全卷"
      ],
      "pitfallsToAvoid": [
        "张四试卷重在保持思维活跃度，得分不是唯一标准，重在发现遗漏漏洞！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1126",
      "date": "2026-11-26",
      "dayIndex": 50,
      "subject": "cs",
      "phase": "【408真题套卷大决战】",
      "title": "408 统考真题模考第7套（2018年真题，14:00-17:00）",
      "focusArea": "全真模考 2018 年真题，极高难度抗压模考",
      "coreConcepts": [
        "2018年第44题跨学科究极联动大题",
        "图的拓扑排序与关键路径"
      ],
      "mcqTarget": "高难度卷保持客观题稳定",
      "bigQuestionTarget": "攻克 2018 年神级综合大题",
      "recommendedProblems": [
        "2018年408统考真题全卷"
      ],
      "pitfallsToAvoid": [
        "2018年题难度大，分数高低不影响备考节奏"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做保持高压手感 + 每周作文动笔",
      "action": "限时 18 分钟做 1 篇真题阅读，复盘长难句与核心词汇，每周手写 2 篇大小作文",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "《肖八》选择题疯狂轮刷模式（目标平均 40+ 分）",
      "action": "每天掐表 20-30 分钟精刷一套肖八选择题，错题用荧光笔在背诵手册上狠划一道！",
      "durationMinutes": 60
    }
  },
  {
    "date": "2026-11-27",
    "formattedDate": "11月27日",
    "weekday": "周五",
    "theme": "【数二真题 Day 32】【张四（一）订正】总结提炼常规计算题的化... · 【2018年408深度订正】精研 2018 ...",
    "math2Task": {
      "id": "math2-1127",
      "date": "2026-11-27",
      "dayIndex": 51,
      "subject": "math2",
      "phase": "【第三阶段】张四手感保持（Day 32）",
      "title": "【张四（一）订正】总结提炼常规计算题的化简技巧",
      "focusArea": "总结提炼常规计算题的化简技巧，怪题果断跳过",
      "coreConcepts": [
        "【张四（一）订正】总结提炼常规计算题的化简技巧",
        "怪题果断跳过",
        "偏怪题果断跳过，不钻牛角尖"
      ],
      "mcqTarget": "精研选填失分点，吸收有效破题思路",
      "bigQuestionTarget": "独立重算中档解答题",
      "recommendedProblems": [
        "张四（一）错题订正"
      ],
      "pitfallsToAvoid": [
        "临考冲刺阶段严禁纠结偏题怪题！时间要留给必考母题！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1127",
      "date": "2026-11-27",
      "dayIndex": 51,
      "subject": "cs",
      "phase": "【408真题套卷大决战】",
      "title": "【2018年408深度订正】精研 2018 年跨学科顶级大题",
      "focusArea": "拆解 2018 年第44题 Cache 与虚存页表顶级综合大题",
      "coreConcepts": [
        "虚拟地址 -> TLB -> 页表 -> Cache -> 主存全链路",
        "未命中处理过程与缺页中断"
      ],
      "mcqTarget": "吃透 2018 年计网与操作系统难点",
      "bigQuestionTarget": "一步不漏写出 44 题全部十六进制地址解析",
      "recommendedProblems": [
        "2018年真题精析"
      ],
      "pitfallsToAvoid": [
        "每一个位切分的含义必须清清楚楚，绝对不能靠蒙"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做保持高压手感 + 每周作文动笔",
      "action": "限时 18 分钟做 1 篇真题阅读，复盘长难句与核心词汇，每周手写 2 篇大小作文",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "《肖八》选择题疯狂轮刷模式（目标平均 40+ 分）",
      "action": "每天掐表 20-30 分钟精刷一套肖八选择题，错题用荧光笔在背诵手册上狠划一道！",
      "durationMinutes": 60
    }
  },
  {
    "date": "2026-11-28",
    "formattedDate": "11月28日",
    "weekday": "周六",
    "theme": "【数二真题 Day 33】全真模考【张宇四套卷（套卷二）】（8:3... · 408 统考真题模考第8套（2020年真题，...",
    "math2Task": {
      "id": "math2-1128",
      "date": "2026-11-28",
      "dayIndex": 52,
      "subject": "math2",
      "phase": "【第三阶段】张四手感保持（Day 33）",
      "title": "全真模考【张宇四套卷（套卷二）】（8:30—11:30）",
      "focusArea": "全真模考张宇四套卷（套卷二）（8:30—11:30）",
      "coreConcepts": [
        "全真模考【张宇四套卷（套卷二）】（8:30—11:30）",
        "保持解题手感与草稿纸规划规范",
        "客观题严格掐表，大题争取步骤分"
      ],
      "mcqTarget": "客观题细心审题，圈出关键词",
      "bigQuestionTarget": "大题按规范格式作答",
      "recommendedProblems": [
        "张宇四套卷（套卷二）全卷"
      ],
      "pitfallsToAvoid": [
        "模考时即使遇到卡壳题，深呼吸 3 次，立刻转移攻坚下一题"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1128",
      "date": "2026-11-28",
      "dayIndex": 52,
      "subject": "cs",
      "phase": "【408真题套卷大决战】",
      "title": "408 统考真题模考第8套（2020年真题，14:00-17:00）",
      "focusArea": "全真模考 2020 年真题，检验操作系统与网络层结合部",
      "coreConcepts": [
        "TCP 拥塞控制慢开始与拥塞避免",
        "文件多级索引与 FCB/Inode 结构"
      ],
      "mcqTarget": "选填题掐表 60 分钟",
      "bigQuestionTarget": "计算最大文件大小与拥塞窗口 cwnd 演变",
      "recommendedProblems": [
        "2020年408统考真题全卷"
      ],
      "pitfallsToAvoid": [
        "TCP 拥塞控制超时进入慢开始 vs 收到3个重复ACK进入快恢复"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做保持高压手感 + 每周作文动笔",
      "action": "限时 18 分钟做 1 篇真题阅读，复盘长难句与核心词汇，每周手写 2 篇大小作文",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "《肖八》选择题疯狂轮刷模式（目标平均 40+ 分）",
      "action": "每天掐表 20-30 分钟精刷一套肖八选择题，错题用荧光笔在背诵手册上狠划一道！",
      "durationMinutes": 60
    }
  },
  {
    "date": "2026-11-29",
    "formattedDate": "11月29日",
    "weekday": "周日",
    "theme": "【数二真题 Day 34】【张四（二）订正】重点纠正选填题粗心失误... · 【2020年408深度订正】复盘文件多级索引...",
    "math2Task": {
      "id": "math2-1129",
      "date": "2026-11-29",
      "dayIndex": 53,
      "subject": "math2",
      "phase": "【第三阶段】张四手感保持（Day 34）",
      "title": "【张四（二）订正】重点纠正选填题粗心失误",
      "focusArea": "重点纠正选填题粗心失误",
      "coreConcepts": [
        "【张四（二）订正】重点纠正选填题粗心失误",
        "建立粗心失误清单（如忘记常数C、正负号搞反、开方漏±）",
        "巩固基础定理应用条件"
      ],
      "mcqTarget": "逐一排查由于看错题、算错数造成的丢分",
      "bigQuestionTarget": "重算做错的大题核心步骤",
      "recommendedProblems": [
        "张四（二）错题笔记与粗心排查表"
      ],
      "pitfallsToAvoid": [
        "不要轻描淡写地归结为“粗心”，必须深挖草稿纸上的跳步坏习惯！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1129",
      "date": "2026-11-29",
      "dayIndex": 53,
      "subject": "cs",
      "phase": "【408真题套卷大决战】",
      "title": "【2020年408深度订正】复盘文件多级索引与磁盘调度",
      "focusArea": "精研文件多级索引分配与直接块、一级间接、二级间接容量计算",
      "coreConcepts": [
        "文件盘块索引结构计算公式",
        "TCP Reno 算法与 Tahoe 算法区别"
      ],
      "mcqTarget": "搞懂磁盘调度算法（SCAN/C-SCAN）",
      "bigQuestionTarget": "重算多级索引支持的最大文件长度",
      "recommendedProblems": [
        "2020年真题深度复盘"
      ],
      "pitfallsToAvoid": [
        "注意盘块大小与盘块号占用的字节数换算关系（如4B盘块号）"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做保持高压手感 + 每周作文动笔",
      "action": "限时 18 分钟做 1 篇真题阅读，复盘长难句与核心词汇，每周手写 2 篇大小作文",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "《肖八》选择题疯狂轮刷模式（目标平均 40+ 分）",
      "action": "每天掐表 20-30 分钟精刷一套肖八选择题，错题用荧光笔在背诵手册上狠划一道！",
      "durationMinutes": 60
    }
  },
  {
    "date": "2026-11-30",
    "formattedDate": "11月30日",
    "weekday": "周一",
    "theme": "【数二真题 Day 35】全真模考【张宇四套卷（套卷三）】（8:3... · 408 统考真题模考第9套（2022年真题，...",
    "math2Task": {
      "id": "math2-1130",
      "date": "2026-11-30",
      "dayIndex": 54,
      "subject": "math2",
      "phase": "【第三阶段】张四手感保持（Day 35）",
      "title": "全真模考【张宇四套卷（套卷三）】（8:30—11:30）",
      "focusArea": "全真模考张宇四套卷（套卷三）（8:30—11:30）",
      "coreConcepts": [
        "全真模考【张宇四套卷（套卷三）】（8:30—11:30）",
        "保持早晨 8:30 准时进入数学思维高潮",
        "强化综合题抗压韧性"
      ],
      "mcqTarget": "稳字当头，选填拿满基础分",
      "bigQuestionTarget": "大题思路清晰，过程规范",
      "recommendedProblems": [
        "张宇四套卷（套卷三）全卷"
      ],
      "pitfallsToAvoid": [
        "11月最后一天，战意拉满，稳步进入12月最终决战月！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1130",
      "date": "2026-11-30",
      "dayIndex": 54,
      "subject": "cs",
      "phase": "【408真题套卷大决战】",
      "title": "408 统考真题模考第9套（2022年真题，14:00-17:00）",
      "focusArea": "全真模考 2022 年统考真题，感受最新考纲综合风格",
      "coreConcepts": [
        "2022年 408 最新风格演变",
        "协议交互全链路与系统调用层级"
      ],
      "mcqTarget": "选填题争取 75 分以上",
      "bigQuestionTarget": "解答题书写工整严谨",
      "recommendedProblems": [
        "2022年408统考真题全卷"
      ],
      "pitfallsToAvoid": [
        "综合题多写采分关键词，踩点拿分"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "传统阅读精做保持高压手感 + 每周作文动笔",
      "action": "限时 18 分钟做 1 篇真题阅读，复盘长难句与核心词汇，每周手写 2 篇大小作文",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "《肖八》选择题疯狂轮刷模式（目标平均 40+ 分）",
      "action": "每天掐表 20-30 分钟精刷一套肖八选择题，错题用荧光笔在背诵手册上狠划一道！",
      "durationMinutes": 60
    }
  },
  {
    "date": "2026-12-01",
    "formattedDate": "12月1日",
    "weekday": "周二",
    "theme": "【数二真题 Day 36】【张四（三）订正】独立重做失分题，记录答... · 【2022年408深度订正】吃透网络层与传输...",
    "math2Task": {
      "id": "math2-1201",
      "date": "2026-12-01",
      "dayIndex": 55,
      "subject": "math2",
      "phase": "【第三阶段】张四手感保持（Day 36）",
      "title": "【张四（三）订正】独立重做失分题，记录答题卡书写不规范处",
      "focusArea": "独立重做失分题，记录答题卡书写不规范处",
      "coreConcepts": [
        "【张四（三）订正】独立重做失分题",
        "记录答题卡书写不规范处",
        "形成严谨的答卷表达习惯"
      ],
      "mcqTarget": "消化错题，加固概念底座",
      "bigQuestionTarget": "在规定答题区域内工整书写解答过程",
      "recommendedProblems": [
        "张四（三）订正与答题卡规范练习"
      ],
      "pitfallsToAvoid": [
        "进入12月，答题卡书写版面至关重要，不能有任何涂改混乱！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1201",
      "date": "2026-12-01",
      "dayIndex": 55,
      "subject": "cs",
      "phase": "【408母题专题与封箱】",
      "title": "【2022年408深度订正】吃透网络层与传输层协议综合大题",
      "focusArea": "精研 2022 年真题各科大题，梳理最新命题逻辑",
      "coreConcepts": [
        "网络层路由选择与 NAT/DHCP 协同",
        "算法题空间优化与双指针设计"
      ],
      "mcqTarget": "清理 2022 年选择题错因",
      "bigQuestionTarget": "独立写出 2022 年 5 道大题完整步骤",
      "recommendedProblems": [
        "2022年408订正笔记"
      ],
      "pitfallsToAvoid": [
        "订正时把涉及的协议层次在草稿纸上顺一遍"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "英语考场全真模拟（14:00-17:00 掐表）与专属作文定型",
      "action": "全真模拟近三年真题套卷，打磨新题型/翻译与大小作文时间分配",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "《肖四》到手！每天 1.5-2 小时疯狂背诵肖四全部主观大题！",
      "action": "火力全开疯狂背诵肖四马原哲学原理框架、新思想提纲、史纲重大意义与时政",
      "durationMinutes": 80
    }
  },
  {
    "date": "2026-12-02",
    "formattedDate": "12月2日",
    "weekday": "周三",
    "theme": "【数二真题 Day 37】全真模考【张宇四套卷（套卷四）】（8:3... · 408 统考真题模考第10套（2023年真题...",
    "math2Task": {
      "id": "math2-1202",
      "date": "2026-12-02",
      "dayIndex": 56,
      "subject": "math2",
      "phase": "【第三阶段】张四手感保持（Day 37）",
      "title": "全真模考【张宇四套卷（套卷四）】（8:30—11:30）",
      "focusArea": "全真模考【张宇四套卷（套卷四）】（8:30—11:30，或根据精力选作高频板块大题）",
      "coreConcepts": [
        "全真模考【张宇四套卷（套卷四）】（8:30—11:30）",
        "或根据精力选作高频板块大题",
        "保持手指灵活与脑力热度"
      ],
      "mcqTarget": "客观题完成整套演练",
      "bigQuestionTarget": "主攻高频常考板块解答题",
      "recommendedProblems": [
        "张宇四套卷（套卷四）"
      ],
      "pitfallsToAvoid": [
        "最后一套模拟卷，不必强求全卷满分，重点在保持实战兴奋感"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1202",
      "date": "2026-12-02",
      "dayIndex": 56,
      "subject": "cs",
      "phase": "【408母题专题与封箱】",
      "title": "408 统考真题模考第10套（2023年真题，14:00-17:00）",
      "focusArea": "全真模考 2023 年统考真题，高强度实战练兵",
      "coreConcepts": [
        "2023年真题全真模拟",
        "考查对计算机系统微观细节的透彻理解"
      ],
      "mcqTarget": "选填题控制在 65 分钟内",
      "bigQuestionTarget": "完成大题解答，标记卡壳环节",
      "recommendedProblems": [
        "2023年408统考真题全卷"
      ],
      "pitfallsToAvoid": [
        "做完立即对答案，核对大题采分点"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "英语考场全真模拟（14:00-17:00 掐表）与专属作文定型",
      "action": "全真模拟近三年真题套卷，打磨新题型/翻译与大小作文时间分配",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "《肖四》到手！每天 1.5-2 小时疯狂背诵肖四全部主观大题！",
      "action": "火力全开疯狂背诵肖四马原哲学原理框架、新思想提纲、史纲重大意义与时政",
      "durationMinutes": 80
    }
  },
  {
    "date": "2026-12-03",
    "formattedDate": "12月3日",
    "weekday": "周四",
    "theme": "【数二真题 Day 38】【张四（四）订正】完成全部模拟卷收尾工作... · 【2023年408深度订正】总结近几年命题创...",
    "math2Task": {
      "id": "math2-1203",
      "date": "2026-12-03",
      "dayIndex": 57,
      "subject": "math2",
      "phase": "【第三阶段】张四手感保持（Day 38）",
      "title": "【张四（四）订正】完成全部模拟卷收尾工作",
      "focusArea": "完成全部模拟卷收尾工作",
      "coreConcepts": [
        "【张四（四）订正】完成全部模拟卷收尾工作",
        "订正张四（四）所有可消化的错题",
        "宣告全部模拟卷实战练兵正式收尾！"
      ],
      "mcqTarget": "收纳高频易错选填题",
      "bigQuestionTarget": "弄清典型大题得分点",
      "recommendedProblems": [
        "张四（四）收尾订正"
      ],
      "pitfallsToAvoid": [
        "从明天开始不再做整套新模拟卷，全面进入错题回炉与专题巩固！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1203",
      "date": "2026-12-03",
      "dayIndex": 57,
      "subject": "cs",
      "phase": "【408母题专题与封箱】",
      "title": "【2023年408深度订正】总结近几年命题创新点与代码题规范",
      "focusArea": "精研 2023 年真题大题，规范数据结构代码书写",
      "coreConcepts": [
        "算法题时间复杂度与空间复杂度规范表述",
        "现代硬件架构考点（总线与DMA传输）"
      ],
      "mcqTarget": "做透 2023 年客观题细节",
      "bigQuestionTarget": "在白纸上手写 C 语言算法函数并计算复杂度",
      "recommendedProblems": [
        "2023年408深度订正"
      ],
      "pitfallsToAvoid": [
        "算法题必须写出【算法基本思想】与【时间/空间复杂度】各占几分！"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "英语考场全真模拟（14:00-17:00 掐表）与专属作文定型",
      "action": "全真模拟近三年真题套卷，打磨新题型/翻译与大小作文时间分配",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "《肖四》到手！每天 1.5-2 小时疯狂背诵肖四全部主观大题！",
      "action": "火力全开疯狂背诵肖四马原哲学原理框架、新思想提纲、史纲重大意义与时政",
      "durationMinutes": 80
    }
  },
  {
    "date": "2026-12-04",
    "formattedDate": "12月4日",
    "weekday": "周五",
    "theme": "【数二真题 Day 39】【张四错题集中二刷】只做张四中做错的常规... · 408 统考真题模考第11套（2024年真题...",
    "math2Task": {
      "id": "math2-1204",
      "date": "2026-12-04",
      "dayIndex": 58,
      "subject": "math2",
      "phase": "【第三阶段】张四手感保持（Day 39）",
      "title": "【张四错题集中二刷】只做张四中做错的常规中档题",
      "focusArea": "只做张四中做错的常规中档题，巩固正确思路",
      "coreConcepts": [
        "【张四错题集中二刷】只做张四中做错的常规中档题",
        "巩固正确思路",
        "彻底剔除生僻怪偏题"
      ],
      "mcqTarget": "张四经典选填错题全部亲手独立重算一遍",
      "bigQuestionTarget": "中档大题按部就班规范书写",
      "recommendedProblems": [
        "张四 1-4 套常规错题集"
      ],
      "pitfallsToAvoid": [
        "不看答案、不翻讲义，独立写出正确解答才算二刷过关！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1204",
      "date": "2026-12-04",
      "dayIndex": 58,
      "subject": "cs",
      "phase": "【408母题专题与封箱】",
      "title": "408 统考真题模考第11套（2024年真题大收官模考，14:00-17:00）",
      "focusArea": "2024年最新真题全真模拟，真题套卷大决战收官之作！",
      "coreConcepts": [
        "全真模拟 2024 年统考真题",
        "检验 408 知识体系最终成型度"
      ],
      "mcqTarget": "展现 408 客观题最高水平",
      "bigQuestionTarget": "全卷解答题高质量作答",
      "recommendedProblems": [
        "2024年408统考真题全卷"
      ],
      "pitfallsToAvoid": [
        "考完真题套卷全部收官，准备进入四大母题终极封箱阶段！"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "英语考场全真模拟（14:00-17:00 掐表）与专属作文定型",
      "action": "全真模拟近三年真题套卷，打磨新题型/翻译与大小作文时间分配",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "《肖四》到手！每天 1.5-2 小时疯狂背诵肖四全部主观大题！",
      "action": "火力全开疯狂背诵肖四马原哲学原理框架、新思想提纲、史纲重大意义与时政",
      "durationMinutes": 80
    }
  },
  {
    "date": "2026-12-05",
    "formattedDate": "12月5日",
    "weekday": "周六",
    "theme": "【数二真题 Day 40】高数常考大题专题回炉（微分方程应用、二重... · 【2024年408深度订正】全卷精细复盘，对...",
    "math2Task": {
      "id": "math2-1205",
      "date": "2026-12-05",
      "dayIndex": 59,
      "subject": "math2",
      "phase": "【第三阶段】张四手感保持（Day 40）",
      "title": "高数常考大题专题回炉（微分方程应用、二重积分计算、多元极值与最值）",
      "focusArea": "微分方程应用、二重积分计算、多元极值与最值",
      "coreConcepts": [
        "高数常考大题专题回炉：\n- 微分方程应用\n- 二重积分计算\n- 多元极值与最值",
        "拉格朗日乘数法构造与边界极值",
        "物理应用微元法方程列写"
      ],
      "mcqTarget": "快速过一遍高数核心选择题反例",
      "bigQuestionTarget": "每个专题亲手算 2 道经典大题到底",
      "recommendedProblems": [
        "高数三大专题经典大题母题"
      ],
      "pitfallsToAvoid": [
        "这三大专题是大题送分金牌，必须保证一分不丢！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1205",
      "date": "2026-12-05",
      "dayIndex": 59,
      "subject": "cs",
      "phase": "【408母题专题与封箱】",
      "title": "【2024年408深度订正】全卷精细复盘，对比近3年命题趋势演变",
      "focusArea": "逐题精析 2024 年真题，总结近三年出题风向",
      "coreConcepts": [
        "2024年试题深度精析",
        "提炼最新 408 高频命题考点"
      ],
      "mcqTarget": "2024年客观题无盲点",
      "bigQuestionTarget": "大题逐题对照标准答案优化解答格式",
      "recommendedProblems": [
        "2024年真题订正档案"
      ],
      "pitfallsToAvoid": [
        "最新真题代表考场真实难度，认真对待每一个扣分点"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "英语考场全真模拟（14:00-17:00 掐表）与专属作文定型",
      "action": "全真模拟近三年真题套卷，打磨新题型/翻译与大小作文时间分配",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "《肖四》到手！每天 1.5-2 小时疯狂背诵肖四全部主观大题！",
      "action": "火力全开疯狂背诵肖四马原哲学原理框架、新思想提纲、史纲重大意义与时政",
      "durationMinutes": 80
    }
  },
  {
    "date": "2026-12-06",
    "formattedDate": "12月6日",
    "weekday": "周日",
    "theme": "【数二真题 Day 41】线代常考大题专题回炉（含参数线性方程组解... · 【408 四大母题专题一】Cache 容量与...",
    "math2Task": {
      "id": "math2-1206",
      "date": "2026-12-06",
      "dayIndex": 60,
      "subject": "math2",
      "phase": "【第三阶段】张四手感保持（Day 41）",
      "title": "线代常考大题专题回炉（含参数线性方程组解的讨论、相似对角化、二次型化标准形）",
      "focusArea": "含参数线性方程组解的讨论、相似对角化、二次型化标准形",
      "coreConcepts": [
        "线代常考大题专题回炉：\n- 含参数线性方程组解的讨论\n- 相似对角化\n- 二次型化标准形",
        "实对称矩阵正交相似对角化规范四步",
        "正定二次型判据与合同相似联系"
      ],
      "mcqTarget": "背熟矩阵秩的不等式与伴随矩阵公式",
      "bigQuestionTarget": "规范书写正交变换法四步（求特征值->特征向量->正交化->单位化）",
      "recommendedProblems": [
        "线代三大专题经典真题大题"
      ],
      "pitfallsToAvoid": [
        "施密特正交化极易算错分母分子，务必在草稿纸上规范演算核验！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1206",
      "date": "2026-12-06",
      "dayIndex": 60,
      "subject": "cs",
      "phase": "【408母题专题与封箱】",
      "title": "【408 四大母题专题一】Cache 容量与虚存 TLB-Page-Cache 全链路",
      "focusArea": "专项焊死 Cache×虚存地址翻译综合母题",
      "coreConcepts": [
        "Cache 总容量计算（标记Tag + 有效位 + 脏位 + 替换位）",
        "虚实地址转换与命中判定大题标准模板"
      ],
      "mcqTarget": "过一遍 Cache 映射方式选择题",
      "bigQuestionTarget": "亲手算 2 道顶级 Cache×虚存大题",
      "recommendedProblems": [
        "Cache×虚存历年真题大题合集"
      ],
      "pitfallsToAvoid": [
        "总容量与数据容量千万区分！Tag位长度等于主存地址长减组号减块内地址！"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "英语考场全真模拟（14:00-17:00 掐表）与专属作文定型",
      "action": "全真模拟近三年真题套卷，打磨新题型/翻译与大小作文时间分配",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "《肖四》到手！每天 1.5-2 小时疯狂背诵肖四全部主观大题！",
      "action": "火力全开疯狂背诵肖四马原哲学原理框架、新思想提纲、史纲重大意义与时政",
      "durationMinutes": 80
    }
  },
  {
    "date": "2026-12-07",
    "formattedDate": "12月7日",
    "weekday": "周一",
    "theme": "【数二真题 Day 42】历年真题选填易混概念与反例清单专项复习... · 【408 四大母题专题二】CPU 数据通路与...",
    "math2Task": {
      "id": "math2-1207",
      "date": "2026-12-07",
      "dayIndex": 61,
      "subject": "math2",
      "phase": "【第三阶段】张四手感保持（Day 42）",
      "title": "历年真题选填易混概念与反例清单专项复习",
      "focusArea": "历年真题选填易混概念与反例清单专项复习",
      "coreConcepts": [
        "历年真题选填易混概念与反例清单专项复习",
        "连续、可导、偏导存在、可微四者关系图",
        "极值点与驻点区别（极值点偏导可能不存在）"
      ],
      "mcqTarget": "背诵选填经典反例（如Dirichlet函数、f(x,y)=xy/(x^2+y^2)等）",
      "bigQuestionTarget": "无大题，专注清扫客观题盲区",
      "recommendedProblems": [
        "真题客观题概念辨析题清单"
      ],
      "pitfallsToAvoid": [
        "选填概念题切忌靠直觉瞎猜，心中必须有明确反例或定理充要条件支撑！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1207",
      "date": "2026-12-07",
      "dayIndex": 61,
      "subject": "cs",
      "phase": "【408母题专题与封箱】",
      "title": "【408 四大母题专题二】CPU 数据通路与流水线控制信号",
      "focusArea": "专项焊死单周期/多周期 CPU 数据通路与控制信号母题",
      "coreConcepts": [
        "微操作控制信号表构建",
        "流水线冒险（RAW/WAR/WAW）解决机制"
      ],
      "mcqTarget": "过一遍数据通路核心选择题",
      "bigQuestionTarget": "在白纸上重写数据通路大题微操作序列",
      "recommendedProblems": [
        "CPU数据通路真题大题合集"
      ],
      "pitfallsToAvoid": [
        "按阶段（IF/ID/EX/MEM/WB）逐步列写信号，不要跳步"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "英语考场全真模拟（14:00-17:00 掐表）与专属作文定型",
      "action": "全真模拟近三年真题套卷，打磨新题型/翻译与大小作文时间分配",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "《肖四》到手！每天 1.5-2 小时疯狂背诵肖四全部主观大题！",
      "action": "火力全开疯狂背诵肖四马原哲学原理框架、新思想提纲、史纲重大意义与时政",
      "durationMinutes": 80
    }
  },
  {
    "date": "2026-12-08",
    "formattedDate": "12月8日",
    "weekday": "周二",
    "theme": "【数二真题 Day 43】模考前状态调试，做几道基础计算题保持手指... · 【408 四大母题专题三】经典 PV 操作四...",
    "math2Task": {
      "id": "math2-1208",
      "date": "2026-12-08",
      "dayIndex": 62,
      "subject": "math2",
      "phase": "【第三阶段】张四手感保持（Day 43）",
      "title": "模考前状态调试，做几道基础计算题保持手指灵活度",
      "focusArea": "模考前状态调试，做几道基础计算题保持手指灵活度",
      "coreConcepts": [
        "模考前状态调试，做几道基础计算题保持手指灵活度",
        "做 3-5 道基础常规求导、求极限、求不定积分题，保持手感与书写流畅",
        "准备好明日终极封箱模考所用的答题卡、草稿纸与黑色签字笔"
      ],
      "mcqTarget": "做 5 道常规基础选填热身",
      "bigQuestionTarget": "做 1 道二重积分基础大题找手感",
      "recommendedProblems": [
        "精选基础常规计算 5 题"
      ],
      "pitfallsToAvoid": [
        "早点休息，保证明晨 8:30 终极全真模考精力充沛！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1208",
      "date": "2026-12-08",
      "dayIndex": 62,
      "subject": "cs",
      "phase": "【408母题专题与封箱】",
      "title": "【408 四大母题专题三】经典 PV 操作四大基石模型闭卷默写",
      "focusArea": "专项焊死 PV 操作 8-10 分必考大题，掌握四步解题法",
      "coreConcepts": [
        "生产者-消费者模型",
        "读者-写者模型（读写优先）",
        "哲学家进餐防死锁",
        "吸烟者多生产者模型"
      ],
      "mcqTarget": "过一遍进程同步死锁选择题",
      "bigQuestionTarget": "闭卷默写 4 个经典 PV 伪代码模板",
      "recommendedProblems": [
        "经典 PV 伪代码模板清单"
      ],
      "pitfallsToAvoid": [
        "信号量初值必须标明！P操作先同步后互斥，V操作顺序任意！"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "英语考场全真模拟（14:00-17:00 掐表）与专属作文定型",
      "action": "全真模拟近三年真题套卷，打磨新题型/翻译与大小作文时间分配",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "《肖四》到手！每天 1.5-2 小时疯狂背诵肖四全部主观大题！",
      "action": "火力全开疯狂背诵肖四马原哲学原理框架、新思想提纲、史纲重大意义与时政",
      "durationMinutes": 80
    }
  },
  {
    "date": "2026-12-09",
    "formattedDate": "12月9日",
    "weekday": "周三",
    "theme": "【数二真题 Day 44】终极全真模考【2026 年真题】（上午 ... · 【408 终极封箱模考】2026 高质量样卷...",
    "math2Task": {
      "id": "math2-1209",
      "date": "2026-12-09",
      "dayIndex": 63,
      "subject": "math2",
      "phase": "【第三阶段】封箱终极实战（Day 44，考前第10天）",
      "title": "终极全真模考【2026 年真题】（上午 8:30—11:30，全封闭模拟）",
      "focusArea": "全封闭模拟，使用答题卡与草稿纸，检验整套答题节奏与取舍决断",
      "coreConcepts": [
        "终极全真模考【2026 年真题】（上午 8:30—11:30）",
        "全封闭模拟，使用答题卡与草稿纸",
        "检验整套答题节奏与取舍决断"
      ],
      "mcqTarget": "客观题控制在 75-80 分钟内完成，杜绝非智力失分",
      "bigQuestionTarget": "在规定时间内完整书写解答题，展示最巅峰答卷水准",
      "recommendedProblems": [
        "2026 年数学二真题全卷（封箱试卷）"
      ],
      "pitfallsToAvoid": [
        "这是考前最后一次成套模考！无论遇到什么情况都以真实考场态度面对，做完立刻对答案！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1209",
      "date": "2026-12-09",
      "dayIndex": 63,
      "subject": "cs",
      "phase": "【408母题专题与封箱】",
      "title": "【408 终极封箱模考】2026 高质量样卷/综合卷全真模考（14:00-17:00）",
      "focusArea": "严格闭卷掐表 3 小时，检验整套 408 答题节奏与草稿纸规划",
      "coreConcepts": [
        "408 终极全封闭模拟考场",
        "客观题控制在 65-70 分钟",
        "大题合理分配时间，杜绝空题"
      ],
      "mcqTarget": "客观题细心审题，稳拿高分",
      "bigQuestionTarget": "大题按采分点答题，格式规范",
      "recommendedProblems": [
        "408 终极全真综合封箱卷"
      ],
      "pitfallsToAvoid": [
        "最后一次成套模考，考场心态平静如水，做完立刻对答案！"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "英语考场全真模拟（14:00-17:00 掐表）与专属作文定型",
      "action": "全真模拟近三年真题套卷，打磨新题型/翻译与大小作文时间分配",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "《肖四》到手！每天 1.5-2 小时疯狂背诵肖四全部主观大题！",
      "action": "火力全开疯狂背诵肖四马原哲学原理框架、新思想提纲、史纲重大意义与时政",
      "durationMinutes": 80
    }
  },
  {
    "date": "2026-12-10",
    "formattedDate": "12月10日",
    "weekday": "周四",
    "theme": "【数二真题 Day 45】【2026 年真题深度精析】全卷逐题精细... · 【408 终极封箱精析】全卷逐题分析失分原因...",
    "math2Task": {
      "id": "math2-1210",
      "date": "2026-12-10",
      "dayIndex": 64,
      "subject": "math2",
      "phase": "【第三阶段】封箱终极实战（Day 45，考前第9天）",
      "title": "【2026 年真题深度精析】全卷逐题精细订正",
      "focusArea": "全卷逐题精细订正，逐字逐句分析失分原因",
      "coreConcepts": [
        "【2026 年真题深度精析】全卷逐题精细订正",
        "逐字逐句分析失分原因",
        "提炼考场应试心理感悟"
      ],
      "mcqTarget": "16 道选填逐题复盘，总结最后一组题眼",
      "bigQuestionTarget": "6 道大题对照评分标准逐步推敲步骤分",
      "recommendedProblems": [
        "2026 年真题深度订正笔记"
      ],
      "pitfallsToAvoid": [
        "细致剖析每一个失分点，这正是考前涨分的最后黄金窗口！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1210",
      "date": "2026-12-10",
      "dayIndex": 64,
      "subject": "cs",
      "phase": "【408母题专题与封箱】",
      "title": "【408 终极封箱精析】全卷逐题分析失分原因，核对各科采分标准",
      "focusArea": "逐题精析封箱卷，扫清最后一处概念死角",
      "coreConcepts": [
        "408 封箱卷精细订正",
        "四门科目最后查漏补缺"
      ],
      "mcqTarget": "确保错题涉及的定理定理全部吃透",
      "bigQuestionTarget": "大题优化表达，避免语焉不详扣分",
      "recommendedProblems": [
        "408 终极封箱订正笔记"
      ],
      "pitfallsToAvoid": [
        "最后几天不再做整套新题，全面回归错题本与知识树"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "英语考场全真模拟（14:00-17:00 掐表）与专属作文定型",
      "action": "全真模拟近三年真题套卷，打磨新题型/翻译与大小作文时间分配",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "《肖四》到手！每天 1.5-2 小时疯狂背诵肖四全部主观大题！",
      "action": "火力全开疯狂背诵肖四马原哲学原理框架、新思想提纲、史纲重大意义与时政",
      "durationMinutes": 80
    }
  },
  {
    "date": "2026-12-11",
    "formattedDate": "12月11日",
    "weekday": "周五",
    "theme": "【数二真题 Day 46】2026 年真题所有错题遮住答案独立写出... · 【408 错题二刷封箱】所有错题遮住答案独立...",
    "math2Task": {
      "id": "math2-1211",
      "date": "2026-12-11",
      "dayIndex": 65,
      "subject": "math2",
      "phase": "【第三阶段】封箱终极实战（Day 46，考前第8天）",
      "title": "2026 年真题所有错题遮住答案独立写出完整过程，完成终极封箱",
      "focusArea": "所有错题遮住答案独立写出完整过程，完成终极封箱",
      "coreConcepts": [
        "2026 年真题所有错题遮住答案独立写出完整过程",
        "完成终极封箱",
        "宣告数学做新卷阶段全部结束，明日起停卷固本！"
      ],
      "mcqTarget": "全部错题在白纸上重算得出正确答案",
      "bigQuestionTarget": "解答题步骤书写行云流水，无懈可击",
      "recommendedProblems": [
        "2026 年真题终极封箱档案"
      ],
      "pitfallsToAvoid": [
        "完成封箱！自此之后数学不再做任何新题，将注意力完全转入错题本与公式！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1211",
      "date": "2026-12-11",
      "dayIndex": 65,
      "subject": "cs",
      "phase": "【408母题专题与封箱】",
      "title": "【408 错题二刷封箱】所有错题遮住答案独立写出采分点，完成终极封箱",
      "focusArea": "完成 408 错题二刷封箱，明日正式进入停卷固本阶段",
      "coreConcepts": [
        "408 错题终极二刷清零",
        "宣告 408 做题阶段全部结束！"
      ],
      "mcqTarget": "经典易错选择题秒出答案",
      "bigQuestionTarget": "大题核心步骤胸有成竹",
      "recommendedProblems": [
        "408 错题终极封箱档案"
      ],
      "pitfallsToAvoid": [
        "完成封箱！自此之后 408 不再做任何新题，将注意力完全转入脑海过电影与核心概念！"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "英语考场全真模拟（14:00-17:00 掐表）与专属作文定型",
      "action": "全真模拟近三年真题套卷，打磨新题型/翻译与大小作文时间分配",
      "durationMinutes": 70
    },
    "politicsTask": {
      "title": "《肖四》到手！每天 1.5-2 小时疯狂背诵肖四全部主观大题！",
      "action": "火力全开疯狂背诵肖四马原哲学原理框架、新思想提纲、史纲重大意义与时政",
      "durationMinutes": 80
    }
  },
  {
    "date": "2026-12-12",
    "formattedDate": "12月12日",
    "weekday": "周六",
    "theme": "【数二真题 Day 47】彻底停做任何新题。集中重刷 2016、2... · 【408 停卷固本 Day 1】数据结构核心...",
    "math2Task": {
      "id": "math2-1212",
      "date": "2026-12-12",
      "dayIndex": 66,
      "subject": "math2",
      "phase": "【第三阶段】停卷固本与公式回归（Day 47，考前第7天）",
      "title": "彻底停做任何新题。集中重刷 2016、2017、2018 年真题错题本",
      "focusArea": "彻底停做任何新题。集中重刷 2016、2017、2018 年真题错题本",
      "coreConcepts": [
        "彻底停做任何新题。集中重刷 2016、2017、2018 年真题错题本",
        "彻底停做任何新题！坚决执行“停卷固本”铁律",
        "重点看题目破题第一步与容易踩坑的计算细节"
      ],
      "mcqTarget": "重刷 16-18 错题选填，只看题干迅速在大脑中回忆解法",
      "bigQuestionTarget": "挑出当年最头疼的大题，在草稿纸上顺一遍核心主干",
      "recommendedProblems": [
        "2016-2018 真题错题本"
      ],
      "pitfallsToAvoid": [
        "最后7天坚决不碰新难题，越做新题越容易产生无谓的考前焦虑，死守错题本！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1212",
      "date": "2026-12-12",
      "dayIndex": 66,
      "subject": "cs",
      "phase": "【408停卷固本与脑海过电影】",
      "title": "【408 停卷固本 Day 1】数据结构核心算法思想脑海过电影",
      "focusArea": "彻底停做新题！数据结构算法思想与核心排序稳定性回归",
      "coreConcepts": [
        "八大内部排序复杂度与稳定性（快排、归并、堆排、插入、冒泡、选择、希尔、基数）",
        "二叉树遍历、线索二叉树、平衡二叉树AVL、红黑树特性",
        "图的邻接表/邻接矩阵、Dijkstra与Floyd、Prim与Kruskal"
      ],
      "mcqTarget": "过一遍数据结构核心概念表",
      "bigQuestionTarget": "在白纸上默写快排划分与二叉树后序遍历伪代码",
      "recommendedProblems": [
        "数据结构高频核心概念汇总"
      ],
      "pitfallsToAvoid": [
        "最后7天死守错题本和概念，坚决不做新难题！"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "英语大小作文终极模板背诵与考前定心",
      "action": "熟背个人专属大作文三段式与小作文各类书信告示模板，字迹工整手写一遍",
      "durationMinutes": 60
    },
    "politicsTask": {
      "title": "肖四主观题关键词提纲闭卷默写与时政最后排查",
      "action": "闭卷默写肖四全部主观大题的逻辑采分词，背诵考前时政热点清单",
      "durationMinutes": 60
    }
  },
  {
    "date": "2026-12-13",
    "formattedDate": "12月13日",
    "weekday": "周日",
    "theme": "【数二真题 Day 48】集中重刷 2020、2022、2023 ... · 【408 停卷固本 Day 2】计组核心概念...",
    "math2Task": {
      "id": "math2-1213",
      "date": "2026-12-13",
      "dayIndex": 67,
      "subject": "math2",
      "phase": "【第三阶段】停卷固本与公式回归（Day 48，考前第6天）",
      "title": "集中重刷 2020、2022、2023 年真题错题本",
      "focusArea": "集中重刷 2020、2022、2023 年真题错题本",
      "coreConcepts": [
        "集中重刷 2020、2022、2023 年真题错题本",
        "排查偶数年和极难卷中的经典题型逻辑",
        "确保做过的真题错题绝不二度犯错"
      ],
      "mcqTarget": "复盘 20/22/23 年新大纲客观题技巧",
      "bigQuestionTarget": "回顾综合大题评分步与解法突破口",
      "recommendedProblems": [
        "2020、2022、2023 真题错题本"
      ],
      "pitfallsToAvoid": [
        "重点看思路，手算关键一步，不搞题海，注重领悟"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1213",
      "date": "2026-12-13",
      "dayIndex": 67,
      "subject": "cs",
      "phase": "【408停卷固本与脑海过电影】",
      "title": "【408 停卷固本 Day 2】计组核心概念与公式闭目过电影",
      "focusArea": "计组全书核心概念与公式地毯式排查",
      "coreConcepts": [
        "IEEE 754 浮点数格式与规格化范围",
        "寻址方式（立即、直接、间接、寄存器、变址、基址、相对寻址）",
        "存储器容量扩展（位扩展/字扩展）与芯片引脚数",
        "中断处理流程（关中断->保护现场->执行服务->恢复现场->开中断）"
      ],
      "mcqTarget": "闭卷默写计组核心计算公式",
      "bigQuestionTarget": "脑海演练 CPU 数据通路执行一跳指令的全过程",
      "recommendedProblems": [
        "计组核心公式速记清单"
      ],
      "pitfallsToAvoid": [
        "概念不要死背，理解硬件线路和数据流向才能记得牢"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "英语大小作文终极模板背诵与考前定心",
      "action": "熟背个人专属大作文三段式与小作文各类书信告示模板，字迹工整手写一遍",
      "durationMinutes": 60
    },
    "politicsTask": {
      "title": "肖四主观题关键词提纲闭卷默写与时政最后排查",
      "action": "闭卷默写肖四全部主观大题的逻辑采分词，背诵考前时政热点清单",
      "durationMinutes": 60
    }
  },
  {
    "date": "2026-12-14",
    "formattedDate": "12月14日",
    "weekday": "周一",
    "theme": "【数二真题 Day 49】集中重刷 2024、2026 年真题错题... · 【408 停卷固本 Day 3】操作系统核心...",
    "math2Task": {
      "id": "math2-1214",
      "date": "2026-12-14",
      "dayIndex": 68,
      "subject": "math2",
      "phase": "【第三阶段】停卷固本与公式回归（Day 49，考前第5天）",
      "title": "集中重刷 2024、2026 年真题错题本",
      "focusArea": "集中重刷 2024、2026 年真题错题本",
      "coreConcepts": [
        "集中重刷 2024、2026 年真题错题本",
        "再次感受最新命题人命题意图与风格",
        "确认核心公式在最新考题中的呈现形式"
      ],
      "mcqTarget": "最新选填错题过电影",
      "bigQuestionTarget": "最新大题格式与采分点再确认",
      "recommendedProblems": [
        "2024、2026 真题错题本"
      ],
      "pitfallsToAvoid": [
        "最新试卷最具风向标意义，确保每一道题的思路清澈见底"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1214",
      "date": "2026-12-14",
      "dayIndex": 68,
      "subject": "cs",
      "phase": "【408停卷固本与脑海过电影】",
      "title": "【408 停卷固本 Day 3】操作系统核心概念与调度闭目过电影",
      "focusArea": "操作系统全书核心原理与机制地毯式排查",
      "coreConcepts": [
        "处理机状态切换（内核态 vs 用户态、中断与异常）",
        "进程管理（五状态图、同步互斥、死锁预防4条件与银行家算法）",
        "内存管理（分页与分段区别、请求分页页表项位、置换算法）",
        "文件与磁盘（多级索引计算、磁盘调度磁头移动道数）"
      ],
      "mcqTarget": "快速浏览操作系统选择题高频陷阱",
      "bigQuestionTarget": "在草稿纸上默写 1 个经典 PV 伪代码保持手感",
      "recommendedProblems": [
        "操作系统核心框架脑图"
      ],
      "pitfallsToAvoid": [
        "闭目过电影，遇到卡壳翻一下王道知识点汇总表格"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "英语大小作文终极模板背诵与考前定心",
      "action": "熟背个人专属大作文三段式与小作文各类书信告示模板，字迹工整手写一遍",
      "durationMinutes": 60
    },
    "politicsTask": {
      "title": "肖四主观题关键词提纲闭卷默写与时政最后排查",
      "action": "闭卷默写肖四全部主观大题的逻辑采分词，背诵考前时政热点清单",
      "durationMinutes": 60
    }
  },
  {
    "date": "2026-12-15",
    "formattedDate": "12月15日",
    "weekday": "周二",
    "theme": "【数二真题 Day 50】翻看模拟卷（张八/张四）中的高质量错题... · 【408 停卷固本 Day 4】计算机网络核...",
    "math2Task": {
      "id": "math2-1215",
      "date": "2026-12-15",
      "dayIndex": 69,
      "subject": "math2",
      "phase": "【第三阶段】停卷固本与公式回归（Day 50，考前第4天）",
      "title": "翻看模拟卷（张八/张四）中的高质量错题",
      "focusArea": "仅看题干和关键解题步骤，确认思路清晰",
      "coreConcepts": [
        "翻看模拟卷（张八/张四）中的高质量错题",
        "仅看题干和关键解题步骤，确认思路清晰",
        "偏怪难直接翻过，只抓经典通法"
      ],
      "mcqTarget": "浏览模拟卷有代表性的技巧题",
      "bigQuestionTarget": "回顾中档大题解题主干",
      "recommendedProblems": [
        "张八/张四精选错题标记"
      ],
      "pitfallsToAvoid": [
        "不要在草稿纸上死算复杂模拟题，只做思路扫描与公式印证！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1215",
      "date": "2026-12-15",
      "dayIndex": 69,
      "subject": "cs",
      "phase": "【408停卷固本与脑海过电影】",
      "title": "【408 停卷固本 Day 4】计算机网络核心协议与时延闭目过电影",
      "focusArea": "计网五层体系架构与核心协议全链路回归",
      "coreConcepts": [
        "物理层奈氏准则与香农定理计算",
        "数据链路层滑动窗口与CRC校验码计算",
        "网络层CIDR汇聚、子网划分、ARP/DHCP/ICMP",
        "传输层TCP三次握手四次挥手、拥塞控制曲线",
        "应用层DNS查询（递归vs迭代）与HTTP RTT 计算"
      ],
      "mcqTarget": "默写五层协议PDU名称与经典端口号",
      "bigQuestionTarget": "闭目演练“浏览器输入URL全流程”协议链路",
      "recommendedProblems": [
        "计算机网络核心协议时序图清单"
      ],
      "pitfallsToAvoid": [
        "计算时延注意区别发送时延与传播时延！"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "英语大小作文终极模板背诵与考前定心",
      "action": "熟背个人专属大作文三段式与小作文各类书信告示模板，字迹工整手写一遍",
      "durationMinutes": 60
    },
    "politicsTask": {
      "title": "肖四主观题关键词提纲闭卷默写与时政最后排查",
      "action": "闭卷默写肖四全部主观大题的逻辑采分词，背诵考前时政热点清单",
      "durationMinutes": 60
    }
  },
  {
    "date": "2026-12-16",
    "formattedDate": "12月16日",
    "weekday": "周三",
    "theme": "【数二真题 Day 51】高数核心公式与定理背诵... · 【408 停卷固本 Day 5】408 历年...",
    "math2Task": {
      "id": "math2-1216",
      "date": "2026-12-16",
      "dayIndex": 70,
      "subject": "math2",
      "phase": "【第三阶段】停卷固本与公式回归（Day 51，考前第3天）",
      "title": "高数核心公式与定理背诵",
      "focusArea": "麦克劳林展开、常用等价无穷小、积分公式表、物理应用微元法、曲率公式",
      "coreConcepts": [
        "高数核心公式与定理背诵：\n- 麦克劳林展开\n- 常用等价无穷小\n- 积分公式表\n- 物理应用微元法\n- 曲率公式",
        "8大常用麦克劳林展开式白纸闭卷默写",
        "曲率公式 K = |y\"| / (1+y'^2)^(3/2)"
      ],
      "mcqTarget": "闭卷默写 8 个常用泰勒展开式与等价无穷小",
      "bigQuestionTarget": "闭卷默写曲率公式与物理微元方程模型",
      "recommendedProblems": [
        "高数核心公式手册（闭卷默写版）"
      ],
      "pitfallsToAvoid": [
        "公式记错等于全盘皆输！今天必须做到白纸默写一字不差！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1216",
      "date": "2026-12-16",
      "dayIndex": 70,
      "subject": "cs",
      "phase": "【408停卷固本与脑海过电影】",
      "title": "【408 停卷固本 Day 5】408 历年真题错题本最后通扫",
      "focusArea": "快速通读 408 真题错题本，只看失误标注与采分要点",
      "coreConcepts": [
        "回顾以往模考中踩过的非智力失误陷阱",
        "确认大题标准答题模板与踩分词",
        "保持从容镇定、志在必得的心态"
      ],
      "mcqTarget": "轻翻错题本，确认无任何模糊点",
      "bigQuestionTarget": "心中演练大题书写规范",
      "recommendedProblems": [
        "408 历年真题错题全套"
      ],
      "pitfallsToAvoid": [
        "不要在某一道老错题上陷入纠结，重点在把握整体全局脉络"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "英语大小作文终极模板背诵与考前定心",
      "action": "熟背个人专属大作文三段式与小作文各类书信告示模板，字迹工整手写一遍",
      "durationMinutes": 60
    },
    "politicsTask": {
      "title": "肖四主观题关键词提纲闭卷默写与时政最后排查",
      "action": "闭卷默写肖四全部主观大题的逻辑采分词，背诵考前时政热点清单",
      "durationMinutes": 60
    }
  },
  {
    "date": "2026-12-17",
    "formattedDate": "12月17日",
    "weekday": "周四",
    "theme": "【数二真题 Day 52】线代核心定理与性质背诵... · 【408 停卷固本 Day 6】408 考场...",
    "math2Task": {
      "id": "math2-1217",
      "date": "2026-12-17",
      "dayIndex": 71,
      "subject": "math2",
      "phase": "【第三阶段】停卷固本与公式回归（Day 52，考前第2天）",
      "title": "线代核心定理与性质背诵",
      "focusArea": "矩阵秩的不等式、相似与合同的充要/充分条件、正定矩阵判据",
      "coreConcepts": [
        "线代核心定理与性质背诵：\n- 矩阵秩的不等式\n- 相似与合同的充要/充分条件\n- 正定矩阵判据",
        "正交相似对角化四步框架默写",
        "施密特正交化公式核准"
      ],
      "mcqTarget": "默写伴随矩阵 6 大运算公式与矩阵秩的关系",
      "bigQuestionTarget": "在白纸上默写实对称矩阵正交相似对角化四步框架",
      "recommendedProblems": [
        "线代核心公式手册（闭卷默写版）"
      ],
      "pitfallsToAvoid": [
        "最后48小时，手握全部公式与定理，心态如止水！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1217",
      "date": "2026-12-17",
      "dayIndex": 71,
      "subject": "cs",
      "phase": "【408停卷固本与脑海过电影】",
      "title": "【408 停卷固本 Day 6】408 考场答题策略与答题卡版面规划",
      "focusArea": "熟悉考场 180 分钟时间分配策略与答题卡分区",
      "coreConcepts": [
        "时间规划：客观题 65 分钟（稳拿高分） -> 数据结构算法题 25 分钟 -> 计组大题 30 分钟 -> 操作系统大题 25 分钟 -> 计网大题 25 分钟 -> 预留 10 分钟涂卡复查",
        "草稿纸分区规划与字迹整洁要求",
        "答题卡大题条理清晰：一、二、三序号化踩点作答"
      ],
      "mcqTarget": "放松身心，确认答题顺序与策略",
      "bigQuestionTarget": "心中演练考场答卷流程",
      "recommendedProblems": [
        "408 考场答卷规范与时间表"
      ],
      "pitfallsToAvoid": [
        "字迹一定要工整！阅卷老师踩点给分，写得清清楚楚就是提分！"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "英语大小作文终极模板背诵与考前定心",
      "action": "熟背个人专属大作文三段式与小作文各类书信告示模板，字迹工整手写一遍",
      "durationMinutes": 60
    },
    "politicsTask": {
      "title": "肖四主观题关键词提纲闭卷默写与时政最后排查",
      "action": "闭卷默写肖四全部主观大题的逻辑采分词，背诵考前时政热点清单",
      "durationMinutes": 60
    }
  },
  {
    "date": "2026-12-18",
    "formattedDate": "12月18日",
    "weekday": "周五",
    "theme": "【数二真题 Day 53】考前定心。快速过一遍核心公式清单与草稿纸... · 【408 考前定心】平静复盘四科知识树脉络，...",
    "math2Task": {
      "id": "math2-1218",
      "date": "2026-12-18",
      "dayIndex": 72,
      "subject": "math2",
      "phase": "【第三阶段】考前定心（Day 53，考前第1天）",
      "title": "考前定心。快速过一遍核心公式清单与草稿纸分区规划",
      "focusArea": "熟悉考场答题顺序策略，平稳心态迎考",
      "coreConcepts": [
        "考前定心。快速过一遍核心公式清单与草稿纸分区规划",
        "熟悉考场答题顺序策略，平稳心态迎考",
        "充足睡眠，带上平静与杀气，踏上考场，从容收割！"
      ],
      "mcqTarget": "轻翻公式卡片，静心养神",
      "bigQuestionTarget": "在心中演练一遍答题卡填涂与步骤书写节奏",
      "recommendedProblems": [
        "考前答卷规范指南与公式清单"
      ],
      "pitfallsToAvoid": [
        "不要再做任何题目！充足的睡眠、平稳的心态和必胜的信念是考场最强大的武器！"
      ],
      "suggestedDurationMinutes": 210,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1218",
      "date": "2026-12-18",
      "dayIndex": 72,
      "subject": "cs",
      "phase": "【408停卷固本与脑海过电影】",
      "title": "【408 考前定心】平静复盘四科知识树脉络，信心铸就，迎战考场！",
      "focusArea": "考前定心。平静复盘四科脉络，今晚充足睡眠，明日奔赴考场！",
      "coreConcepts": [
        "408 四门大山（数据结构45分 + 计组45分 + 操作系统35分 + 计网25分 = 150分）已被你完全征服！",
        "底牌已铸成，带上平静与杀气，踏上考场，从容收割！"
      ],
      "mcqTarget": "静心养神，不看任何难题",
      "bigQuestionTarget": "闭目感受四科体系的融会贯通",
      "recommendedProblems": [
        "考前静心指南"
      ],
      "pitfallsToAvoid": [
        "早点入睡（22:30前），准备好准考证、身份证、文具，自信上阵！"
      ],
      "suggestedDurationMinutes": 200,
      "isCompleted": false
    },
    "englishTask": {
      "title": "英语大小作文终极模板背诵与考前定心",
      "action": "熟背个人专属大作文三段式与小作文各类书信告示模板，字迹工整手写一遍",
      "durationMinutes": 60
    },
    "politicsTask": {
      "title": "肖四主观题关键词提纲闭卷默写与时政最后排查",
      "action": "闭卷默写肖四全部主观大题的逻辑采分词，背诵考前时政热点清单",
      "durationMinutes": 60
    }
  },
  {
    "date": "2026-12-19",
    "formattedDate": "12月19日",
    "weekday": "周六",
    "theme": "【🚩 考研初试首战日】上午 08:30—11:30 政治大决战 · 下午 14:00—17:00 英语二大决战",
    "math2Task": {
      "id": "math2-1219",
      "date": "2026-12-19",
      "dayIndex": 73,
      "subject": "math2",
      "phase": "【考研决战前夕】数二终极定心",
      "title": "【数二考前终极定心】翻看核心公式清单与错题要点，晚上早睡养精蓄锐",
      "focusArea": "下午考完英语后，晚间花 1 小时过一遍高数微积分、微分方程与线代核心公式，22:00 前熄灯休息",
      "coreConcepts": [
        "保持平稳心态，不与任何人对白天政治与英语的答案",
        "翻看数二核心公式卡与极值/拐点/对角化易错清单",
        "确认明日准考证、身份证、2B铅笔、橡皮与答题签字笔齐全"
      ],
      "mcqTarget": "脑海中过一遍选填题的做题节奏（前40-50分钟稳步推进）",
      "bigQuestionTarget": "重温草稿纸分区规划与大题步骤分书写规范",
      "recommendedProblems": [
        "个人数二核心公式手抄清单",
        "易错反例备忘录"
      ],
      "pitfallsToAvoid": [
        "绝对不要在网上对答案！考完一门扔一门，全神贯注迎接明天的数二与408！"
      ],
      "suggestedDurationMinutes": 60,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1219",
      "date": "2026-12-19",
      "dayIndex": 73,
      "subject": "cs",
      "phase": "【考研决战前夕】408全景思维过电影",
      "title": "【408考前思维过电影】快速翻看四大母题核心架构与常用端口号/协议头",
      "focusArea": "心平气和，回顾Cache-TLB-Page跨学科联动模型、PV四步法与TCP拥塞控制状态机",
      "coreConcepts": [
        "计组：Cache/TLB/主存三级地址映射与指令流水线阻塞",
        "OS：PV信号量四步法与分页存储两级页表地址转换",
        "计网：OSI/TCP五层协议封装与三次握手四次挥手",
        "数据结构：二叉树遍历与快速排序/堆排序手写要领"
      ],
      "mcqTarget": "脑海快速检索常见概念陷阱",
      "bigQuestionTarget": "熟记算法题伪代码与核心文字说明结构",
      "recommendedProblems": [
        "408 核心思维导图",
        "四大母题专题笔记"
      ],
      "pitfallsToAvoid": [
        "今晚切勿熬夜刷题，翻看框架即可，保持充足睡眠！"
      ],
      "suggestedDurationMinutes": 60,
      "isCompleted": false
    },
    "englishTask": {
      "title": "下午 14:00—17:00 英语二全国统考！沉着迎战！",
      "action": "严格把控完型、阅读、新题型、翻译与大小作文时间分配，作文规范套用黄金模板，字迹工整！",
      "durationMinutes": 180
    },
    "politicsTask": {
      "title": "上午 08:30—11:30 思想政治理论全国统考！首战告捷！",
      "action": "客观题果断研判，主观大题踩准肖四得分要点，分点条理清晰，答题纸全部写满！",
      "durationMinutes": 180
    }
  },
  {
    "date": "2026-12-20",
    "formattedDate": "12月20日",
    "weekday": "周日",
    "theme": "【🏆 考研终极决战】上午 08:30—11:30 数学二全国统考 · 下午 14:00—17:00 408计算机综合统考",
    "math2Task": {
      "id": "math2-1220",
      "date": "2026-12-20",
      "dayIndex": 74,
      "subject": "math2",
      "phase": "【考研实战大捷】数学二终极决战",
      "title": "【数学二全国统考】上午 08:30—11:30 稳扎稳打，步步为营，一战成硕！",
      "focusArea": "草稿纸规范分区，选填细致排查，大题拿满步骤分，会做的坚决不错！",
      "coreConcepts": [
        "客观题严格掐表，遇到卡壳果断标记跳过，绝不恋战",
        "大题先易后难，写满关键公式与定理步骤，争抢每一步骤分",
        "交卷前检查个人信息与填涂卡，圆满完成数二大考！"
      ],
      "mcqTarget": "力保基础中档题 100% 准确率",
      "bigQuestionTarget": "规范书写解答步骤，拿到所有应得的分数",
      "recommendedProblems": [
        "2026 全国硕士研究生招生考试数学二试卷"
      ],
      "pitfallsToAvoid": [
        "保持从容冷静，无论试卷难易，你难人难，坚持到底就是胜利！"
      ],
      "suggestedDurationMinutes": 180,
      "isCompleted": false
    },
    "csTask": {
      "id": "cs-1220",
      "date": "2026-12-20",
      "dayIndex": 74,
      "subject": "cs",
      "phase": "【考研实战大捷】408全国统考圆满收官",
      "title": "【408计算机学科专业基础综合】下午 14:00—17:00 统考收官，圆满上岸！",
      "focusArea": "选择题快速研判，大题代码/伪代码规范作答，算法题注释清晰，完美收官！",
      "coreConcepts": [
        "40道选择题沉着应对，排查计算题细节陷阱",
        "7道综合大题按学科稳步攻坚，算法题注重时间/空间复杂度分析",
        "全力以赴，写下考研最后一道代码，胜利上岸！"
      ],
      "mcqTarget": "选择题稳拿高分",
      "bigQuestionTarget": "大题逐问清晰作答，步骤完整规范",
      "recommendedProblems": [
        "2026 全国硕士研究生招生考试408专业综合试卷"
      ],
      "pitfallsToAvoid": [
        "最后三小时咬牙坚持，认真作答直到最后一秒！"
      ],
      "suggestedDurationMinutes": 180,
      "isCompleted": false
    },
    "englishTask": {
      "title": "昨日英语统考已圆满完成！",
      "action": "昨日全力拼搏，今日已全神贯注于数二与408专业课！",
      "durationMinutes": 0
    },
    "politicsTask": {
      "title": "昨日政治统考已圆满完成！",
      "action": "昨日全力拼搏，今日已全神贯注于数二与408专业课！",
      "durationMinutes": 0
    }
  }
].map((day) => ({
  ...day,
  politicsTask: POLITICS_SCHEDULE_BY_DATE[day.date] ?? day.politicsTask,
}));

export const SUBSEQUENT_PHASES = [
  {
    phaseName: '第一阶段：中近期硬仗练兵（10月27日 — 11月4日，共9天）',
    dateRange: '10月27日 - 11月04日',
    keyMilestones: [
      '目标：攻克老题型硬仗卷的高强度大题计算，清扫早期真题遗留错题',
      '模考 16/17/18/20 年真题（严格按照上午 8:30—11:30 闭卷掐表）',
      '隔天深度订正：遮住答案独立重做所有错题，重点攻坚高强度计算大题与综合题',
      '408 操作系统第3-5章决战收口（虚拟内存、TLB-Page-Cache跨学科寻址、文件系统与I/O）',
      '第一阶段总结与错题扫尾：集中重做 16/17/18/20 年错题，彻底清扫早期真题残留易错点',
    ],
  },
  {
    phaseName: '第二阶段：新大纲抗压与磨合（11月5日 — 11月24日，共20天）',
    dateRange: '11月05日 - 11月24日',
    keyMilestones: [
      '目标：全面进入“10+6+6”新题型模式，真题与张八交替穿插，磨练客观题解题速度与抗压能力',
      '真题与张八交替模考：2022、2023、2024 新大纲真题 + 张宇八套卷（套卷一至五）',
      '新大纲客观题严格控制在 75～85 分钟，吃透排除法、特值法与数形结合技巧',
      '坚决执行止损规则：张八若遇极偏怪题，看解析超过 25 分钟仍不理解果断放弃，保住通法',
      '408 计网全科速通大闭幕与 2010-2024 历年真题套卷全真模考全面打响（14:00-17:00）',
      '政治《肖八》到手全面开启选择题轮刷，英语新题型/翻译技巧与大小作文每周动笔',
    ],
  },
  {
    phaseName: '第三阶段：冲刺校准与封箱（11月25日 — 12月18日，共24天）',
    dateRange: '11月25日 - 12月18日',
    keyMilestones: [
      '张四手感保持（11.25 - 12.08）：全真模考张宇四套卷（卷一至卷四），重点纠正选填粗心失误，只做常规中档题',
      '专题回炉（12.05 - 12.07）：高数（微分方程/二重积分/多元极值）+ 线代（含参方程组/相似对角化/二次型）',
      '封箱终极实战（12.09 - 12.11，考前8～10天）：全封闭终极全真模考【2026 年真题】，全卷逐题精细订正并独立重写完成封箱',
      '停卷固本与公式回归（12.12 - 12.18，最后7天）：彻底停做新题！集中重刷历年真题错题本，地毯式背诵高数与线代核心公式',
      '《肖四》主观题狂背模式全面开启（每天1.5-2小时），英语考场全真模拟与个人专属作文模板背诵定型',
      '12.18 考前定心：快速过一遍核心公式清单与草稿纸分区规划，熟悉考场答题顺序策略，平稳心态从容迎考！',
    ],
  },
];
