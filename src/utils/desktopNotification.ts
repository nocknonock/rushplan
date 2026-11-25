import { soundManager } from './sound';
import { getChinaDateInfo } from './chinaDate';

export interface ScheduleSlot {
  id: string;
  timeRange: string;
  subjectTitle: string;
  subjectCategory: 'math' | 'cs' | 'english' | 'politics' | 'rest';
  titleTone?: 'red' | 'orange' | 'green' | 'cyan';
  isKeyChange?: boolean;
  badge: string;
  content: string;
  startMinutes: number;
  endMinutes: number;
  reminderEnabled?: boolean;
}

export interface ScheduleNode {
  timeStr: string; // "08:00", "08:30", etc.
  hour: number;
  minute: number;
  title: string;
  subjectName: string;
  actionSummary: string;
}

export const DEFAULT_MOCK_SCHEDULE_SLOTS: ScheduleSlot[] = [
  {
    id: 'mock-slot-1',
    timeRange: '07:15 – 08:00',
    subjectTitle: '起床 / 洗漱 / 早餐 / 通勤',
    subjectCategory: 'rest',
    badge: '生物钟启动',
    content: '7:45前完成咖啡因摄入；通勤路上见光唤醒大脑。',
    startMinutes: 7 * 60 + 15,
    endMinutes: 8 * 60,
    reminderEnabled: true,
  },
  {
    id: 'mock-slot-2',
    timeRange: '08:00 – 08:30',
    subjectTitle: '英语早读 (0.5h)',
    subjectCategory: 'english',
    badge: '大脑开机',
    content: '仅背诵英语二大小作文模板、核心高频词，为大脑开机。',
    startMinutes: 8 * 60,
    endMinutes: 8 * 60 + 30,
    reminderEnabled: true,
  },
  {
    id: 'mock-slot-3',
    timeRange: '08:30 – 11:30',
    subjectTitle: '数学二全真模考 (3h)',
    subjectCategory: 'math',
    titleTone: 'red',
    badge: '全真模考·重中之重',
    content: '严格卡表3小时，期间不翻书、不看手机。',
    startMinutes: 8 * 60 + 30,
    endMinutes: 11 * 60 + 30,
    reminderEnabled: true,
  },
  {
    id: 'mock-slot-4',
    timeRange: '11:30 – 12:15',
    subjectTitle: '数学即时复盘 (0.75h)',
    subjectCategory: 'math',
    titleTone: 'orange',
    isKeyChange: true,
    badge: '关键改动·趁热打铁',
    content:
      '趁热对答案，必须在这45分钟内搞定所有选填错题和中档计算错题，只留1-2道压轴难题到傍晚。',
    startMinutes: 11 * 60 + 30,
    endMinutes: 12 * 60 + 15,
    reminderEnabled: true,
  },
  {
    id: 'mock-slot-5',
    timeRange: '12:15 – 13:30',
    subjectTitle: '午餐 + 强制午休 (1.25h)',
    subjectCategory: 'rest',
    titleTone: 'green',
    badge: '强制午休蓄能',
    content: '12:50前吃完饭，12:55定闹钟午休25-30分钟，13:25起并用冷水洗脸。',
    startMinutes: 12 * 60 + 15,
    endMinutes: 13 * 60 + 30,
    reminderEnabled: true,
  },
  {
    id: 'mock-slot-6',
    timeRange: '13:30 – 14:00',
    subjectTitle: '英语二轻度训练 (0.5h)',
    subjectCategory: 'english',
    badge: '大脑预热缓冲',
    content: '做1篇完形填空或新题型，作为午睡后到408模考前的“大脑预热缓冲”。',
    startMinutes: 13 * 60 + 30,
    endMinutes: 14 * 60,
    reminderEnabled: true,
  },
  {
    id: 'mock-slot-7',
    timeRange: '14:00 – 17:00',
    subjectTitle: '408全真模考 (3h)',
    subjectCategory: 'cs',
    titleTone: 'cyan',
    isKeyChange: true,
    badge: '关键改动·3h取舍训练',
    content: '原计划4h太长，考场只有3h。必须训练在3小时内完成408套卷的取舍能力。',
    startMinutes: 14 * 60,
    endMinutes: 17 * 60,
    reminderEnabled: true,
  },
  {
    id: 'mock-slot-8',
    timeRange: '17:00 – 17:45',
    subjectTitle: '408选择题即时复盘 (0.75h)',
    subjectCategory: 'cs',
    titleTone: 'orange',
    badge: '40道选择速查',
    content: '考完立刻批改，45分钟内把40道选择题的错因快速过一遍。',
    startMinutes: 17 * 60,
    endMinutes: 17 * 60 + 45,
    reminderEnabled: true,
  },
  {
    id: 'mock-slot-9',
    timeRange: '17:45 – 18:30',
    subjectTitle: '晚餐 + 碎片刷题 (0.75h)',
    subjectCategory: 'politics',
    badge: '政治碎片刷题',
    content: '吃饭排队、散步回自习室期间，用手机小程序刷政治选择题（消灭原23:30的任务）。',
    startMinutes: 17 * 60 + 45,
    endMinutes: 18 * 60 + 30,
    reminderEnabled: true,
  },
  {
    id: 'mock-slot-10',
    timeRange: '18:30 – 19:30',
    subjectTitle: '408大题复盘与追赶 (1.75h)',
    subjectCategory: 'cs',
    titleTone: 'cyan',
    badge: '7道大题专项追赶',
    content: '集中火力复盘下午模考的7道大题，并针对暴露出的薄弱章节进行专项追赶。',
    startMinutes: 18 * 60 + 30,
    endMinutes: 19 * 60 + 30,
    reminderEnabled: true,
  },
  {
    id: 'mock-slot-11',
    timeRange: '19:30 – 21:15',
    subjectTitle: '数学深度复盘收尾 (1h)',
    subjectCategory: 'math',
    titleTone: 'red',
    badge: '压轴难题结清',
    content: '攻克上午遗留的1-2道压轴大题，归纳题型方法，数学任务彻底结清。',
    startMinutes: 19 * 60 + 30,
    endMinutes: 21 * 60 + 15,
    reminderEnabled: true,
  },
  {
    id: 'mock-slot-12',
    timeRange: '21:15 – 22:30',
    subjectTitle: '降频记忆块 (1.25h)',
    subjectCategory: 'politics',
    titleTone: 'green',
    isKeyChange: true,
    badge: '关键改动·21:15降频',
    content:
      '21:15后严禁推演数学和408复杂逻辑！此时间段用于：政治分析题背诵 + 408纯概念背诵（OS/计网）+ 政治错题回顾。',
    startMinutes: 21 * 60 + 15,
    endMinutes: 22 * 60 + 30,
    reminderEnabled: true,
  },
  {
    id: 'mock-slot-13',
    timeRange: '22:30',
    subjectTitle: '准时收书离场',
    subjectCategory: 'rest',
    titleTone: 'red',
    badge: '23:30闭眼入睡',
    content: '21:00左右在自习室吃一点垫肚子的食物；回寝后只洗漱不进食，23:30闭眼。',
    startMinutes: 22 * 60 + 30,
    endMinutes: 24 * 60,
    reminderEnabled: true,
  },
];

