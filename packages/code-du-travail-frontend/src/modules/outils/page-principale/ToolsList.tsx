import { fr } from "@codegouvfr/react-dsfr";
import React from "react";

import { ToolTile } from "./ToolTile";
import { ContainerWithBreadcrumbs } from "../../layout/ContainerWithBreadcrumbs";
import { Tool } from "@socialgouv/cdtn-types";
// Type pour les outils externes qui ont une propriété url
type ExternalTool = Partial<Tool> & {
  url?: string;
};

type ToolsListProps = {
  cdtnSimulators: Partial<Tool>[];
  externalTools?: ExternalTool[];
};

export const ToolsList = ({
  cdtnSimulators = [],
  externalTools = [],
}: ToolsListProps) => {
  const allTools = [
    ...cdtnSimulators.map((tool) => ({
      ...tool,
      link: `/outils/${tool.slug}`,
      isExternal: false,
    })),
    ...externalTools.map((tool) => ({
      ...tool,
      isExternal: true,
      link: tool.url,
    })),
  ];

  return (
    <ContainerWithBreadcrumbs currentPage="Simulateurs" breadcrumbs={[]}>
      <h1 id="tools" className={fr.cx("fr-mt-0", "fr-mb-4w")}>
        Simulateurs
      </h1>

      <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
        {allTools.map(
          ({ id, description, metaDescription, icon, title, link }) => (
            <div
              key={id}
              className={fr.cx(
                "fr-col-12",
                "fr-col-sm-6",
                "fr-col-md-4",
                "fr-col-lg-3",
                "fr-mb-4w"
              )}
            >
              <ToolTile
                title={title}
                description={description ?? metaDescription}
                iconName={icon}
                link={link}
              />
            </div>
          )
        )}
      </div>
    </ContainerWithBreadcrumbs>
  );
};
