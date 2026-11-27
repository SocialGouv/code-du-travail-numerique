import React from "react";
import { formatDateAsFrenchText, toIsoDate } from "../utils/date";

type Props = {
  // Date au format admin `JJ/MM/AAAA` (variantes tolérées, cf. parseFrenchDate).
  date?: string;
  // Date de mise à jour, même format ; ignorée si absente ou invalide.
  updatedDate?: string;
  className?: string;
};

// Espaces insécables dans la date : elle ne se coupe jamais sur deux lignes.
const toNonBreaking = (text: string) => text.replaceAll(" ", "\u00a0");

// « Publié le 18 septembre 2026 », suivi le cas échéant de « · Mis à jour le
// 2 octobre 2026 » sur la même ligne. Chaque date est portée par une balise
// <time> (attribut dateTime ISO 8601) pour les moteurs et les technologies
// d'assistance ; les libellés restent hors de <time>. Rien n'est affiché si la
// date de publication est absente ou invalide : ni « Publié le » orphelin, ni
// « Invalid Date ». Une date de mise à jour invalide est simplement ignorée.
// Chaque partie est dans un <span> : le texte et <time> ne deviennent pas des
// éléments flex séparés (ex. `fr-card__detail` est en display:flex) et
// l'espace n'est pas supprimé. Le séparateur garde des espaces normales : la
// ligne peut se couper entre les deux parties, jamais dans une date.
export const PublishedDate = ({ date, updatedDate, className }: Props) => {
  const isoDate = toIsoDate(date);
  const text = formatDateAsFrenchText(date);
  if (!isoDate || !text) return null;

  const updatedIsoDate = toIsoDate(updatedDate);
  const updatedText = formatDateAsFrenchText(updatedDate);

  return (
    <p className={className}>
      <span>
        Publié le <time dateTime={isoDate}>{toNonBreaking(text)}</time>
      </span>
      {updatedIsoDate && updatedText && (
        <>
          {" · "}
          <span>
            Mis à jour le{" "}
            <time dateTime={updatedIsoDate}>{toNonBreaking(updatedText)}</time>
          </span>
        </>
      )}
    </p>
  );
};
