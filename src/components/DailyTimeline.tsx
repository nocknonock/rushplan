import React, { useState } from 'react';
import { DayPlan, EnglishWeekPlan, NoteSubjectTrack } from '../types/kaoyan';
import { SUBSEQUENT_PHASES } from '../data/scheduleData';
import {
  ENGLISH_TIME_ALLOCATION,
  ENGLISH_TEACHERS,
  ENGLISH_STAGES,
  ENGLISH_CATEGORY_LABELS,
  getEnglishWeekForDate,
} from '../data/englishScheduleData';
import {
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Filter,
  Flame,
  Clock,
  Sparkles,
  StickyNote,
  FileEdit,
  BookmarkCheck,
  Edit3,
  X,
  Trash2,
  Layers,
  GraduationCap,
  Cpu,
  Target,
  Languages,
  CalendarRange,
  AlertCircle,
} from 'lucide-react';

export type TimelineTrackType = 'math' | 'cs' | 'politics' | 'english' | 'all';

interface DailyTimelineProps {
  plans: DayPlan[];
  englishWeeks: EnglishWeekPlan[];
  selectedDate: string;
  todayDateStr?: string;
  initialTrack?: TimelineTrackType;
  onSelectDay: (date: string) => void;
  onJumpToToday?: () => void;
  onToggleMathComplete: (taskId: string) => void;
  onToggleCsComplete: (taskId: string) => void;
  onToggleEnglishComplete?: (date: string) => void;
  onTogglePoliticsComplete?: (date: string) => void;
  onToggleEnglishSubTask?: (weekId: string, subTaskId: string) => void;
  onSaveSubjectNote?: (date: string, subject: NoteSubjectTrack, note: string) => void;
  onSaveEnglishWeekNote?: (weekId: string, note: string) => void;
  onSaveDailyNote?: (date: string, note: string) => void;
  onOpenEditModal?: (plan: DayPlan, subjectTab?: 'math2' | 'cs' | 'english' | 'politics') => void;
  onOpenEnglishWeekEditModal?: (weekPlan: EnglishWeekPlan) => void;
}

const SUBJECT_NOTE_META: Record<
  NoteSubjectTrack,
  { label: string; shortLabel: string; badgeClass: string; borderClass: string }
> = {
  math: {
    label: '📐 数学二专属复盘笔记',
    shortLabel: '数二笔记',
    badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    borderClass: 'border-l-amber-500 border-amber-500/30',
  },
  cs: {
    label: '💻 408专业课专属复盘笔记',
    shortLabel: '408笔记',
    badgeClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    borderClass: 'border-l-cyan-500 border-cyan-500/30',
  },
  politics: {
    label: '📕 思想政治专属复盘笔记',
    shortLabel: '政治笔记',
    badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    borderClass: 'border-l-rose-500 border-rose-500/30',
  },
};

export function getIsolatedNoteForSubject(plan: DayPlan, subject: NoteSubjectTrack): string {
  if (subject === 'math') {
    return plan.mathNote ?? plan.dailyNote ?? '';
  }
  if (subject === 'cs') {
    return plan.csNote ?? '';
  }
  return plan.politicsNote ?? '';
}

export function getIsolatedNoteTimestampForSubject(
  plan: DayPlan,
  subject: NoteSubjectTrack
): string | undefined {
  if (subject === 'math') {
    return plan.mathNoteUpdatedAt ?? plan.dailyNoteUpdatedAt;
  }
  if (subject === 'cs') {
    return plan.csNoteUpdatedAt;
  }
  return plan.politicsNoteUpdatedAt;
}

