import React from "react";

import { AncienneteCE } from "./AncienneteCE";
import { AncienneteETAMIC } from "./AncienneteETAMIC";
import { CATEGORIE_KEY } from "./Categorie";

export const Anciennete = ({ form }) => {
  const categorie = form.getState().values[CATEGORIE_KEY];
  if (categorie === "CEI" || categorie === "CENI") {
    return <AncienneteCE form={form} />;
  }
  return <AncienneteETAMIC form={form} />;
};
