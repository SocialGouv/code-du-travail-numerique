import React from "react";
import { Container } from "@cdt/ui/";
import { TypeContrat } from "../components/TypeContrat";
import { YesNoQuestion } from "../components/YesNoQuestion";

function validate(values) {
  const errors = {};

  if (values.contrat && values.contrat !== "cdi") {
    errors.contrat = (
      <>
        Vous ne pouvez pas obtenir d’indemnité de licenciement si vous êtes en
        CDD ou en contrat de travail temporaire. Sous certaines conditions, vous
        avez le droit à une&nbsp;
        <a
          href="/fiche-service-public/qui-peut-toucher-la-prime-de-precarite-a-la-fin-dun-contrat-de-travail"
          target="_blank"
          el="noopener noreferrer"
        >
          prime de précarité
        </a>
      </>
    );
  }
  if (values.fauteGrave) {
    errors.fauteGrave = (
      <>
        L’indemnité légale de licenciement n’est pas dûe en cas de faute grave.
        <br />
        Vous reporter à la lettre de notification de licenciement, lorsqu’il est
        invoqué le motif de faute grave doit apparaître précisément dans le
        courrier.
      </>
    );
  }
  return errors;
}

function StepInfo() {
  return (
    <Container>
      <TypeContrat />
      <YesNoQuestion
        name="fauteGrave"
        label="Êtes-vous licencié(e) pour faute grave ou lourde&nbsp;?"
      />
      <YesNoQuestion
        name="inaptitude"
        label="Êtes-vous licencié(e) pour inaptitude suite à accident du travail ou
        maladie professionnelle reconnue&nbsp;?"
      />
    </Container>
  );
}
StepInfo.validate = validate;
export { StepInfo };
