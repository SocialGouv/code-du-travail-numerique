import { useIframeResizer } from "../../src/common/hooks";
import { SearchWidget } from "../../src/search/SearchWidget";

function Widgets(): JSX.Element {
  useIframeResizer();

  return <SearchWidget></SearchWidget>;
}

export default Widgets;
