import React, { useState } from 'react';
import { DayPlan, EnglishWeekPlan, NoteSubjectTrack } from '../types/kaoyan';
import { BOOST_QUOTES } from '../data/mindsetCards';
import {
  ENGLISH_CATEGORY_LABELS,
  getEnglishWeekForDate,
  getEnglishMockForDate,
} from '../data/englishScheduleData';
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
} from 'lucide-react';
import { desktopNotificationManager } from '../utils/desktopNotification';

interface DashboardOverviewProps {
  currentDayPlan: DayPlan;
  allPlans: DayPlan[];
  englishWeeks: EnglishWeekPlan[];
  todayDateStr?: string;
  onSelectDay: (date: string) => void;
  onJumpToToday?: () => void;
  onToggleMathComplete: (taskId: string) => void;
  onToggleCsComplete: (taskId: string) => void;
  onToggleEnglishComplete?: (date: string) => void;
  onTogglePoliticsComplete?: (date: string) => void;
  onToggleEnglishSubTask: (weekId: string, subTaskId: string) => void;
  onSaveSubjectNote: (date: string, subject: NoteSubjectTrack, notes: string) => void;
  onSaveEnglishWeekNote: (weekId: string, notes: string) => void;
  onSaveDayNotes: (date: string, notes: string) => void;
  onNavigateToTab: (tab: 'timeline' | 'workstation' | 'mindset') => void;
  onNavigateToEnglishTimeline: () => void;
  onOpenEditModal: (plan: DayPlan, subjectTab?: 'math2' | 'cs' | 'english' | 'politics') => void;
  onOpenEnglishWeekEditModal: (weekPlan: EnglishWeekPlan) => void;
  daysToExam: number;
  daysToMathPastPapers: number;
  daysToCsPastPapers: number;
  daysToXiao8: number;
}

// User's verbatim daily execution schedule
interface ScheduleSlot {
  id: string;
  timeRange: string;
  subjectTitle: string;
  subjectCategory: 'math' | 'cs' | 'english' | 'politics' | 'rest';
  badge: string;
  content: string;
  startMinutes: number;
  endMinutes: number;
}

