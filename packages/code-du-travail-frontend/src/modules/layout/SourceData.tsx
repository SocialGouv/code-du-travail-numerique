import React from "react";
import { fr } from "@codegouvfr/react-dsfr";

type Props = {
  source: {
    url: string;
    name: string;
  };
  updatedAt: string;
};

export const SourceData = ({ source, updatedAt }: Props) => (
  <p>
    Source&nbsp;:{" "}
    <a href={source.url} target="_blank" rel="noopener noreferrer">
      {source.name}
    </a>
    {/*
      On place un span dans un span car la class fr-unhidden-lg fait un display: inherit qui va récupérer le display du parent
      Si on retire le span, on va hériter du display du p qui n'est pas bon.
       */}
    <span>
      <span className={fr.cx("fr-hidden", "fr-unhidden-lg")}> - </span>
    </span>
    <br className={fr.cx("fr-unhidden", "fr-hidden-lg")} />
    Mis à jour le&nbsp;: {updatedAt}
  </p>
);
