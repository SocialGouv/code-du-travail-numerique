import { fr } from "@codegouvfr/react-dsfr";
import { Card } from "@codegouvfr/react-dsfr/Card";
import { Button } from "@codegouvfr/react-dsfr/Button";
import React, { useMemo } from "react";
import { integrationData } from "./data";
import { css } from "@styled-system/css";

export const IntegrationList = () => {
  const keys = useMemo(() => Object.keys(integrationData), []);

  return (
    <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters", "fr-mb-7w")}>
      {keys.map((key) => {
        const { shortDescription, shortTitle } = integrationData[key];
        return (
          <div
            key={key}
            className={fr.cx("fr-col-12", "fr-col-md-6", "fr-mb-4w")}
            data-testid={`integration-card-${key}`}
          >
            <Card
              background
              border
              imageUrl={`/static/assets/img/${key}.png`}
              imageAlt={`Widget ${shortTitle}`}
              title={shortTitle}
              titleAs="h2"
              desc={shortDescription}
              classes={{
                img: imgBackground,
                imgTag: img,
              }}
              footer={
                <Button
                  iconId="fr-icon-code-s-slash-line"
                  iconPosition="right"
                  linkProps={{
                    href: `/integration/${key}`,
                  }}
                  priority="primary"
                  size="small"
                >
                  Installer
                </Button>
              }
            />
          </div>
        );
      })}
    </div>
  );
};

const imgBackground = css({
  backgroundColor: "var(--background-alt-blue-cumulus)!",
  backgroundSize: "contain!",
  backgroundPosition: "center!",
  backgroundRepeat: "no-repeat!",
});

const img = css({
  width: "100%!",
  objectFit: "contain!",
});
