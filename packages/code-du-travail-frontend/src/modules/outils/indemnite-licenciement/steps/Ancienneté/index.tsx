import { fr } from "@codegouvfr/react-dsfr";
import React, { useContext, useEffect, useMemo } from "react";
import {
  RadioQuestion,
  TextQuestion,
} from "src/modules/outils/common/components";
import { AccessibleAlert } from "src/modules/outils/common/components/AccessibleAlert";
import { getMotifExampleMessage } from "src/modules/outils/indemnite-depart/agreements";
import { AbsencePeriods } from "src/modules/outils/indemnite-depart/steps/Anciennete";
import { informationToSituation } from "src/modules/outils/indemnite-depart/steps/Informations/components/utils";
import {
  IndemniteDepartContext,
  useIndemniteDepartStore,
} from "src/modules/outils/indemnite-depart/store";

const StepAnciennete = () => {
  const store = useContext(IndemniteDepartContext);
  const {
    init,
    onChangeAbsencePeriods,
    motifs,
    absencePeriods,
    onChangeHasAbsenceProlonge,
    hasAbsenceProlonge,
    dateEntree,
    onChangeDateEntree,
    dateSortie,
    onChangeDateSortie,
    dateNotification,
    onChangeDateNotification,
    errorDateNotification,
    errorDateSortie,
    errorAbsenceProlonge,
    errorDateEntree,
    errorAbsencePeriods,
    informationData,
    errorPublicodes,
  } = useIndemniteDepartStore(store, (state) => ({
    init: state.ancienneteFunction.init,
    onChangeAbsencePeriods: state.ancienneteFunction.onChangeAbsencePeriods,
    motifs: state.ancienneteData.input.motifs,
    absencePeriods: state.ancienneteData.input.absencePeriods,
    onChangeHasAbsenceProlonge:
      state.ancienneteFunction.onChangeHasAbsenceProlonge,
    hasAbsenceProlonge: state.ancienneteData.input.hasAbsenceProlonge,
    dateEntree: state.ancienneteData.input.dateEntree,
    onChangeDateEntree: state.ancienneteFunction.onChangeDateEntree,
    dateSortie: state.ancienneteData.input.dateSortie,
    onChangeDateSortie: state.ancienneteFunction.onChangeDateSortie,
    dateNotification: state.ancienneteData.input.dateNotification,
    onChangeDateNotification: state.ancienneteFunction.onChangeDateNotification,
    errorDateNotification: state.ancienneteData.error.errorDateNotification,
    errorDateSortie: state.ancienneteData.error.errorDateSortie,
    errorAbsenceProlonge: state.ancienneteData.error.errorAbsenceProlonge,
    errorDateEntree: state.ancienneteData.error.errorDateEntree,
    errorAbsencePeriods: state.ancienneteData.error.errorAbsencePeriods,
    agreement: state.agreementData.input.agreement,
    informationData: informationToSituation(
      state.informationsData.input.publicodesInformations
    ),
    errorPublicodes: state.ancienneteData.error.errorPublicodes,
  }));

  const messageMotifsExample = useMemo(
    () => getMotifExampleMessage(informationData, false),
    [informationData]
  );

  useEffect(() => {
    init();
  }, [init]);

  return (
    <>
      <div className={fr.cx("fr-mt-2w")}>
        <h3>Dates de début et de fin de contrat</h3>
        <TextQuestion
          label="Quelle est la date de début du contrat de travail&nbsp;?"
          inputType="date"
          value={dateEntree}
          onChange={onChangeDateEntree}
          error={errorDateEntree}
          id="dateEntree"
          dataTestId={"date-entree"}
        />
        <TextQuestion
          label="Quelle est la date de notification du licenciement&nbsp;?"
          inputType="date"
          value={dateNotification}
          onChange={onChangeDateNotification}
          error={errorDateNotification}
          id="dateNotification"
          dataTestId={"date-notification"}
        />
        <TextQuestion
          label="Quelle est la date de fin du préavis de licenciement (date de fin du contrat)&nbsp;?"
          inputType="date"
          value={dateSortie}
          onChange={onChangeDateSortie}
          error={errorDateSortie}
          id="dateSortie"
          dataTestId={"date-sortie"}
          subLabel="En cas de dispense de préavis à l'initiative de l'employeur, ou si le licenciement intervient à la suite d'un avis d'inaptitude non professionnelle, indiquer la date de fin du préavis « théorique » non effectué."
        />
      </div>
      <div className={fr.cx("fr-mt-2w")}>
        <h3>Période d&apos;absence prolongée</h3>
        <p>
          Pour rendre la saisie de l&apos;outil plus simple, les absences de
          moins d&apos;un mois ne sont pas comptabilisées. Or, ces absences
          peuvent impacter l&apos;ancienneté et donner ainsi lieu à un montant
          d&apos;indemnité inférieur à celui calculé par notre simulateur.
        </p>
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
          label="Y a-t-il eu des absences de plus d'un mois durant le contrat de travail&nbsp;?"
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
            messageMotifExample={messageMotifsExample}
          />
        )}
      </div>
      {errorPublicodes && (
        <AccessibleAlert
          title="Attention"
          description={errorPublicodes}
          severity="error"
          className={["fr-mt-2w"]}
        />
      )}
    </>
  );
};

export default StepAnciennete;
