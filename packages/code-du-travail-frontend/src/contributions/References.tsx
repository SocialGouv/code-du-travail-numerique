import { slugify, SOURCES } from "@socialgouv/cdtn-utils";
import React from "react";
import References from "../common/References";

export const filteredRefs = (references, currentUrl) =>
  references?.filter(({ category, url }) => {
    if (category !== null) return true;
    return url !== currentUrl;
  });

const ReferencesJuridiques = ({ references = [] }) => {
  if (references.length === 0) {
    return null;
  }
  const refs = references.flatMap(({ category, title, url }) => {
    if (category === "labor_code") {
      return {
        slug: slugify(title),
        title,
        type: SOURCES.CDT,
      };
    }
    if (category === "agreement") {
      return {
        title: `${title} de la convention collective`,
        type: SOURCES.EXTERNALS,
        url,
      };
    }
    return { title, type: SOURCES.EXTERNALS, url };
  });

  return <References label="Références" references={refs} accordionList="3" />;
};

export default ReferencesJuridiques;
