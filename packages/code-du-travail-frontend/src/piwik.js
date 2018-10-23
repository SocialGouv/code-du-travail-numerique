import ReactPiwik from "react-piwik";
import { Router } from "../routes";
import getConfig from "next/config";

const onRouteChangeComplete = url => {
  ReactPiwik.push(["trackPageView"]);
};

let piwik;

const {
  publicRuntimeConfig: { PIWIK_URL, PIWIK_SITE_ID }
} = getConfig();

if (typeof window !== "undefined" && PIWIK_URL && PIWIK_SITE_ID) {
  piwik = new ReactPiwik({
    url: PIWIK_URL,
    siteId: PIWIK_SITE_ID,
    trackErrors: true
  });

  Router.events.on("routeChangeComplete", onRouteChangeComplete);
}

export default ReactPiwik;
