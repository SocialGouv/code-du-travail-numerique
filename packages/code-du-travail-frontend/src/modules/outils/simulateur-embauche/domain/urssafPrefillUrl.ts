import { PERIOD_UNIT, RULES } from "./constants";
import type { ContractType, Period } from "./types";

export const URSSAF_SIMULATOR_PATH = "/simulateurs/salaire-brut-net";

type Args = {
  baseUrl: string;
  period: Period;
  contract: ContractType;
  /** Brut mensuel calculé, s'il y en a un. */
  salaireBrutMensuel?: number | null;
};

/**
 * Construit le lien vers le simulateur URSSAF, prérempli avec la saisie en
 * cours.
 *
 * Le simulateur `mon-entreprise` lit sa situation depuis les query params : le
 * **nom du paramètre est le dotted name de la règle publicodes** et sa valeur
 * la concaténation du montant et de son unité (`2875€/mois`). Le paramètre
 * réservé `unité` fixe l'unité d'affichage.
 *
 * Ce format est déduit du code source de `betagouv/mon-entreprise`, pas mesuré :
 * si l'URSSAF l'a changé, les paramètres seront ignorés et l'usager arrivera sur
 * un simulateur vierge. C'est la raison du repli ci-dessous — on ne renvoie
 * jamais d'URL cassée, au pire une URL nue.
 */
export const buildUrssafPrefillUrl = ({
  baseUrl,
  period,
  contract,
  salaireBrutMensuel,
}: Args): string => {
  const bareUrl = `${baseUrl}${URSSAF_SIMULATOR_PATH}`;

  try {
    const url = new URL(bareUrl);
    url.searchParams.set("unité", PERIOD_UNIT[period]);
    url.searchParams.set(RULES.contrat, `'${contract}'`);

    if (salaireBrutMensuel != null && Number.isFinite(salaireBrutMensuel)) {
      url.searchParams.set(RULES.salaireBrut, `${salaireBrutMensuel}€/mois`);
    }

    return url.toString();
  } catch {
    return bareUrl;
  }
};
