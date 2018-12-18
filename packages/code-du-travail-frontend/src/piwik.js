import ReactPiwik from "react-piwik";
import { Router } from "../routes";
import getConfig from "next/config";

const onRouteChangeComplete = () => {
  ReactPiwik.push(["trackPageView"]);
};

const {
  publicRuntimeConfig: { PIWIK_URL, PIWIK_SITE_ID }
} = getConfig();

if (typeof window !== "undefined" && PIWIK_URL && PIWIK_SITE_ID) {
  new ReactPiwik({
    url: PIWIK_URL,
    siteId: PIWIK_SITE_ID,
    trackErrors: true
  });
  Router.events.on("routeChangeComplete", onRouteChangeComplete);
} else if (typeof window !== "undefined") {
  window._paq = [];
}
