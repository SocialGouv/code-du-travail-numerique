import { fr } from "@codegouvfr/react-dsfr";
import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  RadioQuestion,
  TextQuestion,
} from "src/modules/outils/common/components";
import { AccessibleAlert } from "src/modules/outils/common/components/AccessibleAlert";
import { getMotifExampleMessage } from "src/modules/outils/indemnite-depart/agreements";
import { informationToSituation } from "src/modules/outils/indemnite-depart/steps/Informations/components/utils";
import {
  IndemniteDepartContext,
  useIndemniteDepartStore,
} from "src/modules/outils/indemnite-depart/store";
import AbsencePeriods from "./AbsencePeriods";
import { IndemniteDepartType } from "../../../types";
import { AncienneteDisplay } from "../../Anciennete";

const StepAbsences = () => {
  const store = useContext(IndemniteDepartContext);
  const {
    init,
    onChangeAbsencePeriods,
    motifs,
    absencePeriods,
    onChangeHasAbsenceProlonge,
    hasAbsenceProlonge,
    arretTravail,
    onChangeArretTravail,
    errorArretTravail,
    dateArretTravail,
    onChangeDateArretTravail,
    errorDateArretTravail,
    errorAbsenceProlonge,
    errorAbsencePeriods,
    ancienneteEstimee,
    informationData,
    errorPublicodes,
  } = useIndemniteDepartStore(store, (state) => ({
    init: state.absenceFunction.init,
    onChangeAbsencePeriods: state.absenceFunction.onChangeAbsencePeriods,
    motifs: state.absenceData.input.motifs,
    absencePeriods: state.absenceData.input.absencePeriods,
    onChangeHasAbsenceProlonge:
      state.absenceFunction.onChangeHasAbsenceProlonge,
    hasAbsenceProlonge: state.absenceData.input.hasAbsenceProlonge,
    arretTravail: state.absenceData.input.arretTravail,
    dateArretTravail: state.absenceData.input.dateArretTravail,
    onChangeArretTravail: state.absenceFunction.onChangeArretTravail,
    onChangeDateArretTravail: state.absenceFunction.onChangeDateArretTravail,
    errorArretTravail: state.absenceData.error.errorArretTravail,
    errorDateArretTravail: state.absenceData.error.errorDateArretTravail,
    errorAbsenceProlonge: state.absenceData.error.errorAbsenceProlonge,
    errorAbsencePeriods: state.absenceData.error.errorAbsencePeriods,
    agreement: state.agreementData.input.agreement,
    ancienneteEstimee: state.ancienneteData.input.ancienneteEstimee,
    informationData: informationToSituation(
      state.informationsData.input.publicodesInformations
    ),
    errorPublicodes: state.ancienneteData.error.errorPublicodes,
  }));
  const [type, setType] = useState<IndemniteDepartType>(
    IndemniteDepartType.LICENCIEMENT
  );

  const messageMotifExample = useMemo(
    () => getMotifExampleMessage(informationData, true),
    [informationData]
  );

  useEffect(() => {
    setType(init());
  }, [init]);

  return (
    <>
      <div className={fr.cx("fr-mt-2w")}>
        <RadioQuestion
          questions={[
            {
              label: "Oui",
              value: "oui",
              id: "arretTravail-oui",
            },
            {
              label: "Non",
              value: "non",
              id: "arretTravail-non",
            },
          ]}
          name="licenciementArretTravail"
          label={`Le salarié est-il en arrêt de travail au moment ${type === IndemniteDepartType.RUPTURE_CONVENTIONNELLE ? "de la rupture conventionnelle" : "du licenciement"}&nbsp;?`}
          selectedOption={arretTravail}
          onChangeSelectedOption={onChangeArretTravail}
          error={errorArretTravail}
        />
        {arretTravail === "oui" && (
          <TextQuestion
            label="Depuis quelle date le salarié est-il en arrêt&nbsp;?"
            inputType="date"
            value={dateArretTravail}
            onChange={onChangeDateArretTravail}
            error={errorDateArretTravail}
            id="dateArretTravail"
            dataTestId={"date-arret-travail"}
          />
        )}
      </div>
      <div className={fr.cx("fr-mt-2w")}>
        <h3>Période d&apos;absence prolongée</h3>
        <RadioQuestion
          questions={[
            {
              label: "Oui",
              value: "oui",
              id: "hasAbsenceProlonge-oui",
            },
            {
              label: "Non",
              value: "non",
              id: "hasAbsenceProlonge-non",
            },
          ]}
          name="hasAbsenceProlonge"
          label="Y a-t-il eu des absences de plus d’un mois durant le contrat de travail&nbsp;?"
          selectedOption={hasAbsenceProlonge}
          onChangeSelectedOption={onChangeHasAbsenceProlonge}
          error={errorAbsenceProlonge}
        />
        {hasAbsenceProlonge === "oui" && (
          <AbsencePeriods
            onChange={onChangeAbsencePeriods}
            motifs={motifs}
            absences={absencePeriods}
            error={errorAbsencePeriods}
            informationData={informationData}
            messageMotifExample={messageMotifExample}
          />
        )}
        {errorPublicodes && (
          <AccessibleAlert
            title="Erreur"
            description={errorPublicodes}
            severity="error"
            className={["fr-mt-2w"]}
          />
        )}
      </div>
      <AncienneteDisplay anciennete={ancienneteEstimee} />
    </>
  );
};

export default StepAbsences;
