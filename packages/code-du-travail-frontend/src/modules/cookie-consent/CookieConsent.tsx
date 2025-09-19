"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Button from "@codegouvfr/react-dsfr/Button";
import { css } from "@styled-system/css";
import {
  ConsentType,
  DEFAULT_CONSENT,
  getStoredConsent,
  saveConsent,
  initConsent,
} from "../utils/consent";
import Link from "../common/Link";

const modalFooter = css({
  position: "sticky",
  bottom: 0,
  backgroundColor: "var(--background-default-grey)",
  paddingTop: "1rem",
  zIndex: 1,
  width: "100%",
  overflow: "hidden",
});

const cookieBanner = css({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  backgroundColor: "var(--background-default-grey)",
  boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)",
});

const manageButton = css({
  position: "fixed",
  bottom: "1rem",
  right: "1rem",
  zIndex: 1000,
});

// Style responsive pour les boutons
const responsiveButtonsContainer = css({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  gap: "1rem",
  width: "100%",
  "@media (max-width: 768px)": {
    flexDirection: "column",
    gap: "0.5rem",
  },
});

const responsiveButton = css({
  "@media (max-width: 768px)": {
    width: "100% !important",
  },
});

export const CookieConsentDSFR = () => {
  const [consent, setConsent] = useState<ConsentType>(DEFAULT_CONSENT);
  const [showBanner, setShowBanner] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();

  // Refs for focus management
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);
  const personalizeButtonRef = useRef<HTMLButtonElement>(null);
  const manageButtonRef = useRef<HTMLButtonElement>(null);

  // Don't show cookie consent on widget pages
  const isWidgetPage = pathname?.startsWith("/widgets");

  // Open modal
  const openModal = () => {
    // Store the current active element (the one that triggered the modal)
    triggerElementRef.current = document.activeElement as HTMLElement;
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

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

  // Focus management when modal opens/closes
  useEffect(() => {
    if (isModalOpen) {
      // When modal opens, focus the close button
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100); // Small delay to ensure modal is rendered
    } else {
      // When modal closes, return focus to the trigger element
      if (triggerElementRef.current) {
        setTimeout(() => {
          triggerElementRef.current?.focus();
        }, 100); // Small delay to ensure modal transition is complete
      }
    }
  }, [isModalOpen]);

  // Handle accepting all cookies
  const handleAcceptAll = () => {
    const newConsent = { matomo: true, sea: true, matomoHeatmap: true };
    setConsent(newConsent);
    saveConsent(newConsent);
    setShowBanner(false);
    closeModal();
    localStorage.setItem("cdtn-cookie-consent-given", "true");

    // Initialize consent after user has made a choice
    initConsent();
  };

  // Handle rejecting all cookies
  const handleRejectAll = () => {
    // Matomo is mandatory, so it's always true
    const newConsent = { matomo: true, sea: false, matomoHeatmap: false };
    setConsent(newConsent);
    saveConsent(newConsent);
    setShowBanner(false);
    closeModal();
    localStorage.setItem("cdtn-cookie-consent-given", "true");

    // Initialize consent after user has made a choice
    initConsent();
  };

  // Handle saving custom settings
  const handleSaveSettings = () => {
    saveConsent(consent);
    setShowBanner(false);
    closeModal();
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
      {!isWidgetPage && showBanner && (
        <div
          className={`${fr.cx(
            "fr-container",
            "fr-py-2w",
            "fr-px-2w",
            "fr-mb-0",
            "fr-mt-0"
          )} ${cookieBanner}`}
        >
          <div className={fr.cx("fr-grid-row")}>
            <div className={fr.cx("fr-col-12")}>
              <h2 className={fr.cx("fr-mb-1w")}>Ce site utilise des cookies</h2>
              <p className={fr.cx("fr-mb-3w")}>
                Nous utilisons des cookies pour mesurer l&apos;audience et pour
                le suivi des campagnes publicitaires. Les cookies de mesure
                d&apos;audience sont nécessaires au bon fonctionnement du site.
                Vous pouvez choisir d&apos;accepter ou de refuser les cookies de
                suivi des campagnes publicitaires.
              </p>
            </div>
          </div>
          <div className={fr.cx("fr-grid-row")}>
            <div
              className={fr.cx(
                "fr-col-12",
                "fr-col-offset-md-6",
                "fr-col-md-6"
              )}
            >
              <div
                className={fr.cx(
                  "fr-btns-group",
                  "fr-btns-group--right",
                  "fr-btns-group--inline",
                  "fr-btns-group--inline-reverse",
                  "fr-grid-row",
                  "fr-grid-row--right"
                )}
              >
                <Button
                  ref={personalizeButtonRef}
                  onClick={openModal}
                  priority="tertiary"
                  aria-label="Personnaliser les cookies"
                >
                  Personnaliser
                </Button>
                <Button
                  onClick={handleRejectAll}
                  aria-label="Refuser les cookies"
                >
                  Tout refuser
                </Button>
                <Button
                  onClick={handleAcceptAll}
                  aria-label="Accepter les cookies"
                >
                  Tout accepter
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Settings Modal */}
      <div
        className={`fr-modal ${isModalOpen ? "fr-modal--opened" : ""}`}
        id="cookie-settings-modal"
        aria-labelledby="cookie-settings-modal-title"
        role="dialog"
        aria-modal={isModalOpen ? "true" : "false"}
        style={{ overflow: "visible" }}
      >
        {isModalOpen && (
          <div className="fr-modal__backdrop" onClick={closeModal}></div>
        )}
        <div
          className={fr.cx(
            "fr-container",
            "fr-container--fluid",
            "fr-container-md"
          )}
        >
          <div className={fr.cx("fr-grid-row", "fr-grid-row--center")}>
            <div className={fr.cx("fr-col-12", "fr-col-md-10", "fr-col-lg-8")}>
              <div className={`${fr.cx("fr-modal__body")}`}>
                <div className={fr.cx("fr-modal__header")}>
                  <button
                    ref={closeButtonRef}
                    className={fr.cx("fr-btn--close", "fr-btn")}
                    title="Fermer la fenêtre modale"
                    aria-controls="cookie-settings-modal"
                    onClick={closeModal}
                  >
                    Fermer
                  </button>
                </div>
                <div className={`${fr.cx("fr-modal__content")}`}>
                  <div className={fr.cx("fr-modal__title")}>
                    <h1
                      className={fr.cx("fr-h3")}
                      id="cookie-settings-modal-title"
                    >
                      Paramètres des cookies
                    </h1>
                  </div>

                  <p className={fr.cx("fr-mt-2w")}>
                    Les cookies de mesure d&apos;audience sont nécessaires au
                    bon fonctionnement du site. Vous pouvez choisir
                    d&apos;accepter ou de refuser les cookies de suivi des
                    campagnes publicitaires. Pour plus d&apos;informations, vous
                    pouvez consulter notre{" "}
                    <Link
                      href="/politique-confidentialite"
                      className={fr.cx("fr-link")}
                    >
                      politique de confidentialité
                    </Link>
                    .
                  </p>

                  <div className={fr.cx("fr-mt-2w")}>
                    <fieldset
                      className={fr.cx("fr-fieldset")}
                      id="cookie-audience-fieldset"
                    >
                      <legend className={fr.cx("fr-fieldset__legend")}>
                        Cookies de mesure d&apos;audience
                      </legend>
                      <div className="fr-form-group">
                        <div className={fr.cx("fr-toggle")}>
                          <input
                            type="checkbox"
                            className={fr.cx("fr-toggle__input")}
                            id="toggle-audience"
                            name="toggle-audience"
                            checked={true}
                            disabled={true}
                            onChange={() => {}}
                            aria-labelledby="toggle-audience-label"
                          />
                          <label
                            className={fr.cx("fr-toggle__label")}
                            htmlFor="toggle-audience"
                            id="toggle-audience-label"
                            data-fr-checked-label="Activé"
                            data-fr-unchecked-label="Désactivé"
                          >
                            Mesure d&apos;audience - Obligatoire
                          </label>
                          <p className={fr.cx("fr-hint-text")}>
                            Ces cookies nous permettent d&apos;établir des
                            statistiques de fréquentation de notre site et
                            d&apos;améliorer ses performances.
                          </p>
                        </div>
                      </div>
                    </fieldset>
                  </div>

                  <div className={fr.cx("fr-mt-2w")}>
                    <fieldset
                      className={fr.cx("fr-fieldset")}
                      id="cookie-sea-fieldset"
                    >
                      <legend className={fr.cx("fr-fieldset__legend")}>
                        Cookies de suivi publicitaire
                      </legend>
                      <div className="fr-form-group">
                        <div className={fr.cx("fr-toggle")}>
                          <input
                            type="checkbox"
                            className={fr.cx("fr-toggle__input")}
                            id="toggle-sea"
                            name="toggle-sea"
                            checked={consent.sea}
                            onChange={() => handleConsentChange("sea")}
                            aria-labelledby="toggle-sea-label"
                          />
                          <label
                            className={fr.cx("fr-toggle__label")}
                            htmlFor="toggle-sea"
                            id="toggle-sea-label"
                            data-fr-checked-label="Activé"
                            data-fr-unchecked-label="Désactivé"
                          >
                            Suivi des campagnes publicitaires
                          </label>
                          <p className={fr.cx("fr-hint-text")}>
                            Ces cookies nous permettent de suivre
                            l&apos;efficacité de nos campagnes publicitaires sur
                            les moteurs de recherche.
                          </p>
                        </div>
                      </div>
                    </fieldset>
                  </div>

                  <div className={fr.cx("fr-mt-2w")}>
                    <fieldset
                      className={fr.cx("fr-fieldset")}
                      id="cookie-heatmap-fieldset"
                    >
                      <legend className={fr.cx("fr-fieldset__legend")}>
                        Carte des chaleurs Matomo
                      </legend>
                      <div className="fr-form-group">
                        <div className={fr.cx("fr-toggle")}>
                          <input
                            type="checkbox"
                            className={fr.cx("fr-toggle__input")}
                            id="toggle-heatmap"
                            name="toggle-heatmap"
                            checked={consent.matomoHeatmap}
                            onChange={() =>
                              handleConsentChange("matomoHeatmap")
                            }
                            aria-labelledby="toggle-heatmap-label"
                          />
                          <label
                            className={fr.cx("fr-toggle__label")}
                            htmlFor="toggle-heatmap"
                            id="toggle-heatmap-label"
                            data-fr-checked-label="Activé"
                            data-fr-unchecked-label="Désactivé"
                          >
                            Carte des chaleurs
                          </label>
                          <p className={fr.cx("fr-hint-text")}>
                            Cette fonctionnalité nous permet de visualiser
                            comment les utilisateurs interagissent avec notre
                            site (clics, mouvements de souris) pour améliorer
                            l&apos;expérience utilisateur.
                          </p>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div className={`${fr.cx("fr-modal__footer")} ${modalFooter}`}>
                  <div className={responsiveButtonsContainer}>
                    <div className={responsiveButton}>
                      <Button
                        onClick={handleRejectAll}
                        priority="tertiary"
                        className={responsiveButton}
                        aria-label="Refuser tous les cookies"
                      >
                        Tout refuser
                      </Button>
                    </div>
                    <div className={responsiveButton}>
                      <Button
                        onClick={handleAcceptAll}
                        priority="secondary"
                        className={responsiveButton}
                        aria-label="Accepter tous les cookies"
                      >
                        Tout accepter
                      </Button>
                    </div>
                    <div className={responsiveButton}>
                      <Button
                        onClick={handleSaveSettings}
                        priority="primary"
                        className={responsiveButton}
                        aria-label="Enregistrer les paramètres des cookies"
                      >
                        Enregistrer
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Manage Cookies Button (fixed at the bottom) */}
      {!isWidgetPage && !showBanner && (
        <div className={manageButton}>
          <Button
            ref={manageButtonRef}
            size="small"
            priority="tertiary"
            onClick={openModal}
            iconId="fr-icon-settings-5-line"
            nativeButtonProps={{
              title: "Ouvrir les paramètres des cookies",
              "aria-label": "Ouvrir les paramètres des cookies",
            }}
          >
            <span className={fr.cx("fr-sr-only")}>Gérer les cookies</span>
          </Button>
        </div>
      )}
    </>
  );
};
