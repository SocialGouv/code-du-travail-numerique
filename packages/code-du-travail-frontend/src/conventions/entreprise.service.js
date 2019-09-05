import fetch from "isomorphic-unfetch";
import memoizee from "memoizee";
import debounce from "debounce-promise";

export const SIRET2IDCC_URL =
  process.env.API_SIRET2IDCC_URL ||
  "https://siret2idcc.incubateur.social.gouv.fr/api/v1";

export const API_ENTREPRISE = "https://entreprise.data.gouv.fr/api/sirene/v1";
// api siret2idcc call
const apiSiret2idcc = memoizee(
  siret =>
    fetch(`${SIRET2IDCC_URL}/${siret}`)
      .then(r => r.json())
      .then(
        data =>
          (data.error && []) ||
          data.filter(convention => convention.num !== "9999")
      )
      .catch(() => []),
  { promise: true }
);

// api entreprise full text call
const apiEntrepriseFullText = memoizee(
  query =>
    fetch(`${API_ENTREPRISE}/full_text/${encodeURIComponent(query)}`)
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
      .then(
        data => data.etablissement && formatResultEntreprise(data.etablissement)
      ),
  { promise: true }
);

// format results API Sirene. embed the IDCC numbers at runtime
const formatResultEntreprise = async result => ({
  id: result.id,
  siret: result.siret,
  conventions: await apiSiret2idcc(result.siret),
  label: `${result.nom_raison_sociale} ${result.code_postal ||
    ""} ${result.libelle_commune || ""}`
});

// format a set of results API Sirene
const formatFullTextResults = apiData =>
  (apiData.etablissement &&
    apiData.etablissement.map &&
    Promise.all(
      apiData.etablissement.filter(Boolean).map(formatResultEntreprise)
    )) ||
  Promise.resolve();

const searchEntrepriseByName = debounce(apiEntrepriseFullText, 300);
const searchEntrepriseBySiret = debounce(apiEntrepriseSiret, 300);

export { searchEntrepriseByName, searchEntrepriseBySiret };
