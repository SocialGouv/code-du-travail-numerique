const JSDOM = require("jsdom").JSDOM;
const pLimit = require("p-limit");
const ora = require("ora");
const urls = require("./ministere-travail-liste-fiches.json");
const { splitArticle } = require("./articleSplitter");

const $$ = (node, selector) => Array.from(node.querySelectorAll(selector));
const $ = (node, selector) => node.querySelector(selector);

const formatAnchor = node => {
  let href = node.getAttribute("href");
  if (!href) return;
  if (!href.match(/^https?:\/\//)) {
    if (href.slice(0, 1) !== "/") {
      href = "/" + href;
    }
    href = `https://travail-emploi.gouv.fr${href}`;
    node.setAttribute("href", href);
    node.setAttribute("target", "_blank");
    node.setAttribute("rel", "nofollow, noopener");
  }
};

function parseDom(dom, url) {
  const internalId = $(
    dom.window.document,
    "meta[name='SPIP.identifier']"
  ).getAttribute("content");

  const description = $(
    dom.window.document,
    "meta[name=description]"
  ).getAttribute("content");
  const summary = $$(dom.window.document, ".navigation-article li")
    .map(n => n.textContent.trim())
    .filter(t => t !== "L’INFO EN PLUS" && t !== "POUR ALLER PLUS LOIN");

  const ariane = $$(dom.window.document, "nav.page__breadcrumb a")
    .slice(1)
    .map(el => el.textContent.trim());

  // `articles` = textes de référence.
  const articles = $$(dom.window.document, "article.encarts__article li")
    .filter(item => $(item, "a") && $(item, "a").getAttribute("href"))
    .map(node => {
      formatAnchor(node);
      return {
        url: node.getAttribute("href"),
        text: node.textContent.trim()
      };
    });

  const article = $(dom.window.document, "main");
  $$(article, "a").forEach(formatAnchor);

  $$(article, "img")
    .filter(node => node.getAttribute("src").indexOf("data:image") === -1)
    .forEach(node => {
      let src = node.getAttribute("src");
      if (!src.match(/^https?:\/\//)) {
        if (src.slice(0, 1) !== "/") {
          src = "/" + src;
        }
        src = `https://travail-emploi.gouv.fr${src}`;
        node.setAttribute("src", src);
      }
    });

  const dateRaw =
    $(dom.window.document, "meta[property*=modified_time]") ||
    $(dom.window.document, "meta[property$=published_time]");
  const [year, month, day] = dateRaw.getAttribute("content").split("-");

  // get Intro image + text before first Question
  let elIntro = $(article, ".main-article__texte > *");
  let intro = "";

  while (elIntro && elIntro.tagName !== "H3") {
    intro += elIntro.outerHTML.trim();
    elIntro = elIntro.nextElementSibling;
  }

  const chapo = $(article, ".main-article__chapo");

  const tags = $$(
    dom.window.document,
    "span.main-article__tag.tag--encart"
  ).map(n => n.textContent.trim());
  const title = $(article, "h1").textContent.trim();
  const result = {
    internalId,
    description,
    ariane,
    tags,
    articles,
    summary,
    intro: `${chapo ? chapo.innerHTML.trim() : ""}${intro}`,
    title,
    text_full: $(article, ".main-article__texte").textContent.trim(),
    text_by_section: [],
    date: `${day}/${month}/${year}`,
    url
  };
  const articleChildren = $$(article, "*");
  articleChildren
    .filter(el => el.getAttribute("id"))
    .forEach(function(el) {
      if (el.tagName === "H3") {
        const subSection = {
          title: el.textContent.trim(),
          text: "",
          html: "",
          url: `${url}#${el.id}`
        };
        let nextEl = el.nextElementSibling;
        while (nextEl && nextEl.tagName !== "H3") {
          subSection.text += nextEl.textContent.trim();
          subSection.html += nextEl.outerHTML;
          nextEl = nextEl.nextElementSibling;
        }
        result.text_by_section.push(subSection);
      }
    });

  return result;
}

const limit = pLimit(15);
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
    } else {
      spinner.fail(`${url} - ${error}`).start();
    }
    return null;
  }
}

async function parseFiches(urls) {
  const inputs = urls.map(url => limit(() => parseFiche(url)));
  const results = await Promise.all(inputs);
  const fiches = results
    .map(splitArticle)
    .reduce((state, documents) => state.concat(documents), []);
  spinner.stop().clear();
  console.log(JSON.stringify(fiches.filter(Boolean), null, 2));
}

if (module === require.main) {
  parseFiches(urls);
}
