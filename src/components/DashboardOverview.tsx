import React, { useState } from 'react';
import { DayPlan, EnglishWeekPlan, PoliticsWeekPlan, NoteSubjectTrack } from '../types/kaoyan';
import { BOOST_QUOTES } from '../data/mindsetCards';
import {
  ENGLISH_CATEGORY_LABELS,
  getEnglishWeekForDate,
  getEnglishMockForDate,
} from '../data/englishScheduleData';
import {
  POLITICS_CATEGORY_LABELS,
  getPoliticsWeekForDate,
} from '../data/politicsScheduleData';
import { getChinaDateInfo } from '../utils/chinaDate';
import { getIsolatedNoteForSubject } from './DailyTimeline';
import {
  Flame,
  CheckCircle2,
  Circle,
  Clock,
  ArrowRight,
  RefreshCw,
  Edit3,
  BookMarked,
  Sparkles,
  Layers,
  BookmarkCheck,
  StickyNote,
  Table,
  Zap,
  Languages,
  BookOpen,
  ClipboardCheck,
} from 'lucide-react';
import { desktopNotificationManager } from '../utils/desktopNotification';

interface DashboardOverviewProps {
  currentDayPlan: DayPlan;
  allPlans: DayPlan[];
  englishWeeks: EnglishWeekPlan[];
  politicsWeeks: PoliticsWeekPlan[];
  todayDateStr?: string;
  onSelectDay: (date: string) => void;
  onJumpToToday?: () => void;
  onToggleMathComplete: (taskId: string) => void;
  onToggleCsComplete: (taskId: string) => void;
  onToggleEnglishComplete?: (date: string) => void;
  onTogglePoliticsComplete?: (date: string) => void;
  onToggleEnglishSubTask: (weekId: string, subTaskId: string) => void;
  onTogglePoliticsSubTask: (weekId: string, subTaskId: string) => void;
  onTogglePoliticsAcceptance: (weekId: string, criteriaId: string) => void;
  onSaveSubjectNote: (date: string, subject: NoteSubjectTrack, notes: string) => void;
  onSaveEnglishWeekNote: (weekId: string, notes: string) => void;
  onSavePoliticsWeekNote: (weekId: string, notes: string) => void;
  onSaveDayNotes: (date: string, notes: string) => void;
  onNavigateToTab: (tab: 'timeline' | 'workstation' | 'mindset') => void;
  onNavigateToEnglishTimeline: () => void;
  onNavigateToPoliticsTimeline: () => void;
  onOpenEditModal: (plan: DayPlan, subjectTab?: 'math2' | 'cs' | 'english' | 'politics') => void;
  onOpenEnglishWeekEditModal: (weekPlan: EnglishWeekPlan) => void;
  onOpenPoliticsWeekEditModal: (weekPlan: PoliticsWeekPlan) => void;
  daysToExam: number;
  daysToMathPastPapers: number;
  daysToCsPastPapers: number;
  daysToXiao8: number;
}

// User's verbatim daily execution schedule
export interface ScheduleSlot {
  id: string;
  timeRange: string;
  subjectTitle: string;
  subjectCategory: 'math' | 'cs' | 'english' | 'politics' | 'rest';
  titleTone?: 'red' | 'orange' | 'green' | 'cyan';
  isKeyChange?: boolean;
  badge: string;
  content: string;
  startMinutes: number;
  endMinutes: number;
}

// 模考日作息时刻表 (Mock Day)
export const MOCK_SCHEDULE_SLOTS: ScheduleSlot[] = [
  {
    id: 'mock-slot-1',
    timeRange: '07:15 – 08:00',
    subjectTitle: '起床 / 洗漱 / 早餐 / 通勤',
    subjectCategory: 'rest',
    badge: '生物钟启动',
    content: '7:45前完成咖啡因摄入；通勤路上见光唤醒大脑。',
    startMinutes: 7 * 60 + 15,
    endMinutes: 8 * 60,
  },
  {
    id: 'mock-slot-2',
    timeRange: '08:00 – 08:30',
    subjectTitle: '英语早读 (0.5h)',
    subjectCategory: 'english',
    badge: '大脑开机',
    content: '仅背诵英语二大小作文模板、核心高频词，为大脑开机。',
    startMinutes: 8 * 60,
    endMinutes: 8 * 60 + 30,
  },
  {
    id: 'mock-slot-3',
    timeRange: '08:30 – 11:30',
    subjectTitle: '数学二全真模考 (3h)',
    subjectCategory: 'math',
    titleTone: 'red',
    badge: '全真模考·重中之重',
    content: '严格卡表3小时，期间不翻书、不看手机。',
    startMinutes: 8 * 60 + 30,
    endMinutes: 11 * 60 + 30,
  },
  {
    id: 'mock-slot-4',
    timeRange: '11:30 – 12:15',
    subjectTitle: '数学即时复盘 (0.75h)',
    subjectCategory: 'math',
    titleTone: 'orange',
    isKeyChange: true,
    badge: '关键改动·趁热打铁',
    content:
      '趁热对答案，必须在这45分钟内搞定所有选填错题和中档计算错题，只留1-2道压轴难题到傍晚。',
    startMinutes: 11 * 60 + 30,
    endMinutes: 12 * 60 + 15,
  },
  {
    id: 'mock-slot-5',
    timeRange: '12:15 – 13:30',
    subjectTitle: '午餐 + 强制午休 (1.25h)',
    subjectCategory: 'rest',
    titleTone: 'green',
    badge: '强制午休蓄能',
    content: '12:50前吃完饭，12:55定闹钟午休25-30分钟，13:25起并用冷水洗脸。',
    startMinutes: 12 * 60 + 15,
    endMinutes: 13 * 60 + 30,
  },
  {
    id: 'mock-slot-6',
    timeRange: '13:30 – 14:00',
    subjectTitle: '英语二轻度训练 (0.5h)',
    subjectCategory: 'english',
    badge: '大脑预热缓冲',
    content: '做1篇完形填空或新题型，作为午睡后到408模考前的“大脑预热缓冲”。',
    startMinutes: 13 * 60 + 30,
    endMinutes: 14 * 60,
  },
  {
    id: 'mock-slot-7',
    timeRange: '14:00 – 17:00',
    subjectTitle: '408全真模考 (3h)',
    subjectCategory: 'cs',
    titleTone: 'cyan',
    isKeyChange: true,
    badge: '关键改动·3h取舍训练',
    content: '原计划4h太长，考场只有3h。必须训练在3小时内完成408套卷的取舍能力。',
    startMinutes: 14 * 60,
    endMinutes: 17 * 60,
  },
  {
    id: 'mock-slot-8',
    timeRange: '17:00 – 17:45',
    subjectTitle: '408选择题即时复盘 (0.75h)',
    subjectCategory: 'cs',
    titleTone: 'orange',
    badge: '40道选择速查',
    content: '考完立刻批改，45分钟内把40道选择题的错因快速过一遍。',
    startMinutes: 17 * 60,
    endMinutes: 17 * 60 + 45,
  },
  {
    id: 'mock-slot-9',
    timeRange: '17:45 – 18:30',
    subjectTitle: '晚餐 + 碎片刷题 (0.75h)',
    subjectCategory: 'politics',
    badge: '政治碎片刷题',
    content: '吃饭排队、散步回自习室期间，用手机小程序刷政治选择题（消灭原23:30的任务）。',
    startMinutes: 17 * 60 + 45,
    endMinutes: 18 * 60 + 30,
  },
  {
    id: 'mock-slot-10',
    timeRange: '18:30 – 19:30',
    subjectTitle: '408大题复盘与追赶 (1.75h)',
    subjectCategory: 'cs',
    titleTone: 'cyan',
    badge: '7道大题专项追赶',
    content: '集中火力复盘下午模考的7道大题，并针对暴露出的薄弱章节进行专项追赶。',
    startMinutes: 18 * 60 + 30,
    endMinutes: 19 * 60 + 30,
  },
  {
    id: 'mock-slot-11',
    timeRange: '19:30 – 21:15',
    subjectTitle: '数学深度复盘收尾 (1h)',
    subjectCategory: 'math',
    titleTone: 'red',
    badge: '压轴难题结清',
    content: '攻克上午遗留的1-2道压轴大题，归纳题型方法，数学任务彻底结清。',
    startMinutes: 19 * 60 + 30,
    endMinutes: 21 * 60 + 15,
  },
  {
    id: 'mock-slot-12',
    timeRange: '21:15 – 22:30',
    subjectTitle: '降频记忆块 (1.25h)',
    subjectCategory: 'politics',
    titleTone: 'green',
    isKeyChange: true,
    badge: '关键改动·21:15降频',
    content:
      '21:15后严禁推演数学和408复杂逻辑！此时间段用于：政治分析题背诵 + 408纯概念背诵（OS/计网）+ 政治错题回顾。',
    startMinutes: 21 * 60 + 15,
    endMinutes: 22 * 60 + 30,
  },
  {
    id: 'mock-slot-13',
    timeRange: '22:30',
    subjectTitle: '准时收书离场',
    subjectCategory: 'rest',
    titleTone: 'red',
    badge: '23:30闭眼入睡',
    content: '21:00左右在自习室吃一点垫肚子的食物；回寝后只洗漱不进食，23:30闭眼。',
    startMinutes: 22 * 60 + 30,
    endMinutes: 24 * 60,
  },
];

