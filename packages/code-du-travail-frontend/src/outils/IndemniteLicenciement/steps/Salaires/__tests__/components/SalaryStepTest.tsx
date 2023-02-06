import StepSalaires from "../../index";
import { IndemniteLicenciementProvider, MainStore } from "../../../../store";
import { StoreApi } from "zustand";

type Props = {
  store: () => StoreApi<MainStore>;
};

export const SalaryStepTest = ({ store }: Props): JSX.Element => {
  return (
    <IndemniteLicenciementProvider createStore={store}>
      <StepSalaires />
    </IndemniteLicenciementProvider>
  );
};
