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
import { ContributionPersonalizedAgreementSearch } from "./ContributionPersonalizedAgreementSearch";
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
// - "selection" : bloc à 3 radios réinitialisé (arrivée externe uniquement).
// - "selected" : résumé de la CC de la page + bouton « Réinitialiser » (arrivée
//   interne, ou après avoir choisi la CC de la page). Le bouton « Réinitialiser »
//   ne bascule pas sur place : il renvoie vers la fiche générique.
type Mode = "selection" | "selected";

export function ContributionAgreement({ contribution, genericInfos }: Props) {
  const { slug, relatedItems } = contribution;
  const { push } = useRouter();
  const agreementTitleRef = useRef<HTMLParagraphElement>(null);
  const personalizeTitleRef = useRef<HTMLParagraphElement>(null);
  const genericSlug = removeCCNumberFromSlug(slug);

  // Le SSR rend toujours l'état résultat ("selected") ; seule une arrivée
  // externe bascule en "selection" après hydratation. La réponse de la CC
  // reste visible dans tous les cas (« Réinitialiser » quitte la page).
  const [mode, setMode] = useState<Mode>("selected");
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
  // pour les actions Matomo émises par le bloc de sélection. Suffixe `/extern` :
  // ce bloc n'apparaît que dans le parcours externe (arrivée sur une page CC
  // depuis l'extérieur), à distinguer du parcours interne de la fiche
  // générique (suffixe `/intern`).
  const trackingActionName = `${buildContributionAgreementPath(genericSlug, {
    num: parseInt(contribution.idcc, 10),
    slug: contribution.ccnSlug,
  })}/extern`;

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
  // supprime la CC mémorisée puis on renvoie vers la fiche générique. Le hash
  // #retour y déclenche le défilement et la mise au focus du bloc de
  // personnalisation ; `scroll: false` laisse ce défilement fluide opérer.
  const resetToGeneric = () => {
    removeAgreementFromLocalStorage();
    push(`/contribution/${genericSlug}#retour`, { scroll: false });
  };

  return (
    <>
      {mode === "selection" ? (
        <ContributionPersonalizedAgreementSearch
          contribution={genericLikeContribution}
          personalizeTitleRef={personalizeTitleRef}
          agreementName={contribution.ccnShortTitle}
          selectedAgreement={selectedAgreement}
          trackingActionName={trackingActionName}
          currentIdcc={contribution.idcc}
          onSameAgreementSelect={() => {
            // La CC choisie est celle de la page : bascule sur place en état
            // résultat (naviguer vers la même URL ne remonterait pas la page).
            setMode("selected");
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
            onClick={resetToGeneric}
            priority="secondary"
            iconId="fr-icon-arrow-go-back-line"
            iconPosition="right"
          >
            Réinitialiser
          </Button>
        </BlueCard>
      )}

      {/* La réponse reste affichée dans tous les cas (arrivée externe comme
          interne) : « Réinitialiser » renvoie vers la fiche générique. */}
      <ContributionAgreementContent
        contribution={contribution}
        relatedItems={relatedItems}
      />
    </>
  );
}
