import debounce from "debounce-promise";
import memoizee from "memoizee";
import getConfig from "next/config";
import React from "react";

import { InlineError } from "../../../outils/common/ErrorField";

export type Agreement = {
  id: string;
  num: number;
  shortTitle: string;
  slug: string;
  title: string;
};

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

const formatCCn = ({ num, id, slug, title, shortTitle }) => ({
  id,
  num,
  shortTitle,
  slug,
  title,
});

const nafError = (
  <InlineError>
    Numéro d’indentification (IDCC) incorrect. Il semblerait que vous ayez saisi
    un code <abbr title="Activité Principale Exercée">APE</abbr> (Activité
    Principale Exercée) ou{" "}
    <abbr title="Nomenclature des Activités Françaises">NAF</abbr> (Nomenclature
    des Activités Françaises) et dont l’objectif est d’identifier l’activité
    principale de l’entreprise.
  </InlineError>
);
const onlyNumberError = (
  <InlineError>
    Numéro d’indentification (IDCC) incorrect. Ce numéro est composé de 4
    chiffres uniquement.
  </InlineError>
);
// memoize search results
const apiIdcc = memoizee(
  function createFetcher(query: string) {
    const url = `${API_URL}/idcc?q=${encodeURIComponent(query)}`;
    if (/^\d{4}[A-Za-z]$/.test(query.replace(/\W/g, ""))) {
      return Promise.reject(nafError);
    }
    if (/^\d{5,}$/.test(query.replace(/\W/g, ""))) {
      return Promise.reject(onlyNumberError);
    }
    return fetch(url).then(async (response) => {
      if (response.ok) {
        return response
          .json()
          .then(
            (results) =>
              results.hits.hits.map(({ _source }) =>
                formatCCn(_source)
              ) as Agreement[]
          );
      }
      const errorMessage = await response.text();
      return Promise.reject(new Error(errorMessage));
    });
  },
  { promise: true }
);

const searchAgreement = debounce(apiIdcc, 300);

export { searchAgreement };
