import React from "react";

import Search from "../src/search/Search";
import Categories from "../src/Categories";

const Home = ({ onSuggestionSelected }) => {
  return (
    <div>
      <Search />
      <Categories />
    </div>
  );
};

export default props => <Home {...props} onSuggestionSelected={() => {}} />;
