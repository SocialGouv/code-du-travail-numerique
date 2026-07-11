"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { useEffect, useRef } from "react";
import { ContributionAgreementContent } from "./ContributionAgreementContent";
import { Contribution } from "./type";
import BlueCard from "../common/BlueCard";
import Button from "@codegouvfr/react-dsfr/Button";
import { removeCCNumberFromSlug } from "../utils/removeCCNumberFromSlug";
import { useRouter } from "next/navigation";
import { focusableTitle } from "../common/focusableTitle";
import { markCcPageVisited } from "./contributionUtils";

type Props = {
  contribution: Contribution;
};

// Hash ajouté par le formulaire lorsqu'il navigue vers cette page : il signale
// une arrivée « par action de l'usager » et déclenche le focus sur le titre.
// Sans ce hash (arrivée directe SEO/Google, lien partagé, reload), on ne vole
// pas le focus. Même principe que `#retour` côté page générique.
export const AGREEMENT_FOCUS_HASH = "#votre-convention-collective";

export function ContributionAgreement({ contribution }: Props) {
  const { slug, relatedItems } = contribution;
  const { push } = useRouter();
  const agreementTitleRef = useRef<HTMLParagraphElement>(null);

  // Mémorise (le temps de la session) que l'usager a consulté la page CC de
  // cette fiche, pour que la fiche générique cesse de l'y renvoyer
  // automatiquement quand il revient en arrière (fil d'Ariane, « Modifier »).
  useEffect(() => {
    markCcPageVisited(removeCCNumberFromSlug(slug));
  }, [slug]);

  useEffect(() => {
    if (window.location.hash !== AGREEMENT_FOCUS_HASH) return;
    const timer = setTimeout(() => {
      agreementTitleRef.current?.scrollIntoView({ behavior: "smooth" });
      // preventScroll : laisse le défilement fluide ci-dessus se dérouler sans
      // que la mise au focus ne le court-circuite par un saut instantané.
      agreementTitleRef.current?.focus({ preventScroll: true });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <BlueCard>
        <p
          ref={agreementTitleRef}
          className={`${fr.cx("fr-h3", "fr-mt-1w")} ${focusableTitle}`}
          tabIndex={-1}
        >
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
