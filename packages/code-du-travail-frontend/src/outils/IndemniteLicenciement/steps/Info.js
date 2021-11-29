import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";
import { Alert, Fieldset, Legend } from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import { A11yLink } from "../../../common/A11yLink";
import { YesNoQuestion } from "../../common/YesNoQuestion";
import { TypeContrat } from "../components/TypeContrat";

function validate(values) {
  const errors = {};

  if (values.contrat && values.contrat !== "cdi") {
    errors.contrat = (
      <>
        L’indemnité de licenciement n’est pas dûe pour les CDD et contrats de
        travail temporaires. Sous certaines conditions, le salarié peut avoir le
        droit à une&nbsp;
        <Link href={`${getRouteBySource(SOURCES.TOOLS)}/imdemnite-precarite`}>
          <A11yLink
            href="/fiche-service-public/qui-peut-toucher-la-prime-de-precarite-a-la-fin-dun-contrat-de-travail"
            target="_blank"
            el="noopener noreferrer"
          >
            indemnité de précarité (nouvelle fenêtre)
          </A11yLink>
        </Link>
        .
      </>
    );
  }
  if (values.fauteGrave) {
    errors.fauteGrave = (
      <Alert variant="primary" role="alert">
        <Title>À noter</Title>
        <b>
          L’indemnité légale de licenciement n’est pas dûe en cas de faute
          grave.
        </b>
        <br />
        Lorsqu’il est invoqué, le motif de faute grave doit apparaître
        précisément dans le courrier. Reportez vous à la lettre de notification
        de licenciement.
      </Alert>
    );
  }
  return errors;
}

function StepInfo() {
  return (
    <Fieldset>
      <Legend isInvisible>Contrat de travail</Legend>
      <TypeContrat name="contrat" hasNoMarginTop={true} />
      <YesNoQuestion
        name="fauteGrave"
        label="Le licenciement est-il dû à une faute grave (ou lourde)&nbsp;?"
      />
      <YesNoQuestion
        name="inaptitude"
        label="Le licenciement est-il dû à une inaptitude suite à un accident du travail ou maladie professionnelle reconnue&nbsp;?"
      />
    </Fieldset>
  );
}
StepInfo.validate = validate;
export { StepInfo };

const Title = styled.p`
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
`;
