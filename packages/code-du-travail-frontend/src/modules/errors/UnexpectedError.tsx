import React from "react";
import { IconError } from "./IconError";
import { fr } from "@codegouvfr/react-dsfr";

export const UnexpectedError: React.FC = () => {
  return (
    <div
      className={fr.cx(
        "fr-my-7w",
        "fr-mt-md-12w",
        "fr-mb-md-10w",
        "fr-grid-row",
        "fr-grid-row--gutters",
        "fr-grid-row--middle",
        "fr-grid-row--center"
      )}
    >
      <div className={fr.cx("fr-py-0", "fr-col-12", "fr-col-md-6")}>
        <h1>Erreur inattendue</h1>
        <p className={fr.cx("fr-text--sm", "fr-mb-3w")}>Erreur 500</p>
        <p className={fr.cx("fr-text--sm", "fr-mb-5w")}>
          Désolé, le service rencontre un problème, nous travaillons pour le
          résoudre le plus rapidement possible.
        </p>
        <p className={fr.cx("fr-text--lead", "fr-mb-3w")}>
          Essayez de rafraîchir la page ou bien ressayez plus tard.
        </p>
      </div>
      <div
        className={fr.cx(
          "fr-col-12",
          "fr-col-md-3",
          "fr-col-offset-md-1",
          "fr-px-6w",
          "fr-px-md-0",
          "fr-py-0"
        )}
      >
        <IconError />
      </div>
    </div>
  );
};
