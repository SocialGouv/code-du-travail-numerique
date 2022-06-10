import { Fieldset, Legend, theme, Wrapper } from "@socialgouv/cdtn-ui";
import React from "react";
import { Form } from "react-final-form";
import styled from "styled-components";

import { FormStateToReducer, Navigation, StepList, Title } from "./Components";
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
  formOptions?: {
    validate?: (
      values: FormValues
    ) => ValidationErrors | Promise<ValidationErrors>;
    decorators?: Array<Decorator<FormValues, Partial<FormValues>>>;
    mutators?: { [key: string]: Mutator<FormValues, Partial<FormValues>> };
    legend?: string;
  };
  renderStep: (form: FormApi<FormValues>) => JSX.Element;
  options: {
    annotations?: JSX.Element;
    debug?: JSX.Element;
  };
};

const SimulatorDecorator = <FormValues,>({
  title,
  navigation,
  steps,
  initialValues,
  onFormStateUpdate,
  onFormStepSubmit,
  formOptions,
  renderStep,
  options,
}: Props<FormValues>): JSX.Element => {
  const onPrevious = navigation.onPrevious;

  return (
    <Wrapper variant="main">
      <Form<FormValues>
        initialValues={initialValues}
        onSubmit={onFormStepSubmit}
        validate={(values) => {
          if (formOptions?.validate) {
            return formOptions?.validate(values);
          }
        }}
        decorators={formOptions?.decorators}
        mutators={formOptions?.mutators}
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
              {formOptions?.legend ? (
                <Fieldset>
                  <Legend isHidden>{formOptions.legend}</Legend>
                  {renderStep(form)}
                </Fieldset>
              ) : (
                renderStep(form)
              )}

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
              {options?.annotations && <p>{options.annotations}</p>}
              {process.env.NODE_ENV !== "production" &&
                process.env.NODE_ENV !== "test" &&
                options?.debug}
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
