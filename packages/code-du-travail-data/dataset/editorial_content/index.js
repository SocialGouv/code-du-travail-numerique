const { getRouteBySource, SOURCES } = require("@socialgouv/cdtn-sources");
const filesize = require("filesize");
const { readFileSync, statSync } = require("fs");
const htmlAstToAnotherHtmlAst = require("rehype-raw");
const htmlAstStringify = require("rehype-stringify");
const markdownToMardownAst = require("remark-parse");
const markdownAstToHtmlAst = require("remark-rehype");
const markdownAstStringify = require("remark-stringify");
const markdownAstStrip = require("strip-markdown");
const unified = require("unified");

const slugify = require("@socialgouv/cdtn-slugify");
const { addGlossary } = require("../../indexing/addGlossary");
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
        contents: contents.concat({ ...content, html: addGlossary(html) }),
        text,
      };
    },
    { contents: [], text: "" }
  );
}

function getEditorialContents() {
  return covidContents.map(
    ({
      date,
      description,
      contents: data,
      folder,
      metaDescription,
      references,
      title,
      intro,
      id,
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
        date,
        description: description || introText,
        excludeFromSearch: false,
        folder,
        id,
        intro: addGlossary(introHtml),
        metaDescription: metaDescription || description || introText,
        references,
        slug: slugify(title),
        source: SOURCES.EDITORIAL_CONTENT,
        text: introText + text,
        title,
      };
    }
  );
}

function markdownTransform(documents) {
  return documents.map(({ contents, ...rest }) => ({
    ...rest,
    contents: contents.map((content) => {
      content.html = addGlossary(
        htmlProcessor.processSync(content.markdown).contents
      );
      delete content.markdown;
      return content;
    }),
    intro: addGlossary(htmlProcessor.processSync(rest.intro).contents),
    text:
      textProcessor.processSync(rest.intro) +
      contents
        .map(({ markdown }) =>
          textProcessor.processSync(markdown).contents.replace(/\s\s+/g, " ")
        )
        .join(""),
  }));
}

module.exports = { markdownTransform };

if (module === require.main) {
  console.log(JSON.stringify(getEditorialContents(), null, 2));
}
