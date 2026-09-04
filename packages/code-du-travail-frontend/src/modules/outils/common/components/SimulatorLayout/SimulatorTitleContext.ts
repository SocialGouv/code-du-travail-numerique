import { createContext, useContext } from "react";

/**
 * Titre du simulateur (`tool.title`, chargé en base) mis à disposition des
 * étapes. Il sert à construire l'action Matomo `view_step_<titre>` : les events
 * émis depuis une étape atterrissent ainsi sur la même action que le reste de
 * l'entonnoir, quel que soit le libellé configuré côté contenu.
 */
export const SimulatorTitleContext = createContext<string>("");

export const useSimulatorTitle = (): string =>
  useContext(SimulatorTitleContext);
