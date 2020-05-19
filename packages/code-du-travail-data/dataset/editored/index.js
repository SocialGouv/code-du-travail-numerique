const { readFileSync } = require("fs");
const { getRouteBySource, SOURCES } = require("@cdt/sources");
const unified = require("unified");
const markdownToMardownAst = require("remark-parse");
const markdownAstStringify = require("remark-stringify");
const markdownAstToHtmlAst = require("remark-rehype");
const htmlAstToAnotherHtmlAst = require("rehype-raw");
const htmlAstStringify = require("rehype-stringify");
const markdownAstStrip = require("strip-markdown");

const slugify = require("../../slugify");
const covidContents = require("./contents.json");

// for now we only have covid content in editored contents but we might
// map on any other sources too
const getEditored = () => {
  const MD_COVID_DIR = "covid";
  return covidContents.map(
    ({ date, description, contents, references, title }) => {
      contents.forEach((content) => {
        const raw = readFileSync(
          `${__dirname}/${MD_COVID_DIR}/${content.name}.md`,
          "utf8"
        );
        content.text = unified()
          .use(markdownToMardownAst)
          .use(markdownAstStrip)
          .use(markdownAstStringify)
          .processSync(raw)
          .contents.replace(/(\s)\s+/g, " ")
          .trim();
        content.html = unified()
          .use(markdownToMardownAst)
          .use(markdownAstToHtmlAst, { allowDangerousHtml: true })
          .use(htmlAstToAnotherHtmlAst)
          .use(htmlAstStringify)
          .processSync(raw).contents;
      });
      return {
        breadcrumbs: [
          {
            label: "Dossier Coronavirus-Covid 19",
            slug: `/${getRouteBySource(
              SOURCES.THEMATIC_FILES
            )}/ministere-du-travail-notre-dossier-sur-le-coronavirus`,
          },
        ],
        contents,
        date,
        description,
        excludeFromSearch: false,
        references,
        slug: slugify(title),
        source: SOURCES.EDITORED,
        text: contents.reduce((accumulatedText, content) => {
          const newText = `${accumulatedText} ${content.text}`;
          delete content.text;
          return newText;
        }, ""),
        title,
      };
    }
  );
};

if (module === require.main) {
  console.log(JSON.stringify(getEditored(), null, 2));
}

module.exports = { getEditored };
