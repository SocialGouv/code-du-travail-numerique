import { useState, useEffect } from "react";

import { loadResults } from "./api";

// a render prop that return idcc search results
// todo: package as a module
const SearchHoc = ({ query, render }) => {
  const [results, setResults] = useState();
  const [status, setStatus] = useState("idle");

  // load results when query change
  useEffect(() => {
    async function load() {
      if (query) {
        setStatus("loading");
        setResults([]);
        const results = await loadResults(query);
        setResults(results);
        if (results && results.length) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } else {
        setResults([]);
        setStatus("idle");
      }
    }
    load();
  }, [query]);

  return render({ status, results });
};

export default SearchHoc;
