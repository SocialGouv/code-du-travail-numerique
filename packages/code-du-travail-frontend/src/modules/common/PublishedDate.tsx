import React from "react";
import { formatDateAsFrenchText, toIsoDate } from "../utils/date";

type Props = {
  // Date au format admin `JJ/MM/AAAA` (variantes tolérées, cf. parseFrenchDate).
  date?: string;
  className?: string;
};

// « Publié le 18 septembre 2026 » avec la date portée par une balise <time>
// (attribut dateTime ISO 8601) pour les moteurs et les technologies
// d'assistance. Le libellé reste hors de <time>. Rien n'est affiché si la date
// est absente ou invalide : ni « Publié le » orphelin, ni « Invalid Date ».
// Le <span> évite que le texte et <time> deviennent des éléments flex séparés
// (ex. `fr-card__detail` est en display:flex) et que l'espace soit supprimé.
export const PublishedDate = ({ date, className }: Props) => {
  const isoDate = toIsoDate(date);
  const text = formatDateAsFrenchText(date);
  if (!isoDate || !text) return null;

  return (
    <p className={className}>
      <span>
        Publié le <time dateTime={isoDate}>{text}</time>
      </span>
    </p>
  );
};
