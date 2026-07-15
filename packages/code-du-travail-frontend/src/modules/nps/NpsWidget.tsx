"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen";
import { npsModal, NpsModalView } from "./NpsModal";
import { NpsHand } from "./NpsHand";
import { NpsTrigger } from "./constants";
import {
  hasAnsweredNps,
  isNpsHandDismissed,
  markNpsAnswered,
  markNpsHandDismissed,
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
  // Modale déjà ouverte : évite qu'un nouveau déclencheur (ex. exit-intent alors
  // que la main a déjà ouvert la modale) ne la ré-ouvre / ré-émette l'affichage.
  const openRef = useRef(false);

  // La main dépend du cookie/localStorage : on ne la rend qu'après montage pour
  // éviter tout écart d'hydratation (le serveur ne connaît pas ces valeurs).
  const [mounted, setMounted] = useState(false);
  const [handHidden, setHandHidden] = useState(false);
  useEffect(() => {
    setMounted(true);
    if (hasAnsweredNps() || isNpsHandDismissed()) setHandHidden(true);
  }, []);

  const { trackDisplayed, trackRefusal } = useNpsEvents();

  const isModalOpen = useIsModalOpen(npsModal, {
    onConceal: () => {
      openRef.current = false;
      // Fermeture sans validation (bouton « Fermer », Échap, overlay) = refus.
      if (!submittedRef.current && triggerRef.current) {
        trackRefusal(triggerRef.current, pathname);
        // Fermer la modale ouverte par la main sans noter → la main disparaît
        // définitivement.
        if (triggerRef.current === NpsTrigger.MAIN) {
          markNpsHandDismissed();
          setHandHidden(true);
        }
      }
      setValue(null);
    },
  });

  // Ouverture « cœur » : prépare l'état, ouvre la modale, émet l'affichage.
  // Les gardes (cookie/session) sont à la charge de l'appelant.
  const openModal = useCallback(
    (trigger: NpsTrigger) => {
      // Modale déjà ouverte : ne pas ré-ouvrir ni ré-émettre `nps_popin_displayed`
      // (ex. exit-intent qui se redéclenche alors que la modale est visible).
      if (openRef.current) return;
      openRef.current = true;
      triggerRef.current = trigger;
      submittedRef.current = false;
      setValue(null);
      npsModal.open();
      trackDisplayed(trigger, pathname);
    },
    [pathname, trackDisplayed]
  );

  // Déclencheurs automatiques (exit-intent, Télécharger, Copier) : bloqués si
  // déjà répondu (cookie 2 semaines) ou déjà affichés dans la session (1×/session).
  const openFromAuto = useCallback(
    (trigger: NpsTrigger) => {
      if (hasAnsweredNps() || wasNpsShownThisSession()) return;
      markNpsShownThisSession();
      openModal(trigger);
    },
    [openModal]
  );

  useNpsTriggers(openFromAuto);

  // Clic volontaire sur la main : non soumis à la règle « 1×/session ». Garde de
  // sécurité sur le cookie (la main n'est de toute façon pas rendue si répondu).
  const openFromHand = useCallback(() => {
    if (hasAnsweredNps()) return;
    openModal(NpsTrigger.MAIN);
  }, [openModal]);

  const onSubmit = useCallback(() => {
    if (value === null || submittedRef.current) return;
    submittedRef.current = true;
    // Cookie posé : plus de sollicitation pendant 2 semaines. La main disparaît.
    markNpsAnswered();
    setHandHidden(true);
    // Envoi du score via l'API proxy (pas du tracking Matomo, cf. sendNpsScore).
    void sendNpsScore({
      trigger: triggerRef.current ?? NpsTrigger.EXIT_INTENT,
      pagePath: pathname,
      score: value,
    });
    // La modale se ferme via DSFR (bouton footer). Pas de message de
    // confirmation (décision produit).
  }, [value, pathname]);

  return (
    <>
      <NpsModalView
        value={value}
        onSelect={setValue}
        onSubmit={onSubmit}
        questionId={questionId}
      />
      {mounted && !handHidden && (
        <NpsHand onOpen={openFromHand} expanded={isModalOpen} />
      )}
    </>
  );
};
