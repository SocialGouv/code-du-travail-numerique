import ReactPiwik from "react-piwik";
import { Router } from "../routes";

// piwik.push(["trackEvent", "navigation", "login"]);

const onRouteChangeComplete = url => {
  ReactPiwik.push(["trackPageView"]);
};

let piwik;

if (
  typeof window !== "undefined" &&
  process.env.PIWIK_URL &&
  process.env.SITE_ID
) {
  piwik = new ReactPiwik({
    url: process.env.PIWIK_URL,
    siteId: process.env.PIWIK_SITE_ID,
    trackErrors: true
  });

  Router.events.on("routeChangeComplete", onRouteChangeComplete);
}

export default ReactPiwik;
