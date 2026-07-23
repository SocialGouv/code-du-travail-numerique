import { elasticAccordsIndex, elasticsearchClient } from "../../utils";
import { DilaApiClient } from "../../utils/dila-api-client";
import {
  ApiAccordResponse,
  ApiEntrepriseAccordResponse,
  ApiSearchResponse,
  EntrepriseAccordsResponse,
  EsAccordDocument,
} from "./types";
import { getAccordsBySiret } from "./queries";
import { format } from "date-fns";

// Bascule de la source de données des accords d'entreprise.
// - false : Elasticsearch (index `accords`) — source par défaut.
// - true  : API Legifrance / DILA (ancienne source, conservée pour pouvoir
//   basculer en cas de besoin).
const USE_LEGIFRANCE_API = false;

export const getAccordsEntreprise = async (
  siret: string
): Promise<EntrepriseAccordsResponse> => {
  return USE_LEGIFRANCE_API
    ? getAccordsEntrepriseFromDila(siret)
    : getAccordsEntrepriseFromEs(siret);
};

/* -------------------------------------------------------------------------- */
/*                             Source Elasticsearch                            */
/* -------------------------------------------------------------------------- */

export const getAccordsEntrepriseFromEs = async (
  siret: string
): Promise<EntrepriseAccordsResponse> => {
  const body = getAccordsBySiret(siret);

  const response = await elasticsearchClient.search<EsAccordDocument>({
    index: elasticAccordsIndex,
    ...body,
  });

  const total =
    typeof response.hits.total === "number"
      ? response.hits.total
      : (response.hits.total?.value ?? 0);

  const accords = response.hits.hits
    .map(({ _source }) => _source)
    .filter((accord): accord is EsAccordDocument => accord !== undefined)
    .map((accord) => ({
      id: accord.id,
      title: accord.title,
      themes: accord.themes ?? [],
      dateSignature: formatEsDate(accord.dateDepot),
      dateDebut: formatEsDate(accord.dateEffet),
      dateFin: formatEsDate(accord.dateFin),
      texteIntegral: accord.conformeVersionIntegrale,
      signataires: [],
    }));

  return { total, accords };
};

// Les dates de l'index sont stockées au format "yyyy-MM-dd". On les reformate
// en "dd/MM/yyyy" par manipulation de chaîne pour éviter tout décalage lié au
// fuseau horaire qu'introduirait un passage par `new Date`.
const formatEsDate = (date?: string): string | undefined => {
  if (!date) {
    return undefined;
  }
  const [year, month, day] = date.split("-");
  if (!year || !month || !day) {
    return undefined;
  }
  return `${day}/${month}/${year}`;
};

/* -------------------------------------------------------------------------- */
/*                          Source Legifrance / DILA                          */
/* -------------------------------------------------------------------------- */

export const getAccordsEntrepriseFromDila = async (
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
  try {
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
  } catch (e) {
    console.error("Fetch all accord failed for siret: ", siret);
    console.error(e);
    throw e;
  }
};

const fetchAccord = async (accordId: string): Promise<ApiAccordResponse> => {
  const dila = new DilaApiClient();
  try {
    const result: ApiEntrepriseAccordResponse = await dila.fetch({
      path: "consult/acco",
      params: { id: accordId },
      method: "POST",
    });

    return result.acco;
  } catch (e) {
    console.error("Fetch accord failed for id: ", accordId);
    console.error(e);
    throw e;
  }
};
