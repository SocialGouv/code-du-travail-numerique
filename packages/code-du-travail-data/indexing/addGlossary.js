import { v4 as uuidv4 } from "uuid";
const glossary = require("@socialgouv/datafiller-data/data/glossary.json");

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

  let formatedContent = htmlContent;
  const uuidToWebComponent = new Map();

  glossary.forEach(({ abbrs, title, definition, variants }) => {
    const patterns = [title, ...variants].map(
      (term) =>
        new RegExp(`${wordBoundaryStart}(${term})${wordBoundaryEnd}`, "gi")
    );
    if (abbrs) {
      patterns.push(new RegExp(`\\b(${abbrs})\\b`, "g"));
    }

    patterns.forEach((pattern) => {
      // while we loop, we replace the matches with uuid to prevent nested matches
      formatedContent = formatedContent.replace(pattern, function (
        match, // contains the matching term with the word boundaries
        term // contains only the matching term
      ) {
        const uuid = "__tt__" + uuidv4();
        const webComponent = conventionMatchers.includes(term)
          ? `<webcomponent-tooltip-cc>${term}</webcomponent-tooltip-cc>`
          : `<webcomponent-tooltip content="${encodeURI(
              definition
            )}">${term}</webcomponent-tooltip>`;

        uuidToWebComponent.set(uuid, webComponent);
        return match.replace(new RegExp(term), uuid);
      });
    });
  });

  // In the end, we replace the uuid with its related component
  let finalContent = formatedContent;
  Array.from(uuidToWebComponent).forEach(([uuid, webComponent]) => {
    finalContent = finalContent.replace(new RegExp(uuid, "g"), webComponent);
  });

  return finalContent;
}
