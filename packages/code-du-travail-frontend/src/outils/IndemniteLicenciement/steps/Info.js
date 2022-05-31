import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";
import { Alert, Paragraph } from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import { A11yLink } from "../../../common/A11yLink";
import { YesNoQuestion } from "../../common/YesNoQuestion";
import { TypeContrat } from "../components/TypeContrat.tsx";

function validate(values) {
  const errors = {};

  if (values.contrat && values.contrat !== "cdi") {
    errors.contrat = (
      <Paragraph noMargin>
        L’indemnité de licenciement n’est pas dûe pour les CDD et contrats de
        travail temporaires. Sous certaines conditions, le salarié peut avoir le
        droit à une&nbsp;
        <Link href={`${getRouteBySource(SOURCES.TOOLS)}/imdemnite-precarite`}>
          <A11yLink
            href="/fiche-service-public/le-salarie-touche-t-il-la-prime-de-precarite-a-la-fin-dun-contrat-de-travail"
            target="_blank"
            rel="noopener noreferrer"
          >
            indemnité de précarité (nouvelle fenêtre)
          </A11yLink>
        </Link>
        .
      </Paragraph>
    );
  }
  if (values.fauteGrave) {
    errors.fauteGrave = (
      <Alert variant="primary" role="alert">
        <Title>À noter</Title>
        <Paragraph noMargin>
          <strong>
            L’indemnité légale de licenciement n’est pas dûe en cas de faute
            grave.
          </strong>
          <br />
          Lorsqu’il est invoqué, le motif de faute grave doit apparaître
          précisément dans le courrier. Reportez vous à la lettre de
          notification de licenciement.
        </Paragraph>
      </Alert>
    );
  }
  return errors;
}

const StepInfo = () => {
  return (
    <>
      <TypeContrat name="contrat" />
      <YesNoQuestion
        name="fauteGrave"
        label="Le licenciement est-il dû à une faute grave (ou lourde)&nbsp;?"
      />
      <YesNoQuestion
        name="inaptitude"
        label="Le licenciement est-il dû à une inaptitude suite à un accident du travail ou maladie professionnelle reconnue&nbsp;?"
      />
    </>
  );
};

StepInfo.validate = validate;
export default StepInfo;

const Title = styled.p.attrs({
  "aria-level": "2",
  role: "heading",
})`
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
`;
