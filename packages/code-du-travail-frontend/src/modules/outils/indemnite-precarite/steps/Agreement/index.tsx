import React, { useContext } from "react";
import {
  IndemnitePrecariteContext,
  useIndemnitePrecariteStore,
} from "../store";

// Pour l'instant, créons une version simplifiée
// TODO: Migrer le composant SelectAgreement depuis l'ancien système
const StepAgreement = (): JSX.Element => {
  const store = useContext(IndemnitePrecariteContext);
  const { agreement, onAgreementChange } = useIndemnitePrecariteStore(
    store,
    (state) => ({
      agreement: state.agreementData.input.agreement,
      onAgreementChange: state.agreementFunction.onAgreementChange,
    })
  );

  return (
    <div>
      <h3>Convention collective</h3>
      <p>
        Sélectionnez votre convention collective pour obtenir des informations
        spécifiques à votre situation.
      </p>

      {/* TODO: Intégrer le composant SelectAgreement */}
      <div>
        <label htmlFor="agreement-select">
          Rechercher votre convention collective :
        </label>
        <select
          id="agreement-select"
          value={agreement?.num || ""}
          onChange={(e) => {
            if (e.target.value) {
              // Pour l'instant, créer un objet agreement basique
              const agreement = {
                id: e.target.value,
                num: parseInt(e.target.value),
                shortTitle: "Convention sélectionnée",
                title: "Convention sélectionnée",
                contributions: true,
              };
              onAgreementChange(agreement);
            } else {
              onAgreementChange(undefined);
            }
          }}
        >
          <option value="">Sélectionnez une convention collective</option>
          <option value="3127">Convention collective test 3127</option>
          <option value="1486">Convention collective test 1486</option>
          <option value="2511">Convention collective test 2511</option>
          <option value="1516">Convention collective test 1516</option>
          <option value="2098">Convention collective test 2098</option>
        </select>
      </div>

      {agreement && (
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            backgroundColor: "#f0f0f0",
          }}
        >
          <p>
            <strong>Convention sélectionnée :</strong> {agreement.title}
          </p>
          <p>
            <strong>Numéro IDCC :</strong> {agreement.num}
          </p>
        </div>
      )}

      <div style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#666" }}>
        <p>
          <strong>Note :</strong> Si votre convention collective n&apos;apparaît
          pas dans la liste, vous pouvez continuer sans la sélectionner. Le
          calcul se basera alors sur les dispositions légales du Code du
          travail.
        </p>
      </div>
    </div>
  );
};

export default StepAgreement;
