import { useIframeResizer } from "../../src/common/hooks";
import { SearchWidget } from "../../src/search/SearchWidget";
import { init, push } from "@socialgouv/matomo-next";
import { useEffect } from "react";
import { PIWIK_SITE_ID, PIWIK_URL, SITE_URL } from "../../src/config";

function Widgets(): JSX.Element {
  useIframeResizer();
  useEffect(() => {
    init({
      siteId: PIWIK_SITE_ID,
      url: PIWIK_URL,
      onInitialization: () => {
        push(["setCookieSameSite", "None"]);
        // @ts-ignore
        push(["setSecureCookie", true]);
      },
    });
  }, []);

  return <SearchWidget></SearchWidget>;
}

export default Widgets;
