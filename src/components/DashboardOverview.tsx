import React, { useState } from 'react';
import { DayPlan } from '../types/kaoyan';
import { BOOST_QUOTES } from '../data/mindsetCards';
import { getChinaDateInfo } from '../utils/chinaDate';
import {
  Flame,
  CheckCircle2,
  Circle,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  Edit3,
  BookMarked,
  Sparkles,
  Layers,
  GraduationCap,
  Cpu,
  BookmarkCheck,
  StickyNote,
  CalendarCheck,
  Table,
  CheckSquare,
  Zap,
  Bell,
} from 'lucide-react';
import { desktopNotificationManager } from '../utils/desktopNotification';

interface DashboardOverviewProps {
  currentDayPlan: DayPlan;
  allPlans: DayPlan[];
  todayDateStr?: string;
  onSelectDay: (date: string) => void;
  onJumpToToday?: () => void;
  onToggleMathComplete: (taskId: string) => void;
  onToggleCsComplete: (taskId: string) => void;
  onToggleEnglishComplete?: (date: string) => void;
  onTogglePoliticsComplete?: (date: string) => void;
  onSaveDayNotes: (date: string, notes: string) => void;
  onNavigateToTab: (tab: 'timeline' | 'workstation' | 'mindset') => void;
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

const USER_SCHEDULE_SLOTS: ScheduleSlot[] = [
  {
    id: 'slot-1',
    timeRange: '08:00 – 08:30',
    subjectTitle: '政治 / 英语早读 0.5h',
    subjectCategory: 'politics',
    badge: '早读唤醒',
    content: '唤醒大脑：快速过一遍英语高频词或政治核心考点提要，避免一上来直接进数学考场导致前30分钟大脑发懵。利用午饭前的碎片时间刷政治模拟卷选择题（肖八、腿四、徐六等只刷选择题）并直接复盘错题。',
    startMinutes: 8 * 60,
    endMinutes: 8 * 60 + 30,
  },
  {
    id: 'slot-2',
    timeRange: '08:30 – 11:30',
    subjectTitle: '数学（核心块：3h）',
    subjectCategory: 'math',
    badge: '真题模考·重中之重',
    content: '全真掐表模考 / 深度订正。做套卷日：严格掐表做真题或张宇卷；复盘日：重做前一天套卷的错题 + 专项补漏薄弱章节。',
    startMinutes: 8 * 60 + 30,
    endMinutes: 11 * 60 + 30,
  },
  {
    id: 'slot-3',
    timeRange: '11:30 – 12:30',
    subjectTitle: '即时复盘 + 动态时间',
    subjectCategory: 'math',
    badge: '趁热打铁',
    content: '数学因为基本公式/定理等的错题，及时回忆与翻看讲义定理，加深考场条件反射。',
    startMinutes: 11 * 60 + 30,
    endMinutes: 12 * 60 + 30,
  },
  {
    id: 'slot-4',
    timeRange: '12:30 – 13:30',
    subjectTitle: '英语 1h',
    subjectCategory: 'english',
    badge: '精读保持手感',
    content: '保持阅读手感（每天1篇精读复盘）+ 11月起加入大小作文模板整理与仿写、新题型/翻译训练。',
    startMinutes: 12 * 60 + 30,
    endMinutes: 13 * 60 + 30,
  },
  {
    id: 'slot-5',
    timeRange: '13:30 – 17:30',
    subjectTitle: '408（主力块：4h）',
    subjectCategory: 'cs',
    badge: '专业课攻坚',
    content: '抓紧收尾一轮/二轮滞后科目，进入 408 真题套卷演练与计组/OS大题专项突破。',
    startMinutes: 13 * 60 + 30,
    endMinutes: 17 * 60 + 30,
  },
  {
    id: 'slot-6',
    timeRange: '17:30 – 18:30',
    subjectTitle: '晚饭 + 休息放空',
    subjectCategory: 'rest',
    badge: '缓存清零',
    content: '离开书桌散步或短暂闭目养神 10 分钟，给大脑清零缓存，恢复体能精力。',
    startMinutes: 17 * 60 + 30,
    endMinutes: 18 * 60 + 30,
  },
  {
    id: 'slot-7',
    timeRange: '18:30 – 21:30',
    subjectTitle: '408 追赶 3h',
    subjectCategory: 'cs',
    badge: '落后模块专项突破',
    content: '专门攻克 408 落后模块（计组流水线/数据通路、OS PV信号量大题、计网协议分析）。',
    startMinutes: 18 * 60 + 30,
    endMinutes: 21 * 60 + 30,
  },
  {
    id: 'slot-8',
    timeRange: '21:30 – 23:30',
    subjectTitle: '数学（复盘块）2h',
    subjectCategory: 'math',
    badge: '白纸重做·不开新卷',
    content: '只做复盘，不开新卷！白纸重做当天上午套卷的卡壳题、整理条件反射笔记；若当天已复盘完，直接把这半小时让给 408。',
    startMinutes: 21 * 60 + 30,
    endMinutes: 23 * 60 + 20,
  },
  {
    id: 'slot-9',
    timeRange: '23:20 – 24:00',
    subjectTitle: '政治背诵',
    subjectCategory: 'politics',
    badge: '主观题框架速记',
    content: '22:20–23:00 / 23:20 政治主观题框架背诵（11月中下旬肖四出来后重点发力狂背）。',
    startMinutes: 23 * 60 + 20,
    endMinutes: 24 * 60,
  },
];

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  currentDayPlan,
  allPlans,
  todayDateStr,
  onSelectDay,
  onJumpToToday,
  onToggleMathComplete,
  onToggleCsComplete,
  onToggleEnglishComplete,
  onTogglePoliticsComplete,
  onSaveDayNotes,
  onNavigateToTab,
  daysToExam,
  daysToMathPastPapers,
  daysToCsPastPapers,
  daysToXiao8,
}) => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [noteContent, setNoteContent] = useState(currentDayPlan.dailyNote || currentDayPlan.math2Task?.notes || '');
  const [isNoteSaved, setIsNoteSaved] = useState(false);
  const [scheduleViewMode, setScheduleViewMode] = useState<'table' | 'cards'>('table');
  const [notifPermission, setNotifPermission] = useState<NotificationPermission | 'unsupported'>(() => {
    return desktopNotificationManager.getPermissionStatus();
  });
  const [testSentToast, setTestSentToast] = useState(false);

  const handleEnableNotification = async () => {
    const perm = await desktopNotificationManager.requestPermission();
    setNotifPermission(perm);
  };

  const handleTestNotification = () => {
    desktopNotificationManager.sendTestNotification();
    setTestSentToast(true);
    setTimeout(() => setTestSentToast(false), 3000);
  };

  const chinaNow = getChinaDateInfo();
  const currentMinutes = chinaNow.hour * 60 + chinaNow.minute;

  React.useEffect(() => {
    setNoteContent(currentDayPlan.dailyNote || currentDayPlan.math2Task?.notes || '');
  }, [currentDayPlan.date, currentDayPlan.dailyNote, currentDayPlan.math2Task?.notes]);

  const nextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % BOOST_QUOTES.length);
  };

  const handleSaveNote = () => {
    onSaveDayNotes(currentDayPlan.date, noteContent);
    setIsNoteSaved(true);
    setTimeout(() => setIsNoteSaved(false), 2000);
  };

  // Calculate overall stats
  const totalMathTasks = allPlans.filter((p) => p.math2Task).length;
  const completedMathTasks = allPlans.filter((p) => p.math2Task?.isCompleted).length;
  const mathPercent = totalMathTasks > 0 ? Math.round((completedMathTasks / totalMathTasks) * 100) : 0;

  const totalCsTasks = allPlans.filter((p) => p.csTask).length;
  const completedCsTasks = allPlans.filter((p) => p.csTask?.isCompleted).length;
  const csPercent = totalCsTasks > 0 ? Math.round((completedCsTasks / totalCsTasks) * 100) : 0;

  const hasNote = Boolean(currentDayPlan.dailyNote && currentDayPlan.dailyNote.trim().length > 0);

  // Helper for slot category styling
  const getSubjectBadgeStyle = (category: ScheduleSlot['subjectCategory']) => {
    switch (category) {
      case 'math':
        return 'bg-amber-500/20 text-amber-300 border border-amber-500/40';
      case 'cs':
        return 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40';
      case 'english':
        return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
      case 'politics':
        return 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40';
      default:
        return 'bg-slate-800 text-slate-300 border border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Tactical Command Banner */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 p-6 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <Flame className="h-4 w-4" />
              <span>当前战略指令 · 战时冲刺指挥部</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300 font-mono">
                {currentDayPlan.formattedDate} ({currentDayPlan.weekday})
              </span>
              {currentDayPlan.date === todayDateStr && (
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.2 rounded-full font-bold">
                  ★ 东八区今日实战
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-['Plus_Jakarta_Sans',sans-serif]">
              {currentDayPlan.theme}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              核心方针：<span className="text-amber-300 font-medium">战力爆发，科学突击，死守 10.27 数二真题与 11.11 408全真套卷</span>。
              数二 53 天真题与全真模考闭环决战已全面打响，408稳扎稳打全速推进，直通 12.19-12.20 考研大决战！
            </p>

            {/* Quick Track Shortcuts */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-slate-400 font-medium">专属推进表直达：</span>
              <button
                onClick={() => onNavigateToTab('timeline')}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-xs font-semibold text-amber-300 transition-colors cursor-pointer"
              >
                <GraduationCap className="h-3.5 w-3.5" />
                <span>📐 数学二专属表 (53天真题)</span>
              </button>
              <button
                onClick={() => onNavigateToTab('timeline')}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs font-semibold text-cyan-300 transition-colors cursor-pointer"
              >
                <Cpu className="h-3.5 w-3.5" />
                <span>💻 408专业课专属表 (74天全景)</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0 self-start md:self-auto">
            {todayDateStr && currentDayPlan.date !== todayDateStr && (
              <button
                onClick={onJumpToToday}
                className="flex items-center gap-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 px-3 py-2 text-xs font-semibold text-amber-300 transition-all shadow-xs cursor-pointer"
                title="一键切回今天真实代办"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>回到今日</span>
              </button>
            )}

            <select
              value={currentDayPlan.date}
              onChange={(e) => onSelectDay(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-800/90 px-3 py-2 text-xs font-medium text-slate-200 focus:border-amber-400 focus:outline-none cursor-pointer"
            >
              {allPlans.map((plan) => (
                <option key={plan.date} value={plan.date}>
                  {plan.formattedDate} ({plan.weekday}) {plan.date === todayDateStr ? '★ 今日' : ''} - {plan.theme.slice(0, 16)}...
                </option>
              ))}
            </select>

            <button
              onClick={() => onNavigateToTab('timeline')}
              className="flex items-center gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-2 text-xs font-semibold text-white transition-colors cursor-pointer"
            >
              <span>天级推进表</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
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
            <span className="font-mono text-cyan-400 font-semibold">四科收官</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-cyan-400">
              {daysToCsPastPapers > 0 ? daysToCsPastPapers : '0'}
            </span>
            <span className="text-xs text-slate-400">天后开启2010-2024套卷</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 truncate">
            操作系统11天(10.21-31) → 计网10天(11.1-10) → 套卷模考
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-all hover:border-slate-700">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>政治《肖八》接战 (11.10)</span>
            <span className="font-mono text-indigo-400 font-semibold">模拟卷上市</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-indigo-400">
              {daysToXiao8 > 0 ? daysToXiao8 : '0'}
            </span>
            <span className="text-xs text-slate-400">天后全面停刷1000题</span>
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

      {/* 3. Subject Progress Meters */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Math 2 Status */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <h3 className="text-sm font-semibold text-white">数学二 (150分) · 53天真题与全真模考决战</h3>
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
              <span className="text-slate-200 font-medium">{currentDayPlan.math2Task?.title || '真题套卷模考'}</span>
            </p>
            <p className="text-slate-500">
              纪律：上午 08:30—11:30 严格闭卷掐表；隔天遮住答案在白纸上独立重写全套错题，绝不自欺欺人！
            </p>
          </div>
        </div>

        {/* 408 Status */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
              <h3 className="text-sm font-semibold text-white">408 计算机专业课 (150分) · 74天全景特种兵</h3>
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
              <span className="text-slate-200 font-medium">{currentDayPlan.csTask?.phase} · {currentDayPlan.csTask?.title}</span>
            </p>
            <p className="text-slate-500">
              纪律：计组(10.8-20已结) → 操作系统(10.21-31) → 计网(11.1-10) → 11.11统考真题大决战。
            </p>
          </div>
        </div>
      </section>

      {/* 4. Verbatim Daily Schedule Table: 贴上我的日程表 */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white font-['Plus_Jakarta_Sans',sans-serif]">
                  战时每日执行时刻表 (Daily Battle Timeboxing)
                </h2>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold">
                  全真考场作息
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                严防死守上午数学真题（8:30–11:30）与下午408主力（13:30–17:30 + 18:30–21:30），晚上复盘白纸重做
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
                title="表格视图"
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
                title="卡片流视图"
              >
                <Layers className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">时序卡</span>
              </button>
            </div>
          </div>
        </div>

        {/* Windows Desktop Notification Status & Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg shrink-0 ${
              notifPermission === 'granted'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
            }`}>
              <Bell className="h-4 w-4" />
            </div>
            <div className="text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">Windows 桌面到达通知（右下角弹窗）</span>
                {notifPermission === 'granted' ? (
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.2 rounded-full font-semibold">
                    ✓ 系统已授权
                  </span>
                ) : notifPermission === 'denied' ? (
                  <span className="text-[10px] font-mono text-rose-400 bg-rose-950/60 border border-rose-800/60 px-2 py-0.2 rounded-full font-semibold">
                    ✗ 浏览器已拦截
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-amber-300 bg-amber-950/60 border border-amber-800/60 px-2 py-0.2 rounded-full font-semibold">
                    待开启
                  </span>
                )}
              </div>
              <p className="text-slate-400 mt-0.5 text-[11px] leading-relaxed">
                {notifPermission === 'granted'
                  ? '节点到达时（如 08:30 数学模考、13:30 408主力等），Windows 将在桌面右下角自动弹出 Toast 提醒并伴有提示音。'
                  : notifPermission === 'denied'
                  ? '通知已被当前浏览器屏蔽，请在浏览器地址栏左侧“网站设置”中允许通知。'
                  : '开启后，即使你在后台刷真题或翻讲义，时间节点一到 Windows 右下角也会准时弹窗提醒！'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            {notifPermission !== 'granted' && (
              <button
                type="button"
                onClick={handleEnableNotification}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                <Bell className="h-3.5 w-3.5" />
                <span>开启 Windows 弹窗权限</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleTestNotification}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-xs font-semibold transition-all cursor-pointer"
              title="立即发送测试弹窗，检验右下角弹窗效果"
            >
              <Zap className="h-3.5 w-3.5 text-amber-400" />
              <span>{testSentToast ? '已触发测试弹窗！' : '测试右下角弹窗'}</span>
            </button>
          </div>
        </div>

        {/* View Mode 1: Verbatim Markdown Table View */}
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
                {USER_SCHEDULE_SLOTS.map((slot) => {
                  const isNow = currentMinutes >= slot.startMinutes && currentMinutes < slot.endMinutes;
                  return (
                    <tr
                      key={slot.id}
                      className={`transition-colors ${
                        isNow
                          ? 'bg-amber-500/10 hover:bg-amber-500/15 font-medium'
                          : 'hover:bg-slate-800/40'
                      }`}
                    >
                      {/* Column 1: 时间段 */}
                      <td className="py-3 px-3.5 align-top whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          <span className={`font-mono font-bold ${isNow ? 'text-amber-300' : 'text-slate-200'}`}>
                            {slot.timeRange}
                          </span>
                          {isNow && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-800/60 px-1.5 py-0.2 rounded w-fit animate-pulse">
                              <Zap className="h-2.5 w-2.5" /> 正在进行
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Column 2: 科目安排 */}
                      <td className="py-3 px-3.5 align-top">
                        <div className="space-y-1">
                          <div className="font-bold text-white text-xs sm:text-sm">
                            {slot.subjectTitle}
                          </div>
                          <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-mono font-medium ${getSubjectBadgeStyle(slot.subjectCategory)}`}>
                            {slot.badge}
                          </span>
                        </div>
                      </td>

                      {/* Column 3: 具体执行内容与节奏 */}
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
          /* View Mode 2: Sequential Interactive Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {USER_SCHEDULE_SLOTS.map((slot) => {
              const isNow = currentMinutes >= slot.startMinutes && currentMinutes < slot.endMinutes;
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
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-medium ${getSubjectBadgeStyle(slot.subjectCategory)}`}>
                        {slot.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-white">
                    {slot.subjectTitle}
                  </h3>

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
            执行铁律：严格遵守上午 3h 闭卷模考 + 下午 7h (4h主力+3h追赶) 408 集中爆破，晚间白纸重做闭环！
          </span>
          <button
            onClick={() => onNavigateToTab('workstation')}
            className="text-amber-400 hover:text-amber-300 font-medium underline underline-offset-2 flex items-center gap-1"
          >
            <span>进入 24H 沉浸番茄工作台</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </section>

      {/* 5. Today's Action Checklist (The Real Battlefield) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <BookMarked className="h-4 w-4 text-amber-400" />
            <h2 className="text-base font-bold text-white">
              {currentDayPlan.date === todayDateStr ? "今日落地作战清单 (Today's Directives)" : `${currentDayPlan.formattedDate} 作战清单`}
            </h2>
            {currentDayPlan.date === todayDateStr && (
              <span className="text-[11px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-semibold">
                东八区 · 今日实时代办
              </span>
            )}
          </div>
          <span className="text-xs text-amber-300/90 flex items-center gap-1 font-medium">
            <span>完成代办即刻绽放礼炮烟花 🎆</span>
            <span className="text-slate-500 hidden sm:inline">· 本地自动实时保存</span>
          </span>
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
                    <h3 className={`text-sm font-semibold text-white ${
                      currentDayPlan.math2Task.isCompleted ? 'line-through text-slate-400' : ''
                    }`}>
                      {currentDayPlan.math2Task.title}
                    </h3>
                  </div>
                </button>
                <span className="text-[11px] font-mono text-slate-400 shrink-0">
                  {currentDayPlan.math2Task.suggestedDurationMinutes} 分钟
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="rounded-lg bg-slate-950/60 p-2.5 border border-slate-800/80">
                  <span className="text-slate-400 font-medium">核心聚焦：</span>
                  <p className="text-slate-300 mt-0.5 leading-relaxed">{currentDayPlan.math2Task.focusArea}</p>
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
                    <p className="text-slate-400 mt-0.5">{currentDayPlan.math2Task.bigQuestionTarget}</p>
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
                    <h3 className={`text-sm font-semibold text-white ${
                      currentDayPlan.csTask.isCompleted ? 'line-through text-slate-400' : ''
                    }`}>
                      {currentDayPlan.csTask.title}
                    </h3>
                  </div>
                </button>
                <span className="text-[11px] font-mono text-slate-400 shrink-0">
                  {currentDayPlan.csTask.suggestedDurationMinutes} 分钟
                </span>
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
                    <p className="text-slate-400 mt-0.5">{currentDayPlan.csTask.bigQuestionTarget}</p>
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

          {/* English Routine Card */}
          <div
            className={`rounded-xl border p-4 transition-colors ${
              currentDayPlan.englishTask.isCompleted
                ? 'border-emerald-800/60 bg-emerald-950/20'
                : 'border-slate-800 bg-slate-900/60'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <button
                onClick={() => onToggleEnglishComplete?.(currentDayPlan.date)}
                className="flex items-center gap-2 text-left group cursor-pointer"
              >
                {currentDayPlan.englishTask.isCompleted ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                ) : (
                  <Circle className="h-5 w-5 text-slate-500 group-hover:text-emerald-400 shrink-0" />
                )}
                <div>
                  <span className="text-xs font-mono font-medium text-emerald-400">
                    [考研英语] 12:30 - 13:30 (每天1篇精读复盘)
                  </span>
                  <h3
                    className={`text-sm font-semibold text-white ${
                      currentDayPlan.englishTask.isCompleted ? 'line-through text-slate-400' : ''
                    }`}
                  >
                    {currentDayPlan.englishTask.title}
                  </h3>
                </div>
              </button>
              <span className="text-[11px] font-mono text-slate-400 shrink-0">
                {currentDayPlan.englishTask.durationMinutes} 分钟
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60">
              {currentDayPlan.englishTask.action}
            </p>
            <div className="mt-2 text-[11px] text-slate-500">
              纪律：保持阅读手感，11月起加入大小作文模板整理与仿写，严格控时！
            </div>
          </div>

          {/* Politics Routine Card */}
          <div
            className={`rounded-xl border p-4 transition-colors ${
              currentDayPlan.politicsTask.isCompleted
                ? 'border-emerald-800/60 bg-emerald-950/20'
                : 'border-slate-800 bg-slate-900/60'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <button
                onClick={() => onTogglePoliticsComplete?.(currentDayPlan.date)}
                className="flex items-center gap-2 text-left group cursor-pointer"
              >
                {currentDayPlan.politicsTask.isCompleted ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                ) : (
                  <Circle className="h-5 w-5 text-slate-500 group-hover:text-indigo-400 shrink-0" />
                )}
                <div>
                  <span className="text-xs font-mono font-medium text-indigo-400">
                    [考研政治] 早读08:00与夜间23:20背诵
                  </span>
                  <h3
                    className={`text-sm font-semibold text-white ${
                      currentDayPlan.politicsTask.isCompleted ? 'line-through text-slate-400' : ''
                    }`}
                  >
                    {currentDayPlan.politicsTask.title}
                  </h3>
                </div>
              </button>
              <span className="text-[11px] font-mono text-slate-400 shrink-0">
                {currentDayPlan.politicsTask.durationMinutes} 分钟
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60">
              {currentDayPlan.politicsTask.action}
            </p>
            <div className="mt-2 text-[11px] text-slate-500">
              纪律：碎片时间刷模拟卷选择题，睡前23:20背诵政治主观题逻辑框架！
            </div>
          </div>
        </div>
      </section>

      {/* 6. Daily Battlefield Note & Motivation Boost */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Daily Note Area */}
        <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900/50 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StickyNote className="h-4 w-4 text-amber-400" />
              <h3 className="text-sm font-semibold text-white">
                战地每日复盘与未完成留存记录 ({currentDayPlan.formattedDate})
              </h3>
              {hasNote && (
                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-700/50 px-2 py-0.2 rounded-full font-semibold">
                  ✓ 已记录
                </span>
              )}
            </div>
            {isNoteSaved && (
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold animate-pulse">
                <CheckCircle2 className="h-3.5 w-3.5" /> 已保存
              </span>
            )}
          </div>

          {/* Quick Tag Templates */}
          <div className="flex flex-wrap gap-1.5">
            {[
              '⚠️ 今日有未完成任务，明日优先补救',
              '💡 核心概念/错题未吃透，需二次回炉',
              '⏰ 某科耗时超限，需调整时间分配',
              '🎯 大题解题卡壳，需找题型加练',
              '✅ 状态良好，四科全部按既定节奏攻克',
            ].map((tag, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setNoteContent((prev) => {
                    const prefix = prev.trim() ? prev.trim() + '\n' : '';
                    return prefix + tag;
                  });
                }}
                className="px-2 py-0.8 rounded bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-[11px] text-slate-300 hover:text-amber-300 transition-colors cursor-pointer text-left"
              >
                + {tag}
              </button>
            ))}
          </div>

          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="记录今天任务的真实完成情况、未做完的原因、遗留的重难点，或明日需要优先补救的代办..."
            className="w-full h-24 rounded-lg border border-slate-800 bg-slate-950/80 p-3 text-xs text-slate-200 placeholder:text-slate-600 focus:border-amber-400 focus:outline-none leading-relaxed"
          />

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 text-[11px]">
              {noteContent.length > 0 ? `已输入 ${noteContent.length} 字` : '未完成任务写在这里，天级推进表会醒目标记'}
            </span>
            <button
              onClick={handleSaveNote}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <BookmarkCheck className="h-4 w-4" />
              <span>保存复盘笔记</span>
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
              进入心态急救舱 →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
