import {
  PublicodesSimulator,
  SingletonPublicodesHelper,
} from "@socialgouv/modeles-social";

export const loadPublicodes = <T extends PublicodesSimulator>(
  simulator: PublicodesSimulator,
  idcc?: string
) => {
  return SingletonPublicodesHelper.getInstance<T>(simulator, idcc);
};
