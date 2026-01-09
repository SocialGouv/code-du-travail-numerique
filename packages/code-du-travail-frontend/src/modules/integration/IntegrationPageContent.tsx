import { fr } from "@codegouvfr/react-dsfr";
import React from "react";
import { IntegrationList } from "./IntegrationList";
import { ContainerWithBreadcrumbs } from "../layout/ContainerWithBreadcrumbs";

export const IntegrationPageContent = () => {
  return (
    <ContainerWithBreadcrumbs currentPage="Intégration" breadcrumbs={[]}>
      <h1
        className={fr.cx("fr-h2", "fr-mb-4w")}
        data-testid="integration-page-title"
      >
        Intégrer les contenus du Code du travail numérique
      </h1>
      <p
        className={fr.cx("fr-mb-6w")}
        data-testid="integration-page-description"
      >
        L&apos;équipe du Code du travail numérique vous propose d&apos;intégrer
        son moteur de recherche, ses modèles de courriers ainsi que certains de
        ses simulateurs sur votre site grâce à un module (widget).
      </p>

      <IntegrationList />
    </ContainerWithBreadcrumbs>
  );
};
