"use client";
import React from "react";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { Card } from "@codegouvfr/react-dsfr/Card";
import { css } from "@styled-system/css";
import { fr } from "@codegouvfr/react-dsfr";
import { removeCCNumberFromSlug } from "../common/utils";

import { Contribution } from "./type";

type Props = {
  contribution: Contribution;
};

export function ContributionAgreementSelect({ contribution }: Props) {
  const { slug } = contribution;

  return (
    <>
      <div className={`${fr.cx("fr-p-3w", "fr-mt-6w")} ${block}`}>
        <div className={"fr-grid-row"}>
          <span className={fr.cx("fr-h3", "fr-mt-1w", "fr-mb-1w")}>
            Votre convention collective
          </span>
        </div>
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
      </div>
    </>
  );
}

const cardTitle = css({
  fontWeight: "normal!",
});

const block = css({
  background: "var(--background-alt-blue-cumulus) !important",
});