export const DailyTimeline: React.FC<DailyTimelineProps> = ({
  plans,
  englishWeeks,
  selectedDate,
  todayDateStr,
  initialTrack,
  onSelectDay,
  onJumpToToday,
  onToggleMathComplete,
  onToggleCsComplete,
  onTogglePoliticsComplete,
  onToggleEnglishSubTask,
  onSaveSubjectNote,
  onSaveEnglishWeekNote,
  onSaveDailyNote,
  onOpenEditModal,
  onOpenEnglishWeekEditModal,
}) => {
  // Primary Decoupled Track: 'math' | 'cs' | 'politics' | 'english' | 'all'
  const [viewTrack, setViewTrack] = useState<TimelineTrackType>(initialTrack || 'math');

  React.useEffect(() => {
    if (initialTrack) {
      setViewTrack(initialTrack);
    }
  }, [initialTrack]);

  // Sub-phase filter for Math
  const [mathPhaseFilter, setMathPhaseFilter] = useState<'all' | 'phase1' | 'phase2' | 'phase3' | 'exam'>('all');

  // Sub-phase filter for CS
  const [csPhaseFilter, setCsPhaseFilter] = useState<'all' | 'co' | 'os' | 'cn' | 'pastPapers' | 'exam'>('all');

  // Sub-phase filter for Politics
  const [politicsPhaseFilter, setPoliticsPhaseFilter] = useState<'all' | 'phase1' | 'phase2' | 'phase3' | 'phase4'>('all');

  // Sub-stage filter for English (Weekly View)
  const [englishStageFilter, setEnglishStageFilter] = useState<'all' | 'stage1' | 'stage2' | 'stage3' | 'stage4'>('all');

  // Status Filter
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [filterNotesOnly, setFilterNotesOnly] = useState<boolean>(false);
  const [expandedDate, setExpandedDate] = useState<string | null>(selectedDate);

  // Daily Subject Note Modal state (Strictly isolated by subject: math | cs | politics)
  const [editingPlan, setEditingPlan] = useState<DayPlan | null>(null);
  const [editingNoteSubject, setEditingNoteSubject] = useState<NoteSubjectTrack>('math');
  const [noteInput, setNoteInput] = useState<string>('');

  // Weekly English Note Modal state (Strictly isolated for English weeks)
  const [editingEnglishWeek, setEditingEnglishWeek] = useState<EnglishWeekPlan | null>(null);
  const [englishWeekNoteInput, setEnglishWeekNoteInput] = useState<string>('');

  // Sync expanded card whenever selectedDate changes
  React.useEffect(() => {
    if (selectedDate) {
      setExpandedDate(selectedDate);
    }
  }, [selectedDate]);

  // Helper to check if a plan has a note for the currently active track
  const planHasNoteInTrack = (plan: DayPlan, track: TimelineTrackType): boolean => {
    if (track === 'math') return Boolean(getIsolatedNoteForSubject(plan, 'math').trim());
    if (track === 'cs') return Boolean(getIsolatedNoteForSubject(plan, 'cs').trim());
    if (track === 'politics') return Boolean(getIsolatedNoteForSubject(plan, 'politics').trim());
    if (track === 'all') {
      return (
        Boolean(getIsolatedNoteForSubject(plan, 'math').trim()) ||
        Boolean(getIsolatedNoteForSubject(plan, 'cs').trim()) ||
        Boolean(getIsolatedNoteForSubject(plan, 'politics').trim())
      );
    }
    return false;
  };

  const notesCount =
    viewTrack === 'english'
      ? englishWeeks.filter((w) => w.weeklyNote && w.weeklyNote.trim().length > 0).length
      : plans.filter((p) => planHasNoteInTrack(p, viewTrack)).length;

  const handleOpenNoteModal = (
    plan: DayPlan,
    preferredSubject?: NoteSubjectTrack,
    e?: React.MouseEvent
  ) => {
    e?.stopPropagation();
    const targetSubj: NoteSubjectTrack =
      preferredSubject ||
      (viewTrack === 'cs' ? 'cs' : viewTrack === 'politics' ? 'politics' : 'math');
    setEditingPlan(plan);
    setEditingNoteSubject(targetSubj);
    setNoteInput(getIsolatedNoteForSubject(plan, targetSubj));
  };

  const handleSwitchModalSubject = (subj: NoteSubjectTrack) => {
    if (!editingPlan) return;
    setEditingNoteSubject(subj);
    setNoteInput(getIsolatedNoteForSubject(editingPlan, subj));
  };

  const handleSaveNote = () => {
    if (!editingPlan) return;
    if (onSaveSubjectNote) {
      onSaveSubjectNote(editingPlan.date, editingNoteSubject, noteInput);
    } else {
      onSaveDailyNote?.(editingPlan.date, noteInput);
    }
    setEditingPlan(null);
  };

  const handleClearNote = () => {
    if (!editingPlan) return;
    const subjLabel = SUBJECT_NOTE_META[editingNoteSubject].shortLabel;
    if (window.confirm(`确定要清空 ${editingPlan.formattedDate} 的【${subjLabel}】吗？`)) {
      if (onSaveSubjectNote) {
        onSaveSubjectNote(editingPlan.date, editingNoteSubject, '');
      } else {
        onSaveDailyNote?.(editingPlan.date, '');
      }
      setEditingPlan(null);
    }
  };

  const handleOpenEnglishWeekNoteModal = (week: EnglishWeekPlan, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setEditingEnglishWeek(week);
    setEnglishWeekNoteInput(week.weeklyNote || '');
  };

  const handleSaveEnglishWeekNoteModal = () => {
    if (!editingEnglishWeek) return;
    onSaveEnglishWeekNote?.(editingEnglishWeek.id, englishWeekNoteInput);
    setEditingEnglishWeek(null);
  };

  const handleClearEnglishWeekNoteModal = () => {
    if (!editingEnglishWeek) return;
    if (window.confirm(`确定要清空【第${editingEnglishWeek.weekNumber}周】的英语专属周记吗？`)) {
      onSaveEnglishWeekNote?.(editingEnglishWeek.id, '');
      setEditingEnglishWeek(null);
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

  // Helper to determine Politics task phase category
  const getPoliticsCategory = (date: string) => {
    if (date >= '2026-12-01') return 'phase4';
    if (date >= '2026-11-22') return 'phase3';
    if (date >= '2026-11-06') return 'phase2';
    if (date >= '2026-10-30') return 'phase1';
    return 'early';
  };

  // Filter daily plans based on active track and sub-filters
  const filteredPlans = plans.filter((plan) => {
    if (filterNotesOnly && !planHasNoteInTrack(plan, viewTrack)) {
      return false;
    }

    if (viewTrack === 'math') {
      if (!plan.math2Task) return false;
      const cat = getMathCategory(plan.date);
      if (mathPhaseFilter === 'phase1' && cat !== 'phase1') return false;
      if (mathPhaseFilter === 'phase2' && cat !== 'phase2') return false;
      if (mathPhaseFilter === 'phase3' && cat !== 'phase3') return false;
      if (mathPhaseFilter === 'exam' && cat !== 'exam') return false;

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

  // Filter English weekly plans when viewTrack === 'english'
  const filteredEnglishWeeks = englishWeeks.filter((week) => {
    if (filterNotesOnly && (!week.weeklyNote || week.weeklyNote.trim().length === 0)) {
      return false;
    }
    if (englishStageFilter !== 'all' && week.stageId !== englishStageFilter) {
      return false;
    }
    const allSubTasksDone =
      week.subTasks.length > 0 && week.subTasks.every((t) => t.isCompleted);
    if (statusFilter === 'completed' && !allSubTasksDone) return false;
    if (statusFilter === 'pending' && allSubTasksDone) return false;
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

  const totalEnglishSubTasks = englishWeeks.reduce((acc, w) => acc + w.subTasks.length, 0);
  const completedEnglishSubTasks = englishWeeks.reduce(
    (acc, w) => acc + w.subTasks.filter((t) => t.isCompleted).length,
    0
  );
  const englishPercent =
    totalEnglishSubTasks > 0
      ? Math.round((completedEnglishSubTasks / totalEnglishSubTasks) * 100)
      : 0;

  const activeEnglishWeekId = getEnglishWeekForDate(
    selectedDate || todayDateStr || '2026-11-03',
    englishWeeks
  ).weekPlan.id;

  return (
    <div className="space-y-6">
      {/* 1. Master Decoupled Track Navigation Bar */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-3 sm:p-4 shadow-xl">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          {/* Primary View Track Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-amber-400" />
              <span>专项日程表切换:</span>
            </span>
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setViewTrack('all')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewTrack === 'all'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950/50 scale-[1.02]'
                    : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-900'
                }`}
              >
                <Target className="h-3.5 w-3.5" />
                <span>⚔️ 全科并列日视图</span>
              </button>

              <button
                onClick={() => setViewTrack('english')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewTrack === 'english'
                    ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-950/50 scale-[1.02]'
                    : 'text-slate-300 hover:text-teal-300 hover:bg-slate-900'
                }`}
              >
                <Languages className="h-3.5 w-3.5" />
                <span>📗 英语专属 (按周视图)</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    viewTrack === 'english'
                      ? 'bg-slate-950/30 text-slate-950'
                      : 'bg-slate-800 text-teal-300'
                  }`}
                >
                  7周冲刺
                </span>
              </button>

              <button
                onClick={() => setViewTrack('politics')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewTrack === 'politics'
                    ? 'bg-red-500/20 text-red-200 border border-red-500/40 shadow-sm shadow-red-950/40 scale-[1.02]'
                    : 'text-slate-300 hover:text-red-300 hover:bg-slate-900'
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>📕 政治专属</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    viewTrack === 'politics'
                      ? 'bg-red-950/60 text-red-300'
                      : 'bg-slate-800 text-red-300/80'
                  }`}
                >
                  4阶段
                </span>
              </button>

              <button
                onClick={() => setViewTrack('math')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewTrack === 'math'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-950/50 scale-[1.02]'
                    : 'text-slate-300 hover:text-amber-400 hover:bg-slate-900'
                }`}
              >
                <GraduationCap className="h-3.5 w-3.5" />
                <span>📐 数学二专属</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    viewTrack === 'math'
                      ? 'bg-slate-950/30 text-slate-900'
                      : 'bg-slate-800 text-amber-400'
                  }`}
                >
                  53天真题
                </span>
              </button>

              <button
                onClick={() => setViewTrack('cs')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewTrack === 'cs'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950/50 scale-[1.02]'
                    : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-900'
                }`}
              >
                <Cpu className="h-3.5 w-3.5" />
                <span>💻 408专业课专属</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    viewTrack === 'cs'
                      ? 'bg-slate-950/30 text-slate-900'
                      : 'bg-slate-800 text-cyan-400'
                  }`}
                >
                  74天全景
                </span>
              </button>
            </div>
          </div>

          {/* Quick Action Controls: Jump to Today & Subject-Isolated Notes Filter */}
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
                className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                  statusFilter === 'all'
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                全部
              </button>
              <button
                onClick={() => setStatusFilter('pending')}
                className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                  statusFilter === 'pending'
                    ? 'bg-slate-800 text-amber-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                待攻坚
              </button>
              <button
                onClick={() => setStatusFilter('completed')}
                className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                  statusFilter === 'completed'
                    ? 'bg-slate-800 text-emerald-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                已攻克
              </button>
            </div>

            {/* Subject-Isolated Notes Filter */}
            <button
              onClick={() => setFilterNotesOnly((prev) => !prev)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                filterNotesOnly
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-xs'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
              title="按当前所选科目独立筛选记录过专属笔记的卡片（各科笔记彻底隔离）"
            >
              <StickyNote className="h-3.5 w-3.5 text-amber-400" />
              <span>
                {viewTrack === 'english'
                  ? `有英语周记 (${notesCount})`
                  : viewTrack === 'math'
                  ? `有数二笔记 (${notesCount})`
                  : viewTrack === 'cs'
                  ? `有408笔记 (${notesCount})`
                  : viewTrack === 'politics'
                  ? `有政治笔记 (${notesCount})`
                  : `有笔记 (${notesCount})`}
              </span>
            </button>
          </div>
        </div>

        {/* 2. Track Specific Sub-Phase Bar & Header Information */}
        {viewTrack === 'english' && (
          <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-teal-300">
                    考研英语二 · 最后阶段按周推进日程表 (7大周次独立体系)
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    (11月3日—12月18日按周统筹 + 3次180分钟整卷模考)
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  采用与数二/408/政治日计划解耦的「周任务池 + 拆分打卡 + 独立周记」结构，每周多次任务可逐篇独立打钩并支持自由编辑！
                </p>
              </div>

              {/* Sub-stage Filter Tabs for English */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <button
                  onClick={() => setEnglishStageFilter('all')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    englishStageFilter === 'all'
                      ? 'bg-teal-500/20 text-teal-300 font-bold border border-teal-500/40'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  全部7周
                </button>
                <button
                  onClick={() => setEnglishStageFilter('stage1')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    englishStageFilter === 'stage1'
                      ? 'bg-teal-500/20 text-teal-300 font-bold border border-teal-500/40'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  全题型掌握 (11.3-11.15)
                </button>
                <button
                  onClick={() => setEnglishStageFilter('stage2')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    englishStageFilter === 'stage2'
                      ? 'bg-teal-500/20 text-teal-300 font-bold border border-teal-500/40'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  第一次模拟 (11.16-11.29)
                </button>
                <button
                  onClick={() => setEnglishStageFilter('stage3')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    englishStageFilter === 'stage3'
                      ? 'bg-teal-500/20 text-teal-300 font-bold border border-teal-500/40'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  二、三次模拟 (11.30-12.13)
                </button>
                <button
                  onClick={() => setEnglishStageFilter('stage4')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    englishStageFilter === 'stage4'
                      ? 'bg-teal-500/20 text-teal-300 font-bold border border-teal-500/40'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  考前巩固 (12.14-12.18)
                </button>
              </div>
            </div>

            {/* Strategic Overview Grid: 4 Stages + Teachers + 180m Time Allocation Table */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 text-xs">
              {/* Left 7 Cols: 4 Stages & Teachers & 3 Mock Dates */}
              <div className="lg:col-span-7 rounded-xl bg-slate-950/90 border border-teal-500/25 p-3.5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                  <span className="font-bold text-teal-300 flex items-center gap-1.5">
                    <CalendarRange className="h-4 w-4 text-teal-400" />
                    <span>总体四阶段规划与名师搭配</span>
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {ENGLISH_TEACHERS.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-200"
                      >
                        <strong className="text-teal-300">{t.category}：</strong>
                        {t.teacher}
                        {t.formerNote && (
                          <span className="text-slate-500 line-through ml-1 text-[10px]">
                            潘赟
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ENGLISH_STAGES.map((st) => (
                    <div
                      key={st.id}
                      className="rounded-lg bg-slate-900/80 border border-slate-800/90 p-2.5 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-teal-300 text-xs">{st.title}</span>
                        <span className="font-mono text-[10px] text-amber-300 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                          {st.dateRange}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {st.coreArrangement}
                      </p>
                    </div>
                  ))}
                </div>

                {/* 3 Fixed Mock Exam Anchors */}
                <div className="rounded-lg bg-rose-950/25 border border-rose-500/30 p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-rose-300 shrink-0 flex items-center gap-1.5">
                    <Flame className="h-3.5 w-3.5 text-rose-400" />
                    <span>三次整卷全真模拟排期：</span>
                  </span>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-rose-500/30 text-rose-200">
                      ① 11月22日：2024真题
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-rose-500/30 text-rose-200">
                      ② 12月6日：2025真题
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-rose-500/30 text-rose-200">
                      ③ 12月13日：2026真题
                    </span>
                  </div>
                </div>
              </div>

              {/* Right 5 Cols: 180-Minute Full Mock Time Allocation Table */}
              <div className="lg:col-span-5 rounded-xl bg-slate-950/90 border border-teal-500/25 p-3.5 flex flex-col justify-between space-y-2.5">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-2.5">
                    <span className="font-bold text-amber-300 flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-amber-400" />
                      <span>全真模拟时间分配（合计约180分钟）</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      14:00—17:00 标准考场
                    </span>
                  </div>

                  {/* Proportional Time Bar */}
                  <div className="h-2.5 w-full rounded-full bg-slate-900 overflow-hidden flex border border-slate-800 mb-3">
                    {ENGLISH_TIME_ALLOCATION.map((item, i) => (
                      <div
                        key={i}
                        className={`${item.colorClass} h-full border-r border-slate-950 last:border-r-0`}
                        style={{ width: `${item.weightPercent}%` }}
                        title={`${item.section}: ${item.durationRange}`}
                      />
                    ))}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {ENGLISH_TIME_ALLOCATION.map((item, i) => (
                      <div
                        key={i}
                        className="rounded-lg bg-slate-900/90 border border-slate-800 p-2 flex flex-col justify-between"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${item.colorClass}`} />
                          <span className="text-[11px] font-semibold text-slate-200">
                            {item.section}
                          </span>
                        </div>
                        <span className="font-mono text-xs font-bold text-teal-300 mt-1 tabular-nums">
                          {item.durationRange}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 bg-slate-900/70 px-2.5 py-1.5 rounded border border-slate-800/80 flex items-center justify-between">
                  <span>每次全真模拟均严格按上述配额控时</span>
                  <span className="font-mono font-bold text-amber-400">TOTAL ≈ 180 min</span>
                </div>
              </div>
            </div>
          </div>
        )}

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
                严格闭卷掐表 08:30—11:30 模考 + 隔天白纸深度订正重写错题，笔记与他科彻底隔离！
              </p>
            </div>

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
                  (计组决战 + 操作系统精准打击 + 计网速通 + 2010-2025真题三轮交叉大决战)
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                聚焦下午 14:00—17:30 专项攻坚，每4套真题配3天二轮突破，笔记与他科彻底隔离！
              </p>
            </div>

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
                真题三轮交叉 (11.11-12.18)
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
                  严密契合数学模考日/非模考日交替节奏，四阶段层层推进，政治专属笔记独立保存！
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <button
                  onClick={() => setPoliticsPhaseFilter('all')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    politicsPhaseFilter === 'all'
                      ? 'bg-red-500/15 text-red-200 font-bold border border-red-500/30'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  全阶段
                </button>
                <button
                  onClick={() => setPoliticsPhaseFilter('phase1')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    politicsPhaseFilter === 'phase1'
                      ? 'bg-red-500/15 text-red-200 font-bold border border-red-500/30'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  一阶段: 恢复知识框架 (10.30-11.5)
                </button>
                <button
                  onClick={() => setPoliticsPhaseFilter('phase2')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    politicsPhaseFilter === 'phase2'
                      ? 'bg-red-500/15 text-red-200 font-bold border border-red-500/30'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  二阶段: 肖八第一轮 (11.6-11.21)
                </button>
                <button
                  onClick={() => setPoliticsPhaseFilter('phase3')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    politicsPhaseFilter === 'phase3'
                      ? 'bg-red-500/15 text-red-200 font-bold border border-red-500/30'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  三阶段: 巩固选择题 (11.22-11.30)
                </button>
                <button
                  onClick={() => setPoliticsPhaseFilter('phase4')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    politicsPhaseFilter === 'phase4'
                      ? 'bg-red-500/15 text-red-200 font-bold border border-red-500/30'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  四阶段: 肖四背诵优先 (12.1-12.18)
                </button>
              </div>
            </div>
          </div>
        )}

        {viewTrack === 'all' && (
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-sm font-bold text-white">
                全科多轨统筹推进大纲
              </span>
              <span className="text-xs text-slate-400 ml-2 font-mono">
                (数二 53 天真题 + 408 全景 + 政治 4 阶段 + 英语 7 周冲刺)
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">各科笔记已按科目严格隔离</span>
              <button
                onClick={() => setViewTrack('english')}
                className="text-teal-300 hover:text-teal-200 underline underline-offset-2 font-semibold cursor-pointer"
              >
                前往英语按周视图 →
              </button>
            </div>
          </div>
        )}

        {/* Progress Bar Indicator */}
        <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center gap-4 text-xs">
          {viewTrack === 'english' && (
            <div className="w-full flex items-center gap-3">
              <span className="text-slate-400 font-medium shrink-0">
                英语7周子任务总进度:
              </span>
              <div className="flex-1 bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div
                  className="bg-teal-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${englishPercent}%` }}
                />
              </div>
              <span className="font-mono text-teal-300 font-bold shrink-0 tabular-nums">
                {completedEnglishSubTasks} / {totalEnglishSubTasks} 项 ({englishPercent}%)
              </span>
            </div>
          )}

          {viewTrack === 'math' && (
            <div className="w-full flex items-center gap-3">
              <span className="text-slate-400 font-medium shrink-0">数二实战进度:</span>
              <div className="flex-1 bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${mathPercent}%` }}
                />
              </div>
              <span className="font-mono text-amber-400 font-bold shrink-0 tabular-nums">
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
              <span className="font-mono text-cyan-400 font-bold shrink-0 tabular-nums">
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
              <span className="font-mono text-rose-400 font-bold shrink-0 tabular-nums">
                {completedPoliticsDays} / {totalPoliticsDays} 天 ({politicsPercent}%)
              </span>
            </div>
          )}

          {viewTrack === 'all' && (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-medium shrink-0">数二:</span>
                <div className="flex-1 bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
                  <div className="bg-amber-500 h-full" style={{ width: `${mathPercent}%` }} />
                </div>
                <span className="font-mono text-slate-300 text-[11px] shrink-0 tabular-nums">
                  {completedMathDays}/{totalMathDays}天
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 font-medium shrink-0">408:</span>
                <div className="flex-1 bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
                  <div className="bg-cyan-500 h-full" style={{ width: `${csPercent}%` }} />
                </div>
                <span className="font-mono text-slate-300 text-[11px] shrink-0 tabular-nums">
                  {completedCsDays}/{totalCsDays}天
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-rose-400 font-medium shrink-0">政治:</span>
                <div className="flex-1 bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
                  <div className="bg-rose-500 h-full" style={{ width: `${politicsPercent}%` }} />
                </div>
                <span className="font-mono text-slate-300 text-[11px] shrink-0 tabular-nums">
                  {completedPoliticsDays}/{totalPoliticsDays}天
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-teal-300 font-medium shrink-0">英语(周):</span>
                <div className="flex-1 bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
                  <div className="bg-teal-400 h-full" style={{ width: `${englishPercent}%` }} />
                </div>
                <span className="font-mono text-slate-300 text-[11px] shrink-0 tabular-nums">
                  {completedEnglishSubTasks}/{totalEnglishSubTasks}项
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* =================================================================== */}
      {/* 2A. DEDICATED WEEKLY ENGLISH SCHEDULE VIEW (viewTrack === 'english') */}
      {/* =================================================================== */}
      {viewTrack === 'english' ? (
        <div className="space-y-4">
          {filteredEnglishWeeks.length === 0 && (
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-12 text-center text-slate-400">
              <Filter className="h-8 w-8 mx-auto text-slate-600 mb-2" />
              <p className="text-sm">当前筛选条件下暂无英语周计划卡片</p>
              <p className="text-xs text-slate-500 mt-1">请尝试切换阶段标签或取消仅看周记筛选</p>
            </div>
          )}

          {filteredEnglishWeeks.map((week) => {
            const totalSub = week.subTasks.length;
            const doneSub = week.subTasks.filter((t) => t.isCompleted).length;
            const weekPct = totalSub > 0 ? Math.round((doneSub / totalSub) * 100) : 0;
            const isAllDone = totalSub > 0 && doneSub === totalSub;
            const isCurrentWeek = week.id === activeEnglishWeekId;
            const hasWeeklyNote = Boolean(week.weeklyNote && week.weeklyNote.trim().length > 0);

            return (
              <div
                key={week.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isCurrentWeek
                    ? 'border-teal-500/80 bg-slate-900/95 shadow-lg shadow-teal-950/30'
                    : isAllDone
                    ? 'border-emerald-800/60 bg-slate-900/60'
                    : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                }`}
              >
                {/* Week Card Header */}
                <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-950/50 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  <div className="flex items-start sm:items-center gap-3">
                    <div
                      className={`flex flex-col items-center justify-center rounded-xl border px-3 py-2 shrink-0 min-w-[74px] text-center ${
                        isCurrentWeek
                          ? 'bg-teal-500/20 border-teal-500/50 text-teal-200'
                          : 'bg-slate-900 border-slate-800 text-white'
                      }`}
                    >
                      <span className="text-xs font-extrabold font-mono">
                        第 {week.weekNumber} 周
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {week.dateRange}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-teal-500/15 text-teal-300 border border-teal-500/30">
                          {week.stageTitle}
                        </span>
                        {isCurrentWeek && (
                          <span className="text-[11px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                            ★ 当前选中日期所属周
                          </span>
                        )}
                        {week.mockExam && (
                          <span className="text-[11px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                            <Flame className="h-3 w-3 text-rose-400" />
                            含整卷模考：{week.mockExam.formattedDate}
                          </span>
                        )}
                        {week.isCustomized && (
                          <span className="text-[10px] font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                            <Sparkles className="h-3 w-3 text-amber-400" />
                            已定制
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-white">
                        {week.title}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        <strong className="text-teal-300">本周目标：</strong>
                        {week.goal}
                      </p>
                    </div>
                  </div>

                  {/* Right Progress & Actions */}
                  <div className="flex flex-wrap items-center gap-2.5 self-end lg:self-center shrink-0">
                    <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5">
                      <div className="w-20 bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-800">
                        <div
                          className="bg-teal-400 h-full transition-all duration-300"
                          style={{ width: `${weekPct}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs font-bold text-teal-300 tabular-nums">
                        {doneSub}/{totalSub} ({weekPct}%)
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleOpenEnglishWeekNoteModal(week, e)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        hasWeeklyNote
                          ? 'bg-teal-500/20 text-teal-200 border border-teal-500/50 hover:bg-teal-500/30'
                          : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      {hasWeeklyNote ? (
                        <>
                          <BookmarkCheck className="h-3.5 w-3.5 text-teal-300" />
                          <span>已记英语周记</span>
                        </>
                      ) : (
                        <>
                          <FileEdit className="h-3.5 w-3.5 text-slate-400" />
                          <span>记英语周记</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onOpenEnglishWeekEditModal?.(week)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-teal-500/50 text-xs font-semibold text-slate-200 hover:text-teal-300 transition-all cursor-pointer"
                    >
                      <Edit3 className="h-3.5 w-3.5 text-teal-400" />
                      <span>编辑本周内容</span>
                    </button>
                  </div>
                </div>

                {/* Week Body: Split Independent Sub-Tasks Grid + Mock Exam + Guidance + Isolated Weekly Note */}
                <div className="p-4 sm:p-5 space-y-4 text-xs">
                  {/* Independent Split Sub-Task Checkboxes */}
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="font-bold text-slate-200 flex items-center gap-1.5">
                        <span>本周拆分打卡清单（点击任意单项即可独立打卡 / 撤销）</span>
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        已完成 {doneSub} / {totalSub} 项
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {week.subTasks.map((sub) => {
                        const catMeta = ENGLISH_CATEGORY_LABELS[sub.category];
                        return (
                          <div
                            key={sub.id}
                            onClick={() => onToggleEnglishSubTask?.(week.id, sub.id)}
                            className={`rounded-xl border p-3 flex items-start gap-2.5 cursor-pointer transition-all select-none group ${
                              sub.isCompleted
                                ? 'border-emerald-800/60 bg-emerald-950/20 text-slate-400'
                                : sub.category === 'mock'
                                ? 'border-rose-500/40 bg-rose-950/15 hover:border-rose-500/70'
                                : 'border-slate-800 bg-slate-950/70 hover:border-teal-500/50 hover:bg-slate-950'
                            }`}
                          >
                            <div className="mt-0.5 shrink-0">
                              {sub.isCompleted ? (
                                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                              ) : (
                                <Circle className="h-4 w-4 text-slate-500 group-hover:text-teal-400" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap mb-1">
                                <span
                                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded border font-semibold ${catMeta.badgeClass}`}
                                >
                                  {catMeta.label}
                                </span>
                                {sub.isCompleted && (
                                  <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                                    ✓ 已完成
                                  </span>
                                )}
                              </div>
                              <div
                                className={`font-bold text-xs leading-snug ${
                                  sub.isCompleted ? 'line-through text-slate-400' : 'text-white'
                                }`}
                              >
                                {sub.title}
                              </div>
                              {sub.detail && (
                                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                                  {sub.detail}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Full Mock Exam Special Module (Weeks 3, 5, 6) */}
                  {week.mockExam && (
                    <div className="rounded-xl border border-rose-500/40 bg-rose-950/20 p-3.5 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Flame className="h-4 w-4 text-rose-400 shrink-0" />
                          <span className="font-bold text-rose-200 text-xs sm:text-sm">
                            全真模拟锚点：{week.mockExam.formattedDate} · {week.mockExam.paperTitle}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-amber-300 bg-slate-950 px-2.5 py-0.5 rounded border border-rose-500/30">
                          严格限时 {week.mockExam.durationMinutes} 分钟（完形15-20m / 阅读70-80m / 新题型15-20m / 翻译20-25m / 作文40-45m）
                        </span>
                      </div>

                      {week.mockExam.reflectionPrompts && week.mockExam.reflectionPrompts.length > 0 && (
                        <div className="pt-1">
                          <span className="text-[11px] font-semibold text-rose-300 block mb-1">
                            模考后重点复盘与记录问题：
                          </span>
                          <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-200 pl-1">
                            {week.mockExam.reflectionPrompts.map((q, qIdx) => (
                              <li key={qIdx}>{q}</li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Weekly Method Guidance */}
                  {week.guidance.length > 0 && (
                    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 space-y-1.5">
                      <span className="font-bold text-teal-300 block">
                        💡 本周执行要领与注意事项：
                      </span>
                      <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1 leading-relaxed">
                        {week.guidance.map((g, gIdx) => (
                          <li key={gIdx}>{g}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Isolated Weekly English Reflection Note */}
                  <div className="rounded-xl border border-teal-500/30 bg-slate-950/70 p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <StickyNote className="h-4 w-4 text-teal-400" />
                        <h4 className="font-bold text-white text-xs">
                          📗 本周英语专属复盘周记 · 第{week.weekNumber}周 ({week.dateRange})
                        </h4>
                        <span className="text-[10px] font-mono text-teal-300/90 bg-teal-950/60 border border-teal-700/40 px-2 py-0.2 rounded-full">
                          仅在英语模块独立展示，不串入其他科目
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {week.weeklyNoteUpdatedAt && (
                          <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
                            更新于: {week.weeklyNoteUpdatedAt}
                          </span>
                        )}
                        <button
                          onClick={(e) => handleOpenEnglishWeekNoteModal(week, e)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-teal-500/20 hover:bg-teal-500/30 text-teal-200 border border-teal-500/40 text-xs font-medium transition-all cursor-pointer"
                        >
                          <FileEdit className="h-3.5 w-3.5" />
                          <span>{hasWeeklyNote ? '修改周记' : '记录周记'}</span>
                        </button>
                      </div>
                    </div>

                    {hasWeeklyNote ? (
                      <div
                        onClick={(e) => handleOpenEnglishWeekNoteModal(week, e)}
                        className="rounded-lg bg-slate-900/90 border border-teal-500/30 border-l-4 border-l-teal-400 p-3 text-xs text-slate-200 whitespace-pre-wrap leading-relaxed cursor-pointer hover:border-teal-500/50 transition-colors"
                      >
                        {week.weeklyNote}
                      </div>
                    ) : (
                      <div
                        onClick={(e) => handleOpenEnglishWeekNoteModal(week, e)}
                        className="rounded-lg bg-slate-900/40 border border-dashed border-slate-800 p-2.5 text-xs text-slate-400 flex items-center justify-between gap-2 cursor-pointer hover:border-teal-500/40 hover:text-slate-300 transition-colors"
                      >
                        <span>
                          记录本周阅读错误选项特征、长难句卡点、作文模板打磨心得或模考5问复盘记录...
                        </span>
                        <span className="text-teal-300 font-semibold shrink-0">+ 立即记录</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* =================================================================== */
        /* 2B. DAILY TIMELINE CARD LIST (math | cs | politics | all)           */
        /* =================================================================== */
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

            // Isolated notes for this day across the 3 daily subjects
            const mathNoteText = getIsolatedNoteForSubject(plan, 'math');
            const csNoteText = getIsolatedNoteForSubject(plan, 'cs');
            const politicsNoteText = getIsolatedNoteForSubject(plan, 'politics');

            const activeTrackSubject: NoteSubjectTrack =
              viewTrack === 'cs' ? 'cs' : viewTrack === 'politics' ? 'politics' : 'math';
            const activeTrackNoteText = getIsolatedNoteForSubject(plan, activeTrackSubject);
            const activeTrackNoteTime = getIsolatedNoteTimestampForSubject(plan, activeTrackSubject);
            const hasNoteInCurrentView = planHasNoteInTrack(plan, viewTrack);

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
                            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-red-500/10 text-red-300/90 border border-red-500/20">
                              {plan.politicsDetail?.phaseTitle
                                ? `【${plan.politicsDetail.phaseTitle}】`
                                : '【政治专项】'}
                            </span>
                            {plan.politicsDetail?.dayTypeLabel && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-red-300/80 border border-slate-800">
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

                        {plan.isCustomized && (
                          <span className="text-[10px] font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                            <Sparkles className="h-3 w-3 text-amber-400" />
                            已定制
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
                            <strong className="text-red-400/80">建议时长: </strong>
                            <span className="text-amber-300 font-mono font-semibold mr-2">
                              {plan.politicsDetail?.durationRange ||
                                `${plan.politicsTask.durationMinutes}分钟`}
                            </span>
                            <strong className="text-slate-400">任务重点: </strong>
                            {plan.politicsDetail?.goal || plan.politicsTask.action}
                          </span>
                        )}

                        {viewTrack === 'all' && (
                          <div className="mt-3.5 pt-3.5 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
                            {/* Sub-column 1: 📐 数学二 */}
                            <div
                              className={`rounded-xl border p-3 flex flex-col justify-between transition-colors ${
                                mathCompleted
                                  ? 'border-emerald-800/60 bg-emerald-950/20'
                                  : 'border-amber-500/30 bg-slate-950/60'
                              }`}
                            >
                              <div>
                                <div className="flex items-center justify-between gap-1 mb-1.5 flex-wrap">
                                  <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                                    [数二] {plan.math2Task?.phase.split('（')[0] || '真题模考'}
                                  </span>
                                  <span className="text-[10px] font-mono text-slate-400">
                                    08:30—11:30
                                  </span>
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
                                <span className="text-[10px] text-slate-500 font-mono">
                                  {plan.math2Task?.suggestedDurationMinutes} 分钟
                                </span>
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

                            {/* Sub-column 2: 💻 408专业课 */}
                            <div
                              className={`rounded-xl border p-3 flex flex-col justify-between transition-colors ${
                                csCompleted
                                  ? 'border-emerald-800/60 bg-emerald-950/20'
                                  : 'border-cyan-500/30 bg-slate-950/60'
                              }`}
                            >
                              <div>
                                <div className="flex items-center justify-between gap-1 mb-1.5 flex-wrap">
                                  <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                                    [408] {plan.csTask?.phase.split('（')[0] || '主力攻坚'}
                                  </span>
                                  <span className="text-[10px] font-mono text-slate-400">
                                    14:00—17:30
                                  </span>
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
                                <span className="text-[10px] text-slate-500 font-mono">
                                  {plan.csTask?.suggestedDurationMinutes} 分钟
                                </span>
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

                            {/* Sub-column 3: 📕 思想政治 */}
                            <div
                              className={`rounded-xl border p-3 flex flex-col justify-between transition-colors ${
                                politicsCompleted
                                  ? 'border-emerald-800/60 bg-emerald-950/20'
                                  : 'border-red-500/20 bg-slate-950/60'
                              }`}
                            >
                              <div>
                                <div className="flex items-center justify-between gap-1 mb-1.5 flex-wrap">
                                  <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-red-500/10 text-red-300/90 border border-red-500/20">
                                    {plan.politicsDetail?.phaseTitle
                                      ? `[政治·${plan.politicsDetail.phaseTitle}]`
                                      : '[思想政治]'}
                                  </span>
                                  <span className="text-[10px] font-mono text-amber-300 bg-slate-900 px-1.5 py-0.2 rounded border border-slate-800">
                                    {plan.politicsDetail?.dayTypeLabel || '推进日'}
                                  </span>
                                </div>
                                <h4 className="text-xs font-bold text-white leading-snug line-clamp-2">
                                  {plan.politicsDetail?.title || plan.politicsTask.title}
                                </h4>
                                <p className="text-[11px] text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                                  {plan.politicsDetail?.goal || plan.politicsTask.action}
                                </p>
                              </div>
                              <div className="pt-2 mt-2 border-t border-slate-800/60 flex items-center justify-between">
                                <span className="text-[10px] text-amber-300 font-mono font-medium">
                                  {plan.politicsDetail?.durationRange ||
                                    `${plan.politicsTask.durationMinutes}m`}
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onTogglePoliticsComplete?.(plan.date);
                                  }}
                                  className={`text-[11px] px-2.5 py-0.5 rounded font-medium cursor-pointer transition-colors ${
                                    politicsCompleted
                                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60'
                                      : 'bg-red-500/10 hover:bg-red-500/15 text-red-300/90 border border-red-500/25'
                                  }`}
                                >
                                  {politicsCompleted ? '✓ 政治已搞定' : '○ 政治打卡'}
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Subject-Isolated Note Preview Banner (Strictly shows ONLY the active subject's note!) */}
                      {viewTrack !== 'all' && activeTrackNoteText.trim().length > 0 && (
                        <div
                          onClick={(e) => handleOpenNoteModal(plan, activeTrackSubject, e)}
                          className="mt-2 flex items-start gap-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 px-2.5 py-1.5 text-xs text-amber-200/95 hover:bg-amber-500/20 hover:border-amber-500/50 transition-all cursor-pointer group max-w-2xl"
                          title="点击查看或编辑本科目专属复盘备忘"
                        >
                          <span className="text-amber-400 font-bold shrink-0 flex items-center gap-1">
                            <StickyNote className="h-3.5 w-3.5 text-amber-400" />
                            <span>[{SUBJECT_NOTE_META[activeTrackSubject].shortLabel}]:</span>
                          </span>
                          <span className="truncate flex-1 text-slate-200 group-hover:text-amber-100 font-normal">
                            {activeTrackNoteText}
                          </span>
                          {activeTrackNoteTime && (
                            <span className="text-[10px] text-amber-400/60 font-mono shrink-0 hidden md:inline">
                              {activeTrackNoteTime}
                            </span>
                          )}
                          <span className="text-[10px] text-amber-400 group-hover:text-amber-300 underline underline-offset-2 shrink-0 font-medium ml-1">
                            编辑
                          </span>
                        </div>
                      )}

                      {viewTrack === 'all' && hasNoteInCurrentView && (
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          {mathNoteText.trim() && (
                            <div
                              onClick={(e) => handleOpenNoteModal(plan, 'math', e)}
                              className="flex items-center gap-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 text-xs text-amber-200 hover:bg-amber-500/20 cursor-pointer max-w-xs"
                            >
                              <StickyNote className="h-3 w-3 text-amber-400 shrink-0" />
                              <span className="font-bold text-amber-300 shrink-0">[数二笔记]:</span>
                              <span className="truncate">{mathNoteText}</span>
                            </div>
                          )}
                          {csNoteText.trim() && (
                            <div
                              onClick={(e) => handleOpenNoteModal(plan, 'cs', e)}
                              className="flex items-center gap-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-1 text-xs text-cyan-200 hover:bg-cyan-500/20 cursor-pointer max-w-xs"
                            >
                              <StickyNote className="h-3 w-3 text-cyan-400 shrink-0" />
                              <span className="font-bold text-cyan-300 shrink-0">[408笔记]:</span>
                              <span className="truncate">{csNoteText}</span>
                            </div>
                          )}
                          {politicsNoteText.trim() && (
                            <div
                              onClick={(e) => handleOpenNoteModal(plan, 'politics', e)}
                              className="flex items-center gap-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 px-2.5 py-1 text-xs text-rose-200 hover:bg-rose-500/20 cursor-pointer max-w-xs"
                            >
                              <StickyNote className="h-3 w-3 text-rose-400 shrink-0" />
                              <span className="font-bold text-rose-300 shrink-0">[政治笔记]:</span>
                              <span className="truncate">{politicsNoteText}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Action Buttons */}
                  <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-center shrink-0">
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
                            : 'bg-red-950/25 text-red-300/90 border border-red-500/20 hover:bg-red-900/40'
                        }`}
                      >
                        {politicsCompleted ? (
                          <>
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                            <span>政治已完成</span>
                          </>
                        ) : (
                          <>
                            <Circle className="h-3.5 w-3.5 text-red-400/80" />
                            <span>政治打卡</span>
                          </>
                        )}
                      </button>
                    )}

                    {/* Isolated Subject Note Button */}
                    <button
                      onClick={(e) => handleOpenNoteModal(plan, activeTrackSubject, e)}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-xs ${
                        hasNoteInCurrentView
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 hover:bg-amber-500/30'
                          : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                      title="按科目独立记录复盘笔记（各科笔记互不串扰）"
                    >
                      {hasNoteInCurrentView ? (
                        <>
                          <BookmarkCheck className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                          <span>
                            {viewTrack === 'all'
                              ? '已记笔记'
                              : `已记${SUBJECT_NOTE_META[activeTrackSubject].shortLabel}`}
                          </span>
                        </>
                      ) : (
                        <>
                          <FileEdit className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <span>
                            {viewTrack === 'all'
                              ? '记分科笔记'
                              : `记${SUBJECT_NOTE_META[activeTrackSubject].shortLabel}`}
                          </span>
                        </>
                      )}
                    </button>

                    {/* Dynamic Edit Schedule Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenEditModal?.(
                          plan,
                          viewTrack === 'math'
                            ? 'math2'
                            : viewTrack === 'cs'
                            ? 'cs'
                            : viewTrack === 'politics'
                            ? 'politics'
                            : undefined
                        );
                      }}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-xs ${
                        plan.isCustomized
                          ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 hover:bg-amber-500/25'
                          : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <Edit3 className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                      <span>{plan.isCustomized ? '已定制' : '调整日程'}</span>
                    </button>

                    {/* Expand/Collapse Chevron */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(plan.date);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
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
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                              掐表时间: 上午 08:30 — 11:30 (模考/订正)
                            </span>
                            <button
                              onClick={() => onOpenEditModal?.(plan, 'math2')}
                              className="p-1 rounded text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
                              title="修改此日数学计划"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                          </div>
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
                                <li key={i} className="leading-relaxed">
                                  {c}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                            <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                              <span className="text-amber-400 font-semibold block mb-0.5">
                                选择填空目标：
                              </span>
                              <span className="text-slate-300 leading-relaxed">
                                {plan.math2Task.mcqTarget}
                              </span>
                            </div>
                            <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                              <span className="text-amber-400 font-semibold block mb-0.5">
                                综合大题目标：
                              </span>
                              <span className="text-slate-300 leading-relaxed">
                                {plan.math2Task.bigQuestionTarget}
                              </span>
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
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                              建议时间: 下午 14:00 — 17:30
                            </span>
                            <button
                              onClick={() => onOpenEditModal?.(plan, 'cs')}
                              className="p-1 rounded text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                              title="修改此日408计划"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                          </div>
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
                                <li key={i} className="leading-relaxed">
                                  {c}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                            <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                              <span className="text-cyan-400 font-semibold block mb-0.5">
                                选择题攻坚：
                              </span>
                              <span className="text-slate-300 leading-relaxed">
                                {plan.csTask.mcqTarget}
                              </span>
                            </div>
                            <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                              <span className="text-cyan-400 font-semibold block mb-0.5">
                                重点大题攻坚：
                              </span>
                              <span className="text-slate-300 leading-relaxed">
                                {plan.csTask.bigQuestionTarget}
                              </span>
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

                    {/* POLITICS DEDICATED SECTION */}
                    {(viewTrack === 'politics' || viewTrack === 'all') && (
                      <div className="rounded-xl border border-red-500/20 bg-slate-900/70 p-4 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onTogglePoliticsComplete?.(plan.date)}
                              className="text-red-400/80 hover:text-red-300 cursor-pointer"
                            >
                              {plan.politicsTask.isCompleted ? (
                                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                              ) : (
                                <Circle className="h-5 w-5 text-slate-500" />
                              )}
                            </button>
                            <div>
                              <span className="text-xs font-mono text-red-300/90 font-bold mr-2">
                                {plan.politicsDetail?.phaseTitle
                                  ? `【${plan.politicsDetail.phaseTitle}】`
                                  : '【考研政治】'}
                              </span>
                              {plan.politicsDetail?.dayTypeLabel && (
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/10 text-red-300/90 border border-red-500/20 mr-2">
                                  {plan.politicsDetail.dayTypeLabel}
                                </span>
                              )}
                              <span className="font-bold text-white text-sm">
                                {plan.politicsDetail?.title || plan.politicsTask.title}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                              建议时间:{' '}
                              {plan.politicsDetail?.durationRange ||
                                `${plan.politicsTask.durationMinutes} 分钟`}
                            </span>
                            <button
                              onClick={() => onOpenEditModal?.(plan, 'politics')}
                              className="p-1 rounded text-slate-400 hover:text-red-300 hover:bg-slate-800 transition-colors"
                              title="修改此日政治计划"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-3 text-slate-300">
                          {plan.politicsDetail?.goal && (
                            <p className="leading-relaxed">
                              <strong className="text-red-400/80">阶段目标：</strong>
                              {plan.politicsDetail.goal}
                            </p>
                          )}

                          {plan.politicsDetail?.steps && plan.politicsDetail.steps.length > 0 && (
                            <div className="space-y-1.5">
                              <strong className="text-slate-400 block mb-1">
                                各环节精细时间预算与落地执行：
                              </strong>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                                {plan.politicsDetail.steps.map((st, i) => (
                                  <div
                                    key={i}
                                    className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80 space-y-1"
                                  >
                                    <div className="flex items-center justify-between text-red-300/90 font-semibold">
                                      <span className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                                        <span>{st.title}</span>
                                      </span>
                                      <span className="font-mono text-amber-400 text-[10px] bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                                        {st.duration}
                                      </span>
                                    </div>
                                    <p className="text-slate-300 leading-relaxed text-[11px]">
                                      {st.detail}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {plan.politicsDetail?.keyDirectives &&
                            plan.politicsDetail.keyDirectives.length > 0 && (
                              <div className="text-[11px] text-amber-200/90 bg-amber-950/20 p-2.5 rounded-lg border border-amber-900/40 leading-relaxed">
                                <strong className="text-amber-400">核心纪律与注意事项：</strong>
                                {plan.politicsDetail.keyDirectives.join('；')}
                              </div>
                            )}
                        </div>
                      </div>
                    )}

                    {/* SUBJECT-ISOLATED DAILY REFLECTION NOTES SECTION */}
                    {viewTrack !== 'all' ? (
                      /* Single Subject Track View: Strictly displays and edits ONLY this subject's note */
                      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 flex-wrap">
                            <StickyNote className="h-4 w-4 text-amber-400" />
                            <h4 className="font-bold text-white text-xs">
                              {SUBJECT_NOTE_META[activeTrackSubject].label} ({plan.formattedDate})
                            </h4>
                            <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.2 rounded border border-slate-800">
                              本科目独立保存，不与其他科目混用
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {activeTrackNoteTime && (
                              <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
                                更新于: {activeTrackNoteTime}
                              </span>
                            )}
                            <button
                              onClick={() => handleOpenNoteModal(plan, activeTrackSubject)}
                              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-medium transition-all cursor-pointer"
                            >
                              <FileEdit className="h-3.5 w-3.5" />
                              <span>
                                {activeTrackNoteText.trim()
                                  ? `修改${SUBJECT_NOTE_META[activeTrackSubject].shortLabel}`
                                  : `添加${SUBJECT_NOTE_META[activeTrackSubject].shortLabel}`}
                              </span>
                            </button>
                          </div>
                        </div>

                        {activeTrackNoteText.trim() ? (
                          <div
                            onClick={() => handleOpenNoteModal(plan, activeTrackSubject)}
                            className={`rounded-lg bg-slate-950/70 border border-l-4 p-3 text-xs text-slate-200 whitespace-pre-wrap leading-relaxed cursor-pointer transition-colors ${SUBJECT_NOTE_META[activeTrackSubject].borderClass}`}
                          >
                            {activeTrackNoteText}
                          </div>
                        ) : (
                          <div
                            onClick={() => handleOpenNoteModal(plan, activeTrackSubject)}
                            className="rounded-lg bg-slate-950/40 border border-dashed border-slate-800 p-3 text-xs text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer hover:border-slate-700 hover:text-slate-300 transition-colors"
                          >
                            <span>
                              💡 记录今日【{SUBJECT_NOTE_META[activeTrackSubject].shortLabel}
                              】的易错点、未完成留存或明日补救任务...
                            </span>
                            <span className="text-amber-400 font-semibold shrink-0 flex items-center gap-1">
                              + 立即记录
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      /* All-Subjects Track View: 3 Separate Subject Note Slots side-by-side */
                      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <StickyNote className="h-4 w-4 text-amber-400" />
                            <h4 className="font-bold text-white text-xs">
                              分科独立复盘笔记 ({plan.formattedDate} · 数二 / 408 / 政治各自独立隔离)
                            </h4>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                          {(['math', 'cs', 'politics'] as NoteSubjectTrack[]).map((subj) => {
                            const txt = getIsolatedNoteForSubject(plan, subj);
                            const meta = SUBJECT_NOTE_META[subj];
                            return (
                              <div
                                key={subj}
                                onClick={() => handleOpenNoteModal(plan, subj)}
                                className="rounded-lg border border-slate-800 bg-slate-950/70 p-2.5 flex flex-col justify-between cursor-pointer hover:border-slate-700 transition-colors"
                              >
                                <div className="flex items-center justify-between mb-1.5">
                                  <span
                                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded border font-semibold ${meta.badgeClass}`}
                                  >
                                    {meta.shortLabel}
                                  </span>
                                  <span className="text-[10px] text-amber-400 hover:underline">
                                    {txt.trim() ? '编辑' : '+ 记录'}
                                  </span>
                                </div>
                                {txt.trim() ? (
                                  <p className="text-xs text-slate-200 whitespace-pre-wrap line-clamp-3 leading-relaxed">
                                    {txt}
                                  </p>
                                ) : (
                                  <p className="text-[11px] text-slate-500">
                                    暂无{meta.shortLabel}，点击独立添加...
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 3. Subsequent Battle Phases Roadmap */}
      <section className="mt-8 space-y-4">
        <div className="border-t border-slate-800 pt-6">
          <div className="flex items-center gap-2 mb-3">
            <Flame className="h-4 w-4 text-amber-400" />
            <h2 className="text-base font-bold text-white">
              后续全周期作战路线图 (Subsequent Phases)
            </h2>
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
                  <span className="text-xs font-bold text-amber-400">{phase.phaseName}</span>
                  <span className="text-[11px] font-mono text-slate-400">{phase.dateRange}</span>
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

      {/* 4A. Subject-Isolated Daily Note Editor Modal (Math / 408 / Politics) */}
      {editingPlan && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setEditingPlan(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
                  <StickyNote className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {editingPlan.formattedDate} ({editingPlan.weekday}) ·{' '}
                    {SUBJECT_NOTE_META[editingNoteSubject].label}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    各科复盘笔记已彻底隔离，当前编辑的内容仅归属【
                    {SUBJECT_NOTE_META[editingNoteSubject].shortLabel}】
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingPlan(null)}
                className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Subject Switcher Tabs inside Modal */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              {(['math', 'cs', 'politics'] as NoteSubjectTrack[]).map((subj) => {
                const isCurr = editingNoteSubject === subj;
                const hasSubjContent = Boolean(
                  getIsolatedNoteForSubject(editingPlan, subj).trim()
                );
                return (
                  <button
                    key={subj}
                    type="button"
                    onClick={() => handleSwitchModalSubject(subj)}
                    className={`flex-1 py-1.5 px-2 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      isCurr
                        ? 'bg-slate-800 text-white border border-slate-700'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>{SUBJECT_NOTE_META[subj].shortLabel}</span>
                    {hasSubjContent && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick Tag Templates */}
            <div>
              <div className="text-[11px] font-semibold text-slate-400 mb-1.5">
                ⚡ 快捷插入复盘标签：
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  '⚠️ 本科今日有未完成任务，明日优先补救',
                  '💡 核心概念/错题未吃透，需二次回炉',
                  '⏰ 耗时超限，需调整做题节奏',
                  '🎯 大题步骤卡壳，需找同类母题加练',
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
                placeholder={`在此记录 ${editingPlan.formattedDate} 的【${SUBJECT_NOTE_META[editingNoteSubject].shortLabel}】专属内容...\n（支持按 Ctrl + Enter 快捷保存）`}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/90 p-3 text-xs sm:text-sm text-slate-200 placeholder:text-slate-600 focus:border-amber-400 focus:outline-none leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <div>
                {getIsolatedNoteForSubject(editingPlan, editingNoteSubject).trim() && (
                  <button
                    type="button"
                    onClick={handleClearNote}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 border border-rose-900/40 transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>清空本篇笔记</span>
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
                  <span>保存{SUBJECT_NOTE_META[editingNoteSubject].shortLabel}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4B. Isolated Weekly English Note Editor Modal */}
      {editingEnglishWeek && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setEditingEnglishWeek(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-teal-500/40 bg-slate-900 p-5 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 shrink-0">
                  <StickyNote className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    第{editingEnglishWeek.weekNumber}周 ({editingEnglishWeek.dateRange}) · 英语专属复盘周记
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    英语采用按周独立周记，仅在英语按周视图与首页英语周记切页中可见
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingEnglishWeek(null)}
                className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Tag Templates for English */}
            <div>
              <div className="text-[11px] font-semibold text-slate-400 mb-1.5">
                ⚡ 快捷插入英语周复盘标签：
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  '📖 阅读错因：原文定位句找偏 / 被同义改写干扰项误导',
                  '✍️ 作文复盘：大小作文手写控时42分钟，个人模板还需打磨',
                  '🔍 翻译与长难句：后置定语与倒装结构切分需加强',
                  '⏱️ 模考复盘：阅读耗时__分钟，整卷时间分配正常',
                ].map((tag, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setEnglishWeekNoteInput((prev) => {
                        const prefix = prev.trim() ? prev.trim() + '\n' : '';
                        return prefix + tag;
                      });
                    }}
                    className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-[11px] text-slate-300 hover:text-teal-300 transition-colors cursor-pointer text-left"
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <textarea
                autoFocus
                rows={5}
                value={englishWeekNoteInput}
                onChange={(e) => setEnglishWeekNoteInput(e.target.value)}
                onKeyDown={(e) => {
                  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                    handleSaveEnglishWeekNoteModal();
                  }
                }}
                placeholder={`记录第${editingEnglishWeek.weekNumber}周英语各题型错因分析、作文模板默写情况或模考复盘总结...\n（支持按 Ctrl + Enter 快捷保存）`}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/90 p-3 text-xs sm:text-sm text-slate-200 placeholder:text-slate-600 focus:border-teal-400 focus:outline-none leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <div>
                {editingEnglishWeek.weeklyNote && (
                  <button
                    type="button"
                    onClick={handleClearEnglishWeekNoteModal}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 border border-rose-900/40 transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>清空周记</span>
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingEnglishWeek(null)}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="button"
                  onClick={handleSaveEnglishWeekNoteModal}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  <BookmarkCheck className="h-4 w-4" />
                  <span>保存英语周记</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
