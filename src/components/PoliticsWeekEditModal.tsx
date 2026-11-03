import React, { useState, useEffect } from 'react';
import {
  PoliticsWeekPlan,
  PoliticsSubTask,
  PoliticsSubTaskCategory,
  PoliticsAcceptanceItem,
} from '../types/kaoyan';
import { POLITICS_CATEGORY_LABELS } from '../data/politicsScheduleData';
import {
  X,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Edit3,
  Sparkles,
  CheckCircle2,
  Circle,
  ClipboardCheck,
} from 'lucide-react';
import { getChinaDateInfo } from '../utils/chinaDate';

interface PoliticsWeekEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  weekPlan: PoliticsWeekPlan;
  onSave: (updatedWeek: PoliticsWeekPlan) => void;
  onResetToDefault: (weekId: string) => void;
}

const CATEGORY_OPTIONS: { value: PoliticsSubTaskCategory; label: string }[] = [
  { value: 'handbook', label: '背诵手册精读' },
  { value: 'memorize', label: '下册线索/专题背诵' },
  { value: 'xiao8', label: '肖八选择题' },
  { value: 'xiao4_mcq', label: '肖四选择题' },
  { value: 'xiao4_essay', label: '肖四主观题背诵' },
  { value: 'miniprogram', label: '小程序刷题' },
  { value: 'review', label: '错题复盘/小测' },
  { value: 'current_affairs', label: '时政热点' },
  { value: 'course', label: '技巧课/状态' },
];

