"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Button from "@codegouvfr/react-dsfr/Button";
import {
  ConsentType,
  DEFAULT_CONSENT,
  getStoredConsent,
  saveConsent,
  initConsent,
} from "../../lib/consent";

export const CookieConsentDSFR = () => {
  const [consent, setConsent] = useState<ConsentType>(DEFAULT_CONSENT);
  const [showBanner, setShowBanner] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();

  // Don't show cookie consent on widget pages
  const isWidgetPage = pathname?.startsWith("/widgets");

  // Open modal
  const openModal = () => {
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
      console.log("No previous consent found, showing banner");
      setShowBanner(true);
      // Don't initialize cookies until user has consented
    } else {
      console.log("Previous consent found, initializing consent");
      // User has already made a choice, initialize consent
      initConsent();
    }
  }, []);

  // Handle accepting all cookies
  const handleAcceptAll = () => {
    const newConsent = { matomo: true, sea: true };
    console.log("User accepted all cookies:", newConsent);
    setConsent(newConsent);
    saveConsent(newConsent);
    setShowBanner(false);
    closeModal();
    localStorage.setItem("cdtn-cookie-consent-given", "true");

    // Initialize consent after user has made a choice
    console.log("Initializing consent after user acceptance");
    initConsent();
  };

  // Handle rejecting all cookies
  const handleRejectAll = () => {
    // Matomo is mandatory, so it's always true
    const newConsent = { matomo: true, sea: false };
    console.log("User rejected optional cookies:", newConsent);
    setConsent(newConsent);
    saveConsent(newConsent);
    setShowBanner(false);
    closeModal();
    localStorage.setItem("cdtn-cookie-consent-given", "true");

    // Initialize consent after user has made a choice
    console.log("Initializing consent after user rejection");
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
          <div className={fr.cx("fr-grid-row")}>
            <div className={fr.cx("fr-col-12")}>
              <p className={fr.cx("fr-mb-1w")}>
                <strong>Ce site utilise des cookies</strong>
              </p>
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
                  "fr-btns-group--inline-reverse"
                )}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  justifyContent: "flex-end",
                }}
              >
                <Button onClick={openModal} priority="tertiary">
                  Personnaliser
                </Button>
                <Button onClick={handleRejectAll}>Tout refuser</Button>
                <Button onClick={handleAcceptAll}>Tout accepter</Button>
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
              <div
                className={fr.cx("fr-modal__body")}
                style={{ maxHeight: "none", overflow: "visible" }}
              >
                <div className={fr.cx("fr-modal__header")}>
                  <button
                    className={fr.cx("fr-btn--close", "fr-btn")}
                    title="Fermer la fenêtre modale"
                    aria-controls="cookie-settings-modal"
                    onClick={closeModal}
                  >
                    Fermer
                  </button>
                </div>
                <div
                  className={fr.cx("fr-modal__content")}
                  style={{ overflow: "visible" }}
                >
                  <div className={fr.cx("fr-modal__title")}>
                    <div
                      className={fr.cx("fr-h3")}
                      id="cookie-settings-modal-title"
                    >
                      Paramètres des cookies
                    </div>
                  </div>

                  <div className={fr.cx("fr-alert", "fr-alert--info")}>
                    <div className={fr.cx("fr-alert__title")}>
                      <div className={fr.cx("fr-text--bold")}>
                        À propos des cookies
                      </div>
                    </div>
                    <p>
                      Les cookies sont des petits fichiers déposés sur votre
                      appareil (ordinateur, smartphone ou tablette) lorsque vous
                      visitez un site web. Ils permettent de collecter des
                      informations sur votre navigation et de vous proposer des
                      services adaptés à votre utilisation.
                    </p>
                  </div>

                  <p className={fr.cx("fr-mt-2w")}>
                    Les cookies de mesure d&apos;audience sont nécessaires au
                    bon fonctionnement du site. Vous pouvez choisir
                    d&apos;accepter ou de refuser les cookies de suivi des
                    campagnes publicitaires. Pour plus d&apos;informations, vous
                    pouvez consulter notre{" "}
                    <a
                      href="/politique-confidentialite"
                      className={fr.cx("fr-link")}
                    >
                      politique de confidentialité
                    </a>
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
                      <div className={fr.cx("fr-toggle")}>
                        <input
                          type="checkbox"
                          className={fr.cx("fr-toggle__input")}
                          id="toggle-audience"
                          name="toggle-audience"
                          checked={true}
                          disabled={true}
                          onChange={() => {}}
                        />
                        <label
                          className={fr.cx("fr-toggle__label")}
                          htmlFor="toggle-audience"
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
                      <div className={fr.cx("fr-toggle")}>
                        <input
                          type="checkbox"
                          className={fr.cx("fr-toggle__input")}
                          id="toggle-sea"
                          name="toggle-sea"
                          checked={consent.sea}
                          onChange={() => handleConsentChange("sea")}
                        />
                        <label
                          className={fr.cx("fr-toggle__label")}
                          htmlFor="toggle-sea"
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
                    </fieldset>
                  </div>
                </div>
                <div className={fr.cx("fr-modal__footer")}>
                  <ul
                    className={fr.cx(
                      "fr-btns-group",
                      "fr-btns-group--right",
                      "fr-btns-group--inline",
                      "fr-btns-group--inline-reverse",
                      "fr-btns-group--inline-lg"
                    )}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "nowrap",
                    }}
                  >
                    <li>
                      <Button onClick={handleSaveSettings}>Enregistrer</Button>
                    </li>
                    <li>
                      <Button onClick={handleRejectAll} priority="tertiary">
                        Tout refuser
                      </Button>
                    </li>
                    <li>
                      <Button onClick={handleAcceptAll} priority="secondary">
                        Tout accepter
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Manage Cookies Button (fixed at the bottom) */}
      {!isWidgetPage && !showBanner && (
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
            onClick={openModal}
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
