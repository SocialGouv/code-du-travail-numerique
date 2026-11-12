import React from "react";

import { getText } from "../utils";

import { fr } from "@codegouvfr/react-dsfr";
import { FicheSPDataServiceEnLigne } from "../type";
import { cleanUrl } from "./LienExterne";
import Link from "../../../common/Link";

// Le SP renvoie ce bouton vers la contribution sur laquelle il est affiché
// (boucle) : on le redirige vers le simulateur d'indemnité de départ à la retraite.
export const INDEMNITE_RETRAITE_CONTRIBUTION_URL =
  "https://code.travail.gouv.fr/contribution/a-quelles-indemnites-peut-pretendre-un-salarie-qui-part-a-la-retraite";
export const INDEMNITE_RETRAITE_SIMULATOR_PATH = "/outils/indemnite-retraite";

export const ServiceEnLigne = ({
  data,
}: {
  data: FicheSPDataServiceEnLigne;
}) => {
  const title = getText(data.children[0]);
  if (!data.attributes.URL) {
    return <p>{title}</p>;
  }
  const url = cleanUrl(data.attributes.URL);
  if (url === INDEMNITE_RETRAITE_CONTRIBUTION_URL) {
    return (
      <div>
        <Link
          className={fr.cx("fr-btn", "fr-btn--secondary", "fr-mb-4w")}
          href={INDEMNITE_RETRAITE_SIMULATOR_PATH}
        >
          {title}
        </Link>
      </div>
    );
  }
  return (
    <div>
      <Link
        className={fr.cx("fr-btn", "fr-btn--secondary", "fr-mb-4w")}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {title}
      </Link>
    </div>
  );
};

export default ServiceEnLigne;
