const fetch = require("node-fetch");
const serialExec = require("promise-serial-exec");
const JSDOM = require("jsdom").JSDOM;

const FICHES_URLS = require("./ministere-travail-liste-fiches.js");

const qsa = (node, selector) => Array.from(node.querySelectorAll(selector));

// restore base image url
const fixImages = html =>
  html.replace(
    /src="((?!https?:\/\/)[^"]*)"/g,
    `src="https://travail-emploi.gouv.fr/$1"`
  );

const parseFiche = url =>
  JSDOM.fromURL(url)
    .then(dom => {
      const summary = qsa(dom.window.document, ".navigation-article li")
        .map(n => n.textContent.trim())
        .filter(t => t !== "L’INFO EN PLUS" && t !== "POUR ALLER PLUS LOIN");

      // `articles` = textes de référence.
      const articles = qsa(
        dom.window.document,
        "article.encarts__article li"
      ).map(n => ({
        url:
          qsa(n, "a") && qsa(n, "a")[0] && qsa(n, "a")[0].getAttribute("href"),
        text: n.textContent.trim()
      }));

      const article = qsa(dom.window.document, ".main-article")[0];

      let result = {
        articles,
        summary,
        title: qsa(article, "h1")[0].textContent.trim(),
        text_full: qsa(article, ".main-article__texte")[0].textContent.trim(),
        html: fixImages(
          qsa(article, ".main-article__texte")[0].innerHTML.trim()
        ),
        text_by_section: [],
        url
      };

      const articleChildren = qsa(article, "*");
      articleChildren.forEach(function(el, index) {
        if (el.tagName === "H3") {
          let subSection = {
            title: el.textContent.trim(),
            text: "",
            url: `${url}#${el.id}`
          };
          let nextEl = el.nextElementSibling;
          while (nextEl && nextEl.tagName !== "H3") {
            subSection.text += nextEl.textContent.trim();
            nextEl = nextEl.nextElementSibling;
          }
          result.text_by_section.push(subSection);
        }
      });

      return result;
    })
    .catch(error => {
      // Ignore 404 errors.
      return null;
    });

serialExec(FICHES_URLS.map(f => () => parseFiche(f.url).catch()))
  .then(j => console.log(JSON.stringify(j.filter(Boolean), null, 2)))
  .catch(console.log);
