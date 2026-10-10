import React, { useState } from 'react';
import { DayPlan } from '../types/kaoyan';
import { BOOST_QUOTES } from '../data/mindsetCards';
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
} from 'lucide-react';

interface DashboardOverviewProps {
  currentDayPlan: DayPlan;
  allPlans: DayPlan[];
  onSelectDay: (date: string) => void;
  onToggleMathComplete: (taskId: string) => void;
  onToggleCsComplete: (taskId: string) => void;
  onSaveDayNotes: (date: string, notes: string) => void;
  onNavigateToTab: (tab: 'timeline' | 'armory' | 'workstation' | 'mindset') => void;
  daysToExam: number;
  daysToMathPastPapers: number;
  daysToCsPastPapers: number;
  daysToXiao8: number;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  currentDayPlan,
  allPlans,
  onSelectDay,
  onToggleMathComplete,
  onToggleCsComplete,
  onSaveDayNotes,
  onNavigateToTab,
  daysToExam,
  daysToMathPastPapers,
  daysToCsPastPapers,
  daysToXiao8,
}) => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [noteContent, setNoteContent] = useState(currentDayPlan.math2Task?.notes || '');
  const [isNoteSaved, setIsNoteSaved] = useState(false);

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
  const totalCsTasks = allPlans.filter((p) => p.csTask).length;
  const completedCsTasks = allPlans.filter((p) => p.csTask?.isCompleted).length;

  return (
    <div className="space-y-6">
      {/* 1. Tactical Command Banner */}
      <section className="relative overflow-hidden rounded-xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 p-6 shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <Flame className="h-4 w-4" />
              <span>当前战略指令 · 战时极限冲刺模式</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 font-mono">
                {currentDayPlan.formattedDate} ({currentDayPlan.weekday})
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-['Plus_Jakarta_Sans',sans-serif]">
              {currentDayPlan.theme}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              核心方针：<span className="text-amber-300 font-medium">保大放小，动态顺延，彻底放弃冗长录播课</span>。
              以讲义例题为骨架推进数二（时间严格不动），408因大学课程顺延2天至10.11接战主存、10.22计组结课、10.23OS启动，死守 10.23 数二真题与 11.11 全真套卷！
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <select
              value={currentDayPlan.date}
              onChange={(e) => onSelectDay(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-800/90 px-3 py-2 text-xs font-medium text-slate-200 focus:border-amber-400 focus:outline-none"
            >
              {allPlans.map((plan) => (
                <option key={plan.date} value={plan.date}>
                  {plan.formattedDate} ({plan.weekday}) - {plan.theme.slice(0, 16)}...
                </option>
              ))}
            </select>
            <button
              onClick={() => onNavigateToTab('timeline')}
              className="flex items-center gap-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-3 py-2 text-xs font-semibold text-amber-300 transition-colors"
            >
              <span>查看完整日程</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Four Tactical Countdowns */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-all hover:border-slate-700">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>数二真题拔剑 (10.23)</span>
            <span className="font-mono text-amber-400 font-medium">压缩第16天</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-amber-400">
              {daysToMathPastPapers > 0 ? daysToMathPastPapers : '0'}
            </span>
            <span className="text-xs text-slate-400">天后启动近15年真题</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 truncate">
            10.22前彻底收口多元微分与线代全家桶
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-all hover:border-slate-700">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>408全真套卷 (11.11)</span>
            <span className="font-mono text-cyan-400 font-medium">四科收官</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-cyan-400">
              {daysToCsPastPapers > 0 ? daysToCsPastPapers : '0'}
            </span>
            <span className="text-xs text-slate-400">天后开启2010-2024套卷</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 truncate">
            计组(10.22) → OS(11.02) → 计网(11.11)
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-all hover:border-slate-700">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>政治《肖八》接战 (11.10)</span>
            <span className="font-mono text-indigo-400 font-medium">模拟卷上市</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-indigo-400">
              {daysToXiao8 > 0 ? daysToXiao8 : '0'}
            </span>
            <span className="text-xs text-slate-400">天后全面停刷1000题</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 truncate">
            现阶段严控45-60分/天刷核心错题
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-all hover:border-slate-700">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>考研初试决战日</span>
            <span className="font-mono text-emerald-400 font-medium">全国统一</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums text-emerald-400">
              {daysToExam}
            </span>
            <span className="text-xs text-slate-400">天决战紫禁之巅</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 truncate">
            沉住气，你拿下的真实底牌远超想象
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
              <h3 className="text-sm font-semibold text-white">数学二 (150分) · 15天极限压缩战</h3>
            </div>
            <span className="text-xs font-mono tabular-nums text-amber-400">
              {completedMathTasks} / {totalMathTasks} 天完成
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden mb-3">
            <div
              className="h-full bg-amber-400 transition-all duration-300"
              style={{ width: `${(completedMathTasks / Math.max(totalMathTasks, 1)) * 100}%` }}
            />
          </div>
          <div className="text-xs text-slate-400 space-y-1">
            <p>
              <strong className="text-slate-300">今日重点：</strong>
              {currentDayPlan.math2Task?.title || '真题套卷模考'}
            </p>
            <p className="text-slate-500">
              纪律：遮住答案硬想2分钟，会做立刻跳过，卡壳只看前三句破题点，拒绝偏怪题。
            </p>
          </div>
        </div>

        {/* 408 Status */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
              <h3 className="text-sm font-semibold text-white">408 计算机专业课 (150分) · 铁血攻坚</h3>
            </div>
            <span className="text-xs font-mono tabular-nums text-cyan-400">
              {completedCsTasks} / {totalCsTasks} 天完成
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden mb-3">
            <div
              className="h-full bg-cyan-400 transition-all duration-300"
              style={{ width: `${(completedCsTasks / Math.max(totalCsTasks, 1)) * 100}%` }}
            />
          </div>
          <div className="text-xs text-slate-400 space-y-1">
            <p>
              <strong className="text-slate-300">当前主攻：</strong>
              {currentDayPlan.csTask?.phase} · {currentDayPlan.csTask?.title}
            </p>
            <p className="text-slate-500">
              纪律：数据结构已封存，只刷带年份的真题选择，王道自编题直接跳过。
            </p>
          </div>
        </div>
      </section>

      {/* 4. Today's Action Checklist (The Real Battlefield) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookMarked className="h-4 w-4 text-amber-400" />
            <h2 className="text-base font-bold text-white">今日落地作战清单 (Today's Directives)</h2>
          </div>
          <span className="text-xs text-slate-400">
            打勾状态将自动保存在本地，无需刷新
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
                  className="flex items-center gap-2 text-left group"
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
                  <span className="text-slate-400 font-medium">核心概念：</span>
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

                {currentDayPlan.math2Task.recommendedProblems.length > 0 && (
                  <div className="text-[11px] text-slate-400 pt-1">
                    <span className="text-slate-500">推荐母题：</span>
                    {currentDayPlan.math2Task.recommendedProblems.join(' · ')}
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
                  className="flex items-center gap-2 text-left group"
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
                    {currentDayPlan.csTask.recommendedProblems.join(' · ')}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* English Routine Card */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-medium text-emerald-400">
                [考研英语] 傍晚 18:30 - 20:00 (严格限时)
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {currentDayPlan.englishTask.durationMinutes} 分钟
              </span>
            </div>
            <h3 className="text-sm font-semibold text-white mb-2">
              {currentDayPlan.englishTask.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60">
              {currentDayPlan.englishTask.action}
            </p>
            <div className="mt-2 text-[11px] text-slate-500">
              纪律：严禁超时！耗时超过75分钟就是不及格，省出的脑力留给数学与408。
            </div>
          </div>

          {/* Politics Routine Card */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-medium text-indigo-400">
                [考研政治] 夜间 22:00 - 23:00 (防守反击)
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {currentDayPlan.politicsTask.durationMinutes} 分钟
              </span>
            </div>
            <h3 className="text-sm font-semibold text-white mb-2">
              {currentDayPlan.politicsTask.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60">
              {currentDayPlan.politicsTask.action}
            </p>
            <div className="mt-2 text-[11px] text-slate-500">
              纪律：手册是终极错题本，荧光笔划一道即可，绝不抄题，睡前清空小程序错题本。
            </div>
          </div>
        </div>
      </section>

      {/* 5. Daily Battlefield Note & Motivation Boost */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Daily Note Area */}
        <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900/50 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Edit3 className="h-4 w-4 text-slate-400" />
              <h3 className="text-sm font-semibold text-white">
                今日战地复盘与错题备忘 ({currentDayPlan.formattedDate})
              </h3>
            </div>
            {isNoteSaved && (
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> 已自动保存
              </span>
            )}
          </div>
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="写下今天算对的母题、踩过的坑点，或明天一早第一道要攻坚的例题题号..."
            className="w-full h-24 rounded-lg border border-slate-800 bg-slate-950/80 p-3 text-xs text-slate-200 placeholder:text-slate-600 focus:border-amber-400 focus:outline-none"
          />
          <div className="mt-2 flex justify-end">
            <button
              onClick={handleSaveNote}
              className="px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors"
            >
              保存今日笔记
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
                className="text-slate-500 hover:text-rose-300 flex items-center gap-1 text-[11px] transition-colors"
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
              className="text-xs font-semibold text-rose-400 hover:text-rose-300 underline underline-offset-2"
            >
              进入心态急救舱 →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
