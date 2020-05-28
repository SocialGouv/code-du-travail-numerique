const { getRouteBySource, SOURCES } = require("@cdt/sources");
const filesize = require("filesize");
const { readFileSync, statSync } = require("fs");
const htmlAstToAnotherHtmlAst = require("rehype-raw");
const htmlAstStringify = require("rehype-stringify");
const markdownToMardownAst = require("remark-parse");
const markdownAstToHtmlAst = require("remark-rehype");
const markdownAstStringify = require("remark-stringify");
const markdownAstStrip = require("strip-markdown");
const unified = require("unified");
const slugify = require("../../slugify");
const covidContents = require("./contents.json");

const textProcessor = unified()
  .use(markdownToMardownAst)
  .use(markdownAstStrip)
  .use(markdownAstStringify);

const htmlProcessor = unified()
  .use(markdownToMardownAst)
  .use(markdownAstToHtmlAst, { allowDangerousHtml: true })
  .use(htmlAstToAnotherHtmlAst)
  .use(htmlAstStringify);

function transformContents(folder, data) {
  return data.reduce(
    ({ text, contents }, content) => {
      const md = readFileSync(
        `${__dirname}/${folder}/${content.name}.md`,
        "utf8"
      );
      text += textProcessor.processSync(md).contents.replace(/\s\s+/g, " ");
      const html = htmlProcessor.processSync(md).contents;
      if (content.type === "graphic") {
        const size = statSync(
          `${__dirname}/${folder}/graphics/${content.name}.pdf`
        ).size;
        content.size = filesize(size, { round: 1 });
      }
      return {
        text,
        contents: contents.concat({ ...content, html }),
      };
    },
    { text: "", contents: [] }
  );
}

function getEditorialContents() {
  return covidContents.map(
    ({
      date,
      description,
      contents: data,
      folder,
      references,
      title,
      intro,
    }) => {
      const introText = textProcessor.processSync(intro).contents;
      const introHtml = htmlProcessor.processSync(intro).contents;
      const { text, contents } = transformContents(folder, data);
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
        folder,
        date,
        intro: introHtml,
        description,
        excludeFromSearch: false,
        references,
        slug: slugify(title),
        source: SOURCES.EDITORIAL_CONTENT,
        text: introText + text,
        title,
      };
    }
  );
}
module.exports = { getEditorialContents };
if (module === require.main) {
  console.log(JSON.stringify(getEditorialContents(), null, 2));
}
