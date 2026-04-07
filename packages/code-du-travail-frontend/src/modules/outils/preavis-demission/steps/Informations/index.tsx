import React, { useContext, useEffect } from "react";
import { PreavisDemissionContext, usePreavisDemissionStore } from "../store";
import { fr } from "@codegouvfr/react-dsfr";
import { PubliQuestion } from "src/modules/outils/indemnite-depart/steps/Informations/components/PubliQuestion";
import { AccessibleAlert } from "src/modules/outils/common/components/AccessibleAlert";
import { BulletinDePaie } from "./components";

const InformationsStepComponent = () => {
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
    <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
      <div className={fr.cx("fr-col-lg-6", "fr-col-12")}>
        {informations.map((info, index) => {
          return (
            <PubliQuestion
              key={info.id}
              name={"infos-" + info.question.name}
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
          <AccessibleAlert
            title="Attention"
            severity="error"
            description={errors.errorPublicodes}
            className={["fr-mt-2w"]}
          />
        )}
        {errors.errorNote && (
          <AccessibleAlert
            title="À noter"
            severity="info"
            description={errors.errorNote}
            data-testid="alert-note"
            className={["fr-mt-2w"]}
          />
        )}
      </div>
      <div className={fr.cx("fr-col-lg-6", "fr-col-12")}>
        <p className={fr.cx("fr-mb-3w", "fr-text--md")}>
          Ces informations sont généralement disponible sur le bulletin de paie,
          dans la partie haute précisant les informations du salarié.
        </p>
        <BulletinDePaie />
      </div>
    </div>
  );
};

export default InformationsStepComponent;
