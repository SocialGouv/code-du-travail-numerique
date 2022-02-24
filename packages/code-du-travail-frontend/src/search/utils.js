import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";

import { matopush } from "../piwik";

export const summarize = (text = "") =>
  text.length > 160 ? text.slice(0, text.indexOf(" ", 160)) + "…" : text;

export const formatUrlMatomo = (source, slug, url) => {
  return source === SOURCES.EXTERNALS
    ? url
    : `/${getRouteBySource(source)}/${slug}`;
};

export const reportSelectionToMatomo = (source, slug, url, algo) => {
  const qualifiedCall = JSON.stringify({
    algo,
    url: formatUrlMatomo(source, slug, url),
  });

  matopush(["trackEvent", "selectResult", qualifiedCall]);
};
