import { Alert, Paragraph } from "@socialgouv/cdtn-ui";
import React, { useEffect } from "react";

import { useLocalStorage } from "../../lib/useLocalStorage";
import { Articles } from "./Articles";
import { Contributions } from "./Contributions";
import { TextSearch } from "./TextSearch";

const Convention = ({ convention }) => {
  const [, setCcInfo] = useLocalStorage("convention");

  useEffect(() => {
    const { slug, id, num, title, shortTitle } = convention;
    setCcInfo({ id, num, shortTitle, slug, title });
  }, [convention, setCcInfo]);

  return (
    <>
      {convention.highlight && (
        <Alert variant="primary">
          <Paragraph variant="primary" fontSize="small" fontWeight="700">
            {convention.highlight.title}
          </Paragraph>
          <Paragraph fontSize="small">{convention.highlight.content}</Paragraph>
        </Alert>
      )}
      {convention.answers.length > 0 && (
        <Contributions
          contributions={convention.answers}
          convention={convention}
        />
      )}
      {convention.articlesByTheme.length > 0 && (
        <Articles
          blocs={convention.articlesByTheme}
          containerId={convention.id}
          convention={convention}
        />
      )}
      {convention.url && (
        <TextSearch containerId={convention.id} convention={convention} />
      )}
    </>
  );
};

export default Convention;
