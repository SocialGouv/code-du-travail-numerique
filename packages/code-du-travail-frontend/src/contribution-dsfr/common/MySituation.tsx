import { fr } from "@codegouvfr/react-dsfr";
import React from "react";
import {
  ElasticSearchContributionConventionnelle,
  ElasticSearchContributionGeneric,
} from "@socialgouv/cdtn-utils";
import Button from "@codegouvfr/react-dsfr/Button";

type Props = {
  contribution:
    | ElasticSearchContributionGeneric
    | ElasticSearchContributionConventionnelle;
};
export const MySituation = ({ contribution }: Props) => {
  return (
    <div
      className="fr-card fr-card--horizontal"
      style={{
        marginBottom: fr.spacing("2w"),
        // backgroundColor: fr.colors.decisions.background.contrast.info.default,
      }}
    >
      <div className="fr-card__body">
        <div className="fr-card__content">
          <h3
            className="fr-card__title"
            style={{ color: fr.colors.decisions.text.title.blueFrance.default }}
          >
            Votre situation
          </h3>
          <div className="fr-card__desc" style={{ display: "flex",
            justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  backgroundColor:
                    fr.colors.decisions.text.title.blueFrance.default,
                  boxSizing: "border-box",
                  border: `1px solid ${fr.colors.decisions.text.title.blueFrance.default}`,
                  width: "20px",
                  height: "20px",
                  color: "white",
                  borderRadius: "12px",
                  margin: "3px 15px 3px 0px",
                  fontSize: "10px",
                }}
              >
                <svg
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  width="18"
                  height="18"
                >
                  <path
                    d="m13.815 5.194-5.929 6.739a.744.744 0 0 1-.51.232h-.022a.719.719 0 0 1-.51-.209L3.208 8.32a.699.699 0 0 1 0-.995.699.699 0 0 1 .996 0l3.103 3.103 5.442-6.183a.702.702 0 0 1 .996-.07.73.73 0 0 1 .07 1.02z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <p className={"fr-mb-0"}>
                Votre convention collective est {contribution.ccnShortTitle}{" "}
                (IDCC
                {contribution.idcc})
              </p>
            </div>
            <button className="fr-btn fr-btn--tertiary-no-outline fr-btn--icon-right">
              Modifier <span className={"fr-ml-2v"}><svg viewBox="0 0 22 22" width="16" height="16">
              <path
                d="M5.828 7l2.536 2.536L6.95 10.95 2 6l4.95-4.95 1.414 1.414L5.828 5H13a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H5.828z"></path>
            </svg></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
