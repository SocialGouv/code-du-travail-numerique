import { fr } from "@codegouvfr/react-dsfr";
import React from "react";

import { ToolTile } from "./ToolTile";
import { ContainerWithBreadcrumbs } from "../../layout/ContainerWithBreadcrumbs";
import { Tool } from "@socialgouv/cdtn-types";

// Type pour les outils externes qui ont une URL au lieu d'un slug
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
  // Combiner les simulateurs CDTN et les outils externes dans une seule liste
  const allTools = [
    ...cdtnSimulators.map((tool) => ({
      ...tool,
      link: `/outils/${tool.slug}`,
      isExternal: false,
    })),
    ...externalTools.map((tool) => ({
      ...tool,
      link: tool.url,
      isExternal: true,
    })),
  ];

  return (
    <ContainerWithBreadcrumbs currentPage="Outils" breadcrumbs={[]}>
      <h1 id="tools" className={fr.cx("fr-mt-0", "fr-mb-4w")}>
        Outils et simulateurs
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
