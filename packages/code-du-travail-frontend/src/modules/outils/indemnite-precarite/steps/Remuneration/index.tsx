import React, { useContext } from "react";
import {
  IndemnitePrecariteContext,
  useIndemnitePrecariteStore,
} from "../store";

const StepRemuneration = (): JSX.Element => {
  const store = useContext(IndemnitePrecariteContext);
  const { salaryInfo, onSalaryInfoChange, contractType } =
    useIndemnitePrecariteStore(store, (state) => ({
      salaryInfo: state.remunerationData.input.salaryInfo,
      onSalaryInfoChange: state.remunerationFunction.onSalaryInfoChange,
      contractType: state.informationsData.input.contractType,
    }));

  const handleSalaryChange = (field: string, value: string) => {
    const numericValue = value === "" ? undefined : parseFloat(value);
    onSalaryInfoChange({
      ...salaryInfo,
      [field]: numericValue,
    });
  };

  const calculateTotalSalary = () => {
    const monthly = salaryInfo?.monthlySalary || 0;
    const variable = salaryInfo?.variablePart || 0;
    const benefits = salaryInfo?.benefits || 0;
    return monthly + variable + benefits;
  };

  return (
    <div>
      <h3>Rémunération</h3>
      <p>
        Indiquez les montants de votre rémunération brute perçue pendant
        {contractType === "CTT" ? " votre mission d'intérim" : " votre CDD"}.
      </p>

      {/* Salaire mensuel de base */}
      <div style={{ marginBottom: "1.5rem" }}>
        <label htmlFor="monthly-salary">
          <strong>Salaire mensuel brut de base *</strong>
        </label>
        <div style={{ marginTop: "0.5rem" }}>
          <input
            type="number"
            id="monthly-salary"
            min="0"
            step="0.01"
            placeholder="Ex: 2500.00"
            value={salaryInfo?.monthlySalary || ""}
            onChange={(e) =>
              handleSalaryChange("monthlySalary", e.target.value)
            }
            style={{
              width: "200px",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <span style={{ marginLeft: "0.5rem" }}>€</span>
        </div>
        <small style={{ color: "#666", fontSize: "0.9rem" }}>
          Montant mensuel brut de votre salaire de base (hors primes et
          avantages)
        </small>
      </div>

      {/* Partie variable */}
      <div style={{ marginBottom: "1.5rem" }}>
        <label htmlFor="variable-part">
          <strong>Primes et partie variable</strong>
        </label>
        <div style={{ marginTop: "0.5rem" }}>
          <input
            type="number"
            id="variable-part"
            min="0"
            step="0.01"
            placeholder="Ex: 300.00"
            value={salaryInfo?.variablePart || ""}
            onChange={(e) => handleSalaryChange("variablePart", e.target.value)}
            style={{
              width: "200px",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <span style={{ marginLeft: "0.5rem" }}>€</span>
        </div>
        <small style={{ color: "#666", fontSize: "0.9rem" }}>
          Primes, commissions, heures supplémentaires, etc. (montant mensuel
          moyen)
        </small>
      </div>

      {/* Avantages en nature */}
      <div style={{ marginBottom: "1.5rem" }}>
        <label htmlFor="benefits">
          <strong>Avantages en nature</strong>
        </label>
        <div style={{ marginTop: "0.5rem" }}>
          <input
            type="number"
            id="benefits"
            min="0"
            step="0.01"
            placeholder="Ex: 150.00"
            value={salaryInfo?.benefits || ""}
            onChange={(e) => handleSalaryChange("benefits", e.target.value)}
            style={{
              width: "200px",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <span style={{ marginLeft: "0.5rem" }}>€</span>
        </div>
        <small style={{ color: "#666", fontSize: "0.9rem" }}>
          Voiture de fonction, logement, tickets restaurant, etc. (valeur
          mensuelle)
        </small>
      </div>

      {/* Récapitulatif */}
      {(salaryInfo?.monthlySalary ||
        salaryInfo?.variablePart ||
        salaryInfo?.benefits) && (
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            backgroundColor: "#f8f9fa",
            border: "1px solid #dee2e6",
            borderRadius: "4px",
          }}
        >
          <h4 style={{ margin: "0 0 1rem 0" }}>
            Récapitulatif de votre rémunération brute
          </h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "0.5rem",
            }}
          >
            <span>Salaire de base :</span>
            <span>
              <strong>{(salaryInfo?.monthlySalary || 0).toFixed(2)} €</strong>
            </span>

            <span>Primes et variable :</span>
            <span>
              <strong>{(salaryInfo?.variablePart || 0).toFixed(2)} €</strong>
            </span>

            <span>Avantages en nature :</span>
            <span>
              <strong>{(salaryInfo?.benefits || 0).toFixed(2)} €</strong>
            </span>

            <hr style={{ gridColumn: "1 / -1", margin: "0.5rem 0" }} />

            <span>
              <strong>Total mensuel brut :</strong>
            </span>
            <span style={{ fontSize: "1.1rem", color: "#0066cc" }}>
              <strong>{calculateTotalSalary().toFixed(2)} €</strong>
            </span>
          </div>
        </div>
      )}

      {/* Informations complémentaires */}
      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "#e3f2fd",
          borderRadius: "4px",
        }}
      >
        <h4 style={{ margin: "0 0 0.5rem 0" }}>💡 Informations importantes</h4>
        <ul style={{ margin: "0", paddingLeft: "1.5rem", fontSize: "0.9rem" }}>
          <li>
            Indiquez tous les montants en <strong>brut</strong> (avant déduction
            des cotisations sociales)
          </li>
          <li>
            L&apos;indemnité de précarité est calculée sur la base de la
            rémunération brute totale
          </li>
          <li>
            Si vous avez eu des augmentations pendant votre contrat, indiquez le
            montant moyen
          </li>
          <li>
            Les congés payés sont généralement inclus dans le calcul de
            l&apos;indemnité
          </li>
        </ul>
      </div>

      {/* Validation */}
      {!salaryInfo?.monthlySalary && (
        <div
          style={{
            marginTop: "1rem",
            padding: "0.75rem",
            backgroundColor: "#fff3cd",
            border: "1px solid #ffeaa7",
            borderRadius: "4px",
          }}
        >
          <p style={{ margin: 0, color: "#856404" }}>
            ⚠️ Le salaire mensuel brut de base est obligatoire pour calculer
            votre indemnité.
          </p>
        </div>
      )}
    </div>
  );
};

export default StepRemuneration;