export const PoliticsWeekEditModal: React.FC<PoliticsWeekEditModalProps> = ({
  isOpen,
  onClose,
  weekPlan,
  onSave,
  onResetToDefault,
}) => {
  const [title, setTitle] = useState(weekPlan.title);
  const [coreGoal, setCoreGoal] = useState(weekPlan.coreGoal);
  const [extraGoal, setExtraGoal] = useState(weekPlan.extraGoal || '');
  const [inputFocus, setInputFocus] = useState(weekPlan.inputFocus);
  const [outputFocus, setOutputFocus] = useState(weekPlan.outputFocus);
  const [subTasks, setSubTasks] = useState<PoliticsSubTask[]>(weekPlan.subTasks);
  const [acceptanceCriteria, setAcceptanceCriteria] = useState<PoliticsAcceptanceItem[]>(
    weekPlan.acceptanceCriteria
  );
  const [guidanceText, setGuidanceText] = useState(weekPlan.guidance.join('\n'));
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    setTitle(weekPlan.title);
    setCoreGoal(weekPlan.coreGoal);
    setExtraGoal(weekPlan.extraGoal || '');
    setInputFocus(weekPlan.inputFocus);
    setOutputFocus(weekPlan.outputFocus);
    setSubTasks(weekPlan.subTasks.map((t) => ({ ...t })));
    setAcceptanceCriteria(weekPlan.acceptanceCriteria.map((a) => ({ ...a })));
    setGuidanceText(weekPlan.guidance.join('\n'));
    setConfirmReset(false);
  }, [weekPlan]);

  if (!isOpen) return null;

  const handleAddSubTask = () => {
    const newTask: PoliticsSubTask = {
      id: `${weekPlan.id}-custom-${Date.now()}`,
      category: 'handbook',
      moduleName: '新增模块',
      title: '新增政治专项打卡任务',
      detail: '结合背诵手册或肖八/肖四完成',
      isCompleted: false,
    };
    setSubTasks((prev) => [...prev, newTask]);
  };

  const handleRemoveSubTask = (id: string) => {
    setSubTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleUpdateSubTask = (
    id: string,
    field: keyof PoliticsSubTask,
    value: string | boolean
  ) => {
    setSubTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  };

  const handleAddAcceptance = () => {
    const newItem: PoliticsAcceptanceItem = {
      id: `${weekPlan.id}-acc-${Date.now()}`,
      text: '新增本周验收标准条目',
      isCompleted: false,
    };
    setAcceptanceCriteria((prev) => [...prev, newItem]);
  };

  const handleRemoveAcceptance = (id: string) => {
    setAcceptanceCriteria((prev) => prev.filter((a) => a.id !== id));
  };

  const handleUpdateAcceptance = (
    id: string,
    field: keyof PoliticsAcceptanceItem,
    value: string | boolean
  ) => {
    setAcceptanceCriteria((prev) =>
      prev.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const chinaNow = getChinaDateInfo();
    const timestamp = `${chinaNow.month}月${chinaNow.day}日 ${chinaNow.timeStr}`;
    const cleanedGuidance = guidanceText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    const updated: PoliticsWeekPlan = {
      ...weekPlan,
      title: title.trim() || weekPlan.title,
      coreGoal: coreGoal.trim() || weekPlan.coreGoal,
      extraGoal: extraGoal.trim() || undefined,
      inputFocus: inputFocus.trim() || weekPlan.inputFocus,
      outputFocus: outputFocus.trim() || weekPlan.outputFocus,
      subTasks: subTasks.map((t) => ({
        ...t,
        moduleName: t.moduleName.trim() || '政治任务',
        title: t.title.trim() || '未命名任务',
        detail: t.detail?.trim() || undefined,
      })),
      acceptanceCriteria: acceptanceCriteria
        .map((a) => ({
          ...a,
          text: a.text.trim(),
        }))
        .filter((a) => a.text.length > 0),
      guidance: cleanedGuidance.length > 0 ? cleanedGuidance : weekPlan.guidance,
      isCustomized: true,
      customizedAt: timestamp,
    };

    onSave(updated);
    onClose();
  };

  const handleReset = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    onResetToDefault(weekPlan.id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-2xl border border-rose-500/40 bg-slate-900 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-5 py-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300">
              <Edit3 className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white">
                  动态调整政治周规划 · 第{weekPlan.weekNumber}周 ({weekPlan.dateRange})
                </h3>
                {weekPlan.isCustomized && (
                  <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles className="h-2.5 w-2.5" />
                    已定制
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                支持拆分/增删每周独立打卡项、验收标准清单、输入/输出重点与方法指导，自动纳入全量导出备份
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          {/* Week Title & Goals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1">本周主题标题</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-rose-400 focus:outline-none"
                placeholder="例如：第 2 周：肖八第一轮（前四套选择题 + 毛概/史纲精读）"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">本周核心目标</label>
              <input
                type="text"
                value={coreGoal}
                onChange={(e) => setCoreGoal(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-rose-400 focus:outline-none"
                placeholder="例如：完成肖八前四套选择题"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">额外目标（选填）</label>
              <input
                type="text"
                value={extraGoal}
                onChange={(e) => setExtraGoal(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-rose-400 focus:outline-none"
                placeholder="例如：毛概、史纲精读"
              />
            </div>

            <div>
              <label className="block text-rose-300 font-semibold mb-1">
                📥 本周输入主线（背诵手册页码/核心专题）
              </label>
              <input
                type="text"
                value={inputFocus}
                onChange={(e) => setInputFocus(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-rose-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-amber-300 font-semibold mb-1">
                📤 本周输出主线（肖八/肖四/小程序）
              </label>
              <input
                type="text"
                value={outputFocus}
                onChange={(e) => setOutputFocus(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-rose-400 focus:outline-none"
              />
            </div>
          </div>

          {/* SubTasks List (Independent Check-off Items) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-slate-200 font-bold flex items-center gap-2">
                <span>本周拆分打卡清单 ({subTasks.length} 项)</span>
                <span className="text-[11px] font-normal text-slate-400">
                  （按套数/次数拆分为独立打卡项）
                </span>
              </label>
              <button
                type="button"
                onClick={handleAddSubTask}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-semibold transition-colors cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>新增打卡项</span>
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {subTasks.map((task, idx) => {
                const catStyle = POLITICS_CATEGORY_LABELS[task.category];
                return (
                  <div
                    key={task.id}
                    className="rounded-xl border border-slate-800 bg-slate-950/90 p-3 flex flex-col sm:flex-row sm:items-center gap-2.5"
                  >
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-mono text-slate-500 w-5">
                        #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleUpdateSubTask(task.id, 'isCompleted', !task.isCompleted)
                        }
                        className="cursor-pointer text-slate-400 hover:text-rose-400"
                        title={task.isCompleted ? '已打卡完成' : '未完成'}
                      >
                        {task.isCompleted ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        ) : (
                          <Circle className="h-4 w-4 text-slate-500" />
                        )}
                      </button>
                      <select
                        value={task.category}
                        onChange={(e) =>
                          handleUpdateSubTask(
                            task.id,
                            'category',
                            e.target.value as PoliticsSubTaskCategory
                          )
                        }
                        className={`rounded-md border px-2 py-1 text-[11px] font-semibold bg-slate-900 focus:outline-none ${catStyle.badgeClass}`}
                      >
                        {CATEGORY_OPTIONS.map((opt) => (
                          <option
                            key={opt.value}
                            value={opt.value}
                            className="bg-slate-900 text-slate-200"
                          >
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={task.moduleName}
                        onChange={(e) =>
                          handleUpdateSubTask(task.id, 'moduleName', e.target.value)
                        }
                        placeholder="模块名（如：肖八第1套）"
                        className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-rose-200 focus:border-rose-400 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={task.title}
                        onChange={(e) =>
                          handleUpdateSubTask(task.id, 'title', e.target.value)
                        }
                        placeholder="打卡项名称"
                        className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-white focus:border-rose-400 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={task.detail || ''}
                        onChange={(e) =>
                          handleUpdateSubTask(task.id, 'detail', e.target.value)
                        }
                        placeholder="补充说明（选填）"
                        className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-300 focus:border-rose-400 focus:outline-none"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveSubTask(task.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors self-end sm:self-center cursor-pointer"
                      title="删除此项"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weekly Acceptance Criteria List */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-amber-300 font-bold flex items-center gap-1.5">
                <ClipboardCheck className="h-4 w-4" />
                <span>本周验收标准清单 ({acceptanceCriteria.length} 条)</span>
              </label>
              <button
                type="button"
                onClick={handleAddAcceptance}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-semibold transition-colors cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>新增验收标准</span>
              </button>
            </div>

            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
              {acceptanceCriteria.map((acc) => (
                <div
                  key={acc.id}
                  className="rounded-lg border border-slate-800 bg-slate-950/90 px-3 py-2 flex items-center gap-2.5"
                >
                  <button
                    type="button"
                    onClick={() =>
                      handleUpdateAcceptance(acc.id, 'isCompleted', !acc.isCompleted)
                    }
                    className="cursor-pointer shrink-0"
                  >
                    {acc.isCompleted ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Circle className="h-4 w-4 text-slate-500" />
                    )}
                  </button>
                  <input
                    type="text"
                    value={acc.text}
                    onChange={(e) => handleUpdateAcceptance(acc.id, 'text', e.target.value)}
                    className="flex-1 rounded border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-slate-100 focus:border-amber-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveAcceptance(acc.id)}
                    className="p-1 text-slate-500 hover:text-rose-400 cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Guidance */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              本周方法论与重点提示（每行一条）
            </label>
            <textarea
              rows={3}
              value={guidanceText}
              onChange={(e) => setGuidanceText(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-rose-400 focus:outline-none leading-relaxed"
              placeholder="每行输入一条本周复习注意事项..."
            />
          </div>

          {/* Footer Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4">
            <button
              type="button"
              onClick={handleReset}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                confirmReset
                  ? 'border-rose-500 bg-rose-500/20 text-rose-200'
                  : 'border-slate-700 bg-slate-800/80 text-slate-300 hover:text-rose-300 hover:border-rose-500/40'
              }`}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{confirmReset ? '再次点击确认恢复默认周计划' : '恢复本周官方默认排期'}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-medium cursor-pointer"
              >
                取消
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                <Save className="h-3.5 w-3.5" />
                <span>保存本周政治安排</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
