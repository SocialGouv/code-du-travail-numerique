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

  let idHtmlContent = htmlContent;

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

  const idToWebComponent = new Map();

  // we make sure that bigger terms are replaced first
  const sortedGlossary = glossary.sort((previous, next) => {
    return next.term.length - previous.term.length;
  });

  // we also sure that cc matchers are replaced first
  conventionMatchers.forEach((matcher) => {
    sortedGlossary.unshift({
      definition: false,
      pattern: new RegExp(
        `${wordBoundaryStart}(${matcher})${wordBoundaryEnd}`,
        "gi"
      ),
      term: matcher,
    });
  });

  sortedGlossary.forEach(({ definition, pattern }, index) => {
    // while we loop, we replace the matches with uuid to prevent nested matches
    idHtmlContent = idHtmlContent.replace(pattern, function (
      match, // contains the matching term with the word boundaries
      term // contains only the matching term
    ) {
      const id = "__tt__" + index;
      const webComponent = definition
        ? `<webcomponent-tooltip content="${encodeURI(
            definition.replace("<p>", "").replace("</p>", "")
          )}">${term}</webcomponent-tooltip>`
        : `<webcomponent-tooltip-cc>${term}</webcomponent-tooltip-cc>`;

      idToWebComponent.set(id, webComponent);
      return match.replace(new RegExp(term), id);
    });
  });

  // In the end, we replace the uuid with its related component
  let finalContent = idHtmlContent;
  idToWebComponent.forEach((webComponent, id) => {
    finalContent = finalContent.replace(new RegExp(id, "g"), webComponent);
  });

  return finalContent;
}
