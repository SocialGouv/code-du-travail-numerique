import React from "react";
import PropTypes from "prop-types";
import { Explainer } from "./Explainer";
import { Info } from "./Info";
import { Articles } from "./Articles";
import { TextSearch } from "./TextSearch";
import { Contributions } from "./Contributions";
const Convention = ({ convention }) => {
  return (
    <>
      <Explainer />
      <Info convention={convention} />
      {convention.articlesByTheme.length > 0 && (
        <Articles
          blocs={convention.articlesByTheme}
          containerId={convention.id}
        />
      )}
      <TextSearch containerId={convention.id} />
      {convention.answers.length > 0 && (
        <Contributions contributions={convention.answers} />
      )}
    </>
  );
};

Convention.propTypes = {
  convention: PropTypes.object.isRequired
};

export default Convention;
