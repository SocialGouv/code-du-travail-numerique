import { toIsoDate, toIsoDateTimeParis } from "../utils/date";

const toIsoInstant = (value?: string): string | undefined =>
  value && !isNaN(Date.parse(value))
    ? new Date(value).toISOString()
    : undefined;

// Date de publication d'une actualité (ISO 8601) : l'instant de sa première
// publication (`publishedAt`, renseigné par l'admin et conservé ensuite) ou, à
// défaut (actualité publiée avant), la date affichée (`dd/MM/yyyy`) à minuit
// heure de Paris. Même instant que le sitemap généré par l'admin.
export const getNewsPublishedTime = (
  date?: string,
  publishedAt?: string
): string | undefined => toIsoInstant(publishedAt) ?? toIsoDateTimeParis(date);

// Date de dernière modification d'une actualité : la plus récente entre sa
// date de publication et `updatedAt` (ISO 8601, dernière modification dans
// l'admin).
export const getNewsModifiedTime = (
  date?: string,
  updatedAt?: string,
  publishedAt?: string
): string | undefined => {
  const published = getNewsPublishedTime(date, publishedAt);
  const updated = toIsoInstant(updatedAt);
  if (!published) return updated;
  if (!updated) return published;
  return Date.parse(updated) > Date.parse(published) ? updated : published;
};

// Jour calendaire à Paris (`dd/MM/yyyy`) d'un instant ISO 8601.
const toParisDisplayDate = (instant: string): string => {
  const parts = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(new Date(instant));
  const get = (type: string) => parts.find((p) => p.type === type)?.value;
  return `${get("day")}/${get("month")}/${get("year")}`;
};

// Date affichée dans l'interface (`dd/MM/yyyy`) : le jour de première
// publication (`publishedAt`, jour calendaire à Paris) ou, à défaut
// (actualité publiée avant), la date saisie dans l'admin.
export const getNewsDisplayDate = (
  date?: string,
  publishedAt?: string
): string | undefined => {
  const instant = toIsoInstant(publishedAt);
  return instant ? toParisDisplayDate(instant) : date;
};

// Date de mise à jour affichée (`dd/MM/yyyy`) : le jour de `updatedAt`
// (jour calendaire à Paris), seulement s'il est postérieur au jour de
// publication affiché. Une modification le jour même, une date de
// modification absente ou invalide n'affiche rien.
export const getNewsUpdatedDisplayDate = (
  date?: string,
  updatedAt?: string,
  publishedAt?: string
): string | undefined => {
  const instant = toIsoInstant(updatedAt);
  if (!instant) return undefined;
  const updated = toParisDisplayDate(instant);
  const updatedDay = toIsoDate(updated);
  const publishedDay = toIsoDate(getNewsDisplayDate(date, publishedAt));
  if (!updatedDay || !publishedDay) return undefined;
  // `AAAA-MM-JJ` : l'ordre lexicographique est l'ordre chronologique.
  return updatedDay > publishedDay ? updated : undefined;
};
