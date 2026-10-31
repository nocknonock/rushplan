import { PoliticsDetailTask } from '../types/kaoyan';

export interface PoliticsPhaseMeta {
  id: 'phase1' | 'phase2' | 'phase3' | 'phase4';
  title: string;
  dateRange: string;
  theme: string;
  summary: string;
  guidelines: string[];
}

export const POLITICS_PHASES: PoliticsPhaseMeta[] = [
  {
    id: 'phase1',
    title: '第一阶段：恢复知识框架',
    dateRange: '10月30日 — 11月05日',
    theme: '恢复知识框架，开始稳定刷题',
    summary: '非模考日70–90分钟四步闭环推进；模考日10～15题轻量保温保持连续性。',
    guidelines: [
      '非模考日政治任务——目标：恢复知识框架，开始稳定刷题（建议 70–90 分钟）。',
      '20 min 知识输入：翻阅腿姐背诵手册，或观看一个必要的技巧课片段。只处理当天对应的知识点，不从头重听完整课程。',
      '25 min 选择题训练：小程序完成 15～20 题，或者做一组专项练习。',
      '25 min 错题复盘：分析错误选项，回到手册定位知识点，标记容易混淆的概念。',
      '10 min 闭卷回忆：合上手册，回忆今天学到的关键词、理论关系和容易混淆的内容。',
      '模考日——只需完成 10～15 道题和必要订正即可，目的是保持连续性。',
    ],
  },
  {
    id: 'phase2',
    title: '第二阶段：肖八第一轮',
    dateRange: '11月06日 — 11月21日',
    theme: '每套肖八用两天，做卷与复盘交替互补',
    summary: '数学非模考日推进新卷限时做题订正；数学模考日复盘错题查漏补缺；两日循环结束小程序拔高。',
    guidelines: [
      '这一阶段，你原有的“每套肖八用两天”方案很适合非模考日与模考日交替的节奏。',
      '数学非模考日：完成一套肖八选择题，限时训练后订正（60～90 分钟）。',
      '数学模考日：复盘前一套肖八错题，回到手册查漏补缺（40～60 分钟）。',
      '两日循环结束：回顾反复出错的知识点，必要时补做小程序题（10～15 分钟，可并入当日）。',
      '需要注意：一套肖八选择题如果做完后没有充分分析错项，下一套的收益会大打折扣。非模考日负责推进新卷，模考日负责巩固与回顾，形成互补。',
      '如果你实际的模考安排不是严格隔天交替，就不要强求一套卷恰好对应两天。保持“做卷—复盘”的先后关系即可。',
    ],
  },
  {
    id: 'phase3',
    title: '第三阶段：巩固选择题',
    dateRange: '11月22日 — 11月30日',
    theme: '解决重复错误，按学科分类整理',
    summary: '非模考日按马原/史纲/毛中特/思修/时政分类精整；模考日小程序维持手感；每周至少一次错题抽查。',
    guidelines: [
      '这个阶段不建议继续大量扩充新资料，而应重点解决重复错误。',
      '非模考日：集中复盘肖八错题，按马原、史纲、毛中特、思修、时政分类整理。',
      '模考日：小程序维持手感，复习当天最容易遗忘的 2～3 个知识点。',
      '每周至少一次：随机抽取一组选择题，检查之前的错误是否真正解决。',
      '这一阶段可以适当降低技巧课的时间占比，把时间转移到主动回忆和错题复做上。',
    ],
  },
  {
    id: 'phase4',
    title: '第四阶段：肖四背诵优先',
    dateRange: '12月01日 — 12月18日',
    theme: '集中时段转向主观题，间隔复习滚动记忆',
    summary: '非模考日主观题背诵+旧内容回忆+选择题复盘；模考日复述框架+小程序；肖四首轮后集中攻坚薄弱题。',
    guidelines: [
      '肖四到手后，非模考日的集中时段应该逐步转向主观题。',
      '数学非模考日：新主观题背诵 + 旧内容回忆 + 选择题复盘（80～90 分钟）。',
      '数学模考日：复述已学主观题框架 + 小程序或错题复习（40～60 分钟）。',
      '肖四首轮完成后：闭卷回忆、检查遗漏、集中补薄弱题（视情况安排 60～90 分钟）。',
      '这里需要强调一点：不要把肖四主观题背诵理解为只在非模考日进行。主观题记忆依赖间隔复习，模考日也应该抽出 10～20 分钟回忆前一天背过的内容。',
      '另外，肖四的实际上市时间可能影响上述节奏。如果到手较晚，应优先完成肖四主观题的首轮学习和反复回忆，而不是为了维持原计划去压缩睡眠。',
    ],
  },
];

