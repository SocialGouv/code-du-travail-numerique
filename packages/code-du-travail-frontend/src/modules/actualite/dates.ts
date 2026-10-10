import { toIsoDateTimeParis } from "../utils/date";

// Date de dernière modification d'une actualité : la plus récente entre la
// date affichée (`dd/MM/yyyy`, minuit heure de Paris) et `updatedAt` (ISO 8601,
// dernière modification dans l'admin).
export const getNewsModifiedTime = (
  date?: string,
  updatedAt?: string
): string | undefined => {
  const published = toIsoDateTimeParis(date);
  const updated =
    updatedAt && !isNaN(Date.parse(updatedAt))
      ? new Date(updatedAt).toISOString()
      : undefined;
  if (!published) return updated;
  if (!updated) return published;
  return Date.parse(updated) > Date.parse(published) ? updated : published;
};
