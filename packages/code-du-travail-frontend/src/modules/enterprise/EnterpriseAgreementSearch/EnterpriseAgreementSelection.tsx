"use client";
import { fr } from "@codegouvfr/react-dsfr";
import Card from "@codegouvfr/react-dsfr/Card";
import Button from "@codegouvfr/react-dsfr/Button";
import { Enterprise } from "../types";
import { CardTitleStyle } from "../../convention-collective/style";
import { css } from "@styled-system/css";
import { useSearchParams } from "next/navigation";
import { useEnterpriseAgreementSearchTracking } from "./tracking";
import { useEffect, useRef } from "react";

type Props = {
  enterprise: Omit<Enterprise, "complements">;
  widgetMode?: boolean;
};

export const EnterpriseAgreementSelection = ({
  enterprise,
  widgetMode = false,
}: Props) => {
  const searchParams = useSearchParams();
  const { emitSelectEnterpriseAgreementEvent } =
    useEnterpriseAgreementSearchTracking();

  const resultRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    resultRef.current?.focus();
  }, []);
  return (
    <>
      <h2
        className={fr.cx("fr-h4", "fr-mt-2w", "fr-mb-0")}
        tabIndex={-1}
        ref={resultRef}
      >
        {enterprise.conventions.length === 0 ? (
          <>
            Aucune convention collective n&apos;a été déclarée pour
            l&apos;entreprise
          </>
        ) : enterprise.conventions.length === 1 ? (
          <>1 convention collective trouvée pour&nbsp;:</>
        ) : (
          <>
            {enterprise.conventions.length} conventions collectives trouvées
            pour&nbsp;:
          </>
        )}
      </h2>
      <p className={fr.cx("fr-text--bold", "fr-m-0", "fr-mt-2w")}>
        {enterprise.label}
      </p>
      {enterprise.activitePrincipale && (
        <p className={fr.cx("fr-m-0")}>
          Activité&nbsp;: {enterprise.activitePrincipale}
        </p>
      )}
      <p className={fr.cx("fr-mb-2w")}>{enterprise.address}</p>
      {enterprise.conventions?.map((agreement) => {
        const { slug, url, contributions } = agreement;
        let disabled = false;
        let description;
        if (slug && !(url || contributions)) {
          description =
            "Nous n’avons pas d’informations concernant cette convention collective";
          disabled = true;
        } else if (!slug) {
          description =
            "Cette convention collective déclarée par l’entreprise n’est pas reconnue par notre site";
          disabled = true;
        } else {
          description =
            "Retrouvez les questions-réponses les plus fréquentes organisées par thème et élaborées par le Ministère du travail concernant cette convention collective";
        }
        return (
          <Card
            key={agreement.id}
            className={fr.cx("fr-mt-2w")}
            linkProps={{
              ...(!disabled
                ? {
                    href: `/convention-collective/${agreement.slug}`,
                    onClick: () => {
                      emitSelectEnterpriseAgreementEvent(`idcc${agreement.id}`);
                    },
                  }
                : {
                    href: "#",
                    onClick: (ev) => {
                      ev.preventDefault();
                    },
                  }),
              ...(widgetMode
                ? {
                    target: "_blank",
                    onClick: (ev) => {
                      if (disabled) ev.preventDefault();
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
                    },
                  }
                : {}),
            }}
            border
            enlargeLink
            size="large"
            desc={description}
            title={`${agreement.shortTitle} IDCC ${agreement.id}`}
            classes={{
              title: `${fr.cx("fr-h5")} ${CardTitleStyle} ${disabled ? disabledTitle : ""}`,
              content: `${fr.cx("fr-px-2w", "fr-pt-1w", "fr-pb-7v")} ${disabled ? disabledContent : ""}`,
              desc: fr.cx("fr-mt-1w", "fr-mr-8w"),
              end: fr.cx("fr-hidden"),
              root: `${disabled ? disabledRoot : ""}`,
            }}
          />
        );
      })}

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
