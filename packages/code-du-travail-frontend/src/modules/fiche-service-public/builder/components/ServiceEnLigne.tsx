import React from "react";

import { getText } from "../utils";
import Link from "next/link";
import { fr } from "@codegouvfr/react-dsfr";
import { FicheSPDataServiceEnLigne } from "../type";
import { cleanUrl } from "./LienExterne";

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
        className={fr.cx("fr-btn", "fr-btn--secondary", "fr-mb-2w")}
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
