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
  const title = getText(data.children[0]);
  if (!data.attributes.URL) {
    return <p>{title}</p>;
  }
  const url = cleanUrl(data.attributes.URL);
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
