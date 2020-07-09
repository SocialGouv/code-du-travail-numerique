import slugify from "@cdt/slugify";
import debounce from "debounce-promise";
import fetch from "isomorphic-unfetch";
import memoizee from "memoizee";
import getConfig from "next/config";

const {
  publicRuntimeConfig: { API_SIRET2IDCC_URL, API_ENTREPRISE_URL },
} = getConfig();

// api siret2idcc call
const apiSiret2idcc = memoizee(
  (sirets) =>
    fetch(`${API_SIRET2IDCC_URL}/${sirets}`)
      .then((r) => r.json())
      .then((data) => (data.error && []) || data)
      .catch(() => []),
  { promise: true }
);

// slugify but keep spaces
const cleanEntrepriseName = (name) => slugify(name).replace("-", " ");

// api entreprise full text call
const apiEntrepriseFullText = memoizee(
  (query) =>
    fetch(
      `${API_ENTREPRISE_URL}/full_text/${encodeURIComponent(
        cleanEntrepriseName(query)
      )}?per_page=50`
    )
      .then((r) => r.json())
      .then(formatFullTextResults)
      .catch(() => []),
  { promise: true }
);

// api entreprise siret call
const apiEntrepriseSiret = memoizee(
  (siret) =>
    fetch(`${API_ENTREPRISE_URL}/siret/${encodeURIComponent(siret)}`)
      .then((r) => r.json())
      .then(async (data) => {
        if (data.etablissement) {
          const idcc = await apiSiret2idcc(data.etablissement.siret);
          return [
            {
              ...formatEtablissement(data.etablissement),
              conventions: (idcc.length && idcc[0].conventions) || [],
            },
          ];
        }
      }),
  { promise: true }
);

// format results API Sirene. embed the IDCC numbers at runtime
const formatEtablissement = (result) => ({
  id: result.id,
  label: `${result.nom_raison_sociale} ${result.code_postal || ""} ${
    result.libelle_commune || ""
  }`,
  siret: result.siret,
  type: "entreprise",
});

// format a set of results from API Sirene
const formatFullTextResults = async (apiData) => {
  if (Array.isArray(apiData.etablissement)) {
    // fetch all conventions in a single call
    const conventions = await apiSiret2idcc(
      apiData.etablissement
        .map((etablissement) => etablissement.siret)
        .join(",")
    );
    return apiData.etablissement.map((etablissement) => {
      const conventionsEtablissement = conventions.find(
        (result) => result.siret === etablissement.siret
      );
      return {
        ...formatEtablissement(etablissement),
        conventions:
          (conventionsEtablissement && conventionsEtablissement.conventions) ||
          [],
      };
    });
  }
  return Promise.resolve([]);
};

const searchEntrepriseByName = debounce(apiEntrepriseFullText, 300);
const searchEntrepriseBySiret = debounce(apiEntrepriseSiret, 300);

export { searchEntrepriseByName, searchEntrepriseBySiret };
