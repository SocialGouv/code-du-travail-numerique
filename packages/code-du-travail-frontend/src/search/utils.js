import { matopush } from "../piwik";
import { SOURCES, getRouteBySource } from "@cdt/sources";

export const summarize = (text = "") =>
  text.length > 160 ? text.slice(0, text.indexOf(" ", 160)) + "…" : text;

export const reportSelectionToMatomo = (source, slug, url, algo) => {
  const trackedUrl =
    source === SOURCES.EXTERNALS ? url : `/${getRouteBySource(source)}/${slug}`;

  const qualifiedCall = JSON.stringify({
    url: trackedUrl,
    algo
  });

  matopush(["trackEvent", "selectResult", qualifiedCall]);
};
