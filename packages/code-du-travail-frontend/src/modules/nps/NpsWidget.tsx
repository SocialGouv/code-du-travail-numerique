"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen";
import { npsModal, NpsModalView } from "./NpsModal";
import { NpsHand } from "./NpsHand";
import { NpsTrigger } from "./constants";
import {
  hasAnsweredNps,
  hasClosedNps,
  hasOptedOutNps,
  markNpsAnswered,
  markNpsClosed,
  markNpsOptedOut,
  markNpsShownThisSession,
  wasNpsShownThisSession,
} from "./persistence";
import { useNpsEvents } from "./tracking";
import { sendNpsScore } from "./sendNpsScore";
import { useNpsTriggers } from "./useNpsTriggers";

// Orchestrateur du widget NPS, monté globalement (cf. DefaultLayout). Gère
// l'état de la note, l'ouverture (déclencheurs automatiques + main volontaire),
// la persistance anti-resollicitation et l'émission des 3 events Matomo.
export const NpsWidget = () => {
  const pathname = usePathname() || "";
  const questionId = useId();
  const [value, setValue] = useState<number | null>(null);
  // Déclencheur ayant ouvert la modale (relayé dans chaque event).
  const triggerRef = useRef<NpsTrigger | null>(null);
  // Distingue une fermeture après validation d'une fermeture « refus » : évite
  // d'émettre `nps_popin_refusal` quand on ferme nous-mêmes après validation.
  const submittedRef = useRef(false);
  // Idem pour l'opt-out (« Ne pas répondre ») : cet event est émis par onOptOut,
  // on ne veut pas que onConceal émette en plus un refus « simple ».
  const optedOutRef = useRef(false);
  // Modale déjà ouverte : évite qu'un nouveau déclencheur (ex. exit-intent alors
  // que la main a déjà ouvert la modale) ne la ré-ouvre / ré-émette l'affichage.
  const openRef = useRef(false);
  // Element that had focus when the modal opened (the hand, or the
  // "Télécharger"/"Copier" button). The modal is opened programmatically, so
  // DSFR has no visible opener to return focus to: on close it targets
  // react-dsfr's hidden control button and focus falls back to <body>
  // (WCAG 2.4.3). We restore it ourselves.
  const openerRef = useRef<HTMLElement | null>(null);

  // La main dépend des cookies : on ne la rend qu'après montage pour éviter
  // tout écart d'hydratation (le serveur ne connaît pas ces valeurs).
  const [mounted, setMounted] = useState(false);
  const [handHidden, setHandHidden] = useState(false);
  useEffect(() => {
    setMounted(true);
    if (hasAnsweredNps() || hasOptedOutNps()) setHandHidden(true);
  }, []);

  const { trackDisplayed, trackRefusal, trackOptOut } = useNpsEvents();

  const isModalOpen = useIsModalOpen(npsModal, {
    onConceal: () => {
      openRef.current = false;
      // Fermeture « simple » (bouton « Fermer », Échap, overlay), sans validation
      // ni opt-out = refus. On coupe les déclencheurs automatiques pendant 7 jours
      // (cookie), mais la main reste affichée : l'usager peut encore répondre plus
      // tard ; seul « Ne pas répondre » la fait disparaître (cf. onOptOut).
      if (!submittedRef.current && !optedOutRef.current && triggerRef.current) {
        trackRefusal(triggerRef.current, pathname);
        markNpsClosed();
      }
      setValue(null);
      // Runs after DSFR's own (failed) focus move. Skipped when the opener is
      // gone (the hand is removed after an answer or an opt-out) or when the
      // user already moved focus elsewhere.
      const opener = openerRef.current;
      openerRef.current = null;
      setTimeout(() => {
        const active = document.activeElement;
        if (opener?.isConnected && (!active || active === document.body)) {
          opener.focus();
        }
      }, 0);
    },
  });

  // Ouverture « cœur » : prépare l'état, ouvre la modale, émet l'affichage.
  // Les gardes (cookie/session) sont à la charge de l'appelant.
  const openModal = (trigger: NpsTrigger, opener?: HTMLElement) => {
    // Modale déjà ouverte : ne pas ré-ouvrir ni ré-émettre `nps_popin_displayed`
    // (ex. exit-intent qui se redéclenche alors que la modale est visible).
    if (openRef.current) return;
    openRef.current = true;
    const active = document.activeElement;
    openerRef.current =
      opener ??
      (active instanceof HTMLElement && active !== document.body
        ? active
        : null);
    triggerRef.current = trigger;
    submittedRef.current = false;
    optedOutRef.current = false;
    setValue(null);
    npsModal.open();
    trackDisplayed(trigger, pathname);
  };

  // Déclencheurs automatiques (exit-intent, Télécharger, Copier) : bloqués si
  // déjà répondu (cookie 2 semaines), opt-out (cookie 7 jours), fermeture simple
  // (cookie 7 jours, main conservée) ou déjà affichés dans la session (1×/session).
  const openFromAuto = (trigger: NpsTrigger) => {
    if (
      hasAnsweredNps() ||
      hasOptedOutNps() ||
      hasClosedNps() ||
      wasNpsShownThisSession()
    )
      return;
    markNpsShownThisSession();
    openModal(trigger);
  };

  useNpsTriggers(openFromAuto);

  // Clic volontaire sur la main : non soumis à la règle « 1×/session ». Garde de
  // sécurité sur les cookies : la main n'est normalement pas rendue si répondu ou
  // opt-out, mais un onglet resté ouvert peut l'afficher encore alors que le
  // cookie a été posé depuis un autre onglet → on la masque au clic.
  const openFromHand = (hand: HTMLButtonElement) => {
    if (hasAnsweredNps() || hasOptedOutNps()) {
      setHandHidden(true);
      return;
    }
    openModal(NpsTrigger.MAIN, hand);
  };

  const onSubmit = () => {
    if (value === null || submittedRef.current) return;
    submittedRef.current = true;
    // Cookie posé : plus de sollicitation pendant 2 semaines. La main disparaît.
    markNpsAnswered();
    setHandHidden(true);
    // Envoi du score via l'API proxy (pas du tracking Matomo, cf. sendNpsScore).
    void sendNpsScore({
      pagePath: pathname,
      score: value,
    });
    // La modale se ferme via DSFR (bouton footer). Pas de message de
    // confirmation (décision produit).
  };

  // « Ne pas répondre » : refus explicite. Émet l'opt-out, coupe toute
  // sollicitation NPS pendant 7 jours, tous onglets confondus (cookie — main +
  // déclencheurs auto), et fait disparaître la main. La modale se ferme via DSFR
  // (aria-controls du bouton footer) ; `optedOutRef` évite un double event dans
  // onConceal.
  const onOptOut = () => {
    optedOutRef.current = true;
    if (triggerRef.current) trackOptOut(triggerRef.current, pathname);
    markNpsOptedOut();
    setHandHidden(true);
  };

  return (
    <>
      <NpsModalView
        value={value}
        onSelect={setValue}
        onSubmit={onSubmit}
        onOptOut={onOptOut}
        questionId={questionId}
      />
      {mounted && !handHidden && (
        <NpsHand onOpen={openFromHand} expanded={isModalOpen} />
      )}
    </>
  );
};
