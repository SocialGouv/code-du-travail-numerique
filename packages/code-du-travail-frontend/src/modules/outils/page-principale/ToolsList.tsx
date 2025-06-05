import { fr } from "@codegouvfr/react-dsfr";
import React from "react";

import { ToolTile } from "./ToolTile";
import { ContainerWithBreadcrumbs } from "../../layout/ContainerWithBreadcrumbs";
import { ToolItem } from "../../../../app/outils/page";

type ToolsListProps = {
  tools: ToolItem[];
};

export const ToolsList = ({ tools }: ToolsListProps) => {
  return (
    <ContainerWithBreadcrumbs currentPage="Simulateurs" breadcrumbs={[]}>
      <h1 id="tools" className={fr.cx("fr-mt-0", "fr-mb-6w")}>
        Simulateurs
      </h1>

      <div
        className={fr.cx("fr-grid-row", "fr-grid-row--gutters", "fr-mb-12w")}
      >
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
              level="h2"
            />
          </div>
        ))}
      </div>
    </ContainerWithBreadcrumbs>
  );
};
