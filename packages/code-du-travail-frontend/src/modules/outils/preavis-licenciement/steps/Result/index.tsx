import React, { useContext } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { Accordion } from "@codegouvfr/react-dsfr/Accordion";
import Link from "next/link";
import {
  PreavisLicenciementContext,
  usePreavisLicenciementStore,
} from "../store";
import { ShowResult, Situation, Warning } from "./Components";

const StepResult = (): JSX.Element => {
  const store = useContext(PreavisLicenciementContext);
  const { statusData, agreementData, informationsData } =
    usePreavisLicenciementStore(store, (state) => ({
      statusData: state.statusData.input,
      agreementData: state.agreementData.input,
      informationsData: state.informationsData.input,
    }));

  // Calcul basique du préavis
  const calculateDuration = () => {
    if (statusData.seriousMisconduct) {
      return "Aucun préavis";
    }

    if (statusData.seniority?.value === "moins-6-mois") {
      return "Aucun préavis";
    } else if (statusData.seniority?.value === "6-mois-2-ans") {
      return statusData.disabledWorker ? "2 mois" : "1 mois";
    } else if (statusData.seniority?.value === "2-ans-et-plus") {
      return statusData.disabledWorker ? "4 mois" : "2 mois";
    }

    return "À déterminer";
  };

  const duration = calculateDuration();

  // Préparation des données de situation
  const situationsForDisplay = [
    {
      label: "Licenciement pour faute grave",
      value: statusData.seriousMisconduct ? "Oui" : "Non",
    },
    {
      label: "Reconnu en tant que travailleur handicapé",
      value: statusData.disabledWorker ? "Oui" : "Non",
    },
    {
      label: "Ancienneté",
      value: statusData.seniority?.label || "Non renseignée",
    },
  ];

  // Note pour les travailleurs handicapés
  const note = statusData.disabledWorker
    ? "En tant que travailleur handicapé, la durée du préavis est doublée (dans la limite de 3 mois maximum)."
    : undefined;

  return (
    <div className={fr.cx("fr-col-md-8", "fr-col-12", "fr-mb-6w")}>
      <ShowResult
        duration={duration}
        idcc={agreementData.agreement?.num}
        note={note}
      />

      <Warning agreement={agreementData.agreement} />

      <h2 className={fr.cx("fr-h4", "fr-mt-4w")}>Détail du calcul</h2>
      <Situation
        situations={situationsForDisplay}
        agreement={agreementData.agreement}
      />

      <Accordion
        label="Voir les références légales"
        className={fr.cx("fr-mt-4w")}
      >
        <div className={fr.cx("fr-mb-4w")}>
          <h3 className={fr.cx("fr-h5")}>Références juridiques</h3>
          <ul>
            <li>
              <Link
                href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006901112"
                target="_blank"
                rel="noopener noreferrer"
              >
                Article L1234-1 du Code du travail
              </Link>
            </li>
            <li>
              <Link
                href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006901113"
                target="_blank"
                rel="noopener noreferrer"
              >
                Article L1234-9 du Code du travail
              </Link>
            </li>
          </ul>
        </div>
      </Accordion>
    </div>
  );
};

export default StepResult;
