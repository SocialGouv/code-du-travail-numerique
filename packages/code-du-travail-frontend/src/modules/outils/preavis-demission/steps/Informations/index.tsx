import React, { useContext, useState } from "react";
import { PreavisDemissionContext, usePreavisDemissionStore } from "../store";

const InformationsStepComponent = (): JSX.Element => {
  const store = useContext(PreavisDemissionContext);
  const { seniority, onSeniorityChange, error } = usePreavisDemissionStore(
    store,
    (state) => ({
      seniority: state.informationsData.input.seniority,
      onSeniorityChange: state.informationsFunction.onSeniorityChange,
      error: state.informationsData.error.errorSeniority,
    })
  );

  const [seniorityYears, setSeniorityYears] = useState(
    seniority ? Math.floor(parseInt(seniority) / 12).toString() : ""
  );
  const [seniorityMonths, setSeniorityMonths] = useState(
    seniority ? (parseInt(seniority) % 12).toString() : ""
  );

  const handleSeniorityChange = (years: string, months: string) => {
    const totalMonths = (parseInt(years) || 0) * 12 + (parseInt(months) || 0);
    onSeniorityChange(totalMonths.toString());
  };

  const handleYearsChange = (value: string) => {
    setSeniorityYears(value);
    handleSeniorityChange(value, seniorityMonths);
  };

  const handleMonthsChange = (value: string) => {
    setSeniorityMonths(value);
    handleSeniorityChange(seniorityYears, value);
  };

  return (
    <div>
      <h3>Informations sur votre ancienneté</h3>
      <p>
        Pour calculer la durée du préavis de démission, nous avons besoin de
        connaître votre ancienneté dans l&apos;entreprise.
      </p>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="seniority-years">
          <strong>Ancienneté dans l&apos;entreprise :</strong>
        </label>
        <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
          <div>
            <input
              id="seniority-years"
              type="number"
              min="0"
              max="50"
              value={seniorityYears}
              onChange={(e) => handleYearsChange(e.target.value)}
              placeholder="0"
              style={{
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                width: "80px",
              }}
            />
            <span style={{ marginLeft: "0.5rem" }}>années</span>
          </div>
          <div>
            <input
              id="seniority-months"
              type="number"
              min="0"
              max="11"
              value={seniorityMonths}
              onChange={(e) => handleMonthsChange(e.target.value)}
              placeholder="0"
              style={{
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                width: "80px",
              }}
            />
            <span style={{ marginLeft: "0.5rem" }}>mois</span>
          </div>
        </div>
        {error && (
          <div style={{ color: "red", marginTop: "0.5rem" }}>{error}</div>
        )}
      </div>

      <div
        style={{
          backgroundColor: "#f0f8ff",
          padding: "1rem",
          borderRadius: "4px",
        }}
      >
        <p>
          <strong>💡 Information :</strong> L&apos;ancienneté se calcule à
          partir de votre date d&apos;embauche jusqu&apos;à la date de remise de
          votre lettre de démission.
        </p>
      </div>
    </div>
  );
};

export default InformationsStepComponent;
