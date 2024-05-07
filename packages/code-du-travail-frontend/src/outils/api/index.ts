import {
  PublicodesSimulator,
  SingletonPublicodesHelper,
} from "@socialgouv/modeles-social";
import { searchAgreement } from "../../conventions/Search/api/agreement.service";
import * as Sentry from "@sentry/nextjs";
import { Agreement } from "@socialgouv/cdtn-utils";

export const loadPublicodes = <T extends PublicodesSimulator>(
  simulator: PublicodesSimulator,
  idcc?: string
) => {
  return SingletonPublicodesHelper.getInstance<T>(simulator, idcc);
};

export const getCc3239Informations = async (): Promise<Agreement> => {
  let defaultInformations = {
    url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000044594539",
    id: "KALICONT000044594539",
    num: 3239,
    shortTitle: "Particuliers employeurs et emploi à domicile",
    slug: "3239-particuliers-employeurs-et-emploi-a-domicile",
    title: "Particuliers employeurs et emploi à domicile",
  } as Agreement;
  try {
    const res = await searchAgreement("3239");
    defaultInformations = res[0];
  } catch (e) {
    console.error(e)
    Sentry.captureException(e);
  }
  return defaultInformations;
};
