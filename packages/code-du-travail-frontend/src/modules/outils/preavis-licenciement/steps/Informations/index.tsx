import React, { useContext } from "react";
import {
  PreavisLicenciementContext,
  usePreavisLicenciementStore,
} from "../store";

const StepInformations = (): JSX.Element => {
  const store = useContext(PreavisLicenciementContext);
  const {
    notificationDate,
    dismissalDate,
    salary,
    additionalInfo,
    error,
    hasBeenSubmit,
    onNotificationDateChange,
    onDismissalDateChange,
    onSalaryChange,
    onAdditionalInfoChange,
  } = usePreavisLicenciementStore(store, (state) => ({
    notificationDate: state.informationsData.input.notificationDate,
    dismissalDate: state.informationsData.input.dismissalDate,
    salary: state.informationsData.input.salary,
    additionalInfo: state.informationsData.input.additionalInfo,
    error: state.informationsData.error,
    hasBeenSubmit: state.informationsData.hasBeenSubmit,
    onNotificationDateChange:
      state.informationsFunction.onNotificationDateChange,
    onDismissalDateChange: state.informationsFunction.onDismissalDateChange,
    onSalaryChange: state.informationsFunction.onSalaryChange,
    onAdditionalInfoChange: state.informationsFunction.onAdditionalInfoChange,
  }));

  return (
    <>
      {/* Date de notification */}
      <div>
        <label htmlFor="notificationDate">
          Date de notification du licenciement
        </label>
        <input
          type="date"
          id="notificationDate"
          value={notificationDate || ""}
          onChange={(e) => onNotificationDateChange(e.target.value)}
        />
        {hasBeenSubmit && error.notificationDate && (
          <p style={{ color: "red" }}>{error.notificationDate}</p>
        )}
      </div>

      {/* Date de fin de contrat */}
      <div>
        <label htmlFor="dismissalDate">Date de fin de contrat prévue</label>
        <input
          type="date"
          id="dismissalDate"
          value={dismissalDate || ""}
          onChange={(e) => onDismissalDateChange(e.target.value)}
        />
        {hasBeenSubmit && error.dismissalDate && (
          <p style={{ color: "red" }}>{error.dismissalDate}</p>
        )}
      </div>

      {/* Salaire */}
      <div>
        <label htmlFor="salary">Salaire de référence (€)</label>
        <input
          type="number"
          id="salary"
          value={salary || ""}
          onChange={(e) => onSalaryChange(e.target.value)}
          placeholder="Salaire mensuel brut"
        />
        {hasBeenSubmit && error.salary && (
          <p style={{ color: "red" }}>{error.salary}</p>
        )}
      </div>

      {/* Informations additionnelles */}
      <div>
        <label htmlFor="additionalInfo">
          Informations additionnelles (optionnel)
        </label>
        <textarea
          id="additionalInfo"
          value={additionalInfo || ""}
          onChange={(e) => onAdditionalInfoChange(e.target.value)}
          placeholder="Précisions sur la situation du salarié..."
          rows={4}
        />
        {hasBeenSubmit && error.additionalInfo && (
          <p style={{ color: "red" }}>{error.additionalInfo}</p>
        )}
      </div>
    </>
  );
};

export default StepInformations;
