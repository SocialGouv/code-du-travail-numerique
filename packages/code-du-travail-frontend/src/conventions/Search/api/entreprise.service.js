import slugify from "@socialgouv/cdtn-slugify";
import debounce from "debounce-promise";
import memoizee from "memoizee";
import { API_SIRET2IDCC_URL, API_ENTREPRISE_URL } from "../../../config";

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
      `${API_ENTREPRISE_URL}/v1/full_text/${encodeURIComponent(
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
    fetch(
      `${API_ENTREPRISE_URL}/v3/etablissements/${encodeURIComponent(siret)}`
    )
      .then((r) => r.json())
      .then(async ({ etablissement }) => {
        if (!etablissement) return [];
        return apiSiret2idcc(etablissement.siret).then((result) => [
          {
            ...formatEtablissement(
              etablissement.unite_legale.denomination,
              etablissement
            ),
            conventions: (result.length && result[0].conventions) || [],
          },
        ]);
      }),
  { promise: true }
);

// api entreprise siren call
const apiEntrepriseSiren = memoizee(
  (siren) =>
    fetch(
      `${API_ENTREPRISE_URL}/v3/unites_legales/${encodeURIComponent(siren)}`
    )
      .then((r) => r.json())
      .then(async ({ unite_legale }) => {
        if (!unite_legale) return [];
        const { denomination, etablissements } = unite_legale;
        return apiSiret2idcc(
          etablissements.map((etablissement) => etablissement.siret).join(",")
        ).then((results = []) =>
          results.map((result) => ({
            conventions: result.conventions || [],
            ...formatEtablissement(
              denomination,
              etablissements.find(
                (etablissement) => etablissement.siret === result.siret
              )
            ),
          }))
        );
      }),
  { promise: true }
);

const formatEtablissement = (denomination, etablissement) => ({
  closed:
    (etablissement.etat_administratif &&
      etablissement.etat_administratif !== "A") ||
    false,
  id: etablissement.id,
  label: `${denomination || etablissement.nom_raison_sociale} ${
    etablissement.code_postal || ""
  } ${etablissement.libelle_commune || ""}`,
  siret: etablissement.siret,
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
        ...formatEtablissement(undefined, etablissement),
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
const searchEntrepriseBySiren = debounce(apiEntrepriseSiren, 300);

export {
  searchEntrepriseByName,
  searchEntrepriseBySiren,
  searchEntrepriseBySiret,
};
