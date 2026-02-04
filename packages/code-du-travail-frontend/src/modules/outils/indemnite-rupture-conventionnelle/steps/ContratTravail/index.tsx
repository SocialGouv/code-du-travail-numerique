import React, { useContext, useEffect } from "react";
import {
  IndemniteDepartContext,
  useIndemniteDepartStore,
} from "src/modules/outils/indemnite-depart/store";

const StepContratTravail = () => {
  const store = useContext(IndemniteDepartContext);
  const { onChangeLicenciementInaptitude } = useIndemniteDepartStore(
    store,
    (state) => ({
      licenciementInaptitude:
        state.contratTravailData.input.licenciementInaptitude,
      onChangeLicenciementInaptitude:
        state.contratTravailFunction.onChangeLicenciementInaptitude,
      errorLicenciementInaptitude:
        state.contratTravailData.error.errorLicenciementInaptitude,
    })
  );

  useEffect(() => {
    onChangeLicenciementInaptitude("non");
  }, []);

  return <></>;
};

export default StepContratTravail;
