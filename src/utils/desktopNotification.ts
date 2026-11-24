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
    timeStr: '07:15',
    hour: 7,
    minute: 15,
    title: '【07:15 起床启动】起床 / 洗漱 / 早餐 / 通勤',
    subjectName: '生物钟启动',
    actionSummary: '7:45前完成咖啡因摄入；通勤路上见光唤醒大脑。',
  },
  {
    timeStr: '08:00',
    hour: 8,
    minute: 0,
    title: '【08:00 英语早读】英语早读 (0.5h)',
    subjectName: '英语早读',
    actionSummary: '仅背诵英语二大小作文模板、核心高频词，为大脑开机。',
  },
  {
    timeStr: '08:30',
    hour: 8,
    minute: 30,
    title: '【08:30 数二模考】数学二全真模考 (3h)',
    subjectName: '数学二全真模考',
    actionSummary: '严格卡表3小时，期间不翻书、不看手机。',
  },
  {
    timeStr: '11:30',
    hour: 11,
    minute: 30,
    title: '【11:30 数学即时复盘】趁热清选填与中档题 (0.75h)',
    subjectName: '数学即时复盘',
    actionSummary: '关键改动：趁热对答案，45分钟内搞定所有选填错题和中档计算错题，只留1-2道压轴难题到傍晚。',
  },
  {
    timeStr: '12:15',
    hour: 12,
    minute: 15,
    title: '【12:15 午餐 + 强制午休】蓄能休整 (1.25h)',
    subjectName: '强制午休',
    actionSummary: '12:50前吃完饭，12:55定闹钟午休25-30分钟，13:25起并用冷水洗脸。',
  },
  {
    timeStr: '13:30',
    hour: 13,
    minute: 30,
    title: '【13:30 英语二轻度训练】大脑预热缓冲 (0.5h)',
    subjectName: '英语轻度预热',
    actionSummary: '做1篇完形填空或新题型，作为午睡后到408模考前的“大脑预热缓冲”。',
  },
  {
    timeStr: '14:00',
    hour: 14,
    minute: 0,
    title: '【14:00 408全真模考】考场3小时严格限时 (3h)',
    subjectName: '408全真模考',
    actionSummary: '关键改动：严格在3小时内完成408套卷的取舍训练，对齐真实考场时间。',
  },
  {
    timeStr: '17:00',
    hour: 17,
    minute: 0,
    title: '【17:00 408选择题即时复盘】40道选择速查 (0.75h)',
    subjectName: '408选择复盘',
    actionSummary: '考完立刻批改，45分钟内把40道选择题的错因快速过一遍。',
  },
  {
    timeStr: '17:45',
    hour: 17,
    minute: 45,
    title: '【17:45 晚餐 + 碎片刷题】政治小程序刷选择题 (0.75h)',
    subjectName: '晚餐与政治刷题',
    actionSummary: '吃饭排队、散步回自习室期间，用手机小程序刷政治选择题。',
  },
  {
    timeStr: '18:30',
    hour: 18,
    minute: 30,
    title: '【18:30 408大题复盘与追赶】7道大题专项突破',
    subjectName: '408大题复盘',
    actionSummary: '集中火力复盘下午模考的7道大题，并针对暴露出的薄弱章节进行专项追赶。',
  },
  {
    timeStr: '19:30',
    hour: 19,
    minute: 30,
    title: '【19:30 数学深度复盘收尾】攻克遗留压轴难题',
    subjectName: '数学深度复盘',
    actionSummary: '攻克上午遗留的1-2道压轴大题，归纳题型方法，数学任务彻底结清。',
  },
  {
    timeStr: '21:15',
    hour: 21,
    minute: 15,
    title: '【21:15 降频记忆块】严禁复杂逻辑推演 (1.25h)',
    subjectName: '降频记忆块',
    actionSummary: '关键改动：21:15后严禁推演数学和408复杂逻辑！用于政治分析题背诵 + 408纯概念背诵（OS/计网）+ 政治错题回顾。',
  },
  {
    timeStr: '22:30',
    hour: 22,
    minute: 30,
    title: '【22:30 准时收书离场】停止学习准备休整',
    subjectName: '准时收书离场',
    actionSummary: '回寝后只洗漱不进食，23:30准时闭眼入睡！',
  },
];

