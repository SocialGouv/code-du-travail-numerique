const range = require("get-range");

function sum(a, b) {
  return a + b;
}

function percent(value) {
  return `${Math.round(value * 10000) / 100}%`;
}

function computeScore(expectedResultsUrl, actualResulstUrl) {
  // compute distance between expexted rank and actual rank for a given result
  const distances = expectedResultsUrl.filter(Boolean).map((url, index) => {
    const position = actualResulstUrl.indexOf(url);
    return position > -1 ? Math.abs(index - position) : null;
  }, []);
  return (
    distances
      .map(d => (d !== null ? 1 - d * 0.1 : 0)) // each ditance unit is corresponding to a malus of 10%
      .reduce(sum, 0) / distances.length
  );
}

function computeLineScore(line, hits) {
  const resultsUrl = hits.map(
    result =>
      result._source.url || `${result._source.source}/${result._source.slug}`
  );
  const expectedValues = [...range(1, 6)].map(i => line[`Expected_${i}`]);

  const resultsRank = expectedValues.reduce((state, url, i) => {
    const position = resultsUrl.indexOf(url);
    state[`Actual_Rank${i + 1}`] = position > -1 ? position + 1 : "";
    return state;
  }, {});

  const foundResults = Object.values(resultsRank).filter(Boolean);
  const foundExpected = expectedValues.filter(Boolean);
  const countResults = `${foundResults.length}/${foundExpected.length}`;

  const urlsObj = resultsUrl.reduce((state, url, index) => {
    state[`url_${index}`] = url;
    return state;
  }, {});

  const score = computeScore(expectedValues, resultsUrl);
  const prevScore = parseFloat(line.score, 10) || 0;
  const diffScore = score - prevScore;
  return {
    ...line,
    prevScore,
    score,
    diffScore,
    countResults,
    ...resultsRank,
    ...urlsObj
  };
}

function printResultsAbstract(results) {
  const prevScore = results.map(item => item.prevScore || 0).reduce(sum, 0);
  const globalScore = results.map(item => item.score).reduce(sum, 0);
  const sign = globalScore > prevScore ? "+" : "-";
  return `\`\`\`diff
    master     PR      +/-
==========================================
${sign}   ${percent(prevScore / results.length)}      ${percent(
    globalScore / results.length
  )}      ${percent((globalScore - prevScore) / results.length)}
==========================================
\`\`\`
  `;
}

function printResultsDetails(results) {
  const emoji = (prev, next) =>
    next > prev
      ? ":chart_with_upwards_trend:"
      : next < prev
        ? ":chart_with_downwards_trend:"
        : ":heavy_minus_sign:";
  const output = results
    .map(
      ({ Request, prevScore, score, diffScore }) =>
        `| ${Request} | \`  ${percent(prevScore)} <${percent(
          score
        )}> (${percent(diffScore)})\` | ${emoji(prevScore, score)} |`
    )
    .join("\n");
  return `| file | Δ |  |
|---|---|---|
${output}`;
}

module.exports = {
  sum,
  percent,
  computeScore,
  computeLineScore,
  printResultsAbstract,
  printResultsDetails
};
