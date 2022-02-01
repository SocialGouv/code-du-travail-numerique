import { FormApi } from "final-form";
import React from "react";
import { Form } from "react-final-form";

type EmbeddedInjectedFormProps<FormContent, Props> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Step: React.ComponentType<{ form: FormApi<FormContent> }>;
  formData?: FormContent;
  props?: Props;
};

function EmbeddedInjectedForm<FormContent, Props>({
  Step,
  formData,
  props,
}: EmbeddedInjectedFormProps<FormContent, Props>): JSX.Element {
  return (
    <Form<FormContent>
      initialValues={formData ?? {}}
      onSubmit={() => {
        /* nothing to do */
      }}
    >
      {({ form, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Step form={form} {...props} />
          <button>Submit</button>
        </form>
      )}
    </Form>
  );
}

type EmbeddedFormProps<Props> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Step: React.ComponentType<Props>;
  props: Props;
};

function EmbeddedForm<FormContent>({
  Step,
  props,
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
          <Step {...props} />
          <button>Submit</button>
        </form>
      )}
    </Form>
  );
}

export { EmbeddedForm, EmbeddedInjectedForm };
