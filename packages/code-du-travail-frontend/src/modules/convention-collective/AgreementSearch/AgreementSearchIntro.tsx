"use client";
import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import { css } from "@styled-system/css";
import { useAgreementSearchTracking } from "../tracking";
import { useEffect } from "react";

type Props = {
  navigationUrl?: string;
};

export const AgreementSearchIntro = ({
  navigationUrl = "/outils/convention-collective",
}: Props) => {
  const {
    emitNavigateEnterpriseSearchEvent,
    emitNavigateAgreementSearchEvent,
    emitViewStepEvent,
  } = useAgreementSearchTracking();
  useEffect(() => {
    emitViewStepEvent();
  });
  return (
    <>
      <div className={`${fr.cx("fr-mt-2w", "fr-ml-md-15v")}`}>
        <p className={Paragraph}>
          La convention collective et les accords d’entreprise viennent
          compléter le Code du travail pour l&apos;adapter aux réalités des
          entreprises et des conditions de travail.
        </p>
        <p className={`${fr.cx("fr-mb-2w")} ${Paragraph}`}>
          La convention collective s’applique à toutes les entreprises et
          salariés d&apos;un même secteur d’activité. L’accord d’entreprise
          prévoit des règles propres à l&apos;entreprise et à leurs salariés.
        </p>
      </div>
      <div
        className={`${fr.cx(
          "fr-grid-row",
          "fr-grid-row--center",
          "fr-px-0",
          "fr-px-md-4w",
          "fr-px-1w",
          "fr-mt-5w",
          "fr-mb-0"
        )}`}
      >
        <Button
          className={`${fr.cx(
            "fr-px-9v",
            "fr-col-12",
            "fr-col-md-3",
            "fr-mb-md-0",
            "fr-mb-2w",
            "fr-btns-group--center"
          )}`}
          iconPosition="right"
          iconId="fr-icon-arrow-right-line"
          linkProps={{
            href: `${navigationUrl}/entreprise`,
            onClick: emitNavigateEnterpriseSearchEvent,
          }}
        >
          Je cherche mon entreprise
        </Button>
        <Button
          className={`${fr.cx(
            "fr-col-12",
            "fr-ml-md-6w",
            "fr-col-md-3",
            "fr-px-6v",
            "fr-btns-group--center"
          )}`}
          iconPosition="right"
          iconId="fr-icon-arrow-right-line"
          priority="secondary"
          linkProps={{
            href: `${navigationUrl}/convention`,
            onClick: emitNavigateAgreementSearchEvent,
          }}
        >
          Je cherche uniquement une convention collective
        </Button>
      </div>
    </>
  );
};

const Paragraph = css({
  fontSize: "18px !important",
});
