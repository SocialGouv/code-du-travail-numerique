const matchers = [
  "convention collective",
  "conventions collectives",
  "accords de branches",
  "accord de branche",
  "disposition conventionnelle",
  "dispositions conventionnelles",
];

function execOne(htmlContent, match) {
  const re = new RegExp(match, "g");
  return htmlContent.replace(re, `<span data-tooltip-ref="cc">${match}</span>`);
}

function addTags(htmlContent) {
  return matchers.reduce((updatedContent, match) => {
    return execOne(updatedContent, match);
  }, htmlContent);
}

module.exports = { addTags };
