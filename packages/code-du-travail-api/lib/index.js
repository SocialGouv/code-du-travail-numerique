function sum(a, b) {
  return a + b;
}

function percent(value) {
  return `${Math.round(value * 10000) / 100}%`;
}

function computeScore(expectedResultsUrl, actualResulstUrl) {
  // compute distance between expexted rank and actual rank for a given result
  const distances = expectedResultsUrl.map((url, index) => {
    const position = actualResulstUrl.indexOf(url);
    return position > -1 ? Math.abs(index - position) : null;
  }, []);
  return (
    distances
      .map(d => (d !== null ? Math.max(1 - d * 0.1, 0) : 0)) // each ditance unit is corresponding to a malus of 10%
      .reduce(sum, 0) / distances.length
  );
}

function computeLineScore({
  query,
  previousResults = {},
  expectedResults,
  hits
}) {
  const resultsUrl = hits.map(
    result => `/${result._source.source}/${result._source.slug}`
  );

  const resultsRank = expectedResults.filter(Boolean).map(url => {
    const position = resultsUrl.indexOf(url);
    return position > -1 ? position + 1 : "";
  });

  const numExpected = expectedResults;
  const found = `${resultsRank.length}/${numExpected.length}`;

  const score = computeScore(expectedResults, resultsUrl);
  const prevScore = parseFloat(previousResults.score, 10) || 0;
  const diffScore = score - prevScore;
  return {
    query,
    prevScore,
    score,
    diffScore,
    found
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
      ({ query, prevScore, score, diffScore }) =>
        `| ${query} | \`  ${percent(prevScore)} <${percent(score)}> (${percent(
          diffScore
        )})\` | ${emoji(prevScore, score)} |`
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
