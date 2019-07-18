const fs = require("fs");
const path = require("path");
const pAll = require("p-all");
const flatten = require("lodash.flatten");

const DilaApi = require("@socialgouv/dila-api-client");

const dilaClient = new DilaApi();

// parties dites anciennes
const uselessSections = [
  "LEGISCTA000006101375", // Partie législative ancienne
  "LEGISCTA000006107985", // Partie réglementaire ancienne - Décrets en Conseil d'Etat
  "LEGISCTA000006169868" // Partie réglementaire ancienne - Décrets simples
];

const JSONLog = data => console.log(JSON.stringify(data, null, 2));

const isUselessSection = section => uselessSections.includes(section.id);

const getTableMatieres = params =>
  dilaClient.fetch({
    path: "consult/code/tableMatieres",
    method: "POST",
    params
  });

const getArticle = (id, tries = 0) =>
  dilaClient
    .fetch({
      path: "consult/getArticle",
      method: "POST",
      params: {
        id
      }
    })
    // slimify content
    .then(toArticle)
    // try 3 tentatives
    .catch(e => {
      console.log(`getArticle.catch ${id} (${tries}/3)`, e);
      if (tries < 3) {
        return getArticle(id, tries + 1);
      }
      throw e;
    });

// get all articles ids for a given section
const getArticlesId = section =>
  flatten([
    ...section.articles
      .filter(article => article.etat === "VIGUEUR")
      .map(article => [article.id]),
    ...section.sections
      .filter(section => section.etat === "VIGUEUR")
      .filter(section => !isUselessSection(section))
      .map(section => getArticlesId(section))
  ]);

// get full code from DILA API
const getCodeDuTravail = async () => {
  const now = new Date().getTime();

  // get structure
  const code = await getTableMatieres({
    date: now,
    sctId: "",
    textId: "LEGITEXT000006072050"
  });

  // extract related articles ids
  const articlesIds = getArticlesId(code);

  // fetch articles concurrently
  const articles = await pAll(articlesIds.map(id => () => getArticle(id)), {
    concurrency: 10
  });

  return articles;
};

// simpler article
const toArticle = article => ({
  id: article.article.id,
  cid: article.article.cid,
  num: article.article.num,
  nota: article.article.notaHtml,
  bloc_textuel: article.article.texteHtml,
  titre: `Article ${article.article.num}`,
  date_debut: new Date(article.article.dateDebut).toISOString()
});

if (require.main === module) {
  getCodeDuTravail()
    .then(code => {
      JSONLog(code);
      if (process.argv.length === 3) {
        const targetPath = path.join(__dirname, process.argv[2]);
        fs.writeFile(targetPath, JSON.stringify(code, null, 2), e => {
          if (e) {
            throw e;
          }
          console.log(`Wrote ${targetPath}`);
        });
      }
    })
    .catch(console.log);
}
