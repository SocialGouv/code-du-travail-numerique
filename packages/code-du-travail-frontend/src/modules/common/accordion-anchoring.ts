/**
 * Script côté client pour gérer l'ancrage des accordéons
 * À inclure optionnellement si la fonctionnalité d'ancrage est nécessaire
 */

export const handleAccordionAnchoring = () => {
  if (typeof window === "undefined") return;

  const handleHashChange = () => {
    const hash = window.location.hash?.substring(1);
    if (!hash) return;

    const targetElement = document.getElementById(hash);
    if (!targetElement) return;

    // Vérifier si c'est un accordéon DSFR
    const accordionButton = targetElement.querySelector(
      "button[aria-expanded]"
    ) as HTMLButtonElement;

    if (accordionButton) {
      // Ouvrir l'accordéon s'il est fermé
      if (accordionButton.getAttribute("aria-expanded") === "false") {
        accordionButton.click();
      }

      // Défiler vers l'élément après l'ouverture
      setTimeout(() => {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 150);
    }
  };

  // Gérer l'ancrage initial au chargement de la page
  if (window.location.hash) {
    // Attendre que le DOM soit complètement chargé
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", handleHashChange);
    } else {
      // Le DOM est déjà chargé
      setTimeout(handleHashChange, 100);
    }
  }

  // Écouter les changements de hash
  window.addEventListener("hashchange", handleHashChange);

  // Fonction de nettoyage
  return () => {
    window.removeEventListener("hashchange", handleHashChange);
    document.removeEventListener("DOMContentLoaded", handleHashChange);
  };
};
