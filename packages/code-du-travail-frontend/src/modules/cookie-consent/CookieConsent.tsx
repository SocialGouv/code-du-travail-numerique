"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { useEffect, useState } from "react";
import Button from "@codegouvfr/react-dsfr/Button";
import Alert from "@codegouvfr/react-dsfr/Alert";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen";
import {
  ConsentType,
  DEFAULT_CONSENT,
  getStoredConsent,
  saveConsent,
  initConsent,
} from "../../lib/consent";

// Create the cookie settings modal
export const cookieSettingsModal = createModal({
  id: "cookie-settings-modal",
  isOpenedByDefault: false,
});

export const CookieConsentDSFR = () => {
  const [consent, setConsent] = useState<ConsentType>(DEFAULT_CONSENT);
  const [showBanner, setShowBanner] = useState(false);
  const isModalOpen = useIsModalOpen(cookieSettingsModal);

  // Initialize consent state from local storage
  useEffect(() => {
    const storedConsent = getStoredConsent();
    setConsent(storedConsent);

    // Show banner if no consent has been given yet
    const hasConsented = localStorage.getItem("cdtn-cookie-consent-given");
    if (!hasConsented) {
      setShowBanner(true);
      // Don't initialize cookies until user has consented
    } else {
      // User has already made a choice, initialize consent
      initConsent();
    }
  }, []);

  // Handle accepting all cookies
  const handleAcceptAll = () => {
    const newConsent = { matomo: true, sea: true };
    setConsent(newConsent);
    saveConsent(newConsent);
    setShowBanner(false);
    localStorage.setItem("cdtn-cookie-consent-given", "true");
  };

  // Handle rejecting all cookies
  const handleRejectAll = () => {
    // Matomo is mandatory, so it's always true
    const newConsent = { matomo: true, sea: false };
    setConsent(newConsent);
    saveConsent(newConsent);
    setShowBanner(false);
    localStorage.setItem("cdtn-cookie-consent-given", "true");
  };

  // Handle saving custom settings
  const handleSaveSettings = () => {
    saveConsent(consent);
    setShowBanner(false);
    cookieSettingsModal.close();
    localStorage.setItem("cdtn-cookie-consent-given", "true");
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
                et pour le suivi des campagnes publicitaires (SEA). Les cookies
                de mesure d&apos;audience sont nécessaires au bon fonctionnement
                du site. Vous pouvez choisir d&apos;accepter ou de refuser les
                cookies de suivi des campagnes publicitaires.
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
                  onClick={() => cookieSettingsModal.open()}
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
        className="fr-modal--cookie-settings"
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
        <Alert
          severity="info"
          title="À propos des cookies"
          description="Les cookies sont des fichiers déposés sur votre terminal lors de la visite d'un site. Ils ont pour but de collecter des informations relatives à votre navigation et de vous adresser des services adaptés à votre terminal."
        />

        <div className={fr.cx("fr-mt-4w")}>
          <Checkbox
            options={[
              {
                label: "Mesure d&apos;audience (Matomo) - Obligatoire",
                hintText:
                  "Ces cookies nous permettent d&apos;établir des statistiques de fréquentation de notre site et d&apos;améliorer ses performances.",
                nativeInputProps: {
                  checked: true,
                  disabled: true,
                  onChange: () => {}, // No-op function
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
                  checked: consent.sea,
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
