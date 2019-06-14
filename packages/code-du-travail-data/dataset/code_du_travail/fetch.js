const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const OAuth2 = require("simple-oauth2");
const serialExec = require("promise-serial-exec");

const clientId = process.env.OAUTH_CLIENT_ID;
const clientSecret = process.env.OAUTH_CLIENT_SECRET;

const apiHost = "https://sandbox-api.aife.economie.gouv.fr";
const tokenHost = "https://sandbox-oauth.aife.economie.gouv.fr";

const credentials = {
  client: {
    id: clientId,
    secret: clientSecret
  },
  auth: {
    tokenHost,
    tokenPath: "/api/oauth/token",
    authorizePath: "/api/oauth/authorize"
  },
  options: {
    authorizationMethod: "body"
  }
};

// cache access token once received
let globalToken;

const getAccessToken = async () => {
  if (globalToken) {
    return globalToken;
  }
  const oauth2 = OAuth2.create(credentials);
  try {
    const result = await oauth2.clientCredentials.getToken({
      scope: "openid"
    });
    const accessToken = oauth2.accessToken.create(result);
    globalToken = accessToken.token.access_token;
    return accessToken.token.access_token;
  } catch (error) {
    console.log("error", error);
    console.log("Access Token error", error.message);
  }
};

const dilaFetch = async ({ path, method = "POST", body }) => {
  const token = await getAccessToken();
  const url = `${apiHost}/${path}`;
  const data = await fetch(url, {
    method,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body
  })
    .then(r => r.json())
    .catch(e => {
      console.log("ERROR", e);
      console.log({
        url,
        body,
        token
      });

      throw e;
    });

  return data;
};

const tableMatieres = params =>
  dilaFetch({
    path: "dila/legifrance/lf-engine-app/consult/code/tableMatieres",
    body: JSON.stringify(params)
  });

const getArticle = async id =>
  dilaFetch({
    path: "dila/legifrance/lf-engine-app/consult/getArticle",
    body: JSON.stringify({
      id
    })
  });

const JSONLog = data => console.log(JSON.stringify(data, null, 2));

// embed article details into the section
const embedArticles = async section => {
  return {
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
    ) //.then(wait(500))
  };
};

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
