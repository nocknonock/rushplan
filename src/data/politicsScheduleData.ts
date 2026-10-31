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
    summary: '非模考日70–90分钟精细切分推进；模考日10～15题轻量保温保持连续性。',
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
    summary: '数学非模考日推进新卷做题订正；数学模考日复盘错题查漏补缺；两日循环结束小程序拔高。',
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

/**
 * 忠实根据用户提供的政治专项要求生成各日期政治任务详情
 */
export function getPoliticsTaskForDate(
  date: string,
  isMathMock: boolean,
  mathTitle?: string
): PoliticsDetailTask {
  // 1. 第一阶段：10月30日 — 11月5日
  if (date >= '2026-10-30' && date <= '2026-11-05') {
    if (!isMathMock) {
      return {
        phaseId: 'phase1',
        phaseTitle: '恢复知识框架',
        dateRange: '10月30日 — 11月05日',
        dayType: 'math_non_mock',
        dayTypeLabel: '非模考日',
        title: '非模考日政治任务——恢复知识框架，开始稳定刷题',
        durationRange: '70–90 分钟',
        durationMinutes: 80,
        goal: '恢复知识框架，开始稳定刷题',
        steps: [
          {
            duration: '20 min',
            title: '知识输入',
            detail: '翻阅腿姐背诵手册，或观看一个必要的技巧课片段。只处理当天对应的知识点，不从头重听完整课程。',
          },
          {
            duration: '25 min',
            title: '选择题训练',
            detail: '小程序完成 15～20 题，或者做一组专项练习。',
          },
          {
            duration: '25 min',
            title: '错题复盘',
            detail: '分析错误选项，回到手册定位知识点，标记容易混淆的概念。',
          },
          {
            duration: '10 min',
            title: '闭卷回忆',
            detail: '合上手册，回忆今天学到的关键词、理论关系和容易混淆的内容。',
          },
        ],
        keyDirectives: [
          '只处理当天对应的知识点，坚决不从头重听完整冗长课程',
          '选择题做完必须立刻回到背诵手册定位混淆概念',
          '最后 10 分钟合上手册在脑海里闭卷过电影',
        ],
      };
    } else {
      return {
        phaseId: 'phase1',
        phaseTitle: '恢复知识框架',
        dateRange: '10月30日 — 11月05日',
        dayType: 'math_mock',
        dayTypeLabel: '模考日',
        title: '模考日政治任务——10～15 道题和必要订正',
        durationRange: '30–40 分钟',
        durationMinutes: 35,
        goal: '只需完成 10～15 道题和必要订正即可，目的是保持连续性',
        steps: [
          {
            duration: '20 min',
            title: '选择题保温',
            detail: '小程序完成 10～15 道题，重点保持答题手感与文字敏感度。',
          },
          {
            duration: '15 min',
            title: '必要订正',
            detail: '对错题进行必要订正，翻看手册对应段落，不展开大块消耗数学模考精力。',
          },
        ],
        keyDirectives: [
          '模考日只需完成 10～15 道题和必要订正即可，目的是保持连续性',
        ],
      };
    }
  }

  // 2. 第二阶段：11月6日 — 11月21日
  if (date >= '2026-11-06' && date <= '2026-11-21') {
    if (!isMathMock) {
      return {
        phaseId: 'phase2',
        phaseTitle: '肖八第一轮',
        dateRange: '11月06日 — 11月21日',
        dayType: 'math_non_mock',
        dayTypeLabel: '数学非模考日',
        title: '完成一套肖八选择题，限时训练后订正',
        durationRange: '60～90 分钟',
        durationMinutes: 75,
        goal: '完成一套肖八选择题，限时训练后订正',
        tableData: [
          {
            scheduleType: '数学非模考日',
            task: '完成一套肖八选择题，限时训练后订正',
            duration: '60～90 分钟',
          },
          {
            scheduleType: '数学模考日',
            task: '复盘前一套肖八错题，回到手册查漏补缺',
            duration: '40～60 分钟',
          },
          {
            scheduleType: '两日循环结束',
            task: '回顾反复出错的知识点，必要时补做小程序题',
            duration: '10～15 分钟，可并入当日',
          },
        ],
        steps: [
          {
            duration: '35 min',
            title: '肖八限时做卷',
            detail: '掐表 35 分钟闭卷独立完成一套肖八客观选择题（单选16+多选17），适应真卷命题题感。',
          },
          {
            duration: '40 min',
            title: '深度对答案与订正',
            detail: '核对答案并逐题分析错误选项，回到手册标注盲区，严禁只对答案不查手册。',
          },
        ],
        keyDirectives: [
          '非模考日负责推进新卷，严格执行做卷掐表',
          '一套肖八选择题如果做完后没有充分分析错项，下一套的收益会大打折扣',
          '保持“做卷—复盘”的先后关系，互补推进',
        ],
        guidelines: '这一阶段，你原有的“每套肖八用两天”方案很适合非模考日与模考日交替的节奏。非模考日负责推进新卷，模考日负责巩固与回顾，形成互补。如果你实际的模考安排不是严格隔天交替，就不要强求一套卷恰好对应两天。保持“做卷—复盘”的先后关系即可。',
      };
    } else {
      return {
        phaseId: 'phase2',
        phaseTitle: '肖八第一轮',
        dateRange: '11月06日 — 11月21日',
        dayType: 'math_mock',
        dayTypeLabel: '数学模考日',
        title: '复盘前一套肖八错题，回到手册查漏补缺',
        durationRange: '40～60 分钟',
        durationMinutes: 50,
        goal: '复盘前一套肖八错题，回到手册查漏补缺',
        tableData: [
          {
            scheduleType: '数学非模考日',
            task: '完成一套肖八选择题，限时训练后订正',
            duration: '60～90 分钟',
          },
          {
            scheduleType: '数学模考日',
            task: '复盘前一套肖八错题，回到手册查漏补缺',
            duration: '40～60 分钟',
          },
          {
            scheduleType: '两日循环结束',
            task: '回顾反复出错的知识点，必要时补做小程序题',
            duration: '10～15 分钟，可并入当日',
          },
        ],
        steps: [
          {
            duration: '35 min',
            title: '错题二刷与翻书查漏',
            detail: '遮住前一日做错题目的解析，重新在白纸上思考判断；针对死穴知识点通读手册对应小节。',
          },
          {
            duration: '15 min',
            title: '两日循环收尾',
            detail: '回顾反复出错的知识点，必要时补做 5~10 道小程序题，确保该套试卷彻底过关。',
          },
        ],
        keyDirectives: [
          '模考日负责巩固与回顾，绝不硬开新卷',
          '两日循环结束：回顾反复出错的知识点，必要时补做小程序题（10～15 分钟，可并入当日）',
          '一套肖八选择题如果做完后没有充分分析错项，下一套的收益会大打折扣',
        ],
        guidelines: '这一阶段，你原有的“每套肖八用两天”方案很适合非模考日与模考日交替的节奏。非模考日负责推进新卷，模考日负责巩固与回顾，形成互补。',
      };
    }
  }

  // 3. 第三阶段：11月22日 — 11月30日
  if (date >= '2026-11-22' && date <= '2026-11-30') {
    const isWeeklyCheckDay = date === '2026-11-22' || date === '2026-11-29';
    if (isWeeklyCheckDay) {
      return {
        phaseId: 'phase3',
        phaseTitle: '巩固选择题',
        dateRange: '11月22日 — 11月30日',
        dayType: 'weekly_check',
        dayTypeLabel: '每周抽查日',
        title: '每周至少一次：随机抽取一组选择题，检查错误是否真正解决',
        durationRange: '50–70 分钟',
        durationMinutes: 60,
        goal: '随机抽取一组选择题，检查之前的错误是否真正解决',
        steps: [
          {
            duration: '30 min',
            title: '随机错题抽检',
            detail: '从肖八之前做错的题目中随机抽选 15-20 题，闭卷重新作答。',
          },
          {
            duration: '30 min',
            title: '检验核对与深挖',
            detail: '核对抽检结果，若仍有错题，立即在手册中用红笔重度标记，安排睡前回顾。',
          },
        ],
        keyDirectives: [
          '这个阶段不建议继续大量扩充新资料，而应重点解决重复错误',
          '每周至少一次：随机抽取一组选择题，检查之前的错误是否真正解决',
          '这一阶段可以适当降低技巧课的时间占比，把时间转移到主动回忆和错题复做上',
        ],
      };
    } else if (!isMathMock) {
      return {
        phaseId: 'phase3',
        phaseTitle: '巩固选择题',
        dateRange: '11月22日 — 11月30日',
        dayType: 'math_non_mock',
        dayTypeLabel: '非模考日',
        title: '集中复盘肖八错题，按马原、史纲、毛中特、思修、时政分类整理',
        durationRange: '60–80 分钟',
        durationMinutes: 70,
        goal: '集中复盘肖八错题，按学科分类整理',
        steps: [
          {
            duration: '45 min',
            title: '分类错题专项过筛',
            detail: '按马原/史纲/毛中特/思修/时政分类排查肖八错题，找出共性失分考点。',
          },
          {
            duration: '25 min',
            title: '主动回忆与公式化记忆',
            detail: '合上手册在草稿纸上默写重要时间节点、核心著作、会议决议及易混淆哲学范畴。',
          },
        ],
        keyDirectives: [
          '不建议继续大量扩充新资料，重点解决重复错误',
          '降低技巧课时间占比，把时间转移到主动回忆和错题复做上',
        ],
      };
    } else {
      return {
        phaseId: 'phase3',
        phaseTitle: '巩固选择题',
        dateRange: '11月22日 — 11月30日',
        dayType: 'math_mock',
        dayTypeLabel: '模考日',
        title: '小程序维持手感，复习当天最容易遗忘的 2～3 个知识点',
        durationRange: '30–45 分钟',
        durationMinutes: 40,
        goal: '小程序维持手感，复习当天最容易遗忘的 2～3 个知识点',
        steps: [
          {
            duration: '20 min',
            title: '小程序维持手感',
            detail: '利用零碎或模考后时间刷 10-15 题小程序，保持手感。',
          },
          {
            duration: '20 min',
            title: '定向攻坚 2~3 个遗忘点',
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

  // 4. 第四阶段：12月1日 — 12月18日
  if (date >= '2026-12-01' && date <= '2026-12-18') {
    const isPostRound1 = date >= '2026-12-14';
    if (isPostRound1) {
      return {
        phaseId: 'phase4',
        phaseTitle: '肖四背诵优先',
        dateRange: '12月01日 — 12月18日',
        dayType: 'post_round1',
        dayTypeLabel: '肖四首轮完成后',
        title: '闭卷回忆、检查遗漏、集中补薄弱题',
        durationRange: '60～90 分钟',
        durationMinutes: 75,
        goal: '肖四首轮完成后：闭卷回忆、检查遗漏、集中补薄弱题',
        tableData: [
          {
            scheduleType: '数学非模考日',
            task: '新主观题背诵 + 旧内容回忆 + 选择题复盘',
            duration: '80～90 分钟',
          },
          {
            scheduleType: '数学模考日',
            task: '复述已学主观题框架 + 小程序或错题复习',
            duration: '40～60 分钟',
          },
          {
            scheduleType: '肖四首轮完成后',
            task: '闭卷回忆、检查遗漏、集中补薄弱题',
            duration: '视情况安排 60～90 分钟',
          },
        ],
        steps: [
          {
            duration: '40 min',
            title: '主观题闭卷框架回忆',
            detail: '对着肖四各大题题干，在白纸上写出采分点关键词与核心金句。',
          },
          {
            duration: '35 min',
            title: '查漏补缺与薄弱题集中突破',
            detail: '对照标准答案查漏，专门攻克背得不顺的第34题马原或第38题当代大题。',
          },
        ],
        keyDirectives: [
          '肖四首轮完成后：闭卷回忆、检查遗漏、集中补薄弱题（视情况安排 60～90 分钟）',
          '主观题记忆依赖间隔复习，考前反复滚动',
        ],
        guidelines: '这里需要强调一点：不要把肖四主观题背诵理解为只在非模考日进行。主观题记忆依赖间隔复习，模考日也应该抽出 10～20 分钟回忆前一天背过的内容。另外，肖四的实际上市时间可能影响上述节奏。如果到手较晚，应优先完成肖四主观题的首轮学习和反复回忆，而不是为了维持原计划去压缩睡眠。',
      };
    } else if (!isMathMock) {
      return {
        phaseId: 'phase4',
        phaseTitle: '肖四背诵优先',
        dateRange: '12月01日 — 12月18日',
        dayType: 'math_non_mock',
        dayTypeLabel: '数学非模考日',
        title: '新主观题背诵 + 旧内容回忆 + 选择题复盘',
        durationRange: '80–90 分钟',
        durationMinutes: 85,
        goal: '新主观题背诵 + 旧内容回忆 + 选择题复盘',
        tableData: [
          {
            scheduleType: '数学非模考日',
            task: '新主观题背诵 + 旧内容回忆 + 选择题复盘',
            duration: '80～90 分钟',
          },
          {
            scheduleType: '数学模考日',
            task: '复述已学主观题框架 + 小程序或错题复习',
            duration: '40～60 分钟',
          },
          {
            scheduleType: '肖四首轮完成后',
            task: '闭卷回忆、检查遗漏、集中补薄弱题',
            duration: '视情况安排 60～90 分钟',
          },
        ],
        steps: [
          {
            duration: '45 min',
            title: '新主观题集中背诵',
            detail: '大声背诵或口述肖四当天安排的大题标准采分点，记熟大题答题框架。',
          },
          {
            duration: '25 min',
            title: '旧主观题间隔复习',
            detail: '抽出 20-25 分钟回忆前一日背诵过的主观题框架，利用间隔复习对抗遗忘曲线。',
          },
          {
            duration: '15 min',
            title: '选择题保温复盘',
            detail: '快速复习肖四选择题错项或小程序高频错题。',
          },
        ],
        keyDirectives: [
          '肖四到手后，非模考日的集中时段应该逐步转向主观题',
          '不要把肖四主观题背诵理解为只在非模考日进行，主观题记忆依赖间隔复习',
          '如果肖四到手较晚，优先完成主观题首轮学习和反复回忆，不要压缩睡眠',
        ],
        guidelines: '肖四到手后，非模考日的集中时段应该逐步转向主观题。不要把肖四主观题背诵理解为只在非模考日进行。主观题记忆依赖间隔复习，模考日也应该抽出 10～20 分钟回忆前一天背过的内容。',
      };
    } else {
      return {
        phaseId: 'phase4',
        phaseTitle: '肖四背诵优先',
        dateRange: '12月01日 — 12月18日',
        dayType: 'math_mock',
        dayTypeLabel: '数学模考日',
        title: '复述已学主观题框架 + 小程序或错题复习',
        durationRange: '40–60 分钟',
        durationMinutes: 50,
        goal: '复述已学主观题框架 + 小程序或错题复习',
        tableData: [
          {
            scheduleType: '数学非模考日',
            task: '新主观题背诵 + 旧内容回忆 + 选择题复盘',
            duration: '80～90 分钟',
          },
          {
            scheduleType: '数学模考日',
            task: '复述已学主观题框架 + 小程序或错题复习',
            duration: '40～60 分钟',
          },
          {
            scheduleType: '肖四首轮完成后',
            task: '闭卷回忆、检查遗漏、集中补薄弱题',
            duration: '视情况安排 60～90 分钟',
          },
        ],
        steps: [
          {
            duration: '25 min',
            title: '复述主观题框架',
            detail: '模考日抽出 20～25 分钟回忆前一天背过的主观题框架，滚动巩固。',
          },
          {
            duration: '25 min',
            title: '小程序或错题复习',
            detail: '刷 10-15 题小程序或翻看错题本，维持客观题敏感度。',
          },
        ],
        keyDirectives: [
          '模考日也必须抽出 10～20 分钟回忆前一天背过的内容，滚动巩固',
          '数学模考日：复述已学主观题框架 + 小程序或错题复习（40～60 分钟）',
        ],
        guidelines: '这里需要强调一点：不要把肖四主观题背诵理解为只在非模考日进行。主观题记忆依赖间隔复习，模考日也应该抽出 10～20 分钟回忆前一天背过的内容。',
      };
    }
  }

  // 5. 12月19日 — 12月20日 考研初试
  if (date >= '2026-12-19') {
    return {
      phaseId: 'exam',
      phaseTitle: '考研初试',
      dateRange: '12月19日 — 12月20日',
      dayType: 'math_mock',
      dayTypeLabel: '统考决战',
      title: date === '2026-12-19' ? '考前定心：翻阅肖四肖八核心主观题框架' : '政治统考大决战（上午 08:30—11:30）',
      durationRange: date === '2026-12-19' ? '60 分钟' : '180 分钟',
      durationMinutes: date === '2026-12-19' ? 60 : 180,
      goal: '沉着应考，字迹工整，写满答题卡采分点，一战成硕！',
      steps: [
        {
          duration: date === '2026-12-19' ? '60 min' : '180 min',
          title: date === '2026-12-19' ? '核心金句定心浏览' : '全卷实战',
          detail: date === '2026-12-19' ? '翻看核心框架，不钻牛角尖，早点休息储备精力。' : '上午 08:30—11:30 严格按照考场作息答卷，主观题序号清晰采分点突出！',
        },
      ],
      keyDirectives: [
        '字迹工整，分点作答，重点术语顶格写',
        '平稳呼吸，发挥平生所学，必拔头筹！',
      ],
    };
  }

  // 6. 10月30日之前的早期保温阶段
  return {
    phaseId: 'early',
    phaseTitle: '基础保温与手册阅读',
    dateRange: '10月08日 — 10月29日',
    dayType: 'math_non_mock',
    dayTypeLabel: '日常保温',
    title: '背诵手册对应章节阅读 + 小程序每日刷题',
    durationRange: '40–50 分钟',
    durationMinutes: 50,
    goal: '通读考点手册，做配套基础选择题，维持手感',
    steps: [
      {
        duration: '20 min',
        title: '手册翻阅',
        detail: '翻看背诵手册对应章节重点，用荧光笔勾勒关键词。',
      },
      {
        duration: '30 min',
        title: '小程序刷题',
        detail: '小程序完成 15～20 题，做完及时订正错项。',
      },
    ],
    keyDirectives: [
      '保持每天动笔，平稳迎接 10 月 30 日系统恢复知识框架！',
    ],
  };
}
