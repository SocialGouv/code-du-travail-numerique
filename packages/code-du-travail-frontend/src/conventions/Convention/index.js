import React /*, { useEffect } */ from "react";

// import { useLocalStorage } from "../../lib/useLocalStorage";
import { Articles } from "./Articles";
import { TextSearch } from "./TextSearch";
import { Contributions } from "./Contributions";

const Convention = ({ answers, articlesByTheme, id }) => {
  /*
    const [, setCcInfo] = useLocalStorage("convention", {});

    useEffect(() => {
      const { slug, id, num, title, shortTitle } = convention;
      setCcInfo({ convention: { id, slug, title, shortTitle, num } });
    }, [convention, setCcInfo]);
  */

  return (
    <>
      {answers.length > 0 && <Contributions contributions={answers} />}
      {articlesByTheme.length > 0 && (
        <Articles blocs={articlesByTheme} containerId={id} />
      )}
      <TextSearch containerId={id} />
    </>
  );
};

export default Convention;
