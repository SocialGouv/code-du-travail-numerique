import {
  Button,
  icons,
  Input,
  InputCheckbox,
  InputRadio,
  Modal,
  Progress,
  Text,
  theme,
} from "@socialgouv/cdtn-ui";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import styled from "styled-components";

import { useLocalStorage } from "../lib/useLocalStorage";

const PROMPT_DELAY = 15000; // 15 seconds

const initialState = {
  improvements: [],
  page: 1,
  status: "",
  suggestion: "",
  tailleEntreprise: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "next":
      return {
        ...state,
        page: state.page + 1,
      };
    case "previous":
      return {
        ...state,
        page: state.page - 1,
      };
    case "setStatus":
      return {
        ...state,
        status: action.payload,
      };
    case "setSuggestion":
      return {
        ...state,
        suggestion: action.payload,
      };
    case "setTailleEntreprise":
      return {
        ...state,
        tailleEntreprise: action.payload,
      };
    case "setImprovement":
      return {
        ...state,
        improvements: [...state.improvements, action.payload],
      };
    case "removeImprovement":
      return {
        ...state,
        improvements: state.improvements.filter(
          (improvement) => improvement !== action.payload
        ),
      };
    default:
      throw new Error("Wrong action type in Survey reducer");
  }
}

export const SurveyModal = ({
  children: renderProp,
  promptDelay = PROMPT_DELAY,
}) => {
  const [isSurveyDisabled, setSurveyDisabled] = useLocalStorage(
    "disable_survey_0",
    false
  );
  const [isPromptVisible, setPromptVisible] = useState(!isSurveyDisabled);
  const [isModalVisible, setModalVisible] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const setStatus = useCallback(
    (e) => dispatch({ payload: e.target.value, type: "setStatus" }),
    [dispatch]
  );
  const setTailleEntreprise = useCallback(
    (e) => dispatch({ payload: e.target.value, type: "setTailleEntreprise" }),
    [dispatch]
  );
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
  useEffect(
    () =>
      window.setTimeout(() => {
        setPromptVisible(true);
      }, promptDelay),
    [promptDelay]
  );

  let content = null;
  switch (state.page) {
    case 1:
      content = (
        <>
          <Question>Vous êtes</Question>
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
              variant="primary"
              {...(!state.status && { disabled: true })}
              onClick={() => {
                dispatch({ type: "next" });
              }}
            >
              Suivant
            </Button>
          </ActionBar>
        </>
      );
      break;
    case 2:
      content = (
        <>
          <Question>Quelle est la taille de votre entreprise&nbsp;?</Question>
          <StyledInputRadio
            value="[0;10["
            onChange={setTailleEntreprise}
            name="tailleEntreprise"
            id="tailleEntreprise-1"
            label="moins de 10 salariés"
            checked={state.tailleEntreprise === "[0;10["}
          />
          <StyledInputRadio
            value="[20;249]"
            onChange={setTailleEntreprise}
            name="tailleEntreprise"
            id="tailleEntreprise-2"
            label="de 10 salariés à 249 salariés"
            checked={state.tailleEntreprise === "[20;249]"}
          />
          <StyledInputRadio
            value="[250;4999]"
            onChange={setTailleEntreprise}
            name="tailleEntreprise"
            id="tailleEntreprise-3"
            label="de 250 à 4999 salariés"
            checked={state.tailleEntreprise === "[250;4999]"}
          />
          <StyledInputRadio
            value="[5000;+∞["
            onChange={setTailleEntreprise}
            name="tailleEntreprise"
            id="tailleEntreprise-4"
            label="de 5000 salariés et plus"
            checked={state.tailleEntreprise === "[5000;+∞["}
          />
          <StyledInputRadio
            value="particulier employeur"
            onChange={setTailleEntreprise}
            name="tailleEntreprise"
            id="tailleEntreprise-5"
            label="particulier employeur"
            checked={state.tailleEntreprise === "particulier employeur"}
          />
          <StyledInputRadio
            value="non concerné"
            onChange={setTailleEntreprise}
            name="tailleEntreprise"
            id="tailleEntreprise-6"
            label="je ne suis pas concerné(é)"
            checked={state.tailleEntreprise === "non concerné"}
          />
          <ActionBar>
            <Button
              variant="primary"
              {...(!state.tailleEntreprise && { disabled: true })}
              onClick={() => {
                dispatch({ type: "next" });
              }}
            >
              Suivant
            </Button>
            <Button
              variant="flat"
              onClick={() => {
                dispatch({ type: "previous" });
              }}
            >
              Précédent
            </Button>
          </ActionBar>
        </>
      );
      break;
    case 3:
      content = (
        <>
          <Question>
            Quels sont le(s) contenu(s) que vous souhaiteriez voir
            enrichi(s)&nbsp;?
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
              variant="primary"
              {...(!state.improvements.length && { disabled: true })}
              onClick={() => {
                dispatch({ type: "next" });
                setPromptVisible(false);
                setSurveyDisabled(true);
              }}
            >
              Terminer
            </Button>
            <Button
              variant="flat"
              onClick={() => {
                dispatch({ type: "previous" });
              }}
            >
              Précédent
            </Button>
          </ActionBar>
        </>
      );
      break;
    case 4:
      content = (
        <>
          <Centerer>
            <StyledCheck />
            <h1>Merci pour votre aide&nbsp;!</h1>
            <StyledLogo />
            <StyledHr />
            <Button
              variant="primary"
              onClick={() => {
                setModalVisible(false);
              }}
            >
              Revenir sur le site
            </Button>
          </Centerer>
        </>
      );
      break;
    default:
      content = null;
  }
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
        <PaddedContainer>
          {state.page > 0 && state.page < 4 && (
            <>
              <StyledText fontSize="tiny" fontWeight="600" variant="primary">
                QUESTION {state.page} SUR 3
              </StyledText>
              <StyledProgress ratio={state.page / 3} />
            </>
          )}
          {content}
        </PaddedContainer>
      </Modal>
    </>
  );
};

