"use client";
import React, { useCallback, useRef, useState, useEffect } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { useContributionTracking } from "./tracking";
import {
  buildContributionAgreementPath,
  GENERIC_CONTENT_HASH,
  isAgreementSupported,
  isAgreementValid,
} from "./contributionUtils";
import { useRouter } from "next/navigation";
import { ContributionGenericContent } from "./ContributionGenericContent";
import { ContributionGenericContentIntroFirst } from "./ContributionGenericContentIntroFirst";
import { ContributionAgreementDeclinations } from "./ContributionAgreementDeclinations";
import { AgreementDeclination, Contribution } from "./type";
import {
  useLocalStorageForAgreementOnPageLoad,
  getAgreementFromLocalStorage,
} from "../utils/useLocalStorage";
import { ContributionGenericAgreementSearch } from "./ContributionGenericAgreementSearch";
import {
  Agreement,
  AgreementRoute,
} from "src/modules/outils/indemnite-depart/types";
import type { ExploreTheme } from "./explore-themes/type";
import {
  CcBlockProvider,
  CcBlockSlot,
  useCcPositionVariant,
} from "./ccPosition";

type Props = {
  contribution: Contribution;
  agreementDeclinations: AgreementDeclination[];
  // Sous-thèmes mis en avant (#7455). Vide : la rubrique est masquée.
  exploreThemes?: ExploreTheme[];
};