// 模考日作息时刻表 (Mock Day)
export const MOCK_SCHEDULE_SLOTS: ScheduleSlot[] = [
  {
    id: 'mock-slot-1',
    timeRange: '08:00 – 08:30',
    subjectTitle: '政治 / 英语早读 0.5h',
    subjectCategory: 'politics',
    badge: '早读唤醒',
    content:
      '唤醒大脑：快速过一遍英语高频词或政治核心考点提要，避免一上来直接进数学考场导致前30分钟大脑发懵。利用午饭前的碎片时间刷政治模拟卷选择题（肖八、腿四、徐六等只刷选择题）并直接复盘错题。',
    startMinutes: 8 * 60,
    endMinutes: 8 * 60 + 30,
  },
  {
    id: 'mock-slot-2',
    timeRange: '08:30 – 11:30',
    subjectTitle: '数学（核心块：3h）',
    subjectCategory: 'math',
    badge: '真题模考·重中之重',
    content:
      '全真掐表模考 / 深度订正。做套卷日：严格掐表做真题或张宇卷；复盘日：重做前一天套卷的错题 + 专项补漏薄弱章节。',
    startMinutes: 8 * 60 + 30,
    endMinutes: 11 * 60 + 30,
  },
  {
    id: 'mock-slot-3',
    timeRange: '11:30 – 12:30',
    subjectTitle: '即时复盘 + 动态时间',
    subjectCategory: 'math',
    badge: '趁热打铁',
    content: '数学因为基本公式/定理等的错题，及时回忆与翻看讲义定理，加深考场条件反射。',
    startMinutes: 11 * 60 + 30,
    endMinutes: 12 * 60 + 30,
  },
  {
    id: 'mock-slot-4',
    timeRange: '12:30 – 13:30',
    subjectTitle: '英语 1h',
    subjectCategory: 'english',
    badge: '精读保持手感',
    content:
      '保持阅读手感（每天1篇精读复盘）+ 11月起加入大小作文模板整理与仿写、新题型/翻译训练。',
    startMinutes: 12 * 60 + 30,
    endMinutes: 13 * 60 + 30,
  },
  {
    id: 'mock-slot-5',
    timeRange: '13:30 – 17:30',
    subjectTitle: '408（主力块：4h）',
    subjectCategory: 'cs',
    badge: '专业课攻坚',
    content: '抓紧收尾一轮/二轮滞后科目，进入 408 真题套卷演练与计组/OS大题专项突破。',
    startMinutes: 13 * 60 + 30,
    endMinutes: 17 * 60 + 30,
  },
  {
    id: 'mock-slot-6',
    timeRange: '17:30 – 18:30',
    subjectTitle: '晚饭 + 休息放空',
    subjectCategory: 'rest',
    badge: '缓存清零',
    content: '离开书桌散步或短暂闭目养神 10 分钟，给大脑清零缓存，恢复体能精力。',
    startMinutes: 17 * 60 + 30,
    endMinutes: 18 * 60 + 30,
  },
  {
    id: 'mock-slot-7',
    timeRange: '18:30 – 21:30',
    subjectTitle: '408 追赶 3h',
    subjectCategory: 'cs',
    badge: '落后模块专项突破',
    content: '专门攻克 408 落后模块（计组流水线/数据通路、OS PV信号量大题、计网协议分析）。',
    startMinutes: 18 * 60 + 30,
    endMinutes: 21 * 60 + 30,
  },
  {
    id: 'mock-slot-8',
    timeRange: '21:30 – 23:30',
    subjectTitle: '数学（复盘块）2h',
    subjectCategory: 'math',
    badge: '白纸重做·不开新卷',
    content:
      '只做复盘，不开新卷！白纸重做当天上午套卷的卡壳题、整理条件反射笔记；若当天已复盘完，直接把这半小时让给 408。',
    startMinutes: 21 * 60 + 30,
    endMinutes: 23 * 60 + 20,
  },
  {
    id: 'mock-slot-9',
    timeRange: '23:20 – 24:00',
    subjectTitle: '政治背诵',
    subjectCategory: 'politics',
    badge: '主观题框架速记',
    content: '22:20–23:00 / 23:20 政治主观题框架背诵（11月中下旬肖四出来后重点发力狂背）。',
    startMinutes: 23 * 60 + 20,
    endMinutes: 24 * 60,
  },
];

