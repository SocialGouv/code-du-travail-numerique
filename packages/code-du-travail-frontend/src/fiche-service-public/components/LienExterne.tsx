import React from "react";

import { getInChildrenByName, getText } from "../utils";
import { FicheSPDataElement } from "./ElementBuilder";

export const LienExterneCommente = ({ data }: { data: FicheSPDataElement }) => {
  const commentaire = getInChildrenByName(data, "Commentaire");
  const lienExterne = getInChildrenByName(data, "LienExterne");

  if (!lienExterne || !commentaire) return <></>;
  return (
    <>
      {getText(commentaire)}
      <p>
        <LienExterne data={lienExterne} />
      </p>
    </>
  );
};
export const LienExterne = ({ data }: { data: any }) => {
  const url = data.attributes.URL;
  const label = getText(data);
  return (
    <a
      href={url}
      rel="noopener noreferrer"
      target="_blank"
      aria-label={`${label} (nouvelle fenêtre)`}
    >
      {label}
    </a>
  );
};
