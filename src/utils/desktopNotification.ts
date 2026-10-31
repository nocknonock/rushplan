import { soundManager } from './sound';
import { getChinaDateInfo } from './chinaDate';

export interface ScheduleNode {
  timeStr: string; // "08:00", "08:30", etc.
  hour: number;
  minute: number;
  title: string;
  subjectName: string;
  actionSummary: string;
}

export const MOCK_DAY_TIME_NODES: ScheduleNode[] = [
  {
    timeStr: '08:00',
    hour: 8,
    minute: 0,
    title: '【08:00 晨读开启】政治 / 英语早读 (0.5h)',
    subjectName: '早读唤醒',
    actionSummary: '唤醒大脑：快速过一遍英语高频词或政治核心考点提要，避免进数学考场前大脑发懵。',
  },
  {
    timeStr: '08:30',
    hour: 8,
    minute: 30,
    title: '【08:30 数学真题核心块】全真掐表模考 / 深度订正 (3h)',
    subjectName: '数学二核心块',
    actionSummary: '全真掐表 08:30—11:30！严格闭卷模拟考场，或白纸重做昨天错题！',
  },
  {
    timeStr: '11:30',
    hour: 11,
    minute: 30,
    title: '【11:30 即时复盘】公式定理回忆与薄弱点补漏 (1h)',
    subjectName: '即时复盘',
    actionSummary: '趁热打铁，对上午卡壳或遗漏的定理核心公式迅速回忆回填！',
  },
  {
    timeStr: '12:30',
    hour: 12,
    minute: 30,
    title: '【12:30 考研英语】阅读精读与模板仿写 (1h)',
    subjectName: '考研英语',
    actionSummary: '保持阅读手感，限时做1篇精读复盘，加入大小作文与新题型翻译。',
  },
  {
    timeStr: '13:30',
    hour: 13,
    minute: 30,
    title: '【13:30 408主力块】计算机学科专业课攻坚 (4h)',
    subjectName: '408主力块',
    actionSummary: '下午集中爆破！抓紧进入 408 真题套卷演练与计组/OS大题专项突破！',
  },
  {
    timeStr: '17:30',
    hour: 17,
    minute: 30,
    title: '【17:30 晚餐与散步】离开书桌，大脑缓存清零 (1h)',
    subjectName: '晚餐放空',
    actionSummary: '离开书桌散步透气或闭目养神 10 分钟，为晚上硬核追赶回血！',
  },
  {
    timeStr: '18:30',
    hour: 18,
    minute: 30,
    title: '【18:30 408落后追赶】专业课薄弱模块专项突破 (3h)',
    subjectName: '408落后追赶',
    actionSummary: '专门攻克 408 落后模块（计组流水线/数据通路、OS PV大题、计网协议分析）。',
  },
  {
    timeStr: '21:30',
    hour: 21,
    minute: 30,
    title: '【21:30 数学复盘块】只做复盘，不开新卷！(2h)',
    subjectName: '数学白纸复盘',
    actionSummary: '白纸重做当天上午套卷卡壳题，整理条件反射笔记；复盘完时间让给408！',
  },
  {
    timeStr: '23:20',
    hour: 23,
    minute: 20,
    title: '【23:20 政治睡前背诵】主观题框架黄金速记 (40m)',
    subjectName: '政治背诵',
    actionSummary: '政治主观题逻辑框架背诵（肖四重点发力狂背），背完安心入睡！',
  },
];

