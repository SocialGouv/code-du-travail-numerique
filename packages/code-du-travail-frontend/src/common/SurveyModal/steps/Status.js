import { Button, InputRadio, Text, theme } from "@socialgouv/cdtn-ui";
import React, { useCallback } from "react";
import styled from "styled-components";

import { ActionBar } from "../components/ActionBar";
import { ProgressBar } from "../components/ProgressBar";
import { Question } from "../components/Question";

export const StatusStep = ({ dispatch, state }) => {
  const setStatus = useCallback(
    (e) => dispatch({ payload: e.target.value, type: "setStatus" }),
    [dispatch]
  );
  return (
    <>
      <ProgressBar state={state} />
      <Question>
        Vous êtes
        <Text fontWeight="400">&nbsp;(obligatoire)</Text>
      </Question>
      <StyledInputRadio
        value="salarie"
        onChange={setStatus}
        name="status"
        id="status-1"
        label="salarié(e)"
        checked={state.status === "salarie"}
      />
      <StyledInputRadio
        value="employeur"
        onChange={setStatus}
        name="status"
        id="status-2"
        label="employeur ou particulier employeur"
        checked={state.status === "employeur"}
      />
      <StyledInputRadio
        value="rh"
        onChange={setStatus}
        name="status"
        id="status-3"
        label="fonction RH"
        checked={state.status === "rh"}
      />
      <StyledInputRadio
        value="professionnel du droit du travail"
        onChange={setStatus}
        name="status"
        id="status-4"
        label="professionnel du droit du travail (avocat, juriste, syndicat…)"
        checked={state.status === "professionnel du droit du travail"}
      />
      <StyledInputRadio
        value="autre"
        onChange={setStatus}
        name="status"
        id="status-5"
        label="autres (demandeur d’emploi, étudiant, retraité…)"
        checked={state.status === "autre"}
      />
      <ActionBar>
        <Button
          type="button"
          variant="primary"
          {...(!state.status && { disabled: true })}
          onClick={() => {
            dispatch({ payload: "company", type: "goTo" });
          }}
        >
          Suivant
        </Button>
      </ActionBar>
    </>
  );
};

const { spacings } = theme;

const StyledInputRadio = styled(InputRadio)`
  margin-bottom: ${spacings.small};
`;
