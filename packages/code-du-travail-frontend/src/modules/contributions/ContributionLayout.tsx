"use client";
import React, { useState } from "react";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { css } from "../../../styled-system/css";
import { fr } from "@codegouvfr/react-dsfr";
import { RelatedItem } from "../documents";
import { RelatedItems } from "../common/RelatedItems";
import { Share } from "../common/Share";
import { Feedback } from "../layout/feedback";
import Image from "next/image";
import AgreementSearch from "../convention-collective/AgreementSearch.svg";

import { AgreementSearchForm } from "../convention-collective/AgreementSearch/AgreementSearchForm";
import { EnterpriseAgreement } from "../enterprise";
import Card from "@codegouvfr/react-dsfr/Card";
import { ElasticAgreement } from "@socialgouv/cdtn-types";

type Props = {
  metaDescription: string;
  date: string;
  relatedItems: { items: RelatedItem[]; title: string }[];
  title: string;
  slug: string;
  agreement?: Pick<ElasticAgreement, "num" | "shortTitle">;
};

export function ContributionLayout({
  metaDescription,
  date,
  relatedItems,
  title,
  slug,
  agreement,
}: Props) {
  console.log("agreement", agreement);
  const isGeneric = !agreement;
  const [displayContent, setDisplayContent] = useState(false);
  const [selectedAgreement, setSelectedAgreement] =
    useState<EnterpriseAgreement>();
  return (
    <div className={fr.cx("fr-grid-row--gutters", "fr-my-4w", "fr-my-md-12w")}>
      <h1 className={fr.cx("fr-mb-6w")}>{title}</h1>
      <p>Mis à jour le&nbsp;: {date}</p>
      <div className={`${fr.cx("fr-p-3w")} ${block}`}>
        {isGeneric ? (
          <>
            <div className={"fr-grid-row"}>
              <Image
                priority
                src={AgreementSearch}
                alt="Personnalisez la réponse avec votre convention collective"
                className={fr.cx("fr-unhidden-md", "fr-hidden")}
              />
              <h1 className={fr.cx("fr-h3", "fr-mt-1w", "fr-mb-1w")}>
                Personnalisez la réponse avec votre convention collective
              </h1>
            </div>
            <div>
              <AgreementSearchForm
                onAgreementSelect={setSelectedAgreement}
              ></AgreementSearchForm>
              <Button
                className={fr.cx("fr-mt-2w")}
                linkProps={{
                  href: selectedAgreement
                    ? `/contribution/${selectedAgreement?.num}-${slug}`
                    : "",
                  onClick: (ev) => {
                    if (!selectedAgreement) {
                      ev.preventDefault();
                      setDisplayContent(true);
                    }
                  },
                }}
              >
                Afficher les informations
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className={"fr-grid-row"}>
              <h1 className={fr.cx("fr-h3", "fr-mt-1w", "fr-mb-1w")}>
                Réponse personnalisée pour la convention collective
              </h1>
            </div>
            <Card
              title={agreement?.shortTitle}
              size="small"
              className={fr.cx("fr-mt-2w")}
              classes={{
                content: fr.cx("fr-p-2w"),
                start: fr.cx("fr-m-0"),
                end: fr.cx("fr-p-0", "fr-m-0"),
              }}
            ></Card>
          </>
        )}
      </div>
      <div className={fr.cx("fr-grid-row")}>
        <div
          className={fr.cx(
            "fr-col-12",
            "fr-col-md-7",
            "fr-mb-6w",
            "fr-mb-md-0"
          )}
        >
          <Button
            className={
              !displayContent ? fr.cx("fr-unhidden") : fr.cx("fr-hidden")
            }
            priority="tertiary no outline"
            onClick={() => setDisplayContent(true)}
          >
            Afficher les informations sans sélectionner une convention
            collective
          </Button>
          <div
            className={
              displayContent ? fr.cx("fr-unhidden") : fr.cx("fr-hidden")
            }
          >
            MyContent
          </div>
          <Feedback></Feedback>
        </div>

        <div
          className={fr.cx("fr-col-12", "fr-col-offset-md-1", "fr-col-md-4")}
        >
          <RelatedItems relatedItems={relatedItems} />
          <Share title={title} metaDescription={metaDescription} />
        </div>
      </div>
    </div>
  );
}

const block = css({
  background: "var(--background-alt-blue-cumulus) !important",
});
