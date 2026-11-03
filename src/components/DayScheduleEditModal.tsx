import React, { useState } from 'react';
import { DayPlan } from '../types/kaoyan';
import {
  X,
  RotateCcw,
  Save,
  Clock,
  Sparkles,
  BookOpen,
  Cpu,
  BookmarkCheck,
  Flag,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';

interface DayScheduleEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  dayPlan: DayPlan;
  onSave: (updatedPlan: DayPlan) => void;
  onResetToDefault: (date: string) => void;
  initialSubjectTab?: 'math2' | 'cs' | 'english' | 'politics';
}

export const DayScheduleEditModal: React.FC<DayScheduleEditModalProps> = ({
  isOpen,
  onClose,
  dayPlan,
  onSave,
  onResetToDefault,
  initialSubjectTab = 'math2',
}) => {
  const [activeTab, setActiveTab] = useState<'math2' | 'cs' | 'english' | 'politics'>(initialSubjectTab);
  const [theme, setTheme] = useState(dayPlan.theme || '');

  // Math 2 state
  const [mathTitle, setMathTitle] = useState(dayPlan.math2Task?.title || '');
  const [mathFocusArea, setMathFocusArea] = useState(dayPlan.math2Task?.focusArea || '');
  const [mathDuration, setMathDuration] = useState(dayPlan.math2Task?.suggestedDurationMinutes || 180);
  const [mathMcqTarget, setMathMcqTarget] = useState(dayPlan.math2Task?.mcqTarget || '');
  const [mathBigTarget, setMathBigTarget] = useState(dayPlan.math2Task?.bigQuestionTarget || '');
  const [mathProblems, setMathProblems] = useState((dayPlan.math2Task?.recommendedProblems || []).join('\n'));
  const [mathPitfalls, setMathPitfalls] = useState((dayPlan.math2Task?.pitfallsToAvoid || []).join('\n'));

  // CS 408 state
  const [csTitle, setCsTitle] = useState(dayPlan.csTask?.title || '');
  const [csFocusArea, setCsFocusArea] = useState(dayPlan.csTask?.focusArea || '');
  const [csDuration, setCsDuration] = useState(dayPlan.csTask?.suggestedDurationMinutes || 210);
  const [csMcqTarget, setCsMcqTarget] = useState(dayPlan.csTask?.mcqTarget || '');
  const [csBigTarget, setCsBigTarget] = useState(dayPlan.csTask?.bigQuestionTarget || '');
  const [csProblems, setCsProblems] = useState((dayPlan.csTask?.recommendedProblems || []).join('\n'));
  const [csPitfalls, setCsPitfalls] = useState((dayPlan.csTask?.pitfallsToAvoid || []).join('\n'));

  // English state
  const [englishTitle, setEnglishTitle] = useState(dayPlan.englishTask?.title || '');
  const [englishAction, setEnglishAction] = useState(dayPlan.englishTask?.action || '');
  const [englishDuration, setEnglishDuration] = useState(dayPlan.englishTask?.durationMinutes || 60);

  // Politics state
  const [politicsTitle, setPoliticsTitle] = useState(dayPlan.politicsTask?.title || '');
  const [politicsAction, setPoliticsAction] = useState(dayPlan.politicsTask?.action || '');
  const [politicsDuration, setPoliticsDuration] = useState(dayPlan.politicsTask?.durationMinutes || 60);
  const [politicsGoal, setPoliticsGoal] = useState(dayPlan.politicsDetail?.goal || '');

  if (!isOpen) return null;

  const handleSave = () => {
    const updatedPlan: DayPlan = {
      ...dayPlan,
      theme: theme.trim(),
      isCustomized: true,
      customizedAt: new Date().toISOString(),
      math2Task: dayPlan.math2Task
        ? {
            ...dayPlan.math2Task,
            title: mathTitle.trim(),
            focusArea: mathFocusArea.trim(),
            suggestedDurationMinutes: Number(mathDuration) || 180,
            mcqTarget: mathMcqTarget.trim(),
            bigQuestionTarget: mathBigTarget.trim(),
            recommendedProblems: mathProblems
              .split('\n')
              .map((s) => s.trim())
              .filter(Boolean),
            pitfallsToAvoid: mathPitfalls
              .split('\n')
              .map((s) => s.trim())
              .filter(Boolean),
          }
        : undefined,
      csTask: dayPlan.csTask
        ? {
            ...dayPlan.csTask,
            title: csTitle.trim(),
            focusArea: csFocusArea.trim(),
            suggestedDurationMinutes: Number(csDuration) || 210,
            mcqTarget: csMcqTarget.trim(),
            bigQuestionTarget: csBigTarget.trim(),
            recommendedProblems: csProblems
              .split('\n')
              .map((s) => s.trim())
              .filter(Boolean),
            pitfallsToAvoid: csPitfalls
              .split('\n')
              .map((s) => s.trim())
              .filter(Boolean),
          }
        : undefined,
      englishTask: {
        ...dayPlan.englishTask,
        title: englishTitle.trim(),
        action: englishAction.trim(),
        durationMinutes: Number(englishDuration) || 60,
      },
      politicsTask: {
        ...dayPlan.politicsTask,
        title: politicsTitle.trim(),
        action: politicsAction.trim(),
        durationMinutes: Number(politicsDuration) || 60,
      },
      politicsDetail: dayPlan.politicsDetail
        ? {
            ...dayPlan.politicsDetail,
            title: politicsTitle.trim() || dayPlan.politicsDetail.title,
            goal: politicsGoal.trim() || dayPlan.politicsDetail.goal,
          }
        : undefined,
    };

    onSave(updatedPlan);
    onClose();
  };

  const handleReset = () => {
    if (window.confirm(`确定要将【${dayPlan.formattedDate}】的日程恢复为官方初始排期吗？此操作将清除该日的自定义修改。`)) {
      onResetToDefault(dayPlan.date);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold tracking-tight text-slate-100 font-mono">
                {dayPlan.formattedDate}
              </span>
              <span className="text-sm text-slate-400 font-medium">{dayPlan.weekday}</span>
            </div>
            {dayPlan.isCustomized ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30">
                <Sparkles className="w-3 h-3 text-amber-400" />
                个性化定制
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700">
                官方初始排期
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 transition-colors"
            title="关闭窗口"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Day Theme */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Flag className="w-3.5 h-3.5 text-amber-400" />
              当日核心作战目标与口号
            </label>
            <input
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="例如：数二真题掐表模考 + 408 计组数据通路突破"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/40 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
            />
          </div>

          {/* Subject Switch Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950/70 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('math2')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'math2'
                  ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40 shadow-sm shadow-amber-950/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>数学二 (按日任务)</span>
            </button>
            <button
              onClick={() => setActiveTab('cs')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'cs'
                  ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/40 shadow-sm shadow-cyan-950/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>408 计算机 (按日任务)</span>
            </button>
          </div>

          {/* Tab Content: Math 2 */}
          {activeTab === 'math2' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-semibold text-amber-300">任务标题 / 套卷名称</label>
                  <input
                    type="text"
                    value={mathTitle}
                    onChange={(e) => setMathTitle(e.target.value)}
                    placeholder="如：2016年真题掐表模拟 (08:30-11:30)"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-amber-500/60 text-sm text-slate-100 placeholder-slate-500 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    建议时长 (分钟)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={mathDuration}
                      onChange={(e) => setMathDuration(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-amber-500/60 text-sm text-slate-100 font-mono outline-none"
                    />
                    <span className="text-xs text-slate-400 whitespace-nowrap">min</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">核心聚焦领域 / 专题考点</label>
                <input
                  type="text"
                  value={mathFocusArea}
                  onChange={(e) => setMathFocusArea(e.target.value)}
                  placeholder="如：全卷全真模考 + 极限运算与多元微分"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-amber-500/60 text-sm text-slate-100 placeholder-slate-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">选填题实战指标</label>
                  <input
                    type="text"
                    value={mathMcqTarget}
                    onChange={(e) => setMathMcqTarget(e.target.value)}
                    placeholder="如：40m选择题+30m填空题，错题控制在2题内"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-amber-500/60 text-sm text-slate-100 placeholder-slate-500 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">解答大题实战指标</label>
                  <input
                    type="text"
                    value={mathBigTarget}
                    onChange={(e) => setMathBigTarget(e.target.value)}
                    placeholder="如：大题写满完整推理步骤，避免跳步扣分"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-amber-500/60 text-sm text-slate-100 placeholder-slate-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">推荐题号 / 突破章节 (每行一条)</label>
                <textarea
                  rows={2}
                  value={mathProblems}
                  onChange={(e) => setMathProblems(e.target.value)}
                  placeholder="2016 真题全卷 T1-T23&#10;晚间白纸重做错题与卡壳题"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-amber-500/60 text-sm text-slate-100 placeholder-slate-500 outline-none resize-none font-mono text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-amber-400/90 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  易错陷阱与避坑防线 (每行一条)
                </label>
                <textarea
                  rows={2}
                  value={mathPitfalls}
                  onChange={(e) => setMathPitfalls(e.target.value)}
                  placeholder="遇到卡壳大题果断标记跳过，绝不死磕超过8分钟&#10;定积分换元切记同步换限"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-amber-500/60 text-sm text-slate-100 placeholder-slate-500 outline-none resize-none text-xs"
                />
              </div>
            </div>
          )}

          {/* Tab Content: CS 408 */}
          {activeTab === 'cs' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-semibold text-cyan-300">任务标题 / 统考真题名称</label>
                  <input
                    type="text"
                    value={csTitle}
                    onChange={(e) => setCsTitle(e.target.value)}
                    placeholder="如：2016年统考真题全真模考 + 订正"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-cyan-500/60 text-sm text-slate-100 placeholder-slate-500 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    建议时长 (分钟)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={csDuration}
                      onChange={(e) => setCsDuration(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-cyan-500/60 text-sm text-slate-100 font-mono outline-none"
                    />
                    <span className="text-xs text-slate-400 whitespace-nowrap">min</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">核心聚焦领域 / 专题考点</label>
                <input
                  type="text"
                  value={csFocusArea}
                  onChange={(e) => setCsFocusArea(e.target.value)}
                  placeholder="如：全真统考套卷 + 数据通路与页表转换"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-cyan-500/60 text-sm text-slate-100 placeholder-slate-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">选择题实战指标</label>
                  <input
                    type="text"
                    value={csMcqTarget}
                    onChange={(e) => setCsMcqTarget(e.target.value)}
                    placeholder="如：40道单选限时75分钟完成"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-cyan-500/60 text-sm text-slate-100 placeholder-slate-500 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">综合大题攻坚指标</label>
                  <input
                    type="text"
                    value={csBigTarget}
                    onChange={(e) => setCsBigTarget(e.target.value)}
                    placeholder="如：算法题写出规范伪代码，计组写全数据流向"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-cyan-500/60 text-sm text-slate-100 placeholder-slate-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">推荐题号 / 突破章节 (每行一条)</label>
                <textarea
                  rows={2}
                  value={csProblems}
                  onChange={(e) => setCsProblems(e.target.value)}
                  placeholder="2016 统考全卷 40道单选 + 7道大题&#10;重点重做 T41 算法题与 T44 计网拥塞控制"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-cyan-500/60 text-sm text-slate-100 placeholder-slate-500 outline-none resize-none font-mono text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-cyan-400/90 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  易错陷阱与避坑防线 (每行一条)
                </label>
                <textarea
                  rows={2}
                  value={csPitfalls}
                  onChange={(e) => setCsPitfalls(e.target.value)}
                  placeholder="区分字节寻址与字寻址&#10;PV操作中信号量P/V配对检查"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-cyan-500/60 text-sm text-slate-100 placeholder-slate-500 outline-none resize-none text-xs"
                />
              </div>
            </div>
          )}

          {/* Tab Content: English */}
          {activeTab === 'english' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-semibold text-emerald-300">英语任务标题</label>
                  <input
                    type="text"
                    value={englishTitle}
                    onChange={(e) => setEnglishTitle(e.target.value)}
                    placeholder="如：英语真题阅读精读 1h"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-emerald-500/60 text-sm text-slate-100 placeholder-slate-500 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    建议时长 (分钟)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={englishDuration}
                      onChange={(e) => setEnglishDuration(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-emerald-500/60 text-sm text-slate-100 font-mono outline-none"
                    />
                    <span className="text-xs text-slate-400 whitespace-nowrap">min</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">具体执行内容与动作</label>
                <textarea
                  rows={4}
                  value={englishAction}
                  onChange={(e) => setEnglishAction(e.target.value)}
                  placeholder="精做 2018 Text 2，掐表18分钟做完，逐句翻译长难句，整理15个生词并默写"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-emerald-500/60 text-sm text-slate-100 placeholder-slate-500 outline-none resize-none"
                />
              </div>
            </div>
          )}

          {/* Tab Content: Politics */}
          {activeTab === 'politics' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-semibold text-red-300/90">政治任务标题 (简明易辨)</label>
                  <input
                    type="text"
                    value={politicsTitle}
                    onChange={(e) => setPoliticsTitle(e.target.value)}
                    placeholder="如：肖八第1套选择题精做 + 错项订正"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-red-500/40 text-sm text-slate-100 placeholder-slate-500 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-red-400/80" />
                    建议时长 (分钟)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={politicsDuration}
                      onChange={(e) => setPoliticsDuration(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-red-500/40 text-sm text-slate-100 font-mono outline-none"
                    />
                    <span className="text-xs text-slate-400 whitespace-nowrap">min</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">具体执行任务与执行细节</label>
                <textarea
                  rows={3}
                  value={politicsAction}
                  onChange={(e) => setPoliticsAction(e.target.value)}
                  placeholder="限时完成肖八选择题一套，错题回归背诵手册，把干扰项的错误原因在手册边批注清楚"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-red-500/40 text-sm text-slate-100 placeholder-slate-500 outline-none resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">阶段作战目标备忘 (选填)</label>
                <input
                  type="text"
                  value={politicsGoal}
                  onChange={(e) => setPoliticsGoal(e.target.value)}
                  placeholder="如：稳固马原哲学选择题框架，排除概念混淆"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-red-500/40 text-sm text-slate-100 placeholder-slate-500 outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div>
            {dayPlan.isCustomized ? (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-amber-400 hover:text-amber-300 hover:bg-amber-950/40 border border-amber-500/30 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>恢复此日官方大纲</span>
              </button>
            ) : (
              <span className="text-xs text-slate-400">修改后将为此日生成专属个性化日程</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            >
              取消
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md shadow-amber-950/30 active:scale-95"
            >
              <Save className="w-3.5 h-3.5" />
              <span>保存日程修改</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