// 非模考日作息时刻表 (Non-Mock Day)
export const NON_MOCK_SCHEDULE_SLOTS: ScheduleSlot[] = [
  {
    id: 'nonmock-slot-1',
    timeRange: '08:00 – 08:30',
    subjectTitle: '政治 / 英语早读',
    subjectCategory: 'politics',
    badge: '早读唤醒',
    content: '政治手册回顾 15 分钟 + 英语词汇 15 分钟',
    startMinutes: 8 * 60,
    endMinutes: 8 * 60 + 30,
  },
  {
    id: 'nonmock-slot-2',
    timeRange: '08:30 – 11:30',
    subjectTitle: '数学 3h',
    subjectCategory: 'math',
    badge: '专项补漏·错题重做',
    content: '专项训练、错题重做、薄弱知识点补漏',
    startMinutes: 8 * 60 + 30,
    endMinutes: 11 * 60 + 30,
  },
  {
    id: 'nonmock-slot-3',
    timeRange: '11:30 – 12:00',
    subjectTitle: '数学复盘',
    subjectCategory: 'math',
    badge: '总结沉淀',
    content: '总结上午错误，回忆关键公式与解题方法',
    startMinutes: 11 * 60 + 30,
    endMinutes: 12 * 60,
  },
  {
    id: 'nonmock-slot-4',
    timeRange: '12:00 – 12:30',
    subjectTitle: '午餐与休息',
    subjectCategory: 'rest',
    badge: '蓄能充能',
    content: '正常休息',
    startMinutes: 12 * 60,
    endMinutes: 12 * 60 + 30,
  },
  {
    id: 'nonmock-slot-5',
    timeRange: '12:30 – 13:30',
    subjectTitle: '英语 1h',
    subjectCategory: 'english',
    badge: '手感保持',
    content: '每日阅读或作文、新题型、翻译训练',
    startMinutes: 12 * 60 + 30,
    endMinutes: 13 * 60 + 30,
  },
  {
    id: 'nonmock-slot-6',
    timeRange: '13:30 – 17:00',
    subjectTitle: '408 3.5h',
    subjectCategory: 'cs',
    badge: '真题与重点突破',
    content: '真题、知识点复习、重点章节突破',
    startMinutes: 13 * 60 + 30,
    endMinutes: 17 * 60,
  },
  {
    id: 'nonmock-slot-7',
    timeRange: '17:00 – 17:30',
    subjectTitle: '政治刷题 30min',
    subjectCategory: 'politics',
    badge: '小程序与选择题',
    content: '小程序 15～20 题，或复盘一组选择题',
    startMinutes: 17 * 60,
    endMinutes: 17 * 60 + 30,
  },
  {
    id: 'nonmock-slot-8',
    timeRange: '17:30 – 18:30',
    subjectTitle: '晚饭与休息',
    subjectCategory: 'rest',
    badge: '放松身心',
    content: '放松',
    startMinutes: 17 * 60 + 30,
    endMinutes: 18 * 60 + 30,
  },
  {
    id: 'nonmock-slot-9',
    timeRange: '18:30 – 20:30',
    subjectTitle: '408 2h',
    subjectCategory: 'cs',
    badge: '主力任务推进',
    content: '继续 408 主力任务，完成当天计划',
    startMinutes: 18 * 60 + 30,
    endMinutes: 20 * 60 + 30,
  },
  {
    id: 'nonmock-slot-10',
    timeRange: '20:30 – 22:00',
    subjectTitle: '数学 1.5h',
    subjectCategory: 'math',
    badge: '关键问题·错题回顾',
    content: '优先处理当天未完成的关键问题；已完成则回顾错题',
    startMinutes: 20 * 60 + 30,
    endMinutes: 22 * 60,
  },
  {
    id: 'nonmock-slot-11',
    timeRange: '22:00 – 23:30',
    subjectTitle: '政治 1.5h',
    subjectCategory: 'politics',
    badge: '阶段复盘与背诵',
    content: '按阶段完成手册、肖八选择题复盘或肖四背诵',
    startMinutes: 22 * 60,
    endMinutes: 23 * 60 + 30,
  },
];

