"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { createConsentManagement } from "@codegouvfr/react-dsfr/consentManagement";
import { useEffect, useState } from "react";
import { css } from "@styled-system/css";
import { initConsent, getStoredConsent } from "../utils/consent";
import { safeGetItem } from "../utils/storage";

// DSFR Consent Management setup - will be created dynamically based on props
let consentManagement: ReturnType<typeof createConsentManagement> | null = null;

const getConsentManagement = (heatmapEnabled: boolean, adsEnabled: boolean) => {
  if (consentManagement) return consentManagement;

  const finalityDescription: any = {
    matomo: {
      title: "Mesure d'audience",
      description: "Ces cookies nous permettent d'établir des statistiques de fréquentation de notre site et d'améliorer ses performances.",
    },
  };

  if (adsEnabled) {
    finalityDescription.sea = {
      title: "Suivi des campagnes publicitaires",
      description: "Ces cookies nous permettent de suivre l'efficacité de nos campagnes publicitaires sur les moteurs de recherche.",
    };
  }

  if (heatmapEnabled) {
    finalityDescription.matomoHeatmap = {
      title: "Carte des chaleurs Matomo",
      description: "Cette fonctionnalité nous permet de visualiser comment les utilisateurs interagissent avec notre site (clics, mouvements de souris) pour améliorer l'expérience utilisateur.",
    };
  }

  consentManagement = createConsentManagement({
    finalityDescription,
    personalDataPolicyLinkProps: {
      href: "/politique-confidentialite",
    },
    consentCallback: ({ finalityConsent }) => {
      // Apply consent using existing logic
      const consent = {
        matomo: true, // Matomo is always mandatory
        sea: adsEnabled ? (finalityConsent.sea ?? false) : false,
        matomoHeatmap: heatmapEnabled ? (finalityConsent.matomoHeatmap ?? false) : false,
      };

      // Import and apply consent
      import("../utils/consent").then(({ saveConsent }) => {
        saveConsent(consent);
      });
    },
  });

  return consentManagement;
};

type Props = {
  heatmapEnabled: boolean;
  adsEnabled: boolean;
};

export const CookieConsentDSFR = ({ heatmapEnabled, adsEnabled }: Props) => {
  const [showManageButton, setShowManageButton] = useState(false);

  // Initialize consent on mount
  useEffect(() => {
    initConsent();

    // Show manage button if consent has been given
    const hasConsented = safeGetItem("cdtn-cookie-consent-given");
    if (hasConsented) {
      setShowManageButton(true);

      // Also set DSFR consent state to match existing consent
      const existingConsent = getStoredConsent();
      const dsfrConsentKey = "@codegouvfr/react-dsfr finalityConsent matomo-sea-matomoHeatmap";
      const dsfrConsent = {
        matomo: existingConsent.matomo,
        sea: existingConsent.sea,
        matomoHeatmap: existingConsent.matomoHeatmap,
      };
      localStorage.setItem(dsfrConsentKey, JSON.stringify(dsfrConsent));
    }
  }, []);

  const { ConsentBannerAndConsentManagement } = getConsentManagement(heatmapEnabled, adsEnabled);

  return (
    <>
      <ConsentBannerAndConsentManagement />
      {showManageButton && (
        <div className={css({
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          zIndex: 1000,
        })}>
          <button
            className={fr.cx("fr-btn", "fr-btn--secondary", "fr-btn--sm")}
            onClick={() => {
              // Trigger the DSFR modal
              const modalButton = document.getElementById("fr-consent-modal-control-button");
              if (modalButton) {
                modalButton.click();
              }
            }}
            title="Gérer les cookies"
            aria-label="Gérer les cookies"
          >
            <span className={fr.cx("fr-sr-only")}>Gérer les cookies</span>
            <span className={fr.cx("fr-icon-settings-5-line")} aria-hidden="true"></span>
          </button>
        </div>
      )}
    </>
  );
};
