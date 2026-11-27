import memoizee from "memoizee";
import { elasticDocumentsIndex, elasticsearchClient } from "../../utils";
import { getSettingsBody } from "./queries";

type SettingsDocument = {
  npsEnabled?: boolean;
};

async function fetchSettings(): Promise<SettingsDocument> {
  const response = await elasticsearchClient.search<SettingsDocument>({
    index: elasticDocumentsIndex,
    ...getSettingsBody(),
  });
  return response.hits.hits[0]?._source ?? {};
}

// Read on every page render (root layout): cached to avoid one Elasticsearch
// call per request. A rejected promise is not cached, so a transient error is
// retried on the next render.
const getSettings = memoizee(fetchSettings, {
  maxAge: 1000 * 5 * 60,
  preFetch: true,
  promise: true,
});

// The NPS widget is shown only during campaigns toggled from cdtn-admin.
// Missing document or Elasticsearch error: the widget stays hidden.
export async function isNpsEnabled(): Promise<boolean> {
  try {
    const settings = await getSettings();
    return settings.npsEnabled === true;
  } catch (error) {
    console.warn("[settings] unable to read site settings:", error);
    return false;
  }
}
