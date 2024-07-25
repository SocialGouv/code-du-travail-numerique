import React, { useContext } from "react";
import { InlineError } from "../../../common/ErrorField";
import { PubliQuestion } from "../../../Components/Informations";
import { PreavisRetraiteContext, usePreavisRetraiteStore } from "../store";
import { Note } from "./components/Note";

const InformationsStep = (): JSX.Element => {
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
        <InlineError>{errors.errorPublicodes}</InlineError>
      )}
      {errors.errorNote && <Note message={errors.errorNote} />}
    </>
  );
};

export default InformationsStep;
