import { useEffect, useState } from "react";

import { getResults, ResultType } from "./api";

export enum Status {
  IDLE = "idle",
  LOADING = "loading",
  EMPTY = "empty",
  ERROR = "error",
  SUCCESS = "success",
}

// a hook that return [status, searchResults]
// todo: package as a module
const useSearchCC = (query: string): [Status, ResultType] => {
  const [results, setResults] = useState<ResultType>({
    conventions: [],
    entreprises: [],
  });
  const [status, setStatus] = useState<Status>(Status.IDLE);
  // load results when query change
  useEffect(() => {
    let shouldUpdate = true;

    async function load(query) {
      if (query) {
        setStatus(Status.LOADING);
        setResults({ conventions: [], entreprises: [] });
        try {
          const results = await getResults(query);
          if (shouldUpdate) {
            if (results) {
              if (results.conventions.length || results.entreprises.length) {
                setStatus(Status.SUCCESS);
              } else {
                setStatus(Status.EMPTY);
              }
              setResults(results);
            } else {
              setStatus(Status.EMPTY);
            }
          }
        } catch (e) {
          setStatus(Status.ERROR);
        }
      } else {
        setResults({ conventions: [], entreprises: [] });
        setStatus(Status.IDLE);
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
