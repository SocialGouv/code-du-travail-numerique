import React, { useEffect } from "react";
import {
  createInformationTestStore,
  InformationTestProvider,
  useInformationTestStore,
} from "./store";
import CommonInformationStep from "../../index";
import { Agreement } from "../../../../../conventions/Search/api/type";
import modeles from "./modeles.json";

type Props2 = {
  agreement: Agreement;
};
const IndemniteLicenciementSimulator = ({ agreement }: Props2): JSX.Element => {
  const {
    onAgreementChange,
    errorInformations,
    onInformationsChange,
    informations,
    blockingNotification,
  } = useInformationTestStore((state) => ({
    onAgreementChange: state.agreementFunction.onAgreementChange,
    generatePublicodesQuestions:
      state.informationsFunction.generatePublicodesQuestions,
    errorInformations: state.informationsData.error.errorInformations,
    onInformationsChange: state.informationsFunction.onInformationsChange,
    informations: state.informationsData.input.publicodesInformations,
    blockingNotification: state.informationsData.input.blockingNotification,
  }));

  useEffect(() => {
    onAgreementChange(agreement);
  }, [onAgreementChange, agreement]);

  return (
    <CommonInformationStep
      informations={informations}
      errors={errorInformations}
      onChange={onInformationsChange}
      blockingNotification={blockingNotification}
    />
  );
};

type Props = {
  agreement: Agreement;
};

export const InformationStepTest = ({ agreement }: Props): JSX.Element => {
  return (
    <InformationTestProvider
      createStore={() =>
        createInformationTestStore(modeles as unknown as string)
      }
    >
      <IndemniteLicenciementSimulator agreement={agreement} />
    </InformationTestProvider>
  );
};
