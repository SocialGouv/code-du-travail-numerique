import { useCallback } from "react";
import { useTracking } from "../analytics/events/useTracking";

// Copie d'un modèle (bouton « Copier le modèle » ou Ctrl/Cmd+C). Le slug du
// modèle n'a plus besoin d'être passé : il est déjà dans le `path` injecté par
// `useTracking`, la page étant celle du modèle copié.
export const useModeleEvents = () => {
  const { track } = useTracking();

  return useCallback(() => {
    track("copy_letter_template");
  }, [track]);
};