export const NON_MOCK_DAY_TIME_NODES: ScheduleNode[] = [
  {
    timeStr: '07:15',
    hour: 7,
    minute: 15,
    title: '【07:15 起床启动】起床 / 洗漱 / 早餐 / 通勤',
    subjectName: '生物钟一致',
    actionSummary: '同模考日，保持生物钟绝对一致。',
  },
  {
    timeStr: '08:00',
    hour: 8,
    minute: 0,
    title: '【08:00 政治 / 英语早读】朗读背诵 (0.5h)',
    subjectName: '早读唤醒',
    actionSummary: '朗读背诵政治核心考点或英语范文。',
  },
  {
    timeStr: '08:30',
    hour: 8,
    minute: 30,
    title: '【08:30 数学专项攻坚】薄弱板块集中刷题 (3h)',
    subjectName: '数学专项攻坚',
    actionSummary: '针对薄弱板块（如高数中值定理、微分方程、线代二次型）集中刷题与二刷错题。',
  },
  {
    timeStr: '11:30',
    hour: 11,
    minute: 30,
    title: '【11:30 数学上午总结 + 英语阅读】(0.75h)',
    subjectName: '数二收尾+英语阅读',
    actionSummary: '花15分钟收尾上午数学；随后限时25分钟做1篇英语二阅读并对答案。',
  },
  {
    timeStr: '12:15',
    hour: 12,
    minute: 15,
    title: '【12:15 午餐 + 强制午休】蓄能休整 (1.25h)',
    subjectName: '强制午休',
    actionSummary: '严格执行30分钟午休，为下午的408蓄能。',
  },
  {
    timeStr: '13:30',
    hour: 13,
    minute: 30,
    title: '【13:30 英语二核心块】精读与写作训练 (1h)',
    subjectName: '英语二核心块',
    actionSummary: '精读上午的阅读错题 + 翻译训练或作文实战默写。',
  },
  {
    timeStr: '14:30',
    hour: 14,
    minute: 30,
    title: '【14:30 408主力追赶块】高分值硬骨头 (3.25h)',
    subjectName: '408主力追赶',
    actionSummary: '啃硬骨头时间：专门攻克数据结构算法题、计组大题、OS的PV操作等高分值模块。',
  },
  {
    timeStr: '17:45',
    hour: 17,
    minute: 45,
    title: '【17:45 晚餐 + 政治刷题】碎片刷选择题 (0.75h)',
    subjectName: '晚餐与政治刷题',
    actionSummary: '同样利用晚餐前后的碎片时间，在手机上完成当日的政治选择题刷题量。',
  },
  {
    timeStr: '18:30',
    hour: 18,
    minute: 30,
    title: '【18:30 数学查漏补缺】模考错题提前重做 (1.5h)',
    subjectName: '数学查漏补缺',
    actionSummary: '关键改动：数学大幅提前！此时精力尚可，用于重做近期模考卷的错题。',
  },
  {
    timeStr: '20:00',
    hour: 20,
    minute: 0,
    title: '【20:00 408真题二刷/次重点】巩固所学 (1.25h)',
    subjectName: '408真题二刷',
    actionSummary: '处理408历年真题中的高频中档题，巩固下午所学。',
  },
  {
    timeStr: '21:15',
    hour: 21,
    minute: 15,
    title: '【21:15 政治大题 + 408背诵】大脑降频 (1.25h)',
    subjectName: '大脑降频记忆',
    actionSummary: '关键改动：大脑降频。集中背诵政治分析题、复盘傍晚刷错的政治选择题，以及默写408简答题概念。',
  },
  {
    timeStr: '22:30',
    hour: 22,
    minute: 30,
    title: '【22:30 准时收书离场】停止一切脑力活动',
    subjectName: '准时收书离场',
    actionSummary: '停止一切脑力活动，回寝洗漱，准备入睡。',
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
      actionSummary: '当时间节点到达时（如 08:30 数二模考、14:00 408模考、21:15 降频记忆块、22:30 收书离场），右下角将自动弹出此通知提示！',
    };
    this.triggerNotification(testNode);
  }
}

export const desktopNotificationManager = new DesktopNotificationManager();
