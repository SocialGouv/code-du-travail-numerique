import React, { useContext } from "react";
import {
  IndemnitePrecariteContext,
  useIndemnitePrecariteStore,
} from "../store";
import { CONTRACT_TYPE, QUESTIONS, EXCLUDED_CONTRACTS } from "../../types";

const StepInfosGenerales = (): JSX.Element => {
  const store = useContext(IndemnitePrecariteContext);
  const {
    contractType,
    onContractTypeChange,
    criteria,
    onCriteriaChange,
    agreement,
  } = useIndemnitePrecariteStore(store, (state) => ({
    contractType: state.informationsData.input.contractType,
    onContractTypeChange: state.informationsFunction.onContractTypeChange,
    criteria: state.informationsData.input.criteria,
    onCriteriaChange: state.informationsFunction.onCriteriaChange,
    agreement: state.agreementData.input.agreement,
  }));

  const handleContractTypeChange = (
    type: (typeof CONTRACT_TYPE)[keyof typeof CONTRACT_TYPE]
  ) => {
    onContractTypeChange(type);
  };

  const handleCriteriaChange = (key: string, value: string) => {
    onCriteriaChange({
      ...criteria,
      [key]: value,
    });
  };

  return (
    <div>
      <h3>Informations générales</h3>

      {/* Sélection du type de contrat */}
      <div style={{ marginBottom: "2rem" }}>
        <fieldset>
          <legend>Quel est votre type de contrat ?</legend>
          <div>
            <label>
              <input
                type="radio"
                name="contractType"
                value={CONTRACT_TYPE.CDD}
                checked={contractType === CONTRACT_TYPE.CDD}
                onChange={() => handleContractTypeChange(CONTRACT_TYPE.CDD)}
              />
              <span style={{ marginLeft: "0.5rem" }}>
                Contrat à durée déterminée (CDD)
              </span>
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="contractType"
                value={CONTRACT_TYPE.CTT}
                checked={contractType === CONTRACT_TYPE.CTT}
                onChange={() => handleContractTypeChange(CONTRACT_TYPE.CTT)}
              />
              <span style={{ marginLeft: "0.5rem" }}>
                Contrat de travail temporaire (Intérim)
              </span>
            </label>
          </div>
        </fieldset>
      </div>

      {/* Questions spécifiques selon le type de contrat */}
      {contractType === CONTRACT_TYPE.CDD && (
        <div>
          <h4>Informations sur votre CDD</h4>

          {/* Type de CDD */}
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="cdd-type">{QUESTIONS.cddType}</label>
            <select
              id="cdd-type"
              value={criteria?.cddType || ""}
              onChange={(e) => handleCriteriaChange("cddType", e.target.value)}
            >
              <option value="">Sélectionnez le type de CDD</option>
              <option value="CDD classique">CDD classique</option>
              <option value="CDD d'usage">CDD d&apos;usage</option>
              <option value="CDD de remplacement">CDD de remplacement</option>
              <option value="CDD saisonnier">CDD saisonnier</option>
              <option value="Autres">Autres</option>
              {EXCLUDED_CONTRACTS.map((contract) => (
                <option key={contract} value={contract}>
                  {contract}
                </option>
              ))}
            </select>
          </div>

          {/* Affichage d'un message d'exclusion si contrat exclu */}
          {criteria?.cddType &&
            EXCLUDED_CONTRACTS.includes(criteria.cddType as any) && (
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "#fff3cd",
                  border: "1px solid #ffeaa7",
                  borderRadius: "4px",
                  marginBottom: "1rem",
                }}
              >
                <p style={{ margin: 0, color: "#856404" }}>
                  <strong>Information :</strong> Ce type de contrat ne permet
                  pas au salarié d&apos;avoir droit à une prime de précarité.
                </p>
              </div>
            )}

          {/* Questions supplémentaires selon la convention collective */}
          {agreement &&
            criteria?.cddType &&
            !EXCLUDED_CONTRACTS.includes(criteria.cddType as any) && (
              <div>
                <div style={{ marginBottom: "1rem" }}>
                  <label htmlFor="cdi-proposal">
                    {QUESTIONS.hasCdiProposal}
                  </label>
                  <select
                    id="cdi-proposal"
                    value={criteria?.hasCdiProposal || ""}
                    onChange={(e) =>
                      handleCriteriaChange("hasCdiProposal", e.target.value)
                    }
                  >
                    <option value="">Sélectionnez une réponse</option>
                    <option value="oui">Oui</option>
                    <option value="non">Non</option>
                  </select>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label htmlFor="cdi-renewal">{QUESTIONS.hasCdiRenewal}</label>
                  <select
                    id="cdi-renewal"
                    value={criteria?.hasCdiRenewal || ""}
                    onChange={(e) =>
                      handleCriteriaChange("hasCdiRenewal", e.target.value)
                    }
                  >
                    <option value="">Sélectionnez une réponse</option>
                    <option value="oui">Oui</option>
                    <option value="non">Non</option>
                  </select>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <label htmlFor="equivalent-cdi-renewal">
                    {QUESTIONS.hasEquivalentCdiRenewal}
                  </label>
                  <select
                    id="equivalent-cdi-renewal"
                    value={criteria?.hasEquivalentCdiRenewal || ""}
                    onChange={(e) =>
                      handleCriteriaChange(
                        "hasEquivalentCdiRenewal",
                        e.target.value
                      )
                    }
                  >
                    <option value="">Sélectionnez une réponse</option>
                    <option value="oui">Oui</option>
                    <option value="non">Non</option>
                  </select>
                </div>
              </div>
            )}
        </div>
      )}

      {contractType === CONTRACT_TYPE.CTT && (
        <div>
          <h4>Informations sur votre contrat d&apos;intérim</h4>
          <p>
            Les contrats de travail temporaire (intérim) donnent généralement
            droit à une indemnité de fin de mission équivalente à
            l&apos;indemnité de précarité.
          </p>

          {/* TODO: Ajouter les questions spécifiques à l'intérim */}
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="mission-type">Type de mission :</label>
            <select
              id="mission-type"
              value={criteria?.missionType || ""}
              onChange={(e) =>
                handleCriteriaChange("missionType", e.target.value)
              }
            >
              <option value="">Sélectionnez le type de mission</option>
              <option value="remplacement">
                Remplacement d&apos;un salarié absent
              </option>
              <option value="accroissement">
                Accroissement temporaire d&apos;activité
              </option>
              <option value="saisonnier">Emploi à caractère saisonnier</option>
              <option value="autres">Autres</option>
            </select>
          </div>
        </div>
      )}

      {/* Informations d'aide */}
      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "#e3f2fd",
          borderRadius: "4px",
        }}
      >
        <h4 style={{ margin: "0 0 0.5rem 0" }}>💡 Bon à savoir</h4>
        <p style={{ margin: 0, fontSize: "0.9rem" }}>
          L&apos;indemnité de précarité est généralement égale à 10% de la
          rémunération brute totale perçue pendant le contrat. Certaines
          conventions collectives peuvent prévoir des dispositions
          particulières.
        </p>
      </div>
    </div>
  );
};

export default StepInfosGenerales;
