import React, { memo } from "react";

import { getText, ignoreParagraph } from "../utils.js";
import { ElementBuilder } from "./ElementBuilder";
import { MoreContent, Wrapper } from "@socialgouv/cdtn-ui";
import styled from "styled-components";

type ImageProps = {
  data: any;
};

const getCredit = (children: any[]) => {
  if (children.length < 2) return;

  const credit = children[1];
  if (credit.name !== "Credits") return;

  return <ElementBuilder data={ignoreParagraph(credit)} />;
};
const getTexteDeRemplacement = (children: any[]) => {
  if (children.length < 4) return;

  const texteDeRemplacement = children[2];
  if (texteDeRemplacement.name !== "TexteDeRemplacement") return;

  return <ElementBuilder data={children[3]} />;
};

function ImageComponent({ data }: ImageProps) {
  const name = data.attributes.LienPublication;
  const legend = data.children[0];
  if (legend.name !== "Legende") return null;
  const legendText = getText(legend.children);

  const creditText = getCredit(data.children);
  const texteDeRemplacement = getTexteDeRemplacement(data.children);

  return (
    <>
      <Figure role="group" aria-label={legendText}>
        <img
          src={`https://www.service-public.fr/webapp/images/vdd/extralarge/${name}`}
          alt={legendText}
        />
        <Figcaption>
          {creditText && <span>Crédits : {creditText}</span>}
        </Figcaption>
      </Figure>
      {texteDeRemplacement && (
        <MoreContent noLeftPadding title="Voir en détail">
          <Wrapper variant="dark">{texteDeRemplacement}</Wrapper>
        </MoreContent>
      )}
    </>
  );
}

export const Image = memo(ImageComponent) as typeof ImageComponent;

const Figure = styled.figure`
  img {
    max-width: 100%;
  }
`;

const Figcaption = styled.figcaption`
  display: flex;
  justify-content: flex-end;
`;
