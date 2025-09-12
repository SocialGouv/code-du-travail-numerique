import React, { useContext, useEffect } from "react";
import {
  PreavisLicenciementContext,
  usePreavisLicenciementStore,
} from "../store";
import { fr } from "@codegouvfr/react-dsfr";
import { PubliQuestion } from "src/modules/outils/indemnite-depart/steps/Informations/components/PubliQuestion";
import { AccessibleAlert } from "src/modules/outils/common/components/AccessibleAlert";

const StepInformations = () => {
  const store = useContext(PreavisLicenciementContext);
  const {
    errors,
    onInformationsChange,
    informations,
    generatePublicodesQuestions,
    agreement,
  } = usePreavisLicenciementStore(store, (state) => ({
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
      {errors.errorNote && (
        <div className={fr.cx("fr-mt-2w")}>
          <AccessibleAlert
            title="À noter"
            severity="info"
            description={errors.errorNote}
            data-testid="alert-note"
          />
        </div>
      )}
    </>
  );
};

export default StepInformations;
