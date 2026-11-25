import React, { useState, useEffect } from 'react';
import {
  ScheduleSlot,
  desktopNotificationManager,
  parseTimeRangeToMinutes,
  slotToScheduleNode,
} from '../utils/desktopNotification';
import {
  Clock,
  X,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Save,
  Bell,
  BellOff,
  Zap,
  Sparkles,
} from 'lucide-react';

interface ScheduleEditModalProps {
  isOpen: boolean;
  initialMode: 'mock' | 'non_mock';
  onClose: () => void;
  onSaved?: (mode: 'mock' | 'non_mock') => void;
}

const SUBJECT_CATEGORIES: Array<{
  value: ScheduleSlot['subjectCategory'];
  label: string;
}> = [
  { value: 'math', label: '📐 数学二' },
  { value: 'cs', label: '💻 408专业课' },
  { value: 'english', label: '📗 考研英语' },
  { value: 'politics', label: '📕 考研政治' },
  { value: 'rest', label: '☕ 作息/休整' },
];

const TITLE_TONES: Array<{
  value: ScheduleSlot['titleTone'] | '';
  label: string;
  dotClass: string;
}> = [
  { value: '', label: '默认白', dotClass: 'bg-slate-200' },
  { value: 'red', label: '高优红', dotClass: 'bg-rose-400' },
  { value: 'orange', label: '复盘橙', dotClass: 'bg-orange-400' },
  { value: 'cyan', label: '408青', dotClass: 'bg-cyan-400' },
  { value: 'green', label: '降频/休整绿', dotClass: 'bg-emerald-400' },
];

