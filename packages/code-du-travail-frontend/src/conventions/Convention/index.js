import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Heading as HeadingUi,
  Title as TitleUi,
  theme
} from "@socialgouv/react-ui";

import { Info } from "./Info";
import { Articles } from "./Articles";
import { TextSearch } from "./TextSearch";
import { Contributions } from "./Contributions";

const Convention = ({ convention }) => {
  return (
    <React.Fragment>
      <Info convention={convention} />
      {convention.answers.length > 0 && (
        <Contributions contributions={convention.answers} />
      )}
      {convention.articlesByTheme.length > 0 && (
        <Articles
          blocs={convention.articlesByTheme}
          containerId={convention.id}
        />
      )}
      <TextSearch containerId={convention.id} />
    </React.Fragment>
  );
};
const { spacings } = theme;

export const Title = styled(TitleUi)`
  margin-top: ${spacings.larger};
  margin-bottom: ${spacings.large};
`;
export const Heading = styled(HeadingUi)`
  margin-top: ${spacings.large};
  margin-bottom: ${spacings.medium};
`;

Convention.propTypes = {
  convention: PropTypes.object.isRequired
};

export default Convention;
