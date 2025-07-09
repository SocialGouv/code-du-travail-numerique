import React, { useContext } from "react";
import {
  PreavisLicenciementContext,
  usePreavisLicenciementStore,
} from "../store";

const StepAgreement = (): JSX.Element => {
  const store = useContext(PreavisLicenciementContext);
  const {
    route,
    agreement,
    enterprise,
    error,
    hasBeenSubmit,
    onRouteChange,
    onAgreementChange,
  } = usePreavisLicenciementStore(store, (state) => ({
    route: state.agreementData.input.route,
    agreement: state.agreementData.input.agreement,
    enterprise: state.agreementData.input.enterprise,
    error: state.agreementData.error,
    hasBeenSubmit: state.agreementData.hasBeenSubmit,
    onRouteChange: state.agreementFunction.onRouteChange,
    onAgreementChange: state.agreementFunction.onAgreementChange,
  }));

  return (
    <>
      <div>
        <p>Comment souhaitez-vous renseigner votre convention collective ?</p>
        <div>
          <label>
            <input
              type="radio"
              name="route"
              value="agreement"
              checked={route === "agreement"}
              onChange={() => onRouteChange("agreement")}
            />
            Par la convention collective
          </label>
          <label>
            <input
              type="radio"
              name="route"
              value="enterprise"
              checked={route === "enterprise"}
              onChange={() => onRouteChange("enterprise")}
            />
            Par l&apos;entreprise
          </label>
          <label>
            <input
              type="radio"
              name="route"
              value="not-selected"
              checked={route === "not-selected"}
              onChange={() => onRouteChange("not-selected")}
            />
            Je ne souhaite pas renseigner ma convention collective
          </label>
        </div>
        {hasBeenSubmit && error.route && (
          <p style={{ color: "red" }}>{error.route}</p>
        )}
      </div>

      {route === "agreement" && (
        <div>
          <p>Sélectionnez votre convention collective</p>
          <input
            type="text"
            placeholder="Rechercher une convention collective..."
            onChange={(e) => {
              onAgreementChange({ name: e.target.value, num: "1234" });
            }}
          />
        </div>
      )}

      {route === "enterprise" && (
        <div>
          <p>Sélectionnez votre entreprise</p>
          <input
            type="text"
            placeholder="Rechercher une entreprise..."
            onChange={(e) => {
              onAgreementChange(null, {
                name: e.target.value,
                siret: "12345678901234",
              });
            }}
          />
        </div>
      )}
    </>
  );
};

export default StepAgreement;
