import React, { JSX } from "react";
import { ElementBuilder } from "./ElementBuilder";
import { fr } from "@codegouvfr/react-dsfr";
import { format, parseISO } from "date-fns";
import frLocale from "date-fns/locale/fr";
import { filterOutTitle, getInChildrenByName, getText } from "../utils";
import { FicheSPDataAvertissement } from "../type";

export const Avertissement = ({
  data,
  headingLevel,
}: {
  data: FicheSPDataAvertissement;
  headingLevel: number;
}) => {
  const formatedDate =
    (data.attributes?.date &&
      format(parseISO(data.attributes.date), "dd MMMM yyyy", {
        locale: frLocale,
      })) ||
    undefined;
  const title = getInChildrenByName(data, "Titre");
  const Heading = `h${headingLevel + 2}` as keyof JSX.IntrinsicElements;
  return (
    <div className={fr.cx("fr-alert", "fr-alert--warning", "fr-mb-2w")}>
      {title && <Heading>{getText(title)}</Heading>}
      {formatedDate && (
        <p className={fr.cx("fr-text--xs", "fr-pb-2w")}>{formatedDate}</p>
      )}
      <ElementBuilder
        data={filterOutTitle(data)}
        headingLevel={headingLevel + 1}
      />
    </div>
  );
};

export default Avertissement;
