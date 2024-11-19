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
  const lienExterne = getInChildrenByName(data, "LienExterne");

  if (!lienExterne || !commentaire) return <></>;
  return (
    <>
      <p>{getText(commentaire)}</p>
      <p>
        <LienExterne data={lienExterne as FicheSPDataLienExterne} />
      </p>
    </>
  );
};
export const LienExterne = ({ data }: { data: FicheSPDataLienExterne }) => {
  const url = data.attributes.URL;
  const label = getText(data);
  return (
    <Link href={url} rel="noopener noreferrer" target="_blank">
      {label}
    </Link>
  );
};
