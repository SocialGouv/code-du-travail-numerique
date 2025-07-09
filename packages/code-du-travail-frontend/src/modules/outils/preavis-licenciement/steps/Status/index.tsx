import React, { useContext } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { Alert } from "@codegouvfr/react-dsfr/Alert";
import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { Select } from "@codegouvfr/react-dsfr/Select";
import Link from "next/link";
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
      <div className={fr.cx("fr-mb-3w")}>
        <RadioButtons
          legend="Le licenciement est-il dû à une faute grave (ou lourde) ?"
          name="seriousMisconduct"
          options={[
            {
              label: "Oui",
              nativeInputProps: {
                value: "true",
                checked: seriousMisconduct === true,
                onChange: () => onSeriousMisconductChange(true),
              },
            },
            {
              label: "Non",
              nativeInputProps: {
                value: "false",
                checked: seriousMisconduct === false,
                onChange: () => onSeriousMisconductChange(false),
              },
            },
          ]}
          state={hasBeenSubmit && error.seriousMisconduct ? "error" : "default"}
          stateRelatedMessage={
            hasBeenSubmit && error.seriousMisconduct
              ? error.seriousMisconduct
              : undefined
          }
          orientation="horizontal"
        />
      </div>

      {/* Message d'erreur pour faute grave */}
      {seriousMisconduct === true && (
        <div className={fr.cx("fr-mb-3w")}>
          <Alert
            severity="warning"
            title="Pas de préavis en cas de faute grave"
            description={
              <>
                Dans le cas d&apos;un licenciement pour faute grave ou lourde,
                il n&apos;y a pas d&apos;obligation de respecter un préavis.
                Vous pouvez trouver plus d&apos;informations sur le préavis de
                licenciement sur{" "}
                <Link href={`/fiche-service-public/preavis-de-licenciement`}>
                  cette fiche
                </Link>
                .
              </>
            }
          />
        </div>
      )}

      {/* Question sur le travailleur handicapé */}
      {seriousMisconduct === false && (
        <div className={fr.cx("fr-mb-3w")}>
          <RadioButtons
            legend="Le salarié concerné est-il reconnu en tant que travailleur handicapé ?"
            name="disabledWorker"
            options={[
              {
                label: "Oui",
                nativeInputProps: {
                  value: "true",
                  checked: disabledWorker === true,
                  onChange: () => onDisabledWorkerChange(true),
                },
              },
              {
                label: "Non",
                nativeInputProps: {
                  value: "false",
                  checked: disabledWorker === false,
                  onChange: () => onDisabledWorkerChange(false),
                },
              },
            ]}
            state={hasBeenSubmit && error.disabledWorker ? "error" : "default"}
            stateRelatedMessage={
              hasBeenSubmit && error.disabledWorker
                ? error.disabledWorker
                : undefined
            }
            orientation="horizontal"
          />
        </div>
      )}

      {/* Question sur l'ancienneté */}
      {typeof disabledWorker !== "undefined" && !seriousMisconduct && (
        <div className={fr.cx("fr-mb-3w")}>
          <Select
            label="Ancienneté du salarié"
            hint="Choisissez parmi les catégories d'ancienneté telles que définies par le Code du travail"
            state={hasBeenSubmit && error.seniority ? "error" : "info"}
            stateRelatedMessage={
              hasBeenSubmit && error.seniority
                ? error.seniority
                : "L'ancienneté du salarié est habituellement mentionnée sur le bulletin de salaire."
            }
            nativeSelectProps={{
              value: seniority?.value || "",
              onChange: (e) => {
                const selectedValue = e.target.value;
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
              },
            }}
          >
            <option value="">Sélectionnez une option</option>
            <option value="'Moins de 6 mois'">Moins de 6 mois</option>
            <option value="'De 6 mois à moins de 2 ans'">
              De 6 mois à moins de 2 ans
            </option>
            <option value="'2 ans et plus'">2 ans et plus</option>
          </Select>
        </div>
      )}

      {/* Information sur l'ancienneté pour les travailleurs handicapés */}
      {disabledWorker === true &&
        typeof disabledWorker !== "undefined" &&
        !seriousMisconduct && (
          <div className={fr.cx("fr-mb-3w")}>
            <Alert
              severity="info"
              title="Information pour les travailleurs handicapés"
              description={
                <>
                  En tant que travailleur handicapé, vous bénéficiez d&apos;une
                  durée de préavis doublée par rapport à la durée légale ou
                  conventionnelle, dans la limite de 3 mois maximum.
                </>
              }
            />
          </div>
        )}
    </>
  );
};

export default StepStatus;