export const DEFAULT_NON_MOCK_SCHEDULE_SLOTS: ScheduleSlot[] = [
  {
    id: 'nonmock-slot-1',
    timeRange: '07:15 – 08:00',
    subjectTitle: '起床 / 洗漱 / 早餐 / 通勤',
    subjectCategory: 'rest',
    badge: '生物钟一致',
    content: '同模考日，保持生物钟绝对一致。',
    startMinutes: 7 * 60 + 15,
    endMinutes: 8 * 60,
    reminderEnabled: true,
  },
  {
    id: 'nonmock-slot-2',
    timeRange: '08:00 – 08:30',
    subjectTitle: '政治 / 英语早读 (0.5h)',
    subjectCategory: 'politics',
    badge: '早读唤醒',
    content: '朗读背诵政治核心考点或英语范文。',
    startMinutes: 8 * 60,
    endMinutes: 8 * 60 + 30,
    reminderEnabled: true,
  },
  {
    id: 'nonmock-slot-3',
    timeRange: '08:30 – 11:30',
    subjectTitle: '数学专项攻坚 (3h)',
    subjectCategory: 'math',
    titleTone: 'red',
    badge: '薄弱板块攻坚',
    content: '针对薄弱板块（如高数中值定理、微分方程、线代二次型）集中刷题与二刷错题。',
    startMinutes: 8 * 60 + 30,
    endMinutes: 11 * 60 + 30,
    reminderEnabled: true,
  },
  {
    id: 'nonmock-slot-4',
    timeRange: '11:30 – 12:15',
    subjectTitle: '数学上午总结 + 英语阅读 (0.75h)',
    subjectCategory: 'english',
    badge: '数二收尾+英语阅读',
    content: '花15分钟收尾上午数学；随后限时25分钟做1篇英语二阅读并对答案。',
    startMinutes: 11 * 60 + 30,
    endMinutes: 12 * 60 + 15,
    reminderEnabled: true,
  },
  {
    id: 'nonmock-slot-5',
    timeRange: '12:15 – 13:30',
    subjectTitle: '午餐 + 强制午休 (1.25h)',
    subjectCategory: 'rest',
    titleTone: 'green',
    badge: '30分钟强制午休',
    content: '严格执行30分钟午休，为下午的408蓄能。',
    startMinutes: 12 * 60 + 15,
    endMinutes: 13 * 60 + 30,
    reminderEnabled: true,
  },
  {
    id: 'nonmock-slot-6',
    timeRange: '13:30 – 14:30',
    subjectTitle: '英语二核心块 (1h)',
    subjectCategory: 'english',
    badge: '精读+翻译/作文',
    content: '精读上午的阅读错题 + 翻译训练或作文实战默写。',
    startMinutes: 13 * 60 + 30,
    endMinutes: 14 * 60 + 30,
    reminderEnabled: true,
  },
  {
    id: 'nonmock-slot-7',
    timeRange: '14:30 – 17:45',
    subjectTitle: '408主力追赶块 (3.25h)',
    subjectCategory: 'cs',
    titleTone: 'cyan',
    badge: '啃硬骨头主力块',
    content: '啃硬骨头时间：专门攻克数据结构算法题、计组大题、OS的PV操作等高分值模块。',
    startMinutes: 14 * 60 + 30,
    endMinutes: 17 * 60 + 45,
    reminderEnabled: true,
  },
  {
    id: 'nonmock-slot-8',
    timeRange: '17:45 – 18:30',
    subjectTitle: '晚餐 + 政治刷题 (0.75h)',
    subjectCategory: 'politics',
    badge: '碎片刷政治选择',
    content: '同样利用晚餐前后的碎片时间，在手机上完成当日的政治选择题刷题量。',
    startMinutes: 17 * 60 + 45,
    endMinutes: 18 * 60 + 30,
    reminderEnabled: true,
  },
  {
    id: 'nonmock-slot-9',
    timeRange: '18:30 – 20:00',
    subjectTitle: '数学查漏补缺 (1.5h)',
    subjectCategory: 'math',
    titleTone: 'red',
    isKeyChange: true,
    badge: '关键改动·数学大幅提前',
    content: '把原定20:30-22:00的数学大幅提前！此时精力尚可，用于重做近期模考卷的错题。',
    startMinutes: 18 * 60 + 30,
    endMinutes: 20 * 60,
    reminderEnabled: true,
  },
  {
    id: 'nonmock-slot-10',
    timeRange: '20:00 – 21:15',
    subjectTitle: '408真题二刷/次重点 (1.25h)',
    subjectCategory: 'cs',
    titleTone: 'cyan',
    badge: '高频中档题巩固',
    content: '处理408历年真题中的高频中档题，巩固下午所学。',
    startMinutes: 20 * 60,
    endMinutes: 21 * 60 + 15,
    reminderEnabled: true,
  },
  {
    id: 'nonmock-slot-11',
    timeRange: '21:15 – 22:30',
    subjectTitle: '政治大题 + 408背诵 (1.25h)',
    subjectCategory: 'politics',
    titleTone: 'green',
    isKeyChange: true,
    badge: '关键改动·大脑降频',
    content: '大脑降频。集中背诵政治分析题、复盘傍晚刷错的政治选择题，以及默写408简答题概念。',
    startMinutes: 21 * 60 + 15,
    endMinutes: 22 * 60 + 30,
    reminderEnabled: true,
  },
  {
    id: 'nonmock-slot-12',
    timeRange: '22:30',
    subjectTitle: '准时收书离场',
    subjectCategory: 'rest',
    titleTone: 'red',
    badge: '停止脑力活动',
    content: '停止一切脑力活动，回寝洗漱，准备入睡。',
    startMinutes: 22 * 60 + 30,
    endMinutes: 24 * 60,
    reminderEnabled: true,
  },
];

