import { fr } from "@codegouvfr/react-dsfr";
import React from "react";

export const NO_INDEMNITY_MESSAGE =
  "Il n'y a pas d'indemnité de précarité dans cette situation";

/**
 * Contrats pour lesquels le code du travail ne prévoit aucune indemnité de
 * précarité. La liste n'est affichée qu'aux usagers ayant répondu « Autres »
 * à l'étape « Type de contrat » (issue #7142).
 */
const CONTRATS_EXCLUS = [
  "CDD saisonnier",
  "CDD d'usage",
  "Contrat unique d'insertion (CUI) - Parcours emploi compétences (PEC)",
  "Contrat d'accompagnement dans l'emploi (CAE)",
  "Contrat de professionnalisation ou contrat d'apprentissage",
  "Contrat pour lequel l'employeur s'est engagé à assurer un complément de formation professionnelle au salarié",
  "Contrat conclu avec un jeune pendant ses vacances scolaires ou universitaires",
  "CDD dans le cadre d'un congé de mobilité",
];

type Props = {
  /** Affiche la liste des contrats exclus par le code du travail. */
  showExcludedContracts?: boolean;
};

const NoIndemnityMessage: React.FC<Props> = ({ showExcludedContracts }) => (
  <div data-testid="no-indemnity-message">
    <h3 className={fr.cx("fr-mt-3w", "fr-h3")}>Indemnité de précarité</h3>
    <p className={fr.cx("fr-mb-3w", "fr-pr-md-2v")}>{NO_INDEMNITY_MESSAGE}</p>

    {showExcludedContracts && (
      <div data-testid="excluded-contracts">
        <p className={fr.cx("fr-mb-1w")}>
          L’indemnité de précarité n’est pas due en cas de&nbsp;:
        </p>
        <ul>
          {CONTRATS_EXCLUS.map((contrat) => (
            <li key={contrat}>{contrat}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

export default NoIndemnityMessage;