type DashboardNoteTab = 'math' | 'cs' | 'politics' | 'english';

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  currentDayPlan,
  allPlans,
  englishWeeks,
  todayDateStr,
  onToggleMathComplete,
  onToggleCsComplete,
  onTogglePoliticsComplete,
  onToggleEnglishSubTask,
  onSaveSubjectNote,
  onSaveEnglishWeekNote,
  onNavigateToTab,
  onNavigateToEnglishTimeline,
  onOpenEditModal,
  onOpenEnglishWeekEditModal,
  daysToExam,
  daysToMathPastPapers,
  daysToCsPastPapers,
  daysToXiao8,
}) => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [activeNoteTab, setActiveNoteTab] = useState<DashboardNoteTab>('math');

  const { weekPlan: currentEnglishWeek, status: englishWeekStatus } = getEnglishWeekForDate(
    currentDayPlan.date,
    englishWeeks
  );
  const todayEnglishMock = getEnglishMockForDate(currentDayPlan.date, englishWeeks);

  const getCurrentTabNoteValue = (tab: DashboardNoteTab): string => {
    if (tab === 'english') {
      return currentEnglishWeek.weeklyNote || '';
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
    currentDayPlan.politicsNote,
    currentDayPlan.dailyNote,
    currentEnglishWeek.id,
    currentEnglishWeek.weeklyNote,
  ]);

  const nextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % BOOST_QUOTES.length);
  };

  const handleSaveNote = () => {
    if (activeNoteTab === 'english') {
      onSaveEnglishWeekNote(currentEnglishWeek.id, noteContent);
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

  const corePoliticsPlans = allPlans.filter(
    (p) => p.date >= '2026-10-30' && p.date <= '2026-12-18'
  );
  const totalPoliticsTasks = corePoliticsPlans.length;
  const completedPoliticsTasks = corePoliticsPlans.filter((p) => p.politicsTask?.isCompleted).length;
  const politicsPercent =
    totalPoliticsTasks > 0
      ? Math.round((completedPoliticsTasks / totalPoliticsTasks) * 100)
      : 0;

  const totalEnglishSubTasks = englishWeeks.reduce((acc, w) => acc + w.subTasks.length, 0);
  const completedEnglishSubTasks = englishWeeks.reduce(
    (acc, w) => acc + w.subTasks.filter((t) => t.isCompleted).length,
    0
  );
  const englishPercent =
    totalEnglishSubTasks > 0
      ? Math.round((completedEnglishSubTasks / totalEnglishSubTasks) * 100)
      : 0;

  // Current week English progress
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
        return 'bg-red-500/10 text-red-300/90 border border-red-500/20';
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

      {/* 2. Four Tactical Countdowns */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-all hover:border-slate-700">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>数二真题模考 (10.27)</span>
            <span className="font-mono text-amber-400 font-semibold">
              {daysToMathPastPapers > 0 ? `倒计时 ${daysToMathPastPapers} 天` : '已开战'}
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-amber-400">
              {daysToMathPastPapers > 0 ? daysToMathPastPapers : '已开战'}
            </span>
            <span className="text-xs text-slate-400">
              {daysToMathPastPapers > 0 ? '天后启动53天真题决战' : '（10.27-12.18闭卷模考）'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 truncate">
            一阶段(硬仗练兵) → 二阶段(新大纲抗压) → 三阶段(冲刺封箱)
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-all hover:border-slate-700">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>408全真套卷 (11.11)</span>
            <span className="font-mono text-cyan-400 font-semibold">三轮交叉</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-cyan-400">
              {daysToCsPastPapers > 0 ? daysToCsPastPapers : '已开战'}
            </span>
            <span className="text-xs text-slate-400">
              {daysToCsPastPapers > 0 ? '天后开启2010-2025真题' : '（2010-2025三轮突破）'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 truncate">
            每4套真题配3天二轮突破 + 2套模拟卷 + 6天三轮回顾
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-all hover:border-slate-700">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>政治《肖八》接战 (11.10)</span>
            <span className="font-mono text-indigo-400 font-semibold">模拟卷上市</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-indigo-400">
              {daysToXiao8 > 0 ? daysToXiao8 : '已开战'}
            </span>
            <span className="text-xs text-slate-400">
              {daysToXiao8 > 0 ? '天后全面停刷1000题' : '（肖八/肖四四阶段推进）'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 truncate">
            现阶段严控45-60分/天刷核心错题，肖八到手轮刷选择题
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-all hover:border-slate-700">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>考研初试决战 (12.19-20)</span>
            <span className="font-mono text-emerald-400 font-semibold">全国统一</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-emerald-400">
              {daysToExam}
            </span>
            <span className="text-xs text-slate-400">天决战紫禁之巅</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 truncate">
            12.19 政治/英语 → 12.20 数学二/408，一战成硕！
          </p>
        </div>
      </section>

      {/* 3. Four-Subject Progress Meters (Math 2, 408, English Weekly, Politics) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Math 2 Status */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <h3 className="text-sm font-semibold text-white">
                数学二 (150分) · 53天真题与全真模考决战
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
                408 计算机专业课 (150分) · 74天全景特种兵
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

        {/* English II Status (Weekly Structure) */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-teal-400" />
              <h3 className="text-sm font-semibold text-white">
                考研英语二 (100分) · 7周全题型与三轮全真模考
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

        {/* Politics Status */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <h3 className="text-sm font-semibold text-white">
                考研政治 (100分) · 4阶段节奏联动推进
              </h3>
            </div>
            <span className="text-xs font-mono tabular-nums text-rose-400 font-bold">
              {completedPoliticsTasks} / {totalPoliticsTasks} 天完成 ({politicsPercent}%)
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden mb-3">
            <div
              className="h-full bg-rose-400 transition-all duration-300"
              style={{
                width: `${(completedPoliticsTasks / Math.max(totalPoliticsTasks, 1)) * 100}%`,
              }}
            />
          </div>
          <div className="text-xs text-slate-400 space-y-1">
            <p>
              <strong className="text-rose-300">今日主攻：</strong>
              <span className="text-slate-200 font-medium">
                {currentDayPlan.politicsTask.title}
              </span>
            </p>
            <p className="text-slate-500">
              纪律：恢复知识框架(10.30-11.5) → 肖八一轮(11.6-11.21) → 巩固选择 → 肖四背诵(12.1-18)。
            </p>
          </div>
        </div>
      </section>

      {/* 4. Verbatim Daily Schedule Table */}
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
                    <span>📖 非模考日</span>
                  </button>
                </div>

                <span
                  className={`text-[11px] font-mono px-2 py-0.5 rounded-full border font-semibold flex items-center gap-1 ${
                    scheduleMode === 'mock'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                  {scheduleMode === 'mock' ? '模考日作息 · 提醒联动' : '非模考日作息 · 提醒联动'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {scheduleMode === 'mock'
                  ? '模考日节奏：严防死守上午数学全真模考（8:30–11:30）与下午408主力（13:30–17:30 + 18:30–21:30），晚上复盘白纸重做'
                  : '非模考日节奏：上午数学专项与错题重做（8:30–11:30），下午408攻坚与政治刷题，晚上数学晚练与政治背诵'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
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
                  <th className="py-3 px-3.5 whitespace-nowrap min-w-[150px]">
                    <span>科目安排</span>
                  </th>
                  <th className="py-3 px-4 min-w-[320px]">
                    <span>具体执行内容与节奏</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 text-slate-300">
                {activeSlots.map((slot) => {
                  const isNow =
                    currentMinutes >= slot.startMinutes && currentMinutes < slot.endMinutes;
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
                            className={`font-mono font-bold ${
                              isNow ? 'text-amber-300' : 'text-slate-200'
                            }`}
                          >
                            {slot.timeRange}
                          </span>
                          {isNow && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-800/60 px-1.5 py-0.2 rounded w-fit animate-pulse">
                              <Zap className="h-2.5 w-2.5" /> 正在进行
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3 px-3.5 align-top">
                        <div className="space-y-1">
                          <div className="font-bold text-white text-xs sm:text-sm">
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
                        <p>{slot.content}</p>
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
                    <span className="font-mono text-xs font-bold text-amber-400">
                      {slot.timeRange}
                    </span>
                    {isNow ? (
                      <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded-full font-bold flex items-center gap-1 animate-pulse">
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

                  <h3 className="text-sm font-bold text-white">{slot.subjectTitle}</h3>

                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
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
              ? '执行铁律：严格遵守上午 3h 闭卷模考 + 下午 7h (4h主力+3h追赶) 408 集中爆破，晚间白纸重做闭环！'
              : '执行铁律：上午 3h 专项补漏与错题重做 + 下午 3.5h 408 与政治刷题 + 晚间 408主力与数学/政治闭环！'}
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

      {/* 5. Today's Action Checklist (Including Weekly English Progress Card) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <BookMarked className="h-4 w-4 text-amber-400" />
            <h2 className="text-base font-bold text-white">
              {currentDayPlan.date === todayDateStr
                ? "今日落地作战清单 (Today's Directives)"
                : `${currentDayPlan.formattedDate} 作战清单`}
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
              title="自定义与修改此日日程（数二、408、政治）"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
              <span>调整今日日程</span>
            </button>
            <span className="text-xs text-amber-300/90 hidden sm:flex items-center gap-1 font-medium">
              <span>完成代办即刻绽放礼炮 🎆</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Math 2 Task Card */}
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
                      [数学二] {currentDayPlan.math2Task.phase}
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

          {/* 408 Task Card */}
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
                      [408专业课] {currentDayPlan.csTask.phase}
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

          {/* Politics Routine Card */}
          <div
            className={`rounded-xl border p-4 transition-colors ${
              currentDayPlan.politicsTask.isCompleted
                ? 'border-emerald-800/60 bg-emerald-950/20'
                : 'border-red-500/20 bg-slate-900/60'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <button
                onClick={() => onTogglePoliticsComplete?.(currentDayPlan.date)}
                className="flex items-center gap-2 text-left group cursor-pointer"
              >
                {currentDayPlan.politicsTask.isCompleted ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                ) : (
                  <Circle className="h-5 w-5 text-slate-500 group-hover:text-red-400/80 shrink-0" />
                )}
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-mono font-medium text-red-300/80">
                      [考研政治]{' '}
                      {currentDayPlan.politicsDetail?.phaseTitle
                        ? `· ${currentDayPlan.politicsDetail.phaseTitle}`
                        : ''}
                    </span>
                    {currentDayPlan.politicsDetail?.dayTypeLabel && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-red-500/10 text-red-300/90 border border-red-500/20 font-semibold">
                        {currentDayPlan.politicsDetail.dayTypeLabel}
                      </span>
                    )}
                  </div>
                  <h3
                    className={`text-sm font-semibold text-white mt-0.5 ${
                      currentDayPlan.politicsTask.isCompleted ? 'line-through text-slate-400' : ''
                    }`}
                  >
                    {currentDayPlan.politicsTask.title}
                  </h3>
                </div>
              </button>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[11px] font-mono text-slate-400">
                  {currentDayPlan.politicsDetail?.durationRange ||
                    `${currentDayPlan.politicsTask.durationMinutes} 分钟`}
                </span>
                <button
                  onClick={() => onOpenEditModal(currentDayPlan, 'politics')}
                  className="p-1 rounded text-slate-400 hover:text-red-300 hover:bg-slate-800 transition-colors cursor-pointer"
                  title="修改今日政治任务"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="rounded-lg bg-slate-950/60 p-2.5 border border-slate-800/80">
                <span className="text-amber-400 font-medium">🎯 今日任务目标：</span>
                <p className="text-slate-300 mt-0.5 font-normal leading-relaxed">
                  {currentDayPlan.politicsDetail?.goal || currentDayPlan.politicsTask.action}
                </p>
              </div>

              {currentDayPlan.politicsDetail?.steps &&
                currentDayPlan.politicsDetail.steps.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[11px] text-slate-400 font-medium">执行节奏拆解：</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {currentDayPlan.politicsDetail.steps.map((st, i) => (
                        <div
                          key={i}
                          className="rounded bg-slate-950/50 p-2 border border-slate-800/70 text-[11px] space-y-0.5"
                        >
                          <div className="flex items-center justify-between text-red-300/90 font-semibold">
                            <span>{st.title}</span>
                            <span className="text-amber-400 font-mono text-[10px]">
                              {st.duration}
                            </span>
                          </div>
                          <p className="text-slate-400 text-[10px] leading-relaxed line-clamp-2">
                            {st.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {currentDayPlan.politicsDetail?.keyDirectives &&
                currentDayPlan.politicsDetail.keyDirectives.length > 0 && (
                  <div className="text-[11px] text-red-300/80 bg-red-950/20 p-2 rounded border border-red-900/30">
                    <span className="text-red-400/80 font-semibold">执行纪律：</span>
                    {currentDayPlan.politicsDetail.keyDirectives.join('；')}
                  </div>
                )}
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
                四科独立战地复盘笔记（各科彻底隔离）
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
              <span>📕 政治日笔记</span>
              {Boolean(getIsolatedNoteForSubject(currentDayPlan, 'politics').trim()) && (
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
                : `正在编辑【${currentDayPlan.formattedDate} · ${
                    activeNoteTab === 'math'
                      ? '数学二'
                      : activeNoteTab === 'cs'
                      ? '408专业课'
                      : '考研政治'
                  }专属日笔记】...（与其他科目彻底隔离）`
            }
            className="w-full h-24 rounded-lg border border-slate-800 bg-slate-950/80 p-3 text-xs text-slate-200 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none leading-relaxed"
          />

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 text-[11px]">
              {activeNoteTab === 'english'
                ? `当前归属：英语第${currentEnglishWeek.weekNumber}周独立周记`
                : `当前归属：${currentDayPlan.formattedDate} ${
                    activeNoteTab === 'math'
                      ? '数学二'
                      : activeNoteTab === 'cs'
                      ? '408专业课'
                      : '考研政治'
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
                  : activeNoteTab === 'math'
                  ? '数二日笔记'
                  : activeNoteTab === 'cs'
                  ? '408日笔记'
                  : '政治日笔记'}
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
    </div>
  );
};