export const NON_MOCK_DAY_TIME_NODES: ScheduleNode[] = [
  {
    timeStr: '08:00',
    hour: 8,
    minute: 0,
    title: '【08:00 晨读开启】政治 / 英语早读 (30m)',
    subjectName: '早读唤醒',
    actionSummary: '政治手册回顾 15 分钟 + 英语词汇 15 分钟。',
  },
  {
    timeStr: '08:30',
    hour: 8,
    minute: 30,
    title: '【08:30 数学专项】错题重做与薄弱补漏 (3h)',
    subjectName: '数学专项训练',
    actionSummary: '专项训练、错题重做、薄弱知识点补漏，攻克计算死穴。',
  },
  {
    timeStr: '11:30',
    hour: 11,
    minute: 30,
    title: '【11:30 数学复盘】错误总结与公式回忆 (30m)',
    subjectName: '数学复盘',
    actionSummary: '总结上午错误，回忆关键公式与解题方法，深化反射。',
  },
  {
    timeStr: '12:00',
    hour: 12,
    minute: 0,
    title: '【12:00 午餐休息】离开书桌正常充能 (30m)',
    subjectName: '午餐与休息',
    actionSummary: '离开书桌，正常休息放松，保持体能精力充沛。',
  },
  {
    timeStr: '12:30',
    hour: 12,
    minute: 30,
    title: '【12:30 考研英语】阅读/作文/新题型训练 (1h)',
    subjectName: '考研英语',
    actionSummary: '每日阅读或作文、新题型、翻译训练，手感保温。',
  },
  {
    timeStr: '13:30',
    hour: 13,
    minute: 30,
    title: '【13:30 408攻坚】真题复习与重点突破 (3.5h)',
    subjectName: '408重点突破',
    actionSummary: '真题、知识点复习、重点章节突破（13:30—17:00）。',
  },
  {
    timeStr: '17:00',
    hour: 17,
    minute: 0,
    title: '【17:00 政治刷题】小程序或选择题复盘 (30m)',
    subjectName: '政治刷题',
    actionSummary: '小程序 15～20 题，或复盘一组选择题，查漏补缺。',
  },
  {
    timeStr: '17:30',
    hour: 17,
    minute: 30,
    title: '【17:30 晚饭与休息】清零缓存彻底放松 (1h)',
    subjectName: '晚饭与休息',
    actionSummary: '离开书桌，散步或放松身心，准备晚间高能冲刺。',
  },
  {
    timeStr: '18:30',
    hour: 18,
    minute: 30,
    title: '【18:30 408主力二段】继续主力任务 (2h)',
    subjectName: '408主力任务',
    actionSummary: '继续 408 主力任务，保质保量完成当天计划。',
  },
  {
    timeStr: '20:30',
    hour: 20,
    minute: 30,
    title: '【20:30 数学晚练】关键问题处理与错题回顾 (1.5h)',
    subjectName: '数学晚间处理',
    actionSummary: '优先处理当天未完成的关键问题；已完成则全面回顾错题。',
  },
  {
    timeStr: '22:00',
    hour: 22,
    minute: 0,
    title: '【22:00 政治攻坚】手册/肖八复盘/肖四背诵 (1.5h)',
    subjectName: '政治阶段攻坚',
    actionSummary: '按阶段完成手册、肖八选择题复盘或肖四背诵，充实封箱。',
  },
];

// Default backward compatibility
export const TIME_NODES: ScheduleNode[] = MOCK_DAY_TIME_NODES;

const NOTIF_STORAGE_KEY = 'kaoyan_windows_notif_enabled';
const SCHEDULE_MODE_STORAGE_KEY = 'kaoyan_schedule_mode';

class DesktopNotificationManager {
  private enabled: boolean = true;
  private scheduleMode: 'mock' | 'non_mock' = 'mock';
  private notifiedToday: Set<string> = new Set();
  private lastDateStr: string = '';
  private onInAppToastCallback: ((node: ScheduleNode) => void) | null = null;

  constructor() {
    try {
      const saved = localStorage.getItem(NOTIF_STORAGE_KEY);
      if (saved !== null) {
        this.enabled = saved === 'true';
      }
      const savedMode = localStorage.getItem(SCHEDULE_MODE_STORAGE_KEY);
      if (savedMode === 'mock' || savedMode === 'non_mock') {
        this.scheduleMode = savedMode;
      }
    } catch {
      // ignore
    }
  }

