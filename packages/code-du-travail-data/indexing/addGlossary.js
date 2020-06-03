import { v4 as uuidv4 } from "uuid";
const entries = require("@socialgouv/datafiller-data/data/glossary.json");

const conventionMatchers = [
  "convention collective",
  "conventions collectives",
  "accords de branches",
  "accord de branche",
  "disposition conventionnelle",
  "dispositions conventionnelles",
];

// we cannot use \b word boundary since \w does not match diacritics
// So we do a kind of \b equivalent.
// the main différence is that matched pattern can include a whitespace as first char
const frDiacritics = "àâäçéèêëïîôöùûüÿœæÀÂÄÇÉÈÊËÎÏÔÖÙÛÜŸŒÆ";
const wordBoundaryStart = `(?:^|[^_/\\w${frDiacritics}-])`;
const wordBoundaryEnd = `(?![\\w${frDiacritics}])`;

export function addGlossary(htmlContent) {
  if (!htmlContent) return "";

  let uuidHtmlContent = htmlContent;

  let glossary = [];
  entries.forEach(({ abbrs, definition, title, variants }) => {
    glossary = glossary.concat(
      [title, ...variants].map((term) => ({
        definition,
        pattern: new RegExp(
          `${wordBoundaryStart}(${term})${wordBoundaryEnd}`,
          "gi"
        ),
        term,
      }))
    );
    if (abbrs) {
      glossary.push({
        definition,
        pattern: new RegExp(`\\b(${abbrs})\\b`, "g"),
        term: abbrs,
      });
    }
  });

  const uuidToWebComponent = new Map();

  glossary
    // we make sure that bigger terms are replaced first
    .sort((previous, next) => next.term.length - previous.term.length)
    .forEach(({ definition, pattern }) => {
      // while we loop, we replace the matches with uuid to prevent nested matches
      uuidHtmlContent = uuidHtmlContent.replace(pattern, function (
        match, // contains the matching term with the word boundaries
        term // contains only the matching term
      ) {
        const uuid = "__tt__" + uuidv4();
        const webComponent = conventionMatchers.includes(term)
          ? `<webcomponent-tooltip-cc>${term}</webcomponent-tooltip-cc>`
          : `<webcomponent-tooltip content="${encodeURI(
              definition.replace("<p>", "").replace("</p>", "")
            )}">${term}</webcomponent-tooltip>`;

        uuidToWebComponent.set(uuid, webComponent);
        return match.replace(new RegExp(term), uuid);
      });
    });

  // In the end, we replace the uuid with its related component
  let finalContent = uuidHtmlContent;
  uuidToWebComponent.forEach((webComponent, uuid) => {
    finalContent = finalContent.replace(new RegExp(uuid, "g"), webComponent);
  });

  return finalContent;
}
