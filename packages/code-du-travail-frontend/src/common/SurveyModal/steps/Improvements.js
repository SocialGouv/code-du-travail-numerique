import { Button, Input, InputCheckbox, theme } from "@socialgouv/cdtn-ui";
import React, { useCallback } from "react";
import styled from "styled-components";

import { matopush } from "../../../piwik";
import { ActionBar } from "../components/ActionBar";
import { MandatoryLabel } from "../components/MandatoryLabel";
import { ProgressBar } from "../components/ProgressBar";
import { Question } from "../components/Question";

export const ImprovementsStep = ({
  dispatch,
  setPromptVisible,
  setSurveyDisabled,
  state,
}) => {
  const setImprovements = useCallback(
    ({ target }) => {
      if (target.checked) {
        return dispatch({ payload: target.value, type: "setImprovement" });
      }
      return dispatch({ payload: target.value, type: "removeImprovement" });
    },
    [dispatch]
  );
  const setSuggestion = useCallback(
    (e) => dispatch({ payload: e.target.value, type: "setSuggestion" }),
    [dispatch]
  );
  return (
    <>
      <ProgressBar state={state} />
      <MandatoryLabel />
      <Question>
        Quels sont le(s) contenu(s) que vous souhaiteriez voir enrichi(s)&nbsp;?
      </Question>
      <StyledInputCheckbox
        label="les fiches sur le droit du travail"
        name="improvements"
        id="improvements-1"
        value="fiches droit du travail"
        onChange={setImprovements}
        checked={state.improvements.includes("fiches droit du travail")}
      />
      <StyledInputCheckbox
        label="les modèles de documents"
        name="improvements"
        id="improvements-2"
        value="modèles de documents"
        onChange={setImprovements}
        checked={state.improvements.includes("modèles de documents")}
      />
      <StyledInputCheckbox
        label="les simulateurs/calculateurs ou autres outils"
        name="improvements"
        id="improvements-3"
        value="outils"
        onChange={setImprovements}
        checked={state.improvements.includes("outils")}
      />
      <StyledInputCheckbox
        label="les informations sur une ou des convention(s) collective(s)"
        name="improvements"
        id="improvements-4"
        value="conventions-collectives"
        onChange={setImprovements}
        checked={state.improvements.includes("conventions-collectives")}
      />
      <StyledInputCheckbox
        label="d’autre(s) contenu(s)"
        name="improvements"
        id="improvements-5"
        value="autre"
        onChange={setImprovements}
        checked={state.improvements.includes("autre")}
      />
      {state.improvements.includes("autre") && (
        <StyledInput
          name="suggestion"
          id="suggestion"
          value={state.suggestion}
          placeholder="Indiquer le(s) contenu(s) souhaité(s)"
          onChange={setSuggestion}
        />
      )}
      <StyledInputCheckbox
        label="je ne sais pas"
        name="improvements"
        id="improvements-6"
        value="nsp"
        onChange={setImprovements}
        checked={state.improvements.includes("nsp")}
      />
      <ActionBar>
        <Button
          type="button"
          variant="primary"
          {...(!state.improvements.length && { disabled: true })}
          onClick={() => {
            dispatch({ payload: "final", type: "goTo" });
            setPromptVisible(false);
            setSurveyDisabled(true);
            matopush([
              "trackEvent",
              "survey",
              "submit",
              JSON.stringify(state, null, 2),
            ]);
          }}
        >
          Terminer
        </Button>
        <Button
          type="button"
          variant="flat"
          onClick={() => {
            dispatch({ payload: "company", type: "goTo" });
          }}
        >
          Précédent
        </Button>
      </ActionBar>
    </>
  );
};

const { spacings } = theme;

const StyledInputCheckbox = styled(InputCheckbox)`
  margin-bottom: ${spacings.small};
`;
const StyledInput = styled(Input)`
  width: 100%;
  margin-bottom: ${spacings.small};
`;
