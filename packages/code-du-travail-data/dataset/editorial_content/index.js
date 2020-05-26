import { getRouteBySource, SOURCES } from "@cdt/sources";
import filesize from "filesize";
import { readFileSync, statSync } from "fs";
import htmlAstToAnotherHtmlAst from "rehype-raw";
import htmlAstStringify from "rehype-stringify";
import markdownToMardownAst from "remark-parse";
import markdownAstToHtmlAst from "remark-rehype";
import markdownAstStringify from "remark-stringify";
import markdownAstStrip from "strip-markdown";
import unified from "unified";
import slugify from "../../slugify";
import covidContents from "./contents.json";

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

export function getEditorialContents() {
  return covidContents.map(
    ({ date, description, contents: data, folder, references, title }) => {
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
        description,
        excludeFromSearch: false,
        references,
        slug: slugify(title),
        source: SOURCES.EDITORIAL_CONTENT,
        text,
        title,
      };
    }
  );
}

if (module === require.main) {
  console.log(JSON.stringify(getEditorialContents(), null, 2));
}
