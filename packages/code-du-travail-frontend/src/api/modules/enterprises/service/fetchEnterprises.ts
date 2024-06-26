import { ENTERPRISE_API_URL } from "../../../../config";
import { Enterprise } from "../types";
import { nafMapper } from "./naf";
import { ApiRechercheEntrepriseResponse } from "./types";
import { captureException } from "@sentry/nextjs";

export type Convention = {
  idcc: number;
  shortTitle: string;
  id: string;
  title: string;
  url?: string;
};

export type EnterpriseApiResponse = {
  entreprises?: (Omit<Enterprise, "conventions"> & {
    conventions: Convention[];
  })[];
};

export const fetchEnterprises = async (
  query: string,
  codePostal: string | undefined,
  codeCommune: string | undefined
): Promise<EnterpriseApiResponse> => {
  const q = encodeURIComponent(query);

  const url = `${ENTERPRISE_API_URL}/search?q=${q}&page=1&per_page=25&etat_administratif=A&sort_by_size=true${
    codeCommune
      ? `&code_commune=${codeCommune}`
      : codePostal
      ? `&code_postal=${codePostal}`
      : ""
  }`;

  try {
    const fetchReq = await fetch(url);

    const jsonResponse: ApiRechercheEntrepriseResponse = await fetchReq.json();

    const entreprises = jsonResponse.results.map((result) => {
      const conventions =
        result.complements.liste_idcc?.map((idccNumber) => {
          return {
            idcc: parseInt(idccNumber, 10),
            shortTitle: `Convention collective ${idccNumber}`,
            id: idccNumber,
            title: `Convention collective ${idccNumber}`,
          };
        }) ?? [];

      const firstMatchingEtablissement =
        result.matching_etablissements.length > 0
          ? {
              siret: result.matching_etablissements[0].siret,
              address: result.matching_etablissements[0].adresse,
            }
          : { siret: result.siege.siret, address: result.siege.adresse };

      return {
        activitePrincipale: `${nafMapper[result.activite_principale]}`,
        etablissements: result.nombre_etablissements_ouverts,
        highlightLabel: result.nom_raison_sociale ?? result.nom_complet,
        label: result.nom_complet,
        simpleLabel: result.nom_complet,
        matching: result.nombre_etablissements_ouverts,
        siren: result.siren,
        address: result.siege.adresse,
        firstMatchingEtablissement,
        conventions,
      };
    });

    return {
      entreprises,
    };
  } catch (error) {
    console.error(error);
    captureException(error);
    return {
      entreprises: [],
    };
  }
};
