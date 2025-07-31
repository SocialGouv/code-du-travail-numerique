"use client";
import { useContext } from "react";
import { DossierLicenciementContext, useStore } from "../store";

import Button from "@codegouvfr/react-dsfr/Button";
import { SITE_URL } from "../../../../../config";
import { useRouter } from "next/navigation";
import { fr } from "@codegouvfr/react-dsfr";

export const ShowInfo = ({
  slug,
  widgetMode,
}: {
  slug: string;
  widgetMode: boolean;
}) => {
  const router = useRouter();
  const store = useContext(DossierLicenciementContext);
  const setQuestionnaireSlug = useStore(
    store,
    (state) => state.setQuestionnaireSlug
  );
  return (
    <Button
      className={fr.cx("fr-mt-1w")}
      onClick={() => {
        setQuestionnaireSlug(slug);
        const destination = `/information/${slug}#contenu`;
        if (widgetMode) {
          window.open(`${SITE_URL}${destination}`);
          return;
        }
        router.push(destination);
      }}
    >
      Afficher les informations personnalisées
    </Button>
  );
};
