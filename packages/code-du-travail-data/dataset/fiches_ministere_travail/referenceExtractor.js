const treebank = require("talisman/tokenizers/words/treebank");

const NEGATIVE = "O";
const POSITIVE = "B-ART";

const articleRegEx = new RegExp("^(\\d{1,4}(-\\d+){0,3})\\b"); //          nums        123 123-45 123-45-6 123-45-6-7
function articleMatcher(token) {
  return token.match(articleRegEx);
}

const validPrefix = ["l", "r", "d"];

// returns :
// 0 if not matching
// 1 if matching prefix only (L.)
// 2 if matching prefix and valid ref (L123.12)
function prefixMatcher(token) {
  const lowToken = token.toLowerCase();

  // if starts with possible prefix
  const matchingPrefix =
    validPrefix.filter(p => lowToken.startsWith(p)).length > 0;
  //   matchingPrefix ? console.log(matchingPrefix + "\t" + token) : undefined;
  if (matchingPrefix) {
    const residual = lowToken.slice(1);

    // case only L
    if (!residual.length) {
      return 1;
    } else {
      // case L.
      if (residual == ".") {
        return 1;
      } else {
        // case L.123-12
        if (residual.slice(0, 1) == "." && articleMatcher(residual.slice(1))) {
          return 2;
        }
        // case L.123-12
        else if (articleMatcher(residual.slice(1))) {
          return 2;
        }
      }
    }
  }
  // no match
  return 0;
}

// classify sequence of tokens to identify references to articles
function classifyTokens(tokens) {
  // step 1 : check for prefix matchs or articles
  const step1 = tokens.map(token => {
    const prefix = prefixMatcher(token);
    const article = articleMatcher(token);

    if (prefix > 0) {
      return prefix;
    } else if (article) {
      return 3;
    } else {
      return 0;
    }
  });

  //   console.log(tokens);
  //   console.log(step1);

  // step 2 : confirm valid sequences
  // hack : we keep a buffer as last element of the accumulator
  const predictions = step1.reduce(
    (acc, e) => {
      //   console.log(acc);
      //   console.log(e);
      const buffer = acc[acc.length - 1];
      const inSequence = buffer.length > 0;

      // case continue existing
      if (e > 1 && inSequence) {
        // console.log("case continue");
        buffer.push(e);
      }

      // case finish existing
      else if (e == 0 && inSequence && buffer[buffer.length - 1] > 1) {
        // console.log("case finish");
        acc.pop();
        // push buffer
        buffer.forEach(() => acc.push(true));
        // push for current
        acc.push(false);

        acc.push([]);
      }

      // case start
      else if (e != 0 && !inSequence) {
        // console.log("case start");
        buffer.push(e);
      }

      // other cases, flush buffer and append current
      else {
        // console.log("case other");
        // console.log(acc);
        acc.pop();
        // console.log(acc);
        acc.push(...buffer.map(() => false));
        // console.log(acc);
        acc.push(false);
        // console.log(acc);
        acc.push([]);
        // console.log(acc);
      }

      return acc;
    },
    [[]]
  );
  // conclude
  const residual = predictions.pop();
  // if ends with 2 then add residual as true
  if (residual.length > 0 && residual[residual.length - 1] > 1) {
    predictions.push(...residual.map(() => true));
  } else {
    predictions.push(...residual.map(() => false));
  }

  //   console.log("predicitions " + predictions);
  return predictions.map(p => (p ? POSITIVE : NEGATIVE));
}

// extract references from free text : tokenize and classify
function extractReferences(text) {
  const tokens = treebank(text);
  const predictions = classifyTokens(tokens);

  //   console.log(tokens);

  // group continuous positives tokens
  return tokens
    .map((token, index) =>
      predictions[index] != NEGATIVE ? { token, index } : undefined
    )
    .filter(f => f)
    .reduce((acc, e) => {
      if (acc.length == 0) {
        acc.push(e);
      } else {
        const last = acc[acc.length - 1];
        // case continuous
        if (last.index + 1 == e.index) {
          last.token = `${last.token} ${e.token}`;
          last.index = e.index;
        } else {
          acc.push(e);
        }
      }
      return acc;
    }, [])
    .map(e => e.token);
}

module.exports = { classifyTokens, extractReferences };
