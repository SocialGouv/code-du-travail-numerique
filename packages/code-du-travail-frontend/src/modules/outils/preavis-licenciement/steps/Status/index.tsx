import React, { useContext } from "react";
import { RadioQuestion, SelectQuestion } from "../../../common/components";
import {
  PreavisLicenciementContext,
  usePreavisLicenciementStore,
} from "../store";
import { Seniority } from "./store/types";
import { AccessibleAlert } from "src/modules/outils/common/components/AccessibleAlert";
import Link from "src/modules/common/Link";

const StepStatus = () => {
  const store = useContext(PreavisLicenciementContext);
  const {
    seriousMisconduct,
    inaptitudeNonPro,
    disabledWorker,
    seniority,
    error,
    hasBeenSubmit,
    onSeriousMisconductChange,
    onInaptitudeNonProChange,
    onDisabledWorkerChange,
    onSeniorityChange,
  } = usePreavisLicenciementStore(store, (state) => ({
    seriousMisconduct: state.statusData.input.seriousMisconduct,
    inaptitudeNonPro: state.statusData.input.inaptitudeNonPro,
    disabledWorker: state.statusData.input.disabledWorker,
    seniority: state.statusData.input.seniority,
    error: state.statusData.error,
    hasBeenSubmit: state.statusData.hasBeenSubmit,
    onSeriousMisconductChange: state.statusFunction.onSeriousMisconductChange,
    onInaptitudeNonProChange: state.statusFunction.onInaptitudeNonProChange,
    onDisabledWorkerChange: state.statusFunction.onDisabledWorkerChange,
    onSeniorityChange: state.statusFunction.onSeniorityChange,
  }));

  return (
    <>
      <RadioQuestion
        label="Le licenciement est-il dû à une faute grave (ou lourde) ?"
        name="seriousMisconduct"
        questions={[
          {
            label: "Oui",
            value: "true",
            id: "seriousMisconduct-true",
          },
          {
            label: "Non",
            value: "false",
            id: "seriousMisconduct-false",
          },
        ]}
        selectedOption={seriousMisconduct?.toString()}
        onChangeSelectedOption={(value) =>
          onSeriousMisconductChange(value === "true")
        }
        error={
          hasBeenSubmit && error.seriousMisconduct
            ? error.seriousMisconduct
            : undefined
        }
      />

      {seriousMisconduct === true && (
        <AccessibleAlert
          severity="warning"
          title="Pas de préavis en cas de faute grave"
          description={
            <p>
              Dans le cas d&apos;un licenciement pour faute grave ou lourde, il
              n&apos;y a pas d&apos;obligation de respecter un préavis.
              Retrouvez plus d&apos;informations dans{" "}
              <Link href={`/fiche-service-public/preavis-de-licenciement`}>
                notre fiche sur le préavis de licenciement
              </Link>
              .
            </p>
          }
        />
      )}

      {seriousMisconduct === false && (
        <>
          <RadioQuestion
            label="Le licenciement est-il dû à une inaptitude d'origine non professionnelle ?"
            name="inaptitudePro"
            questions={[
              {
                label: "Oui",
                value: "true",
                id: "inaptitude-non-pro-true",
              },
              {
                label: "Non",
                value: "false",
                id: "inaptitude-non-pro-false",
              },
            ]}
            selectedOption={inaptitudeNonPro?.toString()}
            onChangeSelectedOption={(value) =>
              onInaptitudeNonProChange(value === "true")
            }
            error={
              hasBeenSubmit && error.inaptitudeNonPro
                ? error.inaptitudeNonPro
                : undefined
            }
          />

          {inaptitudeNonPro === true && (
            <AccessibleAlert
              severity="warning"
              title="Pas de préavis en cas d’inaptitude d’origine non professionnelle"
              description={
                <p>
                  Dans le cas d&apos;un licenciement pour d’inaptitude d’origine
                  non professionnelle, il n&apos;y a pas d&apos;obligation de
                  respecter un préavis. Le salarié ne perçoit pas
                  d&apos;indemnité compensatrice de préavis.
                </p>
              }
            />
          )}

          {inaptitudeNonPro === false && (
            <RadioQuestion
              label="Le salarié concerné est-il reconnu en tant que travailleur handicapé ?"
              name="disabledWorker"
              questions={[
                {
                  label: "Oui",
                  value: "true",
                  id: "disabledWorker-true",
                },
                {
                  label: "Non",
                  value: "false",
                  id: "disabledWorker-false",
                },
              ]}
              selectedOption={disabledWorker?.toString()}
              onChangeSelectedOption={(value) =>
                onDisabledWorkerChange(value === "true")
              }
              error={
                hasBeenSubmit && error.disabledWorker
                  ? error.disabledWorker
                  : undefined
              }
            />
          )}

          {typeof disabledWorker !== "undefined" &&
            !seriousMisconduct &&
            !inaptitudeNonPro && (
              <SelectQuestion
                name="seniority"
                label="Quelle est l'ancienneté du salarié ?"
                subLabel="L'ancienneté du salarié est habituellement mentionnée sur le bulletin de salaire."
                options={[
                  ["'Moins de 6 mois'" as Seniority, "Moins de 6 mois"],
                  [
                    "'6 mois à moins de 2 ans'" as Seniority,
                    "De 6 mois à moins de 2 ans",
                  ],
                  ["'Plus de 2 ans'" as Seniority, "2 ans et plus"],
                ]}
                selectedOption={seniority || ""}
                onChangeSelectedOption={(selectedValue) => {
                  onSeniorityChange(selectedValue as Seniority);
                }}
                error={
                  hasBeenSubmit && error.seniority ? error.seniority : undefined
                }
              />
            )}
        </>
      )}
    </>
  );
};

export default StepStatus;