export const ScheduleEditModal: React.FC<ScheduleEditModalProps> = ({
  isOpen,
  initialMode,
  onClose,
  onSaved,
}) => {
  const [editMode, setEditMode] = useState<'mock' | 'non_mock'>(initialMode);
  const [draftSlots, setDraftSlots] = useState<ScheduleSlot[]>([]);
  const [confirmReset, setConfirmReset] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setEditMode(initialMode);
      const current = desktopNotificationManager.getScheduleSlots(initialMode);
      setDraftSlots(current.map((s) => ({ ...s })));
      setConfirmReset(false);
    }
  }, [isOpen, initialMode]);

  const handleSwitchModeTab = (nextMode: 'mock' | 'non_mock') => {
    setEditMode(nextMode);
    const current = desktopNotificationManager.getScheduleSlots(nextMode);
    setDraftSlots(current.map((s) => ({ ...s })));
    setConfirmReset(false);
  };

  if (!isOpen) return null;

  const handleUpdateField = <K extends keyof ScheduleSlot>(
    index: number,
    field: K,
    value: ScheduleSlot[K]
  ) => {
    setDraftSlots((prev) => {
      const next = [...prev];
      const updated = { ...next[index], [field]: value };
      if (field === 'timeRange' && typeof value === 'string') {
        const parsed = parseTimeRangeToMinutes(value, updated.startMinutes, updated.endMinutes);
        updated.startMinutes = parsed.startMinutes;
        updated.endMinutes = parsed.endMinutes;
      }
      next[index] = updated;
      return next;
    });
  };

  const handleMoveSlot = (index: number, direction: -1 | 1) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= draftSlots.length) return;
    setDraftSlots((prev) => {
      const next = [...prev];
      const temp = next[index];
      next[index] = next[targetIdx];
      next[targetIdx] = temp;
      return next;
    });
  };

  const handleDeleteSlot = (index: number) => {
    if (draftSlots.length <= 1) return;
    setDraftSlots((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleAddSlot = (afterIndex?: number) => {
    const newSlot: ScheduleSlot = {
      id: `${editMode}-slot-${Date.now()}`,
      timeRange: '20:00 – 21:00',
      subjectTitle: '新增自定义学习时段 (1h)',
      subjectCategory: 'math',
      titleTone: 'cyan',
      isKeyChange: false,
      badge: '自定义节点',
      content: '在此填写该时间段的具体执行动作、改造逻辑与刚性要求。',
      startMinutes: 20 * 60,
      endMinutes: 21 * 60,
      reminderEnabled: true,
    };

    setDraftSlots((prev) => {
      if (typeof afterIndex === 'number') {
        const next = [...prev];
        next.splice(afterIndex + 1, 0, newSlot);
        return next;
      }
      return [...prev, newSlot];
    });
  };

  const handleSortByTime = () => {
    setDraftSlots((prev) =>
      [...prev].sort((a, b) => {
        const parsedA = parseTimeRangeToMinutes(a.timeRange, a.startMinutes, a.endMinutes);
        const parsedB = parseTimeRangeToMinutes(b.timeRange, b.startMinutes, b.endMinutes);
        return parsedA.startMinutes - parsedB.startMinutes;
      })
    );
  };

  const handleSave = () => {
    desktopNotificationManager.saveScheduleSlots(editMode, draftSlots);
    desktopNotificationManager.setScheduleMode(editMode);
    onSaved?.(editMode);
    onClose();
  };

  const handleConfirmResetDefault = () => {
    desktopNotificationManager.resetScheduleSlots(editMode);
    const fresh = desktopNotificationManager.getScheduleSlots(editMode);
    setDraftSlots(fresh.map((s) => ({ ...s })));
    setConfirmReset(false);
  };

  const handleTestSingleSlotAlert = (slot: ScheduleSlot) => {
    const node = slotToScheduleNode(slot);
    desktopNotificationManager.triggerNotification(node, { force: true });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-3 sm:p-5 overflow-y-auto"
    >
      <div className="relative w-full max-w-5xl rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-slate-800 bg-slate-950/70 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-extrabold text-white">
                  自定义每日时刻表 & 节点提醒联动
                </h2>
                <span className="text-[11px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-md font-semibold">
                  本地持久保存 · 刷新不丢失
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                修改任意「时间段」后，系统将自动提取起始时间（如 08:30、14:00）作为居中强拦截弹窗与常驻通知的触发点。
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Switch between Mock and Review schedule to edit */}
            <div className="inline-flex items-center p-0.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => handleSwitchModeTab('mock')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  editMode === 'mock'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                📝 模考日 ({editMode === 'mock' ? draftSlots.length : desktopNotificationManager.getScheduleSlots('mock').length})
              </button>
              <button
                type="button"
                onClick={() => handleSwitchModeTab('non_mock')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  editMode === 'non_mock'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                📖 复盘日 ({editMode === 'non_mock' ? draftSlots.length : desktopNotificationManager.getScheduleSlots('non_mock').length})
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="关闭"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => handleAddSlot()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 font-bold transition-colors cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>新增时间段节点</span>
            </button>

            <button
              type="button"
              onClick={handleSortByTime}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold transition-colors cursor-pointer"
              title="根据起始时间自动从早到晚排序"
            >
              <Clock className="h-3.5 w-3.5 text-cyan-400" />
              <span>按起始时间自动排序</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {!confirmReset ? (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-rose-950/60 text-slate-300 hover:text-rose-300 border border-slate-700 hover:border-rose-800/60 font-medium transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>恢复当前模式默认时刻表</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5 bg-rose-950/50 border border-rose-800/70 px-2.5 py-1 rounded-lg">
                <span className="text-rose-200 text-[11px] font-semibold">
                  确定恢复{editMode === 'mock' ? '模考日' : '复盘日'}默认配置？
                </span>
                <button
                  type="button"
                  onClick={handleConfirmResetDefault}
                  className="px-2 py-0.5 rounded bg-rose-500 hover:bg-rose-400 text-white text-[11px] font-bold cursor-pointer"
                >
                  确认恢复
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] cursor-pointer"
                >
                  取消
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Scrollable Slot Editor List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {draftSlots.map((slot, index) => {
            const parsedTime = parseTimeRangeToMinutes(
              slot.timeRange,
              slot.startMinutes,
              slot.endMinutes
            );
            const reminderActive = slot.reminderEnabled !== false;

            return (
              <div
                key={slot.id}
                className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 sm:p-4 space-y-3 transition-all hover:border-slate-700"
              >
                {/* Top row: Index, TimeRange, SubjectTitle, Category, Tone, Reminder toggle & Row actions */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-md bg-slate-800 text-slate-300 font-mono text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-800/50 px-2 py-0.5 rounded">
                      到点触发: {parsedTime.normalizedStartStr}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    {/* Reminder toggle for this node */}
                    <button
                      type="button"
                      onClick={() => handleUpdateField(index, 'reminderEnabled', !reminderActive)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer ${
                        reminderActive
                          ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                          : 'bg-slate-900 text-slate-500 border-slate-800'
                      }`}
                      title={reminderActive ? '该节点已开启到点强提醒' : '该节点已静音，不弹到点提醒'}
                    >
                      {reminderActive ? (
                        <>
                          <Bell className="h-3 w-3" />
                          <span>到点提醒: 开</span>
                        </>
                      ) : (
                        <>
                          <BellOff className="h-3 w-3" />
                          <span>到点提醒: 关</span>
                        </>
                      )}
                    </button>

                    {/* Key change highlight toggle */}
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateField(index, 'isKeyChange', !Boolean(slot.isKeyChange))
                      }
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer ${
                        slot.isKeyChange
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                      }`}
                      title="标记为「关键改动：」高亮前缀"
                    >
                      <Sparkles className="h-3 w-3" />
                      <span>关键改动高亮</span>
                    </button>

                    {/* Preview alert for this specific row */}
                    <button
                      type="button"
                      onClick={() => handleTestSingleSlotAlert(slot)}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-[11px] font-medium transition-colors cursor-pointer"
                      title="立即预览该时间节点的强拦截提醒弹窗"
                    >
                      <Zap className="h-3 w-3" />
                      <span>预览弹窗</span>
                    </button>

                    {/* Move Up / Down / Insert / Delete */}
                    <div className="flex items-center gap-1 pl-1 border-l border-slate-800">
                      <button
                        type="button"
                        onClick={() => handleMoveSlot(index, -1)}
                        disabled={index === 0}
                        className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                        title="上移"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveSlot(index, 1)}
                        disabled={index === draftSlots.length - 1}
                        className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                        title="下移"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddSlot(index)}
                        className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-400 hover:text-amber-300 cursor-pointer"
                        title="在此行下方插入新时段"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteSlot(index)}
                        disabled={draftSlots.length <= 1}
                        className="p-1 rounded-lg bg-slate-900 hover:bg-rose-950/70 text-slate-400 hover:text-rose-300 disabled:opacity-30 cursor-pointer"
                        title="删除此时段"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 text-xs">
                  {/* Time Range */}
                  <div className="sm:col-span-3">
                    <label className="block text-[11px] text-slate-400 mb-1 font-medium">
                      时间段 (如 08:30 – 11:30)
                    </label>
                    <input
                      type="text"
                      value={slot.timeRange}
                      onChange={(e) => handleUpdateField(index, 'timeRange', e.target.value)}
                      placeholder="08:30 – 11:30"
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 font-mono text-xs text-amber-300 font-bold focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  {/* Subject Title */}
                  <div className="sm:col-span-4">
                    <label className="block text-[11px] text-slate-400 mb-1 font-medium">
                      科目安排与执行动作
                    </label>
                    <input
                      type="text"
                      value={slot.subjectTitle}
                      onChange={(e) => handleUpdateField(index, 'subjectTitle', e.target.value)}
                      placeholder="例如：数学二全真模考 (3h)"
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-white font-semibold focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  {/* Short Badge */}
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-slate-400 mb-1 font-medium">
                      短标签 (弹窗简称)
                    </label>
                    <input
                      type="text"
                      value={slot.badge}
                      onChange={(e) => handleUpdateField(index, 'badge', e.target.value)}
                      placeholder="例如：全真模考"
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  {/* Subject Category */}
                  <div className="sm:col-span-3 grid grid-cols-2 gap-1.5">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1 font-medium">
                        所属科目
                      </label>
                      <select
                        value={slot.subjectCategory}
                        onChange={(e) =>
                          handleUpdateField(
                            index,
                            'subjectCategory',
                            e.target.value as ScheduleSlot['subjectCategory']
                          )
                        }
                        className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2 py-1.5 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
                      >
                        {SUBJECT_CATEGORIES.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1 font-medium">
                        标题高亮色
                      </label>
                      <select
                        value={slot.titleTone || ''}
                        onChange={(e) =>
                          handleUpdateField(
                            index,
                            'titleTone',
                            (e.target.value || undefined) as ScheduleSlot['titleTone']
                          )
                        }
                        className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2 py-1.5 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
                      >
                        {TITLE_TONES.map((tone) => (
                          <option key={tone.label} value={tone.value}>
                            {tone.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Content / Rigid Requirement */}
                  <div className="sm:col-span-12">
                    <label className="block text-[11px] text-slate-400 mb-1 font-medium">
                      改造逻辑与刚性要求（到点弹窗正文内容）
                    </label>
                    <textarea
                      rows={2}
                      value={slot.content}
                      onChange={(e) => handleUpdateField(index, 'content', e.target.value)}
                      placeholder="填写该时段的具体执行要求与纪律..."
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-200 leading-relaxed focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3.5 border-t border-slate-800 bg-slate-950/90 rounded-b-2xl">
          <div className="text-xs text-slate-400">
            当前正在编辑：
            <strong className="text-amber-300 ml-1">
              {editMode === 'mock' ? '📝 模考日时刻表' : '📖 复盘日（非模考）时刻表'}
            </strong>
            （共 {draftSlots.length} 个时段，已开启 {draftSlots.filter((s) => s.reminderEnabled !== false).length} 个到点强提醒）
          </div>

          <div className="flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              取消
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <Save className="h-4 w-4" />
              <span>保存并同步到点提醒</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
