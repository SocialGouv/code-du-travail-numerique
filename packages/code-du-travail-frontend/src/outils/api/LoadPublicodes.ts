import modeles from "@socialgouv/modeles-social";

export const loadPublicodes = (simulator: string) => {
  switch (simulator) {
    case "preavis-retraite":
      return JSON.stringify(modeles, undefined, 2);
    default:
      return null;
  }
};
