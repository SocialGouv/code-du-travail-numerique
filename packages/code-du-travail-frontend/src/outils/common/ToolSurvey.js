import {
  Button,
  icons,
  ScreenReaderOnly,
  Subtitle,
  theme,
  Toast,
} from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import { SurveyModal } from "../../common/SurveyModal";
import { matopush } from "../../piwik";

export const ToolSurvey = () => (
  <SurveyModal>
    {({
      setModalVisible,
      isPromptVisible,
      isSurveyDisabled,
      setPromptVisible,
      setSurveyDisabled,
    }) =>
      !isSurveyDisabled &&
      isPromptVisible && (
        <ToastContainer>
          <Toast animate="from-right" shadow>
            <PromptContainer>
              <CloseButton
                variant="naked"
                small
                narrow
                title="ne pas répondre aux questions"
                onClick={() => {
                  setPromptVisible(false);
                  setSurveyDisabled(true);
                }}
              >
                <ScreenReaderOnly>fermer la modale</ScreenReaderOnly>
                <CloseIcon aria-hidden />
              </CloseButton>
              <div>
                <StyledSubtitle>Questionnaire</StyledSubtitle>
                <PromptLabel>Aidez-nous à améliorer le site</PromptLabel>
              </div>
              <Button
                small
                onClick={() => {
                  matopush(["trackEvent", "survey", "open from related items"]);
                  setModalVisible(true);
                }}
              >
                Commencer
              </Button>
            </PromptContainer>
          </Toast>
        </ToastContainer>
      )
    }
  </SurveyModal>
);

const { breakpoints, spacings } = theme;

const ToastContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${spacings.base};
`;

const PromptContainer = styled.div`
  display: flex;
  @media (max-width: ${breakpoints.mobile}) {
    padding: ${spacings.xsmall} 0;
  }
`;

const CloseButton = styled(Button)`
  margin-right: ${spacings.small};
  color: ${({ theme }) => theme.secondary};
`;

const CloseIcon = styled(icons.Close)`
  width: 2rem;
  height: 2rem;
`;

const StyledSubtitle = styled(Subtitle)`
  margin-bottom: 0;
`;

const PromptLabel = styled.div`
  margin-right: ${spacings.large};
  font-weight: bold;
  font-size: 1.7rem;
  @media (max-width: ${breakpoints.mobile}) {
    padding-right: ${spacings.xmedium};
  }
`;
