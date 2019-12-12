import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Heading as HeadingUi, theme } from "@socialgouv/react-ui";

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
const { spacings } = theme;

export const Heading = styled(HeadingUi)`
  margin-top: ${spacings.larger};
  margin-bottom: ${spacings.large};
`;

export const List = styled.ul`
  padding-left: 0;
  list-style-type: none;
`;

export const ListItem = styled.li`
  margin-bottom: ${spacings.medium};
  padding: 0;
`;

Convention.propTypes = {
  convention: PropTypes.object.isRequired
};

export default Convention;
