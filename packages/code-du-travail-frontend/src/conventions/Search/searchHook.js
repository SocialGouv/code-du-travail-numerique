import { useEffect, useState } from "react";

import { getResults } from "./api";

export const ENTERPRISE_SEARCH = "enterprise";
export const CONVENTION_SEARCH = "convention";

// a hook that return [status, searchResults]
// todo: package as a module
const useSearchCC = (query, address, searchType) => {
  const [results, setResults] = useState();
  const [status, setStatus] = useState("idle");

  // load results when query change
  useEffect(() => {
    let shouldUpdate = true;
    async function load(query) {
      if (query || address || searchType) {
        setStatus("loading");
        setResults();
        try {
          const results = await getResults(query, address, searchType);
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
  }, [query, address, searchType]);

  return [status, results];
};

export default useSearchCC;