/**
 * Helper to parse a `timeRange` string (e.g. "08:30 – 11:30", "08:30-11:30", "22:30")
 * into startMinutes and endMinutes so user edits to timeRange automatically align notifications & "正在进行" highlight.
 */
export function parseTimeRangeToMinutes(
  timeRange: string,
  fallbackStart: number = 8 * 60,
  fallbackEnd: number = 9 * 60
): { startMinutes: number; endMinutes: number; normalizedStartStr: string } {
  const matches = Array.from(timeRange.matchAll(/(\d{1,2})\s*[:：]\s*(\d{2})/g));
  if (matches.length === 0) {
    const h = Math.floor(fallbackStart / 60);
    const m = fallbackStart % 60;
    return {
      startMinutes: fallbackStart,
      endMinutes: Math.max(fallbackEnd, fallbackStart + 15),
      normalizedStartStr: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`,
    };
  }

  const startH = Math.min(23, Math.max(0, parseInt(matches[0][1], 10)));
  const startM = Math.min(59, Math.max(0, parseInt(matches[0][2], 10)));
  const startMinutes = startH * 60 + startM;
  const normalizedStartStr = `${String(startH).padStart(2, '0')}:${String(startM).padStart(2, '0')}`;

  if (matches.length >= 2) {
    const endH = Math.min(24, Math.max(0, parseInt(matches[1][1], 10)));
    const endM = Math.min(59, Math.max(0, parseInt(matches[1][2], 10)));
    let endMinutes = endH * 60 + endM;
    if (endMinutes <= startMinutes) {
      endMinutes = Math.min(24 * 60, startMinutes + 45);
    }
    return { startMinutes, endMinutes, normalizedStartStr };
  }

  // Single time point (e.g. "22:30")
  return {
    startMinutes,
    endMinutes: 24 * 60,
    normalizedStartStr,
  };
}

export function normalizeScheduleSlots(slots: ScheduleSlot[]): ScheduleSlot[] {
  return slots.map((slot, index) => {
    const parsed = parseTimeRangeToMinutes(
      slot.timeRange,
      slot.startMinutes ?? 8 * 60,
      slot.endMinutes ?? 9 * 60
    );
    return {
      ...slot,
      id: slot.id || `slot-${Date.now()}-${index}`,
      startMinutes: parsed.startMinutes,
      endMinutes: parsed.endMinutes,
      reminderEnabled: slot.reminderEnabled !== false,
    };
  });
}

export function slotToScheduleNode(slot: ScheduleSlot): ScheduleNode {
  const parsed = parseTimeRangeToMinutes(slot.timeRange, slot.startMinutes, slot.endMinutes);
  const hour = Math.floor(parsed.startMinutes / 60);
  const minute = parsed.startMinutes % 60;
  const timeStr = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
  return {
    timeStr,
    hour,
    minute,
    title: `【${timeStr} ${slot.badge || slot.subjectTitle}】${slot.subjectTitle}`,
    subjectName: slot.badge || slot.subjectTitle,
    actionSummary: `${slot.isKeyChange ? '关键改动：' : ''}${slot.content}`,
  };
}

export const MOCK_DAY_TIME_NODES: ScheduleNode[] = DEFAULT_MOCK_SCHEDULE_SLOTS.map(slotToScheduleNode);
export const NON_MOCK_DAY_TIME_NODES: ScheduleNode[] = DEFAULT_NON_MOCK_SCHEDULE_SLOTS.map(slotToScheduleNode);

export interface ScheduleAlertEvent {
  node: ScheduleNode;
  isSnoozed?: boolean;
  snoozeCount?: number;
  triggeredAt: number;
}

export interface SnoozeStateInfo {
  node: ScheduleNode;
  fireAt: number;
  snoozeCount: number;
}

// Default backward compatibility
export const TIME_NODES: ScheduleNode[] = MOCK_DAY_TIME_NODES;

const NOTIF_STORAGE_KEY = 'kaoyan_windows_notif_enabled';
const SCHEDULE_MODE_STORAGE_KEY = 'kaoyan_schedule_mode';
const CUSTOM_MOCK_SLOTS_KEY = 'kaoyan_custom_mock_schedule_v1';
const CUSTOM_NON_MOCK_SLOTS_KEY = 'kaoyan_custom_non_mock_schedule_v1';

class DesktopNotificationManager {
  private enabled: boolean = true;
  private scheduleMode: 'mock' | 'non_mock' = 'mock';
  private mockSlots: ScheduleSlot[] = DEFAULT_MOCK_SCHEDULE_SLOTS;
  private nonMockSlots: ScheduleSlot[] = DEFAULT_NON_MOCK_SCHEDULE_SLOTS;
  private isMockCustomized: boolean = false;
  private isNonMockCustomized: boolean = false;
  private scheduleListeners: Set<() => void> = new Set();

  private notifiedToday: Set<string> = new Set();
  private lastDateStr: string = '';
  private onInAppToastCallback: ((event: ScheduleAlertEvent) => void) | null = null;
  private onSnoozeStateCallback: ((info: SnoozeStateInfo | null) => void) | null = null;

  // Persistent native notification & tab title flashing state
  private activeNativeNotif: Notification | null = null;
  private titleFlashInterval: ReturnType<typeof setInterval> | null = null;
  private originalDocumentTitle: string = '考研日程规划';
  private snoozeTimerId: ReturnType<typeof setTimeout> | null = null;
  private snoozedTarget: SnoozeStateInfo | null = null;

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
      const savedMock = localStorage.getItem(CUSTOM_MOCK_SLOTS_KEY);
      if (savedMock) {
        const parsedMock = JSON.parse(savedMock);
        if (Array.isArray(parsedMock) && parsedMock.length > 0) {
          this.mockSlots = normalizeScheduleSlots(parsedMock);
          this.isMockCustomized = true;
        }
      }
      const savedNonMock = localStorage.getItem(CUSTOM_NON_MOCK_SLOTS_KEY);
      if (savedNonMock) {
        const parsedNonMock = JSON.parse(savedNonMock);
        if (Array.isArray(parsedNonMock) && parsedNonMock.length > 0) {
          this.nonMockSlots = normalizeScheduleSlots(parsedNonMock);
          this.isNonMockCustomized = true;
        }
      }
      if (typeof document !== 'undefined' && document.title) {
        this.originalDocumentTitle = document.title;
      }
    } catch {
      // ignore
    }
  }

  public subscribeScheduleChange(listener: () => void): () => void {
    this.scheduleListeners.add(listener);
    return () => {
      this.scheduleListeners.delete(listener);
    };
  }

  private notifyScheduleListeners() {
    this.scheduleListeners.forEach((listener) => {
      try {
        listener();
      } catch {
        // ignore
      }
    });
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
    this.notifyScheduleListeners();
    // Re-evaluate schedule immediately upon switching
    this.checkAndTriggerSchedule();
  }

  public getScheduleSlots(mode?: 'mock' | 'non_mock'): ScheduleSlot[] {
    const targetMode = mode || this.scheduleMode;
    return targetMode === 'mock' ? this.mockSlots : this.nonMockSlots;
  }

  public isScheduleCustomized(mode?: 'mock' | 'non_mock'): boolean {
    const targetMode = mode || this.scheduleMode;
    return targetMode === 'mock' ? this.isMockCustomized : this.isNonMockCustomized;
  }

  public saveScheduleSlots(mode: 'mock' | 'non_mock', slots: ScheduleSlot[]) {
    const normalized = normalizeScheduleSlots(slots);
    if (mode === 'mock') {
      this.mockSlots = normalized;
      this.isMockCustomized = true;
      try {
        localStorage.setItem(CUSTOM_MOCK_SLOTS_KEY, JSON.stringify(normalized));
      } catch {
        // ignore
      }
    } else {
      this.nonMockSlots = normalized;
      this.isNonMockCustomized = true;
      try {
        localStorage.setItem(CUSTOM_NON_MOCK_SLOTS_KEY, JSON.stringify(normalized));
      } catch {
        // ignore
      }
    }
    // Clear today's notified cache for updated slots so newly set times can trigger cleanly
    this.notifiedToday.clear();
    this.notifyScheduleListeners();
    this.checkAndTriggerSchedule();
  }

  public resetScheduleSlots(mode: 'mock' | 'non_mock') {
    if (mode === 'mock') {
      this.mockSlots = DEFAULT_MOCK_SCHEDULE_SLOTS;
      this.isMockCustomized = false;
      try {
        localStorage.removeItem(CUSTOM_MOCK_SLOTS_KEY);
      } catch {
        // ignore
      }
    } else {
      this.nonMockSlots = DEFAULT_NON_MOCK_SCHEDULE_SLOTS;
      this.isNonMockCustomized = false;
      try {
        localStorage.removeItem(CUSTOM_NON_MOCK_SLOTS_KEY);
      } catch {
        // ignore
      }
    }
    this.notifiedToday.clear();
    this.notifyScheduleListeners();
    this.checkAndTriggerSchedule();
  }

  public getActiveTimeNodes(): ScheduleNode[] {
    const slots = this.getScheduleSlots(this.scheduleMode);
    return slots
      .filter((slot) => slot.reminderEnabled !== false)
      .map(slotToScheduleNode);
  }

  public setInAppToastCallback(cb: (event: ScheduleAlertEvent) => void) {
    this.onInAppToastCallback = cb;
  }

  public setSnoozeStateCallback(cb: (info: SnoozeStateInfo | null) => void) {
    this.onSnoozeStateCallback = cb;
    cb(this.snoozedTarget);
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
    if (!val) {
      this.dismissActiveNotification();
      this.cancelSnooze();
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
   * Starts flashing document.title so the user notices immediately even on another tab
   */
  public startTitleFlash(node: ScheduleNode, isSnoozed: boolean = false) {
    if (typeof document === 'undefined') return;

    if (!this.titleFlashInterval) {
      // Capture clean title before flashing begins
      if (document.title && !document.title.startsWith('🔔') && !document.title.startsWith('⏰')) {
        this.originalDocumentTitle = document.title;
      }
    } else {
      clearInterval(this.titleFlashInterval);
      this.titleFlashInterval = null;
    }

    const prefix = isSnoozed ? '⏰【延后到点】' : `🔔【${node.timeStr}】`;
    const flashA = `${prefix}${node.subjectName} - 请立即切换！`;
    const flashB = `⚠️ 节点已到 · 等待确认 | ${this.originalDocumentTitle}`;

    let toggle = true;
    document.title = flashA;

    this.titleFlashInterval = setInterval(() => {
      document.title = toggle ? flashB : flashA;
      toggle = !toggle;
    }, 800);
  }

  /**
   * Stops flashing document.title and restores the original title
   */
  public stopTitleFlash() {
    if (this.titleFlashInterval) {
      clearInterval(this.titleFlashInterval);
      this.titleFlashInterval = null;
    }
    if (typeof document !== 'undefined') {
      document.title = this.originalDocumentTitle || '考研日程规划';
    }
  }

  /**
   * Closes persistent native notification and stops tab title flashing
   */
  public dismissActiveNotification() {
    this.stopTitleFlash();
    if (this.activeNativeNotif) {
      try {
        this.activeNativeNotif.close();
      } catch {
        // ignore
      }
      this.activeNativeNotif = null;
    }
  }

  /**
   * Cancels any pending 5-minute snooze timer
   */
  public cancelSnooze() {
    if (this.snoozeTimerId) {
      clearTimeout(this.snoozeTimerId);
      this.snoozeTimerId = null;
    }
    this.snoozedTarget = null;
    if (this.onSnoozeStateCallback) {
      this.onSnoozeStateCallback(null);
    }
  }

  /**
   * Snoozes the current alert for N minutes (default 5 minutes), then re-triggers the strong alert
   */
  public snoozeNotification(node: ScheduleNode, minutes: number = 5, currentSnoozeCount: number = 0) {
    this.dismissActiveNotification();
    if (this.snoozeTimerId) {
      clearTimeout(this.snoozeTimerId);
      this.snoozeTimerId = null;
    }

    const delayMs = minutes * 60 * 1000;
    const nextSnoozeCount = currentSnoozeCount + 1;
    const fireAt = Date.now() + delayMs;

    this.snoozedTarget = {
      node,
      fireAt,
      snoozeCount: nextSnoozeCount,
    };

    if (this.onSnoozeStateCallback) {
      this.onSnoozeStateCallback(this.snoozedTarget);
    }

    this.snoozeTimerId = setTimeout(() => {
      this.fireSnoozedTarget();
    }, delayMs);
  }

  /**
   * Fires a pending snoozed notification immediately (called by timer, fallback poll, or user button)
   */
  public fireSnoozedTarget() {
    if (!this.snoozedTarget) return;
    const target = this.snoozedTarget;
    this.cancelSnooze();
    this.triggerNotification(target.node, {
      isSnoozed: true,
      snoozeCount: target.snoozeCount,
      force: true,
    });
  }

  /**
   * Dispatches:
   * 1. Web Audio chime
   * 2. Browser tab title flashing
   * 3. Persistent Windows/OS system notification (requireInteraction: true)
   * 4. In-app centered strong-intercept modal (manual confirmation required)
   */
  public triggerNotification(
    node: ScheduleNode,
    options?: { isSnoozed?: boolean; snoozeCount?: number; force?: boolean }
  ) {
    if (!this.enabled && !options?.force) return;

    // Close any previous native notification cleanly
    if (this.activeNativeNotif) {
      try {
        this.activeNativeNotif.close();
      } catch {
        // ignore
      }
      this.activeNativeNotif = null;
    }

    // 1. Play alert chime sound
    soundManager.playChime();

    // 2. Start browser tab title flashing
    this.startTitleFlash(node, Boolean(options?.isSnoozed));

    // 3. Trigger persistent native Windows notification (HTML5 Notification API with requireInteraction)
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        const notifTitle = options?.isSnoozed
          ? `⏰【延后提醒】${node.title}`
          : node.title;

        const notifOptions: NotificationOptions & { renotify?: boolean } = {
          body: `${options?.isSnoozed ? '已延后 5 分钟，请立即切换执行！\n' : ''}${node.actionSummary}\n【考研日程规划 · 常驻提醒，需手动关闭】`,
          tag: `kaoyan-node-${node.timeStr}`,
          requireInteraction: true,
          renotify: true,
        };

        const notif = new Notification(notifTitle, notifOptions);
        this.activeNativeNotif = notif;

        notif.onclick = () => {
          window.focus();
          notif.close();
          if (this.activeNativeNotif === notif) {
            this.activeNativeNotif = null;
          }
        };

        notif.onclose = () => {
          if (this.activeNativeNotif === notif) {
            this.activeNativeNotif = null;
          }
        };
      } catch (err) {
        console.warn('Native desktop notification dispatch error (e.g. iframe sandbox):', err);
      }
    }

    // 4. Trigger in-app centered strong-intercept modal
    if (this.onInAppToastCallback) {
      this.onInAppToastCallback({
        node,
        isSnoozed: Boolean(options?.isSnoozed),
        snoozeCount: options?.snoozeCount || 0,
        triggeredAt: Date.now(),
      });
    }
  }

  /**
   * Routine check against current East-8 (Beijing Time) minutes + snooze fallback check
   */
  public checkAndTriggerSchedule() {
    // Fallback check for snoozed timer in case background tab throttled setTimeout
    if (this.snoozedTarget && Date.now() >= this.snoozedTarget.fireAt) {
      this.fireSnoozedTarget();
      return;
    }

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
   * For user test: immediately triggers the centered strong-intercept modal,
   * tab title flashing, and persistent Windows system notification.
   */
  public sendTestNotification() {
    const testNode: ScheduleNode = {
      timeStr: '测试',
      hour: 0,
      minute: 0,
      title: '【强提醒测试】时间节点已到 · 需手动确认',
      subjectName: '强拦截与常驻通知',
      actionSummary:
        '到点时将弹出此居中提醒卡片（不会自动消失），同步开启浏览器标签页标题闪烁与 Windows 常驻桌面通知。请点击下方「立即切换 / 进入番茄钟」或「再延后 5 分钟」进行确认。',
    };
    this.triggerNotification(testNode, { force: true });
  }
}

export const desktopNotificationManager = new DesktopNotificationManager();
