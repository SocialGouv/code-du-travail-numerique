import { FormApi } from "final-form";
import React from "react";
import { Form } from "react-final-form";

type EmbeddedFormProps<FormContent> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Step: React.ComponentType<{ form: FormApi<FormContent> }>;
  formData?: FormContent;
};

function EmbeddedForm<FormContent>({
  Step,
  formData,
}: EmbeddedFormProps<FormContent>): JSX.Element {
  return (
    <Form<FormContent>
      initialValues={formData ?? {}}
      onSubmit={() => {
        /* nothing to do */
      }}
    >
      {({ form, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Step form={form} />
          <button>Submit</button>
        </form>
      )}
    </Form>
  );
}

export default EmbeddedForm;
