import React, { useContext } from "react";
import {
  IndemnitePrecariteContext,
  useIndemnitePrecariteStore,
} from "../store";
import {
  TypeRemunerationQuestion,
  SalaireTotal,
  SalairesMensuels,
} from "./components";

const RemunerationStepComponent = () => {
  const store = useContext(IndemnitePrecariteContext);
  const {
    errors,
    typeRemuneration,
    salaire,
    salaires,
    dureeContrat,
    onTypeRemunerationChange,
    onSalaireChange,
    onSalairesChange,
    onDureeContratChange,
  } = useIndemnitePrecariteStore(store, (state) => ({
    errors: state.remunerationData.error,
    typeRemuneration: state.remunerationData.input.typeRemuneration,
    salaire: state.remunerationData.input.salaire,
    salaires: state.remunerationData.input.salaires,
    dureeContrat: state.remunerationData.input.dureeContrat,
    onTypeRemunerationChange:
      state.remunerationFunction.onTypeRemunerationChange,
    onSalaireChange: state.remunerationFunction.onSalaireChange,
    onSalairesChange: state.remunerationFunction.onSalairesChange,
    onDureeContratChange: state.remunerationFunction.onDureeContratChange,
  }));

  return (
    <div>
      <TypeRemunerationQuestion
        value={typeRemuneration}
        onChange={onTypeRemunerationChange}
        error={errors.typeRemuneration}
      />

      {typeRemuneration === "total" && (
        <SalaireTotal
          value={salaire}
          onChange={onSalaireChange}
          error={errors.salaire}
        />
      )}

      <SalairesMensuels
        salaires={salaires}
        dureeContrat={dureeContrat}
        onSalairesChange={onSalairesChange}
        onDureeContratChange={onDureeContratChange}
        error={errors.salaires}
        dureeError={errors.dureeContrat}
        visible={typeRemuneration === "mensuel"}
      />
    </div>
  );
};

export default RemunerationStepComponent;
