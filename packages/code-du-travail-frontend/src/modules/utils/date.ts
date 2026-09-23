import { format } from "date-fns";
import { fr } from "date-fns/locale/fr";

export enum Month {
  janvier = 1,
  février = 2,
  mars = 3,
  avril = 4,
  mai = 5,
  juin = 6,
  juillet = 7,
  août = 8,
  septembre = 9,
  octobre = 10,
  novembre = 11,
  décembre = 12,
}

export enum Unit {
  DAY = "jour",
  WEEK = "semaine",
  MONTH = "mois",
}

export enum Day {
  DIMANCHE = "dimanche",
  LUNDI = "lundi",
  MARDI = "mardi",
  MERCREDI = "mercredi",
  JEUDI = "jeudi",
  VENDREDI = "vendredi",
  SAMEDI = "samedi",
}

const days = [
  Day.DIMANCHE,
  Day.LUNDI,
  Day.MARDI,
  Day.MERCREDI,
  Day.JEUDI,
  Day.VENDREDI,
  Day.SAMEDI,
];

export const convertDate = (
  date: Date,
  value: number,
  unit: Unit,
  isCalendar = false
): Date => {
  const localDate = new Date(date);
  switch (unit) {
    case Unit.DAY:
      return addDay(localDate, value);
    case Unit.WEEK:
      return addWeek(localDate, value, isCalendar);
    case Unit.MONTH:
      return addMonth(localDate, value);
  }
};

export const addDay = (date: Date, day: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + day);
  return newDate;
};

export const addWeek = (date: Date, week: number, isCalendar = false): Date =>
  addDay(date, isCalendar ? week * 7 - 1 : week * 7);

export const addMonth = (date: Date, month: number): Date => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + month);
  return newDate;
};

export const dateToString = (date: Date, withDay = false): string => {
  const day = date.getDay();
  const num = date.getDate();
  const month = date.getMonth() + 1;
  return `${withDay ? `${days[day]} ` : ""}${num} ${Month[month].toString()}`;
};

export type CalendarDate = { year: number; month: number; day: number };

const pad2 = (n: number): string => String(n).padStart(2, "0");

// Date saisie côté admin : « jour/mois/année ». L'admin tolère jour et mois sur
// 1 ou 2 chiffres et l'année sur 2 ou 4 chiffres (`1/9/26`), on tolère donc la
// même chose ici ; une année sur 2 chiffres est lue en `20AA`. Une date déjà
// ISO (`AAAA-MM-JJ`, éventuellement suivie d'une heure) est aussi acceptée.
// Renvoie undefined si la chaîne n'est pas une date calendaire valide.
export const parseFrenchDate = (date?: string): CalendarDate | undefined => {
  const value = date?.trim();
  if (!value) return undefined;

  let year: number, month: number, day: number;
  const frMatch = /^(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})$/.exec(value);
  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})(?:$|T)/.exec(value);
  if (frMatch) {
    day = Number(frMatch[1]);
    month = Number(frMatch[2]);
    year = Number(frMatch[3]);
    if (frMatch[3].length === 2) year += 2000;
  } else if (isoMatch) {
    year = Number(isoMatch[1]);
    month = Number(isoMatch[2]);
    day = Number(isoMatch[3]);
  } else {
    return undefined;
  }

  // Rejette les dates inexistantes (31/02, mois 13…) : Date.UTC les « déborde ».
  const check = new Date(Date.UTC(year, month - 1, day));
  if (
    check.getUTCFullYear() !== year ||
    check.getUTCMonth() !== month - 1 ||
    check.getUTCDate() !== day
  ) {
    return undefined;
  }
  return { year, month, day };
};

// `AAAA-MM-JJ` (attribut `dateTime` de <time>, schema.org date seule).
export const toIsoDate = (date?: string): string | undefined => {
  const parsed = parseFrenchDate(date);
  if (!parsed) return undefined;
  return `${parsed.year}-${pad2(parsed.month)}-${pad2(parsed.day)}`;
};

const PARIS_TIME_ZONE = "Europe/Paris";

// Décalage UTC de Paris (en minutes) à un instant donné, calculé via Intl pour
// ne dépendre ni du fuseau du serveur ni d'une table d'heure d'été codée en dur.
const parisOffsetMinutesAt = (instant: Date): number => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: PARIS_TIME_ZONE,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(instant);
  const get = (type: string): number =>
    Number(parts.find((part) => part.type === type)?.value ?? 0);
  const wallClockAsUtc = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour"),
    get("minute"),
    get("second")
  );
  return Math.round((wallClockAsUtc - instant.getTime()) / 60000);
};

// Décalage UTC de Paris à minuit (heure de Paris) le jour donné : `+01:00` en
// heure d'hiver, `+02:00` en heure d'été. Deux passes pour viser l'instant
// exact de minuit Paris et non minuit UTC.
export const parisUtcOffsetAtMidnight = ({
  year,
  month,
  day,
}: CalendarDate): string => {
  const midnightUtc = Date.UTC(year, month - 1, day);
  const firstGuess = parisOffsetMinutesAt(new Date(midnightUtc));
  const offsetMinutes = parisOffsetMinutesAt(
    new Date(midnightUtc - firstGuess * 60000)
  );
  const sign = offsetMinutes < 0 ? "-" : "+";
  const abs = Math.abs(offsetMinutes);
  return `${sign}${pad2(Math.floor(abs / 60))}:${pad2(abs % 60)}`;
};

// ISO 8601 complet avec heure et fuseau, minuit heure de Paris comme heure de
// référence (les actualités n'ont pas d'heure de publication) :
// `18/09/2026` → `2026-09-18T00:00:00+02:00`. Format attendu par Google pour
// `datePublished` / `dateModified` et Open Graph `article:published_time`.
export const toIsoDateTimeParis = (date?: string): string | undefined => {
  const parsed = parseFrenchDate(date);
  if (!parsed) return undefined;
  return `${toIsoDate(date)}T00:00:00${parisUtcOffsetAtMidnight(parsed)}`;
};

const RFC822_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const RFC822_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Date RFC 822 imposée par RSS 2.0 pour `pubDate`, même instant que
// `toIsoDateTimeParis` : `18/09/2026` → `Fri, 18 Sep 2026 00:00:00 +0200`.
export const toRfc822DateParis = (date?: string): string | undefined => {
  const parsed = parseFrenchDate(date);
  if (!parsed) return undefined;
  const { year, month, day } = parsed;
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  const offset = parisUtcOffsetAtMidnight(parsed).replace(":", "");
  return `${RFC822_DAYS[weekday]}, ${pad2(day)} ${RFC822_MONTHS[month - 1]} ${year} 00:00:00 ${offset}`;
};

// Date longue en français pour l'affichage : `18/09/2026` → « 18 septembre 2026 ».
// Tolère les mêmes variantes que `parseFrenchDate` ; undefined si invalide.
export const formatDateAsFrenchText = (date?: string): string | undefined => {
  const parsed = parseFrenchDate(date);
  if (!parsed) return undefined;
  return format(
    new Date(parsed.year, parsed.month - 1, parsed.day),
    "d MMMM yyyy",
    { locale: fr }
  );
};
