import React from "react";
import { TypeContrat } from "../components/TypeContrat";
import { YesNoQuestion } from "../../common/YesNoQuestion";

function validate(values) {
  const errors = {};

  if (values.contrat && values.contrat !== "cdi") {
    errors.contrat = (
      <>
        L’indemnité de licenciement n’est pas due pour les CDD et contrats de
        travail temporaires. Sous certaines conditions, le salarié peut avoir le
        droit à une&nbsp;
        <a
          href="/fiche-service-public/qui-peut-toucher-la-prime-de-precarite-a-la-fin-dun-contrat-de-travail"
          target="_blank"
          el="noopener noreferrer"
        >
          indemnité de précarité
        </a>
        .
      </>
    );
  }
  if (values.fauteGrave) {
    errors.fauteGrave = (
      <>
        L’indemnité légale de licenciement n’est pas dûe en cas de faute grave.
        <br />
        Lorsqu’il est invoqué, le motif de faute grave doit apparaître
        précisément dans le courrier. Reportez vous à la lettre de notification
        de licenciement.
      </>
    );
  }
  return errors;
}

function StepInfo() {
  return (
    <>
      <TypeContrat name="contrat" />
      <YesNoQuestion
        name="fauteGrave"
        label="Le licenciement est-il dû à une faute grave ou lourde&nbsp;?"
      />
      <YesNoQuestion
        name="inaptitude"
        label="Le licenciement est-il dû à une inaptitude suite à un accident du travail ou maladie professionnelle reconnue&nbsp;?"
      />
    </>
  );
}
StepInfo.validate = validate;
export { StepInfo };
