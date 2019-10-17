const JSDOM = require("jsdom").JSDOM;
const pLimit = require("p-limit");
const ora = require("ora");
const urls = require("./ministere-travail-liste-fiches.json");
const slugify = require("@cdt/data/slugify");

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
  const description = $(
    dom.window.document,
    "meta[name=description]"
  ).getAttribute("content");

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

  const title = $(article, "h1").textContent.trim();

  const text = $(article, ".main-article__texte").textContent.trim();

  const html = $(article, ".main-article__texte").outerHTML;

  const result = {
    date: `${day}/${month}/${year}`,
    description,
    html,
    intro: `${chapo ? chapo.innerHTML.trim() : ""}${intro}`,
    slug: slugify(title),
    title,
    text,
    url
  };
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
  const fiches = await Promise.all(inputs);
  spinner.stop().clear();
  console.log(JSON.stringify(fiches.filter(Boolean), null, 2));
}

if (module === require.main) {
  parseFiches(urls);
}
