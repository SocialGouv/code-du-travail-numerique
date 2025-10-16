"use client";
import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import { Enterprise } from "../types";
import Card from "@codegouvfr/react-dsfr/Card";
import { css } from "@styled-system/css";
import { useSearchParams } from "next/navigation";
import { EnterpriseAgreementSelectionDetail } from "./EnterpriseAgreementSelectionDetail";
import { getEnterpriseAgreements } from "./utils";
import { CardTitleStyle } from "../../convention-collective/style";
import { useEnterpriseAgreementSearchTracking } from "./tracking";
import { TrackingAgreementSearchAction } from "../../convention-collective/tracking";
import { Agreement } from "src/modules/outils/indemnite-depart/types";
import { AccessibleAlert } from "src/modules/outils/common/components/AccessibleAlert";

type Props = {
  enterprise: Omit<Enterprise, "complements">;
  widgetMode?: boolean;
  onAgreementSelect?: (agreement: Agreement) => void;
  level: 2 | 3;
};

export const EnterpriseAgreementSelectionLink = ({
  enterprise,
  widgetMode = false,
  onAgreementSelect,
  level,
}: Props) => {
  const searchParams = useSearchParams();
  const { emitSelectEnterpriseAgreementEvent } =
    useEnterpriseAgreementSearchTracking();
  const agreementPlurial = enterprise.conventions.length > 1 ? "s" : "";
  return (
    <>
      <EnterpriseAgreementSelectionDetail
        enterprise={enterprise}
        level={level}
      />
      {enterprise.conventions.length > 0 && (
        <p className={fr.cx("fr-h4", "fr-mt-2w", "fr-mb-0")}>
          {enterprise.conventions.length} convention
          {agreementPlurial} collective
          {agreementPlurial} trouvée
          {agreementPlurial}&nbsp;:
        </p>
      )}
      {enterprise.conventions.length === 0 && (
        <AccessibleAlert
          title="Votre entreprise n'a pas renseigné de convention collective"
          description="Pour plus d'informations, veuillez vous rapprocher de votre entreprise."
          severity="info"
        />
      )}
      {getEnterpriseAgreements(enterprise.conventions).map(
        ({ disabled, description, ...agreement }) => {
          return (
            <Card
              key={agreement.id}
              className={fr.cx("fr-mt-2w")}
              linkProps={{
                ...(!disabled
                  ? !onAgreementSelect
                    ? {
                        target: widgetMode ? "_blank" : "auto",
                        href: `/convention-collective/${agreement.slug}`,
                        onClick: () => {
                          emitSelectEnterpriseAgreementEvent(
                            `idcc${agreement.num}`,
                            TrackingAgreementSearchAction.AGREEMENT_SEARCH
                          );
                          if (widgetMode) {
                            window.parent?.postMessage(
                              {
                                name: "agreement",
                                kind: "select",
                                extra: {
                                  idcc: agreement.num,
                                  title: agreement.title,
                                },
                              },
                              "*"
                            );
                          }
                        },
                      }
                    : {
                        href: "#",
                        onClick: () => {
                          emitSelectEnterpriseAgreementEvent(
                            `idcc${agreement.num}`,
                            TrackingAgreementSearchAction.AGREEMENT_SEARCH
                          );
                          onAgreementSelect(agreement);
                        },
                      }
                  : {
                      href: "#",
                      onClick: (ev) => {
                        ev.preventDefault();
                      },
                    }),
              }}
              border
              enlargeLink
              size="large"
              desc={description}
              title={`${agreement.shortTitle} IDCC ${agreement.id}`}
              classes={{
                title: `${fr.cx("fr-h5")} ${CardTitleStyle} ${disabled ? disabledTitle : ""}`,
                content: `${fr.cx("fr-px-2w", "fr-pt-1w", "fr-pb-7v")} ${disabled ? disabledContent : ""}`,
                desc: fr.cx("fr-mt-1w", "fr-mr-6w"),
                end: fr.cx("fr-hidden"),
                root: `${disabled ? disabledRoot : ""}`,
              }}
            />
          );
        }
      )}
      <div className={fr.cx("fr-mt-2w")}>
        <Button
          linkProps={{
            href: widgetMode
              ? `/widgets/convention-collective?${searchParams?.toString()}`
              : `/outils/convention-collective/entreprise?${searchParams?.toString()}`,
          }}
          priority="secondary"
          iconId="fr-icon-arrow-left-line"
        >
          Précédent
        </Button>
      </div>
    </>
  );
};

const disabledRoot = css({
  "&:hover": {
    backgroundColor: "unset",
  },
  color: `var(--text-disabled-grey) !important`,
});

const disabledTitle = css({
  "& a,button": {
    color: `var(--text-disabled-grey) !important`,
    cursor: "not-allowed !important",
    _before: {
      cursor: "not-allowed",
    },
  },
});

const disabledContent = css({
  cursor: "not-allowed",
});
