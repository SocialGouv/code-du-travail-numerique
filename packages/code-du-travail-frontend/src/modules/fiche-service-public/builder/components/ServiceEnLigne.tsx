import React from "react";

import { getText } from "../utils";

import { fr } from "@codegouvfr/react-dsfr";
import { FicheSPDataServiceEnLigne } from "../type";
import { cleanUrl } from "./LienExterne";
import Link from "../../../common/Link";

export const ServiceEnLigne = ({
  data,
}: {
  data: FicheSPDataServiceEnLigne;
}) => {
  const url = cleanUrl(data.attributes.URL);
  const title = getText(data.children[0]);
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
