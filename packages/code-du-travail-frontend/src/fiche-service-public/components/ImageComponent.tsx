import React, { memo } from "react";

import { getInChildrenByName, getText, ignoreParagraph } from "../utils";
import {
  ElementBuilder,
  FicheSPData,
  FicheSPDataElement,
} from "./ElementBuilder";
import { fr } from "@codegouvfr/react-dsfr";
import Accordion from "@codegouvfr/react-dsfr/Accordion";
import { getTitleLevel } from "./Title";

const getCredit = (data: FicheSPDataElement) => {
  const credit = getInChildrenByName(data, "Credits");
  if (!credit) return;
  return <ElementBuilder data={ignoreParagraph(credit)} />;
};
const getTexteDeRemplacement = (children: FicheSPData[]) => {
  if (children.length < 4) return;

  const texteDeRemplacement = children[2];
  if (texteDeRemplacement.name !== "TexteDeRemplacement") return;

  return <ElementBuilder data={children[3]} />;
};

export const ImageComponent = ({
  data,
  headingLevel,
}: {
  data: FicheSPDataElement;
  headingLevel: number;
}) => {
  const name = data.attributes?.LienPublication;
  const legend = getInChildrenByName(data, "Legende");
  if (!legend) return <></>;
  const legendText = getText(legend);

  const creditText = getCredit(data);
  const texteDeRemplacement = getTexteDeRemplacement(data.children);

  return (
    <>
      <figure role="group" aria-label={legendText}>
        <img
          src={`https://www.service-public.fr/webapp/images/vdd/extralarge/${name}`}
          alt={legendText}
        />
        <figcaption className={fr.cx("fr-text--sm")}>
          {creditText && <span>Crédits : {creditText}</span>}
        </figcaption>
      </figure>
      {texteDeRemplacement && (
        <div className={fr.cx("fr-accordions-group")}>
          <Accordion
            label={"Voir en détail"}
            titleAs={getTitleLevel(headingLevel)}
          >
            {texteDeRemplacement}
          </Accordion>
        </div>
      )}
    </>
  );
};

export default memo(ImageComponent);
