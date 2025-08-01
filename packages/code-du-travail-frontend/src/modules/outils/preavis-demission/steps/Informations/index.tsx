import React, { useContext, useEffect } from "react";
import { PreavisDemissionContext, usePreavisDemissionStore } from "../store";
import { fr } from "@codegouvfr/react-dsfr";
import { PubliQuestion } from "src/modules/outils/indemnite-depart/steps/Informations/components/PubliQuestion";
import { Note } from "src/modules/outils/preavis-retraite/steps/Informations/components/Note";

const InformationsStepComponent = (): JSX.Element => {
  const store = useContext(PreavisDemissionContext);
  const {
    errors,
    onInformationsChange,
    informations,
    generatePublicodesQuestions,
    agreement,
  } = usePreavisDemissionStore(store, (state) => ({
    errors: state.informationsData.error,
    onInformationsChange: state.informationsFunction.onInformationsChange,
    informations: state.informationsData.input.publicodesInformations,
    generatePublicodesQuestions:
      state.informationsFunction.generatePublicodesQuestions,
    agreement: state.agreementData.input.agreement,
  }));

  useEffect(() => {
    if (agreement) {
      generatePublicodesQuestions();
    }
  }, [agreement, generatePublicodesQuestions]);

  return (
    <>
      {informations.map((info, index) => {
        return (
          <PubliQuestion
            key={info.id}
            name={"infos." + info.question.name}
            rule={info.question.rule}
            value={info.info}
            onChange={(v: any) => {
              onInformationsChange(
                info.question.rule.nom,
                v,
                info.question.rule.cdtn?.type
              );
            }}
            error={
              errors.errorInformations[info.question.rule.nom] ?? undefined
            }
            autoFocus={index === 0}
          />
        );
      })}
      {informations.length === 0 && (
        <p className={fr.cx("fr-mt-2w")}>
          Aucune information à renseigner. Vous pouvez passer à l&apos;étape
          suivante.
        </p>
      )}
      {errors.errorPublicodes && (
        <p className={fr.cx("fr-error-text")}>{errors.errorPublicodes}</p>
      )}
      {errors.errorNote && <Note message={errors.errorNote} />}
    </>
  );
};

export default InformationsStepComponent;
