import React from "react";
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
  return (
    <div className={fr.cx("fr-alert", "fr-alert--warning", "fr-mb-2w")}>
      {title && <p className={fr.cx("fr-text--bold")}>{getText(title)}</p>}
      {formatedDate && (
        <p className={fr.cx("fr-text--xs", "fr-pb-2w")}>{formatedDate}</p>
      )}
      <ElementBuilder data={filterOutTitle(data)} headingLevel={headingLevel} />
    </div>
  );
};

export default Avertissement;
