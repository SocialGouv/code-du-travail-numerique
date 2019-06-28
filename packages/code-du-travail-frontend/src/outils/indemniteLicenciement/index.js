import React, { useReducer } from "react";
import { OnChange } from "react-final-form-listeners";
import { Section, Container, Wrapper } from "@cdt/ui";

import { stepReducer, getInitialStepsState } from "./stepReducer";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { StepNav } from "./StepNav";
import { PrevNextBar } from "./PrevNextBar";

function CalculateurIndemnite() {
  const [{ currentStepIndex, steps }, dispatch] = useReducer(
    stepReducer,
    getInitialStepsState()
  );

  const Step = steps[currentStepIndex].component;

  /* Form config stuff */

  const validate = values => {
    const Step = steps[currentStepIndex].component;
    return Step.validate ? Step.validate(values) : {};
  };

  const decorators = steps
    .map(step => step.component.decorator)
    .filter(Boolean);

  const rules = [
    <OnChange key="rule-same-salaire" name="hasSameSalaire">
      {value =>
        value === false
          ? dispatch({ type: "add_primes" })
          : dispatch({ type: "remove_primes" })
      }
    </OnChange>,
    <OnChange key="rule-branche" name="branche">
      {async value => {
        if (value) {
          const module = await import(`./ccn/${value}`);
          dispatch({ type: "add_branche", payload: module.steps });
        } else {
          dispatch({ type: "remove_branche" });
        }
      }}
    </OnChange>
  ];

  const handlePageSubmit = (values, form) => {
    if (currentStepIndex === steps.length - 1) {
      // This means the user clicked on a "restart a new simulation" button
      form.reset();
      dispatch({
        type: "reset",
        payload: getInitialStepsState()
      });
    } else {
      dispatch({ type: "next_step" });
    }
  };

  return (
    <Section>
      <Container>
        <Wrapper variant="light">
          <h1>Calculateur d’indemnités de licenciement</h1>
          <Form
            validate={validate}
            decorators={decorators}
            mutators={{
              ...arrayMutators
            }}
            onSubmit={handlePageSubmit}
          >
            {({ handleSubmit, form, invalid }) => {
              return (
                <>
                  <form onSubmit={handleSubmit}>
                    {rules}
                    <StepNav activeIndex={currentStepIndex} steps={steps} />
                    <Step form={form} />
                    <PrevNextBar
                      currentStepIndex={currentStepIndex}
                      disabled={invalid}
                      onPrev={() => dispatch({ type: "previous_step" })}
                      stepsLength={steps.length}
                    />
                  </form>
                </>
              );
            }}
          </Form>
        </Wrapper>
      </Container>
    </Section>
  );
}

export { CalculateurIndemnite };
