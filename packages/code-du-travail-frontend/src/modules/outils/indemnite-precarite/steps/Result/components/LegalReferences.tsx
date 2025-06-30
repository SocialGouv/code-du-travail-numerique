import React from "react";
import { fr } from "@codegouvfr/react-dsfr";

type Reference = {
  article: string;
  url?: string;
};

type Props = {
  references: Reference[];
};

const LegalReferences: React.FC<Props> = ({ references }) => {
  if (!references || references.length === 0) return null;

  return (
    <div className={fr.cx("fr-mt-4w")}>
      <h3 className={fr.cx("fr-h5")}>Références juridiques</h3>
      <div className={fr.cx("fr-card", "fr-mb-3w")}>
        <div className={fr.cx("fr-card__body")}>
          <h4 className={fr.cx("fr-card__title")}>📚 Références légales</h4>
          <ul>
            {references.map((ref, index) => (
              <li key={index}>
                {ref.url ? (
                  <a href={ref.url} target="_blank" rel="noopener noreferrer">
                    {ref.article}
                  </a>
                ) : (
                  ref.article
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LegalReferences;
