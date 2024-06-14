import { ENTERPRISE_API_URL } from "../../../../config";
import { Enterprise } from "../types";
import { getCodeCommune } from "./fetchCp";
import { nafMapper } from "./naf";
import { ApiRechercheEntrepriseResponse } from "./types";

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
  address: string | undefined
): Promise<EnterpriseApiResponse> => {
  const q = encodeURIComponent(query);
  const codeCommune = address ? await getCodeCommune(address) : undefined;

  const url = `${ENTERPRISE_API_URL}/search?q=${q}&page=1&per_page=25&etat_administratif=A&sort_by_size=true${
    codeCommune ? `&code_commune=${codeCommune}` : ""
  }`;

  const fetchReq = await fetch(url);

  const jsonResponse: ApiRechercheEntrepriseResponse = await fetchReq.json();

  const entreprises = jsonResponse.results.map((result) => {
    const conventions =
      result.siege.liste_idcc?.map((idccNumber) => {
        return {
          idcc: parseInt(idccNumber, 10),
          shortTitle: `Convention collective ${idccNumber}`,
          id: idccNumber,
          title: `Convention collective ${idccNumber}`,
        };
      }) ?? [];
    return {
      activitePrincipale: `${result.activite_principale} - ${
        nafMapper[result.activite_principale]
      }`,
      etablissements: result.nombre_etablissements_ouverts,
      highlightLabel: result.nom_raison_sociale,
      label: result.nom_complet,
      simpleLabel: result.nom_complet,
      matching: result.nombre_etablissements_ouverts,
      siren: result.siren,
      address: result.siege.adresse,
      firstMatchingEtablissement: {
        siret: result.matching_etablissements[0].siret,
        address: result.matching_etablissements[0].adresse,
      },
      conventions,
    };
  });

  return {
    entreprises,
  };
};
