"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  ConsentType,
  DEFAULT_CONSENT,
  getStoredConsent,
  saveConsent,
  initConsent,
} from "../../lib/consent";
import { theme } from "@socialgouv/cdtn-ui";

const CookieBanner = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${theme.colors.bgSecondary || "#f5f5fe"};
  padding: 1.5rem;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const BannerContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    width: 100%;
    padding-left: 0;
    padding-right: 0;
  }
`;

const BannerText = styled.div`
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 0.5rem;
  justify-content: flex-end;
`;

const Button = styled.button<{ primary?: boolean; secondary?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  ${({ primary }) =>
    primary &&
    `
    background-color: ${theme.colors.primary || "#000091"};
    color: white;
    border: 1px solid ${theme.colors.primary || "#000091"};
    
    &:hover {
      background-color: ${theme.colors.primaryDark || "#00006D"};
    }
  `}

  ${({ secondary }) =>
    secondary &&
    `
    background-color: transparent;
    color: ${theme.colors.primary || "#000091"};
    border: 1px solid ${theme.colors.primary || "#000091"};
    
    &:hover {
      background-color: ${theme.colors.bgSecondary || "#f5f5fe"};
    }
  `}
`;

const SettingsButton = styled.button`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  background-color: ${theme.colors.bgSecondary || "#f5f5fe"};
  color: ${theme.colors.primary || "#000091"};
  border: 1px solid ${theme.colors.primary || "#000091"};
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: ${theme.colors.bgTertiary || "#eeeef9"};
  }
`;

const Modal = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1001;
`;

const ModalContent = styled.div`
  position: relative;
  background-color: #ffffff;
  margin: 10% auto;
  padding: 2rem;
  border-radius: 4px;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${theme.colors.textSecondary || "#666666"};
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:hover {
    color: ${theme.colors.primary || "#000091"};
  }
`;

const ModalHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.div`
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 2.25rem;
  font-weight: bold;
`;

const ModalBody = styled.div`
  margin-bottom: 1.5rem;
`;

const InfoBox = styled.div`
  background-color: ${theme.colors.bgSecondary || "#f5f5fe"};
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
`;

const InfoTitle = styled.div`
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

const CheckboxGroup = styled.fieldset`
  margin-bottom: 1rem;
  border: none;
  padding: 0;
`;

const CheckboxLegend = styled.legend`
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  cursor: pointer;
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
  margin-top: 0.25rem;
`;

const CheckboxText = styled.span`
  display: block;
`;

const CheckboxTitle = styled.span`
  display: block;
  font-weight: 500;
`;

const CheckboxDescription = styled.span`
  display: block;
  font-size: 0.875rem;
  color: ${theme.colors.textSecondary || "#666666"};
`;

