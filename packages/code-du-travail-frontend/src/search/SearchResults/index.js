import React from "react";
import PropTypes from "prop-types";

import { groupByDisplayCategory } from "../utils";
import { Matches } from "./Matches";
import { Law } from "./Law";
import { Themes } from "./Themes";

const SearchResults = ({ items = [], isSearch, query }) => {
  const { matches, law, themes } = groupByDisplayCategory(items);
  const matchesId = "search-matches";
  const lawId = "law-matches";
  const themesId = "themes-matches";
  return (
    <>
      {matches.length > 0 && (
        <Matches
          isSearch={isSearch}
          id={matchesId}
          items={matches}
          query={query}
        />
      )}
      {law.length > 0 && <Law id={lawId} items={law} query={query} />}
      {themes.length > 0 && (
        <Themes id={themesId} items={themes} query={query} />
      )}
    </>
  );
};

SearchResults.propTypes = {
  isSearch: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      _source: PropTypes.shape({
        title: PropTypes.string,
        source: PropTypes.string,
        slug: PropTypes.string
      })
    })
  )
};

export { SearchResults };
