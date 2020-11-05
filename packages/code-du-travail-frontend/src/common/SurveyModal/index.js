import { Modal, theme } from "@socialgouv/cdtn-ui";
import PropTypes from "prop-types";
import React, { useEffect, useReducer, useState } from "react";
import styled from "styled-components";

import { useLocalStorage } from "../../lib/useLocalStorage";
import { initialState, reducer } from "./reducer";

const PROMPT_DELAY = 15000; // 15 seconds

export const SurveyModal = ({
  children: renderProp,
  promptDelay = PROMPT_DELAY,
}) => {
  const [isSurveyDisabled, setSurveyDisabled] = useLocalStorage(
    "disable_survey_0",
    false
  );
  const [isPromptVisible, setPromptVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!isSurveyDisabled) {
        setPromptVisible(true);
      }
    }, promptDelay);
    return () => {
      window.clearTimeout(timer);
    };
  }, [promptDelay, isSurveyDisabled]);

  const Step = state.step;

  return (
    <>
      {renderProp({
        isModalVisible,
        isPromptVisible,
        isSurveyDisabled,
        setModalVisible,
        setPromptVisible,
        setSurveyDisabled,
      })}
      <Modal
        isOpen={isModalVisible}
        onDismiss={() => {
          setModalVisible(false);
        }}
        title="Questionnaire d’amélioration"
      >
        <PaddedForm name="questionnaire">
          <Step
            state={state}
            dispatch={dispatch}
            isModalVisible={isModalVisible}
            isPromptVisible={isPromptVisible}
            isSurveyDisabled={isSurveyDisabled}
            setModalVisible={setModalVisible}
            setPromptVisible={setPromptVisible}
            setSurveyDisabled={setSurveyDisabled}
          />
        </PaddedForm>
        {process.env.NODE_ENV !== "production" &&
          process.env.NODE_ENV !== "test" && (
            <details>
              <summary>state</summary>
              <pre>{JSON.stringify(state, 0, 2)}</pre>
            </details>
          )}
      </Modal>
    </>
  );
};

SurveyModal.propTypes = {
  children: PropTypes.func.isRequired,
  promptDelay: PropTypes.number,
};
const { breakpoints, spacings } = theme;

const PaddedForm = styled.form`
  padding: ${spacings.base} ${spacings.medium};
  @media (max-width: ${breakpoints.mobile}) {
    padding: 0;
  }
`;
