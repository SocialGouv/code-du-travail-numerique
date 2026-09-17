"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { URSSAF_SIMULATOR_URL } from "../../../../config";
import { buildUrssafPrefillUrl } from "../domain/urssafPrefillUrl";
import type { ContractType, Period } from "../domain/types";

type Props = {
  period: Period;
  contract: ContractType;
  salaireBrutMensuel: number | null;
  onClick: (period: Period) => void;
};

export const UrssafSimulatorLink = ({
  period,
  contract,
  salaireBrutMensuel,
  onClick,
}: Props) => (
  <a
    className={fr.cx(
      "fr-link",
      "fr-link--lg",
      "fr-icon-external-link-line",
      "fr-link--icon-right"
    )}
    href={buildUrssafPrefillUrl({
      baseUrl: URSSAF_SIMULATOR_URL,
      period,
      contract,
      salaireBrutMensuel,
    })}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => onClick(period)}
    data-testid="brut-net-lien-urssaf"
  >
    Une simulation plus détaillée ? Continuez sur le simulateur de l&apos;URSSAF
    <span className={fr.cx("fr-sr-only")}> - nouvelle fenêtre</span>
  </a>
);
