import React, { useState, useEffect } from 'react';
import { EnglishWeekPlan, EnglishSubTask, EnglishSubTaskCategory } from '../types/kaoyan';
import { ENGLISH_CATEGORY_LABELS } from '../data/englishScheduleData';
import { X, Save, RotateCcw, Plus, Trash2, Edit3, Sparkles, CheckCircle2, Circle } from 'lucide-react';
import { getChinaDateInfo } from '../utils/chinaDate';

interface EnglishWeekEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  weekPlan: EnglishWeekPlan;
  onSave: (updatedWeek: EnglishWeekPlan) => void;
  onResetToDefault: (weekId: string) => void;
}

const CATEGORY_OPTIONS: { value: EnglishSubTaskCategory; label: string }[] = [
  { value: 'reading', label: '阅读理解' },
  { value: 'cloze', label: '完形填空' },
  { value: 'translation', label: '翻译专项' },
  { value: 'newType', label: '新题型' },
  { value: 'essay', label: '大小作文' },
  { value: 'mock', label: '全真模考' },
  { value: 'review', label: '错题复盘' },
  { value: 'vocab', label: '核心词汇' },
];

export const EnglishWeekEditModal: React.FC<EnglishWeekEditModalProps> = ({
  isOpen,
  onClose,
  weekPlan,
  onSave,
  onResetToDefault,
}) => {
  const [title, setTitle] = useState(weekPlan.title);
  const [goal, setGoal] = useState(weekPlan.goal);
  const [subTasks, setSubTasks] = useState<EnglishSubTask[]>(weekPlan.subTasks);
  const [guidanceText, setGuidanceText] = useState(weekPlan.guidance.join('\n'));
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    setTitle(weekPlan.title);
    setGoal(weekPlan.goal);
    setSubTasks(weekPlan.subTasks.map((t) => ({ ...t })));
    setGuidanceText(weekPlan.guidance.join('\n'));
    setConfirmReset(false);
  }, [weekPlan]);

  if (!isOpen) return null;

  const handleAddSubTask = () => {
    const newTask: EnglishSubTask = {
      id: `${weekPlan.id}-custom-${Date.now()}`,
      category: 'reading',
      title: '新增专项训练 1篇',
      detail: '按考场控时要求独立完成并复盘',
      isCompleted: false,
    };
    setSubTasks((prev) => [...prev, newTask]);
  };

  const handleRemoveSubTask = (id: string) => {
    setSubTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleUpdateSubTask = (
    id: string,
    field: keyof EnglishSubTask,
    value: string | boolean
  ) => {
    setSubTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t))
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

    const updated: EnglishWeekPlan = {
      ...weekPlan,
      title: title.trim() || weekPlan.title,
      goal: goal.trim() || weekPlan.goal,
      subTasks: subTasks.map((t) => ({
        ...t,
        title: t.title.trim() || '未命名任务',
        detail: t.detail?.trim() || undefined,
      })),
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
        className="w-full max-w-2xl rounded-2xl border border-teal-500/40 bg-slate-900 shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-5 py-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-teal-500/20 border border-teal-500/40 text-teal-300">
              <Edit3 className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white">
                  动态调整英语周安排 · 第{weekPlan.weekNumber}周 ({weekPlan.dateRange})
                </h3>
                {weekPlan.isCustomized && (
                  <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles className="h-2.5 w-2.5" />
                    已定制
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                支持拆分/增删每周独立打卡项、调整本周目标与方法指导，修改内容自动支持导出备份
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
          {/* Week Title & Goal */}
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                本周主题标题
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-teal-400 focus:outline-none"
                placeholder="例如：第1周：阅读一刷收尾与全题型全面启动"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                本周核心目标
              </label>
              <textarea
                rows={2}
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-teal-400 focus:outline-none leading-relaxed"
                placeholder="输入本周英语复习总体目标..."
              />
            </div>
          </div>

          {/* SubTasks List (Independent Check-off Items) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-slate-200 font-bold flex items-center gap-2">
                <span>本周独立打卡清单 ({subTasks.length} 项)</span>
                <span className="text-[11px] font-normal text-slate-400">
                  （多次任务拆分为单项，方便逐次打钩）
                </span>
              </label>
              <button
                type="button"
                onClick={handleAddSubTask}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 font-semibold transition-colors cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>新增打卡项</span>
              </button>
            </div>

            <div className="space-y-2 max-h-68 overflow-y-auto pr-1">
              {subTasks.map((task, idx) => {
                const catStyle = ENGLISH_CATEGORY_LABELS[task.category];
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
                        className="cursor-pointer text-slate-400 hover:text-teal-400"
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
                            e.target.value as EnglishSubTaskCategory
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

                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={task.title}
                        onChange={(e) =>
                          handleUpdateSubTask(task.id, 'title', e.target.value)
                        }
                        placeholder="打卡项名称（如：阅读 第1篇）"
                        className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-white focus:border-teal-400 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={task.detail || ''}
                        onChange={(e) =>
                          handleUpdateSubTask(task.id, 'detail', e.target.value)
                        }
                        placeholder="执行说明或补充要求（选填）"
                        className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-300 focus:border-teal-400 focus:outline-none"
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

          {/* Weekly Guidance */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              本周重点指导与策略说明（每行一条）
            </label>
            <textarea
              rows={3}
              value={guidanceText}
              onChange={(e) => setGuidanceText(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-200 focus:border-teal-400 focus:outline-none leading-relaxed"
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
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                <Save className="h-3.5 w-3.5" />
                <span>保存本周英语安排</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
