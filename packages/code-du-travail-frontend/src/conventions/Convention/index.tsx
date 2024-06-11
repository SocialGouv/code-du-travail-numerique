import { Alert, Paragraph, theme } from "@socialgouv/cdtn-ui";
import React, { useEffect } from "react";
import styled from "styled-components";

import Html from "../../common/Html";
import { useLocalStorage } from "../../lib/useLocalStorage";
import { Articles } from "./Articles";
import { Contributions } from "./Contributions";
import { TextSearch } from "./TextSearch";

const Convention = ({ convention }) => {
  const [, setCcInfo] = useLocalStorage("convention");

  useEffect(() => {
    const { slug, id, num, shortTitle } = convention;
    setCcInfo({ id, num, shortTitle, slug, title: shortTitle });
  }, [convention, setCcInfo]);

  return (
    <>
      {convention.highlight?.content && (
        <Alert variant="primary">
          <TitleAlert
            variant="primary"
            fontSize="small"
            fontWeight="700"
            noMargin
          >
            {convention.highlight.title}
          </TitleAlert>
          <Paragraph fontSize="small" noMargin>
            <Html as="span">{convention.highlight.content}</Html>
          </Paragraph>
        </Alert>
      )}
      {convention.answers?.length > 0 && (
        <Contributions
          contributions={convention.answers}
          convention={convention}
        />
      )}
      {convention.articlesByTheme?.length > 0 && (
        <Articles
          blocs={convention.articlesByTheme}
          containerId={convention.id}
          convention={convention}
        />
      )}

      {convention.url ? (
        <TextSearch containerId={convention.id} convention={convention} />
      ) : (
        <Paragraph variant="altText" fontSize="default">
          Cette convention collective n&apos;est pas traitée par nos services.
        </Paragraph>
      )}
    </>
  );
};

const { spacings } = theme;
const TitleAlert = styled(Paragraph)`
  margin-bottom: ${spacings.tiny};
`;

export default Convention;
