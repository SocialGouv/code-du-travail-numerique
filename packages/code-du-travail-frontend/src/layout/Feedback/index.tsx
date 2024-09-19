import styled from "styled-components";
import { Button, icons, theme } from "@socialgouv/cdtn-ui";
import React, { useState } from "react";
import { AlertCircle } from "react-feather";
import { MatomoBaseEvent } from "../../lib";
import { push as matopush } from "@socialgouv/matomo-next";
import Link from "next/link";

export const Feedback = (): React.ReactNode => {
  const key = "questionnaire_dsfr_new";

  const onClose = () => {
    matopush([
      MatomoBaseEvent.TRACK_EVENT,
      MatomoBaseEvent.HEADER,
      "close_bandeau",
    ]);
    try {
      if (window) {
        window.localStorage?.setItem(key, "true");
      }
    } catch (e) {
      console.error("Failed to save state to local storage");
    } finally {
      setClosed(true);
    }
  };

  const onClick = () => {
    matopush([
      MatomoBaseEvent.TRACK_EVENT,
      MatomoBaseEvent.HEADER,
      "click_bandeau",
    ]);
  };

  const getLocalStorageClose = () => {
    try {
      return window.localStorage?.getItem(key) === "true";
    } catch (e) {
      return false;
    }
  };

  const [closed, setClosed] = useState(getLocalStorageClose());
  const closeButton = (
    <CloseButton
      variant="naked"
      small
      narrow
      title="fermer la bandeau"
      aria-label="fermer le bandeau"
      onClick={onClose}
    >
      <icons.Close onClick={() => onClose} title="Fermer le bandeau" />
    </CloseButton>
  );
  return !closed ? (
    <Div>
      <IntroContainer variant="main">
        <Content>
          <AlertIcon />
          Aidez-nous à améliorer le Code du travail numérique.
          <Link
            href="https://tally.so/r/3jLRW1"
            passHref
            legacyBehavior
          >
            <Button
              small
              variant="primary"
              as="a"
              target="_blank"
              onClick={onClick}
              className="no-after"
            >
              Je donne mon avis
            </Button>
          </Link>
        </Content>
        {closeButton}
      </IntroContainer>
    </Div>
  ) : (
    <></>
  );
};

const { colors, box, fonts, spacings } = theme;

const Div = styled.div`
  max-width: 1200px;
  margin: auto;
`;

const AlertIcon = styled(AlertCircle)`
  width: 24px;
`;

const Content = styled.span`
  display: flex;
  align-items: center;
  flex-grow: 1;
  gap: ${spacings.medium};
  font-size: 1.6rem;
  justify-content: center;
`;

const IntroContainer = styled.div`
  border: 1px solid ${colors.secondary};
  border-radius: ${box.borderRadius};
  background-color: ${theme.colors.white};
  padding: ${spacings.small};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${fonts.sizes.small};
`;

const CloseButton = styled(Button)`
  width: 24px;
  color: ${({ theme }) => theme.secondary};
  margin-left: auto;
`;