export function ContributionGeneric({
  contribution,
  agreementDeclinations,
  exploreThemes = [],
}: Props) {
  const router = useRouter();
  const [hash, setHash] = useState("");
  const personalizeTitleRef = useRef<HTMLParagraphElement>(null);
  const getTitle = () => `/contribution/${slug}`;
  const { slug, isNoCDT, relatedItems } = contribution;

  const [displayGeneric, setDisplayGeneric] = useState(false);
  const [defaultRoute, setDefaultRoute] = useState<AgreementRoute>();

  // A/B test « emplacement du bloc CC » (#7481). Témoin tant que la variante
  // n'est pas connue : la page ne change qu'une fois Matomo prononcé.
  const variant = useCcPositionVariant(slug);
  // Sans réponse Code du travail, le contenu (et ses emplacements) n'existe
  // pas : le bloc reste en tête quelle que soit la variante.
  const position = isNoCDT ? "top" : variant.position;
  const isBlockInContent = position !== "top";
  // Variante C : introduction puis bloc CC en tête de page, pleine largeur.
  const GenericContent =
    position === "after-intro"
      ? ContributionGenericContentIntroFirst
      : ContributionGenericContent;

  // Garde « une fois par page » partagée par toutes les instances du bloc :
  // en variante D, chaque accordéon héberge la sienne, mais `view_bloc_cc`,
  // `bloc_cc_visible` et les marches « une fois par page » du funnel doivent
  // rester comptés une seule fois par visite.
  const pageOnceRef = useRef(new Set<string>());
  const pageOnce = useCallback((key: string, emit: () => void) => {
    if (pageOnceRef.current.has(key)) return;
    pageOnceRef.current.add(key);
    emit();
  }, []);

  const [selectedAgreement, setSelectedAgreement] =
    useLocalStorageForAgreementOnPageLoad();
  const {
    emitAgreementTreatedEvent,
    emitAgreementUntreatedEvent,
    emitDisplayAgreementContent,
    emitDisplayGenericContent,
    emitDisplayGeneralContent,
  } = useContributionTracking();
  const genericTitleRef = useRef<HTMLDivElement>(null);

  const scrollToTitle = () => {
    setTimeout(() => {
      genericTitleRef?.current?.scrollIntoView({ behavior: "smooth" });
      genericTitleRef?.current?.focus();
    }, 100);
  };

  useEffect(() => {
    setHash(window.location.hash);
  }, []);

  useEffect(() => {
    if (window.location.hash !== GENERIC_CONTENT_HASH) return;
    // Arrivée depuis une page CC (option « je ne souhaite pas renseigner » ou
    // CC non traitée) : on affiche directement la réponse Code du travail en
    // conservant le choix de l'usager coché. Avec une CC en stockage (non
    // traitée), l'effet defaultAgreement du formulaire pré-coche la première
    // option et préremplit la CC ; sans CC, on pré-coche la dernière option.

    setDisplayGeneric(true);
    if (!getAgreementFromLocalStorage()) {
      setDefaultRoute("no-agreement");
    }
    scrollToTitle();
  }, []);

  useEffect(() => {
    if (hash === "#retour") {
      setTimeout(() => {
        // Variante D : le bloc vit dans des accordéons fermés, on se replie
        // sur le titre de la réponse Code du travail.
        const target = personalizeTitleRef.current ?? genericTitleRef.current;
        target?.scrollIntoView({ behavior: "smooth" });
        target?.focus();
      }, 100);
    }
  }, [hash]);

  // Auto-redirection : arriver sur la fiche générique avec une CC mémorisée et
  // traitée renvoie directement vers la page CC correspondante (`replace` :
  // la générique ne s'empile pas dans l'historique). Pas de boucle possible :
  // « Réinitialiser » (page CC) efface la CC avant de renvoyer ici, et les
  // hash #retour / #cdt expriment une demande explicite de la fiche générique
  // (retour au formulaire / réponse Code du travail) : on ne redirige pas.
  //
  // La décision est prise pendant le rendu (et non dans l'effet) parce que le
  // bloc de choix de CC en a besoin AVANT d'émettre `view_bloc_cc` : React vide
  // les effets des enfants avant ceux du parent, un effet ici arriverait trop
  // tard et le dénominateur du funnel compterait ces visites redirigées, qui
  // ne verront jamais le bloc (cf. #7472). Côté serveur `window` n'existe pas :
  // la valeur y est `undefined`, elle n'influence aucun balisage — seulement le
  // tracking — donc pas de divergence d'hydratation.
  const [redirectPath] = useState<string | undefined>(() => {
    if (typeof window === "undefined") return undefined;
    if (window.location.hash === "#retour") return undefined;
    if (window.location.hash === GENERIC_CONTENT_HASH) return undefined;
    const storedAgreement = getAgreementFromLocalStorage();
    if (!storedAgreement || !isAgreementValid(contribution, storedAgreement))
      return undefined;
    return buildContributionAgreementPath(slug, storedAgreement);
  });

  useEffect(() => {
    if (redirectPath) router.replace(redirectPath);
    // Détection à effectuer une seule fois, au montage.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAgreementSelect = (agreement?: Agreement) => {
    setSelectedAgreement(agreement);
    // Sélectionner une CC masque le Code du travail ; il est réaffiché au
    // besoin via « Afficher les informations ».
    setDisplayGeneric(false);
    if (!agreement) return;

    if (isAgreementSupported(contribution, agreement)) {
      emitAgreementTreatedEvent(agreement.num);
    } else {
      emitAgreementUntreatedEvent(agreement.num);
    }
  };

  const onDisplayClick = (isAgreementSelected: boolean) => {
    setDisplayGeneric(!displayGeneric);
    if (!isAgreementSelected) {
      setDisplayGeneric(true);
      scrollToTitle();
      if (selectedAgreement) {
        emitDisplayGeneralContent(getTitle());
      } else {
        // Aucune CC sélectionnée : l'usager affiche le Code du travail
        // (dernière option « Je ne souhaite pas renseigner… » ou entreprise
        // sans convention).
        emitDisplayGenericContent(getTitle());
      }
    } else {
      emitDisplayAgreementContent(getTitle());
    }
  };

  // Une instance du bloc de choix de CC. En tête de page (A, B) elle est
  // unique et porte le titre ciblé par `#retour`. Dans le contenu (C, D) les
  // instances sont indépendantes : chacune tient son propre formulaire (option
  // cochée, recherche, erreurs) et sa propre CC retenue, cf. `InContentCcBlock`.
  const renderBlock = (instanceId?: string) =>
    instanceId === undefined && !isBlockInContent ? (
      <ContributionGenericAgreementSearch
        personalizeTitleRef={personalizeTitleRef}
        contribution={contribution}
        onAgreementSelect={onAgreementSelect}
        onDisplayClick={onDisplayClick}
        selectedAgreement={selectedAgreement}
        trackingActionName={getTitle()}
        defaultRoute={defaultRoute}
        isRedirecting={!!redirectPath}
        showNoAgreementOption={variant.showNoAgreementOption && !isNoCDT}
        pageOnce={pageOnce}
      />
    ) : (
      <InContentCcBlock
        key={instanceId ?? "after-intro"}
        instanceId={instanceId ?? "intro"}
        // En D le bloc est serré dans un accordéon ; en C il occupe la place
        // du bloc témoin, avec les marges de celui-ci.
        className={
          instanceId === undefined ? undefined : fr.cx("fr-mt-3w", "fr-mb-3w")
        }
        compactTitle={instanceId !== undefined}
        // Variante C : instance unique, elle reçoit le titre ciblé par #retour.
        personalizeTitleRef={
          instanceId === undefined ? personalizeTitleRef : undefined
        }
        contribution={contribution}
        onAgreementSelect={onAgreementSelect}
        onDisplayClick={onDisplayClick}
        trackingActionName={getTitle()}
        isRedirecting={!!redirectPath}
        pageOnce={pageOnce}
      />
    );

  return (
    <CcBlockProvider value={{ position, renderBlock }}>
      <CcBlockSlot position="top" />

      {/* Contribution sans réponse Code du travail : le bloc de contenu
          générique n'est pas rendu, la liste des déclinaisons par CC est donc
          affichée directement sous le formulaire de sélection. Elle ferme alors
          la page : `fr-mb-6w` reprend la marge basse que porte habituellement
          le bloc générique, sans quoi l'accordéon colle au pied de page.
          Le `h2` de la réponse Code du travail étant absent, l'accordéon suit
          directement le `h1` : son titre passe en `h2` pour que la hiérarchie
          des titres reste valide (#7458). */}
      {isNoCDT && (
        <ContributionAgreementDeclinations
          items={agreementDeclinations}
          titleAs="h2"
          className={fr.cx("fr-mt-6w", "fr-mb-6w")}
        />
      )}

      {/* Historiquement, retenir une CC prise en charge démonte la réponse
          Code du travail jusqu'au clic sur « Afficher les informations ».
          Quand la réponse est affichée par défaut (B, C, D), elle reste
          montée : en C et D le bloc CC vit dedans, le démonter ferait
          disparaître le bloc avec la sélection qui vient d'être faite. */}
      {!isNoCDT &&
        (variant.contentByDefault ||
          !isAgreementValid(contribution, selectedAgreement)) && (
          <GenericContent
            ref={genericTitleRef}
            contribution={contribution}
            relatedItems={relatedItems}
            // B, C, D : la réponse Code du travail est visible sans action.
            displayGeneric={displayGeneric || variant.contentByDefault}
            agreementDeclinations={agreementDeclinations}
            exploreThemes={exploreThemes}
            alertText={
              selectedAgreement &&
              !isAgreementSupported(contribution, selectedAgreement) && (
                <p>
                  <strong>
                    Cette réponse correspond à ce que prévoit le code du
                    travail, elle ne tient pas compte des spécificités de la{" "}
                    {selectedAgreement.shortTitle}
                  </strong>
                </p>
              )
            }
          />
        )}
    </CcBlockProvider>
  );
}

type InContentCcBlockProps = {
  instanceId: string;
  className?: string;
  compactTitle?: boolean;
  personalizeTitleRef?: React.RefObject<HTMLParagraphElement | null>;
  contribution: Contribution;
  onAgreementSelect: (agreement?: Agreement) => void;
  onDisplayClick: (isAgreementSelected: boolean) => void;
  trackingActionName: string;
  isRedirecting: boolean;
  pageOnce: (key: string, emit: () => void) => void;
};

// Bloc CC inséré dans le contenu (variantes C et D de #7481). La CC retenue y
// est locale : deux instances (une par accordéon en D) ne se préremplissent
// pas l'une l'autre. La page reste prévenue de chaque sélection (stockage
// local, alerte « CC non traitée », events) via `onAgreementSelect`.
function InContentCcBlock({
  instanceId,
  className,
  compactTitle,
  personalizeTitleRef,
  contribution,
  onAgreementSelect,
  onDisplayClick,
  trackingActionName,
  isRedirecting,
  pageOnce,
}: InContentCcBlockProps) {
  const [localAgreement, setLocalAgreement] = useState<Agreement>();
  const localTitleRef = useRef<HTMLParagraphElement>(null);
  return (
    <ContributionGenericAgreementSearch
      personalizeTitleRef={personalizeTitleRef ?? localTitleRef}
      contribution={contribution}
      onAgreementSelect={(agreement) => {
        setLocalAgreement(agreement);
        onAgreementSelect(agreement);
      }}
      onDisplayClick={onDisplayClick}
      selectedAgreement={localAgreement}
      trackingActionName={trackingActionName}
      isRedirecting={isRedirecting}
      showNoAgreementOption={false}
      pageOnce={pageOnce}
      instanceId={instanceId}
      className={className}
      compactTitle={compactTitle}
    />
  );
}
