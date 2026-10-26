import React, { useState, useEffect } from 'react';
import { ScheduleNode, desktopNotificationManager } from '../utils/desktopNotification';
import { Clock, X, Bell, ArrowRight, Zap, Target } from 'lucide-react';

interface WindowsNotificationToastProps {
  onNavigateToTab?: (tab: 'dashboard' | 'timeline' | 'workstation') => void;
}

export const WindowsNotificationToast: React.FC<WindowsNotificationToastProps> = ({
  onNavigateToTab,
}) => {
  const [activeNode, setActiveNode] = useState<ScheduleNode | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    desktopNotificationManager.setInAppToastCallback((node: ScheduleNode) => {
      setActiveNode(node);
      setVisible(true);
    });
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      setVisible(false);
    }, 12000);
    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible || !activeNode) return null;

  return (
    <div
      role="alert"
      className="fixed bottom-5 right-5 z-50 w-96 max-w-[calc(100vw-2.5rem)] animate-in slide-in-from-bottom-5 fade-in duration-300 rounded-2xl border border-amber-500/50 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-xl ring-1 ring-white/10"
      style={{
        boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 25px rgba(245, 158, 11, 0.2)',
      }}
    >
      {/* Windows Toast Title Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-2.5">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Bell className="h-3.5 w-3.5 animate-bounce" />
          </div>
          <span className="text-xs font-bold text-slate-200 font-['Plus_Jakarta_Sans',sans-serif]">
            考研日程规划 · 节点到达提醒
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-slate-400">刚才</span>
          <button
            onClick={() => setVisible(false)}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors cursor-pointer"
            title="关闭通知"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Windows Toast Body */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-bold text-white leading-snug">
            {activeNode.title}
          </h4>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 shrink-0 font-semibold">
            {activeNode.subjectName}
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80">
          {activeNode.actionSummary}
        </p>

        {/* Windows Toast Actions */}
        <div className="flex items-center justify-between pt-1 gap-2">
          <button
            onClick={() => {
              setVisible(false);
              onNavigateToTab?.('workstation');
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <Clock className="h-3.5 w-3.5" />
            <span>进入番茄钟掐表</span>
          </button>

          <button
            onClick={() => setVisible(false)}
            className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors border border-slate-700 cursor-pointer"
          >
            知道了
          </button>
        </div>
      </div>
    </div>
  );
};
