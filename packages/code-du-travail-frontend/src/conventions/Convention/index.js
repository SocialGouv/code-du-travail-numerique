import React, { useEffect } from "react";
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
import { useLocalStorage } from "../../lib/useLocalStorage";

const Convention = ({ convention }) => {
  const [, setCcInfo] = useLocalStorage("convention", {});

  useEffect(() => {
    const { slug, id, num, title, shortTitle } = convention;
    setCcInfo({ convention: { id, slug, title, shortTitle, num } });
  }, [convention, setCcInfo]);

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
