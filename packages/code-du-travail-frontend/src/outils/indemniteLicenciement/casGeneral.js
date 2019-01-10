import { Anciennete } from "./Anciennete";
import { FauteGrave } from "./FauteGrave";
import { Salaire } from "./Salaire";
import { Primes } from "./Prime";
import { DateFinContrat } from "./DateFinContrat";
import { ChoixCC } from "./ChoixCCN";
import { Inaptitude } from "./Inaptitude";

export const steps = [
  { component: DateFinContrat, key: "isR12342", type: "base" },
  { component: Anciennete, key: "anciennete", type: "base" },
  { component: FauteGrave, key: "fauteGrave", type: "base" },
  { component: Inaptitude, key: "inaptitude", type: "base" },
  { component: Salaire, key: "salaires", type: "base" },
  { component: Primes, key: "primes", type: "base" },
  { component: ChoixCC, key: "convention", type: "base" }
];

export const initialData = {
  isR12342: false,
  anciennete: 12,
  fauteGrave: false,
  inaptitude: false,
  salaires: {
    isPartiel: false,
    derniersMois: Array.from({ length: 12 }).fill(0),
    periods: []
  },
  primes: 0,
  convention: {
    hasCC: false
  },
  steps
};
