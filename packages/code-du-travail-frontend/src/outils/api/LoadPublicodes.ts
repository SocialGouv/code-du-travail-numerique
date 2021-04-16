import modeles from "@socialgouv/modeles-social";

export const loadPublicodes = (simulator: string) => {
  switch (simulator) {
    case "preavis-retraite":
      return modeles;
    default:
      return null;
  }
};
