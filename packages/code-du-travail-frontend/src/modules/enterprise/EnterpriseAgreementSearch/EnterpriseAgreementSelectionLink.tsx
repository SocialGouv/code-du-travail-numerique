"use client";
import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import { Enterprise, EnterpriseAgreement } from "../types";
import { ButtonStyle } from "../../convention-collective/style";
import Card from "@codegouvfr/react-dsfr/Card";
import { css } from "@styled-system/css";
import { useSearchParams } from "next/navigation";
import { EnterpriseAgreementSelectionDetail } from "./EnterpriseAgreementSelectionDetail";
import { getEnterpriseAgreements } from "./utils";
import { CardTitleStyle } from "../../convention-collective/style";
import { useEnterpriseAgreementSearchTracking } from "./tracking";

type Props = {
  enterprise: Omit<Enterprise, "complements">;
  widgetMode?: boolean;
  onAgreementSelect?: (agreement: EnterpriseAgreement) => void;
};

export const EnterpriseAgreementSelectionLink = ({
  enterprise,
  widgetMode = false,
  onAgreementSelect,
}: Props) => {
  const searchParams = useSearchParams();
  const { emitSelectEnterpriseAgreementEvent } =
    useEnterpriseAgreementSearchTracking();
  return (
    <>
      <EnterpriseAgreementSelectionDetail enterprise={enterprise} />
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
                        onClick: widgetMode
                          ? (ev) => {
                              emitSelectEnterpriseAgreementEvent(
                                `idcc${agreement.id}`
                              );
                              if (disabled) ev.preventDefault();
                              else if (widgetMode) {
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
                            }
                          : () => {
                              emitSelectEnterpriseAgreementEvent(
                                `idcc${agreement.id}`
                              );
                            },
                      }
                    : {
                        href: "#",
                        onClick: (ev) => {
                          if (disabled) ev.preventDefault();
                          emitSelectEnterpriseAgreementEvent(
                            `idcc${agreement.id}`
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
          className={`${fr.cx("fr-col-12", "fr-col-md-2")} ${ButtonStyle}`}
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
