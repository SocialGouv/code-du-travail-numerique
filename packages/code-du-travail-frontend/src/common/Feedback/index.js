import {
  Button,
  Container,
  Heading,
  InputCheckbox,
  Section,
  Text,
  Textarea,
  theme,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import React, { useCallback, useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import styled from "styled-components";

import { matopush } from "../../piwik";
import { ServiceRenseignementModal } from "../ServiceRenseignementModal";

function baseUrl(url) {
  return url.replace(/\?.*$/, "");
}
const responseType = [
  ["unclear", "Les informations ne sont pas claires."],
  [
    "unrelated",
    "Cette page ne correspond pas à ma recherche ou à ma situation.",
  ],
  ["unsatisfied", "Je ne suis pas satisfait de cette réglementation."],
  ["wrong", "Les informations me semblent fausses."],
];
function Feedback({ url = document ? document.location.href : "" }) {
  const [isSatisfied, setSatisfaction] = useState(null); // null, true, false,
  const onSetSatisfaction = (answer) => {
    setSatisfaction(answer);
  };

  useEffect(() => {
    if (isSatisfied !== null) {
      matopush([
        "trackEvent",
        "feedback",
        isSatisfied ? "positive" : "negative",
        baseUrl(url),
      ]);
    }
  }, [isSatisfied, url]);

  const submitCallback = useCallback((values, form, complete) => {
    if (values.suggestion) {
      matopush([
        "trackEvent",
        "feedback_suggestion",
        values.suggestion,
        baseUrl(url),
      ]);
    }
    if (values?.category?.length > 0) {
      values.category.map((category) => {
        const [, label] = responseType.find(([key]) => key === category);
        matopush(["trackEvent", "feedback_category", label, baseUrl(url)]);
      });
    }
    complete();
  }, []);

  const validateForm = (values) => {
    if (values?.suggestion?.trim().length > 0 || values?.category?.length > 0) {
      return {};
    }
    return { suggestion: "Required" };
  };
  return (
    <StyledSection>
      <Container>
        <Wrapper variant="light">
          <Flex>
            <Heading
              as={StyledStrong}
              variant="primary"
              stripe="left"
              shift={theme.spacings.xmedium}
            >
              {isSatisfied === null ? (
                <span>Avez-vous trouvé la réponse à votre question&nbsp;?</span>
              ) : (
                <span role="status">Merci pour votre réponse.</span>
              )}
            </Heading>
            {isSatisfied === null && (
              <YesNo>
                <StyledButton
                  variant="flat"
                  onClick={() => onSetSatisfaction(false)}
                >
                  Non
                </StyledButton>
                <StyledButton
                  variant="flat"
                  onClick={() => onSetSatisfaction(true)}
                >
                  Oui
                </StyledButton>
              </YesNo>
            )}
          </Flex>
          {isSatisfied !== null && (
            <Form
              onSubmit={submitCallback}
              validate={validateForm}
              render={({ handleSubmit, form }) => {
                const state = form.getState();
                if (state.submitSucceeded) {
                  return (
                    <FullWidthParagraph role="status">
                      L’équipe du Code du travail numérique vous remercie pour
                      votre réponse.
                    </FullWidthParagraph>
                  );
                }
                return (
                  <form onSubmit={handleSubmit}>
                    {isSatisfied === false && (
                      <Fieldset>
                        <Legend>Pouvez-vous nous en dire plus&nbsp;?</Legend>
                        {responseType.map(([key, label]) => (
                          <Field
                            name="category"
                            key={key}
                            value={key}
                            type="checkbox"
                          >
                            {(props) => (
                              <InputCheckbox
                                id={key}
                                label={label}
                                {...props.input}
                              />
                            )}
                          </Field>
                        ))}
                      </Fieldset>
                    )}
                    <Label htmlFor="suggestion">
                      Faire une suggestion pour améliorer cette page
                    </Label>
                    <Field name="suggestion">
                      {(props) => (
                        <>
                          <StyledTextarea
                            id="suggestion"
                            placeholder="Une idée, une suggestion..."
                            maxLength={150}
                            showCounter
                            rows={3}
                            cols={50}
                            {...props.input}
                          />
                          {props.meta.error && state.submitFailed && (
                            <ErrorText fontWeight="600" role="alert">
                              {isSatisfied === true
                                ? "Veuillez renseigner le champ suggestion."
                                : "Veuillez renseigner au moins un champ."}
                            </ErrorText>
                          )}
                        </>
                      )}
                    </Field>
                    <ButtonWrapper>
                      <StyledButton
                        disabled={state.submitting}
                        variant="flat"
                        small
                      >
                        Envoyer
                      </StyledButton>
                    </ButtonWrapper>
                  </form>
                );
              }}
            />
          )}
          {isSatisfied === false && (
            <p>
              Pour obtenir une réponse à votre question de droit du travail,
              nous vous invitons à joindre{" "}
              <ServiceRenseignementModal>
                {(openSRModal) => (
                  <Button
                    type="button"
                    variant="link"
                    onClick={(e) => {
                      openSRModal(e);
                    }}
                  >
                    les services du ministère du Travail en région
                  </Button>
                )}
              </ServiceRenseignementModal>
            </p>
          )}
        </Wrapper>
      </Container>
    </StyledSection>
  );
}

export { Feedback };

const { breakpoints, spacings } = theme;

const StyledSection = styled(Section)`
  @media print {
    display: none;
  }
`;

const Fieldset = styled.fieldset`
  border: none;
  padding: 0;
`;

const Legend = styled.legend`
  font-weight: 600;
  padding: ${spacings.small} 0;
`;

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: stretch;
  @media (max-width: ${breakpoints.desktop}) {
    flex-direction: column;
    align-items: stretch;
    margin-right: auto;
    margin-left: auto;
  }
`;
const StyledStrong = styled.strong`
  flex: 0 1 auto;
  margin-top: 0;
  margin-bottom: 0;
  padding-top: ${spacings.small};
  padding-bottom: ${spacings.small};
  @media (max-width: ${breakpoints.desktop}) {
    margin-bottom: ${spacings.base};
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding-top: 0;
    padding-bottom: 0;
  }
`;

const YesNo = styled.p`
  display: flex;
  flex: 1 0 auto;
  justify-content: center;
  margin: 0;
  @media (max-width: ${breakpoints.desktop}) {
    justify-content: space-around;
  }
`;

const StyledButton = styled(Button)`
  & + & {
    margin-left: ${spacings.larger};
    @media (max-width: ${breakpoints.desktop}) {
      margin-left: 0;
    }
  }
`;

const FullWidthParagraph = styled.p`
  flex: 1 0 100%;
  @media (max-width: ${breakpoints.desktop}) {
    margin-top: 0;
  }
`;

const StyledTextarea = styled(Textarea)`
  max-width: 100%;
`;

const Label = styled.label`
  font-weight: 600;
  display: block;
  margin: ${spacings.medium} 0 ${spacings.small} 0;
`;

const ButtonWrapper = styled.div`
  margin: ${spacings.large} 0;
`;

const ErrorText = styled(Text)`
  color: ${({ theme }) => theme.error};
`;
