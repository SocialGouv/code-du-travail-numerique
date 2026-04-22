"use client";

import { useEffect, useState } from "react";
import { css } from "@styled-system/css";
import {
  ConsentType,
  DEFAULT_CONSENT,
  getStoredConsent,
  hasValidConsent,
  initConsent,
  saveConsent,
} from "../utils/consent";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { ToggleSwitch } from "@codegouvfr/react-dsfr/ToggleSwitch";
import { fr } from "@codegouvfr/react-dsfr";
import Link from "../common/Link";
import { useAgreementModal } from "../convention-collective/AgreementSelectionModal";
import { useSearchModal } from "../recherche/modal/SearchModalContext";

type Props = {
  heatmapEnabled: boolean;
  adsEnabled: boolean;
};

export const CookieConsentDSFR = ({ heatmapEnabled, adsEnabled }: Props) => {
  const [consent, setConsent] = useState<ConsentType>(DEFAULT_CONSENT);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { isOpen: isAgreementModalOpen } = useAgreementModal();
  const { isOpen: isSearchModalOpen } = useSearchModal();
  const isAnyModalOpen = isAgreementModalOpen || isSearchModalOpen;

  useEffect(() => {
    setConsent(getStoredConsent());

    if (!hasValidConsent()) {
      setShowBanner(true);
    } else {
      initConsent();
    }
  }, []);

  const persistConsent = (newConsent: ConsentType) => {
    setConsent(newConsent);
    saveConsent(newConsent);
    setShowBanner(false);
    setShowModal(false);
    initConsent();
  };

  const handleAcceptAll = () => {
    persistConsent({
      matomo: true,
      sea: adsEnabled,
      matomoHeatmap: heatmapEnabled,
    });
  };

  const handleRefuseAll = () => {
    persistConsent({ matomo: false, sea: false, matomoHeatmap: false });
  };

  const handleCustomize = () => {
    setShowModal(true);
  };

  const handleSavePreferences = () => {
    persistConsent(consent);
  };

  const handleConsentChange = (type: keyof ConsentType) => {
    setConsent((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <>
      {showBanner && !showModal && (
        <section
          className="fr-consent-banner"
          id="fr-consent-banner"
          inert={isAnyModalOpen || undefined}
          style={isAnyModalOpen ? { zIndex: 0 } : undefined}
        >
          <div className={fr.cx("fr-container")}>
            <div className="fr-consent-banner__content">
              <p className="fr-consent-banner__title">
                Ce site utilise des cookies
              </p>
              <p className="fr-consent-banner__desc">
                Nous utilisons des cookies de mesure d&apos;audience et de suivi
                des interactions des utilisateurs pour améliorer notre site.
                Vous pouvez accepter, refuser ou personnaliser votre choix.
                Votre consentement est valable 13 mois.
              </p>
            </div>
            <ul
              className={fr.cx(
                "fr-btns-group",
                "fr-btns-group--inline-md",
                "fr-btns-group--right",
                "fr-mx-1w"
              )}
            >
              <li>
                <Button
                  onClick={handleAcceptAll}
                  aria-label="Accepter tous les cookies"
                >
                  Tout accepter
                </Button>
              </li>
              <li>
                <Button
                  onClick={handleRefuseAll}
                  aria-label="Refuser les cookies de suivi"
                >
                  Tout refuser
                </Button>
              </li>
              <li>
                <Button
                  onClick={handleCustomize}
                  priority="tertiary"
                  aria-label="Personnaliser les cookies"
                >
                  Personnaliser
                </Button>
              </li>
            </ul>
          </div>
        </section>
      )}

      {showModal && (
        <>
          <div
            className={modalBackdrop}
            onClick={() => setShowModal(false)}
          ></div>
          <div className={modalContainer}>
            <div className={fr.cx("fr-modal__body")}>
              <div className={fr.cx("fr-modal__header")}>
                <button
                  className={fr.cx("fr-btn--close", "fr-btn")}
                  title="Fermer la fenêtre modale"
                  aria-controls="fr-consent-modal"
                  onClick={() => setShowModal(false)}
                >
                  Fermer
                </button>
              </div>
              <div className={fr.cx("fr-modal__content", "fr-mb-2w")}>
                <h1
                  id="fr-consent-modal-title"
                  className={fr.cx("fr-modal__title")}
                >
                  Paramètres des cookies
                </h1>
                <p>
                  Nous utilisons des cookies pour mesurer l&apos;audience et
                  l&apos;interaction des utilisateurs avec notre site. Vous
                  pouvez choisir d&apos;accepter ou de refuser ces cookies.
                  Votre consentement est valable 13 mois. Pour plus
                  d&apos;informations, vous pouvez consulter notre{" "}
                  <Link href="/politique-confidentialite">
                    politique de confidentialité
                  </Link>
                  .
                </p>

                <fieldset className={fr.cx("fr-fieldset")}>
                  <legend className={fr.cx("fr-fieldset__legend")}>
                    Cookies de mesure d&apos;audience
                  </legend>
                  <ToggleSwitch
                    label="Mesure d'audience - Matomo"
                    checked={consent.matomo}
                    onChange={() => handleConsentChange("matomo")}
                    style={{ width: "100%" }}
                  />
                  <p className={fr.cx("fr-info-text")}>
                    Ces cookies nous permettent d&apos;établir des statistiques
                    de fréquentation de notre site et d&apos;améliorer ses
                    performances.
                  </p>
                </fieldset>

                {adsEnabled && (
                  <fieldset className={fr.cx("fr-fieldset")}>
                    <legend className={fr.cx("fr-fieldset__legend")}>
                      Suivi des campagnes publicitaires
                    </legend>
                    <ToggleSwitch
                      label="Suivi des campagnes publicitaires"
                      checked={consent.sea}
                      onChange={() => handleConsentChange("sea")}
                    />
                    <p className={fr.cx("fr-info-text")}>
                      Ces cookies nous permettent de suivre l&apos;efficacité de
                      nos campagnes publicitaires sur les moteurs de recherche.
                    </p>
                  </fieldset>
                )}

                {heatmapEnabled && (
                  <fieldset className={fr.cx("fr-fieldset")}>
                    <legend className={fr.cx("fr-fieldset__legend")}>
                      Carte des chaleurs Matomo
                    </legend>
                    <ToggleSwitch
                      label="Carte des chaleurs Matomo"
                      checked={consent.matomoHeatmap}
                      onChange={() => handleConsentChange("matomoHeatmap")}
                      style={{ width: "100%" }}
                    />
                    <p className={fr.cx("fr-info-text")}>
                      Cette fonctionnalité nous permet de visualiser comment les
                      utilisateurs interagissent avec notre site (clics,
                      mouvements de souris) pour améliorer l&apos;expérience
                      utilisateur.
                    </p>
                  </fieldset>
                )}
              </div>
              <ul
                className={fr.cx(
                  "fr-btns-group",
                  "fr-btns-group--inline-md",
                  "fr-btns-group--right",
                  "fr-mx-1w",
                  "fr-mb-2w"
                )}
                style={{ borderTop: "1px solid #e5e5e5", paddingTop: "1rem" }}
              >
                <li>
                  <Button
                    onClick={handleRefuseAll}
                    priority="secondary"
                    className={fr.cx("fr-my-1v")}
                  >
                    Tout refuser
                  </Button>
                </li>
                <li>
                  <Button
                    onClick={handleAcceptAll}
                    priority="secondary"
                    className={fr.cx("fr-my-1v")}
                  >
                    Tout accepter
                  </Button>
                </li>
                <li>
                  <Button
                    onClick={handleSavePreferences}
                    className={fr.cx("fr-my-1v")}
                  >
                    Enregistrer
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}

      {!showBanner && (
        <div className={manageButton} inert={isAnyModalOpen || undefined}>
          <button
            className={fr.cx("fr-btn", "fr-btn--secondary", "fr-btn--sm")}
            onClick={() => setShowModal(true)}
            aria-label="Gérer les cookies"
          >
            <span className={fr.cx("fr-sr-only")}>Gérer les cookies</span>
            <span
              className={fr.cx("fr-icon-settings-5-line")}
              aria-hidden="true"
            ></span>
          </button>
        </div>
      )}
    </>
  );
};

const modalBackdrop = css({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 1040,
});

const modalContainer = css({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 1050,
  width: "90%",
  maxWidth: "600px",
  maxHeight: "90vh",
  backgroundColor: "white",
  borderRadius: "0.5rem",
  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
  overflow: "auto",
});

const manageButton = css({
  position: "fixed",
  bottom: "1rem",
  right: "1rem",
  zIndex: 999,
});
