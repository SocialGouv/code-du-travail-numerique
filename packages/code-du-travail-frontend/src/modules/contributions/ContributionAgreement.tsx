"use client";
import React from "react";
import { css } from "@styled-system/css";
import { fr } from "@codegouvfr/react-dsfr";
import { ContributionAgreementContent } from "./ContributionAgreementContent";
import { Contribution } from "./type";
import { removeCCNumberFromSlug } from "../common/utils";
import BlueCard from "../common/BlueCard";
import Card from "@codegouvfr/react-dsfr/Card";
import Button from "@codegouvfr/react-dsfr/Button";

type Props = {
  contribution: Contribution;
};

export function ContributionAgreement({ contribution }: Props) {
  const { slug, relatedItems } = contribution;

  return (
    <>
      <BlueCard>
        <p className={fr.cx("fr-h3", "fr-mt-1w")}>
          Votre convention collective
        </p>
        <Card
          title={`${contribution.ccnShortTitle} (IDCC ${contribution.idcc})`}
          size="small"
          titleAs="h2"
          className={fr.cx("fr-mt-2w")}
          classes={{
            content: fr.cx("fr-p-2w"),
            title: cardTitle,
            start: fr.cx("fr-m-0"),
            end: fr.cx("fr-p-0", "fr-m-0"),
          }}
        />
        <Button
          className={fr.cx("fr-mt-2w")}
          linkProps={{
            href: `/contribution/${removeCCNumberFromSlug(slug)}`,
          }}
          priority="secondary"
          iconId="fr-icon-arrow-go-back-line"
          iconPosition="right"
        >
          Modifier
        </Button>
      </BlueCard>

      <ContributionAgreementContent
        contribution={contribution}
        relatedItems={relatedItems}
      />
    </>
  );
}

const cardTitle = css({
  fontWeight: "normal!",
});
