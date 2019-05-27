import ReactPiwik from "react-piwik";
import { Router } from "../routes";
import getConfig from "next/config";

const {
  publicRuntimeConfig: { PIWIK_URL, PIWIK_SITE_ID }
} = getConfig();

if (typeof window !== "undefined" && PIWIK_URL && PIWIK_SITE_ID) {
  const piwik = new ReactPiwik({
    url: PIWIK_URL,
    siteId: PIWIK_SITE_ID,
    trackErrors: true
  });
  ReactPiwik.push(["trackPageView"]);
  Router.events.on("routeChangeComplete", path => {
    piwik.track({ path });
  });
} else if (typeof window !== "undefined") {
  window._paq = [];
}
