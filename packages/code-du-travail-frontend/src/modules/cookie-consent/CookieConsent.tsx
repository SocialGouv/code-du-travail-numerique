"use client";

import { useEffect, useState } from "react";
import { css } from "@styled-system/css";
import {
  ConsentType,
  DEFAULT_CONSENT,
  getStoredConsent,
  initConsent,
  saveConsent,
} from "../utils/consent";
import { safeGetItem, safeSetItem } from "../utils/storage";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { ToggleSwitch } from "@codegouvfr/react-dsfr/ToggleSwitch";
import { fr } from "@codegouvfr/react-dsfr";
import Link from "../common/Link";

type Props = {
  heatmapEnabled: boolean;
  adsEnabled: boolean;
};

export const CookieConsentDSFR = ({ heatmapEnabled, adsEnabled }: Props) => {
  const [consent, setConsent] = useState<ConsentType>(DEFAULT_CONSENT);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedConsent = getStoredConsent();
    setConsent(storedConsent);

    const hasConsented = safeGetItem("cdtn-cookie-consent-given");
    if (!hasConsented) {
      setShowBanner(true);
    } else {
      initConsent();
    }
  }, []);

  const handleAcceptAll = () => {
    const newConsent = {
      matomo: true,
      sea: adsEnabled,
      matomoHeatmap: heatmapEnabled,
    };
    setConsent(newConsent);
    saveConsent(newConsent);
    setShowBanner(false);
    setShowModal(false);
    safeSetItem("cdtn-cookie-consent-given", "true");

    initConsent();
  };

  const handleRefuseAll = () => {
    const newConsent = { matomo: true, sea: false, matomoHeatmap: false };
    setConsent(newConsent);
    saveConsent(newConsent);
    setShowBanner(false);
    setShowModal(false);
    safeSetItem("cdtn-cookie-consent-given", "true");

    initConsent();
  };

  const handleCustomize = () => {
    setShowModal(true);
  };

  const handleSavePreferences = () => {
    saveConsent(consent);
    setShowBanner(false);
    setShowModal(false);
    safeSetItem("cdtn-cookie-consent-given", "true");
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
        <section className="fr-consent-banner" id="fr-consent-banner">
          <div className={fr.cx("fr-container")}>
            <div className="fr-consent-banner__content">
              <p className="fr-consent-banner__title">
                Ce site utilise des cookies
              </p>
              <p className="fr-consent-banner__desc">
                Nous utilisons des cookies pour mesurer l'&apos;'audience et
                l&apos;interaction des utilisateurs avec notre site. Les cookies de
                mesure d&apos;audience sont nécessaires au bon fonctionnement du
                site. Vous pouvez choisir d&apos;accepter ou de refuser les cookies
                de suivi des interactions des utilisateurs.
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
                  l&apos;interaction des utilisateurs avec notre site. Les cookies de
                  mesure d&apos;audience sont nécessaires au bon fonctionnement du
                  site. Vous pouvez choisir d&apos;accepter ou de refuser les cookies
                  de suivi des interactions des utilisateurs. Pour plus
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
                    label="Mesure d'audience - Obligatoire"
                    checked={consent.matomo}
                    onChange={() => { }}
                    disabled
                    style={{ width: "100%" }}
                  />
                  <p className={fr.cx("fr-info-text")}>
                    Ces cookies nous permettent d&apos;établir des statistiques de
                    fréquentation de notre site et d&apos;améliorer ses performances.
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
                      Ces cookies nous permettent de suivre l&apos;efficacité de nos
                      campagnes publicitaires sur les moteurs de recherche.
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
                    title="Tout refuser"
                    onClick={handleRefuseAll}
                    priority="secondary"
                    className={fr.cx("fr-my-1v")}
                  >
                    Tout refuser
                  </Button>
                </li>
                <li>
                  <Button
                    title="Tout accepter"
                    onClick={handleAcceptAll}
                    priority="secondary"
                    className={fr.cx("fr-my-1v")}
                  >
                    Tout accepter
                  </Button>
                </li>
                <li>
                  <Button
                    title="Enregistrer"
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
        <div className={manageButton}>
          <button
            className={fr.cx("fr-btn", "fr-btn--secondary", "fr-btn--sm")}
            onClick={() => setShowModal(true)}
            title="Gérer les cookies"
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
  zIndex: 1000,
});