// 复盘日（非模考日）作息时刻表 (Review / Non-Mock Day)
export const NON_MOCK_SCHEDULE_SLOTS: ScheduleSlot[] = [
  {
    id: 'nonmock-slot-1',
    timeRange: '07:15 – 08:00',
    subjectTitle: '起床 / 洗漱 / 早餐 / 通勤',
    subjectCategory: 'rest',
    badge: '生物钟一致',
    content: '同模考日，保持生物钟绝对一致。',
    startMinutes: 7 * 60 + 15,
    endMinutes: 8 * 60,
  },
  {
    id: 'nonmock-slot-2',
    timeRange: '08:00 – 08:30',
    subjectTitle: '政治 / 英语早读 (0.5h)',
    subjectCategory: 'politics',
    badge: '早读唤醒',
    content: '朗读背诵政治核心考点或英语范文。',
    startMinutes: 8 * 60,
    endMinutes: 8 * 60 + 30,
  },
  {
    id: 'nonmock-slot-3',
    timeRange: '08:30 – 11:30',
    subjectTitle: '数学专项攻坚 (3h)',
    subjectCategory: 'math',
    titleTone: 'red',
    badge: '薄弱板块集中刷题',
    content: '针对薄弱板块（如高数中值定理、微分方程、线代二次型）集中刷题与二刷错题。',
    startMinutes: 8 * 60 + 30,
    endMinutes: 11 * 60 + 30,
  },
  {
    id: 'nonmock-slot-4',
    timeRange: '11:30 – 12:15',
    subjectTitle: '数学上午总结 + 英语阅读 (0.75h)',
    subjectCategory: 'english',
    badge: '15m收尾 + 25m阅读',
    content: '花15分钟收尾上午数学；随后限时25分钟做1篇英语二阅读并对答案。',
    startMinutes: 11 * 60 + 30,
    endMinutes: 12 * 60 + 15,
  },
  {
    id: 'nonmock-slot-5',
    timeRange: '12:15 – 13:30',
    subjectTitle: '午餐 + 强制午休 (1.25h)',
    subjectCategory: 'rest',
    titleTone: 'green',
    badge: '强制午休蓄能',
    content: '严格执行30分钟午休，为下午的408蓄能。',
    startMinutes: 12 * 60 + 15,
    endMinutes: 13 * 60 + 30,
  },
  {
    id: 'nonmock-slot-6',
    timeRange: '13:30 – 14:30',
    subjectTitle: '英语二核心块 (1h)',
    subjectCategory: 'english',
    badge: '精读·翻译·作文',
    content: '精读上午的阅读错题 + 翻译训练或作文实战默写。',
    startMinutes: 13 * 60 + 30,
    endMinutes: 14 * 60 + 30,
  },
  {
    id: 'nonmock-slot-7',
    timeRange: '14:30 – 17:45',
    subjectTitle: '408主力追赶块 (3.25h)',
    subjectCategory: 'cs',
    titleTone: 'cyan',
    badge: '高分值硬骨头',
    content: '啃硬骨头时间：专门攻克数据结构算法题、计组大题、OS的PV操作等高分值模块。',
    startMinutes: 14 * 60 + 30,
    endMinutes: 17 * 60 + 45,
  },
  {
    id: 'nonmock-slot-8',
    timeRange: '17:45 – 18:30',
    subjectTitle: '晚餐 + 政治刷题 (0.75h)',
    subjectCategory: 'politics',
    badge: '碎片刷选择题',
    content: '同样利用晚餐前后的碎片时间，在手机上完成当日的政治选择题刷题量。',
    startMinutes: 17 * 60 + 45,
    endMinutes: 18 * 60 + 30,
  },
  {
    id: 'nonmock-slot-9',
    timeRange: '18:30 – 20:00',
    subjectTitle: '数学查漏补缺 (1.5h)',
    subjectCategory: 'math',
    titleTone: 'red',
    isKeyChange: true,
    badge: '关键改动·大幅提前',
    content: '把原定20:30-22:00的数学大幅提前！此时精力尚可，用于重做近期模考卷的错题。',
    startMinutes: 18 * 60 + 30,
    endMinutes: 20 * 60,
  },
  {
    id: 'nonmock-slot-10',
    timeRange: '20:00 – 21:15',
    subjectTitle: '408真题二刷/次重点 (1.25h)',
    subjectCategory: 'cs',
    titleTone: 'cyan',
    badge: '高频中档题巩固',
    content: '处理408历年真题中的高频中档题，巩固下午所学。',
    startMinutes: 20 * 60,
    endMinutes: 21 * 60 + 15,
  },
  {
    id: 'nonmock-slot-11',
    timeRange: '21:15 – 22:30',
    subjectTitle: '政治大题 + 408背诵 (1.25h)',
    subjectCategory: 'politics',
    titleTone: 'green',
    isKeyChange: true,
    badge: '关键改动·大脑降频',
    content: '大脑降频。集中背诵政治分析题、复盘傍晚刷错的政治选择题，以及默写408简答题概念。',
    startMinutes: 21 * 60 + 15,
    endMinutes: 22 * 60 + 30,
  },
  {
    id: 'nonmock-slot-12',
    timeRange: '22:30',
    subjectTitle: '准时收书离场',
    subjectCategory: 'rest',
    titleTone: 'red',
    badge: '停止脑力活动',
    content: '停止一切脑力活动，回寝洗漱，准备入睡。',
    startMinutes: 22 * 60 + 30,
    endMinutes: 24 * 60,
  },
];

