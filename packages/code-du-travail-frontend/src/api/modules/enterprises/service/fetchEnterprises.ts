import { ENTERPRISE_API_URL } from "../../../../config";
import { Enterprise } from "../types";
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
  postCode: string[]
): Promise<EnterpriseApiResponse> => {
  const q = encodeURIComponent(query);

  const url = `${ENTERPRISE_API_URL}/search?q=${q}&page=1&per_page=25&etat_administratif=A&sort_by_size=true${
    postCode.length > 0 ? `&code_postal=${postCode.join(",")}` : ""
  }`;

  const fetchReq = await fetch(url);
  if (!fetchReq.ok) {
    console.log("OK")
    throw new Error(`Erreur lors de la récupération des entreprises depuis annuaire-entreprise, code : ${fetchReq.status} (${fetchReq.statusText})`);
  }
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
      highlightLabel: result.nom_complet,
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
};
