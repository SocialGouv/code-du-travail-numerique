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
      <TextSearch containerId={convention.id} convention={convention} />
    </>
  );
};

export default Convention;