const ModalFooter = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  gap: 0.5rem;
`;

export const CookieConsentLegacy = () => {
  const [consent, setConsent] = useState<ConsentType>(DEFAULT_CONSENT);
  const [showBanner, setShowBanner] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize consent state from local storage
  useEffect(() => {
    const storedConsent = getStoredConsent();
    setConsent(storedConsent);

    // Show banner if no consent has been given yet
    const hasConsented = localStorage.getItem("cdtn-cookie-consent-given");
    if (!hasConsented) {
      console.log("No previous consent found, showing banner (legacy)");
      setShowBanner(true);
      // Don't initialize cookies until user has consented
    } else {
      console.log("Previous consent found, initializing consent (legacy)");
      // User has already made a choice, initialize consent
      initConsent();
    }
  }, []);

  // Handle accepting all cookies
  const handleAcceptAll = () => {
    const newConsent = { matomo: true, sea: true };
    console.log("User accepted all cookies (legacy):", newConsent);
    setConsent(newConsent);
    saveConsent(newConsent);
    setShowBanner(false);
    setIsModalOpen(false);
    localStorage.setItem("cdtn-cookie-consent-given", "true");

    // Initialize consent after user has made a choice
    console.log("Initializing consent after user acceptance (legacy)");
    initConsent();
  };

  // Handle rejecting all cookies
  const handleRejectAll = () => {
    // Matomo is mandatory, so it's always true
    const newConsent = { matomo: true, sea: false };
    console.log("User rejected optional cookies (legacy):", newConsent);
    setConsent(newConsent);
    saveConsent(newConsent);
    setShowBanner(false);
    setIsModalOpen(false);
    localStorage.setItem("cdtn-cookie-consent-given", "true");

    // Initialize consent after user has made a choice
    console.log("Initializing consent after user rejection (legacy)");
    initConsent();
  };

  // Handle saving custom settings
  const handleSaveSettings = () => {
    console.log("User saved custom settings (legacy):", consent);
    saveConsent(consent);
    setShowBanner(false);
    setIsModalOpen(false);
    localStorage.setItem("cdtn-cookie-consent-given", "true");

    // Initialize consent after user has made a choice
    console.log("Initializing consent after user saved settings (legacy)");
    initConsent();
  };

  // Handle checkbox changes
  const handleConsentChange = (type: keyof ConsentType) => {
    setConsent((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <>
      {/* Cookie Consent Banner */}
      {showBanner && (
        <CookieBanner>
          <BannerContent>
            <BannerText>
              <Title>Ce site utilise des cookies</Title>
              <Description>
                Nous utilisons des cookies pour mesurer l&apos;audience et pour
                le suivi des campagnes publicitaires. Les cookies de mesure
                d&apos;audience sont nécessaires au bon fonctionnement du site.
                Vous pouvez choisir d&apos;accepter ou de refuser les cookies de
                suivi des campagnes publicitaires.
              </Description>
            </BannerText>
            <ButtonGroup>
              <Button secondary onClick={() => setIsModalOpen(true)}>
                Personnaliser
              </Button>
              <Button primary onClick={handleRejectAll}>
                Tout refuser
              </Button>
              <Button primary onClick={handleAcceptAll}>
                Tout accepter
              </Button>
            </ButtonGroup>
          </BannerContent>
        </CookieBanner>
      )}

      {/* Cookie Settings Modal */}
      <Modal isOpen={isModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Paramètres des cookies</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <InfoBox>
              <InfoTitle>À propos des cookies</InfoTitle>
              <p>
                Les cookies sont des petits fichiers déposés sur votre appareil
                (ordinateur, smartphone ou tablette) lorsque vous visitez un
                site web. Ils permettent de collecter des informations sur votre
                navigation et de vous proposer des services adaptés à votre
                utilisation.
              </p>
              <p>
                Les cookies de mesure d&apos;audience sont nécessaires au bon
                fonctionnement du site. Vous pouvez choisir d&apos;accepter ou
                de refuser les cookies de suivi des campagnes publicitaires.
                Pour plus d&apos;informations, vous pouvez consulter notre{" "}
                <a
                  href="/politique-confidentialite"
                  style={{
                    color: theme.colors.primary,
                    textDecoration: "underline",
                  }}
                >
                  politique de confidentialité
                </a>
                .
              </p>
            </InfoBox>

            <CheckboxGroup>
              <CheckboxLegend>Cookies de mesure d&apos;audience</CheckboxLegend>
              <CheckboxLabel>
                <Checkbox
                  type="checkbox"
                  checked={true}
                  disabled={true}
                  onChange={() => {}} // No-op function
                />
                <CheckboxText>
                  <CheckboxTitle>
                    Mesure d&apos;audience - Obligatoire
                  </CheckboxTitle>
                  <CheckboxDescription>
                    Ces cookies nous permettent d&apos;établir des statistiques
                    de fréquentation de notre site et d&apos;améliorer ses
                    performances.
                  </CheckboxDescription>
                </CheckboxText>
              </CheckboxLabel>
            </CheckboxGroup>

            <CheckboxGroup>
              <CheckboxLegend>Cookies de suivi publicitaire</CheckboxLegend>
              <CheckboxLabel>
                <Checkbox
                  type="checkbox"
                  checked={consent.sea}
                  onChange={() => handleConsentChange("sea")}
                />
                <CheckboxText>
                  <CheckboxTitle>
                    Suivi des campagnes publicitaires
                  </CheckboxTitle>
                  <CheckboxDescription>
                    Ces cookies nous permettent de suivre l&apos;efficacité de
                    nos campagnes publicitaires sur les moteurs de recherche.
                  </CheckboxDescription>
                </CheckboxText>
              </CheckboxLabel>
            </CheckboxGroup>
          </ModalBody>
          <CloseButton
            onClick={() => setIsModalOpen(false)}
            aria-label="Fermer la fenêtre des paramètres de cookies"
          >
            ×
          </CloseButton>
          <ModalFooter>
            <Button primary onClick={handleSaveSettings}>
              Enregistrer
            </Button>
            <Button secondary onClick={handleRejectAll}>
              Tout refuser
            </Button>
            <Button secondary onClick={handleAcceptAll}>
              Tout accepter
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Manage Cookies Button (fixed at the bottom) */}
      {!showBanner && (
        <SettingsButton onClick={() => setIsModalOpen(true)}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Cookies
        </SettingsButton>
      )}
    </>
  );
};

export default CookieConsentLegacy;
