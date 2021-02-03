import htmlAstToAnotherHtmlAst from "rehype-raw";
import htmlAstStringify from "rehype-stringify";
import markdownToMardownAst from "remark-parse";
import markdownAstToHtmlAst from "remark-rehype";
import markdownAstStringify from "remark-stringify";
import markdownAstStrip from "strip-markdown";
import unified from "unified";

const textProcessor = unified()
  .use(markdownToMardownAst)
  .use(markdownAstStrip)
  .use(markdownAstStringify);

const htmlProcessor = unified()
  .use(markdownToMardownAst)
  .use(markdownAstToHtmlAst, { allowDangerousHtml: true })
  .use(htmlAstToAnotherHtmlAst)
  .use(htmlAstStringify);

export function markdownTransform(addGlossary, documents) {
  return documents.map(({ contents = [], ...rest }) => ({
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
