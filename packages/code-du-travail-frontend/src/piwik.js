import { Router } from "../routes";
import getConfig from "next/config";

const {
  publicRuntimeConfig: { PIWIK_URL, PIWIK_SITE_ID }
} = getConfig();

if (typeof window !== "undefined" && PIWIK_URL && PIWIK_SITE_ID) {
  initPiwik({
    url: PIWIK_URL,
    siteId: PIWIK_SITE_ID
  });
  matopush(["enableHeartBeatTimer"]);
  matopush(["trackPageView"]);

  Router.events.on("routeChangeComplete", path => {
    setTimeout(() => {
      const { q, source } = Router.query;
      if (/^\/recherche/.test(path)) {
        matopush(["trackSiteSearch", q, source]);
      } else {
        matopush(["trackPageView"]);
      }
    }, 0);
  });
} else if (typeof window !== "undefined") {
  window._paq = [];
}

function initPiwik({
  siteId,
  url,
  jsTrackerFile = "piwik.js",
  phpTrackerFile = "piwik.php"
}) {
  window._paq = window._paq || [];
  matopush(["setSiteId", siteId]);
  matopush(["setTrackerUrl", `${url}/${phpTrackerFile}`]);
  matopush(["enableLinkTracking"]);

  const scriptElement = document.createElement("script");
  const refElement = document.getElementsByTagName("script")[0];
  scriptElement.type = "text/javascript";
  scriptElement.async = true;
  scriptElement.defer = true;
  scriptElement.src = `${url}/${jsTrackerFile}`;
  refElement.parentNode.insertBefore(scriptElement, refElement);
}

export function matopush(args) {
  window._paq.push(args);
}
