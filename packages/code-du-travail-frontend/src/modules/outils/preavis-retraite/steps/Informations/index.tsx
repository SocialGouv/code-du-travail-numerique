import React, { useContext } from "react";
import { PreavisRetraiteContext, usePreavisRetraiteStore } from "../store";
import { fr } from "@codegouvfr/react-dsfr";
import { PubliQuestion } from "src/modules/outils/indemnite-depart/steps/Informations/components/PubliQuestion";
import { AccessibleAlert } from "src/modules/outils/common/components/AccessibleAlert";

const StepInformations = () => {
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
          />
        );
      })}
      {errors.errorPublicodes && (
        <div className={fr.cx("fr-mt-2w")}>
          <AccessibleAlert
            title="Attention"
            severity="error"
            description={errors.errorPublicodes}
            autoFocus
          />
        </div>
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