type DashboardNoteTab = 'math' | 'cs' | 'politics' | 'english';

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  currentDayPlan,
  allPlans,
  englishWeeks,
  politicsWeeks,
  todayDateStr,
  onToggleMathComplete,
  onToggleCsComplete,
  onToggleEnglishSubTask,
  onTogglePoliticsSubTask,
  onTogglePoliticsAcceptance,
  onSaveSubjectNote,
  onSaveEnglishWeekNote,
  onSavePoliticsWeekNote,
  onNavigateToTab,
  onNavigateToEnglishTimeline,
  onNavigateToPoliticsTimeline,
  onOpenEditModal,
  onOpenEnglishWeekEditModal,
  onOpenPoliticsWeekEditModal,
}) => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [activeNoteTab, setActiveNoteTab] = useState<DashboardNoteTab>('math');

  const { weekPlan: currentEnglishWeek, status: englishWeekStatus } = getEnglishWeekForDate(
    currentDayPlan.date,
    englishWeeks
  );
  const todayEnglishMock = getEnglishMockForDate(currentDayPlan.date, englishWeeks);

  const { weekPlan: currentPoliticsWeek, status: politicsWeekStatus } = getPoliticsWeekForDate(
    currentDayPlan.date,
    politicsWeeks
  );

  const getCurrentTabNoteValue = (tab: DashboardNoteTab): string => {
    if (tab === 'english') {
      return currentEnglishWeek.weeklyNote || '';
    }
    if (tab === 'politics') {
      return currentPoliticsWeek.weeklyNote || '';
    }
    return getIsolatedNoteForSubject(currentDayPlan, tab);
  };

  const [noteContent, setNoteContent] = useState<string>(() => getCurrentTabNoteValue('math'));
  const [isNoteSaved, setIsNoteSaved] = useState(false);
  const [scheduleViewMode, setScheduleViewMode] = useState<'table' | 'cards'>('table');
  const [scheduleMode, setScheduleMode] = useState<'mock' | 'non_mock'>(() => {
    return desktopNotificationManager.getScheduleMode();
  });

  const handleScheduleModeChange = (mode: 'mock' | 'non_mock') => {
    setScheduleMode(mode);
    desktopNotificationManager.setScheduleMode(mode);
  };

  const activeSlots = scheduleMode === 'mock' ? MOCK_SCHEDULE_SLOTS : NON_MOCK_SCHEDULE_SLOTS;

  const chinaNow = getChinaDateInfo();
  const currentMinutes = chinaNow.hour * 60 + chinaNow.minute;

  // Keep noteContent synced when day, week, or activeNoteTab changes
  React.useEffect(() => {
    setNoteContent(getCurrentTabNoteValue(activeNoteTab));
  }, [
    activeNoteTab,
    currentDayPlan.date,
    currentDayPlan.mathNote,
    currentDayPlan.csNote,
    currentDayPlan.dailyNote,
    currentEnglishWeek.id,
    currentEnglishWeek.weeklyNote,
    currentPoliticsWeek.id,
    currentPoliticsWeek.weeklyNote,
  ]);

  const nextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % BOOST_QUOTES.length);
  };

  const handleSaveNote = () => {
    if (activeNoteTab === 'english') {
      onSaveEnglishWeekNote(currentEnglishWeek.id, noteContent);
    } else if (activeNoteTab === 'politics') {
      onSavePoliticsWeekNote(currentPoliticsWeek.id, noteContent);
    } else {
      onSaveSubjectNote(currentDayPlan.date, activeNoteTab, noteContent);
    }
    setIsNoteSaved(true);
    setTimeout(() => setIsNoteSaved(false), 2000);
  };

  // Calculate overall stats across all 4 subjects
  const totalMathTasks = allPlans.filter((p) => p.math2Task).length;
  const completedMathTasks = allPlans.filter((p) => p.math2Task?.isCompleted).length;
  const mathPercent =
    totalMathTasks > 0 ? Math.round((completedMathTasks / totalMathTasks) * 100) : 0;

  const totalCsTasks = allPlans.filter((p) => p.csTask).length;
  const completedCsTasks = allPlans.filter((p) => p.csTask?.isCompleted).length;
  const csPercent = totalCsTasks > 0 ? Math.round((completedCsTasks / totalCsTasks) * 100) : 0;

  // Politics 7-Week stats
  const totalPoliticsSubTasks = politicsWeeks.reduce((acc, w) => acc + w.subTasks.length, 0);
  const completedPoliticsSubTasks = politicsWeeks.reduce(
    (acc, w) => acc + w.subTasks.filter((t) => t.isCompleted).length,
    0
  );
  const politicsPercent =
    totalPoliticsSubTasks > 0
      ? Math.round((completedPoliticsSubTasks / totalPoliticsSubTasks) * 100)
      : 0;

  const currentPoliticsWeekTotalSub = currentPoliticsWeek.subTasks.length;
  const currentPoliticsWeekDoneSub = currentPoliticsWeek.subTasks.filter((t) => t.isCompleted).length;
  const currentPoliticsWeekPct =
    currentPoliticsWeekTotalSub > 0
      ? Math.round((currentPoliticsWeekDoneSub / currentPoliticsWeekTotalSub) * 100)
      : 0;

  const currentPoliticsWeekTotalAcc = currentPoliticsWeek.acceptanceCriteria.length;
  const currentPoliticsWeekDoneAcc = currentPoliticsWeek.acceptanceCriteria.filter(
    (a) => a.isCompleted
  ).length;

  // English 7-Week stats
  const totalEnglishSubTasks = englishWeeks.reduce((acc, w) => acc + w.subTasks.length, 0);
  const completedEnglishSubTasks = englishWeeks.reduce(
    (acc, w) => acc + w.subTasks.filter((t) => t.isCompleted).length,
    0
  );
  const englishPercent =
    totalEnglishSubTasks > 0
      ? Math.round((completedEnglishSubTasks / totalEnglishSubTasks) * 100)
      : 0;

  const currentWeekTotalSub = currentEnglishWeek.subTasks.length;
  const currentWeekDoneSub = currentEnglishWeek.subTasks.filter((t) => t.isCompleted).length;
  const currentWeekPct =
    currentWeekTotalSub > 0 ? Math.round((currentWeekDoneSub / currentWeekTotalSub) * 100) : 0;

  // Helper for slot category styling
  const getSubjectBadgeStyle = (category: ScheduleSlot['subjectCategory']) => {
    switch (category) {
      case 'math':
        return 'bg-amber-500/20 text-amber-300 border border-amber-500/40';
      case 'cs':
        return 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40';
      case 'english':
        return 'bg-teal-500/20 text-teal-300 border border-teal-500/40';
      case 'politics':
        return 'bg-rose-500/15 text-rose-300 border border-rose-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Master Calligraphy Header Banner */}
      <section className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-r from-stone-950 via-slate-950 to-stone-950 py-8 sm:py-12 md:py-14 lg:py-16 px-4 sm:px-8 shadow-2xl flex flex-col items-center justify-center text-center select-none group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.16),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center space-y-3 max-w-full">
          <h1 className="whitespace-nowrap text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.25rem] font-normal tracking-[0.08em] sm:tracking-[0.14em] md:tracking-[0.18em] text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-400 drop-shadow-[0_4px_24px_rgba(245,158,11,0.32)] font-['Liu_Jian_Mao_Cao','Zhi_Mang_Xing','Ma_Shan_Zheng','STKaiti','KaiTi',cursive,serif] leading-tight transition-transform duration-500 group-hover:scale-[1.01] px-2">
            他山之石，可以攻玉
          </h1>

          <div className="flex items-center gap-2 pt-1 text-xs sm:text-sm text-amber-300/60 font-['STKaiti','KaiTi',serif] tracking-widest">
            <span className="inline-block w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-amber-500/50" />
            <span>《诗经·小雅·鹤鸣》</span>
            <span className="inline-block w-8 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-amber-500/50" />
          </div>
        </div>
      </section>

      {/* 2. Verbatim Daily Schedule Table */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                <h2 className="text-base font-bold text-white font-['Plus_Jakarta_Sans',sans-serif]">
                  战时每日执行时刻表 (Daily Battle Timeboxing)
                </h2>

                <div className="inline-flex items-center p-0.5 rounded-lg bg-slate-950 border border-slate-800 text-xs shadow-inner">
                  <button
                    onClick={() => handleScheduleModeChange('mock')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                      scheduleMode === 'mock'
                        ? 'bg-amber-500 text-slate-950 shadow-sm shadow-amber-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <span>📝 模考日</span>
                  </button>
                  <button
                    onClick={() => handleScheduleModeChange('non_mock')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                      scheduleMode === 'non_mock'
                        ? 'bg-amber-500 text-slate-950 shadow-sm shadow-amber-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <span>📖 复盘日 (非模考)</span>
                  </button>
                </div>

                <span
                  className={`text-[11px] font-mono px-2 py-0.5 rounded-full border font-semibold flex items-center gap-1 ${
                    scheduleMode === 'mock'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  }`}
                >
                  {scheduleMode === 'mock' ? '模考日作息 · 提醒联动' : '复盘日作息 · 提醒联动'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {scheduleMode === 'mock'
                  ? '模考日节奏：上午数二3h全真模考 + 45m即时复盘，强制午休，下午408严格3h全真模考；21:15后大脑降频，22:30准时收书离场。'
                  : '复盘日的核心是弥补进度落后，把大块的高强度时间给数学和408的薄弱模块，同时同样遵守21:15后的降频原则与22:30离场。'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono tabular-nums text-emerald-400">
              <span className="inline-block rounded-full h-2 w-2 bg-emerald-500" />
              <span>东八区当前: {chinaNow.timeStr}</span>
            </div>

            <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-lg p-1 text-xs">
              <button
                onClick={() => setScheduleViewMode('table')}
                className={`flex items-center gap-1 px-2 py-1 rounded font-medium transition-colors cursor-pointer ${
                  scheduleViewMode === 'table'
                    ? 'bg-slate-800 text-amber-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Table className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">表格版</span>
              </button>
              <button
                onClick={() => setScheduleViewMode('cards')}
                className={`flex items-center gap-1 px-2 py-1 rounded font-medium transition-colors cursor-pointer ${
                  scheduleViewMode === 'cards'
                    ? 'bg-slate-800 text-amber-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">时序卡</span>
              </button>
            </div>
          </div>
        </div>

        {scheduleViewMode === 'table' ? (
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-950 text-slate-300 border-b border-slate-800 font-semibold">
                  <th className="py-3 px-3.5 whitespace-nowrap min-w-[125px]">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <span>时间段</span>
                    </span>
                  </th>
                  <th className="py-3 px-3.5 whitespace-nowrap min-w-[190px]">
                    <span>科目安排与执行动作</span>
                  </th>
                  <th className="py-3 px-4 min-w-[320px]">
                    <span>改造逻辑与刚性要求</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 text-slate-300">
                {activeSlots.map((slot) => {
                  const isNow =
                    currentMinutes >= slot.startMinutes && currentMinutes < slot.endMinutes;
                  const titleToneClass =
                    slot.titleTone === 'red'
                      ? 'text-rose-300'
                      : slot.titleTone === 'orange'
                      ? 'text-orange-300'
                      : slot.titleTone === 'green'
                      ? 'text-emerald-300'
                      : slot.titleTone === 'cyan'
                      ? 'text-cyan-300'
                      : 'text-white';
                  return (
                    <tr
                      key={slot.id}
                      className={`transition-colors ${
                        isNow
                          ? 'bg-amber-500/10 hover:bg-amber-500/15 font-medium'
                          : 'hover:bg-slate-800/40'
                      }`}
                    >
                      <td className="py-3 px-3.5 align-top whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          <span
                            className={`font-mono tabular-nums font-bold ${
                              isNow ? 'text-amber-300' : 'text-slate-200'
                            }`}
                          >
                            {slot.timeRange}
                          </span>
                          {isNow && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-800/60 px-1.5 py-0.2 rounded w-fit">
                              <Zap className="h-2.5 w-2.5" /> 正在进行
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3 px-3.5 align-top">
                        <div className="space-y-1">
                          <div className={`font-bold text-xs sm:text-sm ${titleToneClass}`}>
                            {slot.subjectTitle}
                          </div>
                          <span
                            className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-mono font-medium ${getSubjectBadgeStyle(
                              slot.subjectCategory
                            )}`}
                          >
                            {slot.badge}
                          </span>
                        </div>
                      </td>

                      <td className="py-3 px-4 align-top leading-relaxed text-slate-300 text-xs">
                        <p>
                          {slot.isKeyChange && (
                            <span className="text-amber-300 font-bold mr-1">关键改动：</span>
                          )}
                          {slot.content}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {activeSlots.map((slot) => {
              const isNow =
                currentMinutes >= slot.startMinutes && currentMinutes < slot.endMinutes;
              const titleToneClass =
                slot.titleTone === 'red'
                  ? 'text-rose-300'
                  : slot.titleTone === 'orange'
                  ? 'text-orange-300'
                  : slot.titleTone === 'green'
                  ? 'text-emerald-300'
                  : slot.titleTone === 'cyan'
                  ? 'text-cyan-300'
                  : 'text-white';
              return (
                <div
                  key={slot.id}
                  className={`rounded-xl border p-3.5 space-y-2 transition-all ${
                    isNow
                      ? 'border-amber-500/80 bg-amber-500/10 shadow-md shadow-amber-950/30 ring-1 ring-amber-500/50'
                      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono tabular-nums text-xs font-bold text-amber-400">
                      {slot.timeRange}
                    </span>
                    {isNow ? (
                      <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                        <Zap className="h-3 w-3" /> 正在进行
                      </span>
                    ) : (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-medium ${getSubjectBadgeStyle(
                          slot.subjectCategory
                        )}`}
                      >
                        {slot.badge}
                      </span>
                    )}
                  </div>

                  <h3 className={`text-sm font-bold ${titleToneClass}`}>{slot.subjectTitle}</h3>

                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                    {slot.isKeyChange && (
                      <span className="text-amber-300 font-bold mr-1">关键改动：</span>
                    )}
                    {slot.content}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60 gap-2">
          <span className="text-slate-400">
            {scheduleMode === 'mock'
              ? '模考日刚性铁律：上午数二3h + 45m趁热清选填，12:55强制午休，下午408严格3h全真模考，21:15后彻底降频，22:30准时收书离场！'
              : '复盘日刚性铁律：上午数二3h专项攻坚，下午408主力追赶3.25h，18:30提前查漏数学，21:15大脑降频背政治+408概念，22:30准时离场！'}
          </span>
          <button
            onClick={() => onNavigateToTab('workstation')}
            className="text-amber-400 hover:text-amber-300 font-medium underline underline-offset-2 flex items-center gap-1 cursor-pointer"
          >
            <span>进入番茄钟</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </section>

      {/* 5. Today's Action Checklist (Daily Math II + 408 & Weekly Politics + English) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <BookMarked className="h-4 w-4 text-amber-400" />
            <h2 className="text-base font-bold text-white">
              {currentDayPlan.date === todayDateStr
                ? "今日日任务 & 本周动态作战清单 (Today & This Week's Directives)"
                : `${currentDayPlan.formattedDate} 日任务 & 当周清单`}
            </h2>
            {currentDayPlan.date === todayDateStr && (
              <span className="text-[11px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-semibold">
                东八区 · 今日实时代办
              </span>
            )}
            {currentDayPlan.isCustomized && (
              <span className="text-[11px] font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                已个性化定制
              </span>
            )}
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onOpenEditModal(currentDayPlan)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-200 bg-slate-800/90 hover:bg-slate-700/90 hover:text-white border border-slate-700 transition-all cursor-pointer shadow-xs active:scale-95"
              title="自定义与修改此日日程（数二、408）"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
              <span>调整今日数二/408</span>
            </button>
            <span className="text-xs text-amber-300/90 hidden sm:flex items-center gap-1 font-medium">
              <span>完成代办即刻绽放礼炮 🎆</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Math 2 Daily Task Card */}
          {currentDayPlan.math2Task && (
            <div
              className={`rounded-xl border p-4 transition-colors ${
                currentDayPlan.math2Task.isCompleted
                  ? 'border-emerald-800/60 bg-emerald-950/20'
                  : 'border-slate-800 bg-slate-900/60'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <button
                  onClick={() => onToggleMathComplete(currentDayPlan.math2Task!.id)}
                  className="flex items-center gap-2 text-left group cursor-pointer"
                >
                  {currentDayPlan.math2Task.isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                  ) : (
                    <Circle className="h-5 w-5 text-slate-500 group-hover:text-amber-400 shrink-0" />
                  )}
                  <div>
                    <span className="text-xs font-mono font-medium text-amber-400">
                      [数学二 · 按日攻坚] {currentDayPlan.math2Task.phase}
                    </span>
                    <h3
                      className={`text-sm font-semibold text-white ${
                        currentDayPlan.math2Task.isCompleted ? 'line-through text-slate-400' : ''
                      }`}
                    >
                      {currentDayPlan.math2Task.title}
                    </h3>
                  </div>
                </button>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[11px] font-mono text-slate-400">
                    {currentDayPlan.math2Task.suggestedDurationMinutes} 分钟
                  </span>
                  <button
                    onClick={() => onOpenEditModal(currentDayPlan, 'math2')}
                    className="p-1 rounded text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors cursor-pointer"
                    title="修改今日数学任务"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="rounded-lg bg-slate-950/60 p-2.5 border border-slate-800/80">
                  <span className="text-slate-400 font-medium">核心聚焦：</span>
                  <p className="text-slate-300 mt-0.5 leading-relaxed">
                    {currentDayPlan.math2Task.focusArea}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-950/60 p-2.5 border border-slate-800/80">
                  <span className="text-slate-400 font-medium">必背核心公式/概念：</span>
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-300">
                    {currentDayPlan.math2Task.coreConcepts.map((concept, i) => (
                      <li key={i}>{concept}</li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="rounded bg-slate-950/40 p-2 border border-slate-800/60">
                    <span className="text-amber-400 font-medium">选择题目标：</span>
                    <p className="text-slate-400 mt-0.5">{currentDayPlan.math2Task.mcqTarget}</p>
                  </div>
                  <div className="rounded bg-slate-950/40 p-2 border border-slate-800/60">
                    <span className="text-amber-400 font-medium">解答大题目标：</span>
                    <p className="text-slate-400 mt-0.5">
                      {currentDayPlan.math2Task.bigQuestionTarget}
                    </p>
                  </div>
                </div>

                {currentDayPlan.math2Task.pitfallsToAvoid.length > 0 && (
                  <div className="text-[11px] text-rose-300 bg-rose-950/30 p-2 rounded border border-rose-900/40">
                    <span className="text-rose-400 font-semibold">避坑纪律：</span>
                    {currentDayPlan.math2Task.pitfallsToAvoid.join('；')}
                  </div>
                )}

                {currentDayPlan.math2Task.recommendedProblems.length > 0 && (
                  <div className="text-[11px] text-slate-400 pt-1">
                    <span className="text-slate-500">实战题源：</span>
                    <span className="text-amber-300 font-medium ml-1">
                      {currentDayPlan.math2Task.recommendedProblems.join(' · ')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 408 Daily Task Card */}
          {currentDayPlan.csTask && (
            <div
              className={`rounded-xl border p-4 transition-colors ${
                currentDayPlan.csTask.isCompleted
                  ? 'border-emerald-800/60 bg-emerald-950/20'
                  : 'border-slate-800 bg-slate-900/60'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <button
                  onClick={() => onToggleCsComplete(currentDayPlan.csTask!.id)}
                  className="flex items-center gap-2 text-left group cursor-pointer"
                >
                  {currentDayPlan.csTask.isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                  ) : (
                    <Circle className="h-5 w-5 text-slate-500 group-hover:text-cyan-400 shrink-0" />
                  )}
                  <div>
                    <span className="text-xs font-mono font-medium text-cyan-400">
                      [408专业课 · 按日攻坚] {currentDayPlan.csTask.phase}
                    </span>
                    <h3
                      className={`text-sm font-semibold text-white ${
                        currentDayPlan.csTask.isCompleted ? 'line-through text-slate-400' : ''
                      }`}
                    >
                      {currentDayPlan.csTask.title}
                    </h3>
                  </div>
                </button>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[11px] font-mono text-slate-400">
                    {currentDayPlan.csTask.suggestedDurationMinutes} 分钟
                  </span>
                  <button
                    onClick={() => onOpenEditModal(currentDayPlan, 'cs')}
                    className="p-1 rounded text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors cursor-pointer"
                    title="修改今日408任务"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="rounded-lg bg-slate-950/60 p-2.5 border border-slate-800/80">
                  <span className="text-slate-400 font-medium">攻坚焦点：</span>
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-300">
                    {currentDayPlan.csTask.coreConcepts.map((concept, i) => (
                      <li key={i}>{concept}</li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="rounded bg-slate-950/40 p-2 border border-slate-800/60">
                    <span className="text-cyan-400 font-medium">真题选择：</span>
                    <p className="text-slate-400 mt-0.5">{currentDayPlan.csTask.mcqTarget}</p>
                  </div>
                  <div className="rounded bg-slate-950/40 p-2 border border-slate-800/60">
                    <span className="text-cyan-400 font-medium">核心大题：</span>
                    <p className="text-slate-400 mt-0.5">
                      {currentDayPlan.csTask.bigQuestionTarget}
                    </p>
                  </div>
                </div>

                {currentDayPlan.csTask.recommendedProblems.length > 0 && (
                  <div className="text-[11px] text-slate-400 pt-1">
                    <span className="text-slate-500">重点真题号：</span>
                    <span className="text-cyan-300 font-medium ml-1">
                      {currentDayPlan.csTask.recommendedProblems.join(' · ')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Weekly Politics Dynamic Progress Card (Synced to Current Selected Date's Week) */}
          <div
            className={`rounded-xl border p-4 transition-colors ${
              currentPoliticsWeekTotalSub > 0 &&
              currentPoliticsWeekDoneSub === currentPoliticsWeekTotalSub
                ? 'border-emerald-800/60 bg-emerald-950/20'
                : 'border-rose-500/30 bg-slate-900/60'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-mono font-bold text-rose-300 flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5 text-rose-400" />
                    <span>
                      [考研政治 · 按周动态推进] 第{currentPoliticsWeek.weekNumber}周 (
                      {currentPoliticsWeek.dateRange})
                    </span>
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30">
                    {currentPoliticsWeek.phaseTitle}
                  </span>
                  {politicsWeekStatus === 'pre' && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                      11.3启动第1周
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-white mt-0.5">
                  {currentPoliticsWeek.title}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[11px] font-mono text-rose-300 font-bold tabular-nums bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  {currentPoliticsWeekDoneSub}/{currentPoliticsWeekTotalSub} 项 ({currentPoliticsWeekPct}%)
                </span>
                <button
                  onClick={() => onOpenPoliticsWeekEditModal(currentPoliticsWeek)}
                  className="p-1 rounded text-slate-400 hover:text-rose-300 hover:bg-slate-800 transition-colors cursor-pointer"
                  title="动态编辑本周政治任务与验收标准"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Progress bar for the current Politics week */}
            <div className="h-1.5 w-full rounded-full bg-slate-950 overflow-hidden border border-slate-800 mb-3">
              <div
                className="h-full bg-rose-400 transition-all duration-300"
                style={{ width: `${currentPoliticsWeekPct}%` }}
              />
            </div>

            {/* Input / Output summary strip */}
            <div className="mb-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 p-2 text-[11px] text-slate-300 space-y-1">
              <div>
                <strong className="text-rose-300">📥 输入主线：</strong>
                <span>{currentPoliticsWeek.inputFocus}</span>
              </div>
              <div>
                <strong className="text-amber-300">📤 输出主线：</strong>
                <span>{currentPoliticsWeek.outputFocus}</span>
              </div>
            </div>

            {/* Interactive Split Sub-Task Checkboxes right on the Dashboard */}
            <div className="space-y-2.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {currentPoliticsWeek.subTasks.map((sub) => {
                  const catMeta = POLITICS_CATEGORY_LABELS[sub.category];
                  return (
                    <div
                      key={sub.id}
                      onClick={() => onTogglePoliticsSubTask(currentPoliticsWeek.id, sub.id)}
                      className={`rounded-lg border p-2 flex items-start gap-2 cursor-pointer transition-all select-none ${
                        sub.isCompleted
                          ? 'border-emerald-800/50 bg-emerald-950/20 text-slate-400'
                          : sub.category === 'xiao4_essay'
                          ? 'border-fuchsia-500/40 bg-fuchsia-950/20 hover:border-fuchsia-500/60'
                          : 'border-slate-800 bg-slate-950/70 hover:border-rose-500/50'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {sub.isCompleted ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        ) : (
                          <Circle className="h-4 w-4 text-slate-500" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1 flex-wrap">
                          <span
                            className={`text-[9px] font-mono px-1 py-0.1 rounded border ${catMeta.badgeClass}`}
                          >
                            {sub.moduleName}
                          </span>
                          <span
                            className={`font-semibold text-[11px] leading-snug ${
                              sub.isCompleted ? 'line-through text-slate-400' : 'text-slate-100'
                            }`}
                          >
                            {sub.title}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Compact Interactive Weekly Acceptance Criteria on Dashboard */}
              {currentPoliticsWeek.acceptanceCriteria.length > 0 && (
                <div className="rounded-lg bg-amber-950/15 border border-amber-500/30 p-2.5 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-amber-300 flex items-center gap-1">
                      <ClipboardCheck className="h-3.5 w-3.5 text-amber-400" />
                      <span>本周验收标准清单</span>
                    </span>
                    <span className="font-mono text-amber-300 tabular-nums">
                      已达标 {currentPoliticsWeekDoneAcc}/{currentPoliticsWeekTotalAcc}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {currentPoliticsWeek.acceptanceCriteria.map((acc) => (
                      <div
                        key={acc.id}
                        onClick={() => onTogglePoliticsAcceptance(currentPoliticsWeek.id, acc.id)}
                        className={`rounded border px-2 py-1 flex items-center gap-1.5 cursor-pointer text-[11px] select-none ${
                          acc.isCompleted
                            ? 'border-emerald-800/50 bg-emerald-950/20 text-slate-400 line-through'
                            : 'border-slate-800 bg-slate-950/70 text-slate-200 hover:border-amber-500/40'
                        }`}
                      >
                        {acc.isCompleted ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        ) : (
                          <Circle className="h-3.5 w-3.5 text-amber-400/70 shrink-0" />
                        )}
                        <span className="truncate">{acc.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-1 text-[11px]">
                <button
                  onClick={() => onOpenPoliticsWeekEditModal(currentPoliticsWeek)}
                  className="text-slate-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="h-3 w-3" />
                  <span>动态编辑本周政治清单</span>
                </button>
                <button
                  onClick={onNavigateToPoliticsTimeline}
                  className="text-rose-300 hover:text-rose-200 font-semibold underline underline-offset-2 flex items-center gap-1 cursor-pointer"
                >
                  <span>进入政治7周完整日程表</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Weekly English Progress Card (Synced to Current Selected Date's Week) */}
          <div
            className={`rounded-xl border p-4 transition-colors ${
              currentWeekTotalSub > 0 && currentWeekDoneSub === currentWeekTotalSub
                ? 'border-emerald-800/60 bg-emerald-950/20'
                : 'border-teal-500/30 bg-slate-900/60'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-mono font-bold text-teal-300 flex items-center gap-1">
                    <Languages className="h-3.5 w-3.5 text-teal-400" />
                    <span>
                      [考研英语二 · 按周推进] 第{currentEnglishWeek.weekNumber}周 (
                      {currentEnglishWeek.dateRange})
                    </span>
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-teal-500/15 text-teal-300 border border-teal-500/30">
                    {currentEnglishWeek.stageTitle}
                  </span>
                  {englishWeekStatus === 'pre' && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                      11.3启动第1周预热
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-white mt-0.5">
                  {currentEnglishWeek.title}
                </h3>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[11px] font-mono text-teal-300 font-bold tabular-nums bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  {currentWeekDoneSub}/{currentWeekTotalSub} 项 ({currentWeekPct}%)
                </span>
                <button
                  onClick={() => onOpenEnglishWeekEditModal(currentEnglishWeek)}
                  className="p-1 rounded text-slate-400 hover:text-teal-300 hover:bg-slate-800 transition-colors cursor-pointer"
                  title="动态编辑本周英语任务与拆分项"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Highlight if TODAY is one of the 3 Full Mock Exam Days */}
            {todayEnglishMock && (
              <div className="mb-3 rounded-lg border border-rose-500/50 bg-rose-950/30 p-2.5 text-xs flex items-start gap-2">
                <Flame className="h-4 w-4 text-rose-400 shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <div className="font-bold text-rose-200">
                    🔥 今日英语全真模考日：{todayEnglishMock.paperTitle}
                  </div>
                  <p className="text-[11px] text-rose-300/90 mt-0.5">
                    严格限时 {todayEnglishMock.durationMinutes}{' '}
                    分钟：完形15-20m · 阅读70-80m · 新题型15-20m · 翻译20-25m · 大小作文40-45m
                  </p>
                </div>
              </div>
            )}

            {/* Progress bar for the current week */}
            <div className="h-1.5 w-full rounded-full bg-slate-950 overflow-hidden border border-slate-800 mb-3">
              <div
                className="h-full bg-teal-400 transition-all duration-300"
                style={{ width: `${currentWeekPct}%` }}
              />
            </div>

            {/* Interactive Split Sub-Task Checkboxes right on the Dashboard */}
            <div className="space-y-2 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {currentEnglishWeek.subTasks.map((sub) => {
                  const catMeta = ENGLISH_CATEGORY_LABELS[sub.category];
                  return (
                    <div
                      key={sub.id}
                      onClick={() => onToggleEnglishSubTask(currentEnglishWeek.id, sub.id)}
                      className={`rounded-lg border p-2 flex items-start gap-2 cursor-pointer transition-all select-none ${
                        sub.isCompleted
                          ? 'border-emerald-800/50 bg-emerald-950/20 text-slate-400'
                          : sub.category === 'mock'
                          ? 'border-rose-500/40 bg-rose-950/20 hover:border-rose-500/60'
                          : 'border-slate-800 bg-slate-950/70 hover:border-teal-500/50'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {sub.isCompleted ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        ) : (
                          <Circle className="h-4 w-4 text-slate-500" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1 flex-wrap">
                          <span
                            className={`text-[9px] font-mono px-1 py-0.1 rounded border ${catMeta.badgeClass}`}
                          >
                            {catMeta.label}
                          </span>
                          <span
                            className={`font-semibold text-[11px] truncate ${
                              sub.isCompleted ? 'line-through text-slate-400' : 'text-slate-100'
                            }`}
                          >
                            {sub.title}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-lg bg-slate-950/50 p-2.5 border border-slate-800/70 text-[11px] text-slate-300 leading-relaxed">
                <strong className="text-teal-300">本周指导：</strong>
                {currentEnglishWeek.guidance[0]}
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px]">
                <button
                  onClick={() => onOpenEnglishWeekEditModal(currentEnglishWeek)}
                  className="text-slate-400 hover:text-teal-300 flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="h-3 w-3" />
                  <span>动态编辑本周打卡项</span>
                </button>
                <button
                  onClick={onNavigateToEnglishTimeline}
                  className="text-teal-300 hover:text-teal-200 font-semibold underline underline-offset-2 flex items-center gap-1 cursor-pointer"
                >
                  <span>进入英语7周完整日程表</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Four-Subject Isolated Battlefield Notes & Motivation Boost */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Subject-Isolated Note Area */}
        <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900/50 p-4 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <StickyNote className="h-4 w-4 text-amber-400" />
              <h3 className="text-sm font-semibold text-white">
                四科独立战地复盘笔记（数二/408按日 · 政治/英语按周，彻底隔离）
              </h3>
            </div>
            {isNoteSaved && (
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold animate-pulse">
                <CheckCircle2 className="h-3.5 w-3.5" /> 已保存至对应科目
              </span>
            )}
          </div>

          {/* 4-Subject Isolated Note Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setActiveNoteTab('math')}
              className={`py-1.5 px-2.5 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeNoteTab === 'math'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-amber-300'
              }`}
            >
              <span>📐 数二日笔记</span>
              {Boolean(getIsolatedNoteForSubject(currentDayPlan, 'math').trim()) && (
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    activeNoteTab === 'math' ? 'bg-slate-950' : 'bg-amber-400'
                  }`}
                />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveNoteTab('cs')}
              className={`py-1.5 px-2.5 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeNoteTab === 'cs'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-cyan-300'
              }`}
            >
              <span>💻 408日笔记</span>
              {Boolean(getIsolatedNoteForSubject(currentDayPlan, 'cs').trim()) && (
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    activeNoteTab === 'cs' ? 'bg-slate-950' : 'bg-cyan-400'
                  }`}
                />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveNoteTab('politics')}
              className={`py-1.5 px-2.5 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeNoteTab === 'politics'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-slate-300 hover:text-rose-300'
              }`}
            >
              <span>📕 政治第{currentPoliticsWeek.weekNumber}周记</span>
              {Boolean(currentPoliticsWeek.weeklyNote?.trim()) && (
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    activeNoteTab === 'politics' ? 'bg-white' : 'bg-rose-400'
                  }`}
                />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveNoteTab('english')}
              className={`py-1.5 px-2.5 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeNoteTab === 'english'
                  ? 'bg-teal-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-teal-300'
              }`}
            >
              <span>📗 英语第{currentEnglishWeek.weekNumber}周记</span>
              {Boolean(currentEnglishWeek.weeklyNote?.trim()) && (
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    activeNoteTab === 'english' ? 'bg-slate-950' : 'bg-teal-400'
                  }`}
                />
              )}
            </button>
          </div>

          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder={
              activeNoteTab === 'english'
                ? `正在编辑【英语二 · 第${currentEnglishWeek.weekNumber}周 (${currentEnglishWeek.dateRange}) 独立周记】...（仅在英语视图展示，不串入其他科目）`
                : activeNoteTab === 'politics'
                ? `正在编辑【考研政治 · 第${currentPoliticsWeek.weekNumber}周 (${currentPoliticsWeek.dateRange}) 独立周记】...（仅在政治视图展示，不串入其他科目）`
                : `正在编辑【${currentDayPlan.formattedDate} · ${
                    activeNoteTab === 'math' ? '数学二' : '408专业课'
                  }专属日笔记】...（与其他科目彻底隔离）`
            }
            className="w-full h-24 rounded-lg border border-slate-800 bg-slate-950/80 p-3 text-xs text-slate-200 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none leading-relaxed"
          />

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 text-[11px]">
              {activeNoteTab === 'english'
                ? `当前归属：英语第${currentEnglishWeek.weekNumber}周独立周记`
                : activeNoteTab === 'politics'
                ? `当前归属：政治第${currentPoliticsWeek.weekNumber}周独立周记`
                : `当前归属：${currentDayPlan.formattedDate} ${
                    activeNoteTab === 'math' ? '数学二' : '408专业课'
                  }独立日笔记`}
            </span>
            <button
              onClick={handleSaveNote}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <BookmarkCheck className="h-4 w-4" />
              <span>
                保存
                {activeNoteTab === 'english'
                  ? `第${currentEnglishWeek.weekNumber}周英语周记`
                  : activeNoteTab === 'politics'
                  ? `第${currentPoliticsWeek.weekNumber}周政治周记`
                  : activeNoteTab === 'math'
                  ? '数二日笔记'
                  : '408日笔记'}
              </span>
            </button>
          </div>
        </div>

        {/* Motivational Card */}
        <div className="rounded-xl border border-rose-950/60 bg-gradient-to-b from-rose-950/30 to-slate-950 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-rose-400 font-semibold mb-2">
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                <span>战地强心剂</span>
              </span>
              <button
                onClick={nextQuote}
                className="text-slate-500 hover:text-rose-300 flex items-center gap-1 text-[11px] transition-colors cursor-pointer"
                title="换一条"
              >
                <RefreshCw className="h-3 w-3" />
                <span>换一条</span>
              </button>
            </div>
            <blockquote className="text-xs text-rose-200/90 leading-relaxed italic mt-2">
              {BOOST_QUOTES[quoteIndex]}
            </blockquote>
          </div>

          <div className="mt-4 pt-3 border-t border-rose-950/50 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">心理电量低？</span>
            <button
              onClick={() => onNavigateToTab('mindset')}
              className="text-xs font-semibold text-rose-400 hover:text-rose-300 underline underline-offset-2 cursor-pointer"
            >
              进入心理急救箱 →
            </button>
          </div>
        </div>
      </section>

      {/* 5. Four-Subject Progress Meters (Math 2 Daily, 408 Daily, Politics Weekly, English Weekly) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Math 2 Status */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <h3 className="text-sm font-semibold text-white">
                数学二 (150分) · 53天真题与全真模考决战 (按日)
              </h3>
            </div>
            <span className="text-xs font-mono tabular-nums text-amber-400 font-bold">
              {completedMathTasks} / {totalMathTasks} 天完成 ({mathPercent}%)
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden mb-3">
            <div
              className="h-full bg-amber-400 transition-all duration-300"
              style={{ width: `${(completedMathTasks / Math.max(totalMathTasks, 1)) * 100}%` }}
            />
          </div>
          <div className="text-xs text-slate-400 space-y-1">
            <p>
              <strong className="text-amber-400">今日模考/订正：</strong>
              <span className="text-slate-200 font-medium">
                {currentDayPlan.math2Task?.title || '真题套卷模考'}
              </span>
            </p>
            <p className="text-slate-500">
              纪律：上午 08:30—11:30 严格闭卷掐表；隔天遮住答案在白纸上独立重写全套错题！
            </p>
          </div>
        </div>

        {/* 408 Status */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
              <h3 className="text-sm font-semibold text-white">
                408 计算机专业课 (150分) · 74天全景特种兵 (按日)
              </h3>
            </div>
            <span className="text-xs font-mono tabular-nums text-cyan-400 font-bold">
              {completedCsTasks} / {totalCsTasks} 天完成 ({csPercent}%)
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden mb-3">
            <div
              className="h-full bg-cyan-400 transition-all duration-300"
              style={{ width: `${(completedCsTasks / Math.max(totalCsTasks, 1)) * 100}%` }}
            />
          </div>
          <div className="text-xs text-slate-400 space-y-1">
            <p>
              <strong className="text-cyan-400">当前主攻：</strong>
              <span className="text-slate-200 font-medium">
                {currentDayPlan.csTask?.phase} · {currentDayPlan.csTask?.title}
              </span>
            </p>
            <p className="text-slate-500">
              纪律：计网速通(11.3-10) → 11.11起2010-2025真题一轮二轮交叉突破与三轮回顾。
            </p>
          </div>
        </div>

        {/* Politics Status (Weekly Structure) */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <h3 className="text-sm font-semibold text-white">
                考研政治 (100分) · 7周动态规划与肖八/肖四攻坚 (按周)
              </h3>
            </div>
            <span className="text-xs font-mono tabular-nums text-rose-300 font-bold">
              {completedPoliticsSubTasks} / {totalPoliticsSubTasks} 项完成 ({politicsPercent}%)
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden mb-3">
            <div
              className="h-full bg-rose-400 transition-all duration-300"
              style={{
                width: `${(completedPoliticsSubTasks / Math.max(totalPoliticsSubTasks, 1)) * 100}%`,
              }}
            />
          </div>
          <div className="text-xs text-slate-400 space-y-1">
            <p className="flex items-center justify-between gap-2">
              <span>
                <strong className="text-rose-300">
                  本周进度 (第{currentPoliticsWeek.weekNumber}周 {currentPoliticsWeek.dateRange})：
                </strong>
                <span className="text-slate-200 font-medium">
                  任务 {currentPoliticsWeekDoneSub}/{currentPoliticsWeekTotalSub} 项 ({currentPoliticsWeekPct}%) · 验收 {currentPoliticsWeekDoneAcc}/{currentPoliticsWeekTotalAcc}
                </span>
              </span>
              <button
                onClick={onNavigateToPoliticsTimeline}
                className="text-rose-300 hover:text-rose-200 underline underline-offset-2 text-[11px] shrink-0 cursor-pointer"
              >
                7周视图 →
              </button>
            </p>
            <p className="text-slate-500">
              纪律：第1周恢复基础(马原+四大线索) → 第2-3周肖八两轮 → 第4周选择巩固 → 第5-7周肖四背诵。
            </p>
          </div>
        </div>

        {/* English II Status (Weekly Structure) */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-teal-400" />
              <h3 className="text-sm font-semibold text-white">
                考研英语二 (100分) · 7周全题型与三轮全真模考 (按周)
              </h3>
            </div>
            <span className="text-xs font-mono tabular-nums text-teal-300 font-bold">
              {completedEnglishSubTasks} / {totalEnglishSubTasks} 项完成 ({englishPercent}%)
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden mb-3">
            <div
              className="h-full bg-teal-400 transition-all duration-300"
              style={{
                width: `${(completedEnglishSubTasks / Math.max(totalEnglishSubTasks, 1)) * 100}%`,
              }}
            />
          </div>
          <div className="text-xs text-slate-400 space-y-1">
            <p className="flex items-center justify-between gap-2">
              <span>
                <strong className="text-teal-300">
                  本周进度 (第{currentEnglishWeek.weekNumber}周 {currentEnglishWeek.dateRange})：
                </strong>
                <span className="text-slate-200 font-medium">
                  已完成 {currentWeekDoneSub}/{currentWeekTotalSub} 项 ({currentWeekPct}%)
                </span>
              </span>
              <button
                onClick={onNavigateToEnglishTimeline}
                className="text-teal-300 hover:text-teal-200 underline underline-offset-2 text-[11px] shrink-0 cursor-pointer"
              >
                7周视图 →
              </button>
            </p>
            <p className="text-slate-500">
              纪律：作文-石磊鹏 · 翻译-唐静 · 完型-易熙人 · 新题型-刘琦；模考日 11.22 / 12.06 / 12.13。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
