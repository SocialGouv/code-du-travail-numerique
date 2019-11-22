import React from "react";
import styled from "styled-components";
import { StepInfoCCnOptionnal } from "../../common/InfosCCn";
import { isNotYetProcessed } from "./situation";
import { Toast, theme } from "@socialgouv/react-ui";

export function StepInfoCCn(props) {
  const { form } = props;
  const {
    values: { ccn }
  } = form.getState();
  return (
    <>
      <StepInfoCCnOptionnal {...props} />
      {ccn && isNotYetProcessed(ccn.num) && (
        <StyledToast>
          Nous n’avons pas encore traité cette convention collective mais nous
          vous invitons à poursuivre la simulation afin d’obtenir le montant
          défini par le Code du travail.
        </StyledToast>
      )}
    </>
  );
}

const { spacings } = theme;

const StyledToast = styled(Toast)`
  width: 100%;
  margin-top: ${spacings.medium};
`;
