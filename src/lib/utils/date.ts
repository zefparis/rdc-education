// src/lib/utils/date.ts
import { format, addDays, differenceInDays, isSameDay, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

export function formatDate(date: Date | string, formatStr = 'PPP'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr, { locale: fr });
}

export function isSameDate(date1: Date, date2: Date): boolean {
  return isSameDay(date1, date2);
}

export function getDaysBetween(date1: Date, date2: Date): number {
  return Math.abs(differenceInDays(date1, date2));
}

export function addDaysToDate(date: Date, days: number): Date {
  return addDays(date, days);
}