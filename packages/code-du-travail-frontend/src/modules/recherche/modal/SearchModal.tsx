"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { css } from "@styled-system/css";
import { SearchResult } from "./types";
import { ModalSearch, ModalSearchHandle } from "./ModalSearch";
import { SearchResults } from "./SearchResults";
import { useEffect, useRef, useState } from "react";
import { HintList } from "./HintList";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const modalSearchRef = useRef<ModalSearchHandle>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Petit délai pour permettre au DOM de se rendre avant d'appliquer l'animation
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10);

      // Focus sur l'input après l'animation
      const focusTimer = setTimeout(() => {
        modalSearchRef.current?.focusInput();
      }, 350);

      return () => {
        clearTimeout(timer);
        clearTimeout(focusTimer);
      };
    } else if (shouldRender) {
      setIsVisible(false);

      // Démontage après l'animation de fermeture
      const unmountTimer = setTimeout(() => {
        setShouldRender(false);

        // Focus sur le bouton rechercher après la fermeture (desktop ou mobile)
        const searchButtonDesktop = document.getElementById(
          "fr-header-search-button-desktop"
        ) as HTMLButtonElement;
        const searchButtonMobile = document.getElementById(
          "fr-header-search-button"
        ) as HTMLButtonElement;

        if (searchButtonDesktop) {
          searchButtonDesktop.focus();
        }
        if (searchButtonMobile) {
          searchButtonMobile.focus();
        }
      }, 300);

      return () => {
        clearTimeout(unmountTimer);
      };
    }
  }, [isOpen, shouldRender]);

  const handleClose = () => {
    onClose();
  };

  if (!shouldRender) return null;

  return (
    <div className={`${overlayContainer} ${isVisible ? overlayVisible : ""}`}>
      <div className={fr.cx("fr-container", "fr-pb-8w", "fr-pt-4w")}>
        <div className={closeButtonContainer}>
          <Button
            iconId="fr-icon-close-line"
            iconPosition="right"
            title="Fermer"
            onClick={handleClose}
            priority="tertiary no outline"
            className={closeButton}
            ref={closeButtonRef}
          >
            Fermer
          </Button>
        </div>

        <ModalSearch ref={modalSearchRef} onClose={handleClose} />

        {results.length === 0 && (
          <HintList
            actualites={[
              {
                id: "1",
                title: "Rupture du contrat en période d'essai par le salarié",
                slug: "/code-du-travail/rupture-contrat-periode-essai",
              },
              {
                id: "2",
                title: "Mise en demeure pour abandon de poste",
                slug: "/themes/mise-en-demeure-abandon-poste",
              },
              {
                id: "3",
                title:
                  "Convocation à un entretien préalable au licenciement pour...",
                slug: "/modeles/convocation-entretien-prealable",
              },
              {
                id: "4",

                title: "Lettre de démission",
                slug: "/modeles/lettre-demission",
              },
            ]}
            suggestions={[
              {
                id: "5",
                title: "Thématique : Congés",
                slug: "/themes/conges",
              },
              {
                id: "6",
                title: "Convention collective : Métallurgie",
                slug: "/convention-collective/metallurgie",
              },
              {
                id: "7",
                title:
                  "Outils : Simuler mon indemnité de rupture conventionnelle",
                slug: "/outils/simulateur-indemnite-rupture",
              },
              {
                id: "8",
                title: "Modèle de lettre de démission",
                slug: "/modeles/lettre-demission-2",
              },
            ]}
          />
        )}

        {results.length > 0 && <SearchResults results={results} />}
      </div>
    </div>
  );
};

const overlayContainer = css({
  position: "absolute",
  backgroundColor: "var(--background-default-grey)",
  width: "100%",
  minHeight: "calc(100vh - var(--header-height))",
  zIndex: 100,
  overflow: "hidden",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  opacity: 0,
  transition: "opacity 0.3s ease, transform 0.3s ease",
});

const overlayVisible = css({
  opacity: 1,
  transform: "translateY(0)",
});

const closeButtonContainer = css({
  position: "absolute",
  top: "1rem",
  right: "1rem",
  zIndex: 10,
});

const closeButton = css({
  _hover: {
    backgroundColor: "var(--background-default-grey-hover)!",
  },
});

const hintText = css({
  color: "var(--text-mention-grey)",
  textAlign: "center",
});
