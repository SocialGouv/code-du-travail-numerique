import { Anciennete } from "./Anciennete";
import { FauteGrave } from "./FauteGrave";
import { Salaire } from "./Salaire";
import { Primes } from "./Prime";
import { DateFinContrat } from "./DateFinContrat";
import { ChoixCC } from "./ChoixCCN";

export const steps = [
  { component: Anciennete, key: "anciennete", type: "base" },
  { component: FauteGrave, key: "fauteGrave", type: "base" },
  { component: Salaire, key: "salaires", type: "base" },
  { component: Primes, key: "primes", type: "base" },
  { component: DateFinContrat, key: "isR12342", type: "base" },
  { component: ChoixCC, key: "convention", type: "base" }
];

export const initialData = {
  anciennete: 12,
  fauteGrave: false,
  salaires: Array.from({ length: 12 }).fill(0),
  primes: 0,
  isR12342: false,
  convention: {
    hasCC: false
  },
  steps
};
