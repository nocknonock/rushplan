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

export const TIME_NODES: ScheduleNode[] = [
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

const NOTIF_STORAGE_KEY = 'kaoyan_windows_notif_enabled';

class DesktopNotificationManager {
  private enabled: boolean = true;
  private notifiedToday: Set<string> = new Set();
  private lastDateStr: string = '';
  private onInAppToastCallback: ((node: ScheduleNode) => void) | null = null;

  constructor() {
    try {
      const saved = localStorage.getItem(NOTIF_STORAGE_KEY);
      if (saved !== null) {
        this.enabled = saved === 'true';
      }
    } catch {
      // ignore
    }
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
          body: `${node.actionSummary}\n【考研决战指挥部 · 战时冲刺】`,
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

    for (const node of TIME_NODES) {
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
