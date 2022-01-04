import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";

import { matopush } from "../piwik";

export const summarize = (text = "") => {
  const parsedText = text.replace(/<(?:.|\n)*?>/gm, "");
  return parsedText.length > 160
    ? parsedText.slice(0, parsedText.indexOf(" ", 160)) + "…"
    : parsedText;
};

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
