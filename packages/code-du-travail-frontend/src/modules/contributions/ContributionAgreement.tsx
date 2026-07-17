"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { useEffect, useRef, useState } from "react";
import { ContributionAgreementContent } from "./ContributionAgreementContent";
import { Contribution } from "./type";
import BlueCard from "../common/BlueCard";
import Button from "@codegouvfr/react-dsfr/Button";
import { removeCCNumberFromSlug } from "../utils/removeCCNumberFromSlug";
import { focusableTitle } from "../common/focusableTitle";
import {
  AGREEMENT_FOCUS_HASH,
  GENERIC_CONTENT_HASH,
  buildContributionAgreementPath,
  isAgreementSupported,
} from "./contributionUtils";
import { isExternalArrival } from "./externalArrival";
import { ContributionGenericAgreementSearch } from "./ContributionGenericAgreementSearch";
import { useContributionTracking } from "./tracking";
import { useRouter } from "next/navigation";
import {
  removeAgreementFromLocalStorage,
  saveAgreementToLocalStorage,
} from "../utils/useLocalStorage";
import { Agreement } from "src/modules/outils/indemnite-depart/types";
// Import de type uniquement : queries.ts embarque le client Elasticsearch
// (serveur), il ne doit pas entrer dans le bundle client.
import type { GenericContributionInfos } from "./queries";

// Ré-export de compatibilité : la constante vit désormais dans
// contributionUtils pour éviter un cycle d'import avec externalArrival.
export { AGREEMENT_FOCUS_HASH } from "./contributionUtils";

type Props = {
  contribution: Contribution;
  // Infos de la fiche générique frère (le document conventionnel ne porte pas
  // ccSupported/ccUnextended). Absent (échec du fetch) : la réinitialisation
  // est désactivée et la page garde son comportement historique.
  genericInfos?: GenericContributionInfos;
};

// Deux présentations du bloc de personnalisation sur une page CC :
// - "selection" : bloc à 3 radios réinitialisé (arrivée externe, ou après un
//   clic sur « Réinitialiser »).
// - "selected" : résumé de la CC de la page + bouton « Réinitialiser » (arrivée
//   interne, ou après avoir choisi la CC de la page).
// La visibilité de la réponse est portée séparément par `hideContent`.
type Mode = "selection" | "selected";

