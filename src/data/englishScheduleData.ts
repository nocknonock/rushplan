import { EnglishWeekPlan, EnglishSubTaskCategory, EnglishMockExamInfo } from '../types/kaoyan';

export interface EnglishTimeAllocationItem {
  section: string;
  durationRange: string;
  weightPercent: number;
  colorClass: string;
}

export const ENGLISH_TIME_ALLOCATION: EnglishTimeAllocationItem[] = [
  {
    section: '完形填空',
    durationRange: '15—20分钟',
    weightPercent: 10,
    colorClass: 'bg-teal-500',
  },
  {
    section: '阅读理解',
    durationRange: '70—80分钟',
    weightPercent: 42,
    colorClass: 'bg-emerald-500',
  },
  {
    section: '新题型',
    durationRange: '15—20分钟',
    weightPercent: 10,
    colorClass: 'bg-cyan-500',
  },
  {
    section: '翻译',
    durationRange: '20—25分钟',
    weightPercent: 13,
    colorClass: 'bg-sky-500',
  },
  {
    section: '大小作文',
    durationRange: '40—45分钟',
    weightPercent: 21,
    colorClass: 'bg-amber-500',
  },
  {
    section: '检查与机动',
    durationRange: '5—10分钟',
    weightPercent: 4,
    colorClass: 'bg-slate-400',
  },
];

export interface EnglishTeacherItem {
  category: string;
  teacher: string;
  formerNote?: string;
}

export const ENGLISH_TEACHERS: EnglishTeacherItem[] = [
  { category: '作文', teacher: '石磊鹏', formerNote: '原潘赟已换' },
  { category: '翻译', teacher: '唐静' },
  { category: '完型', teacher: '易熙人' },
  { category: '新题型', teacher: '刘琦' },
];

export interface EnglishStageOverview {
  id: 'stage1' | 'stage2' | 'stage3' | 'stage4';
  title: string;
  dateRange: string;
  coreArrangement: string;
}

export const ENGLISH_STAGES: EnglishStageOverview[] = [
  {
    id: 'stage1',
    title: '全题型掌握',
    dateRange: '11月3日—11月15日',
    coreArrangement: '基于2020、2021、2022、2023年真题，一天一道题型，开始全题型学习，整理简单的作文模板',
  },
  {
    id: 'stage2',
    title: '第一次模拟',
    dateRange: '11月16日—11月29日',
    coreArrangement: '2024真题，随后复盘，整理作文模板',
  },
  {
    id: 'stage3',
    title: '第二、三次模拟',
    dateRange: '11月30日—12月13日',
    coreArrangement: '2025年真题、2026年真题',
  },
  {
    id: 'stage4',
    title: '考前巩固',
    dateRange: '12月14日—12月18日',
    coreArrangement: '不再安排新的整套模拟，重点复习错题、作文和做题节奏',
  },
];

export const ENGLISH_CATEGORY_LABELS: Record<
  EnglishSubTaskCategory,
  { label: string; badgeClass: string }
> = {
  reading: {
    label: '阅读理解',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  },
  cloze: {
    label: '完形填空',
    badgeClass: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
  },
  translation: {
    label: '翻译专项',
    badgeClass: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
  },
  newType: {
    label: '新题型',
    badgeClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
  },
  essay: {
    label: '大小作文',
    badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  },
  mock: {
    label: '全真模考',
    badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
  },
  review: {
    label: '错题复盘',
    badgeClass: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
  },
  vocab: {
    label: '核心词汇',
    badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  },
};

