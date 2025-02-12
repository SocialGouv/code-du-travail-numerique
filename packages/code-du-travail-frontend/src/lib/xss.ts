import xss, { escapeAttrValue } from "xss";

/**
 * List of tags that are allowed in the HTML
 * @type {string[]}
 * webcomponent-tooltip is used as an overlay for the definition of the words
 */
const whiteListTags = ["webcomponent-tooltip", "webcomponent-tooltip-cc"];

/**
 * List of attributes that are allowed for the tags scan in the HTML
 * @type {string[]}
 * class is used for modeles-de-courrier
 */
const whiteListAttr = [
  "class",
  "rel",
  "href",
  "target",
  "data-pdf",
  "data-pdf-size",
  "data-infographic",
];

export const xssWrapper = (text: string): string => {
  return xss(text, {
    onIgnoreTag: function (tag, html, _options) {
      if (whiteListTags.some((whiteTag) => whiteTag === tag)) {
        return html;
      }
    },
    onTagAttr: function (_tag, name, value, _isWhiteAttr) {
      if (whiteListAttr.some((whiteAttr) => whiteAttr === name)) {
        return name + '="' + escapeAttrValue(value) + '"';
      }
    },
  });
};
