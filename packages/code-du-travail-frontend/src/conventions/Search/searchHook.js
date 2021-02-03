import { useEffect, useState } from "react";

import { getResults } from "./api";

export const ENTERPRISE_SEARCH = "enterprise";
export const ENTERPRISE_SEARCH2 = "enterprise2";
export const CONVENTION_SEARCH = "convention";
export const ADRESSE_SEARCH = "adresse";

// a hook that return [status, searchResults]
// todo: package as a module
const useSearchCC = (query, searchType) => {
  const [results, setResults] = useState();
  const [status, setStatus] = useState("idle");

  // load results when query change
  useEffect(() => {
    let shouldUpdate = true;
    async function load(query) {
      if (query) {
        setStatus("loading");
        setResults();
        try {
          const results = await getResults(query, searchType);
          if (shouldUpdate) {
            if (results) {
              if (results.conventions.length || results.entreprises.length) {
                setStatus("success");
              } else {
                setStatus("empty");
              }
              setResults(results);
            } else {
              setStatus("empty");
            }
          }
        } catch (e) {
          setStatus("error");
        }
      } else {
        setResults();
        setStatus("idle");
      }
    }
    load(query);
    return function () {
      shouldUpdate = false;
    };
  }, [query, searchType]);

  return [status, results];
};

export default useSearchCC;
