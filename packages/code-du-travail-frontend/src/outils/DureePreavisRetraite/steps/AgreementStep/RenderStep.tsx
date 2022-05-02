import React from "react";
import {usePreavisRetraiteStore} from "../../state";
import {useForm} from "react-final-form";
import {OnChange} from "react-final-form-listeners";
import {PreavisRetraiteFormState} from "../../form";
import {SelectAgreement} from "../../../common";
import {supportedCcn} from "@socialgouv/modeles-social";
import {AGREEMENT_NAME, ROUTE_NAME} from "../../../common/Agreement/form-constants";
import {AgreementSupportInfo} from "../../../common/Agreement/types";

export const getSupportedCC = (): AgreementSupportInfo[] =>
  supportedCcn.map((item) => ({
    fullySupported: item.preavisRetraite,
    idcc: item.idcc,
  }));

const RenderAgreementStep = (): JSX.Element => {
  const {title, onChange} = usePreavisRetraiteStore((state) => ({
    title: state.title,
    onChange: state.onAgreementChange,
  }));
  const form = useForm<PreavisRetraiteFormState>();

  return (
    <>
      <OnChange name={ROUTE_NAME}>
        {(values, _previous) => {
          onChange(form);
        }}
      </OnChange>
      <OnChange name={AGREEMENT_NAME}>
        {(values, _previous) => {
          onChange(form);
        }}
      </OnChange>
      <SelectAgreement
        title={title}
        form={form}
        supportedAgreements={getSupportedCC()}
      />
    </>
  );
};

export default RenderAgreementStep;
