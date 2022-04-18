import { theme, Wrapper } from "@socialgouv/cdtn-ui";
import React from "react";
import { Form } from "react-final-form";
import styled from "styled-components";

import {
  DebugInfo,
  FormStateToReducer,
  Navigation,
  StepList,
  Title,
} from "./Components";
import type {
  NavigationProps,
  StepListProps,
  TitleProps,
} from "./Components/types";
import { Decorator, FormApi, Mutator, ValidationErrors } from "final-form";

type Props<FormValues> = {
  title: TitleProps;
  navigation: Omit<Omit<NavigationProps, "hasError">, "onPrevious"> & {
    onPrevious?: (values: FormValues) => void;
  };
  steps: Omit<StepListProps, "width">;
  initialValues?: FormValues;
  onFormStateUpdate?: (values: FormValues) => void;
  onFormStepSubmit: (values: FormValues, form: FormApi<FormValues>) => void;
  showDebug: boolean;
  validate?: (
    values: FormValues
  ) => ValidationErrors | Promise<ValidationErrors>;
  decorators?: Array<Decorator<FormValues, Partial<FormValues>>>;
  mutators?: { [key: string]: Mutator<FormValues, Partial<FormValues>> };
  annotations?: JSX.Element;
  renderStep: (form: FormApi<FormValues>) => JSX.Element;
};

const SimulatorDecorator = <FormValues,>({
  title,
  navigation,
  steps,
  initialValues,
  onFormStateUpdate,
  onFormStepSubmit,
  showDebug,
  validate,
  decorators,
  mutators,
  annotations,
  renderStep,
}: Props<FormValues>): JSX.Element => {
  const onPrevious = navigation.onPrevious;

  return (
    <Wrapper variant="main">
      <Form<FormValues>
        initialValues={initialValues}
        onSubmit={onFormStepSubmit}
        validate={validate}
        decorators={decorators}
        mutators={mutators}
      >
        {({ handleSubmit, form, invalid, submitFailed }) => {
          return (
            <StyledForm onSubmit={handleSubmit}>
              {onFormStateUpdate && (
                <FormStateToReducer<FormValues>
                  updateFormState={onFormStateUpdate}
                />
              )}
              <Title {...title} />
              <StepList {...steps} width={STEP_LIST_WIDTH} />
              {renderStep(form)}
              <Navigation
                {...navigation}
                hasError={invalid && submitFailed}
                onPrevious={
                  onPrevious &&
                  (() => {
                    onPrevious(form.getState().values);
                  })
                }
              />
              {annotations && <p>{annotations}</p>}
              {showDebug && <DebugInfo formValues={form.getState().values} />}
            </StyledForm>
          );
        }}
      </Form>
    </Wrapper>
  );
};

export default SimulatorDecorator;

const STEP_LIST_WIDTH = "28rem";

const { breakpoints } = theme;

const StyledForm = styled.form`
  padding: 0 0 0 ${STEP_LIST_WIDTH};
  overflow: visible;
  @media (max-width: ${breakpoints.tablet}) {
    padding: 0;
  }
  @media print {
    border: 0;
  }
`;
