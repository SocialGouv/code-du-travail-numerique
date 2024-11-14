import React from "react";
import {ElementBuilder, FicheSPDataElement} from "./ElementBuilder";
import { fr } from "@codegouvfr/react-dsfr";
import { format, parseISO } from "date-fns";
import frLocale from "date-fns/locale/fr";
import Title from "./Title";
import { filterOutTitle, getTitleInChildren } from "../utils";

export const Avertissement = ({
  data,
  headingLevel,
}: {
  data: FicheSPDataElement;
  headingLevel: number;
}) => {
  const formatedDate =
    (data.attributes?.date &&
      format(parseISO(data.attributes.date), "dd MMMM yyyy", {
        locale: frLocale,
      })) ||
    undefined;
  const title = getTitleInChildren(data);
  return (
    <div className={fr.cx("fr-alert", "fr-alert--info")}>
      {title && <Title level={headingLevel}>{title}</Title>}
      {formatedDate && <p className={fr.cx("fr-text--xs", "fr-pb-2w")}>{formatedDate}</p>}
      <ElementBuilder data={filterOutTitle(data)} headingLevel={headingLevel} />
    </div>
  );
};

export default Avertissement;
