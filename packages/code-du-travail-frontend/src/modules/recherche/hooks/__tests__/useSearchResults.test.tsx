import React, { useEffect } from "react";
import { render, waitFor } from "@testing-library/react";
import { useSearchResults } from "../useSearchResults";

it("provides a stable resetSearch function across re-renders", async () => {
  const refs: Array<() => void> = [];

  const TestComp = () => {
    const { resetSearch, setQuery } = useSearchResults();

    // capture reference on every render
    refs.push(resetSearch);

    // trigger a re-render once
    useEffect(() => {
      setQuery("some new query");
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
  };

  render(<TestComp />);

  await waitFor(() => {
    // we expect at least two renders
    expect(refs.length).toBeGreaterThanOrEqual(2);
  });

  // all captured refs should be strictly equal => stable function reference
  for (let i = 1; i < refs.length; i++) {
    expect(refs[i]).toBe(refs[0]);
  }
});
