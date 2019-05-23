import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { StepItems } from "./StepItems";
import { PrevNextBar } from "./PrevNextBar";

function Wizard({
  initialData = {},
  initialStep = 0,
  steps,
  onSubmit,
  onUpdate,
  rules
}) {
  const [initialValues, setValues] = useState(initialData);
  const [page, setPage] = useState(initialStep);

  const prevStep = () => {
    setPage(Math.max(0, page - 1));
  };
  const nextStep = () => {
    setPage(Math.min(page + 1, steps.length - 1));
  };

  const previousVisible = page > 0;
  const nextVisible = page < steps.length - 1;

  const validate = values => {
    const Step = steps[page].component;
    return Step.validate ? Step.validate(values) : {};
  };

  const handlePageSubmit = values => {
    if (page === steps.length - 1) {
      setPage(0);
      setValues({});
      onSubmit(values);
    } else {
      nextStep();
      onUpdate && onUpdate(values);
      setValues(values);
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

  const Step = steps[page];

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
        {({ handleSubmit, form }) => {
          return (
            <>
              <form onSubmit={handleSubmit}>
                {rules}
                <StepItems page={page} items={stepItems} />
                <Step.component form={form} />
                <PrevNextBar
                  onPrev={prevStep}
                  nextVisible={nextVisible}
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
  initialData: PropTypes.object,
  initialStep: PropTypes.number,
  onSubmit: PropTypes.func.isRequired
};

export { Wizard };
