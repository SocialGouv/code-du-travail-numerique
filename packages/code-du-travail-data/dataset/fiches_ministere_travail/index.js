const fs = require("fs");
const JSDOM = require("jsdom").JSDOM;
const pLimit = require("p-limit");
const ora = require("ora");
const slugify = require("@cdt/data/slugify");

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

  // get Intro image + text before first Question
  let elIntro = $(article, ".main-article__texte > *");
  let intro = "";

  while (elIntro && elIntro.tagName !== "H3") {
    intro += elIntro.outerHTML.trim();
    elIntro = elIntro.nextElementSibling;
  }

  let chapo = $(article, ".main-article__chapo");
  chapo = chapo && chapo.innerHTML.trim();

  const dateRaw =
    $(dom.window.document, "meta[property*=modified_time]") ||
    $(dom.window.document, "meta[property$=published_time]");
  const [year, month, day] = dateRaw.getAttribute("content").split("-");
  const title = $(article, "h1").textContent.trim();

  const result = {
    date: `${day}/${month}/${year}`,
    description,
    intro: `${chapo || ""}${intro}`,
    sections: [],
    slug: slugify(title),
    title,
    url
  };
  const articleChildren = $$(article, "*");
  articleChildren
    .filter(el => el.getAttribute("id"))
    .forEach(function(el) {
      if (el.tagName === "H3") {
        let nextEl = el.nextElementSibling;
        const section = {
          anchor: el.id,
          description: nextEl.textContent.trim(),
          html: "",
          text: "",
          title: el.textContent.trim()
        };
        while (nextEl && nextEl.tagName !== "H3") {
          section.text += nextEl.textContent.trim();
          section.html += nextEl.outerHTML;
          nextEl = nextEl.nextElementSibling;
        }
        result.sections.push(section);
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
  fs.writeFileSync(
    "./fiches-mt.json",
    JSON.stringify(
      results.map(fiche => ({
        ...fiche,
        sections: fiche.sections.map(
          // description and text are not needed in the file
          // eslint-disable-next-line no-unused-vars
          ({ description, text, ...section }) => section
        )
      })),
      null,
      2
    )
  );
  const fiches = results
    .map(splitArticle)
    .reduce((accumulator, documents) => accumulator.concat(documents), []);
  fs.writeFileSync(
    "./fiches-mt-split.json",
    JSON.stringify(fiches.filter(Boolean), null, 2)
  );
  spinner.stop().clear();
}

if (module === require.main) {
  parseFiches(urls);
}
