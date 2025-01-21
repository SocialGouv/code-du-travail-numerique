import {
  ElasticSearchContributionConventionnelle,
  ElasticSearchContributionGeneric,
} from "@socialgouv/cdtn-types";
import React from "react";
import { A11yLink } from "../../common/A11yLink";

import DisplayContentContribution, {
  ContentSP,
  numberLevel,
} from "./DisplayContentContribution";
import { getLabelBySource } from "@socialgouv/cdtn-utils";
import { fr } from "@codegouvfr/react-dsfr";

type Props = {
  contribution:
    | ElasticSearchContributionGeneric
    | ElasticSearchContributionConventionnelle;
  titleLevel: numberLevel;
};

export const ContributionContent = ({ contribution, titleLevel }: Props) => {
  if (contribution.type === "generic-no-cdt") return <></>;
  const isFicheSP = "raw" in contribution;

  return (
    <section>
      {isFicheSP ? (
        <>
          <div>
            <div className={fr.cx("fr-mb-2w")}>
              {contribution.url && (
                <span>
                  Source&nbsp;:{" "}
                  <A11yLink
                    href={contribution.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {`Fiche: ${getLabelBySource("fiches_service_public")}`}
                  </A11yLink>
                </span>
              )}
              {contribution.url && contribution.date && (
                <span aria-hidden="true">&nbsp;-&nbsp;</span>
              )}
              {contribution.date && (
                <span>Mis à jour le&nbsp;: {contribution.date}</span>
              )}
            </div>
            <ContentSP raw={contribution.raw} titleLevel={titleLevel - 2} />
          </div>
        </>
      ) : (
        <DisplayContentContribution
          content={contribution.content}
          titleLevel={titleLevel}
        />
      )}
    </section>
  );
};
