const fetch = require("node-fetch");
const { format, addMonths } = require("date-fns");

const MATOMO_URL =
  process.env.MATOMO_URL || "https://matomo.fabrique.social.gouv.fr";
const MATOMO_SITE_ID = process.env.MATOMO_SITE_ID || 4;
const ES_URL = process.env.ES_URL || "http://127.0.0.1:9200";

const startDate = new Date(2019, 0, 1);
const now = new Date();

// fetch matomo summary / date
const fetchStatsByDate = (date) =>
  fetch(
    `${MATOMO_URL}/index.php?module=API&method=VisitsSummary.get&idSite=${MATOMO_SITE_ID}&period=month&date=${date}&format=Json`
  ).then((r) => r.json());

const statsKeys = [
  "nb_uniq_visitors",
  "nb_visits",
  "nb_actions",
  "nb_actions_per_visit",
];

// loop monthly due to a limitation in matomo AIP
const fetchTotalMatomo = async () => {
  let currentDate = startDate;
  const total = statsKeys.reduce((a, c) => ({ ...a, [c]: 0 }), {});

  while (currentDate < now) {
    const date = format(currentDate, "YYYY-MM-DD");
    const stats = await fetchStatsByDate(date);
    statsKeys.forEach((key) => {
      total[key] += stats[key];
    });
    currentDate = addMonths(currentDate, 1);
  }
  return total;
};

// fetch es indices documents count
const fetchDocsCount = async () =>
  fetch(`${ES_URL}/_stats`)
    .then((r) => r.json())
    .then((data) => data._all.total.docs.count);

const fetchAllStats = async () => {
  const total = await fetchTotalMatomo();
  return {
    ...total,
    searchCount: total.nb_actions / 2, // current estimation
    docsCount: await fetchDocsCount(),
  };
};

fetchAllStats().then(console.log).catch(console.log);
