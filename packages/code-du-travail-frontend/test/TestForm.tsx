import { FormApi } from "final-form";
import React from "react";
import { Form } from "react-final-form";

type EmbeddedInjectedFormProps<FormContent> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Step: React.ComponentType<{ form: FormApi<FormContent> }>;
  formData?: FormContent;
};

function EmbeddedInjectedForm<FormContent>({
  Step,
  formData,
}: EmbeddedInjectedFormProps<FormContent>): JSX.Element {
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

type EmbeddedFormProps<Props> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Step: React.ComponentType<Props>;
  data: Props;
};

function EmbeddedForm<FormContent>({
  Step,
  data,
}: EmbeddedFormProps<FormContent>): JSX.Element {
  return (
    <Form<FormContent>
      initialValues={{}}
      onSubmit={() => {
        /* nothing to do */
      }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Step {...data} />
          <button>Submit</button>
        </form>
      )}
    </Form>
  );
}

export { EmbeddedForm, EmbeddedInjectedForm };
