import React, { useContext } from "react";
import { Alert } from "@codegouvfr/react-dsfr/Alert";
import Link from "next/link";
import { RadioQuestion, SelectQuestion } from "../../../common/components";
import {
  PreavisLicenciementContext,
  usePreavisLicenciementStore,
} from "../store";

const StepStatus = (): JSX.Element => {
  const store = useContext(PreavisLicenciementContext);
  const {
    seriousMisconduct,
    disabledWorker,
    seniority,
    error,
    hasBeenSubmit,
    onSeriousMisconductChange,
    onDisabledWorkerChange,
    onSeniorityChange,
  } = usePreavisLicenciementStore(store, (state) => ({
    seriousMisconduct: state.statusData.input.seriousMisconduct,
    disabledWorker: state.statusData.input.disabledWorker,
    seniority: state.statusData.input.seniority,
    error: state.statusData.error,
    hasBeenSubmit: state.statusData.hasBeenSubmit,
    onSeriousMisconductChange: state.statusFunction.onSeriousMisconductChange,
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
        <Alert
          severity="warning"
          title="Pas de préavis en cas de faute grave"
          description={
            <>
              Dans le cas d&apos;un licenciement pour faute grave ou lourde, il
              n&apos;y a pas d&apos;obligation de respecter un préavis. Vous
              pouvez trouver plus d&apos;informations sur le préavis de
              licenciement sur{" "}
              <Link href={`/fiche-service-public/preavis-de-licenciement`}>
                cette fiche
              </Link>
              .
            </>
          }
        />
      )}

      {seriousMisconduct === false && (
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

      {typeof disabledWorker !== "undefined" && !seriousMisconduct && (
        <SelectQuestion
          name="seniority"
          label="Ancienneté du salarié"
          subLabel="L'ancienneté du salarié est habituellement mentionnée sur le bulletin de salaire."
          options={[
            ["'Moins de 6 mois'", "Moins de 6 mois"],
            ["'De 6 mois à moins de 2 ans'", "De 6 mois à moins de 2 ans"],
            ["'2 ans et plus'", "2 ans et plus"],
          ]}
          selectedOption={seniority?.value || ""}
          onChangeSelectedOption={(selectedValue) => {
            if (selectedValue === "'Moins de 6 mois'") {
              onSeniorityChange({
                value: "'Moins de 6 mois'",
                label: "Moins de 6 mois",
              });
            } else if (selectedValue === "'De 6 mois à moins de 2 ans'") {
              onSeniorityChange({
                value: "'De 6 mois à moins de 2 ans'",
                label: "De 6 mois à moins de 2 ans",
              });
            } else if (selectedValue === "'2 ans et plus'") {
              onSeniorityChange({
                value: "'2 ans et plus'",
                label: "2 ans et plus",
              });
            }
          }}
          error={hasBeenSubmit && error.seniority ? error.seniority : undefined}
        />
      )}
    </>
  );
};

export default StepStatus;
