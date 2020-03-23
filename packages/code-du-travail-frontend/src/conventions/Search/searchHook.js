import { useState, useEffect } from "react";

import { getResults } from "./api";

// a hook that return [status, searchResults]
// todo: package as a module
const useSearchCC = (query) => {
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
          const results = await getResults(query);
          if (shouldUpdate) {
            if (results) {
              if (results.conventions.length || results.entreprises.length) {
                setStatus("success");
              } else {
                setStatus("empty");
              }
              setResults(results);
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
  }, [query]);

  return [status, results];
};

export default useSearchCC;
