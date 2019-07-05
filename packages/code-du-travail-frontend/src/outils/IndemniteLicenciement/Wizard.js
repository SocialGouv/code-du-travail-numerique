import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { StepItems } from "./StepItems";
import { PrevNextBar } from "./PrevNextBar";

function Wizard({
  initialValues = {},
  initialStepIndex = 0,
  steps,
  onSubmit,
  onUpdate,
  rules = null
}) {
  const [stepIndex, setStepIndex] = useState(initialStepIndex);

  const prevStep = () => {
    setStepIndex(Math.max(0, stepIndex - 1));
  };
  const nextStep = () => {
    setStepIndex(Math.min(stepIndex + 1, steps.length - 1));
  };

  const previousVisible = stepIndex > 0;
  const nextVisible = stepIndex < steps.length - 1;

  const validate = values => {
    const Step = steps[stepIndex].component;
    return Step.validate ? Step.validate(values) : {};
  };

  const handlePageSubmit = (values, form) => {
    // This means the user clicked on a "restart a new simulation" button
    if (stepIndex === steps.length - 1) {
      onSubmit(values);
      form.reset();
      setStepIndex(0);
    } else {
      nextStep();
      onUpdate && onUpdate(values);
    }
  };
  const stepItems = steps.map(({ name, label }) => ({
    name,
    label,
    isValid: false
  }));

  const decorators = steps
    .map(step => step.component.decorator)
    .filter(Boolean);

  const Step = steps[stepIndex].component;

  return (
    <>
      <Form
        initialValues={initialValues}
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
                <StepItems activeIndex={stepIndex} items={stepItems} />
                <Step form={form} />
                <PrevNextBar
                  onPrev={prevStep}
                  nextVisible={nextVisible}
                  disabled={invalid}
                  previousVisible={previousVisible}
                />
              </form>
            </>
          );
        }}
      </Form>
    </>
  );
}

Wizard.propTypes = {
  steps: PropTypes.array.isRequired,
  initialValues: PropTypes.object,
  initialStepIndex: PropTypes.number,
  onSubmit: PropTypes.func.isRequired
};

export { Wizard };
