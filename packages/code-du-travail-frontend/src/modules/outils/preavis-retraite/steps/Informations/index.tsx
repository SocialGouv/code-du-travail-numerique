import React, { useContext } from "react";
import { PreavisRetraiteContext, usePreavisRetraiteStore } from "../store";
import { Note } from "./components/Note";
import { fr } from "@codegouvfr/react-dsfr";
import { PubliQuestion } from "src/modules/outils/indemnite-depart/steps/Informations/components/PubliQuestion";

const StepInformations = (): JSX.Element => {
  const store = useContext(PreavisRetraiteContext);
  const { errors, onInformationsChange, informations } =
    usePreavisRetraiteStore(store, (state) => ({
      errors: state.informationsData.error,
      onInformationsChange: state.informationsFunction.onInformationsChange,
      informations: state.informationsData.input.publicodesInformations,
    }));

  return (
    <>
      {informations.map((info, index) => {
        return (
          <PubliQuestion
            key={info.id}
            name={"infos." + info.question.name}
            rule={info.question.rule}
            value={info.info}
            onChange={(v: any) =>
              onInformationsChange(
                info.question.rule.nom,
                v,
                info.question.rule.cdtn?.type
              )
            }
            error={
              errors.errorInformations[info.question.rule.nom] ?? undefined
            }
            autoFocus={index === 0}
          />
        );
      })}
      {errors.errorPublicodes && (
        <p className={fr.cx("fr-error-text")}>{errors.errorPublicodes}</p>
      )}
      {errors.errorNote && <Note message={errors.errorNote} />}
    </>
  );
};

export default StepInformations;
