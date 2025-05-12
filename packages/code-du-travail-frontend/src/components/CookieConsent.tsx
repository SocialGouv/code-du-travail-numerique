"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { useEffect, useState } from "react";
import { push } from "@socialgouv/matomo-next";
import Button from "@codegouvfr/react-dsfr/Button";
import Alert from "@codegouvfr/react-dsfr/Alert";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import Modal from "@codegouvfr/react-dsfr/Modal";
import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen";

// Cookie consent types
export type ConsentType = {
  matomo: boolean;
  sea: boolean;
};

// Local storage key for cookie consent
const CONSENT_STORAGE_KEY = "cdtn-cookie-consent";

// Get consent from local storage
const getStoredConsent = (): ConsentType | null => {
  if (typeof window === "undefined") return null;

  try {
    const storedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
    return storedConsent ? JSON.parse(storedConsent) : null;
  } catch (e) {
    console.error("Error reading consent from localStorage:", e);
    return null;
  }
};

// Save consent to local storage
const saveConsent = (consent: ConsentType) => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  } catch (e) {
    console.error("Error saving consent to localStorage:", e);
  }
};

// Apply consent settings to tracking tools
const applyConsent = (consent: ConsentType) => {
  if (consent.matomo) {
    console.debug("Activation des cookies Matomo.");
    push(["forgetUserOptOut"]);
    push(["rememberCookieConsentGiven"]);
  } else {
    console.debug("Désactivation des cookies Matomo.");
    push(["optUserOut"]);
    push(["forgetCookieConsentGiven"]);
  }

  // SEA tracking implementation
  if (consent.sea) {
    console.debug("Activation du tracking SEA.");
    // Add SEA tracking code here
    // This would typically involve setting a cookie or enabling a tracking script
  } else {
    console.debug("Désactivation du tracking SEA.");
    // Add code to disable SEA tracking
  }
};

export const CookieConsent = () => {
  const [consent, setConsent] = useState<ConsentType | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const isModalOpen = useIsModalOpen({
    id: "cookie-settings",
    isOpenedByDefault: false,
  });

  // Initialize consent state from local storage
  useEffect(() => {
    const storedConsent = getStoredConsent();
    if (storedConsent) {
      setConsent(storedConsent);
      applyConsent(storedConsent);
    } else {
      setShowBanner(true);
    }
  }, []);

  // Handle accepting all cookies
  const handleAcceptAll = () => {
    const newConsent = { matomo: true, sea: true };
    setConsent(newConsent);
    saveConsent(newConsent);
    applyConsent(newConsent);
    setShowBanner(false);
  };

  // Handle rejecting all cookies
  const handleRejectAll = () => {
    const newConsent = { matomo: false, sea: false };
    setConsent(newConsent);
    saveConsent(newConsent);
    applyConsent(newConsent);
    setShowBanner(false);
  };

  // Handle saving custom settings
  const handleSaveSettings = () => {
    if (consent) {
      saveConsent(consent);
      applyConsent(consent);
      setShowBanner(false);
    }
  };

  // Handle checkbox changes
  const handleConsentChange = (type: keyof ConsentType) => {
    setConsent((prev) => {
      if (!prev) return { matomo: false, sea: false, [type]: true };
      return { ...prev, [type]: !prev[type] };
    });
  };

  // Open cookie settings modal
  const openSettings = () => {
    if (!consent) {
      setConsent({ matomo: false, sea: false });
    }
  };

  return (
    <>
      {/* Cookie Consent Banner */}
      {showBanner && (
        <div
          className={fr.cx(
            "fr-container",
            "fr-py-2w",
            "fr-px-2w",
            "fr-mb-0",
            "fr-mt-0"
          )}
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            backgroundColor: "var(--background-default-grey)",
            boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className={fr.cx("fr-grid-row", "fr-grid-row--middle")}>
            <div className={fr.cx("fr-col-12", "fr-col-md-8")}>
              <p className={fr.cx("fr-mb-1w")}>
                <strong>Ce site utilise des cookies</strong>
              </p>
              <p className={fr.cx("fr-mb-1w")}>
                Nous utilisons des cookies pour mesurer l&apos;audience (Matomo)
                et pour le suivi des campagnes publicitaires (SEA). Vous pouvez
                choisir d&apos;accepter ou de refuser ces cookies.
              </p>
            </div>
            <div
              className={fr.cx(
                "fr-col-12",
                "fr-col-md-4",
                "fr-mt-1w",
                "fr-mt-md-0"
              )}
            >
              <div
                className={fr.cx(
                  "fr-btns-group",
                  "fr-btns-group--inline-reverse",
                  "fr-btns-group--inline-md"
                )}
              >
                <Button onClick={handleAcceptAll}>Tout accepter</Button>
                <Button onClick={handleRejectAll} priority="secondary">
                  Tout refuser
                </Button>
                <Button
                  onClick={() => {
                    setShowBanner(false);
                  }}
                  priority="tertiary"
                  id="cookie-settings-button"
                  aria-controls="cookie-settings"
                  data-fr-opened={isModalOpen}
                >
                  Personnaliser
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Settings Modal */}
      <Modal.Root id="cookie-settings" onOpen={openSettings}>
        <Modal.Title>Paramètres des cookies</Modal.Title>
        <Modal.Content>
          <Alert
            severity="info"
            title="À propos des cookies"
            description="Les cookies sont des fichiers déposés sur votre terminal lors de la visite d'un site. Ils ont pour but de collecter des informations relatives à votre navigation et de vous adresser des services adaptés à votre terminal."
          />

          <div className={fr.cx("fr-mt-4w")}>
            <Checkbox
              options={[
                {
                  label: "Mesure d&apos;audience (Matomo)",
                  hintText:
                    "Ces cookies nous permettent d&apos;établir des statistiques de fréquentation de notre site et d&apos;améliorer ses performances.",
                  nativeInputProps: {
                    checked: consent?.matomo || false,
                    onChange: () => handleConsentChange("matomo"),
                  },
                },
              ]}
            />
          </div>

          <div className={fr.cx("fr-mt-2w")}>
            <Checkbox
              options={[
                {
                  label: "Suivi des campagnes publicitaires (SEA)",
                  hintText:
                    "Ces cookies nous permettent de suivre l&apos;efficacité de nos campagnes publicitaires sur les moteurs de recherche.",
                  nativeInputProps: {
                    checked: consent?.sea || false,
                    onChange: () => handleConsentChange("sea"),
                  },
                },
              ]}
            />
          </div>
        </Modal.Content>
        <Modal.Footer>
          <Button onClick={handleSaveSettings}>Enregistrer</Button>
          <Button onClick={handleAcceptAll} priority="secondary">
            Tout accepter
          </Button>
          <Button onClick={handleRejectAll} priority="tertiary">
            Tout refuser
          </Button>
        </Modal.Footer>
      </Modal.Root>

      {/* Manage Cookies Button (fixed at the bottom) */}
      {!showBanner && (
        <div
          style={{
            position: "fixed",
            bottom: "1rem",
            right: "1rem",
            zIndex: 1000,
          }}
        >
          <Button
            size="small"
            priority="tertiary"
            id="cookie-settings-button"
            aria-controls="cookie-settings"
            data-fr-opened={isModalOpen}
            iconId="fr-icon-settings-5-line"
            title="Gérer les cookies"
          >
            Cookies
          </Button>
        </div>
      )}
    </>
  );
};
