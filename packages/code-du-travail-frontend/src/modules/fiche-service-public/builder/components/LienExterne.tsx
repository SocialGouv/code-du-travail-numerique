import React from "react";

import { getInChildrenByName, getText } from "../utils";
import Link from "next/link";
import {
  FicheSPDataLienExterne,
  FicheSPDataLienExterneCommente,
} from "../type";

export const LienExterneCommente = ({
  data,
}: {
  data: FicheSPDataLienExterneCommente;
}) => {
  const commentaire = getInChildrenByName(data, "Commentaire");
  const lienExterne = getInChildrenByName(
    data,
    "LienExterne"
  ) as FicheSPDataLienExterne;

  if (!lienExterne || !commentaire) return <></>;
  return (
    <>
      <p>{getText(commentaire)}</p>
      <p>
        <LienExterne data={lienExterne} />
      </p>
    </>
  );
};
export const cleanUrl = (url: string): string => {
  if (url.includes("code.travail.gouv.fr")) {
    return url.split("?")[0];
  }
  return url;
};

export const LienExterne = ({ data }: { data: FicheSPDataLienExterne }) => {
  const url = cleanUrl(data.attributes.URL);
  const label = getText(data);
  return (
    <Link href={url} rel="noopener noreferrer" target="_blank">
      {label}
    </Link>
  );
};
