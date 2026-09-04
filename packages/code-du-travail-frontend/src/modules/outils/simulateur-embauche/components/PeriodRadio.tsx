"use client";

import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import { PERIOD_OPTIONS } from "../domain/constants";
import type { Period } from "../domain/types";
import { periodArea } from "../styles";

type Props = {
  period: Period;
  onChange: (period: Period) => void;
};

/**
 * Monté **une seule fois** : c'est `gridTemplateAreas` qui le déplace entre la
 * colonne résultats (mobile) et la colonne paramètres (desktop). Cf. `styles.ts`.
 */
export const PeriodRadio = ({ period, onChange }: Props) => (
  <div className={periodArea}>
    <RadioButtons
      legend="Période de calcul"
      className={"fr-mb-0"}
      options={PERIOD_OPTIONS.map((option) => ({
        label: option.label,
        nativeInputProps: {
          name: "brut-net-periode",
          value: option.value,
          checked: period === option.value,
          onChange: () => onChange(option.value),
        },
      }))}
    />
  </div>
);
