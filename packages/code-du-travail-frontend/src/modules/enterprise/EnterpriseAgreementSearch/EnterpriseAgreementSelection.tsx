"use client";
import { fr } from "@codegouvfr/react-dsfr";
import Card from "@codegouvfr/react-dsfr/Card";
import Button from "@codegouvfr/react-dsfr/Button";
import { Enterprise } from "../types";
import { ButtonStyle, CardTitleStyle } from "../../convention-collective/style";
import { css } from "../../../../styled-system/css";

type Props = {
  enterprise: Omit<Enterprise, "complements">;
  widgetMode?: boolean;
};

export const EnterpriseAgreementSelection = ({
  enterprise,
  widgetMode = false,
}: Props) => {
  return (
    <>
      <h2 className={fr.cx("fr-h4", "fr-mt-2w", "fr-mb-0")}>
        {enterprise.conventions.length === 0
          ? `Aucune convention collective n'a été déclarée pour l'entreprise`
          : enterprise.conventions.length === 1
            ? `1 convention collective trouvée pour :`
            : `${enterprise.conventions.length} conventions collectives trouvées pour :`}
      </h2>
      <p className={fr.cx("fr-text--bold", "fr-m-0", "fr-mt-2w")}>
        {enterprise.label}
      </p>
      <p className={fr.cx("fr-m-0")}>
        Activité : {enterprise.activitePrincipale}
      </p>
      <p className={fr.cx("fr-mb-2w")}>{enterprise.address}</p>
      {enterprise.conventions?.map((agreement) => {
        const { slug, url, contributions } = agreement;
        const disabled = !(slug && (url || contributions));
        let description;
        if (!disabled) {
          description =
            "Retrouvez les questions-réponses les plus fréquentes organisées par thème et élaborées par le Ministère du travail concernant cette convention collective";
        } else if (slug && !(url || contributions)) {
          description =
            "Nous n’avons pas d’informations concernant cette convention collective";
        } else {
          description =
            "Cette convention collective déclarée par l’entreprise n’est pas reconnue par notre site";
        }
        return (
          <Card
            key={agreement.id}
            className={fr.cx("fr-mt-2w")}
            linkProps={{
              ...(!disabled
                ? {
                    href: `/convention-collective/${agreement.slug}`,
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
            title={agreement.shortTitle}
            classes={{
              title: `${fr.cx("fr-h5")} ${CardTitleStyle} ${disabled ? disabledTitle : ""}`,
              content: `${fr.cx("fr-px-2w", "fr-pt-1w", "fr-pb-7v")} ${disabled ? disabledContent : ""}`,
              desc: fr.cx("fr-mt-1w", "fr-mr-6w"),
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
              ? "/widgets/convention-collective"
              : "/outils/convention-collective/entreprise",
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
