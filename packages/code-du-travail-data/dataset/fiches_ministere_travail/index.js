const fetch = require("node-fetch");
const JSDOM = require("jsdom").JSDOM;
const ora = require("ora");
const { batchPromise } = require("@cdt/data...kali/utils");
const urls = require("./ministere-travail-liste-fiches.json");

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
  const articles = $$(dom.window.document, "article.encarts__article li")
    .filter(item => $(item, "a") && $(item, "a").getAttribute("href"))
    .map(n => ({
      url: $(n, "a") && $(n, "a").getAttribute("href"),
      text: n.textContent.trim()
    }));

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

  const dateRaw = $(article, ".date--maj") || $(article, ".date--publication");
  const [date] = dateRaw.textContent.match(/([0-9\.]+)$/);
  const [day, month, year] = date.split(".");

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
  articleChildren
    .filter(el => el.getAttribute("id"))
    .forEach(function(el, index) {
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

let count = 0;
const spinner = ora(`fetching 0/${urls.length}`).start();

async function parseFiche(url) {
  try {
    const dom = await JSDOM.fromURL(url);
    spinner.text = `fetching ${count++}/${urls.length}`;
    return parseDom(dom, url);
  } catch (error) {
    if (error.statusCode) {
      spinner.fail(error.options.uri).start();
    }
    return null;
  }
}

async function parseFiches(urls) {
  results = await batchPromise(urls, 10, parseFiche);
  spinner.stop().clear();
  console.log(JSON.stringify(results.filter(Boolean), null, 2));
}

if (module === require.main) {
  parseFiches(urls);
}
