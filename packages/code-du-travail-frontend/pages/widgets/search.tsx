import { push } from "@socialgouv/matomo-next";
import { useIframeResizer } from "../../src/common/hooks";
import { SearchWidget } from "../../src/search/SearchWidget";

function Widgets(): JSX.Element {
  useIframeResizer();
  push(["disableMediaAnalytics"]);

  return <SearchWidget></SearchWidget>;
}

export default Widgets;
