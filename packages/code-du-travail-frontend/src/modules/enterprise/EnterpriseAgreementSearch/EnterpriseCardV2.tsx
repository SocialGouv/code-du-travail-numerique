import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { cx } from "@styled-system/css";
import { MatchingEtablissement } from "src/api/modules/enterprises/types";

const MAX_ETABLISSEMENTS_DISPLAY = 5;

function formatSiret(siret: string): string {
  return siret.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, "$1 $2 $3 $4");
}

export type EnterpriseCardV2Props = {
  title: string;
  activitePrincipale?: string;
  etablissementsCount: number;
  matchingEtablissements: MatchingEtablissement[];
  onEtablissementClick: (etablissement: MatchingEtablissement) => void;
  titleAs?: `h${2 | 3 | 4 | 5 | 6}`;
};

export const EnterpriseCardV2: React.FC<EnterpriseCardV2Props> = ({
  title,
  activitePrincipale,
  etablissementsCount,
  matchingEtablissements,
  onEtablissementClick,
  titleAs: HtmlTitleTag = "h3",
}) => {
  const tooMany = etablissementsCount > MAX_ETABLISSEMENTS_DISPLAY;

  return (
    <div className={fr.cx("fr-card", "fr-card--no-border")} style={{ borderLeft: "4px solid var(--border-active-blue-france)", paddingLeft: 0 }}>
      <div className={fr.cx("fr-card__body")}>
        <div className={fr.cx("fr-card__content")}>
          <HtmlTitleTag className={fr.cx("fr-card__title")}>
            {title}
          </HtmlTitleTag>

          {activitePrincipale && (
            <p className={cx(fr.cx("fr-card__desc"), fr.cx("fr-text--sm"))}>
              Activité : {activitePrincipale}
            </p>
          )}

          <div
            className={fr.cx("fr-mt-1w")}
            style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}
          >
            <p className={fr.cx("fr-badge", "fr-badge--blue-france", "fr-badge--no-icon", "fr-badge--sm")}>
              {etablissementsCount} établissement{etablissementsCount > 1 ? "s" : ""}
            </p>

            {tooMany && (
              <span
                className={fr.cx("fr-text--sm")}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-default-warning)" }}
              >
                <span
                  className={fr.cx("fr-icon-warning-fill", "fr-icon--sm")}
                  aria-hidden="true"
                />
                Sélectionnez une ville ou saisissez le code SIRET (13 chiffres) pour affiner les établissements
              </span>
            )}
          </div>

          {!tooMany && matchingEtablissements.length > 0 && (
            <ul
              className={fr.cx("fr-mt-1w")}
              style={{ listStyle: "none", padding: 0, margin: 0, marginTop: "0.5rem" }}
            >
              {matchingEtablissements.map((etablissement) => (
                <li
                  key={etablissement.siret}
                  style={{ borderTop: "1px solid var(--border-default-grey)" }}
                >
                  <button
                    type="button"
                    onClick={() => onEtablissementClick(etablissement)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      width: "100%",
                      padding: "0.5rem 0",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      color: "var(--text-action-high-blue-france)",
                      font: "inherit",
                    }}
                  >
                    <span
                      className={fr.cx("fr-icon-arrow-right-line", "fr-icon--sm")}
                      aria-hidden="true"
                    />
                    <span>
                      {etablissement.address} - SIRET : {formatSiret(etablissement.siret)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
