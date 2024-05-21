import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { push as matopush } from "@socialgouv/matomo-next";

export const summarize = (text) => {
  const cleanText = text
    .replace(/(<([^>]+)>)/gi, "")
    .replace(/(&nbsp;)/gi, " ");
  return cleanText?.length > 160
    ? cleanText.slice(0, cleanText.indexOf(" ", 160)) + "…"
    : cleanText ?? "";
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
