const fetch = require("node-fetch");
const JSDOM = require("jsdom").JSDOM;

const FICHES_URLS = require("./ministere-travail-liste-fiches.js");

const $$ = (node, selector) => Array.from(node.querySelectorAll(selector));
const $ = (node, selector) => node.querySelector(selector);

// restore base image url
const fixImages = html =>
  html.replace(
    /src="((?!https?:\/\/)[^"]*)"/g,
    `src="https://travail-emploi.gouv.fr/$1"`
  );

function parseDom(dom, url) {
  const summary = $$(dom.window.document, ".navigation-article li")
    .map(n => n.textContent.trim())
    .filter(t => t !== "L’INFO EN PLUS" && t !== "POUR ALLER PLUS LOIN");

  // `articles` = textes de référence.
  const articles = $$(dom.window.document, "article.encarts__article li").map(
    n => ({
      url: $(n, "a") && $(n, "a").getAttribute("href"),
      text: n.textContent.trim()
    })
  );

  const article = $(dom.window.document, ".main-article");
  $$(article, "a").forEach(node => {
    const href = node.getAttribute("href");

    if (href) {
      if (href.slice(0, 1) === "/") {
        node.setAttribute(
          "href",
          `https://travail-emploi.gouv.fr${node.getAttribute("href")}`
        );
        node.setAttribute("target", "_blank");
        node.setAttribute("rel", "nofollow, noopener");
      }
    }
  });

  const date = $(article, ".date--maj") || $(article, ".date--publication");
  const [day, month, year] = date.textContent.trim().split(".");

  let result = {
    articles,
    summary,
    title: $(article, "h1").textContent.trim(),
    text_full: $(article, ".main-article__texte").textContent.trim(),
    html: fixImages($(article, ".main-article__texte").innerHTML.trim()),
    text_by_section: [],
    date: `${day}/${month}/20${year}`,
    url
  };

  const articleChildren = $$(article, "*");
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
}

const parseFiche = async url => {
  try {
    const dom = await JSDOM.fromURL(url);
    return parseDom(dom, url);
  } catch (error) {
    if (error.statusCode) {
      console.error(`☠️  - ${error.statusCode} - ${url}`);
      return null;
    }
    console.error(url, "\n", error);
    return null;
  }
};

async function parseFiches(urls) {
  const fiches = [];
  for (const url of urls) {
    const fiche = await parseFiche(url);
    fiches.push(fiche);
  }
  console.log(JSON.stringify(fiches.filter(Boolean), null, 2));
}

const urls = FICHES_URLS.map(f => f.url);
parseFiches(urls);
