import { fr } from "@codegouvfr/react-dsfr";
import React from "react";

import { ToolTile } from "./ToolTile";
import { ContainerWithBreadcrumbs } from "../../layout/ContainerWithBreadcrumbs";
import { Tool } from "@socialgouv/cdtn-types";

type ToolsListProps = {
  cdtnSimulators: Partial<Tool>[];
};

export const ToolsList = ({ cdtnSimulators = [] }: ToolsListProps) => {
  return (
    <ContainerWithBreadcrumbs currentPage="Simulateurs" breadcrumbs={[]}>
      <h1 id="tools" className={fr.cx("fr-mt-0", "fr-mb-4w")}>
        Simulateurs
      </h1>

      <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
        {cdtnSimulators.map(
          ({ id, description, metaDescription, icon, slug, title }) => {
            const link = `/outils/${slug}`;
            return (
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
            );
          }
        )}
      </div>
    </ContainerWithBreadcrumbs>
  );
};
