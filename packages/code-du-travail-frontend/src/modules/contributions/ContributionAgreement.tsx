"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { ContributionAgreementContent } from "./ContributionAgreementContent";
import { Contribution } from "./type";
import BlueCard from "../common/BlueCard";
import Button from "@codegouvfr/react-dsfr/Button";
import { removeCCNumberFromSlug } from "../utils/removeCCNumberFromSlug";
import { useRouter } from "next/navigation";

type Props = {
  contribution: Contribution;
};

export function ContributionAgreement({ contribution }: Props) {
  const { slug, relatedItems } = contribution;
  const { push } = useRouter();

  return (
    <>
      <BlueCard>
        <p className={fr.cx("fr-h3", "fr-mt-1w")}>
          Votre convention collective
        </p>
        <div className={fr.cx("fr-card", "fr-card--sm", "fr-mt-2w")}>
          <div className={fr.cx("fr-card__body")}>
            <div className={fr.cx("fr-card__content", "fr-p-2w")}>
              <p className={`${fr.cx("fr-card__title")} fw_normal!`}>
                {contribution.ccnShortTitle} (IDCC {contribution.idcc})
              </p>
            </div>
          </div>
        </div>
        <Button
          title="Modifier la convention collective sélectionnée"
          className={fr.cx("fr-mt-2w")}
          onClick={() => {
            push(`/contribution/${removeCCNumberFromSlug(slug)}#retour`);
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
