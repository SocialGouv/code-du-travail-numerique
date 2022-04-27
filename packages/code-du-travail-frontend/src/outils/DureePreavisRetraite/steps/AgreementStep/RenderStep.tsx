import React from "react";
import { usePreavisRetraiteStore } from "../../index";
import { useForm } from "react-final-form";
import { PreavisRetraiteFormState } from "../../form";
import { getSupportedCC } from "../../../common/situations.utils";
import { SelectAgreement } from "../../../common";
import { supportedCcn } from "@socialgouv/modeles-social";

const RenderAgreementStep = (): JSX.Element => {
  const { title, onChange } = usePreavisRetraiteStore((state) => ({
    title: state.title,
    onChange: state.onAgreementChange,
  }));
  const form = useForm<PreavisRetraiteFormState>();

  return (
    <SelectAgreement
      title={title}
      form={form}
      onChange={() => {
        console.log("On agreement change !!!");
        // Delete infos when change CC
        form.change("infos", undefined);
        onChange(form);
      }}
      supportedAgreements={getSupportedCC(supportedCcn)}
    />
  );
};

export default RenderAgreementStep;
