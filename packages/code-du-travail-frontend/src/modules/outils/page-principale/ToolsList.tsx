import { fr } from "@codegouvfr/react-dsfr";
import React from "react";

import { ToolTile } from "./ToolTile";
import { ContainerWithBreadcrumbs } from "../../layout/ContainerWithBreadcrumbs";
import { ToolItem } from "../../../../app/outils/page";

type ToolsListProps = {
  tools: ToolItem[];
  externalTools: ToolItem[];
};

export const ToolsList = ({ tools, externalTools }: ToolsListProps) => {
  return (
    <ContainerWithBreadcrumbs currentPage="Simulateurs" breadcrumbs={[]}>
      <h1 className={fr.cx("fr-sr-only")}>
        Liste des simulateurs et des services
      </h1>

      <h2 id="tools" className={fr.cx("fr-mt-0", "fr-mb-6w")}>
        Simulateurs
      </h2>

      <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters", "fr-mb-2w")}>
        {tools.map(({ id, description, metaDescription, icon, title, url }) => (
          <div
            key={id}
            className={fr.cx(
              "fr-col-12",
              "fr-col-sm-6",
              "fr-col-md-4",
              "fr-col-lg-3",
              "fr-mb-3w"
            )}
          >
            <ToolTile
              title={title}
              description={description ?? metaDescription}
              iconName={icon}
              link={url}
              isExternal={false}
              level="h3"
            />
          </div>
        ))}
      </div>

      <h2 id="externalTools" className={fr.cx("fr-mt-0", "fr-mb-6w", "fr-h1")}>
        Services et sites
      </h2>

      <div
        className={fr.cx("fr-grid-row", "fr-grid-row--gutters", "fr-mb-12w")}
      >
        {externalTools.map(
          ({ id, description, metaDescription, icon, title, url }) => (
            <div
              key={id}
              className={fr.cx(
                "fr-col-12",
                "fr-col-sm-6",
                "fr-col-md-4",
                "fr-col-lg-3",
                "fr-mb-3w"
              )}
            >
              <ToolTile
                title={title}
                description={description ?? metaDescription}
                iconName={icon}
                link={url}
                isExternal={true}
                level="h3"
              />
            </div>
          )
        )}
      </div>
    </ContainerWithBreadcrumbs>
  );
};
