const fs = require("fs");
const path = require("path");
const serialExec = require("promise-serial-exec");
const DilaApi = require("@socialgouv/dila-api-client");

const dilaClient = new DilaApi();

const tableMatieres = params =>
  dilaClient.fetch({
    path: "consult/code/tableMatieres",
    method: "POST",
    params
  });

const getArticle = id =>
  dilaClient.fetch({
    path: "consult/getArticle",
    method: "POST",
    params: {
      id
    }
  });

const JSONLog = data => console.log(JSON.stringify(data, null, 2));

// embed article details into the section
const embedArticles = async section => ({
  ...section,
  articles: await Promise.all(
    section.articles
      .filter(article => article.etat === "VIGUEUR")
      .map(
        article =>
          console.log(`getArticle ${article.id}`) || getArticle(article.id)
      )
  ),
  sections: await serialExec(
    section.sections
      .filter(section => section.etat === "VIGUEUR")
      .map(section => () =>
        console.log(`embedArticles section ${section.id}`) ||
        embedArticles(section)
      )
  )
});

// get structure + content
const getFullCode = params =>
  tableMatieres(params).then(tbl => console.log(tbl) || embedArticles(tbl));

// get full code from DILA, then slimify the file. from 229Mb to 19Mb
const getCodeDuTravail = () =>
  getFullCode({
    date: new Date().getTime(),
    sctId: "",
    textId: "LEGITEXT000006072050"
  }).then(code => ({
    type: "code",
    data: {
      cid: "LEGITEXT000006072050",
      titre: "Code du travail",
      titrefull: "Code du travail"
    },
    children: [...code.sections.map(toSection), ...code.articles.map(toArticle)]
  }));

// simpler section
const toSection = section => ({
  type: "section",
  data: {
    id: section.id,
    cid: section.cid,
    titre_ta: section.title
  },
  children: [
    ...section.sections.map(toSection),
    ...section.articles.map(toArticle)
  ]
});

// simpler article
const toArticle = article => ({
  type: "article",
  data: {
    id: article.article.id,
    cid: article.article.cid,
    num: article.article.num,
    nota: article.article.notaHtml,
    bloc_textuel: article.article.texteHtml,
    titre: `Article ${article.article.num}`,
    date_debut: new Date(article.article.dateDebut).toISOString()
  }
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
