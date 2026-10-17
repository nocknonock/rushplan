/**
 * China Standard Time (东八区 / Beijing Time / Asia/Shanghai, UTC+8)
 * Ensures consistent date calculation regardless of browser/container local timezone
 */

export interface ChinaDateInfo {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  dateStr: string; // "YYYY-MM-DD" in China time
  planDateStr: string; // "2026-MM-DD" mapped to the 2026 schedule year
  formattedDate: string; // e.g. "10月17日"
  timeStr: string; // e.g. "14:32"
  weekday: string; // e.g. "周六"
}

/**
 * Extracts current time and date in China Standard Time (东八区, UTC+8)
 */
export function getChinaDateInfo(date: Date = new Date()): ChinaDateInfo {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    weekday: 'short',
  });

  const parts = formatter.formatToParts(date);
  let year = 2026;
  let month = 10;
  let day = 17;
  let hour = 14;
  let minute = 30;
  let weekdayEn = 'Sat';

  for (const p of parts) {
    if (p.type === 'year') year = parseInt(p.value, 10);
    if (p.type === 'month') month = parseInt(p.value, 10);
    if (p.type === 'day') day = parseInt(p.value, 10);
    if (p.type === 'hour') hour = parseInt(p.value, 10);
    if (p.type === 'minute') minute = parseInt(p.value, 10);
    if (p.type === 'weekday') weekdayEn = p.value;
  }

  const weekdayMap: Record<string, string> = {
    Mon: '周一',
    Tue: '周二',
    Wed: '周三',
    Thu: '周四',
    Fri: '周五',
    Sat: '周六',
    Sun: '周日',
  };

  const mm = String(month).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  const dateStr = `${year}-${mm}-${dd}`;
  const planDateStr = `2026-${mm}-${dd}`;
  const formattedDate = `${month}月${day}日`;
  const timeStr = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
  const weekday = weekdayMap[weekdayEn] || '周六';

  return {
    year,
    month,
    day,
    hour,
    minute,
    dateStr,
    planDateStr,
    formattedDate,
    timeStr,
    weekday,
  };
}

/**
 * Accurately determines today's active plan in the battle schedule using 东八区 (UTC+8)
 */
export function getChinaTodayPlanDate(plans: { date: string }[]): string {
  if (!plans || plans.length === 0) return '2026-10-17';

  const chinaTime = getChinaDateInfo();

  // 1. Direct exact match with current date in China (e.g. 2026-10-17)
  if (plans.some((p) => p.date === chinaTime.dateStr)) {
    return chinaTime.dateStr;
  }

  // 2. Map month-day to 2026 schedule if device year is 2024 or 2025
  if (plans.some((p) => p.date === chinaTime.planDateStr)) {
    return chinaTime.planDateStr;
  }

  // 3. If today is earlier than the first scheduled day (2026-10-08)
  if (chinaTime.planDateStr < plans[0].date) {
    return plans[0].date;
  }

  // 4. If today is later than the last scheduled day
  if (chinaTime.planDateStr > plans[plans.length - 1].date) {
    return plans[plans.length - 1].date;
  }

  // 5. Fallback
  return '2026-10-17';
}

/**
 * Calculates remaining days in East 8 calendar days
 * e.g. target "2026-10-23" when today is "2026-10-17" returns 6 days
 */
export function getChinaCalendarDiffDays(targetYmd: string): number {
  const chinaTime = getChinaDateInfo();
  // Parse target date components
  const [tYear, tMonth, tDay] = targetYmd.split('-').map(Number);
  
  // Use UTC dates to compute pure calendar day differences without daylight savings / local offset interference
  const targetUtc = Date.UTC(tYear, tMonth - 1, tDay);
  const currentUtc = Date.UTC(chinaTime.year, chinaTime.month - 1, chinaTime.day);

  const diffMs = targetUtc - currentUtc;
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}
