import React from "react";

import { getText } from "../utils";

export const LienExterneCommente = ({ data }) => {
  const commentaire = data.children.find(
    (child) => child.name === "Commentaire"
  );
  const lienExterne = data.children.find(
    (child) => child.name === "LienExterne"
  );
  return (
    <>
      {getText(commentaire)}
      <p>
        <LienExterne data={lienExterne} />
      </p>
    </>
  );
};
export const LienExterne = ({ data }) => {
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
