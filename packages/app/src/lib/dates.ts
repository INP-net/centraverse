import type { EventFrequency$options, Visibility$options } from '$houdini';
import { EventFrequency } from '$lib/zeus';
import { format, isMonday, isToday, previousMonday } from 'date-fns';
import fr from 'date-fns/locale/fr/index.js';

function safeFormatting<T>(func: (arg: T) => string): (arg: T) => string {
  return (arg) => {
    try {
      return func(arg);
    } catch (error) {
      console.error(error);
      return '';
    }
  };
}

export const dateTimeFormatter = new Intl.DateTimeFormat('fr-FR', {
  dateStyle: 'full',
  timeStyle: 'short',
});

export const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
  dateStyle: 'full',
});

export const formatDateTime = safeFormatting((date: unknown) =>
  dateTimeFormatter.format(new Date(date as Date)),
);

export const formatDate = safeFormatting((date: unknown) =>
  dateFormatter.format(new Date(date as Date)),
);

export const formatTime = (date: unknown) =>
  new Intl.DateTimeFormat('fr-FR', {
    timeStyle: 'short',
  }).format(new Date(date as Date));

/**
 * Show the time only if the date is today, otherwise show the full date
 * @param date
 */
export const formatDateTimeSmart: (date: Date | string) => string = (date) => {
  if (typeof date === 'string') date = new Date(Date.parse(date));
  if (isToday(date)) return formatTime(date);

  return formatDate(date);
};

export const formatDatetimeLocal = (date: Date | string) => {
  if (typeof date === 'string') date = new Date(Date.parse(date));

  const pad = (number: number) => {
    if (number < 10) return `0${number.toString()}`;
    return number.toString();
  };

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours(),
  )}:${pad(date.getMinutes())}`;
};

export function schoolYearStart(): Date {
  const now = new Date();
  const thisYearSeptemberFirst = new Date(now.getFullYear(), 8, 1);
  if (now > thisYearSeptemberFirst) return thisYearSeptemberFirst;

  return new Date(now.getFullYear() - 1, 8, 1);
}

export function yearTier(graduationYear: number): number {
  return schoolYearStart().getFullYear() - graduationYear + 4;
}

export function fromYearTier(tier: number): number {
  return schoolYearStart().getFullYear() - tier + 4;
}

export function yearRangeUpTo(end: number, length: number): number[] {
  const result = [];

  for (let i = end - length; i < end; i++) result.push(i);

  return result;
}

export function closestMonday(date: Date): Date {
  if (isMonday(date)) return date;
  return previousMonday(date);
}

/**
 *
 * @param startsAt start
 * @param endsAt end
 * @returns Formatted date range in the form "du {startsAt} au {endsAt}"
 */
export function formatOpenAtRange(startsAt: Date, endsAt: Date): string {
  const startsAtFormatted = formatDateTime(startsAt);
  const endsAtFormatted = formatDateTime(endsAt);

  return `du ${startsAtFormatted} au ${endsAtFormatted}`;
}

export function formatEventDates({
  frequency,
  startsAt,
  endsAt,
  recurringUntil,
}: {
  frequency: EventFrequency | EventFrequency$options;
  startsAt: Date;
  endsAt: Date;
  recurringUntil: Date | undefined | null;
}): string {
  try {
    switch (frequency) {
      case EventFrequency.Once: {
        return new Intl.DateTimeFormat('fr-FR', {
          dateStyle: 'full',
          timeStyle: 'short',
        })
          .formatRange(startsAt, endsAt)
          .replaceAll(new Date().getFullYear().toString(), '')
          .replaceAll(' , ', ', ');
      }

      default: {
        if (recurringUntil) return `Du ${formatDate(startsAt)} au ${formatDate(recurringUntil)}`;
        return `À partir du ${formatDate(startsAt)}`;
      }
    }
  } catch (error) {
    console.error(error);
    return '';
  }
}

export function formatRecurrence(
  frequency: EventFrequency | EventFrequency$options,
  startsAt: Date,
  endsAt: Date,
): string {
  switch (frequency) {
    case EventFrequency.Biweekly: {
      return `Toutes les deux semaines de ${format(startsAt, 'HH:mm')} à ${format(
        endsAt,
        'HH:mm',
      )}`;
    }

    case EventFrequency.Monthly: {
      return `Tout les mois le ${format(startsAt, 'dd')}, de ${format(
        startsAt,
        'HH:mm',
      )} à ${format(endsAt, 'HH:mm')}`;
    }

    case EventFrequency.Weekly: {
      return `Chaque ${format(startsAt, 'EEEE', { locale: fr })} de ${format(
        startsAt,
        'HH:mm',
      )} à ${format(endsAt, 'HH:mm')}`;
    }

    default: {
      return '';
    }
  }
}

export function parseYearTier(yearTierDisplay: string): number {
  return Number.parseInt(yearTierDisplay.replace(/a$/, ''), 10);
}

export function parseDisplayYearTierAndForApprentices(param: string): {
  yearTier: number;
  forApprentices: boolean;
} {
  const [yearTierDisplay, fiseOrFisa] = param.split('-', 2) as [string, string];
  return {
    yearTier: parseYearTier(yearTierDisplay),
    forApprentices: fiseOrFisa === 'fisa',
  };
}

export function sortedByDate<
  K extends string | number,
  O extends Record<K, Date | string | null | undefined>,
>(items: O[], dateKey: K): O[] {
  return items.slice().sort((a, b) => {
    if (!a[dateKey]) return 1;
    if (!b[dateKey]) return -1;
    return new Date(a[dateKey] as Date).valueOf() - new Date(b[dateKey] as Date).valueOf();
  });
}
