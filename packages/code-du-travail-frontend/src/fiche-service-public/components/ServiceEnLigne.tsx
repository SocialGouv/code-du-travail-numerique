import React from "react";

import { getText } from "../utils";
import Link from "next/link";
import { fr } from "@codegouvfr/react-dsfr";
import { FicheSPDataServiceEnLigne } from "../type";

export const ServiceEnLigne = ({
  data,
}: {
  data: FicheSPDataServiceEnLigne;
}) => {
  const url = data.attributes.URL;
  const title = getText(data.children[0]);
  return (
    <Link
      className={fr.cx("fr-btn", "fr-my-2w")}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {title}
    </Link>
  );
};

export default ServiceEnLigne;
