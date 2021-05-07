import { Button, InputRadio, theme } from "@socialgouv/cdtn-ui";
import React, { useCallback } from "react";
import styled from "styled-components";

import { ActionBar } from "../components/ActionBar";
import { MandatoryLabel } from "../components/MandatoryLabel";
import { ProgressBar } from "../components/ProgressBar";
import { Question } from "../components/Question";

export const CompanyStep = ({ dispatch, state }) => {
  const setTailleEntreprise = useCallback(
    (e) => dispatch({ payload: e.target.value, type: "setTailleEntreprise" }),
    [dispatch]
  );
  return (
    <>
      <ProgressBar state={state} />
      <MandatoryLabel />
      <Question>Quelle est la taille de votre entreprise&nbsp;?</Question>
      <StyledInputRadio
        value="[0;10["
        onChange={setTailleEntreprise}
        name="companySize"
        id="companySize-1"
        label="moins de 10 salariés"
        checked={state.companySize === "[0;10["}
      />
      <StyledInputRadio
        value="[20;249]"
        onChange={setTailleEntreprise}
        name="companySize"
        id="companySize-2"
        label="de 10 salariés à 249 salariés"
        checked={state.companySize === "[20;249]"}
      />
      <StyledInputRadio
        value="[250;4999]"
        onChange={setTailleEntreprise}
        name="companySize"
        id="companySize-3"
        label="de 250 à 4999 salariés"
        checked={state.companySize === "[250;4999]"}
      />
      <StyledInputRadio
        value="[5000;+∞["
        onChange={setTailleEntreprise}
        name="companySize"
        id="companySize-4"
        label="de 5000 salariés et plus"
        checked={state.companySize === "[5000;+∞["}
      />
      <StyledInputRadio
        value="particulier employeur"
        onChange={setTailleEntreprise}
        name="companySize"
        id="companySize-5"
        label="particulier employeur"
        checked={state.companySize === "particulier employeur"}
      />
      <StyledInputRadio
        value="non concerné"
        onChange={setTailleEntreprise}
        name="companySize"
        id="companySize-6"
        label="je ne suis pas concerné(é)"
        checked={state.companySize === "non concerné"}
      />
      <ActionBar>
        <Button
          variant="primary"
          type="button"
          {...(!state.companySize && { disabled: true })}
          onClick={() => {
            dispatch({ payload: "improvements", type: "goTo" });
          }}
        >
          Suivant
        </Button>
        <Button
          variant="flat"
          type="button"
          onClick={() => {
            dispatch({ payload: "status", type: "goTo" });
          }}
        >
          Précédent
        </Button>
      </ActionBar>
    </>
  );
};

const { spacings } = theme;

const StyledInputRadio = styled(InputRadio)`
  margin-bottom: ${spacings.small};
`;
