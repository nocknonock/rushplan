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
} from 'lucide-react';

interface DailyTimelineProps {
  plans: DayPlan[];
  selectedDate: string;
  onSelectDay: (date: string) => void;
  onToggleMathComplete: (taskId: string) => void;
  onToggleCsComplete: (taskId: string) => void;
}

export const DailyTimeline: React.FC<DailyTimelineProps> = ({
  plans,
  selectedDate,
  onSelectDay,
  onToggleMathComplete,
  onToggleCsComplete,
}) => {
  const [subjectFilter, setSubjectFilter] = useState<'all' | 'math2' | 'cs'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [expandedDate, setExpandedDate] = useState<string | null>(selectedDate);

  // Filter plans
  const filteredPlans = plans.filter((plan) => {
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
            精确落实到天的特种兵打法：数二15天极限压缩 (10.8-10.22) + 计组顺延决战 (10.8-10.22，10.11接战主存)
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
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

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold text-white">
                        {plan.theme}
                      </h3>
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
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
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

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(plan.date);
                    }}
                    className="p-1 text-slate-400 hover:text-slate-200"
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

                  {/* English & Politics Summary */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="bg-slate-900/30 p-2.5 rounded border border-slate-800/60">
                      <span className="text-emerald-400 font-semibold">[英语] 18:30-20:00：</span>
                      <p className="text-slate-400 mt-0.5">{plan.englishTask.action}</p>
                    </div>
                    <div className="bg-slate-900/30 p-2.5 rounded border border-slate-800/60">
                      <span className="text-indigo-400 font-semibold">[政治] 22:00-23:00：</span>
                      <p className="text-slate-400 mt-0.5">{plan.politicsTask.action}</p>
                    </div>
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
    </div>
  );
};
