import { FormApi } from "final-form";

export type UpdateFormValues = (
  fields: {
    name: string;
    value?: unknown;
  }[]
) => void;

export const updateFormValues: (form: FormApi) => UpdateFormValues =
  (form) => (fields) => {
    form.batch(() => {
      fields.forEach(({ name, value }) => {
        form.change(name, value);
      });
    });
  };
