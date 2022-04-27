import { Alert, InputRadio, Paragraph, Text, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import styled from "styled-components";

import { ErrorField } from "../../../common/ErrorField";
import { Question } from "../../../common/Question";
import { RadioContainer } from "../../../common/stepStyles";
import { required } from "../../../common/validators";
import { OriginMandatoryName } from "../../types";
import { Origin } from "../../state";

export type OriginStepProps = {
  showWarning: boolean;
  onChange: (type: Origin) => void;
};

function OriginStep({ showWarning, onChange }: OriginStepProps): JSX.Element {
  return (
    <>
      <Question required>
        Qui est à l’origine du départ en retraite&nbsp;?
      </Question>
      <RadioContainer>
        <Field
          type="radio"
          name={OriginMandatoryName}
          value="non"
          validate={required}
        >
          {(props) => (
            <InputRadio
              label="Le salarié décide lui-même de partir à la retraite"
              id={`${props.input.name}-depart`}
              {...props.input}
            />
          )}
        </Field>
        <Field
          type="radio"
          name={OriginMandatoryName}
          value="oui"
          validate={required}
        >
          {(props) => (
            <InputRadio
              label="L'employeur décide de mettre le salarié à la retraite"
              id={`${props.input.name}-mise`}
              {...props.input}
            />
          )}
        </Field>
        {showWarning && (
          <StyledAlert variant="primary">
            <Paragraph noMargin>
              <Text variant="primary" fontSize="hsmall" fontWeight="700">
                À noter
              </Text>
              <br />
              L&apos;employeur qui décide une mise à la retraite doit en avoir
              informé son salarié.
              <br />
              Plus d&apos;info&nbsp;:{" "}
              <a
                href="/fiche-service-public/lemployeur-peut-il-mettre-doffice-un-salarie-a-la-retraite"
                target="_blank"
              >
                L&apos;employeur peut-il mettre d&apos;office un salarié à la
                retraite ?
              </a>
            </Paragraph>
          </StyledAlert>
        )}
        <ErrorField name="contrat salarié - mise à la retraite" />
        <OnChange name={OriginMandatoryName}>
          {(values: "oui" | "non") => {
            onChange?.(values === "oui" ? "mise" : "départ");
          }}
        </OnChange>
      </RadioContainer>
    </>
  );
}

const { spacings } = theme;

const StyledAlert = styled(Alert)`
  margin-top: ${spacings.medium};
  width: 100%;
`;

export default OriginStep;
