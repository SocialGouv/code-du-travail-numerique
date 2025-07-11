import React, { useContext } from "react";
import {
  IndemnitePrecariteContext,
  useIndemnitePrecariteStore,
} from "../store";
import { fr } from "@codegouvfr/react-dsfr";
import {
  TypeRemunerationQuestion,
  SalaireTotal,
  SalairesMensuels,
} from "./components";

const RemunerationStepComponent = (): JSX.Element => {
  const store = useContext(IndemnitePrecariteContext);
  const {
    errors,
    typeRemuneration,
    salaire,
    salaires,
    onTypeRemunerationChange,
    onSalaireChange,
    onSalairesChange,
  } = useIndemnitePrecariteStore(store, (state) => ({
    errors: state.remunerationData.error,
    typeRemuneration: state.remunerationData.input.typeRemuneration,
    salaire: state.remunerationData.input.salaire,
    salaires: state.remunerationData.input.salaires,
    onTypeRemunerationChange:
      state.remunerationFunction.onTypeRemunerationChange,
    onSalaireChange: state.remunerationFunction.onSalaireChange,
    onSalairesChange: state.remunerationFunction.onSalairesChange,
  }));

  return (
    <div>
      {/* Question sur le type de rémunération */}
      <TypeRemunerationQuestion
        value={typeRemuneration}
        onChange={onTypeRemunerationChange}
        error={errors.typeRemuneration}
      />

      {/* Saisie du montant total */}
      {typeRemuneration === "total" && (
        <SalaireTotal
          value={salaire}
          onChange={onSalaireChange}
          error={errors.salaire}
        />
      )}

      {/* Saisie des salaires mensuels */}
      <SalairesMensuels
        salaires={salaires}
        onChange={onSalairesChange}
        error={errors.salaires}
        visible={typeRemuneration === "mensuel"}
      />
    </div>
  );
};

export default RemunerationStepComponent;
