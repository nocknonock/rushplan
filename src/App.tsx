/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DayPlan } from './types/kaoyan';
import { INITIAL_DAY_PLANS } from './data/scheduleData';
import { Header } from './components/Header';
import { DashboardOverview } from './components/DashboardOverview';
import { DailyTimeline } from './components/DailyTimeline';
import { SubjectArmory } from './components/SubjectArmory';
import { DailyWorkstation } from './components/DailyWorkstation';
import { MindsetEmergencyBunker } from './components/MindsetEmergencyBunker';
import { ShieldCheck, RotateCcw, Download, Upload, Sparkles, Check, Info } from 'lucide-react';

const STORAGE_KEY = 'kaoyan_battle_station_plans_v1';
const EXAM_TARGET_DATE = new Date('2026-12-26T08:30:00');
const MATH_PAPERS_DATE = new Date('2026-10-23T08:30:00');
const CS_PAPERS_DATE = new Date('2026-11-11T14:00:00');
const XIAO8_DATE = new Date('2026-11-10T00:00:00');

// Smart merge function: preserves user checkmarks and notes, but loads updated code content
function mergeSavedWithInitial(savedList: DayPlan[], initialList: DayPlan[]): DayPlan[] {
  const savedMap = new Map<string, DayPlan>();
  savedList.forEach((plan) => savedMap.set(plan.date, plan));

  return initialList.map((initPlan) => {
    const savedPlan = savedMap.get(initPlan.date);
    if (!savedPlan) return initPlan;

    return {
      ...initPlan,
      math2Task: initPlan.math2Task
        ? {
            ...initPlan.math2Task,
            isCompleted: savedPlan.math2Task?.isCompleted ?? false,
            notes: savedPlan.math2Task?.notes ?? initPlan.math2Task.notes,
          }
        : undefined,
      csTask: initPlan.csTask
        ? {
            ...initPlan.csTask,
            isCompleted: savedPlan.csTask?.isCompleted ?? false,
            notes: savedPlan.csTask?.notes ?? initPlan.csTask.notes,
          }
        : undefined,
    };
  });
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'timeline' | 'armory' | 'workstation' | 'mindset'>('dashboard');
  const [plans, setPlans] = useState<DayPlan[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return mergeSavedWithInitial(parsed, INITIAL_DAY_PLANS);
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_DAY_PLANS;
  });

  const [selectedDate, setSelectedDate] = useState<string>('2026-10-08');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
    } catch {
      // storage error
    }
  }, [plans]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Toggle Math task
  const handleToggleMathComplete = (taskId: string) => {
    setPlans((prev) =>
      prev.map((plan) => {
        if (plan.math2Task?.id === taskId) {
          const nextVal = !plan.math2Task.isCompleted;
          if (nextVal) showToast(`已攻克：${plan.math2Task.title.slice(0, 16)}...`);
          return {
            ...plan,
            math2Task: {
              ...plan.math2Task,
              isCompleted: nextVal,
            },
          };
        }
        return plan;
      })
    );
  };

  // Toggle CS task
  const handleToggleCsComplete = (taskId: string) => {
    setPlans((prev) =>
      prev.map((plan) => {
        if (plan.csTask?.id === taskId) {
          const nextVal = !plan.csTask.isCompleted;
          if (nextVal) showToast(`已攻克：${plan.csTask.title.slice(0, 16)}...`);
          return {
            ...plan,
            csTask: {
              ...plan.csTask,
              isCompleted: nextVal,
            },
          };
        }
        return plan;
      })
    );
  };

  // Save notes for date
  const handleSaveDayNotes = (date: string, notes: string) => {
    setPlans((prev) =>
      prev.map((plan) => {
        if (plan.date === date && plan.math2Task) {
          return {
            ...plan,
            math2Task: {
              ...plan.math2Task,
              notes,
            },
          };
        }
        return plan;
      })
    );
    showToast('战地复盘笔记已保存');
  };

  // Reset all progress
  const handleResetPlans = () => {
    if (window.confirm('确定要将所有打卡状态与日程重置为初始默认值吗？')) {
      setPlans(INITIAL_DAY_PLANS);
      localStorage.removeItem(STORAGE_KEY);
      showToast('所有进度已重置为初始战时作战方案');
    }
  };

  // Export progress JSON
  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(plans, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `kaoyan_battle_plan_export_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('作战进度数据已成功导出为 JSON 文件');
  };

  // Import progress JSON
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          const merged = mergeSavedWithInitial(parsed, INITIAL_DAY_PLANS);
          setPlans(merged);
          showToast('成功导入并合并备份进度！');
        } else {
          alert('导入失败：文件格式不符合预期');
        }
      } catch {
        alert('导入失败：无法解析此 JSON 文件');
      }
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  const [showStorageInfo, setShowStorageInfo] = useState(false);

  // Countdown calculations (anchored around Oct 7 / current time)
  const now = new Date();
  const getDiffDays = (target: Date) => {
    const diff = target.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const daysToExam = getDiffDays(EXAM_TARGET_DATE);
  const daysToMathPastPapers = getDiffDays(MATH_PAPERS_DATE);
  const daysToCsPastPapers = getDiffDays(CS_PAPERS_DATE);
  const daysToXiao8 = getDiffDays(XIAO8_DATE);

  const currentPlan = plans.find((p) => p.date === selectedDate) || plans[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Noto_Sans_SC','Plus_Jakarta_Sans',sans-serif]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-950/90 px-4 py-2.5 text-xs font-semibold text-emerald-200 shadow-xl backdrop-blur-md transition-all">
          <Check className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Contract (3 Zones) */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        daysToExam={daysToExam}
        daysToMathPastPapers={daysToMathPastPapers}
      />

      {/* Main Viewport */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <DashboardOverview
            currentDayPlan={currentPlan}
            allPlans={plans}
            onSelectDay={setSelectedDate}
            onToggleMathComplete={handleToggleMathComplete}
            onToggleCsComplete={handleToggleCsComplete}
            onSaveDayNotes={handleSaveDayNotes}
            onNavigateToTab={setActiveTab}
            daysToExam={daysToExam}
            daysToMathPastPapers={daysToMathPastPapers}
            daysToCsPastPapers={daysToCsPastPapers}
            daysToXiao8={daysToXiao8}
          />
        )}

        {activeTab === 'timeline' && (
          <DailyTimeline
            plans={plans}
            selectedDate={selectedDate}
            onSelectDay={setSelectedDate}
            onToggleMathComplete={handleToggleMathComplete}
            onToggleCsComplete={handleToggleCsComplete}
          />
        )}

        {activeTab === 'armory' && <SubjectArmory />}

        {activeTab === 'workstation' && <DailyWorkstation />}

        {activeTab === 'mindset' && <MindsetEmergencyBunker />}
      </main>

      {/* Footer (Quiet, respectful of anti-slop rules) */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400 flex-wrap">
            <span>考研决战指挥部 · 战时极限冲刺系统</span>
            <span aria-hidden="true">·</span>
            <span>数二 15天极限压缩</span>
            <span aria-hidden="true">·</span>
            <span>408 计组/OS/计网/DS</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setShowStorageInfo(true)}
              className="text-amber-400/90 hover:text-amber-300 underline underline-offset-2 flex items-center gap-1"
            >
              <Info className="h-3 w-3" />
              <span>数据存储与多端同步说明</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportFile}
              accept=".json"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors"
              title="导入之前导出的 JSON 进度备份"
            >
              <Upload className="h-3.5 w-3.5" />
              <span>导入进度</span>
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={handleExportData}
              className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors"
              title="导出当前进度备份"
            >
              <Download className="h-3.5 w-3.5" />
              <span>导出备份</span>
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={handleResetPlans}
              className="flex items-center gap-1.5 text-slate-400 hover:text-rose-400 transition-colors"
              title="重置打卡状态"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>重置打卡</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Storage & Deployment Info Modal */}
      {showStorageInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Info className="h-4 w-4 text-amber-400" />
                <span>数据存储与 GitHub 部署升级机制</span>
              </h3>
              <button
                onClick={() => setShowStorageInfo(false)}
                className="text-slate-400 hover:text-slate-200 text-xs"
              >
                关闭
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <div className="rounded-lg bg-slate-950 p-3 border border-slate-800/80 space-y-1">
                <span className="font-bold text-amber-400">1. 数据存放在哪里？</span>
                <p>
                  所有打卡进度、任务勾选和每日战地笔记，都保存在您当前浏览器的 <strong className="text-white">localStorage（本地持久化缓存）</strong> 中。无需登录，完全离线可用，私密安全。
                </p>
              </div>

              <div className="rounded-lg bg-slate-950 p-3 border border-slate-800/80 space-y-1">
                <span className="font-bold text-cyan-400">2. 部署到 GitHub 后，再在 AI Studio 改代码推新版会丢进度吗？</span>
                <p>
                  <strong className="text-white">完全不会丢失！</strong> 浏览器的 localStorage 是绑定在访问域名上的。当你在 GitHub 部署的网站（如 username.github.io）上使用时，即使你在 AI Studio 更改了前端代码并推送了新的 git commit：
                </p>
                <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-400">
                  <li>系统内置了 <span className="text-emerald-300 font-medium">智能合并算法 (Smart Merge)</span>：</li>
                  <li>你的勾选完成状态 (<code className="text-slate-300">isCompleted</code>) 和个人笔记会被 100% 完整保留；</li>
                  <li>新版本代码里更新的知识点描述、大题真题号或新功能，会自动合入并生效！</li>
                </ul>
              </div>

              <div className="rounded-lg bg-slate-950 p-3 border border-slate-800/80 space-y-1">
                <span className="font-bold text-emerald-400">3. 跨设备或换浏览器（例如手机和电脑间同步）</span>
                <p>
                  点击底部的 <strong className="text-white">“导出备份”</strong> 会下载一个微型 JSON 文件；在手机或另一台电脑上打开网站，点击 <strong className="text-white">“导入进度”</strong>，1秒钟即可无缝迁移所有完成记录！
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowStorageInfo(false)}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
              >
                我知道了，继续备战！
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
