import React, { useState, useEffect } from 'react';
import {
  ScheduleAlertEvent,
  SnoozeStateInfo,
  desktopNotificationManager,
} from '../utils/desktopNotification';
import {
  Clock,
  Bell,
  AlarmClock,
  CheckCircle2,
  Volume2,
  X,
  ArrowRight,
  Monitor,
} from 'lucide-react';
import { soundManager } from '../utils/sound';

interface WindowsNotificationToastProps {
  onNavigateToTab?: (tab: 'dashboard' | 'timeline' | 'workstation') => void;
}

export const WindowsNotificationToast: React.FC<WindowsNotificationToastProps> = ({
  onNavigateToTab,
}) => {
  const [activeEvent, setActiveEvent] = useState<ScheduleAlertEvent | null>(null);
  const [snoozeInfo, setSnoozeInfo] = useState<SnoozeStateInfo | null>(null);
  const [snoozeRemainSec, setSnoozeRemainSec] = useState<number>(0);

  useEffect(() => {
    desktopNotificationManager.setInAppToastCallback((event: ScheduleAlertEvent) => {
      setActiveEvent(event);
    });
    desktopNotificationManager.setSnoozeStateCallback((info: SnoozeStateInfo | null) => {
      setSnoozeInfo(info);
      if (info) {
        setSnoozeRemainSec(Math.max(0, Math.ceil((info.fireAt - Date.now()) / 1000)));
      } else {
        setSnoozeRemainSec(0);
      }
    });

    return () => {
      desktopNotificationManager.stopTitleFlash();
    };
  }, []);

  // Update snooze countdown every second while a 5-minute snooze is armed
  useEffect(() => {
    if (!snoozeInfo) return;
    const tick = () => {
      const remain = Math.max(0, Math.ceil((snoozeInfo.fireAt - Date.now()) / 1000));
      setSnoozeRemainSec(remain);
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [snoozeInfo]);

  const handleSwitchNow = () => {
    desktopNotificationManager.dismissActiveNotification();
    setActiveEvent(null);
    onNavigateToTab?.('workstation');
  };

  const handleSnoozeFiveMinutes = () => {
    if (!activeEvent) return;
    const { node, snoozeCount } = activeEvent;
    setActiveEvent(null);
    desktopNotificationManager.snoozeNotification(node, 5, snoozeCount || 0);
  };

  const handleConfirmStay = () => {
    desktopNotificationManager.dismissActiveNotification();
    setActiveEvent(null);
  };

  const formatCountdown = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const scheduleModeLabel =
    desktopNotificationManager.getScheduleMode() === 'mock' ? '模考日作息' : '复盘日作息';

  return (
    <>
      {/* Centered Strong-Intercept Modal — NEVER auto-dismisses; requires explicit manual click */}
      {activeEvent && (
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="strong-alert-title"
          aria-describedby="strong-alert-desc"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
        >
          <div
            className={`relative w-full max-w-lg overflow-hidden rounded-2xl border-2 bg-slate-900 shadow-2xl ${
              activeEvent.isSnoozed
                ? 'border-rose-500/80 shadow-[0_24px_80px_rgba(0,0,0,0.85),0_0_40px_rgba(244,63,94,0.25)]'
                : 'border-amber-500/80 shadow-[0_24px_80px_rgba(0,0,0,0.85),0_0_40px_rgba(245,158,11,0.25)]'
            }`}
          >
            {/* Top Status Bar */}
            <div
              className={`flex items-center justify-between px-5 py-3 border-b ${
                activeEvent.isSnoozed
                  ? 'bg-rose-950/60 border-rose-500/30'
                  : 'bg-amber-950/50 border-amber-500/30'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-lg border ${
                    activeEvent.isSnoozed
                      ? 'bg-rose-500/20 text-rose-300 border-rose-400/40'
                      : 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                  }`}
                >
                  <Bell className="h-4 w-4 animate-bounce" />
                </div>
                <div>
                  <div className="text-xs font-extrabold tracking-wide text-white flex items-center gap-2">
                    <span>
                      {activeEvent.isSnoozed
                        ? `延后 5 分钟再次提醒（第 ${activeEvent.snoozeCount} 次）`
                        : '时间节点已到 · 需手动确认'}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">{scheduleModeLabel} · 不会自动关闭</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => soundManager.playChime()}
                className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
                title="重播提示音"
              >
                <Volume2 className="h-3.5 w-3.5 text-amber-400" />
                <span>重播提示音</span>
              </button>
            </div>

            {/* Modal Main Body */}
            <div className="p-5 sm:p-6 space-y-4">
              {/* Time & Subject Highlight */}
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`font-mono tabular-nums text-2xl sm:text-3xl font-black px-3 py-1 rounded-xl border ${
                    activeEvent.isSnoozed
                      ? 'bg-rose-500/15 text-rose-300 border-rose-500/40'
                      : 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                  }`}
                >
                  {activeEvent.node.timeStr}
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">
                  {activeEvent.node.subjectName}
                </span>
              </div>

              {/* Node Title */}
              <h3
                id="strong-alert-title"
                className="text-lg sm:text-xl font-extrabold text-white leading-snug"
              >
                {activeEvent.node.title}
              </h3>

              {/* Execution Action Box */}
              <div
                id="strong-alert-desc"
                className="rounded-xl border border-slate-800 bg-slate-950/90 p-4 text-sm text-slate-200 leading-relaxed"
              >
                {activeEvent.node.actionSummary}
              </div>

              {/* Tab Flash + Native Persistent Notification Status Notice */}
              <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-slate-950/50 border border-slate-800/80 rounded-lg px-3 py-2">
                <Monitor className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                <span>
                  浏览器标签页标题正在闪烁，系统常驻通知已激活——点击下方按钮确认后将同步停止。
                </span>
              </div>

              {/* Explicit Action Buttons */}
              <div className="pt-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleSwitchNow}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-extrabold transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  <Clock className="h-4 w-4 shrink-0" />
                  <span>立即切换 / 进入番茄钟</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </button>

                <button
                  type="button"
                  onClick={handleSnoozeFiveMinutes}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-200 border border-amber-500/40 text-sm font-bold transition-all cursor-pointer"
                >
                  <AlarmClock className="h-4 w-4 shrink-0 text-amber-400" />
                  <span>再延后 5 分钟</span>
                </button>
              </div>

              {/* Tertiary Manual Acknowledge Button (for non-Pomodoro slots like rest/departure) */}
              <div className="flex justify-center pt-1">
                <button
                  type="button"
                  onClick={handleConfirmStay}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer py-1 px-2"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>已在执行该节点，留在当前页面并关闭提醒</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compact Bottom-Right Snooze Countdown Chip (visible only while a 5-min snooze is active) */}
      {!activeEvent && snoozeInfo && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-xl border border-amber-500/40 bg-slate-900/95 px-3.5 py-2.5 shadow-xl backdrop-blur-md"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30 shrink-0">
            <AlarmClock className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
              <span>已延后提醒</span>
              <span className="font-mono tabular-nums text-white bg-amber-500/20 px-1.5 py-0.5 rounded">
                {formatCountdown(snoozeRemainSec)}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 truncate max-w-[180px]">
              {snoozeInfo.node.subjectName}
            </div>
          </div>
          <div className="flex items-center gap-1.5 pl-1 border-l border-slate-800">
            <button
              type="button"
              onClick={() => desktopNotificationManager.fireSnoozedTarget()}
              className="px-2 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[11px] font-semibold transition-colors cursor-pointer"
              title="立即弹出提醒"
            >
              立即提醒
            </button>
            <button
              type="button"
              onClick={() => desktopNotificationManager.cancelSnooze()}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="取消延后提醒"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
