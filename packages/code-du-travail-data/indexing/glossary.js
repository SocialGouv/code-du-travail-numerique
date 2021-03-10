const findAndReplaceMd = require("mdast-util-find-and-replace");
const findAndReplaceHtml = require("hast-util-find-and-replace");
const acorn = require("acorn");
const mdxJsxSyntax = require("micromark-extension-mdx-jsx");
const fromMarkdown = require("mdast-util-from-markdown");
const toMarkdown = require("mdast-util-to-markdown");
const mdxJsx = require("mdast-util-mdx-jsx");
const mdxMd = require("micromark-extension-mdx-md");
const HtmlParser = require("@starptech/webparser").HtmlParser;
const fromWebparser = require("@starptech/hast-util-from-webparser"); // less strict html parser
const toHtml = require("hast-util-to-html");
const mdxJsxToMarkdown = require("./toMarkdown");

const DEFAULT_TOOLTIP_TAG_NAME = "webcomponent-tooltip";

const stripDefinition = (definition) =>
  definition.replace(/'/g, "’").replace("<p>", "").replace("</p>", "");

// replace non-unicode JS Regexp word boundaries `\b`
const nonWordChars = `[?!"'’“>\\|,:;.\\s()\\[\\]]`;

// get first char of the string if considered non-string
const getPreviousChar = (str) =>
  str.charAt(0).match(new RegExp(nonWordChars)) ? str.charAt(0) : "";

// get last char of the string if considered non-string
const getNextChar = (str) =>
  str.charAt(str.length - 1).match(new RegExp(nonWordChars))
    ? str.charAt(str.length - 1)
    : "";

// build mdast for a tooltip
// for some reason we need to wrap it in a span
const getMarkdownTooltip = (glossaryTerm) => (match) => {
  const tagName = glossaryTerm.tagName || DEFAULT_TOOLTIP_TAG_NAME;

  const attrs =
    (glossaryTerm.definition &&
      ` content="${encodeURIComponent(
        stripDefinition(glossaryTerm.definition)
      )}"`) ||
    "";

  // as the regexp capture optional previous and next character, arrange HTML properly
  const startChar = getPreviousChar(match);
  const endChar = getNextChar(match);

  const text = match.slice(startChar.length, match.length - endChar.length);

  return {
    type: "html",
    value: `${startChar}<${tagName}${attrs}>${text}</${tagName}>${endChar}`,
  };
};

// build  hast for a tooltip
// for some reason we need to wrap it in a span
const getHtmlTooltip = (glossaryTerm) => (match) => {
  const tagName = glossaryTerm.tagName || DEFAULT_TOOLTIP_TAG_NAME;
  const attrs = {};
  if (glossaryTerm.definition) {
    attrs.content = encodeURIComponent(
      stripDefinition(glossaryTerm.definition)
    );
  }

  // as the regexp capture optional previous and next character, arrange HTML properly
  // todo: find a way to remove the span wrapper
  const startChar = getPreviousChar(match);
  const endChar = getNextChar(match);
  const text = match.slice(startChar.length, match.length - endChar.length);
  const children = [];
  if (startChar) children.push({ type: "text", value: startChar });
  children.push({
    children: [
      {
        type: "text",
        value: text,
      },
    ],
    properties: attrs,
    tagName,
    type: "element",
  });
  if (endChar) children.push({ type: "text", value: endChar });

  return {
    children,
    tagName: "span",
    type: "element",
  };
};

// build search&replace map for *-util-find-and-replace
// build a flat list of all possibles expressions : term + variants
// todo: add with diacritics removed ?
const buildReplaceMap = (tooltipFunction, glossaryTerms) =>
  glossaryTerms.flatMap((glossaryTerm) => [
    [
      new RegExp(
        `(${nonWordChars}|^)${glossaryTerm.term}(${nonWordChars}|$)`,
        "i"
      ),
      tooltipFunction(glossaryTerm),
    ],
    ...((glossaryTerm.variants &&
      glossaryTerm.variants.map((variant) => [
        new RegExp(`(${nonWordChars}|^)${variant}(${nonWordChars}|$)`, "i"),
        tooltipFunction(glossaryTerm),
      ])) ||
      []),
  ]);

export const create = (glossaryTerms) => {
  const valueMapHtml = buildReplaceMap(getHtmlTooltip, glossaryTerms);
  const valueMapMarkdown = buildReplaceMap(getMarkdownTooltip, glossaryTerms);

  const tagNames = Array.from(
    new Set(glossaryTerms.map((t) => t.tagName).filter(Boolean))
  );

  return {
    replaceHtml: (html) => {
      try {
        const result = new HtmlParser({
          decodeEntities: false,
          ignoreFirstLf: false,
          selfClosingElements: true,
        }).parse(html);

        const tree = fromWebparser(result.rootNodes);

        findAndReplaceHtml(tree, valueMapHtml, {
          ignore: [
            "title",
            "script",
            "style",
            "svg",
            "math",
            "webcomponent-tooltip",
            ...tagNames,
          ],
        });

        const out = toHtml(tree).trim();
        return out;
      } catch (e) {
        console.log(`Cannot parse HTML content`, e.message);
        console.log("e", e);
        console.log(html.slice(0, 100) + "...");
        return html;
      }
    },
    replaceMarkdown: (markdown) => {
      try {
        const fixedMarkdown = markdown.replace(/^\s+</gm, "<");
        const tree = fromMarkdown(fixedMarkdown, {
          extensions: [mdxJsxSyntax({ acorn: acorn }), mdxMd],
          mdastExtensions: [mdxJsx.fromMarkdown],
        });

        findAndReplaceMd(tree, valueMapMarkdown);

        const out = toMarkdown(tree, {
          bullet: "-",
          extensions: [mdxJsxToMarkdown],
          listItemIndent: "one",
        }).trim();
        return out;
      } catch (e) {
        console.log(`Cannot parse Markdown content`, e.message);
        console.log("e", e);
        console.log(markdown.slice(0, 100) + "...");
        return markdown;
      }
    },
  };
};
