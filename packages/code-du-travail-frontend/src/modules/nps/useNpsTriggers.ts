"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { NpsTrigger } from "./constants";
import { NPS_TRIGGER_EVENT, NpsTriggerEventDetail } from "./triggerBus";

// Les simulateurs sont exclus des déclencheurs automatiques : la spec y prévoit
// la « main » comme unique déclencheur, hors périmètre de cette itération. Le
// NPS ne s'affiche donc pas sur les pages `/outils/*`.
const isSimulatorPage = (pathname: string): boolean =>
  pathname === "/outils" || pathname.startsWith("/outils/");

// Câble les déclencheurs automatiques du NPS et appelle `open(trigger)` :
//  - exit-intent (curseur quittant la fenêtre vers le haut), desktop uniquement,
//    toutes pages sauf simulateurs ;
//  - Télécharger / Copier sur les modèles de courrier, relayés via le bus
//    `cdtn:nps-trigger` (émis uniquement par ces pages, donc pas de gating ici).
// La garde « 1×/session » et « déjà répondu » vit dans `open` (cf. NpsWidget).
export const useNpsTriggers = (open: (trigger: NpsTrigger) => void): void => {
  const pathname = usePathname() || "";

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isSimulatorPage(pathname)) return;

    // Desktop uniquement : un pointeur fin et le survol distinguent
    // raisonnablement desktop des terminaux tactiles (l'exit-intent n'a pas de
    // sens au doigt).
    const isDesktop = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    if (!isDesktop) return;

    const onMouseOut = (event: MouseEvent) => {
      // `relatedTarget` nul = le curseur a quitté le document (pas un simple
      // survol d'un enfant). `clientY <= 0` = sortie par le haut de la fenêtre.
      if (event.relatedTarget) return;
      if (event.clientY > 0) return;
      open(NpsTrigger.EXIT_INTENT);
    };

    document.addEventListener("mouseout", onMouseOut);
    return () => document.removeEventListener("mouseout", onMouseOut);
  }, [pathname, open]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onTrigger = (event: Event) => {
      const detail = (event as CustomEvent<NpsTriggerEventDetail>).detail;
      if (detail?.trigger) open(detail.trigger);
    };

    window.addEventListener(NPS_TRIGGER_EVENT, onTrigger);
    return () => window.removeEventListener(NPS_TRIGGER_EVENT, onTrigger);
  }, [open]);
};