export const INITIAL_ENGLISH_WEEK_PLANS: EnglishWeekPlan[] = [
  {
    id: 'eng-week-1',
    weekNumber: 1,
    title: '第1周：阅读一刷收尾与全题型全面启动',
    dateRange: '11月3日—11月8日',
    startDate: '2026-11-03',
    endDate: '2026-11-08',
    stageId: 'stage1',
    stageTitle: '全题型掌握 (11.3—11.15)',
    goal: '继续阅读一刷，同时让其他题型全部启动。根据当天时间情况，具体安排复习目标，逐步建立解题方法，结合网课与真题，尝试掌握。',
    subTasks: [
      {
        id: 'eng-w1-reading-1',
        category: 'reading',
        title: '阅读 1（已完成）',
        detail: '2020–2023真题阅读一刷精读复盘',
        isCompleted: true, // 文档明确标注：阅读 1（已完成）
      },
      {
        id: 'eng-w1-cloze-1',
        category: 'cloze',
        title: '完型 1',
        detail: '结合易熙人方法论完成1篇真题完型并复盘',
        isCompleted: false,
      },
      {
        id: 'eng-w1-trans-1',
        category: 'translation',
        title: '翻译 1',
        detail: '结合唐静拆分组合法完成1篇真题翻译手译',
        isCompleted: false,
      },
      {
        id: 'eng-w1-newtype-1',
        category: 'newType',
        title: '新题型 1',
        detail: '结合刘琦技巧完成1篇真题新题型训练',
        isCompleted: false,
      },
      {
        id: 'eng-w1-essay-1',
        category: 'essay',
        title: '作文 第1篇 (共2篇)',
        detail: '结合石磊鹏课程了解大小作文基本格式并动笔练第1篇',
        isCompleted: false,
      },
      {
        id: 'eng-w1-essay-2',
        category: 'essay',
        title: '作文 第2篇 (共2篇)',
        detail: '整理一份自己能理解、记忆的参考模板框架并练第2篇',
        isCompleted: false,
      },
    ],
    guidance: [
      '基于 2020、2021、2022、2023 年真题，一天一道题型，开始全题型学习。',
      '各题型推荐老师：作文-石磊鹏（原潘赟已替换）、翻译-唐静、完型-易熙人、新题型-刘琦。',
      '作文方面：这周先花一点时间了解英语二大小作文的基本格式，找一份自己能够理解、记忆的参考模板。不要求立即背熟。',
    ],
  },
  {
    id: 'eng-week-2',
    weekNumber: 2,
    title: '第2周：全题型初步接触与动笔实战',
    dateRange: '11月9日—11月15日',
    startDate: '2026-11-09',
    endDate: '2026-11-15',
    stageId: 'stage1',
    stageTitle: '全题型掌握 (11.3—11.15)',
    goal: '完成各题型的初步接触，建立基本解题方法。每天仍然保留10分钟单词复习。',
    subTasks: [
      {
        id: 'eng-w2-reading-1',
        category: 'reading',
        title: '阅读 第1篇 (共2篇)',
        detail: '2020–2023真题阅读精读与定位依据核对',
        isCompleted: false,
      },
      {
        id: 'eng-w2-reading-2',
        category: 'reading',
        title: '阅读 第2篇 (共2篇)',
        detail: '2020–2023真题阅读精读与干扰项错因分析',
        isCompleted: false,
      },
      {
        id: 'eng-w2-cloze-1',
        category: 'cloze',
        title: '完型 1',
        detail: '真题完形填空1篇限时训练与逻辑关系词复盘',
        isCompleted: false,
      },
      {
        id: 'eng-w2-trans-1',
        category: 'translation',
        title: '翻译 1',
        detail: '真题翻译1篇逐句动笔手译与长难句主干切分',
        isCompleted: false,
      },
      {
        id: 'eng-w2-newtype-1',
        category: 'newType',
        title: '新题型 1',
        detail: '真题新题型1篇段落核心词定位与复盘',
        isCompleted: false,
      },
      {
        id: 'eng-w2-essay-1',
        category: 'essay',
        title: '作文 第1篇 (共2篇)',
        detail: '必须自己动笔独立书写，对照修改表达',
        isCompleted: false,
      },
      {
        id: 'eng-w2-essay-2',
        category: 'essay',
        title: '作文 第2篇 (共2篇)',
        detail: '必须自己动笔独立书写，哪怕刚开始写得差也比只看课有效',
        isCompleted: false,
      },
      {
        id: 'eng-w2-vocab-daily',
        category: 'vocab',
        title: '每日保留10分钟单词复习',
        detail: '贯穿全周保持核心词汇与熟词僻义熟悉度',
        isCompleted: false,
      },
    ],
    guidance: [
      '这周结束时，不要求所有题型都达到很高正确率，但至少需要做到：拿到题目知道从哪里入手，知道自己容易在哪里失分。',
      '特别注意作文：不要只看老师讲解或背范文，必须自己动笔写。哪怕刚开始写得很差，也比一直看课有效。',
    ],
  },
  {
    id: 'eng-week-3',
    weekNumber: 3,
    title: '第3周：专项强化与第一次全真模拟 (2024真题)',
    dateRange: '11月16日—11月22日',
    startDate: '2026-11-16',
    endDate: '2026-11-22',
    stageId: 'stage2',
    stageTitle: '第一次模拟 (11.16—11.29)',
    goal: '前半段继续专项训练，周日（11月22日）进行第一次完整180分钟全真模拟（2024年英语二真题），找出整套试卷中的时间和能力短板。',
    subTasks: [
      {
        id: 'eng-w3-reading-1',
        category: 'reading',
        title: '阅读 第1篇（重点分析错误选项）',
        detail: '前半段专项：深挖错误选项设陷套路',
        isCompleted: false,
      },
      {
        id: 'eng-w3-reading-2',
        category: 'reading',
        title: '阅读 第2篇（重点分析错误选项）',
        detail: '前半段专项：核对原文定位句与同义改写',
        isCompleted: false,
      },
      {
        id: 'eng-w3-cloze-1',
        category: 'cloze',
        title: '完形 1篇',
        detail: '前半段专项：控时15–20分钟完成并订正',
        isCompleted: false,
      },
      {
        id: 'eng-w3-newtype-1',
        category: 'newType',
        title: '新题型 1篇',
        detail: '前半段专项：控时15–20分钟完成并订正',
        isCompleted: false,
      },
      {
        id: 'eng-w3-trans-1',
        category: 'translation',
        title: '翻译 1组',
        detail: '前半段专项：控时20–25分钟手写翻译并核对采分点',
        isCompleted: false,
      },
      {
        id: 'eng-w3-essay-small',
        category: 'essay',
        title: '小作文手写 1次',
        detail: '严格在答题纸上亲手书写小作文1篇',
        isCompleted: false,
      },
      {
        id: 'eng-w3-essay-big',
        category: 'essay',
        title: '大作文手写 1次',
        detail: '严格在答题纸上亲手书写图表大作文1篇',
        isCompleted: false,
      },
      {
        id: 'eng-w3-mock-2024',
        category: 'mock',
        title: '【11月22日】第一次全真模拟：2024年英语二真题（完整180分钟）',
        detail: '严格按考场时间分配独立完成整套2024年英语二真题，并完成5项模考复盘诊断',
        isCompleted: false,
      },
    ],
    mockExam: {
      date: '2026-11-22',
      formattedDate: '11月22日',
      paperTitle: '2024年英语二真题（第一次全真模拟）',
      durationMinutes: 180,
      reflectionPrompts: [
        '阅读用了多少时间，正确率如何？',
        '作文是否能在规定时间内完成？',
        '完形、新题型是否出现大面积失分？',
        '翻译是否因为长难句理解问题而失分？',
        '是否出现最后几题来不及做的情况？',
      ],
    },
    guidance: [
      '11月22日全真模拟：2024年英语二真题（完整180分钟）。',
      '第一次模拟的真正作用，不是看能考多少分，而是找出你在整套试卷中的时间和能力短板。',
      '模考后务必逐项核对5大复盘问题，并将诊断结论记录在本周下方的【英语专属复盘周记】中。',
    ],
  },
  {
    id: 'eng-week-4',
    weekNumber: 4,
    title: '第4周：第一次模拟深度复盘与短板集中修补',
    dateRange: '11月23日—11月29日',
    startDate: '2026-11-23',
    endDate: '2026-11-29',
    stageId: 'stage2',
    stageTitle: '第一次模拟 (11.16—11.29)',
    goal: '复盘第一次模拟，集中修补短板。这一周不安排第二套整卷。',
    subTasks: [
      {
        id: 'eng-w4-review-1',
        category: 'review',
        title: '第一次模拟卷错题复盘（第1次 / 共2次）',
        detail: '逐篇拆解2024年真题模考卷错题、生词与长难句',
        isCompleted: false,
      },
      {
        id: 'eng-w4-review-2',
        category: 'review',
        title: '第一次模拟卷错题复盘（第2次 / 共2次）',
        detail: '二刷2024真题干扰项，彻底理清命题人设坑逻辑',
        isCompleted: false,
      },
      {
        id: 'eng-w4-reading-1',
        category: 'reading',
        title: '阅读专项练习（第1次 / 共2次）',
        detail: '搞清楚错因：单词不认识、句子理解错误、未找准原文依据还是被干扰项误导',
        isCompleted: false,
      },
      {
        id: 'eng-w4-reading-2',
        category: 'reading',
        title: '阅读专项练习（第2次 / 共2次）',
        detail: '若一模阅读错得较多，把本周多出来的时间优先给阅读',
        isCompleted: false,
      },
      {
        id: 'eng-w4-cloze-newtype-1',
        category: 'cloze',
        title: '完形或新题型专项（1次）',
        detail: '针对一模暴露的完形或新题型薄弱环节做1次定向突破',
        isCompleted: false,
      },
      {
        id: 'eng-w4-trans-1',
        category: 'translation',
        title: '翻译专项（1次）',
        detail: '针对长难句拆分与汉语表达通顺度做1次专项精练',
        isCompleted: false,
      },
      {
        id: 'eng-w4-essay-small',
        category: 'essay',
        title: '小作文手写（1篇）',
        detail: '整理并打磨个人专属小作文模板，限时手写1篇',
        isCompleted: false,
      },
      {
        id: 'eng-w4-essay-big',
        category: 'essay',
        title: '大作文手写（1篇）',
        detail: '整理并打磨个人专属大作文模板，限时手写1篇',
        isCompleted: false,
      },
    ],
    guidance: [
      '这一周不安排第二套整卷，核心任务是吃透第一次模拟暴露的短板。',
      '尤其是阅读，不要只把错误题目重新做对就算结束。要搞清楚自己究竟是：单词不认识、句子理解错误、没有找到原文依据，还是被干扰项误导。',
      '如果第一次模拟阅读错得比较多，把本周多出来的时间优先给阅读。',
    ],
  },
  {
    id: 'eng-week-5',
    weekNumber: 5,
    title: '第5周：薄弱点加固与第二次全真模拟 (2025真题)',
    dateRange: '11月30日—12月6日',
    startDate: '2026-11-30',
    endDate: '2026-12-06',
    stageId: 'stage3',
    stageTitle: '第二、三次模拟 (11.30—12.13)',
    goal: '复习第一次模拟中暴露出的薄弱点，保持专项手感，并在12月6日完成第二次全真模拟（2025年英语二真题）。',
    subTasks: [
      {
        id: 'eng-w5-review-weakness',
        category: 'review',
        title: '复习第一次模拟中暴露出的薄弱点',
        detail: '模考前针对性回顾一模错题笔记与时间分配教训',
        isCompleted: false,
      },
      {
        id: 'eng-w5-reading-1',
        category: 'reading',
        title: '阅读练习 第1篇 (1—2篇)',
        detail: '限时精练保持定位速度与准确率',
        isCompleted: false,
      },
      {
        id: 'eng-w5-reading-2',
        category: 'reading',
        title: '阅读练习 第2篇 (1—2篇)',
        detail: '限时精练巩固长难句与选项比对节奏',
        isCompleted: false,
      },
      {
        id: 'eng-w5-cloze-1',
        category: 'cloze',
        title: '完形练习 1篇',
        detail: '15–20分钟限时完成完形练习1篇',
        isCompleted: false,
      },
      {
        id: 'eng-w5-newtype-1',
        category: 'newType',
        title: '新题型练习 1篇',
        detail: '15–20分钟限时完成新题型练习1篇',
        isCompleted: false,
      },
      {
        id: 'eng-w5-essay-small',
        category: 'essay',
        title: '小作文手写 1篇',
        detail: '脱稿套用个人模板完成小作文手写1篇',
        isCompleted: false,
      },
      {
        id: 'eng-w5-essay-big',
        category: 'essay',
        title: '大作文手写 1篇',
        detail: '脱稿套用个人模板完成大作文手写1篇',
        isCompleted: false,
      },
      {
        id: 'eng-w5-mock-2025',
        category: 'mock',
        title: '【12月6日】第二次全真模拟：2025年英语二真题（完整180分钟）',
        detail: '重点观察经过前两周训练，做题速度和稳定性是否提高',
        isCompleted: false,
      },
    ],
    mockExam: {
      date: '2026-12-06',
      formattedDate: '12月6日',
      paperTitle: '2025年英语二真题（第二次全真模拟）',
      durationMinutes: 180,
      reflectionPrompts: [
        '经过前两周训练，整卷做题速度和稳定性是否明显提高？',
        '大小作文能否在 40—45 分钟内流畅默写套用完个人模板？',
        '客观题错误原因属于试卷本身难度波动，还是同类知识漏洞复发？',
      ],
    },
    guidance: [
      '12月6日全真模拟：2025年英语二真题（完整180分钟）。',
      '第二次模拟重点观察：经过前两周训练，做题速度和稳定性是否提高。',
      '不要因为分数比第一次低就急着更换老师或资料，先分析试卷难度和错误原因。',
    ],
  },
  {
    id: 'eng-week-6',
    weekNumber: 6,
    title: '第6周：全科收口与第三次全真模拟 (2026真题)',
    dateRange: '12月7日—12月13日',
    startDate: '2026-12-07',
    endDate: '2026-12-13',
    stageId: 'stage3',
    stageTitle: '第二、三次模拟 (11.30—12.13)',
    goal: '不再大面积开新课，全面转入错题、高频词、技巧与模板背诵，并在12月13日完成最后一次完整全真模拟（2026年英语二真题）。',
    subTasks: [
      {
        id: 'eng-w6-reading-review',
        category: 'reading',
        title: '阅读错题复习',
        detail: '重看2020–2025历年真题阅读典型错题与干扰项规律',
        isCompleted: false,
      },
      {
        id: 'eng-w6-vocab-review',
        category: 'vocab',
        title: '高频词汇和熟词僻义复习',
        detail: '集中过一遍真题高频核心词与常考熟词僻义',
        isCompleted: false,
      },
      {
        id: 'eng-w6-cloze-newtype-review',
        category: 'newType',
        title: '完形、新题型的解题技巧回顾',
        detail: '复盘易熙人完形与刘琦新题型核心破题口诀',
        isCompleted: false,
      },
      {
        id: 'eng-w6-trans-review',
        category: 'translation',
        title: '翻译中的长难句分析',
        detail: '回顾唐静翻译笔记中的典型定语从句、状语后置与倒装结构',
        isCompleted: false,
      },
      {
        id: 'eng-w6-essay-memorize',
        category: 'essay',
        title: '大小作文模板和常用表达背诵',
        detail: '将个人大小作文模板与主题词背到滚瓜烂熟、下笔即来',
        isCompleted: false,
      },
      {
        id: 'eng-w6-mock-2026',
        category: 'mock',
        title: '【12月13日】第三次全真模拟：2026年英语二真题（终极考场还原）',
        detail: '完全还原考试环境：标准答题卡填涂、180分钟严格时间限制、大小作文全篇手写',
        isCompleted: false,
      },
    ],
    mockExam: {
      date: '2026-12-13',
      formattedDate: '12月13日',
      paperTitle: '2026年英语二真题（第三次/最后一次完整模拟）',
      durationMinutes: 180,
      reflectionPrompts: [
        '答题卡填涂、180分钟时间限制、作文手写是否完全符合真实考场流程？',
        '各题型切换顺序与时间分配是否已经固化为肌肉记忆？',
      ],
    },
    guidance: [
      '这一周不再大面积开新课，重心全面转向错题、熟词僻义与作文模板背诵。',
      '12月13日全真模拟：2026年英语二真题。这是最后一次完整模拟，尽量完全还原考试环境：答题卡、时间限制、作文手写。',
    ],
  },
  {
    id: 'eng-week-7',
    weekNumber: 7,
    title: '第7周：考前巩固保温与考场定心',
    dateRange: '12月14日—12月18日',
    startDate: '2026-12-14',
    endDate: '2026-12-18',
    stageId: 'stage4',
    stageTitle: '考前巩固 (12.14—12.18)',
    goal: '稳定发挥，而不是继续大量刷题。整套试卷不再强制安排，重点保持做题手感与作文默写熟练度。',
    subTasks: [
      {
        id: 'eng-w7-vocab',
        category: 'vocab',
        title: '单词：每天10—15分钟保温',
        detail: '考前最后5天每天快速过高频词，保持词汇敏感度',
        isCompleted: false,
      },
      {
        id: 'eng-w7-reading',
        category: 'reading',
        title: '阅读：回顾错题和典型文章，不追求新题数量',
        detail: '温和复盘三次模考卷与近年真题典型文章，维持定位语感',
        isCompleted: false,
      },
      {
        id: 'eng-w7-essay',
        category: 'essay',
        title: '作文：每天回忆和默写核心结构',
        detail: '每天在纸上默写大小作文框架句式与首尾段，确保零拼写失误',
        isCompleted: false,
      },
      {
        id: 'eng-w7-cloze-newtype',
        category: 'newType',
        title: '完形、新题型：回顾常见解题方法',
        detail: '快速过一遍逻辑连接词与段落衔接标志词',
        isCompleted: false,
      },
      {
        id: 'eng-w7-trans',
        category: 'translation',
        title: '翻译：复习之前做错的长难句',
        detail: '浏览做过的真题翻译错句，保持顺畅汉语表达语感',
        isCompleted: false,
      },
    ],
    guidance: [
      '本周目标：稳定发挥，而不是继续大量刷题。整套试卷不再强制安排。',
      '考前一天（12月18日）不建议做高强度英语训练，保持做题手感即可，从容迎接12月19日下午英语二正式考试！',
    ],
  },
];

/**
 * Resolves the corresponding EnglishWeekPlan for any given YYYY-MM-DD date.
 */
export function getEnglishWeekForDate(
  date: string,
  weekPlans: EnglishWeekPlan[]
): { weekPlan: EnglishWeekPlan; status: 'pre' | 'active' | 'exam' } {
  const list = weekPlans.length > 0 ? weekPlans : INITIAL_ENGLISH_WEEK_PLANS;
  if (date < '2026-11-03') {
    return { weekPlan: list[0], status: 'pre' };
  }
  if (date > '2026-12-18') {
    return { weekPlan: list[list.length - 1], status: 'exam' };
  }
  const matched = list.find((w) => date >= w.startDate && date <= w.endDate);
  return { weekPlan: matched || list[0], status: 'active' };
}

/**
 * Checks if a specific YYYY-MM-DD date is one of the 3 scheduled English Full Mock Exam days.
 */
export function getEnglishMockForDate(
  date: string,
  weekPlans: EnglishWeekPlan[]
): EnglishMockExamInfo | undefined {
  for (const w of weekPlans) {
    if (w.mockExam && w.mockExam.date === date) {
      return w.mockExam;
    }
  }
  return undefined;
}
