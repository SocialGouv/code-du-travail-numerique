import React from "react";
import { CATEGORIE_KEY } from "./Categorie";
import { AncienneteETAMIC } from "./AncienneteETAMIC";
import { AncienneteCE } from "./AncienneteCE";

export const Anciennete = ({ form }) => {
  const categorie = form.getState().values[CATEGORIE_KEY];
  if (categorie === "CEI" || categorie === "CENI") {
    return <AncienneteCE form={form} />;
  }
  return <AncienneteETAMIC form={form} />;
};
