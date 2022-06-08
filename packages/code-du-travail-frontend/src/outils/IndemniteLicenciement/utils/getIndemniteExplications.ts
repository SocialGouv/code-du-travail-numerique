import { round } from "../../common/utils";

type Props = {
  salaireRef: number;
  inaptitude: boolean;
  anciennete: number;
};

export type InfoCalcul = {
  formula: string;
  labels: {
    "Anciennet\u00E9 au del\u00E0 de 10ans (A2)"?: number | undefined;
    "Anciennet\u00E9 totale (A)": number;
    "Licenciement pour inaptitude": string;
    "Salaire de r\u00E9ference (Sref)": number;
  };
};

export default function getIndemniteExplications({
  salaireRef,
  inaptitude = false,
  anciennete,
}: Props): InfoCalcul {
  let formula = "-";
  const labels = {
    "Ancienneté totale (A)": round(anciennete),
    "Licenciement pour inaptitude": inaptitude ? "oui" : "non",
    "Salaire de réference (Sref)": round(salaireRef),
    ...(anciennete - 10 > 0 && {
      "Ancienneté au delà de 10ans (A2)": round(anciennete - 10),
    }),
  };

  const isSmallAnciennete = anciennete <= 10; // 10 years
  if (anciennete >= 8 / 12) {
    if (isSmallAnciennete) {
      formula = `1 / 4 * Sref * A`;
    } else {
      formula = `(1 / 4 * Sref * 10) + (1 / 3 * Sref * A2)`;
    }
  }
  if (inaptitude) {
    formula += " * 2";
  }

  return { formula, labels };
}
