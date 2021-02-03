const findAndReplaceMd = require("mdast-util-find-and-replace");
const findAndReplaceHtml = require("hast-util-find-and-replace");
const acorn = require("acorn");
const syntax = require("micromark-extension-mdx-jsx");
const fromMarkdown = require("mdast-util-from-markdown");
const toMarkdown = require("mdast-util-to-markdown");
const mdxJsx = require("mdast-util-mdx-jsx");
const mdxMd = require("micromark-extension-mdx-md");
const HtmlParser = require("@starptech/webparser").HtmlParser;
const fromWebparser = require("@starptech/hast-util-from-webparser"); // less strict html parser
const toHtml = require("hast-util-to-html");

const DEFAULT_TOOLTIP_TAG_NAME = "webcomponent-tooltip";

const stripDefinition = (definition) =>
  definition.replace(/'/g, "’").replace("<p>", "").replace("</p>", "");

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
  const startChar = match.charAt(0).match(/\W/) ? match.charAt(0) : "";
  const endChar = match.charAt(match.length - 1).match(/\W/)
    ? match.charAt(match.length - 1)
    : "";
  const text = match.slice(startChar.length, match.length - endChar.length);

  return {
    type: "html",
    value: `${startChar}<${tagName}${attrs}>${text}</${tagName}>${endChar}`,
  };
};

// replace non-unicode JS Regexp word boundaries `\b`
const nonWordChars = `[?!"'’“>\\|,:;.\\s()\\[\\]]`;

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
  const startChar = match.charAt(0).match(/\W/) ? match.charAt(0) : "";
  const endChar = match.charAt(match.length - 1).match(new RegExp(nonWordChars))
    ? match.charAt(match.length - 1)
    : "";
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
const buildReplaceMap = (tooltipFunction, glossaryTerms) => {
  // build a flat list of all possibles expressions : term + variants
  // todo: add with diacritics removed ?
  const replaceMap = glossaryTerms.flatMap((glossaryTerm) => [
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
  return replaceMap;
};

// replace glossary terms in some MDX content
export const addGlossary = ({
  content,
  glossaryTerms,
  contentType = "html",
}) => {
  if (!content) return content;
  const tooltipFunction =
    contentType === "html" ? getHtmlTooltip : getMarkdownTooltip;

  const valueMap = buildReplaceMap(tooltipFunction, glossaryTerms);

  const tagNames = Array.from(
    new Set(glossaryTerms.map((t) => t.tagName).filter(Boolean))
  );

  try {
    if (contentType === "markdown") {
      const tree = fromMarkdown(content, {
        extensions: [syntax({ acorn: acorn }), mdxMd],
        mdastExtensions: [mdxJsx.fromMarkdown],
      });

      findAndReplaceMd(tree, valueMap);

      const out = toMarkdown(tree, {
        bullet: "-",
        //ruleSpaces: true,
        extensions: [mdxJsx.toMarkdown],

        listItemIndent: "one",
      }).trim();
      return out;
    } else {
      const result = new HtmlParser({
        decodeEntities: false,
        ignoreFirstLf: false,
        selfClosingElements: true,
      }).parse(content);

      const tree = fromWebparser(result.rootNodes);

      findAndReplaceHtml(tree, valueMap, {
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
    }
  } catch (e) {
    console.log(`Cannot parse content`, contentType, e.message);
    console.log("e", e);
    console.log(content.slice(0, 100) + "...");
    return content;
  }
};
