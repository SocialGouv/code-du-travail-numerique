"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { useEffect, useState } from "react";
import { push } from "@socialgouv/matomo-next";
import Button from "@codegouvfr/react-dsfr/Button";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
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

  // Create the cookie settings modal
  const cookieSettingsModal = createModal({
    id: "cookie-settings",
    isOpenedByDefault: false,
  });

  const isModalOpen = useIsModalOpen(cookieSettingsModal);

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

  // Trigger openSettings when modal opens
  useEffect(() => {
    if (isModalOpen) {
      openSettings();
    }
  }, [isModalOpen]);

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
                    cookieSettingsModal.open();
                  }}
                  priority="tertiary"
                >
                  Personnaliser
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Settings Modal */}
      <cookieSettingsModal.Component
        title="Paramètres des cookies"
        buttons={[
          {
            children: "Enregistrer",
            onClick: handleSaveSettings,
          },
          {
            children: "Tout accepter",
            onClick: handleAcceptAll,
            priority: "secondary",
          },
          {
            children: "Tout refuser",
            onClick: handleRejectAll,
            priority: "tertiary",
          },
        ]}
      >
        <div className={fr.cx("fr-alert", "fr-alert--info")}>
          <div className={fr.cx("fr-alert__title")}>
            <h2 className={fr.cx("fr-h6")}>À propos des cookies</h2>
          </div>
          <p>
            Les cookies sont des petits fichiers déposés sur votre appareil
            (ordinateur, smartphone ou tablette) lorsque vous visitez un site
            web. Ils permettent de collecter des informations sur votre
            navigation et de vous proposer des services adaptés à votre
            utilisation.
          </p>
        </div>

        <p className={fr.cx("fr-mt-2w")}>
          Les cookies de mesure d&apos;audience sont nécessaires au bon
          fonctionnement du site. Vous pouvez choisir d&apos;accepter ou de
          refuser les cookies de suivi des campagnes publicitaires. Pour plus
          d&apos;informations, vous pouvez consulter notre{" "}
          <a href="/politique-confidentialite" className={fr.cx("fr-link")}>
            politique de confidentialité
          </a>
          .
        </p>

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
      </cookieSettingsModal.Component>

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
            onClick={() => cookieSettingsModal.open()}
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
