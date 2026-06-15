import { DilaApiClient } from "@socialgouv/dila-api-client";
import {
  ApiAccordResponse,
  ApiEntrepriseAccordResponse,
  ApiSearchResponse,
  EntrepriseAccordsResponse,
} from "./types";
import { format } from "date-fns";

export const getAccordsEntreprise = async (
  siret: string
): Promise<EntrepriseAccordsResponse> => {
  const accords = await fetchAllAccords(siret);
  const accordsDetail = await Promise.all(
    accords.results.map((accord) => fetchAccord(accord.titles[0].id))
  );
  return {
    total: accords.totalResultNumber,
    accords: accordsDetail.map((accord) => ({
      id: accord.id,
      title: accord.titreTexte,
      themes: accord.themes.map((item) => item.libelle),
      dateSignature: format(new Date(accord.dateTexte), "dd/MM/yyyy"),
      dateDebut: format(new Date(accord.dateEffet), "dd/MM/yyyy"),
      dateFin:
        accord.dateFin !== 32472144000000
          ? format(new Date(accord.dateFin), "dd/MM/yyyy")
          : undefined,
      texteIntegral: accord.conformeVersionIntegrale,
      signataires: accord.syndicats.map((item) => item.libelle),
    })),
  };
};

const fetchAllAccords = async (siret: string): Promise<ApiSearchResponse> => {
  const dila = new DilaApiClient();
  const result: ApiSearchResponse = await dila.fetch({
    path: "search",
    params: {
      recherche: {
        filtres: [
          {
            valeurs: [siret],
            facette: "SIRET_RAISON_SOCIALE",
          },
        ],
        sort: "DATE_DESC",
        fromAdvancedRecherche: false,
        secondSort: "ID",
        champs: [
          {
            typeChamp: "ALL",
            criteres: [
              {
                typeRecherche: "EXACTE",
                valeur: siret,
                operateur: "ET",
              },
            ],
            operateur: "ET",
          },
        ],
        pageSize: 2,
        operateur: "ET",
        typePagination: "DEFAUT",
        pageNumber: 1,
      },
      fond: "ACCO",
    },
    method: "POST",
  });

  return result;
};

const fetchAccord = async (accordId: string): Promise<ApiAccordResponse> => {
  const dila = new DilaApiClient();
  const result: ApiEntrepriseAccordResponse = await dila.fetch({
    path: "consult/acco",
    params: { id: accordId },
    method: "POST",
  });

  return result.acco;
};
