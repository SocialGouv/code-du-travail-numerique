import React, { memo } from "react";

import { getInChildrenByName, getText, ignoreParagraph } from "../utils";
import { ElementBuilder } from "./ElementBuilder";
import { fr } from "@codegouvfr/react-dsfr";
import Accordion from "@codegouvfr/react-dsfr/Accordion";
import { getTitleLevel } from "./Title";
import { FicheSPDataImage } from "../type";

const getCredit = (data: FicheSPDataImage) => {
  const credit = getInChildrenByName(data, "Credits");
  return <ElementBuilder data={ignoreParagraph(credit)} />;
};
const getDescription = (data: FicheSPDataImage) => {
  const description = getInChildrenByName(data, "Description");
  return description && <ElementBuilder data={description} />;
};

export const ImageComponent = ({
  data,
  headingLevel,
}: {
  data: FicheSPDataImage;
  headingLevel: number;
}) => {
  const name = data.attributes.LienPublication;
  const legend = getInChildrenByName(data, "Legende");
  if (!legend) return <></>;
  const legendText = getText(legend);

  const creditText = getCredit(data);
  const description = getDescription(data);

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
      {description && (
        <Accordion
          label={"Voir en détail"}
          titleAs={getTitleLevel(headingLevel)}
        >
          {description}
        </Accordion>
      )}
    </>
  );
};

export default memo(ImageComponent);
