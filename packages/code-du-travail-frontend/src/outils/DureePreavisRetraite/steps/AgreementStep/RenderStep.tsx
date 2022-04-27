import React from "react";
import { usePreavisRetraiteStore } from "../../index";
import { useForm } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { PreavisRetraiteFormState } from "../../form";
import { getSupportedCC } from "../../../common/situations.utils";
import { SelectAgreement } from "../../../common";
import { supportedCcn } from "@socialgouv/modeles-social";
import { AGREEMENT_NAME } from "../../../common/Agreement/form-constants";

const RenderAgreementStep = (): JSX.Element => {
  const { title, onChange } = usePreavisRetraiteStore((state) => ({
    title: state.title,
    onChange: state.onAgreementChange,
  }));
  const form = useForm<PreavisRetraiteFormState>();

  return (
    <>
      <SelectAgreement
        title={title}
        form={form}
        supportedAgreements={getSupportedCC(supportedCcn)}
      />
      <OnChange name={AGREEMENT_NAME}>
        {(values, _previous) => {
          onChange(form);
        }}
      </OnChange>
    </>
  );
};

export default RenderAgreementStep;
