import { Result } from "./steps/Result";
import { Categorie } from "./steps/Categorie";
import { Anciennete } from "./steps/Anciennete";
import { Salaire } from "./steps/Salaire";

export const stepAnciennete = {
  component: Anciennete,
  name: "branche_anciennete",
  label: "Ajustement ancienneté"
};

export const stepSalaire = {
  component: Salaire,
  name: "branche_salaire",
  label: "Ajustement salaire"
};

export const steps = [
  { component: Categorie, name: "branche_category", label: "Catégorie" },
  { ...stepAnciennete },
  { ...stepSalaire },
  {
    component: Result,
    name: "branche_result",
    label: "Indemnité conventionnelle"
  }
];
