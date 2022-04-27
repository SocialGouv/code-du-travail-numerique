import { FormApi } from "final-form";

export const cleanForm = (form: FormApi) => (names: string[]) => {
  names.forEach((name) => {
    form.change(name, undefined);
  });
};
