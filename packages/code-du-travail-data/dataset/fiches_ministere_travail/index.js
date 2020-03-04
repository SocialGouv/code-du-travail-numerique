const fs = require("fs");
const JSDOM = require("jsdom").JSDOM;
const pLimit = require("p-limit");
const ora = require("ora");
const slugify = require("@cdt/data/slugify");

const urls = require("./ministere-travail-liste-fiches.json");
const { splitArticle } = require("./articleSplitter");
const { addTags } = require("./enrichText");

const $$ = (node, selector) => Array.from(node.querySelectorAll(selector));
const $ = (node, selector) => node.querySelector(selector);

const formatAnchor = node => {
  if (node.textContent === "") {
    node.remove();
    return;
  }
  let href = node.getAttribute("href");
  // remove ATTAg(...) on pdf link
  node.removeAttribute("onclick");
  if (!href) return;
  // unwrap link with href="javascript:"
  if (/^javascript:/.test(href)) {
    node.parentNode.innerHTML = node.textContent;
  }
  if (!href.match(/^https?:\/\//)) {
    if (href.slice(0, 1) !== "/") {
      href = "/" + href;
    }
    node.setAttribute("href", `https://travail-emploi.gouv.fr${href}`);
    node.setAttribute("target", "_blank");
    node.setAttribute("rel", "nofollow, noopener");
  }
};

const flattenCsBlocs = node => {
  node.insertAdjacentHTML("afterend", node.innerHTML);
  node.parentNode.removeChild(node);
};

const getSectionTag = article => {
  const h3 = $$(article, ".main-article__texte h3").length && "h3";
  const h4 = $$(article, ".main-article__texte h4").length && "h4";
  const h5 = $$(article, ".main-article__texte h5").length && "h5";
  return h3 || h4 || h5;
};

function parseDom(dom, url) {
  const article = $(dom.window.document, "main");
  $$(article, "a").forEach(formatAnchor);
  $$(article, ".cs_blocs").forEach(flattenCsBlocs);
  $$(article, "img")
    .filter(node => node.getAttribute("src").indexOf("data:image") === -1)
    .forEach(node => {
      // remove adaptImgFix(this) on hero img
      node.removeAttribute("onmousedown");
      let src = node.getAttribute("src");
      if (!src.match(/^https?:\/\//)) {
        if (src.slice(0, 1) !== "/") {
          src = "/" + src;
        }
        src = `https://travail-emploi.gouv.fr${src}`;
        node.setAttribute("src", src);
      }
    });

  const title = $(article, "h1").textContent.trim();
  const slug = slugify(title);
  const dateRaw =
    $(dom.window.document, "meta[property*=modified_time]") ||
    $(dom.window.document, "meta[property$=published_time]");
  const [year, month, day] = dateRaw.getAttribute("content").split("-");
  let intro = $(article, ".main-article__chapo") || "";
  intro = intro && intro.innerHTML.trim();
  const description = $(
    dom.window.document,
    "meta[name=description]"
  ).getAttribute("content");
  const sections = [];
  const sectionTag = getSectionTag(article);

  // First pass is only to get a potential untitled section at the top of the article
  // This section has neither anchor nor title
  let nextArticleElement = $(article, ".main-article__texte > *");
  const untitledSection = {
    title: title,
    anchor: "",
    html: "",
    text: ""
  };
  while (
    nextArticleElement &&
    nextArticleElement.tagName.toLowerCase() !== sectionTag
  ) {
    if (nextArticleElement.textContent) {
      if (!untitledSection.description) {
        untitledSection.description = nextArticleElement.textContent.trim();
      }
      untitledSection.html += nextArticleElement.outerHTML;
      untitledSection.text += " " + nextArticleElement.textContent.trim();
    }
    nextArticleElement = nextArticleElement.nextElementSibling;
  }
  if (untitledSection.description) {
    untitledSection.text.trim();
    sections.push(untitledSection);
  }
  // Gets all the titled content
  const articleChildren = $$(article, ".main-article__texte > *");
  articleChildren
    .filter(el => el.getAttribute("id"))
    .forEach(function(el) {
      if (el.tagName.toLowerCase() === sectionTag) {
        let nextEl = el.nextElementSibling;
        const section = {
          anchor: el.id,
          description: nextEl.textContent.trim(),
          html: "",
          text: "",
          title: el.textContent.trim()
        };
        while (nextEl && nextEl.tagName.toLowerCase() !== sectionTag) {
          section.text += nextEl.textContent.trim();
          section.html += nextEl.outerHTML;
          nextEl = nextEl.nextElementSibling;
        }
        section.html = addTags(section.html);
        sections.push(section);
      }
    });

  return {
    date: `${day}/${month}/${year}`,
    description,
    intro,
    sections,
    slug,
    title,
    url
  };
}

const fetchAndParse = urls => {
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
      return error;
    }
  }

  async function parseFiches(urls) {
    const inputs = urls.map(url => limit(() => parseFiche(url)));
    const results = (await Promise.all(inputs)).filter(
      fiche => !!fiche.sections
    );
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

  return parseFiches(urls);
};

module.exports = {
  parseDom
};

if (module === require.main) {
  fetchAndParse(urls).catch(error => {
    console.error(error);
  });
}