export function ContributionAgreement({ contribution, genericInfos }: Props) {
  const { slug, relatedItems } = contribution;
  const { push } = useRouter();
  const agreementTitleRef = useRef<HTMLParagraphElement>(null);
  const personalizeTitleRef = useRef<HTMLParagraphElement>(null);
  const genericSlug = removeCCNumberFromSlug(slug);

  // Le SSR rend toujours l'état résultat ("selected") ; seule une arrivée
  // externe bascule en "selection" après hydratation. À l'arrivée (externe ou
  // interne) la réponse de la CC reste visible ; seul un clic explicite sur
  // « Réinitialiser » la masque (cf. `hideContent`).
  const [mode, setMode] = useState<Mode>("selected");
  // Masque la réponse UNIQUEMENT après un clic sur « Réinitialiser » : l'usager
  // a explicitement demandé à repartir de zéro. Une arrivée externe (Google)
  // garde au contraire la réponse affichée.
  const [hideContent, setHideContent] = useState(false);
  // Sélection locale au bloc : jamais initialisée depuis le localStorage, la
  // réinitialisation devant ignorer un choix antérieur (même pour cette CC).
  const [selectedAgreement, setSelectedAgreement] = useState<
    Agreement | undefined
  >();

  const {
    emitAgreementTreatedEvent,
    emitAgreementUntreatedEvent,
    emitDisplayAgreementContent,
    emitDisplayGenericContent,
    emitDisplayGeneralContent,
  } = useContributionTracking();

  // Chemin réel de la page (arbre classique `{num}-{slug}` et arbre « congés »)
  // pour les actions Matomo émises par le bloc de sélection.
  const trackingActionName = buildContributionAgreementPath(genericSlug, {
    num: parseInt(contribution.idcc, 10),
    slug: contribution.ccnSlug,
  });

  // Fiche « générique » hybride pour le bloc de sélection : il raisonne sur la
  // fiche générique frère (slug de navigation + classification des CC).
  const genericLikeContribution: Contribution = {
    ...contribution,
    slug: genericSlug,
    ccSupported: genericInfos?.ccSupported,
    ccUnextended: genericInfos?.ccUnextended,
    isNoCDT: genericInfos?.type === "generic-no-cdt",
    messageBlockGenericNoCDT: genericInfos?.messageBlockGenericNoCDT,
  };

  useEffect(() => {
    if (genericInfos && isExternalArrival()) {
      // Réinitialisation (#7361) : choix explicite requis avant d'afficher la
      // réponse personnalisée.
      setMode("selection");
    }
    // Détection à effectuer une seule fois, au montage.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const focusAgreementTitle = () =>
    setTimeout(() => {
      agreementTitleRef.current?.scrollIntoView({ behavior: "smooth" });
      // preventScroll : laisse le défilement fluide ci-dessus se dérouler sans
      // que la mise au focus ne le court-circuite par un saut instantané.
      agreementTitleRef.current?.focus({ preventScroll: true });
    }, 100);

  useEffect(() => {
    if (window.location.hash !== AGREEMENT_FOCUS_HASH) return;
    const timer = focusAgreementTitle();
    return () => clearTimeout(timer);
  }, []);

  // Réinitialisation à la demande de l'usager (bouton « Réinitialiser ») : on
  // repasse au bloc à 3 radios vierge (aucune CC pré-cochée), on masque la
  // réponse, puis on met le focus sur le titre du bloc de sélection.
  const resetToSelection = () => {
    setSelectedAgreement(undefined);
    removeAgreementFromLocalStorage();
    setMode("selection");
    setHideContent(true);
    setTimeout(() => {
      personalizeTitleRef.current?.scrollIntoView({ behavior: "smooth" });
      personalizeTitleRef.current?.focus({ preventScroll: true });
    }, 100);
  };

  return (
    <>
      {mode === "selection" ? (
        <ContributionGenericAgreementSearch
          contribution={genericLikeContribution}
          personalizeTitleRef={personalizeTitleRef}
          selectedAgreement={selectedAgreement}
          trackingActionName={trackingActionName}
          currentIdcc={contribution.idcc}
          onSameAgreementSelect={() => {
            // La CC choisie est celle de la page : bascule sur place en état
            // résultat (naviguer vers la même URL ne remonterait pas la page).
            // On réaffiche la réponse (masquée si on venait de « Réinitialiser »).
            setMode("selected");
            setHideContent(false);
            focusAgreementTitle();
          }}
          onAgreementSelect={(agreement) => {
            setSelectedAgreement(agreement);
            if (!agreement) {
              // « Je ne souhaite pas renseigner… » ou réinitialisation du
              // formulaire : même effet que sur la fiche générique.
              removeAgreementFromLocalStorage();
              return;
            }
            saveAgreementToLocalStorage(agreement);
            if (isAgreementSupported(genericLikeContribution, agreement)) {
              emitAgreementTreatedEvent(agreement.num);
            } else {
              emitAgreementUntreatedEvent(agreement.num);
            }
          }}
          onDisplayClick={(isAgreementSelected) => {
            if (isAgreementSelected) {
              // CC valide : la bascule sur place (même CC) ou la navigation
              // vers l'autre page CC est gérée par le bloc.
              emitDisplayAgreementContent(trackingActionName);
              return;
            }
            // Option « sans CC » ou CC non traitée : la réponse Code du
            // travail vit sur la fiche générique — on y navigue avec le hash
            // qui déclenche l'affichage direct du contenu, choix conservé.
            if (selectedAgreement) {
              emitDisplayGeneralContent(trackingActionName);
            } else {
              emitDisplayGenericContent(trackingActionName);
            }
            push(`/contribution/${genericSlug}${GENERIC_CONTENT_HASH}`, {
              scroll: false,
            });
          }}
        />
      ) : (
        <BlueCard>
          <p
            ref={agreementTitleRef}
            className={`${fr.cx("fr-h3", "fr-mt-1w")} ${focusableTitle}`}
            tabIndex={-1}
          >
            Réponse personnalisée pour la convention collective
          </p>
          <div className={fr.cx("fr-card", "fr-card--sm", "fr-mt-2w")}>
            <div className={fr.cx("fr-card__body")}>
              <div className={fr.cx("fr-card__content", "fr-p-2w")}>
                <p className={`${fr.cx("fr-card__title")} fw_normal!`}>
                  {contribution.ccnShortTitle} (IDCC {contribution.idcc})
                </p>
              </div>
            </div>
          </div>
          <Button
            title="Réinitialiser la convention collective sélectionnée"
            className={fr.cx("fr-mt-2w")}
            onClick={resetToSelection}
            priority="secondary"
            iconId="fr-icon-arrow-go-back-line"
            iconPosition="right"
          >
            Réinitialiser
          </Button>
        </BlueCard>
      )}

      {/* La réponse reste affichée à l'arrivée (externe comme interne) ; elle
          n'est masquée qu'après un clic sur « Réinitialiser » (`hideContent`).
          Elle demeure dans le DOM (SEO) via `fr-hidden`. */}
      <div className={hideContent ? fr.cx("fr-hidden") : undefined}>
        <ContributionAgreementContent
          contribution={contribution}
          relatedItems={relatedItems}
        />
      </div>
    </>
  );
}