// 肖八 8 套卷明细 (11.06 - 11.21，每套两日循环)
interface Xiao8DayConfig {
  date: string;
  setIndex: string; // "卷一" ~ "卷八"
  dayType: 'exam' | 'review';
  mathMock: boolean;
}

const XIAO8_SCHEDULE: Record<string, Xiao8DayConfig> = {
  '2026-11-06': { date: '2026-11-06', setIndex: '卷一', dayType: 'exam', mathMock: false },
  '2026-11-07': { date: '2026-11-07', setIndex: '卷一', dayType: 'review', mathMock: true },
  '2026-11-08': { date: '2026-11-08', setIndex: '卷二', dayType: 'exam', mathMock: false },
  '2026-11-09': { date: '2026-11-09', setIndex: '卷二', dayType: 'review', mathMock: true },
  '2026-11-10': { date: '2026-11-10', setIndex: '卷三', dayType: 'exam', mathMock: false },
  '2026-11-11': { date: '2026-11-11', setIndex: '卷三', dayType: 'review', mathMock: true },
  '2026-11-12': { date: '2026-11-12', setIndex: '卷四', dayType: 'exam', mathMock: false },
  '2026-11-13': { date: '2026-11-13', setIndex: '卷四', dayType: 'review', mathMock: true },
  '2026-11-14': { date: '2026-11-14', setIndex: '卷五', dayType: 'exam', mathMock: false },
  '2026-11-15': { date: '2026-11-15', setIndex: '卷五', dayType: 'review', mathMock: true },
  '2026-11-16': { date: '2026-11-16', setIndex: '卷六', dayType: 'exam', mathMock: false },
  '2026-11-17': { date: '2026-11-17', setIndex: '卷六', dayType: 'review', mathMock: true },
  '2026-11-18': { date: '2026-11-18', setIndex: '卷七', dayType: 'exam', mathMock: false },
  '2026-11-19': { date: '2026-11-19', setIndex: '卷七', dayType: 'review', mathMock: true },
  '2026-11-20': { date: '2026-11-20', setIndex: '卷八', dayType: 'exam', mathMock: false },
  '2026-11-21': { date: '2026-11-21', setIndex: '卷八', dayType: 'review', mathMock: true },
};

/**
 * 忠实根据用户专项要求，为各日期生成【简短明白、高区分度、说明清晰】的政治每日任务
 */
