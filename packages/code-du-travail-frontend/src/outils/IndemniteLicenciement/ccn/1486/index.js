import { Anciennete } from "./steps/Anciennete";
import { Categorie } from "./steps/Categorie";
import { Result } from "./steps/Result";
import { Salaire } from "./steps/Salaire";

export const stepAnciennete = {
  component: Anciennete,
  label: "Ajustement ancienneté",
  name: "branche_anciennete",
};

export const stepSalaire = {
  component: Salaire,
  label: "Ajustement salaire",
  name: "branche_salaire",
};

export const steps = [
  { component: Categorie, label: "Catégorie", name: "branche_category" },
  stepAnciennete,
  stepSalaire,
  {
    component: Result,
    label: "Indemnité conventionnelle",
    name: "branche_result",
  },
];
