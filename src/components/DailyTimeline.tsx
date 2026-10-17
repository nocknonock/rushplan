import React, { useState } from 'react';
import { DayPlan } from '../types/kaoyan';
import { SUBSEQUENT_PHASES } from '../data/scheduleData';
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
  const [subjectFilter, setSubjectFilter] = useState<'all' | 'math2' | 'cs'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [filterNotesOnly, setFilterNotesOnly] = useState<boolean>(false);
  const [expandedDate, setExpandedDate] = useState<string | null>(selectedDate);

  // Note Modal state
  const [editingPlan, setEditingPlan] = useState<DayPlan | null>(null);
  const [noteInput, setNoteInput] = useState<string>('');

  // Sync expanded card whenever selectedDate changes (e.g. initial load or jump to today)
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

  // Filter plans
  const filteredPlans = plans.filter((plan) => {
    // Notes only filter
    if (filterNotesOnly && (!plan.dailyNote || plan.dailyNote.trim().length === 0)) {
      return false;
    }

    // Subject filter
    if (subjectFilter === 'math2' && !plan.math2Task) return false;
    if (subjectFilter === 'cs' && !plan.csTask) return false;

    // Status filter
    const mathDone = !plan.math2Task || plan.math2Task.isCompleted;
    const csDone = !plan.csTask || plan.csTask.isCompleted;
    const isAllDone = mathDone && csDone;

    if (statusFilter === 'completed' && !isAllDone) return false;
    if (statusFilter === 'pending' && isAllDone) return false;

    return true;
  });

  const toggleExpand = (date: string) => {
    setExpandedDate((prev) => (prev === date ? null : date));
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-amber-400" />
            <h1 className="text-lg sm:text-xl font-bold text-white font-['Plus_Jakarta_Sans',sans-serif]">
              天级实战推进大纲 (Day-by-Day Battle Plan)
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            34天全景特种兵路线：计组决战 (10.8-10.20) + 操作系统11天打击 (10.21-10.31) + 计网10天速通 (11.1-11.10) + 数二真题全程并轨
          </p>
        </div>

        {/* Filter Controls */}
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
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:border-slate-600'
              }`}
              title="快速聚焦到今日战况"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>回到今日</span>
            </button>
          )}

          {/* Subject Filter Tabs */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
            <button
              onClick={() => setSubjectFilter('all')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                subjectFilter === 'all'
                  ? 'bg-slate-800 text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              全部科目
            </button>
            <button
              onClick={() => setSubjectFilter('math2')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                subjectFilter === 'math2'
                  ? 'bg-slate-800 text-amber-400 font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              数二专项
            </button>
            <button
              onClick={() => setSubjectFilter('cs')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                subjectFilter === 'cs'
                  ? 'bg-slate-800 text-cyan-400 font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              408专项
            </button>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                statusFilter === 'all'
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              全状态
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                statusFilter === 'pending'
                  ? 'bg-slate-800 text-amber-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              待攻坚
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                statusFilter === 'completed'
                  ? 'bg-slate-800 text-emerald-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              已攻克
            </button>
          </div>

          {/* Notes Only Filter Toggle */}
          <button
            onClick={() => setFilterNotesOnly((prev) => !prev)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
              filterNotesOnly
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-xs'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
            title="筛选出记录过复盘笔记与未完成留存的日期"
          >
            <StickyNote className="h-3.5 w-3.5 text-amber-400" />
            <span>仅看有笔记 ({notesCount})</span>
          </button>
        </div>
      </div>

      {/* 2. Timeline List */}
      <div className="space-y-3">
        {filteredPlans.map((plan) => {
          const isSelected = selectedDate === plan.date;
          const isExpanded = expandedDate === plan.date;
          const mathCompleted = plan.math2Task?.isCompleted;
          const csCompleted = plan.csTask?.isCompleted;
          const allCompleted = (!plan.math2Task || mathCompleted) && (!plan.csTask || csCompleted);
          const hasNote = Boolean(plan.dailyNote && plan.dailyNote.trim().length > 0);

          return (
            <div
              key={plan.date}
              className={`rounded-xl border transition-all ${
                isSelected
                  ? 'border-amber-500/60 bg-slate-900/90 shadow-sm'
                  : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
              }`}
            >
              {/* Card Summary Header */}
              <div
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 cursor-pointer"
                onClick={() => {
                  onSelectDay(plan.date);
                  toggleExpand(plan.date);
                }}
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div className="flex flex-col items-center justify-center rounded-lg bg-slate-950 border border-slate-800 px-2.5 py-1.5 shrink-0 text-center min-w-[58px]">
                    <span className="text-xs font-bold text-white font-mono">
                      {plan.formattedDate}
                    </span>
                    <span className="text-[10px] text-slate-400">{plan.weekday}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold text-white">
                        {plan.theme}
                      </h3>
                      {plan.date === todayDateStr && (
                        <span className="text-[11px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-semibold">
                          ★ 东八区今日实战
                        </span>
                      )}
                      {allCompleted && (
                        <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                          <CheckCircle2 className="h-3 w-3" /> 当日收官
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-1">
                      {plan.math2Task && (
                        <span className="text-amber-400/90">
                          数二: {plan.math2Task.title.slice(0, 18)}...
                        </span>
                      )}
                      {plan.csTask && (
                        <>
                          <span className="text-slate-600">·</span>
                          <span className="text-cyan-400/90">
                            408: {plan.csTask.title.slice(0, 18)}...
                          </span>
                        </>
                      )}
                    </div>

                    {/* Unexpanded Note Banner Indicator: Visible even when card is not expanded! */}
                    {hasNote && (
                      <div
                        onClick={(e) => handleOpenNoteModal(plan, e)}
                        className="mt-2 flex items-start gap-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 px-2.5 py-1.5 text-xs text-amber-200/95 hover:bg-amber-500/20 hover:border-amber-500/50 transition-all cursor-pointer group max-w-xl"
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

                <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-center shrink-0">
                  {/* Task Quick Indicators */}
                  <div className="flex items-center gap-2">
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
                  </div>

                  {/* Daily Note Action Button: Visibly indicates note presence in unexpanded/expanded views */}
                  <button
                    onClick={(e) => handleOpenNoteModal(plan, e)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-xs ${
                      hasNote
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 hover:bg-amber-500/30 shadow-amber-950/40'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                    title={
                      hasNote
                        ? '此日已记录复盘备忘，点击查看或编辑'
                        : '点击记录今日未完成代办、易错点或明日补救计划'
                    }
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

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(plan.date);
                    }}
                    className="p-1 text-slate-400 hover:text-slate-200"
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

              {/* Expanded Tactical Details */}
              {isExpanded && (
                <div className="border-t border-slate-800/80 p-4 bg-slate-950/40 space-y-4 text-xs">
                  {/* Math 2 Detailed Section */}
                  {plan.math2Task && (
                    <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3.5 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onToggleMathComplete(plan.math2Task!.id)}
                            className="text-amber-400 hover:text-amber-300"
                          >
                            {plan.math2Task.isCompleted ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                            ) : (
                              <Circle className="h-4 w-4 text-slate-500" />
                            )}
                          </button>
                          <span className="font-bold text-amber-400">
                            【数学二】{plan.math2Task.title}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-400">
                          建议时间: 上午 08:30 - 12:00
                        </span>
                      </div>

                      <div className="pl-6 space-y-1.5 text-slate-300">
                        <p>
                          <strong className="text-slate-400">核心聚焦：</strong>
                          {plan.math2Task.focusArea}
                        </p>
                        <div>
                          <strong className="text-slate-400">必背核心公式/概念：</strong>
                          <ul className="list-disc list-inside mt-0.5 space-y-0.5 text-slate-300">
                            {plan.math2Task.coreConcepts.map((c, i) => (
                              <li key={i}>{c}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                          <div className="bg-slate-950/60 p-2 rounded border border-slate-800/50">
                            <span className="text-amber-400 font-medium">选择题目标：</span>
                            <span className="text-slate-400 ml-1">{plan.math2Task.mcqTarget}</span>
                          </div>
                          <div className="bg-slate-950/60 p-2 rounded border border-slate-800/50">
                            <span className="text-amber-400 font-medium">大题目标：</span>
                            <span className="text-slate-400 ml-1">{plan.math2Task.bigQuestionTarget}</span>
                          </div>
                        </div>
                        {plan.math2Task.pitfallsToAvoid.length > 0 && (
                          <div className="text-[11px] text-rose-400/90 bg-rose-950/20 p-2 rounded border border-rose-950/40">
                            <strong>避坑纪律：</strong>
                            {plan.math2Task.pitfallsToAvoid.join('；')}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 408 Detailed Section */}
                  {plan.csTask && (
                    <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-3.5 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onToggleCsComplete(plan.csTask!.id)}
                            className="text-cyan-400 hover:text-cyan-300"
                          >
                            {plan.csTask.isCompleted ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                            ) : (
                              <Circle className="h-4 w-4 text-slate-500" />
                            )}
                          </button>
                          <span className="font-bold text-cyan-400">
                            【408专业课】{plan.csTask.title}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-400">
                          建议时间: 下午 14:00 - 17:30
                        </span>
                      </div>

                      <div className="pl-6 space-y-1.5 text-slate-300">
                        <p>
                          <strong className="text-slate-400">攻坚焦点：</strong>
                          {plan.csTask.focusArea}
                        </p>
                        <div>
                          <strong className="text-slate-400">考点核心：</strong>
                          <ul className="list-disc list-inside mt-0.5 space-y-0.5 text-slate-300">
                            {plan.csTask.coreConcepts.map((c, i) => (
                              <li key={i}>{c}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                          <div className="bg-slate-950/60 p-2 rounded border border-slate-800/50">
                            <span className="text-cyan-400 font-medium">真题选择：</span>
                            <span className="text-slate-400 ml-1">{plan.csTask.mcqTarget}</span>
                          </div>
                          <div className="bg-slate-950/60 p-2 rounded border border-slate-800/50">
                            <span className="text-cyan-400 font-medium">重点大题：</span>
                            <span className="text-slate-400 ml-1">{plan.csTask.bigQuestionTarget}</span>
                          </div>
                        </div>
                        {plan.csTask.recommendedProblems.length > 0 && (
                          <div className="text-[11px] text-slate-400 pt-1">
                            <strong className="text-slate-500">经典统考真题号：</strong>
                            {plan.csTask.recommendedProblems.join(' · ')}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* English & Politics Interactive Tasks */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div
                      className={`p-2.5 rounded border transition-colors ${
                        plan.englishTask.isCompleted
                          ? 'bg-emerald-950/20 border-emerald-800/50'
                          : 'bg-slate-900/30 border-slate-800/60'
                      }`}
                    >
                      <button
                        onClick={() => onToggleEnglishComplete?.(plan.date)}
                        className="flex items-center gap-1.5 text-left font-semibold text-emerald-400 mb-1 cursor-pointer group"
                      >
                        {plan.englishTask.isCompleted ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        ) : (
                          <Circle className="h-3.5 w-3.5 text-slate-500 group-hover:text-emerald-400 shrink-0" />
                        )}
                        <span className={plan.englishTask.isCompleted ? 'line-through text-slate-400' : ''}>
                          [英语] {plan.englishTask.title}
                        </span>
                      </button>
                      <p className="text-slate-400 pl-5 leading-relaxed">{plan.englishTask.action}</p>
                    </div>

                    <div
                      className={`p-2.5 rounded border transition-colors ${
                        plan.politicsTask.isCompleted
                          ? 'bg-emerald-950/20 border-emerald-800/50'
                          : 'bg-slate-900/30 border-slate-800/60'
                      }`}
                    >
                      <button
                        onClick={() => onTogglePoliticsComplete?.(plan.date)}
                        className="flex items-center gap-1.5 text-left font-semibold text-indigo-400 mb-1 cursor-pointer group"
                      >
                        {plan.politicsTask.isCompleted ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        ) : (
                          <Circle className="h-3.5 w-3.5 text-slate-500 group-hover:text-indigo-400 shrink-0" />
                        )}
                        <span className={plan.politicsTask.isCompleted ? 'line-through text-slate-400' : ''}>
                          [政治] {plan.politicsTask.title}
                        </span>
                      </button>
                      <p className="text-slate-400 pl-5 leading-relaxed">{plan.politicsTask.action}</p>
                    </div>
                  </div>

                  {/* Daily Reflection & Incomplete Task Notes in Expanded Card */}
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

      {/* 3. Subsequent Battle Phases (Panoramic Roadmap) */}
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
