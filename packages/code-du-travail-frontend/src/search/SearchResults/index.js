import React from "react";
import PropTypes from "prop-types";

import { groupByDisplayCategory } from "../utils";
import { Results } from "./Results";
import { Law } from "./Law";
import { Themes } from "./Themes";

const SearchResults = ({ items = [], isSearch, query }) => {
  const { matches, law, themes } = groupByDisplayCategory(items);
  return (
    <>
      {matches.length > 0 && (
        <Results isSearch={isSearch} items={matches} query={query} />
      )}
      {law.length > 0 && <Law items={law} query={query} />}
      {themes.length > 0 && <Themes items={themes} query={query} />}
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
