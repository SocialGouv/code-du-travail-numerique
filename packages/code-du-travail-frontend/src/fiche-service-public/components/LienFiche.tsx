import React, { memo } from "react";
import { ElementBuilder } from "./ElementBuilder";

type ImageProps = {
  data: any;
};

function LienFicheComponent({ data }: ImageProps) {
  const id = data.attributes.ID;

  return (
    <p>
      <a href={`https://www.service-public.fr/particuliers/vosdroits/${id}`}>
        <ElementBuilder data={data.children} />
      </a>
    </p>
  );
}

export const LienFiche = memo(LienFicheComponent) as typeof LienFicheComponent;
