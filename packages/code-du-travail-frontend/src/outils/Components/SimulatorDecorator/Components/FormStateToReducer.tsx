import React from "react";
import { FormSpy } from "react-final-form";

type Props<T> = {
  updateFormState: (state: T) => void;
};

const FormStateToRedux = <T,>({ updateFormState }: Props<T>): JSX.Element => (
  <FormSpy<T>
    subscription={{ values: true }}
    onChange={(state) => updateFormState(state.values)}
  />
);

export default FormStateToRedux;
