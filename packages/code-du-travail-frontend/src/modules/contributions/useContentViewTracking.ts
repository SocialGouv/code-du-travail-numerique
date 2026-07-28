import { useEffect, useRef, type RefObject } from "react";

type Options = {
  /** Durée de présence continue (onglet actif) avant de considérer le contenu comme consulté. */
  dwellMs?: number;
  /**
   * Part supérieure du viewport dans laquelle l'élément doit entrer pour armer
   * le décompte. 0.25 = les 25 % du haut de l'écran. Bornée à `]0, 1]`.
   */
  topBandRatio?: number;
  /**
   * Active l'observation. À `false`, aucun observer n'est posé : à utiliser quand
   * le bloc n'est pas réellement affiché (ex. contenu générique masqué), plutôt
   * que de se reposer sur l'effet de bord `display:none`.
   */
  enabled?: boolean;
};

/**
 * Déclenche `onView` une seule fois lorsque l'élément observé (typiquement le
 * titre h2 du bloc réponse) est entré dans la bande supérieure du viewport ET
 * que l'utilisateur est resté `dwellMs` millisecondes dessus, onglet actif.
 *
 * - Le décompte ne tourne que lorsque l'onglet est visible (`visibilitychange`).
 * - Il repart de zéro si l'utilisateur remonte au-dessus du bloc réponse.
 * - Il continue de tourner si le titre sort par le haut (= lecture du contenu).
 *
 * NOTE : `ref` doit être un `RefObject` stable dont le `.current` est renseigné
 * dès le montage (typiquement `useRef` posé sur un élément rendu sans condition
 * dans le même composant). L'effet ne se relance que sur `enabled`/`dwellMs`/
 * `topBandRatio` : un ref peuplé tardivement ne serait pas pris en compte.
 */
export function useContentViewTracking<T extends Element>(
  ref: RefObject<T | null>,
  onView: () => void,
  { dwellMs = 10_000, topBandRatio = 0.25, enabled = true }: Options = {}
) {
  // On garde la dernière closure `onView` sans relancer l'effet à chaque rendu.
  const onViewRef = useRef(onView);
  onViewRef.current = onView;

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el || typeof IntersectionObserver === "undefined") return;

    let fired = false;
    let armed = false;
    let shouldCount = false;
    let accumulatedMs = 0;
    let startedAt: number | null = null;
    let timer: ReturnType<typeof setTimeout> | undefined;

    function cleanup() {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (timer) clearTimeout(timer);
    }

    const fire = () => {
      if (fired) return;
      fired = true;
      cleanup();
      onViewRef.current();
    };

    const resume = () => {
      if (fired || startedAt !== null) return;
      const remaining = dwellMs - accumulatedMs;
      if (remaining <= 0) {
        // Temps de présence déjà atteint : on déclenche sans attendre.
        fire();
        return;
      }
      startedAt = Date.now();
      timer = setTimeout(fire, remaining);
    };

    const pause = () => {
      if (startedAt === null) return;
      accumulatedMs += Date.now() - startedAt;
      startedAt = null;
      if (timer) clearTimeout(timer);
    };

    const reset = () => {
      pause();
      accumulatedMs = 0;
      shouldCount = false;
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (shouldCount) resume();
      } else {
        pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Le titre est entré dans la bande haute : on démarre le décompte.
          armed = true;
          shouldCount = true;
          if (document.visibilityState === "visible") resume();
        } else if (armed && entry.boundingClientRect.top < 0) {
          // Le titre est sorti par le haut : l'utilisateur lit le contenu en
          // dessous, on continue de compter.
          shouldCount = true;
          if (document.visibilityState === "visible") resume();
        } else {
          // Titre repassé sous la bande : le bloc réponse n'est pas (ou plus)
          // en tête d'écran, on repart de zéro.
          reset();
        }
      },
      {
        // Réduit la zone d'observation aux `topBandRatio` du haut du viewport.
        // Bornage `]0, 1]` pour éviter une marge positive (qui inverserait le
        // comportement) ou un `-100%` qui ne se déclencherait jamais.
        rootMargin: `0px 0px -${
          (1 - Math.min(1, Math.max(0.01, topBandRatio))) * 100
        }% 0px`,
        threshold: 0,
      }
    );

    observer.observe(el);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return cleanup;
  }, [ref, dwellMs, topBandRatio, enabled]);
}