export function getPoliticsTaskForDate(
  date: string,
  isMathMock: boolean,
  mathTitle?: string
): PoliticsDetailTask {
  // ----------------------------------------------------
  // 1. 第一阶段：10月30日 — 11月05日（恢复知识框架）
  // ----------------------------------------------------
  if (date >= '2026-10-30' && date <= '2026-11-05') {
    // 模考日：轻量保温
    if (isMathMock) {
      return {
        phaseId: 'phase1',
        phaseTitle: '恢复知识框架',
        dateRange: '10月30日 — 11月05日',
        dayType: 'math_mock',
        dayTypeLabel: '模考日·保温',
        title: '模考保温 · 小程序10~15题+订正',
        durationRange: '30–40 分钟',
        durationMinutes: 35,
        goal: '完成 10～15 道题并进行必要订正，保持连续性，不抢占模考精力',
        steps: [
          {
            duration: '20 min',
            title: '选择题保温',
            detail: '小程序完成 10～15 题，重点保持答题手感与题干敏感度。',
          },
          {
            duration: '15 min',
            title: '针对性订正',
            detail: '只翻看错题对应手册段落，标记易混概念，坚决不大块消耗精力。',
          },
        ],
        keyDirectives: ['模考日只需完成 10～15 道题和必要订正即可，核心是保持连续性。'],
      };
    }

    // 非模考日：四步闭环推进不同学科
    const phase1FocusMap: Record<string, { topic: string; subject: string }> = {
      '2026-10-31': { topic: '马原唯物论与辩证法三大规律', subject: '马原哲学' },
      '2026-11-01': { topic: '马原认识论飞跃与唯物史观', subject: '认识史观' },
      '2026-11-03': { topic: '史纲近代探索到中共开天辟地', subject: '近代史纲' },
      '2026-11-04': { topic: '史纲土地革命到新中国成立', subject: '革命历程' },
    };

    const focus = phase1FocusMap[date] || { topic: '核心考点输入与选择题专项', subject: '基础框架' };

    return {
      phaseId: 'phase1',
      phaseTitle: '恢复知识框架',
      dateRange: '10月30日 — 11月05日',
      dayType: 'math_non_mock',
      dayTypeLabel: '非模考·框架推进',
      title: `框架恢复 · ${focus.subject}精读+20题`,
      durationRange: '70–90 分钟',
      durationMinutes: 80,
      goal: `梳理${focus.topic}框架，四步闭环完成稳定刷题`,
      steps: [
        {
          duration: '20 min',
          title: '知识输入',
          detail: `翻阅腿姐背诵手册【${focus.topic}】，只看当天知识点，不从头听完整网课。`,
        },
        {
          duration: '25 min',
          title: '选择题训练',
          detail: '小程序完成 15～20 题，或做一组对应专项练习题。',
        },
        {
          duration: '25 min',
          title: '错题复盘',
          detail: '深入分析错误选项，回到背诵手册定位考点，用彩色笔标记容易混淆的概念。',
        },
        {
          duration: '10 min',
          title: '闭卷回忆',
          detail: '合上手册，在草稿纸或脑海里闭卷回忆今天学到的关键词、理论关系与混淆陷阱。',
        },
      ],
      keyDirectives: [
        '只处理当天对应的知识点，坚决不从头重听完整冗长课程',
        '选择题做完必须立刻回到背诵手册定位混淆概念',
        '最后 10 分钟务必合上手册闭卷回忆关键词',
      ],
    };
  }

  // ----------------------------------------------------
  // 2. 第二阶段：11月06日 — 11月21日（肖八第一轮，每套两天）
  // ----------------------------------------------------
  if (date >= '2026-11-06' && date <= '2026-11-21') {
    const xiao8Info = XIAO8_SCHEDULE[date] || {
      date,
      setIndex: '精选卷',
      dayType: isMathMock ? 'review' : 'exam',
      mathMock: isMathMock,
    };

    if (xiao8Info.dayType === 'exam') {
      return {
        phaseId: 'phase2',
        phaseTitle: '肖八第一轮',
        dateRange: '11月06日 — 11月21日',
        dayType: 'math_non_mock',
        dayTypeLabel: '做卷日',
        title: `肖八(${xiao8Info.setIndex}) · 限时做卷与核对`,
        durationRange: '60～90 分钟',
        durationMinutes: 75,
        goal: `掐表 35 分钟闭卷独立完成肖八${xiao8Info.setIndex}整套选择题，核对答案并逐题订正`,
        tableData: [
          { scheduleType: '数学非模考日', task: '完成一套肖八选择题，限时训练后订正', duration: '60～90 分钟' },
          { scheduleType: '数学模考日', task: '复盘前一套肖八错题，回到手册查漏补缺', duration: '40～60 分钟' },
          { scheduleType: '两日循环结束', task: '回顾反复出错的知识点，必要时补做小程序题', duration: '10～15 分钟，可并入当日' },
        ],
        steps: [
          {
            duration: '35 min',
            title: '限时掐表做卷',
            detail: `严格掐表 35 分钟闭卷独立完成肖八${xiao8Info.setIndex}客观选择题（单选16+多选17），模拟考场答题节奏。`,
          },
          {
            duration: '40 min',
            title: '深度对答案与订正',
            detail: '核对答案，重点剖析多选题错误干扰项，回到背诵手册标注盲区，严禁只对答案不查书。',
          },
        ],
        keyDirectives: [
          '非模考日负责推进新卷，严格执行 35 分钟掐表',
          '一套肖八选择题如果做完后没有充分分析错项，下一套的收益会大打折扣',
          '保持“做卷—复盘”先后关系，两日互补推进',
        ],
        guidelines: '这一阶段“每套肖八用两天”方案很适合非模考日与模考日交替的节奏。非模考日负责推进新卷，模考日负责巩固与回顾，形成互补。',
      };
    } else {
      return {
        phaseId: 'phase2',
        phaseTitle: '肖八第一轮',
        dateRange: '11月06日 — 11月21日',
        dayType: 'math_mock',
        dayTypeLabel: '复盘日',
        title: `肖八(${xiao8Info.setIndex}) · 错题复盘与查漏`,
        durationRange: '40～60 分钟',
        durationMinutes: 50,
        goal: `复盘肖八${xiao8Info.setIndex}错题，回到手册查漏补缺，彻底扫清卡壳概念`,
        tableData: [
          { scheduleType: '数学非模考日', task: '完成一套肖八选择题，限时训练后订正', duration: '60～90 分钟' },
          { scheduleType: '数学模考日', task: '复盘前一套肖八错题，回到手册查漏补缺', duration: '40～60 分钟' },
          { scheduleType: '两日循环结束', task: '回顾反复出错的知识点，必要时补做小程序题', duration: '10～15 分钟，可并入当日' },
        ],
        steps: [
          {
            duration: '35 min',
            title: '白纸重做与翻书查漏',
            detail: `遮住肖八${xiao8Info.setIndex}错题解析，重新在白纸上判断选项；针对顽固死穴通读背诵手册对应小节。`,
          },
          {
            duration: '15 min',
            title: '两日循环收尾加固',
            detail: '回顾本套试卷反复出错的知识点，必要时在小程序上补做 5~10 道对应题目收口。',
          },
        ],
        keyDirectives: [
          '模考日负责巩固与回顾，绝不强开新卷',
          '两日循环结束：回顾反复出错的知识点，必要时补做小程序题（10～15 分钟，可并入当日）',
          '确保每套试卷做透搞定，再开启下一套',
        ],
        guidelines: '非模考日负责推进新卷，模考日负责巩固与回顾，形成互补。',
      };
    }
  }

  // ----------------------------------------------------
  // 3. 第三阶段：11月22日 — 11月30日（巩固选择题，分类整理）
  // ----------------------------------------------------
  if (date >= '2026-11-22' && date <= '2026-11-30') {
    const isWeeklyCheckDay = date === '2026-11-22' || date === '2026-11-29';
    if (isWeeklyCheckDay) {
      const checkRound = date === '2026-11-22' ? '首轮' : '二轮';
      return {
        phaseId: 'phase3',
        phaseTitle: '巩固选择题',
        dateRange: '11月22日 — 11月30日',
        dayType: 'weekly_check',
        dayTypeLabel: '错题抽查日',
        title: `错题抽查 · 随机20题${checkRound}盲测`,
        durationRange: '50–70 分钟',
        durationMinutes: 60,
        goal: '随机抽取肖八之前错题一组（15~20题），闭卷检验之前的错误是否真正解决',
        steps: [
          {
            duration: '30 min',
            title: '随机错题闭卷抽检',
            detail: '从肖八之前做错的题目中随机抽选 15~20 题，闭卷重新作答。',
          },
          {
            duration: '30 min',
            title: '验收核对与深挖标记',
            detail: '核对抽检结果，若仍有错题，立即在背诵手册用红笔重点标注，列为考前必背清单。',
          },
        ],
        keyDirectives: [
          '这个阶段不建议继续大量扩充新资料，重点解决重复错误',
          '每周至少一次：随机抽取一组选择题，检查之前的错误是否真正解决',
          '降低技巧课时间占比，把时间转移到主动回忆和错题复做上',
        ],
      };
    }

    if (!isMathMock) {
      const categoryMap: Record<string, { topic: string; desc: string }> = {
        '2026-11-23': { topic: '马原哲学与政经', desc: '按马原学科分类整理肖八错题，重温唯物论、辩证法、剩余价值论易混考点' },
        '2026-11-25': { topic: '毛中特与新时代思想', desc: '分类排查毛中特重要政策表述、重要论断与高质量发展关键考点' },
        '2026-11-27': { topic: '史纲会议著作与主线', desc: '梳理近代史重大事件、党的重要会议、经典著作发表背景与历史意义' },
        '2026-11-28': { topic: '思修法治与核心时政', desc: '整理社会主义核心价值观、法律规范体系与年度国内外重大时政热点' },
      };
      const cat = categoryMap[date] || { topic: '肖八综合错题分类整理', desc: '集中复盘肖八错题，按学科分类整理' };

      return {
        phaseId: 'phase3',
        phaseTitle: '巩固选择题',
        dateRange: '11月22日 — 11月30日',
        dayType: 'math_non_mock',
        dayTypeLabel: '非模考·分类整理',
        title: `专题复盘 · ${cat.topic}错题`,
        durationRange: '60–80 分钟',
        durationMinutes: 70,
        goal: cat.desc,
        steps: [
          {
            duration: '45 min',
            title: '分类错题专项过筛',
            detail: `集中排查肖八中【${cat.topic}】所有错题，归纳高频失分题型与易错选项设陷规律。`,
          },
          {
            duration: '25 min',
            title: '主动回忆与要点整理',
            detail: '合上手册在草稿纸上速写核心逻辑框架、关键时间点与重要定性表述。',
          },
        ],
        keyDirectives: [
          '不建议大量扩充新资料，重点把肖八反复出现的错误彻底消灭',
          '把时间转移到主动回忆和错题复做上',
        ],
      };
    } else {
      const isLastDay = date === '2026-11-30';
      return {
        phaseId: 'phase3',
        phaseTitle: '巩固选择题',
        dateRange: '11月22日 — 11月30日',
        dayType: 'math_mock',
        dayTypeLabel: '模考日·保温',
        title: isLastDay ? '选择封箱 · 肖八客观题陷阱速通' : '手感维持 · 小程序15题+易忘点',
        durationRange: '30–45 分钟',
        durationMinutes: 40,
        goal: isLastDay ? '通览肖八标记的高频易错点，完成客观题封箱，准备进军肖四' : '小程序维持手感，复习当天最容易遗忘的 2～3 个知识点',
        steps: [
          {
            duration: '20 min',
            title: '小程序维持手感',
            detail: '利用零碎或数学模考后时间刷 10~15 题小程序，保持手感。',
          },
          {
            duration: '20 min',
            title: '定向攻坚易忘点',
            detail: '翻阅手册，专门复习当天最容易混淆的 2～3 个细碎考点。',
          },
        ],
        keyDirectives: [
          '模考日：小程序维持手感，复习当天最容易遗忘的 2～3 个知识点',
          '严格控制时长，不挤占数学模考与大题复盘时间',
        ],
      };
    }
  }

  // ----------------------------------------------------
  // 4. 第四阶段：12月01日 — 12月18日（肖四背诵优先）
  // ----------------------------------------------------
  if (date >= '2026-12-01' && date <= '2026-12-18') {
    const isPostRound1 = date >= '2026-12-14';

    // 肖四首轮后：闭卷回忆、检查遗漏、集中攻坚
    if (isPostRound1) {
      const postRoundMap: Record<string, { topic: string; target: string }> = {
        '2026-12-14': { topic: '马原34题哲学分析金句默写', target: '攻克第34题马原哲学金句与原理对应' },
        '2026-12-15': { topic: '毛中特35题高质量发展大题', target: '攻克第35题新时代思想与核心治国方略' },
        '2026-12-16': { topic: '史纲36题百年大党奋斗经验', target: '攻克第36题重大事件与历史经验大题' },
        '2026-12-17': { topic: '思修37题与当代38题模版', target: '攻克第37题法治道德与第38题人类命运共同体' },
        '2026-12-18': { topic: '肖四核心主观框架考前默过', target: '通盘默过4套主观题框架，信心拉满完成封箱' },
      };
      const post = postRoundMap[date] || { topic: '检查遗漏与集中攻坚薄弱题', target: '闭卷回忆、检查遗漏、集中补薄弱题' };

      return {
        phaseId: 'phase4',
        phaseTitle: '肖四背诵优先',
        dateRange: '12月01日 — 12月18日',
        dayType: 'post_round1',
        dayTypeLabel: '首轮后·查漏攻坚',
        title: `主观攻坚 · ${post.topic}`,
        durationRange: '60～90 分钟',
        durationMinutes: 75,
        goal: `肖四首轮完成后：${post.target}`,
        tableData: [
          { scheduleType: '数学非模考日', task: '新主观题背诵 + 旧内容回忆 + 选择题复盘', duration: '80～90 分钟' },
          { scheduleType: '数学模考日', task: '复述已学主观题框架 + 小程序或错题复习', duration: '40～60 分钟' },
          { scheduleType: '肖四首轮完成后', task: '闭卷回忆、检查遗漏、集中补薄弱题', duration: '视情况安排 60～90 分钟' },
        ],
        steps: [
          {
            duration: '40 min',
            title: '主观题闭卷框架回忆',
            detail: `对照肖四题目提纲，在白纸上速写【${post.topic}】核心采分点关键词。`,
          },
          {
            duration: '35 min',
            title: '对照查漏与集中补弱',
            detail: '对照标准答案查漏补缺，专门背诵背得不顺畅的采分术语，夯实考场金句。',
          },
        ],
        keyDirectives: [
          '肖四首轮完成后：闭卷回忆、检查遗漏、集中补薄弱题（安排 60～90 分钟）',
          '主观题记忆依赖间隔复习，考前反复滚动，切忌死记硬背',
        ],
        guidelines: '主观题记忆依赖间隔复习，考前反复滚动。如果到手较晚，应优先完成肖四主观题的首轮学习和反复回忆，而不是为了维持原计划去压缩睡眠。',
      };
    }

    // 肖四前两周：四套试卷大题滚动背诵
    const xiao4PlanMap: Record<string, { setIndex: string; subTopic: string; isExamDay: boolean }> = {
      '2026-12-01': { setIndex: '卷一', subTopic: '大题背诵(马原/毛中特)', isExamDay: false },
      '2026-12-02': { setIndex: '卷一', subTopic: '大题背诵(史纲/思修/当代)', isExamDay: false },
      '2026-12-03': { setIndex: '卷一', subTopic: '主观框架复述+选填', isExamDay: true },
      '2026-12-04': { setIndex: '卷二', subTopic: '大题背诵(马原/毛中特)', isExamDay: false },
      '2026-12-05': { setIndex: '卷二', subTopic: '大题背诵(史纲/思修/当代)', isExamDay: false },
      '2026-12-06': { setIndex: '卷二', subTopic: '主观框架复述+选填', isExamDay: true },
      '2026-12-07': { setIndex: '卷三', subTopic: '大题背诵(马原/毛中特)', isExamDay: false },
      '2026-12-08': { setIndex: '卷三', subTopic: '大题背诵(史纲/思修/当代)', isExamDay: false },
      '2026-12-09': { setIndex: '卷三', subTopic: '主观框架复述+选填', isExamDay: true },
      '2026-12-10': { setIndex: '卷四', subTopic: '大题背诵(马原/毛中特)', isExamDay: false },
      '2026-12-11': { setIndex: '卷四', subTopic: '大题背诵(史纲/思修/当代)', isExamDay: false },
      '2026-12-12': { setIndex: '卷四', subTopic: '主观框架复述+选填', isExamDay: true },
      '2026-12-13': { setIndex: '全套', subTopic: '4套主观框架交叉复述', isExamDay: true },
    };

    const xiao4 = xiao4PlanMap[date] || {
      setIndex: '精选卷',
      subTopic: isMathMock ? '主观框架复述+选填' : '新主观题背诵',
      isExamDay: isMathMock,
    };

    if (!xiao4.isExamDay && !isMathMock) {
      return {
        phaseId: 'phase4',
        phaseTitle: '肖四背诵优先',
        dateRange: '12月01日 — 12月18日',
        dayType: 'math_non_mock',
        dayTypeLabel: '背诵日',
        title: `肖四(${xiao4.setIndex}) · ${xiao4.subTopic}`,
        durationRange: '80–90 分钟',
        durationMinutes: 85,
        goal: `新主观题集中背诵 + 昨日旧内容回忆 + 选择题保温复盘`,
        tableData: [
          { scheduleType: '数学非模考日', task: '新主观题背诵 + 旧内容回忆 + 选择题复盘', duration: '80～90 分钟' },
          { scheduleType: '数学模考日', task: '复述已学主观题框架 + 小程序或错题复习', duration: '40～60 分钟' },
          { scheduleType: '肖四首轮完成后', task: '闭卷回忆、检查遗漏、集中补薄弱题', duration: '视情况安排 60～90 分钟' },
        ],
        steps: [
          {
            duration: '45 min',
            title: '新主观题发力背诵',
            detail: `大声背诵或口述肖四${xiao4.setIndex}主观题标准采分金句，记准核心答题采分点。`,
          },
          {
            duration: '25 min',
            title: '旧主观题间隔复习',
            detail: '抽出 20~25 分钟回忆前一天背诵过的主观题框架，利用间隔复习对抗遗忘曲线。',
          },
          {
            duration: '15 min',
            title: '选择题保温复盘',
            detail: `快速浏览肖四${xiao4.setIndex}选择题错项或小程序高频错题。`,
          },
        ],
        keyDirectives: [
          '肖四到手后，非模考日的集中时段逐步转向主观题',
          '不要把肖四主观题背诵理解为只在非模考日进行，主观题记忆极度依赖间隔复习',
          '如果肖四到手较晚，优先完成主观题首轮学习和反复回忆，不要压缩睡眠',
        ],
        guidelines: '肖四到手后，非模考日的集中时段应该逐步转向主观题。不要把肖四主观题背诵理解为只在非模考日进行。',
      };
    } else {
      return {
        phaseId: 'phase4',
        phaseTitle: '肖四背诵优先',
        dateRange: '12月01日 — 12月18日',
        dayType: 'math_mock',
        dayTypeLabel: '复述日',
        title: `肖四(${xiao4.setIndex}) · ${xiao4.subTopic}`,
        durationRange: '40–60 分钟',
        durationMinutes: 50,
        goal: '复述已学主观题框架 + 小程序或错题复习，滚动巩固',
        tableData: [
          { scheduleType: '数学非模考日', task: '新主观题背诵 + 旧内容回忆 + 选择题复盘', duration: '80～90 分钟' },
          { scheduleType: '数学模考日', task: '复述已学主观题框架 + 小程序或错题复习', duration: '40～60 分钟' },
          { scheduleType: '肖四首轮完成后', task: '闭卷回忆、检查遗漏、集中补薄弱题', duration: '视情况安排 60～90 分钟' },
        ],
        steps: [
          {
            duration: '25 min',
            title: '主观题框架闭卷复述',
            detail: '模考日抽出 20～25 分钟回忆前一天背过的主观题框架，在脑海中滚动过电影。',
          },
          {
            duration: '25 min',
            title: '小程序或错题复习',
            detail: '刷 10~15 题小程序或翻看错题本，维持客观题文字敏感度。',
          },
        ],
        keyDirectives: [
          '模考日也必须抽出 10～20 分钟回忆前一天背过的内容，滚动巩固',
          '数学模考日：复述已学主观题框架 + 小程序或错题复习（40～60 分钟）',
        ],
        guidelines: '主观题记忆依赖间隔复习，模考日也应该抽出 10～20 分钟回忆前一天背过的内容。',
      };
    }
  }

  // ----------------------------------------------------
  // 5. 考研统考：12月19日 — 12月20日
  // ----------------------------------------------------
  if (date >= '2026-12-19') {
    const isExamDay = date === '2026-12-20';
    return {
      phaseId: 'exam',
      phaseTitle: '考研初试',
      dateRange: '12月19日 — 12月20日',
      dayType: 'math_mock',
      dayTypeLabel: isExamDay ? '实战决胜' : '考前定心',
      title: isExamDay ? '政治统考 · 08:30—11:30 决胜全场！' : '考前定心 · 浏览大题框架与答题排版',
      durationRange: isExamDay ? '180 分钟' : '60 分钟',
      durationMinutes: isExamDay ? 180 : 60,
      goal: isExamDay ? '沉着应考，字迹工整，写满答题卡采分点，一战成硕！' : '翻阅肖四肖八核心主观题框架，规范考场答题排版',
      steps: [
        {
          duration: isExamDay ? '180 min' : '60 min',
          title: isExamDay ? '考场全卷实战' : '核心金句定心浏览',
          detail: isExamDay
            ? '上午 08:30—11:30 严格按照考场作息答卷，字迹工整，主观题序号清晰采分点顶格写！'
            : '翻看核心框架与大题金句，不钻牛角尖，早点休息储备充沛精力。',
        },
      ],
      keyDirectives: [
        '字迹工整，分点作答，重点术语顶格写',
        '平稳呼吸，发挥平生所学，必拔头筹！',
      ],
    };
  }

  // ----------------------------------------------------
  // 6. 早期基础保温阶段：10月08日 — 10月29日（每日精细考点）
  // ----------------------------------------------------
  const earlyTopicMap: Record<string, { topic: string; subject: string }> = {
    '2026-10-08': { topic: '唯物论核心考点精读', subject: '马原' },
    '2026-10-09': { topic: '唯物辩证法三大规律', subject: '马原' },
    '2026-10-10': { topic: '认识论与真理价值', subject: '马原' },
    '2026-10-11': { topic: '唯物史观与群众史观', subject: '马原' },
    '2026-10-12': { topic: '资本主义本质与剩余价值', subject: '马原' },
    '2026-10-13': { topic: '资本主义发展与社会主义趋势', subject: '马原' },
    '2026-10-14': { topic: '近代侵略与早期探索', subject: '史纲' },
    '2026-10-15': { topic: '辛亥革命与新文化运动', subject: '史纲' },
    '2026-10-16': { topic: '开天辟地与大革命风暴', subject: '史纲' },
    '2026-10-17': { topic: '土地革命与红军长征', subject: '史纲' },
    '2026-10-18': { topic: '抗日战争与中流砥柱', subject: '史纲' },
    '2026-10-19': { topic: '解放战争与建国伟业', subject: '史纲' },
    '2026-10-20': { topic: '新民主主义革命理论', subject: '毛中特' },
    '2026-10-21': { topic: '社会主义改造与初期探索', subject: '毛中特' },
    '2026-10-22': { topic: '邓小平理论与科学发展观', subject: '毛中特' },
    '2026-10-23': { topic: '新时代重大思想架构', subject: '毛中特' },
    '2026-10-24': { topic: '高质量发展与现代化建设', subject: '毛中特' },
    '2026-10-25': { topic: '人生观与理想信念', subject: '思修' },
    '2026-10-26': { topic: '中国精神与核心价值观', subject: '思修' },
    '2026-10-27': { topic: '道德规范与法治思维', subject: '思修' },
    '2026-10-28': { topic: '年度重大时事政治精选', subject: '时政' },
    '2026-10-29': { topic: '一轮考点排查 · 迎框架恢复', subject: '串讲' },
  };

  const early = earlyTopicMap[date] || { topic: '背诵手册对应章节', subject: '基础' };

  return {
    phaseId: 'early',
    phaseTitle: '基础保温与手册阅读',
    dateRange: '10月08日 — 10月29日',
    dayType: 'math_non_mock',
    dayTypeLabel: '日常保温',
    title: `【${early.subject}】${early.topic} + 20题`,
    durationRange: '40–50 分钟',
    durationMinutes: 50,
    goal: `通读背诵手册【${early.topic}】要点，完成小程序基础选择题练习并维持题感`,
    steps: [
      {
        duration: '20 min',
        title: '背诵手册翻阅',
        detail: `精读背诵手册【${early.topic}】重点内容，用荧光笔圈画易混淆关键词。`,
      },
      {
        duration: '30 min',
        title: '小程序精选刷题',
        detail: '小程序完成 15～20 题，做完及时订正错项并回填手册。',
      },
    ],
    keyDirectives: [
      '保持每天动笔做题，平稳迎接 10 月 30 日系统恢复知识框架！',
    ],
  };
}
