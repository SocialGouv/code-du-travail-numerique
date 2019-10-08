import fetch from "isomorphic-unfetch";
import memoizee from "memoizee";
import debounce from "debounce-promise";

export const SIRET2IDCC_URL =
  process.env.API_SIRET2IDCC_URL ||
  "https://siret2idcc.incubateur.social.gouv.fr/api/v2";

export const API_ENTREPRISE = "https://entreprise.data.gouv.fr/api/sirene/v1";

// api siret2idcc call
const apiSiret2idcc = memoizee(
  sirets =>
    fetch(`${SIRET2IDCC_URL}/${sirets}`)
      .then(r => r.json())
      .then(data => (data.error && []) || data)
      .catch(() => []),
  { promise: true }
);

// api entreprise full text call
const apiEntrepriseFullText = memoizee(
  query =>
    fetch(
      `${API_ENTREPRISE}/full_text/${encodeURIComponent(query)}?per_page=50`
    )
      .then(r => r.json())
      .then(formatFullTextResults)
      .catch(() => []),
  { promise: true }
);

// api entreprise siret call
const apiEntrepriseSiret = memoizee(
  siret =>
    fetch(`${API_ENTREPRISE}/siret/${encodeURIComponent(siret)}`)
      .then(r => r.json())
      .then(async data => {
        if (data.etablissement) {
          return {
            ...formatEtablissement(data.etablissement),
            conventions: await apiSiret2idcc(data.etablissement.siret)
          };
        }
      }),
  { promise: true }
);

// format results API Sirene. embed the IDCC numbers at runtime
const formatEtablissement = result => ({
  type: "entreprise",
  id: result.id,
  siret: result.siret,
  label: `${result.nom_raison_sociale} ${result.code_postal ||
    ""} ${result.libelle_commune || ""}`
});

// format a set of results from API Sirene
const formatFullTextResults = async apiData => {
  if (Array.isArray(apiData.etablissement)) {
    // fetch all conventions in a single call
    const conventions = await apiSiret2idcc(
      apiData.etablissement.map(etablissement => etablissement.siret).join(",")
    );
    return apiData.etablissement.map(etablissement => {
      const conventionsEtablissement = conventions.find(
        result => result.siret === etablissement.siret
      );
      return {
        ...formatEtablissement(etablissement),
        conventions:
          (conventionsEtablissement && conventionsEtablissement.conventions) ||
          []
      };
    });
  }
  return Promise.resolve();
};

const searchEntrepriseByName = debounce(apiEntrepriseFullText, 300);
const searchEntrepriseBySiret = debounce(apiEntrepriseSiret, 300);

export { searchEntrepriseByName, searchEntrepriseBySiret };