  public getScheduleMode(): 'mock' | 'non_mock' {
    return this.scheduleMode;
  }

  public setScheduleMode(mode: 'mock' | 'non_mock') {
    this.scheduleMode = mode;
    try {
      localStorage.setItem(SCHEDULE_MODE_STORAGE_KEY, mode);
    } catch {
      // ignore
    }
    // Re-evaluate schedule immediately upon switching
    this.checkAndTriggerSchedule();
  }

  public getActiveTimeNodes(): ScheduleNode[] {
    return this.scheduleMode === 'mock' ? MOCK_DAY_TIME_NODES : NON_MOCK_DAY_TIME_NODES;
  }

  public setInAppToastCallback(cb: (node: ScheduleNode) => void) {
    this.onInAppToastCallback = cb;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
    try {
      localStorage.setItem(NOTIF_STORAGE_KEY, String(val));
    } catch {
      // ignore
    }
  }

  public getPermissionStatus(): NotificationPermission | 'unsupported' {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return 'unsupported';
    }
    return Notification.permission;
  }

  public async requestPermission(): Promise<NotificationPermission | 'unsupported'> {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return 'unsupported';
    }
    try {
      const perm = await Notification.requestPermission();
      if (perm === 'granted') {
        this.setEnabled(true);
      }
      return perm;
    } catch {
      return 'unsupported';
    }
  }

  /**
   * Dispatches a Windows notification (Native Toast in Windows bottom-right corner)
   * plus plays a gentle chime and triggers the in-app bottom-right toast.
   */
  public triggerNotification(node: ScheduleNode) {
    if (!this.enabled) return;

    // 1. Play alert chime sound
    soundManager.playChime();

    // 2. Trigger native Windows notification (HTML5 Notification API)
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        const notif = new Notification(node.title, {
          body: `${node.actionSummary}\n【考研日程规划】`,
          tag: `kaoyan-node-${node.timeStr}`,
          icon: '/favicon.ico',
          silent: true, // we already played Web Audio chime
        });

        notif.onclick = () => {
          window.focus();
          notif.close();
        };
      } catch (err) {
        console.warn('Native desktop notification dispatch error (e.g. iframe sandbox):', err);
      }
    }

    // 3. Trigger in-app bottom-right floating Toast (ensures 100% visible even in iframes)
    if (this.onInAppToastCallback) {
      this.onInAppToastCallback(node);
    }
  }

  /**
   * Routine check against current East-8 (Beijing Time) minutes
   */
  public checkAndTriggerSchedule() {
    if (!this.enabled) return;

    const chinaTime = getChinaDateInfo();
    const currentDate = chinaTime.dateStr;

    // Reset daily cache on date change
    if (currentDate !== this.lastDateStr) {
      this.notifiedToday.clear();
      this.lastDateStr = currentDate;
    }

    const currentHour = chinaTime.hour;
    const currentMinute = chinaTime.minute;

    for (const node of this.getActiveTimeNodes()) {
      const key = `${currentDate}-${node.timeStr}`;
      // Trigger if current time matches slot hour and minute within a 2-minute window
      if (currentHour === node.hour && (currentMinute === node.minute || currentMinute === node.minute + 1)) {
        if (!this.notifiedToday.has(key)) {
          this.notifiedToday.add(key);
          this.triggerNotification(node);
          break;
        }
      }
    }
  }

  /**
   * For user test: sends a sample Windows bottom-right notification immediately
   */
  public sendTestNotification() {
    const testNode: ScheduleNode = {
      timeStr: '测试',
      hour: 0,
      minute: 0,
      title: '🔔【测试】Windows 桌面到达弹窗测试成功！',
      subjectName: '桌面通知测试',
      actionSummary: '当时间节点到达时（如 08:30 数学模考、13:30 408主力等），Windows 右下角将自动弹出此通知提示！',
    };
    this.triggerNotification(testNode);
  }
}

export const desktopNotificationManager = new DesktopNotificationManager();