SurveyModal.propTypes = {
  children: PropTypes.func.isRequired,
  promptDelay: PropTypes.number,
};

const { breakpoints, fonts, spacings } = theme;

const PaddedContainer = styled.div`
  padding: ${spacings.base} ${spacings.medium};
  @media (max-width: ${breakpoints.mobile}) {
    padding: 0;
  }
`;
const Question = styled.div`
  margin-bottom: ${spacings.base};
  font-weight: bold;
  font-size: ${fonts.sizes.headings.small};
`;
const ActionBar = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  margin-top: ${spacings.medium};
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    & button:first-child {
      margin-bottom: ${spacings.small};
    }
  }
`;
const StyledText = styled(Text)`
  display: block;
  margin-bottom: ${spacings.xsmall};
`;
const StyledProgress = styled(Progress)`
  margin-bottom: ${spacings.large};
`;
const StyledInputRadio = styled(InputRadio)`
  margin-bottom: ${spacings.small};
`;
const StyledInputCheckbox = styled(InputCheckbox)`
  margin-bottom: ${spacings.small};
`;
const StyledInput = styled(Input)`
  width: 100%;
  margin-bottom: ${spacings.small};
`;
const Centerer = styled.div`
  text-align: center;
`;
const StyledCheck = styled(icons.Check)`
  width: 5.3rem;
  height: 5.3rem;
  margin-bottom: ${spacings.xmedium};
  padding: 0.6rem;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 50%;
`;

const StyledLogo = styled(icons.Logo)`
  position: relative;
  left: -1rem;
  display: block;
  width: 14rem;
  height: 6.4rem;
  margin: ${spacings.xmedium} auto 0 auto;
  padding: 0.6rem;
  color: ${({ theme }) => theme.primary};
`;

const StyledHr = styled.div`
  width: 15%;
  height: 2px;
  margin: ${spacings.large} auto;
  background-color: ${({ theme }) => theme.paragraph};
`;
