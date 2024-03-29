import { FormApi } from "final-form";
import React, { ReactNode } from "react";
import { Form } from "react-final-form";

type EmbeddedInjectedFormProps<FormContent, Props> = {
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
  Step: React.ComponentType<Props>;
  props: Props;
};

function EmbeddedForm<FormContent>({
  Step,
  props,
}: EmbeddedFormProps<FormContent & { children?: ReactNode }>): JSX.Element {
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
