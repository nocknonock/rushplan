import React, { useState, useEffect, useRef } from 'react';
import {
  Calendar,
  Target,
  Sparkles,
  Clock,
  HeartHandshake,
  Volume2,
  VolumeX,
  Flame,
  ChevronRight,
  Settings,
  Bell,
  BellOff,
  Zap,
  Check,
  X,
  Sliders,
} from 'lucide-react';
import { MOTIVATIONAL_QUOTES } from '../data/motivationalQuotes';
import { desktopNotificationManager } from '../utils/desktopNotification';

export type ActiveTabType = 'dashboard' | 'timeline' | 'workstation' | 'mindset';

interface HeaderProps {
  activeTab: ActiveTabType;
  onSelectTab: (tab: ActiveTabType) => void;
  daysToExam: number;
  daysToMathPastPapers?: number;
  soundMuted: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  daysToExam,
  soundMuted,
  onToggleSound,
}) => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isQuoteHovered, setIsQuoteHovered] = useState(false);

  // Settings dropdown popover state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Desktop notification settings state
  const [notifEnabled, setNotifEnabled] = useState<boolean>(() => desktopNotificationManager.isEnabled());
  const [notifPermission, setNotifPermission] = useState<NotificationPermission | 'unsupported'>(() =>
    desktopNotificationManager.getPermissionStatus()
  );
  const [testSentToast, setTestSentToast] = useState(false);

  // Automatically cycle motivational quotes every 1 minute (60,000ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
        setIsFading(false);
      }, 300);
    }, 60000); // 1 minute

    return () => clearInterval(timer);
  }, [quoteIndex]);

  // Click outside & Escape key listener for settings popover
  useEffect(() => {
    const handlePointerDown = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setIsSettingsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSettingsOpen(false);
      }
    };

    if (isSettingsOpen) {
      document.addEventListener('mousedown', handlePointerDown);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSettingsOpen]);

  const handleNextQuote = () => {
    setIsFading(true);
    setTimeout(() => {
      setQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
      setIsFading(false);
    }, 200);
  };

  const handleToggleNotification = async () => {
    if (notifEnabled) {
      desktopNotificationManager.setEnabled(false);
      setNotifEnabled(false);
    } else {
      if (notifPermission !== 'granted') {
        const perm = await desktopNotificationManager.requestPermission();
        setNotifPermission(perm);
        if (perm === 'granted') {
          desktopNotificationManager.setEnabled(true);
          setNotifEnabled(true);
        }
      } else {
        desktopNotificationManager.setEnabled(true);
        setNotifEnabled(true);
      }
    }
  };

  const handleTestNotification = () => {
    desktopNotificationManager.sendTestNotification();
    setTestSentToast(true);
    setTimeout(() => setTestSentToast(false), 3000);
  };

  const currentQuote = MOTIVATIONAL_QUOTES[quoteIndex];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-3 sm:gap-4 relative">
        {/* Left Wing: Brand Wordmark + Navigation (Spring-offsets left on quote hover) */}
        <div
          className={`flex items-center gap-2 sm:gap-4 shrink-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            isQuoteHovered
              ? '-translate-x-2 sm:-translate-x-4 lg:-translate-x-6 opacity-90 scale-[0.98]'
              : 'translate-x-0 opacity-100 scale-100'
          }`}
        >
          {/* Brand Wordmark */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-white font-['Plus_Jakarta_Sans',sans-serif]">
                考研日程规划
              </span>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                数二 · 408 · 英语 · 政治
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-1.5 shrink-0 ml-1 sm:ml-2">
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-slate-800 text-amber-400 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>总览</span>
            </button>

            <button
              onClick={() => onSelectTab('timeline')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'timeline'
                  ? 'bg-slate-800 text-amber-400 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>日程表</span>
            </button>

            <button
              onClick={() => onSelectTab('workstation')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'workstation'
                  ? 'bg-slate-800 text-amber-400 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Clock className="h-3.5 w-3.5" />
              <span>番茄钟</span>
            </button>

            <button
              onClick={() => onSelectTab('mindset')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'mindset'
                  ? 'bg-rose-950/60 text-rose-300 border border-rose-900/50 font-semibold'
                  : 'text-rose-400 hover:text-rose-300 hover:bg-rose-950/30'
              }`}
            >
              <HeartHandshake className="h-3.5 w-3.5" />
              <span>心理急救箱</span>
            </button>
          </nav>
        </div>

        {/* Center: Dynamic Expanding Motivational Quotes Bar (Q-弹灵动伸展) */}
        <div
          onMouseEnter={() => setIsQuoteHovered(true)}
          onMouseLeave={() => setIsQuoteHovered(false)}
          onClick={handleNextQuote}
          title="点击切换下一句 (每1分钟自动轮播)"
          className={`hidden md:flex items-center cursor-pointer select-none transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-20 ${
            isQuoteHovered
              ? 'flex-1 max-w-2xl lg:max-w-3xl scale-[1.03] px-5 py-2 rounded-full border border-amber-400/80 bg-slate-900/98 shadow-[0_0_30px_rgba(245,158,11,0.3)] ring-1 ring-amber-400/40'
              : 'flex-1 min-w-0 max-w-xs lg:max-w-sm px-3.5 py-1.5 rounded-full border border-amber-500/20 bg-gradient-to-r from-amber-950/25 via-slate-900/50 to-amber-950/25 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0 w-full justify-center">
            <Flame
              className={`h-4 w-4 text-amber-400 shrink-0 transition-transform duration-300 ${
                isQuoteHovered ? 'scale-125 rotate-12 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]' : 'animate-pulse'
              }`}
            />
            {currentQuote.tag && (
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 font-mono transition-colors duration-300 ${
                  isQuoteHovered
                    ? 'text-amber-200 bg-amber-500/30 border border-amber-400/50'
                    : 'text-amber-300/90 bg-amber-500/15 border border-amber-500/30'
                }`}
              >
                {currentQuote.tag}
              </span>
            )}
            <span
              className={`text-xs font-medium transition-all duration-300 ${
                isQuoteHovered
                  ? 'text-amber-100 whitespace-nowrap overflow-visible font-semibold drop-shadow-sm'
                  : 'text-slate-300 truncate'
              } ${isFading ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'}`}
            >
              {currentQuote.text}
            </span>

            {/* Subtle Hint Indicator on Hover */}
            {isQuoteHovered && (
              <ChevronRight className="h-3.5 w-3.5 text-amber-400/80 shrink-0 animate-pulse ml-0.5" />
            )}
          </div>
        </div>

        {/* Right Wing: Exam Countdown & ⚙ Settings Popover Button */}
        <div
          className={`flex items-center gap-2 sm:gap-3 shrink-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            isQuoteHovered
              ? 'translate-x-2 sm:translate-x-4 lg:translate-x-6 opacity-90 scale-[0.98]'
              : 'translate-x-0 opacity-100 scale-100'
          }`}
        >
          {/* Exam Countdown Badge */}
          <div className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs">
            <span className="text-slate-400">初试决战:</span>
            <span className="font-mono font-bold tabular-nums text-emerald-400">
              {daysToExam}天
            </span>
          </div>

          {/* ⚙ Settings Gear Button with Popover */}
          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className={`p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-center ${
                isSettingsOpen
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-lg shadow-amber-950/40'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
              title="系统偏好设置（音效与桌面到达通知）"
              aria-label="系统偏好设置"
              aria-expanded={isSettingsOpen}
              aria-haspopup="true"
            >
              <Settings
                className={`h-4 w-4 transition-transform duration-300 ${
                  isSettingsOpen ? 'rotate-90 text-amber-400' : 'text-slate-300 group-hover:text-white'
                }`}
              />
            </button>

            {/* Settings Dropdown Popover */}
            {isSettingsOpen && (
              <div
                role="dialog"
                aria-label="偏好设置"
                className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl bg-slate-900/98 border border-slate-800 p-4 sm:p-5 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150 space-y-4"
              >
                {/* Popover Header */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                      <Sliders className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">备战系统偏好设置</h3>
                      <p className="text-[11px] text-slate-400">音效管理与 Windows 桌面到达通知</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsSettingsOpen(false)}
                    className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="关闭设置"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Setting Item 1: Sound Effects Toggle */}
                <div className="rounded-xl bg-slate-950/80 p-3.5 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`p-2 rounded-lg ${
                          soundMuted
                            ? 'bg-slate-900 text-slate-500 border border-slate-800'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        }`}
                      >
                        {soundMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </div>
                      <div>
                        <div className="font-bold text-xs text-white flex items-center gap-1.5">
                          <span>战报与打卡音效</span>
                          <span
                            className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                              soundMuted
                                ? 'bg-slate-800 text-slate-400'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            }`}
                          >
                            {soundMuted ? '已静音' : '开启中'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                          任务勾选打卡、全天达成播放鼓掌与凯旋号角
                        </p>
                      </div>
                    </div>

                    {/* Toggle Switch */}
                    <button
                      type="button"
                      role="switch"
                      aria-checked={!soundMuted}
                      onClick={onToggleSound}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                        !soundMuted ? 'bg-amber-500' : 'bg-slate-800'
                      }`}
                      title={soundMuted ? '点击开启音效' : '点击静音（适合自习室/图书馆）'}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                          !soundMuted ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Setting Item 2: Windows Desktop Arrival Notification */}
                <div className="rounded-xl bg-slate-950/80 p-3.5 border border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`p-2 rounded-lg ${
                          notifEnabled && notifPermission === 'granted'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : notifPermission === 'denied'
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                            : 'bg-slate-900 text-slate-400 border border-slate-800'
                        }`}
                      >
                        {notifEnabled && notifPermission === 'granted' ? (
                          <Bell className="h-4 w-4" />
                        ) : (
                          <BellOff className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-xs text-white flex items-center gap-1.5 flex-wrap">
                          <span>Windows 桌面到达通知</span>
                          {notifPermission === 'granted' && notifEnabled ? (
                            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-1.5 py-0.2 rounded font-semibold">
                              ✓ 已生效
                            </span>
                          ) : notifPermission === 'denied' ? (
                            <span className="text-[10px] font-mono text-rose-400 bg-rose-950/60 border border-rose-800/60 px-1.5 py-0.2 rounded font-semibold">
                              ✗ 浏览器已拦截
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono text-amber-300 bg-amber-950/60 border border-amber-800/60 px-1.5 py-0.2 rounded font-semibold">
                              未开启
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                          按模考/非模考日时刻表（首页一键切换），到达各科节点时右下角自动弹窗
                        </p>
                      </div>
                    </div>

                    {/* Toggle Switch */}
                    <button
                      type="button"
                      role="switch"
                      aria-checked={notifEnabled && notifPermission === 'granted'}
                      onClick={handleToggleNotification}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                        notifEnabled && notifPermission === 'granted' ? 'bg-emerald-500' : 'bg-slate-800'
                      }`}
                      title={
                        notifEnabled ? '点击关闭桌面通知' : '点击开启 Windows 桌面到达通知'
                      }
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                          notifEnabled && notifPermission === 'granted' ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Test Button & Permission Request Hint */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-slate-500">
                      {notifPermission === 'denied'
                        ? '请在地址栏左侧网站设置中开启通知权限'
                        : '测试桌面右下角 Toast 弹窗与提示音'}
                    </span>

                    <button
                      type="button"
                      onClick={handleTestNotification}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-[11px] font-semibold transition-all cursor-pointer shrink-0"
                    >
                      {testSentToast ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          <span className="text-emerald-300">已发送测试！</span>
                        </>
                      ) : (
                        <>
                          <Zap className="h-3.5 w-3.5 text-amber-400" />
                          <span>测试弹窗</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Footer Note */}
                <div className="text-[10px] text-slate-500 text-center leading-relaxed">
                  基于东八区考研作息对齐，网页置于后台运行依然准时提醒。
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
