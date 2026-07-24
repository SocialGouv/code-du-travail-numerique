import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { Breadcrumb as BreadcrumbType } from "@socialgouv/cdtn-types";
import { ThemeTags } from "./ThemeTags";
import { SourceData } from "../layout/SourceData";

type Props = {
  breadcrumbs: BreadcrumbType[];
  date?: string;
  source?: { url: string; name: string };
};

// Bloc méta commun aux pages de contenu : date « Mis à jour le » (optionnelle,
// éventuellement avec sa source) suivie des tags thème/sous-thème. Centralise
// l'ordre (date → tags) et le rythme d'espacement pour qu'ils soient identiques
// partout (modèles, infos, infographies, fiches, contributions).
export const ContentMeta = ({ breadcrumbs, date, source }: Props) => (
  <div className={fr.cx("fr-mt-6w", "fr-mb-6w")}>
    {date &&
      (source ? (
        <SourceData
          source={source}
          updatedAt={date}
          className={fr.cx("fr-mb-2w")}
        />
      ) : (
        <p className={fr.cx("fr-mb-2w")}>Mis à jour le&nbsp;: {date}</p>
      ))}
    <ThemeTags breadcrumbs={breadcrumbs} />
  </div>
);
