// Define a type for the days of the week; only real day names are valid.
export type DayOfWeek =
  'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export function isWeekend(day: DayOfWeek): boolean {
  return day === 'Saturday' || day === 'Sunday';
}
