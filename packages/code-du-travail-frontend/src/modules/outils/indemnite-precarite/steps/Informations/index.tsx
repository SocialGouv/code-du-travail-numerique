import React, { useContext, useEffect } from "react";
import {
  IndemnitePrecariteContext,
  useIndemnitePrecariteStore,
} from "../store";
import { fr } from "@codegouvfr/react-dsfr";
import { PubliQuestion } from "src/modules/outils/indemnite-depart/steps/Informations/components/PubliQuestion";
import Alert from "@codegouvfr/react-dsfr/Alert";

const InformationsStepComponent = (): JSX.Element => {
  const store = useContext(IndemnitePrecariteContext);
  const {
    errors,
    onInformationsChange,
    informations,
    generatePublicodesQuestions,
    checkIneligibility,
    agreement,
    hasNoMissingQuestions,
    informationError,
  } = useIndemnitePrecariteStore(store, (state) => ({
    errors: state.informationsData.error,
    onInformationsChange: state.informationsFunction.onInformationsChange,
    informations: state.informationsData.input.publicodesInformations,
    generatePublicodesQuestions:
      state.informationsFunction.generatePublicodesQuestions,
    checkIneligibility: state.informationsFunction.checkIneligibility,
    agreement: state.agreementData.input.agreement,
    hasNoMissingQuestions: state.informationsData.input.hasNoMissingQuestions,
    informationError: state.informationsData.input.informationError,
  }));

  useEffect(() => {
    if (agreement) {
      generatePublicodesQuestions();
    }
  }, [agreement, generatePublicodesQuestions]);

  // Vérifier l'ineligibility après chaque changement
  const isIneligible = checkIneligibility();

  return (
    <>
      {/* Affichage d'un message d'ineligibility si applicable */}
      {isIneligible && (
        <Alert
          severity="warning"
          title="Vous n'êtes pas éligible à l'indemnité de précarité"
          description="Selon les informations que vous avez fournies, vous ne remplissez pas les conditions pour bénéficier de l'indemnité de précarité."
          className={fr.cx("fr-mb-2w")}
        />
      )}

      {/* Questions dynamiques générées par publicodes */}
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

      {/* Message si aucune question à afficher */}
      {informations.length === 0 &&
        hasNoMissingQuestions &&
        !informationError && (
          <p className={fr.cx("fr-mt-2w")}>
            Aucune information supplémentaire à renseigner. Vous pouvez passer à
            l&apos;étape suivante.
          </p>
        )}

      {/* Erreur publicodes */}
      {errors.errorPublicodes && (
        <Alert
          severity="error"
          title="Erreur de calcul"
          description={errors.errorPublicodes}
          className={fr.cx("fr-mt-2w")}
        />
      )}

      {/* Informations d'aide */}
      {!isIneligible && (
        <div
          className={fr.cx("fr-mt-4w", "fr-p-2w")}
          style={{ backgroundColor: "#e3f2fd" }}
        >
          <h4 className={fr.cx("fr-mb-1w")}>💡 Bon à savoir</h4>
          <p className={fr.cx("fr-mb-0")} style={{ fontSize: "0.9rem" }}>
            L&apos;indemnité de précarité est généralement égale à 10% de la
            rémunération brute totale perçue pendant le contrat. Certaines
            conventions collectives peuvent prévoir des dispositions
            particulières.
          </p>
        </div>
      )}
    </>
  );
};

export default InformationsStepComponent;
