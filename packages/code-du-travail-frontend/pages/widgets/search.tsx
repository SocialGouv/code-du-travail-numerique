import { useIframeResizer } from "../../src/common/hooks";
import { SearchWidget } from "../../src/search/SearchWidget";
import { push } from "@socialgouv/matomo-next";
import { useEffect } from "react";

function Widgets(): JSX.Element {
  useIframeResizer();
  useEffect(() => {
    push(["setCookieSameSite", "None"]);
  }, []);

  return <SearchWidget></SearchWidget>;
}

export default Widgets;
