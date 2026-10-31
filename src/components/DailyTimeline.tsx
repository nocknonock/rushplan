import React, { useState } from 'react';
import { DayPlan } from '../types/kaoyan';
import { SUBSEQUENT_PHASES } from '../data/scheduleData';
import { POLITICS_PHASES } from '../data/politicsScheduleData';
import {
  Calendar,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  BookOpen,
  Filter,
  Flame,
  ArrowRight,
  Clock,
  Sparkles,
  StickyNote,
  FileEdit,
  BookmarkCheck,
  X,
  Trash2,
  Layers,
  GraduationCap,
  Cpu,
  Target,
  Check,
  Award,
} from 'lucide-react';

interface DailyTimelineProps {
  plans: DayPlan[];
  selectedDate: string;
  todayDateStr?: string;
  onSelectDay: (date: string) => void;
  onJumpToToday?: () => void;
  onToggleMathComplete: (taskId: string) => void;
  onToggleCsComplete: (taskId: string) => void;
  onToggleEnglishComplete?: (date: string) => void;
  onTogglePoliticsComplete?: (date: string) => void;
  onSaveDailyNote?: (date: string, note: string) => void;
}

export const DailyTimeline: React.FC<DailyTimelineProps> = ({
  plans,
  selectedDate,
  todayDateStr,
  onSelectDay,
  onJumpToToday,
  onToggleMathComplete,
  onToggleCsComplete,
  onToggleEnglishComplete,
  onTogglePoliticsComplete,
  onSaveDailyNote,
}) => {
  // Primary Decoupled Track: 'math' (数学二专属) | 'cs' (408专属) | 'politics' (政治专属) | 'all' (全科多轨统筹)
  const [viewTrack, setViewTrack] = useState<'math' | 'cs' | 'politics' | 'all'>('math');

  // Sub-phase filter for Math
  const [mathPhaseFilter, setMathPhaseFilter] = useState<'all' | 'phase1' | 'phase2' | 'phase3' | 'exam'>('all');

  // Sub-phase filter for CS
  const [csPhaseFilter, setCsPhaseFilter] = useState<'all' | 'co' | 'os' | 'cn' | 'pastPapers' | 'exam'>('all');

  // Sub-phase filter for Politics (10.30-11.5, 11.6-11.21, 11.22-11.30, 12.1-12.18)
  const [politicsPhaseFilter, setPoliticsPhaseFilter] = useState<'all' | 'phase1' | 'phase2' | 'phase3' | 'phase4'>('all');

  // Status Filter
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [filterNotesOnly, setFilterNotesOnly] = useState<boolean>(false);
  const [expandedDate, setExpandedDate] = useState<string | null>(selectedDate);

  // Note Modal state
  const [editingPlan, setEditingPlan] = useState<DayPlan | null>(null);
  const [noteInput, setNoteInput] = useState<string>('');

  // Sync expanded card whenever selectedDate changes
  React.useEffect(() => {
    if (selectedDate) {
      setExpandedDate(selectedDate);
    }
  }, [selectedDate]);

  const notesCount = plans.filter((p) => p.dailyNote && p.dailyNote.trim().length > 0).length;

  const handleOpenNoteModal = (plan: DayPlan, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setEditingPlan(plan);
    setNoteInput(plan.dailyNote || '');
  };

  const handleSaveNote = () => {
    if (!editingPlan) return;
    onSaveDailyNote?.(editingPlan.date, noteInput);
    setEditingPlan(null);
  };

  const handleClearNote = () => {
    if (!editingPlan) return;
    if (window.confirm('确定要清空该日的复盘笔记吗？')) {
      onSaveDailyNote?.(editingPlan.date, '');
      setEditingPlan(null);
    }
  };

  // Helper to determine Math task phase category
  const getMathCategory = (date: string) => {
    if (date >= '2026-12-19') return 'exam';
    if (date >= '2026-11-25') return 'phase3';
    if (date >= '2026-11-05') return 'phase2';
    if (date >= '2026-10-27') return 'phase1';
    return 'early';
  };

  // Helper to determine CS task phase category
  const getCsCategory = (date: string) => {
    if (date >= '2026-12-20') return 'exam';
    if (date >= '2026-11-11') return 'pastPapers';
    if (date >= '2026-11-01') return 'cn';
    if (date >= '2026-10-21') return 'os';
    return 'co';
  };

  // Helper to determine Politics task phase category (10.30-11.5, 11.6-11.21, 11.22-11.30, 12.1-12.18)
  const getPoliticsCategory = (date: string) => {
    if (date >= '2026-12-01') return 'phase4';
    if (date >= '2026-11-22') return 'phase3';
    if (date >= '2026-11-06') return 'phase2';
    if (date >= '2026-10-30') return 'phase1';
    return 'early';
  };

  // Filter plans based on active track and sub-filters
  const filteredPlans = plans.filter((plan) => {
    // 1. Notes only filter
    if (filterNotesOnly && (!plan.dailyNote || plan.dailyNote.trim().length === 0)) {
      return false;
    }

    // 2. Track sub-phase filters
    if (viewTrack === 'math') {
      if (!plan.math2Task) return false;
      const cat = getMathCategory(plan.date);
      if (mathPhaseFilter === 'phase1' && cat !== 'phase1') return false;
      if (mathPhaseFilter === 'phase2' && cat !== 'phase2') return false;
      if (mathPhaseFilter === 'phase3' && cat !== 'phase3') return false;
      if (mathPhaseFilter === 'exam' && cat !== 'exam') return false;

      // Status filter for Math
      if (statusFilter === 'completed' && !plan.math2Task.isCompleted) return false;
      if (statusFilter === 'pending' && plan.math2Task.isCompleted) return false;
      return true;
    }

    if (viewTrack === 'cs') {
      if (!plan.csTask) return false;
      const cat = getCsCategory(plan.date);
      if (csPhaseFilter === 'co' && cat !== 'co') return false;
      if (csPhaseFilter === 'os' && cat !== 'os') return false;
      if (csPhaseFilter === 'cn' && cat !== 'cn') return false;
      if (csPhaseFilter === 'pastPapers' && cat !== 'pastPapers') return false;
      if (csPhaseFilter === 'exam' && cat !== 'exam') return false;

      // Status filter for CS
      if (statusFilter === 'completed' && !plan.csTask.isCompleted) return false;
      if (statusFilter === 'pending' && plan.csTask.isCompleted) return false;
      return true;
    }

    if (viewTrack === 'politics') {
      const cat = getPoliticsCategory(plan.date);
      if (politicsPhaseFilter === 'phase1' && cat !== 'phase1') return false;
      if (politicsPhaseFilter === 'phase2' && cat !== 'phase2') return false;
      if (politicsPhaseFilter === 'phase3' && cat !== 'phase3') return false;
      if (politicsPhaseFilter === 'phase4' && cat !== 'phase4') return false;

      // Status filter for Politics
      const isPolDone = Boolean(plan.politicsTask?.isCompleted);
      if (statusFilter === 'completed' && !isPolDone) return false;
      if (statusFilter === 'pending' && isPolDone) return false;
      return true;
    }

    // viewTrack === 'all'
    const mathDone = !plan.math2Task || plan.math2Task.isCompleted;
    const csDone = !plan.csTask || plan.csTask.isCompleted;
    const polDone = !plan.politicsTask || plan.politicsTask.isCompleted;
    const isAllDone = mathDone && csDone && polDone;

    if (statusFilter === 'completed' && !isAllDone) return false;
    if (statusFilter === 'pending' && isAllDone) return false;

    return true;
  });

  const toggleExpand = (date: string) => {
    setExpandedDate((prev) => (prev === date ? null : date));
  };

  // Stats calculation
  const totalMathDays = plans.filter((p) => p.math2Task).length;
  const completedMathDays = plans.filter((p) => p.math2Task?.isCompleted).length;
  const mathPercent = totalMathDays > 0 ? Math.round((completedMathDays / totalMathDays) * 100) : 0;

  const totalCsDays = plans.filter((p) => p.csTask).length;
  const completedCsDays = plans.filter((p) => p.csTask?.isCompleted).length;
  const csPercent = totalCsDays > 0 ? Math.round((completedCsDays / totalCsDays) * 100) : 0;

  const corePoliticsPlans = plans.filter((p) => p.date >= '2026-10-30' && p.date <= '2026-12-18');
  const totalPoliticsDays = corePoliticsPlans.length;
  const completedPoliticsDays = corePoliticsPlans.filter((p) => p.politicsTask?.isCompleted).length;
  const politicsPercent = totalPoliticsDays > 0 ? Math.round((completedPoliticsDays / totalPoliticsDays) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* 1. Master Decoupled Track Navigation Bar */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-3 sm:p-4 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Primary View Track Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-amber-400" />
              <span>专项日程表切换:</span>
            </span>
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setViewTrack('all')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewTrack === 'all'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950/50 scale-[1.02]'
                    : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-900'
                }`}
              >
                <Target className="h-4 w-4" />
                <span>⚔️ 三科并列日程表 (数学·408·政治同级)</span>
              </button>

              <button
                onClick={() => setViewTrack('politics')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewTrack === 'politics'
                    ? 'bg-rose-500 text-slate-950 shadow-md shadow-rose-950/50 scale-[1.02]'
                    : 'text-slate-300 hover:text-rose-400 hover:bg-slate-900'
                }`}
              >
                <BookOpen className="h-4 w-4" />
                <span>📕 政治专属日程表</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${viewTrack === 'politics' ? 'bg-slate-950/30 text-slate-900' : 'bg-slate-800 text-rose-400'}`}>
                  4大阶段
                </span>
              </button>

              <button
                onClick={() => setViewTrack('math')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewTrack === 'math'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-950/50 scale-[1.02]'
                    : 'text-slate-300 hover:text-amber-400 hover:bg-slate-900'
                }`}
              >
                <GraduationCap className="h-4 w-4" />
                <span>📐 数学二专属日程表</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${viewTrack === 'math' ? 'bg-slate-950/30 text-slate-900' : 'bg-slate-800 text-amber-400'}`}>
                  53天真题
                </span>
              </button>

              <button
                onClick={() => setViewTrack('cs')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewTrack === 'cs'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950/50 scale-[1.02]'
                    : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-900'
                }`}
              >
                <Cpu className="h-4 w-4" />
                <span>💻 408专业课专属日程表</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${viewTrack === 'cs' ? 'bg-slate-950/30 text-slate-900' : 'bg-slate-800 text-cyan-400'}`}>
                  74天全景
                </span>
              </button>
            </div>
          </div>

          {/* Quick Action Controls: Jump to Today & Notes Filter */}
          <div className="flex flex-wrap items-center gap-2">
            {todayDateStr && (
              <button
                onClick={() => {
                  onJumpToToday?.();
                  setExpandedDate(todayDateStr);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                  selectedDate === todayDateStr
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                }`}
                title="快速聚焦到今日真实东八区战况"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>回到今日</span>
              </button>
            )}

            {/* Status Filter */}
            <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-lg p-1 text-xs">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  statusFilter === 'all' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                全部
              </button>
              <button
                onClick={() => setStatusFilter('pending')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  statusFilter === 'pending' ? 'bg-slate-800 text-amber-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                待攻坚
              </button>
              <button
                onClick={() => setStatusFilter('completed')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  statusFilter === 'completed' ? 'bg-slate-800 text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                已攻克
              </button>
            </div>

            {/* Notes Filter */}
            <button
              onClick={() => setFilterNotesOnly((prev) => !prev)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                filterNotesOnly
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-xs'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
              title="仅筛选记录过复盘备忘与未完成留存的日期"
            >
              <StickyNote className="h-3.5 w-3.5 text-amber-400" />
              <span>有笔记 ({notesCount})</span>
            </button>
          </div>
        </div>

        {/* 2. Track Specific Sub-Phase Bar & Header Information */}
        {viewTrack === 'math' && (
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-amber-400">
                  数学二 53天真题与全真模考决战日程
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  (10月27日 — 12月18日落实到日 + 12.19考前定心 + 12.20决战大捷)
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                严格闭卷掐表 08:30—11:30 模考 + 隔天白纸深度订正重写错题，彻底解耦不受其他科目干扰！
              </p>
            </div>

            {/* Sub-phase Filter Tabs for Math */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <button
                onClick={() => setMathPhaseFilter('all')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  mathPhaseFilter === 'all'
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                全阶段
              </button>
              <button
                onClick={() => setMathPhaseFilter('phase1')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  mathPhaseFilter === 'phase1'
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                一阶段: 硬仗练兵 (9天)
              </button>
              <button
                onClick={() => setMathPhaseFilter('phase2')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  mathPhaseFilter === 'phase2'
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                二阶段: 新大纲抗压 (20天)
              </button>
              <button
                onClick={() => setMathPhaseFilter('phase3')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  mathPhaseFilter === 'phase3'
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                三阶段: 冲刺封箱 (24天)
              </button>
              <button
                onClick={() => setMathPhaseFilter('exam')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  mathPhaseFilter === 'exam'
                    ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                考研初试 (12.19-20)
              </button>
            </div>
          </div>
        )}

        {viewTrack === 'cs' && (
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-cyan-400">
                  408 计算机学科专业综合专项日程
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  (计组决战 + 操作系统精准打击 + 计网速通 + 历年真题套卷大决战)
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                聚焦下午 14:00—17:30 专项攻坚，打通“Cache-TLB-Page”与“PV四步法”四大跨学科母题！
              </p>
            </div>

            {/* Sub-phase Filter Tabs for CS */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <button
                onClick={() => setCsPhaseFilter('all')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  csPhaseFilter === 'all'
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                全阶段
              </button>
              <button
                onClick={() => setCsPhaseFilter('co')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  csPhaseFilter === 'co'
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                计组决战 (10.8-20)
              </button>
              <button
                onClick={() => setCsPhaseFilter('os')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  csPhaseFilter === 'os'
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                操作系统11天 (10.21-31)
              </button>
              <button
                onClick={() => setCsPhaseFilter('cn')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  csPhaseFilter === 'cn'
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                计网10天速通 (11.1-10)
              </button>
              <button
                onClick={() => setCsPhaseFilter('pastPapers')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  csPhaseFilter === 'pastPapers'
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                真题套卷与母题 (11.11-12.18)
              </button>
              <button
                onClick={() => setCsPhaseFilter('exam')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  csPhaseFilter === 'exam'
                    ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                考研收官 (12.20)
              </button>
            </div>
          </div>
        )}

        {viewTrack === 'politics' && (
          <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-rose-400">
                    考研思想政治理论专项推进日程
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    (恢复知识框架 10.30-11.5 + 肖八第一轮 11.6-11.21 + 巩固选择题 11.22-11.30 + 肖四背诵优先 12.1-12.18)
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  严密契合数学模考日/非模考日交替节奏，四阶段层层推进，选择题攻坚与主观题背诵稳扎稳打！
                </p>
              </div>

              {/* Sub-phase Filter Tabs for Politics */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <button
                  onClick={() => setPoliticsPhaseFilter('all')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    politicsPhaseFilter === 'all'
                      ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  全阶段
                </button>
                <button
                  onClick={() => setPoliticsPhaseFilter('phase1')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    politicsPhaseFilter === 'phase1'
                      ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  一阶段: 恢复知识框架 (10.30-11.5)
                </button>
                <button
                  onClick={() => setPoliticsPhaseFilter('phase2')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    politicsPhaseFilter === 'phase2'
                      ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  二阶段: 肖八第一轮 (11.6-11.21)
                </button>
                <button
                  onClick={() => setPoliticsPhaseFilter('phase3')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    politicsPhaseFilter === 'phase3'
                      ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  三阶段: 巩固选择题 (11.22-11.30)
                </button>
                <button
                  onClick={() => setPoliticsPhaseFilter('phase4')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    politicsPhaseFilter === 'phase4'
                      ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  四阶段: 肖四背诵优先 (12.1-12.18)
                </button>
              </div>
            </div>

            {/* Verbatim Phase Strategic Overview Memo */}
            <div className="rounded-xl bg-slate-950/80 border border-rose-500/25 p-3 text-xs space-y-2">
              {politicsPhaseFilter === 'phase1' && (
                <div className="space-y-1.5 text-slate-300">
                  <div className="font-bold text-rose-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    <span>10 月 30 日—11 月 5 日：恢复知识框架</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1">
                    <li><strong className="text-white">非模考日政治任务（70–90 分钟）：</strong>目标：恢复知识框架，开始稳定刷题。</li>
                    <li className="pl-4 text-slate-400">· 20 min 知识输入：翻阅腿姐背诵手册，或观看一个必要的技巧课片段。只处理当天对应的知识点，不从头重听完整课程。</li>
                    <li className="pl-4 text-slate-400">· 25 min 选择题训练：小程序完成 15～20 题，或者做一组专项练习。</li>
                    <li className="pl-4 text-slate-400">· 25 min 错题复盘：分析错误选项，回到手册定位知识点，标记容易混淆的概念。</li>
                    <li className="pl-4 text-slate-400">· 10 min 闭卷回忆：合上手册，回忆今天学到的关键词、理论关系和容易混淆的内容。</li>
                    <li><strong className="text-white">模考日：</strong>只需完成 10～15 道题和必要订正即可，目的是保持连续性。</li>
                  </ul>
                </div>
              )}

              {politicsPhaseFilter === 'phase2' && (
                <div className="space-y-2 text-slate-300">
                  <div className="font-bold text-rose-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    <span>11 月 6 日—11 月 21 日：肖八第一轮</span>
                  </div>
                  <p className="text-slate-300">
                    这一阶段，你原有的“每套肖八用两天”方案很适合非模考日与模考日交替的节奏。建议采用下面的任务组合：
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-1">
                    <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                      <span className="text-rose-400 font-bold block">数学非模考日 (60～90m)</span>
                      <span className="text-slate-300 text-[11px]">完成一套肖八选择题，限时训练后订正</span>
                    </div>
                    <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                      <span className="text-rose-400 font-bold block">数学模考日 (40～60m)</span>
                      <span className="text-slate-300 text-[11px]">复盘前一套肖八错题，回到手册查漏补缺</span>
                    </div>
                    <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                      <span className="text-rose-400 font-bold block">两日循环结束 (10～15m)</span>
                      <span className="text-slate-300 text-[11px]">回顾反复出错的知识点，必要时补做小程序题</span>
                    </div>
                  </div>
                  <p className="text-amber-200/90 text-[11px] leading-relaxed">
                    ⚠️ <strong>需要注意：</strong>一套肖八选择题如果做完后没有充分分析错项，下一套的收益会大打折扣。非模考日负责推进新卷，模考日负责巩固与回顾，形成互补。如果不严格隔天交替，保持“做卷—复盘”的先后关系即可。
                  </p>
                </div>
              )}

              {politicsPhaseFilter === 'phase3' && (
                <div className="space-y-1.5 text-slate-300">
                  <div className="font-bold text-rose-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    <span>11 月 22 日—11 月 30 日：巩固选择题</span>
                  </div>
                  <p className="text-slate-300">这个阶段不建议继续大量扩充新资料，而应重点解决重复错误。</p>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1">
                    <li><strong className="text-white">非模考日：</strong>集中复盘肖八错题，按马原、史纲、毛中特、思修、时政分类整理。</li>
                    <li><strong className="text-white">模考日：</strong>小程序维持手感，复习当天最容易遗忘的 2～3 个知识点。</li>
                    <li><strong className="text-white">每周至少一次：</strong>随机抽取一组选择题，检查之前的错误是否真正解决。</li>
                  </ul>
                  <p className="text-slate-400 text-[11px] pt-1">
                    💡 这一阶段可以适当降低技巧课的时间占比，把时间转移到主动回忆和错题复做上。
                  </p>
                </div>
              )}

              {politicsPhaseFilter === 'phase4' && (
                <div className="space-y-2 text-slate-300">
                  <div className="font-bold text-rose-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    <span>12 月 1 日—12 月 18 日：肖四背诵优先</span>
                  </div>
                  <p className="text-slate-300">肖四到手后，非模考日的集中时段应该逐步转向主观题。</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-1">
                    <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                      <span className="text-rose-400 font-bold block">数学非模考日 (80～90m)</span>
                      <span className="text-slate-300 text-[11px]">新主观题背诵 + 旧内容回忆 + 选择题复盘</span>
                    </div>
                    <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                      <span className="text-rose-400 font-bold block">数学模考日 (40～60m)</span>
                      <span className="text-slate-300 text-[11px]">复述已学主观题框架 + 小程序或错题复习</span>
                    </div>
                    <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                      <span className="text-rose-400 font-bold block">肖四首轮完成后 (60～90m)</span>
                      <span className="text-slate-300 text-[11px]">闭卷回忆、检查遗漏、集中补薄弱题</span>
                    </div>
                  </div>
                  <p className="text-amber-200/90 text-[11px] leading-relaxed">
                    ⚠️ <strong>强调：</strong>不要把肖四主观题背诵理解为只在非模考日进行。主观题记忆依赖间隔复习，模考日也应该抽出 10～20 分钟回忆前一天背过的内容。如果肖四到手较晚，应优先完成肖四主观题的首轮学习和反复回忆，而不是为了维持原计划去压缩睡眠。
                  </p>
                </div>
              )}

              {politicsPhaseFilter === 'all' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-[11px]">
                  <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <span className="text-rose-300 font-bold block">10.30 - 11.5 恢复框架</span>
                    <span className="text-slate-400">非模考日70-90m四步拆解；模考日10-15题保温</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <span className="text-rose-300 font-bold block">11.6 - 11.21 肖八第一轮</span>
                    <span className="text-slate-400">每套两天：非模考日做卷订正，模考日错题复盘</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <span className="text-rose-300 font-bold block">11.22 - 11.30 巩固选择题</span>
                    <span className="text-slate-400">按科目分类复盘错题，每周至少一次错题抽查</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <span className="text-rose-300 font-bold block">12.1 - 12.18 肖四背诵</span>
                    <span className="text-slate-400">非模考日主观题背诵，模考日间隔复习滚动记忆</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {viewTrack === 'all' && (
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <div>
              <span className="text-sm font-bold text-white">
                全科多轨统筹推进大纲
              </span>
              <span className="text-xs text-slate-400 ml-2 font-mono">
                (数二 53 天真题 + 408 全景 + 政治 4 阶段推进 + 考研英语)
              </span>
            </div>
            <div className="text-xs text-slate-400">
              各科并驾齐驱，各专项独立打卡
            </div>
          </div>
        )}

        {/* Progress Bar Indicator */}
        <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center gap-4 text-xs">
          {viewTrack === 'math' && (
            <div className="w-full flex items-center gap-3">
              <span className="text-slate-400 font-medium shrink-0">数二实战进度:</span>
              <div className="flex-1 bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${mathPercent}%` }}
                />
              </div>
              <span className="font-mono text-amber-400 font-bold shrink-0">
                {completedMathDays} / {totalMathDays} 天 ({mathPercent}%)
              </span>
            </div>
          )}

          {viewTrack === 'cs' && (
            <div className="w-full flex items-center gap-3">
              <span className="text-slate-400 font-medium shrink-0">408专业课进度:</span>
              <div className="flex-1 bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div
                  className="bg-cyan-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${csPercent}%` }}
                />
              </div>
              <span className="font-mono text-cyan-400 font-bold shrink-0">
                {completedCsDays} / {totalCsDays} 天 ({csPercent}%)
              </span>
            </div>
          )}

          {viewTrack === 'politics' && (
            <div className="w-full flex items-center gap-3">
              <span className="text-slate-400 font-medium shrink-0">政治攻坚进度 (10.30-12.18):</span>
              <div className="flex-1 bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div
                  className="bg-rose-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${politicsPercent}%` }}
                />
              </div>
              <span className="font-mono text-rose-400 font-bold shrink-0">
                {completedPoliticsDays} / {totalPoliticsDays} 天 ({politicsPercent}%)
              </span>
            </div>
          )}

          {viewTrack === 'all' && (
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-medium shrink-0">数二:</span>
                <div className="flex-1 bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
                  <div className="bg-amber-500 h-full" style={{ width: `${mathPercent}%` }} />
                </div>
                <span className="font-mono text-slate-300 text-[11px] shrink-0">{completedMathDays}/{totalMathDays}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 font-medium shrink-0">408:</span>
                <div className="flex-1 bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
                  <div className="bg-cyan-500 h-full" style={{ width: `${csPercent}%` }} />
                </div>
                <span className="font-mono text-slate-300 text-[11px] shrink-0">{completedCsDays}/{totalCsDays}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-rose-400 font-medium shrink-0">政治:</span>
                <div className="flex-1 bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
                  <div className="bg-rose-500 h-full" style={{ width: `${politicsPercent}%` }} />
                </div>
                <span className="font-mono text-slate-300 text-[11px] shrink-0">{completedPoliticsDays}/{totalPoliticsDays}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Timeline Card List */}
      <div className="space-y-3">
        {filteredPlans.length === 0 && (
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-12 text-center text-slate-400">
            <Filter className="h-8 w-8 mx-auto text-slate-600 mb-2" />
            <p className="text-sm">当前筛选条件下暂无日程卡片</p>
            <p className="text-xs text-slate-500 mt-1">请尝试放宽筛选条件或切换专项标签</p>
          </div>
        )}

        {filteredPlans.map((plan) => {
          const isSelected = selectedDate === plan.date;
          const isExpanded = expandedDate === plan.date;
          const mathCompleted = Boolean(plan.math2Task?.isCompleted);
          const csCompleted = Boolean(plan.csTask?.isCompleted);
          const politicsCompleted = Boolean(plan.politicsTask?.isCompleted);
          const hasNote = Boolean(plan.dailyNote && plan.dailyNote.trim().length > 0);

          // Card theme based on active viewTrack
          const cardBorderClass = isSelected
            ? viewTrack === 'math'
              ? 'border-amber-500/70 bg-slate-900/90 shadow-md shadow-amber-950/20'
              : viewTrack === 'cs'
              ? 'border-cyan-500/70 bg-slate-900/90 shadow-md shadow-cyan-950/20'
              : viewTrack === 'politics'
              ? 'border-rose-500/70 bg-slate-900/90 shadow-md shadow-rose-950/20'
              : 'border-emerald-500/70 bg-slate-900/90 shadow-md'
            : 'border-slate-800 bg-slate-900/40 hover:border-slate-700';

          return (
            <div
              key={plan.date}
              className={`rounded-xl border transition-all ${cardBorderClass}`}
            >
              {/* Card Summary Header */}
              <div
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 cursor-pointer"
                onClick={() => {
                  onSelectDay(plan.date);
                  toggleExpand(plan.date);
                }}
              >
                <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
                  {/* Date Badge */}
                  <div className="flex flex-col items-center justify-center rounded-lg bg-slate-950 border border-slate-800 px-2.5 py-1.5 shrink-0 text-center min-w-[58px]">
                    <span className="text-xs font-bold text-white font-mono">
                      {plan.formattedDate}
                    </span>
                    <span className="text-[10px] text-slate-400">{plan.weekday}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Header Title based on Track */}
                    <div className="flex flex-wrap items-center gap-2">
                      {viewTrack === 'math' && plan.math2Task ? (
                        <>
                          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            {plan.math2Task.phase.split('（')[0] || '数二真题'}
                          </span>
                          <h3 className="text-sm font-bold text-white truncate max-w-xl">
                            {plan.math2Task.title}
                          </h3>
                        </>
                      ) : viewTrack === 'cs' && plan.csTask ? (
                        <>
                          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                            {plan.csTask.phase.split('（')[0] || '408实战'}
                          </span>
                          <h3 className="text-sm font-bold text-white truncate max-w-xl">
                            {plan.csTask.title}
                          </h3>
                        </>
                      ) : viewTrack === 'politics' ? (
                        <>
                          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                            {plan.politicsDetail?.phaseTitle ? `【${plan.politicsDetail.phaseTitle}】` : '【政治专项】'}
                          </span>
                          {plan.politicsDetail?.dayTypeLabel && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-rose-300 border border-slate-800">
                              {plan.politicsDetail.dayTypeLabel}
                            </span>
                          )}
                          <h3 className="text-sm font-bold text-white truncate max-w-xl">
                            {plan.politicsDetail?.title || plan.politicsTask.title}
                          </h3>
                        </>
                      ) : (
                        <h3 className="text-sm font-bold text-white truncate max-w-xl">
                          {plan.theme}
                        </h3>
                      )}

                      {plan.date === todayDateStr && (
                        <span className="text-[11px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-semibold">
                          ★ 东八区今日实战
                        </span>
                      )}

                      {/* Decoupled Completion Badges */}
                      {viewTrack === 'math' && mathCompleted && (
                        <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                          <CheckCircle2 className="h-3 w-3" /> 数二已搞定
                        </span>
                      )}
                      {viewTrack === 'cs' && csCompleted && (
                        <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                          <CheckCircle2 className="h-3 w-3" /> 408已搞定
                        </span>
                      )}
                      {viewTrack === 'politics' && politicsCompleted && (
                        <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                          <CheckCircle2 className="h-3 w-3" /> 政治已搞定
                        </span>
                      )}
                      {viewTrack === 'all' && mathCompleted && csCompleted && politicsCompleted && (
                        <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                          <CheckCircle2 className="h-3 w-3" /> 当日全科收官
                        </span>
                      )}
                    </div>

                    {/* Subtitle / Focus Snippet */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-1">
                      {viewTrack === 'math' && plan.math2Task && (
                        <span className="text-slate-300 truncate max-w-2xl">
                          <strong className="text-amber-400">核心聚焦: </strong>
                          {plan.math2Task.focusArea}
                        </span>
                      )}

                      {viewTrack === 'cs' && plan.csTask && (
                        <span className="text-slate-300 truncate max-w-2xl">
                          <strong className="text-cyan-400">攻坚重点: </strong>
                          {plan.csTask.focusArea}
                        </span>
                      )}

                      {viewTrack === 'politics' && (
                        <span className="text-slate-300 truncate max-w-2xl">
                          <strong className="text-rose-400">建议时长: </strong>
                          <span className="text-amber-300 font-mono font-semibold mr-2">
                            {plan.politicsDetail?.durationRange || `${plan.politicsTask.durationMinutes}分钟`}
                          </span>
                          <strong className="text-slate-400">任务重点: </strong>
                          {plan.politicsDetail?.goal || plan.politicsTask.action}
                        </span>
                      )}

                      {viewTrack === 'all' && (
                        <div className="mt-3.5 pt-3.5 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
                          {/* Sub-column 1: 📐 数学二 (150分) */}
                          <div className={`rounded-xl border p-3 flex flex-col justify-between transition-colors ${
                            mathCompleted
                              ? 'border-emerald-800/60 bg-emerald-950/20'
                              : 'border-amber-500/30 bg-slate-950/60'
                          }`}>
                            <div>
                              <div className="flex items-center justify-between gap-1 mb-1.5 flex-wrap">
                                <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                                  [数二] {plan.math2Task?.phase.split('（')[0] || '真题模考'}
                                </span>
                                <span className="text-[10px] font-mono text-slate-400">08:30—11:30</span>
                              </div>
                              <h4 className="text-xs font-bold text-white leading-snug line-clamp-2">
                                {plan.math2Task?.title}
                              </h4>
                              <p className="text-[11px] text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                                <strong className="text-amber-400/90 font-medium">聚焦: </strong>
                                {plan.math2Task?.focusArea}
                              </p>
                            </div>
                            <div className="pt-2 mt-2 border-t border-slate-800/60 flex items-center justify-between">
                              <span className="text-[10px] text-slate-500 font-mono">{plan.math2Task?.suggestedDurationMinutes} 分钟</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onToggleMathComplete(plan.math2Task!.id);
                                }}
                                className={`text-[11px] px-2.5 py-0.5 rounded font-medium cursor-pointer transition-colors ${
                                  mathCompleted
                                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60'
                                    : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                }`}
                              >
                                {mathCompleted ? '✓ 数二已搞定' : '○ 数二打卡'}
                              </button>
                            </div>
                          </div>

                          {/* Sub-column 2: 💻 408专业课 (150分) */}
                          <div className={`rounded-xl border p-3 flex flex-col justify-between transition-colors ${
                            csCompleted
                              ? 'border-emerald-800/60 bg-emerald-950/20'
                              : 'border-cyan-500/30 bg-slate-950/60'
                          }`}>
                            <div>
                              <div className="flex items-center justify-between gap-1 mb-1.5 flex-wrap">
                                <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                                  [408] {plan.csTask?.phase.split('（')[0] || '主力攻坚'}
                                </span>
                                <span className="text-[10px] font-mono text-slate-400">14:00—17:30</span>
                              </div>
                              <h4 className="text-xs font-bold text-white leading-snug line-clamp-2">
                                {plan.csTask?.title}
                              </h4>
                              <p className="text-[11px] text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                                <strong className="text-cyan-400/90 font-medium">焦点: </strong>
                                {plan.csTask?.focusArea}
                              </p>
                            </div>
                            <div className="pt-2 mt-2 border-t border-slate-800/60 flex items-center justify-between">
                              <span className="text-[10px] text-slate-500 font-mono">{plan.csTask?.suggestedDurationMinutes} 分钟</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onToggleCsComplete(plan.csTask!.id);
                                }}
                                className={`text-[11px] px-2.5 py-0.5 rounded font-medium cursor-pointer transition-colors ${
                                  csCompleted
                                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60'
                                    : 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                                }`}
                              >
                                {csCompleted ? '✓ 408已搞定' : '○ 408打卡'}
                              </button>
                            </div>
                          </div>

                          {/* Sub-column 3: 📕 思想政治 (100分·全新四阶段同级并列) */}
                          <div className={`rounded-xl border p-3 flex flex-col justify-between transition-colors ${
                            politicsCompleted
                              ? 'border-emerald-800/60 bg-emerald-950/20'
                              : 'border-rose-500/30 bg-slate-950/60'
                          }`}>
                            <div>
                              <div className="flex items-center justify-between gap-1 mb-1.5 flex-wrap">
                                <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                                  {plan.politicsDetail?.phaseTitle ? `[政治·${plan.politicsDetail.phaseTitle}]` : '[思想政治]'}
                                </span>
                                <span className="text-[10px] font-mono text-amber-300 bg-slate-900 px-1.5 py-0.2 rounded border border-slate-800">
                                  {plan.politicsDetail?.dayTypeLabel || '推进日'}
                                </span>
                              </div>
                              <h4 className="text-xs font-bold text-white leading-snug line-clamp-2">
                                {plan.politicsDetail?.title || plan.politicsTask.title}
                              </h4>

                              {/* Concrete 4-Step Breakdown chips for Phase 1 / Directives */}
                              {plan.politicsDetail?.steps && plan.politicsDetail.steps.length > 0 ? (
                                <div className="grid grid-cols-2 gap-1 mt-1.5">
                                  {plan.politicsDetail.steps.slice(0, 4).map((st, i) => (
                                    <div key={i} className="bg-slate-900/90 p-1 rounded border border-slate-800/80 text-[10px]">
                                      <div className="text-rose-300 font-semibold flex items-center justify-between">
                                        <span className="truncate">{st.title}</span>
                                        <span className="text-amber-400 font-mono text-[9px]">{st.duration}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-[11px] text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                                  {plan.politicsDetail?.goal || plan.politicsTask.action}
                                </p>
                              )}
                            </div>
                            <div className="pt-2 mt-2 border-t border-slate-800/60 flex items-center justify-between">
                              <span className="text-[10px] text-amber-300 font-mono font-medium">
                                {plan.politicsDetail?.durationRange || `${plan.politicsTask.durationMinutes}m`}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onTogglePoliticsComplete?.(plan.date);
                                }}
                                className={`text-[11px] px-2.5 py-0.5 rounded font-medium cursor-pointer transition-colors ${
                                  politicsCompleted
                                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60'
                                    : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                }`}
                              >
                                {politicsCompleted ? '✓ 政治已搞定' : '○ 政治打卡'}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Unexpanded Note Banner Indicator */}
                    {hasNote && (
                      <div
                        onClick={(e) => handleOpenNoteModal(plan, e)}
                        className="mt-2 flex items-start gap-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 px-2.5 py-1.5 text-xs text-amber-200/95 hover:bg-amber-500/20 hover:border-amber-500/50 transition-all cursor-pointer group max-w-2xl"
                        title="点击查看或编辑此日复盘与未完成留存备忘"
                      >
                        <span className="text-amber-400 font-bold shrink-0 flex items-center gap-1">
                          <StickyNote className="h-3.5 w-3.5 text-amber-400" />
                          <span>[复盘留存]:</span>
                        </span>
                        <span className="truncate flex-1 text-slate-200 group-hover:text-amber-100 font-normal">
                          {plan.dailyNote}
                        </span>
                        {plan.dailyNoteUpdatedAt && (
                          <span className="text-[10px] text-amber-400/60 font-mono shrink-0 hidden md:inline">
                            {plan.dailyNoteUpdatedAt}
                          </span>
                        )}
                        <span className="text-[10px] text-amber-400 group-hover:text-amber-300 underline underline-offset-2 shrink-0 font-medium ml-1">
                          编辑
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-center shrink-0">
                  {/* Quick Toggle Checkbox for the Active Track */}
                  {viewTrack === 'math' && plan.math2Task && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleMathComplete(plan.math2Task!.id);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        mathCompleted
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                          : 'bg-amber-950/40 text-amber-300 border border-amber-900/60 hover:bg-amber-900/50'
                      }`}
                      title={mathCompleted ? '点击标记为未完成' : '点击打卡完成今日数二任务'}
                    >
                      {mathCompleted ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          <span>数二已完成</span>
                        </>
                      ) : (
                        <>
                          <Circle className="h-3.5 w-3.5 text-amber-400" />
                          <span>数二打卡</span>
                        </>
                      )}
                    </button>
                  )}

                  {viewTrack === 'cs' && plan.csTask && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleCsComplete(plan.csTask!.id);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        csCompleted
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                          : 'bg-cyan-950/40 text-cyan-300 border border-cyan-900/60 hover:bg-cyan-900/50'
                      }`}
                      title={csCompleted ? '点击标记为未完成' : '点击打卡完成今日408任务'}
                    >
                      {csCompleted ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          <span>408已完成</span>
                        </>
                      ) : (
                        <>
                          <Circle className="h-3.5 w-3.5 text-cyan-400" />
                          <span>408打卡</span>
                        </>
                      )}
                    </button>
                  )}

                  {viewTrack === 'politics' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onTogglePoliticsComplete?.(plan.date);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        politicsCompleted
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                          : 'bg-rose-950/40 text-rose-300 border border-rose-900/60 hover:bg-rose-900/50'
                      }`}
                      title={politicsCompleted ? '点击标记为未完成' : '点击打卡完成今日政治任务'}
                    >
                      {politicsCompleted ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          <span>政治已完成</span>
                        </>
                      ) : (
                        <>
                          <Circle className="h-3.5 w-3.5 text-rose-400" />
                          <span>政治打卡</span>
                        </>
                      )}
                    </button>
                  )}

                  {viewTrack === 'all' && (
                    <div className="flex items-center gap-1.5">
                      {plan.math2Task && (
                        <span
                          className={`text-[11px] px-2 py-0.5 rounded font-mono font-medium ${
                            mathCompleted
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/50'
                              : 'bg-amber-950/40 text-amber-300 border border-amber-900/50'
                          }`}
                        >
                          数二: {mathCompleted ? '完成' : '待办'}
                        </span>
                      )}
                      {plan.csTask && (
                        <span
                          className={`text-[11px] px-2 py-0.5 rounded font-mono font-medium ${
                            csCompleted
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/50'
                              : 'bg-cyan-950/40 text-cyan-300 border border-cyan-900/50'
                          }`}
                        >
                          408: {csCompleted ? '完成' : '待办'}
                        </span>
                      )}
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded font-mono font-medium ${
                          politicsCompleted
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/50'
                            : 'bg-rose-950/40 text-rose-300 border border-rose-900/50'
                        }`}
                      >
                        政治: {politicsCompleted ? '完成' : '待办'}
                      </span>
                    </div>
                  )}

                  {/* Daily Note Button */}
                  <button
                    onClick={(e) => handleOpenNoteModal(plan, e)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-xs ${
                      hasNote
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 hover:bg-amber-500/30'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                    title={hasNote ? '此日已记录复盘备忘，点击查看或编辑' : '点击记录今日未完成代办、易错点或明日补救计划'}
                  >
                    {hasNote ? (
                      <>
                        <BookmarkCheck className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                        <span>已记笔记</span>
                      </>
                    ) : (
                      <>
                        <FileEdit className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span>记笔记</span>
                      </>
                    )}
                  </button>

                  {/* Expand/Collapse Chevron */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(plan.date);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                    title={isExpanded ? '折叠详情' : '展开详情'}
                  >
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded Card Details */}
              {isExpanded && (
                <div className="border-t border-slate-800/80 p-4 bg-slate-950/60 space-y-4 text-xs">
                  {/* MATH 2 DEDICATED SECTION */}
                  {(viewTrack === 'math' || viewTrack === 'all') && plan.math2Task && (
                    <div className="rounded-xl border border-amber-500/30 bg-slate-900/70 p-4 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onToggleMathComplete(plan.math2Task!.id)}
                            className="text-amber-400 hover:text-amber-300 cursor-pointer"
                          >
                            {plan.math2Task.isCompleted ? (
                              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                            ) : (
                              <Circle className="h-5 w-5 text-slate-500" />
                            )}
                          </button>
                          <div>
                            <span className="text-xs font-mono text-amber-400 font-bold mr-2">
                              {plan.math2Task.phase}
                            </span>
                            <span className="font-bold text-white text-sm">
                              {plan.math2Task.title}
                            </span>
                          </div>
                        </div>
                        <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800 shrink-0">
                          掐表时间: 上午 08:30 — 11:30 (模考/订正)
                        </span>
                      </div>

                      <div className="space-y-2 text-slate-300">
                        <p className="leading-relaxed">
                          <strong className="text-amber-400">核心聚焦：</strong>
                          {plan.math2Task.focusArea}
                        </p>

                        <div>
                          <strong className="text-slate-400">必背核心公式 / 解题要点：</strong>
                          <ul className="list-disc list-inside mt-1 space-y-1 text-slate-200">
                            {plan.math2Task.coreConcepts.map((c, i) => (
                              <li key={i} className="leading-relaxed">{c}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                          <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                            <span className="text-amber-400 font-semibold block mb-0.5">选择填空目标：</span>
                            <span className="text-slate-300 leading-relaxed">{plan.math2Task.mcqTarget}</span>
                          </div>
                          <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                            <span className="text-amber-400 font-semibold block mb-0.5">综合大题目标：</span>
                            <span className="text-slate-300 leading-relaxed">{plan.math2Task.bigQuestionTarget}</span>
                          </div>
                        </div>

                        {plan.math2Task.pitfallsToAvoid.length > 0 && (
                          <div className="text-[11px] text-rose-300 bg-rose-950/30 p-2.5 rounded-lg border border-rose-900/40 leading-relaxed">
                            <strong className="text-rose-400">避坑纪律与考场心态：</strong>
                            {plan.math2Task.pitfallsToAvoid.join('；')}
                          </div>
                        )}

                        {plan.math2Task.recommendedProblems.length > 0 && (
                          <div className="text-[11px] text-slate-400 pt-1">
                            <strong className="text-slate-500">今日指定实战卷源：</strong>
                            <span className="text-amber-300/90 font-medium ml-1">
                              {plan.math2Task.recommendedProblems.join(' · ')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 408 DEDICATED SECTION */}
                  {(viewTrack === 'cs' || viewTrack === 'all') && plan.csTask && (
                    <div className="rounded-xl border border-cyan-500/30 bg-slate-900/70 p-4 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onToggleCsComplete(plan.csTask!.id)}
                            className="text-cyan-400 hover:text-cyan-300 cursor-pointer"
                          >
                            {plan.csTask.isCompleted ? (
                              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                            ) : (
                              <Circle className="h-5 w-5 text-slate-500" />
                            )}
                          </button>
                          <div>
                            <span className="text-xs font-mono text-cyan-400 font-bold mr-2">
                              {plan.csTask.phase}
                            </span>
                            <span className="font-bold text-white text-sm">
                              {plan.csTask.title}
                            </span>
                          </div>
                        </div>
                        <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800 shrink-0">
                          建议时间: 下午 14:00 — 17:30
                        </span>
                      </div>

                      <div className="space-y-2 text-slate-300">
                        <p className="leading-relaxed">
                          <strong className="text-cyan-400">攻坚焦点：</strong>
                          {plan.csTask.focusArea}
                        </p>

                        <div>
                          <strong className="text-slate-400">考点核心与微观模型：</strong>
                          <ul className="list-disc list-inside mt-1 space-y-1 text-slate-200">
                            {plan.csTask.coreConcepts.map((c, i) => (
                              <li key={i} className="leading-relaxed">{c}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                          <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                            <span className="text-cyan-400 font-semibold block mb-0.5">选择题攻坚：</span>
                            <span className="text-slate-300 leading-relaxed">{plan.csTask.mcqTarget}</span>
                          </div>
                          <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                            <span className="text-cyan-400 font-semibold block mb-0.5">重点大题攻坚：</span>
                            <span className="text-slate-300 leading-relaxed">{plan.csTask.bigQuestionTarget}</span>
                          </div>
                        </div>

                        {plan.csTask.pitfallsToAvoid.length > 0 && (
                          <div className="text-[11px] text-rose-300 bg-rose-950/30 p-2.5 rounded-lg border border-rose-900/40 leading-relaxed">
                            <strong className="text-rose-400">避坑要领：</strong>
                            {plan.csTask.pitfallsToAvoid.join('；')}
                          </div>
                        )}

                        {plan.csTask.recommendedProblems.length > 0 && (
                          <div className="text-[11px] text-slate-400 pt-1">
                            <strong className="text-slate-500">经典统考真题题号：</strong>
                            <span className="text-cyan-300/90 font-medium ml-1">
                              {plan.csTask.recommendedProblems.join(' · ')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* POLITICS DEDICATED SECTION (Parallel to Math & 408) */}
                  {(viewTrack === 'politics' || viewTrack === 'all') && (
                    <div className="rounded-xl border border-rose-500/30 bg-slate-900/70 p-4 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onTogglePoliticsComplete?.(plan.date)}
                            className="text-rose-400 hover:text-rose-300 cursor-pointer"
                          >
                            {plan.politicsTask.isCompleted ? (
                              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                            ) : (
                              <Circle className="h-5 w-5 text-slate-500" />
                            )}
                          </button>
                          <div>
                            <span className="text-xs font-mono text-rose-400 font-bold mr-2">
                              {plan.politicsDetail?.phaseTitle ? `【${plan.politicsDetail.phaseTitle}】` : '【考研政治】'}
                            </span>
                            {plan.politicsDetail?.dayTypeLabel && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-rose-300 border border-slate-800 mr-2">
                                {plan.politicsDetail.dayTypeLabel}
                              </span>
                            )}
                            <span className="font-bold text-white text-sm">
                              {plan.politicsDetail?.title || plan.politicsTask.title}
                            </span>
                          </div>
                        </div>
                        <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800 shrink-0">
                          建议时间: {plan.politicsDetail?.durationRange || `${plan.politicsTask.durationMinutes} 分钟`}
                        </span>
                      </div>

                      <div className="space-y-3 text-slate-300">
                        {plan.politicsDetail?.goal && (
                          <p className="leading-relaxed">
                            <strong className="text-rose-400">阶段目标：</strong>
                            {plan.politicsDetail.goal}
                          </p>
                        )}

                        {/* Step-by-step breakdown */}
                        {plan.politicsDetail?.steps && plan.politicsDetail.steps.length > 0 && (
                          <div className="space-y-1.5">
                            <strong className="text-slate-400 block mb-1">各环节精细时间预算与落地执行：</strong>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                              {plan.politicsDetail.steps.map((st, i) => (
                                <div key={i} className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80 space-y-1">
                                  <div className="flex items-center justify-between text-rose-300 font-semibold">
                                    <span className="flex items-center gap-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                                      <span>{st.title}</span>
                                    </span>
                                    <span className="font-mono text-amber-400 text-[10px] bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                                      {st.duration}
                                    </span>
                                  </div>
                                  <p className="text-slate-300 leading-relaxed text-[11px]">{st.detail}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Table representation for Phase 2 / Phase 4 */}
                        {plan.politicsDetail?.tableData && (
                          <div className="overflow-x-auto rounded-lg border border-slate-800">
                            <table className="w-full text-left text-[11px]">
                              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                                <tr>
                                  <th className="p-2 font-medium">日程类型</th>
                                  <th className="p-2 font-medium">政治任务</th>
                                  <th className="p-2 font-medium">建议时长</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                                {plan.politicsDetail.tableData.map((row, rIdx) => {
                                  const isCurrentMatch =
                                    (plan.politicsDetail?.dayType === 'math_non_mock' && row.scheduleType.includes('非模考')) ||
                                    (plan.politicsDetail?.dayType === 'math_mock' && row.scheduleType.includes('模考日') && !row.scheduleType.includes('非模考')) ||
                                    (plan.politicsDetail?.dayType === 'post_round1' && row.scheduleType.includes('首轮完成'));
                                  return (
                                    <tr key={rIdx} className={isCurrentMatch ? 'bg-rose-500/10 text-white font-medium' : 'text-slate-300'}>
                                      <td className="p-2 font-mono whitespace-nowrap text-rose-300">{row.scheduleType} {isCurrentMatch && '★ (今日)'}</td>
                                      <td className="p-2">{row.task}</td>
                                      <td className="p-2 font-mono text-amber-300 whitespace-nowrap">{row.duration}</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {/* Directives & Discipline */}
                        {plan.politicsDetail?.keyDirectives && plan.politicsDetail.keyDirectives.length > 0 && (
                          <div className="text-[11px] text-amber-200/90 bg-amber-950/20 p-2.5 rounded-lg border border-amber-900/40 leading-relaxed">
                            <strong className="text-amber-400">核心纪律与注意事项：</strong>
                            {plan.politicsDetail.keyDirectives.join('；')}
                          </div>
                        )}

                        {plan.politicsDetail?.guidelines && (
                          <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 leading-relaxed">
                            <span className="text-slate-500 font-medium">阶段备考指导：</span>
                            <span className="ml-1">{plan.politicsDetail.guidelines}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ENGLISH SECTION */}
                  <div className="p-3 rounded-xl border border-slate-800/80 bg-slate-900/40 text-[11px]">
                    <button
                      onClick={() => onToggleEnglishComplete?.(plan.date)}
                      className="flex items-center gap-1.5 text-left font-semibold text-emerald-400 mb-1 cursor-pointer group"
                    >
                      {plan.englishTask.isCompleted ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      ) : (
                        <Circle className="h-4 w-4 text-slate-500 group-hover:text-emerald-400 shrink-0" />
                      )}
                      <span className={plan.englishTask.isCompleted ? 'line-through text-slate-400' : ''}>
                        [英语日常保温] {plan.englishTask.title}
                      </span>
                    </button>
                    <p className="text-slate-400 pl-5.5 leading-relaxed">{plan.englishTask.action}</p>
                  </div>

                  {/* Daily Reflection & Notes Section in Expanded Card */}
                  <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <StickyNote className="h-4 w-4 text-amber-400" />
                        <h4 className="font-bold text-white text-xs">
                          战地每日复盘与未完成留存记录 ({plan.formattedDate})
                        </h4>
                        {hasNote && (
                          <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-700/50 px-2 py-0.5 rounded-full font-semibold">
                            ✓ 已记笔记
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {plan.dailyNoteUpdatedAt && (
                          <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
                            更新于: {plan.dailyNoteUpdatedAt}
                          </span>
                        )}
                        <button
                          onClick={() => handleOpenNoteModal(plan)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-medium transition-all cursor-pointer"
                        >
                          <FileEdit className="h-3.5 w-3.5" />
                          <span>{hasNote ? '修改笔记' : '添加笔记'}</span>
                        </button>
                      </div>
                    </div>

                    {hasNote ? (
                      <div
                        onClick={() => handleOpenNoteModal(plan)}
                        className="rounded-lg bg-slate-950/70 border border-amber-500/30 p-3 text-xs text-slate-200 whitespace-pre-wrap leading-relaxed cursor-pointer hover:border-amber-500/50 transition-colors border-l-4 border-l-amber-500"
                        title="点击快速编辑笔记"
                      >
                        {plan.dailyNote}
                      </div>
                    ) : (
                      <div
                        onClick={() => handleOpenNoteModal(plan)}
                        className="rounded-lg bg-slate-950/40 border border-dashed border-slate-800 p-3 text-xs text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer hover:border-slate-700 hover:text-slate-300 transition-colors"
                      >
                        <span>
                          💡 今日任务未全部完成？或者有易错点、公式没吃透、明日需补卡的任务？点击随时记下一笔...
                        </span>
                        <span className="text-amber-400 font-semibold shrink-0 flex items-center gap-1">
                          + 立即记录
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 3. Subsequent Battle Phases Roadmap (Synchronized with verbatim milestones) */}
      <section className="mt-8 space-y-4">
        <div className="border-t border-slate-800 pt-6">
          <div className="flex items-center gap-2 mb-3">
            <Flame className="h-4 w-4 text-amber-400" />
            <h2 className="text-base font-bold text-white">后续全周期作战路线图 (Subsequent Phases)</h2>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            无论当前多么吃紧，只要按既定节奏收口，后续战役将环环相扣，从容决胜！
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SUBSEQUENT_PHASES.map((phase, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-xs font-bold text-amber-400">
                    {phase.phaseName}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {phase.dateRange}
                  </span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {phase.keyMilestones.map((milestone, mIdx) => (
                    <li key={mIdx} className="flex items-start gap-1.5 leading-relaxed">
                      <span className="text-slate-500 shrink-0 font-mono">·</span>
                      <span>{milestone}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Note Editor Modal */}
      {editingPlan && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setEditingPlan(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
                  <StickyNote className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <span>{editingPlan.formattedDate} ({editingPlan.weekday}) · 复盘与未完成备忘</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    今日任务未达标？概念未吃透？在此记录原因及明日优先补卡代办
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingPlan(null)}
                className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                title="关闭"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Tag Templates */}
            <div>
              <div className="text-[11px] font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
                <span>⚡ 快捷插入常见复盘标签：</span>
              </div>
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
                      setNoteInput((prev) => {
                        const prefix = prev.trim() ? prev.trim() + '\n' : '';
                        return prefix + tag;
                      });
                    }}
                    className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-[11px] text-slate-300 hover:text-amber-300 transition-colors cursor-pointer text-left"
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Note Textarea */}
            <div>
              <textarea
                autoFocus
                rows={5}
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                onKeyDown={(e) => {
                  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                    handleSaveNote();
                  }
                }}
                placeholder={`记录今天任务的真实完成情况、未做完的原因、遗留的重难点，或明日需要优先补救的代办...\n（支持按 Ctrl + Enter 快捷保存）`}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/90 p-3 text-xs sm:text-sm text-slate-200 placeholder:text-slate-600 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 focus:outline-none transition-all leading-relaxed"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                <span>提示：支持按 Ctrl + Enter 快捷保存</span>
                <span>{noteInput.length} 字</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <div>
                {editingPlan.dailyNote && (
                  <button
                    type="button"
                    onClick={handleClearNote}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 border border-rose-900/40 transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>清空笔记</span>
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingPlan(null)}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="button"
                  onClick={handleSaveNote}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  <BookmarkCheck className="h-4 w-4" />
                  <span>保存笔记</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
