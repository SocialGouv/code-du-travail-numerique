import { Age } from "../Age";
import { AffiliationOpe } from "./AffilationOpe";
import { EchelonChimie } from "./EchelonChimie";
import { LicenciementEco } from "./licenciementEco";
import { getIndemnite } from "./0044_indemnite";

export const steps = [
  { component: AffiliationOpe, key: "hasOpe" },
  { component: EchelonChimie, key: "echelon" },
  { component: Age, key: "age" },
  { component: LicenciementEco, key: "isEco" }
];
export const initialData = {
  hasOpe: false,
  isEco: false
};

export { getIndemnite };
