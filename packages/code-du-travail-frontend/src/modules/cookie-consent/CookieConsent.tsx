"use client";

import React from "react";
import { useEffect, useState } from "react";
import { css } from "@styled-system/css";
import { initConsent, getStoredConsent, saveConsent } from "../utils/consent";
import { safeGetItem } from "../utils/storage";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { ToggleSwitch } from "@codegouvfr/react-dsfr/ToggleSwitch";

type Props = {
  heatmapEnabled: boolean;
  adsEnabled: boolean;
};

export const CookieConsentDSFR = ({ heatmapEnabled, adsEnabled }: Props) => {
  const [showBanner, setShowBanner] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showManageButton, setShowManageButton] = useState(false);
  const [consent, setConsent] = useState({
    matomo: true, // Always mandatory
    sea: false,
    matomoHeatmap: false,
  });

  // Initialize consent on mount
  useEffect(() => {
    initConsent();

    const hasConsented = safeGetItem("cdtn-cookie-consent-given");
    if (hasConsented) {
      setShowBanner(false);
      setShowManageButton(true);
      const existingConsent = getStoredConsent();
      setConsent(existingConsent);
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
    setShowManageButton(true);
  };

  const handleRefuseAll = () => {
    const newConsent = {
      matomo: true, // Matomo is mandatory
      sea: false,
      matomoHeatmap: false,
    };
    setConsent(newConsent);
    saveConsent(newConsent);
    setShowBanner(false);
    setShowModal(false);
    setShowManageButton(true);
  };

  const handleCustomize = () => {
    setShowModal(true);
  };

  const handleSavePreferences = () => {
    saveConsent(consent);
    setShowModal(false);
    setShowBanner(false);
    setShowManageButton(true);
  };

  const toggleConsent = (key: keyof typeof consent) => {
    if (key === 'matomo') return; // Matomo is always mandatory
    setConsent(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {showBanner && !showModal && (
        <section className="fr-consent-banner" id="fr-consent-banner">
          <div className="fr-container">
            <div className="fr-consent-banner__content">
              <p className="fr-consent-banner__title">
                Ce site utilise des cookies
              </p>
              <p className="fr-consent-banner__desc">
                Nous utilisons des cookies pour mesurer l'audience et l'interaction des utilisateurs avec notre site.
                Les cookies de mesure d'audience sont nécessaires au bon fonctionnement du site.
                Vous pouvez choisir d'accepter ou de refuser les cookies de suivi des interactions des utilisateurs.
                Pour plus d'informations, vous pouvez consulter notre{" "}
                <a href="/politique-confidentialite">politique de confidentialité</a>.
              </p>
            </div>
            <div className={css({
              display: "flex",
              justifyContent: "flex-end",
              gap: "1rem",
            })}>
              <button
                className="fr-btn"
                id="fr-consent-banner-button-accept"
                onClick={handleAcceptAll}
              >
                Tout accepter
              </button>
              <button
                className="fr-btn fr-btn--secondary"
                id="fr-consent-banner-button-refuse"
                onClick={handleRefuseAll}
              >
                Tout refuser
              </button>
              <button
                className="fr-btn fr-btn--secondary"
                id="fr-consent-banner-button-customize"
                onClick={handleCustomize}
              >
                Personnaliser
              </button>
            </div>
          </div>
        </section>
      )}

      {showModal && (
        <>
          <div
            className={css({
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1040,
            })}
            onClick={() => setShowModal(false)}
          ></div>
          <div
            className={css({
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
            })}
          >
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button
                  className="fr-btn--close fr-btn"
                  title="Fermer la fenêtre modale"
                  aria-controls="fr-consent-modal"
                  onClick={() => setShowModal(false)}
                >
                  Fermer
                </button>
              </div>
              <div className="fr-modal__content">
                <h1 id="fr-consent-modal-title" className="fr-modal__title">
                  Paramètres des cookies
                </h1>
                <p>
                  Nous utilisons des cookies pour mesurer l'audience et l'interaction des utilisateurs avec notre site. Les cookies de mesure d'audience sont nécessaires au bon fonctionnement du site. Vous pouvez choisir d'accepter ou de refuser les cookies de suivi des interactions des utilisateurs. Pour plus d'informations, vous pouvez consulter notre{" "}
                  <a href="/politique-confidentialite">politique de confidentialité</a>.
                </p>

                <fieldset className="fr-fieldset">
                  <legend className="fr-fieldset__legend">Cookies de mesure d'audience</legend>
                  <ToggleSwitch
                    label="Mesure d'audience - Obligatoire"
                    checked={consent.matomo}
                    onChange={() => { }}
                    disabled
                    style={{ width: "100%" }}
                  />
                  <p className="fr-info-text">
                    Ces cookies nous permettent d'établir des statistiques de fréquentation de notre site et d'améliorer ses performances.
                  </p>
                </fieldset>

                {adsEnabled && (
                  <fieldset className="fr-fieldset">
                    <legend className="fr-fieldset__legend">Suivi des campagnes publicitaires</legend>
                    <ToggleSwitch
                      label="Suivi des campagnes publicitaires"
                      checked={consent.sea}
                      onChange={() => toggleConsent('sea')}
                    />
                    <p className="fr-info-text">
                      Ces cookies nous permettent de suivre l'efficacité de nos campagnes publicitaires sur les moteurs de recherche.
                    </p>
                  </fieldset>
                )}

                {heatmapEnabled && (
                  <fieldset className="fr-fieldset">
                    <legend className="fr-fieldset__legend">Carte des chaleurs Matomo</legend>
                    <ToggleSwitch
                      label="Carte des chaleurs Matomo"
                      checked={consent.matomoHeatmap}
                      onChange={() => toggleConsent('matomoHeatmap')}
                      style={{ width: "100%" }}
                    />
                    <p className="fr-info-text">
                      Cette fonctionnalité nous permet de visualiser comment les utilisateurs interagissent avec notre site (clics, mouvements de souris) pour améliorer l'expérience utilisateur.
                    </p>
                  </fieldset>
                )}
              </div>
              <div className="fr-modal__footer">
                <ul className="fr-btns-group">
                  <li>
                    <Button
                      title="Tout refuser"
                      onClick={handleRefuseAll}
                      priority="secondary"
                    >
                      Tout refuser
                    </Button>
                  </li>
                  <li>
                    <Button
                      title="Tout accepter"
                      onClick={handleAcceptAll}
                      priority="secondary"
                    >
                      Tout accepter
                    </Button>
                  </li>
                  <li>
                    <Button
                      title="Enregistrer"
                      onClick={handleSavePreferences}
                    >
                      Enregistrer
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}

      {showManageButton && (
        <div className={css({
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          zIndex: 1000,
        })}>
          <button
            className="fr-btn fr-btn--secondary fr-btn--sm"
            onClick={() => setShowModal(true)}
            title="Gérer les cookies"
            aria-label="Gérer les cookies"
          >
            <span className="fr-sr-only">Gérer les cookies</span>
            <span className="fr-icon-settings-5-line" aria-hidden="true"></span>
          </button>
        </div>
      )}
    </>
  );
};
