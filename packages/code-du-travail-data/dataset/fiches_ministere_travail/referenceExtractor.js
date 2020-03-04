const treebank = require("talisman/tokenizers/words/treebank");

const NEGATIVE = "O";
const ARTICLE = "B-ART";
const CODE_PREFIX = "B-COD";
// code du travail
const CODE_TRA = CODE_PREFIX + "_TRA";
// code sécurité sociale
const CODE_SS = CODE_PREFIX + "_SS";

const codesFullNames = {
  [CODE_SS]: {
    name: "code de la sécurité sociale",
    id: "LEGITEXT000006073189"
  },
  [CODE_TRA]: {
    name: "code du travail",
    id: "LEGITEXT000006072050"
  }
};

// maximum distance between code tokens and corresponding article ref
const range = 20;

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

function infixMatcher(token) {
  // this is quite subtle...
  return ["à", "à"].includes(token);
}

// classify sequence of tokens to identify references to articles
function classifyTokens(tokens) {
  // step 1 : check for prefix matchs or articles
  const step1 = tokens.map(token => {
    const prefix = prefixMatcher(token);
    const infix = infixMatcher(token);
    const article = articleMatcher(token);

    if (prefix > 0) {
      return prefix;
    } else if (article) {
      return 3;
    } else if (infix) {
      return 4;
    } else {
      return 0;
    }
  });

  // step 2 : confirm valid sequences
  // hack : we keep a buffer as last element of the accumulator
  const predictions = step1.reduce(
    (acc, e) => {
      const buffer = acc[acc.length - 1];
      const inSequence = buffer.length > 0;
      const lastElement = buffer[buffer.length - 1];

      // case continue existing
      if (e >= 1 && inSequence) {
        buffer.push(e);
      }

      // case finish existing
      else if (e == 0 && inSequence && lastElement > 1) {
        acc.pop();
        // push buffer
        buffer.forEach(() => acc.push(true));
        // push for current
        acc.push(false);

        acc.push([]);
      }

      // case start (valid start are 1 or 2, as 3 is number only without prefix)
      else if (e > 0 && e < 3 && !inSequence) {
        buffer.push(e);
      }

      // other cases, flush buffer and append current
      else {
        acc.pop();
        acc.push(...buffer.map(() => false));
        acc.push(false);
        acc.push([]);
      }

      return acc;
    },
    [[]]
  );
  // conclude
  const residual = predictions.pop();
  // if ends with bigger than 1, then add residual as true
  if (residual.length > 0 && residual[residual.length - 1] > 1) {
    predictions.push(...residual.map(() => true));
  } else {
    predictions.push(...residual.map(() => false));
  }

  return predictions.map(p => (p ? ARTICLE : NEGATIVE));
}

function identifyCodes(tokens, predicitions) {
  // we look for "code" tokens (starting a code reference)
  const matchCode = tokens.map((token, i) => {
    return token.toLowerCase() == "code" ? CODE_PREFIX : predicitions[i];
  });

  // we search for entire code references
  const resolvedCodePreds = matchCode.map((pred, i) => {
    if (pred == CODE_PREFIX) {
      const joinedNextTokens = tokens
        .slice(i, i + 5)
        .join(" ")
        .toLowerCase();
      if (joinedNextTokens.startsWith(codesFullNames[CODE_SS].name)) {
        return CODE_SS;
      } else if (joinedNextTokens.startsWith(codesFullNames[CODE_TRA].name)) {
        return CODE_TRA;
      } else {
        return NEGATIVE;
      }
    } else {
      return pred;
    }
  });

  return resolvedCodePreds;
}

// extract references from free text : tokenize and classify
function extractReferences(text) {
  const tokens = treebank(text);
  let predictions = classifyTokens(tokens);
  predictions = identifyCodes(tokens, predictions);

  // console.log(tokens);
  // console.log(predictions);

  // group continuous positives tokens and set code
  // while contnuous match, merge
  // if code, then associate it to articles within range
  return tokens
    .map((token, index) => {
      return { token, index, pred: predictions[index] };
    })
    .reduce((acc, { token, index, pred }) => {
      // case article we start or merge
      if (pred == ARTICLE) {
        if (acc.length == 0) {
          acc.push({ token, index });
        } else {
          const last = acc[acc.length - 1];
          // case continuous : we merge
          if (last.index + 1 == index) {
            last.token = `${last.token} ${token}`;
            last.index = index;
          } else {
            acc.push({ token, index });
          }
        }
      }
      // case code, we associate it to articles within range
      else if (pred.startsWith(CODE_PREFIX) && acc.length > 0) {
        acc.forEach(match => {
          // if no code yet and in range
          if (!match.code && match.index + range >= index) {
            match.code = codesFullNames[pred];
          }
        });
      }

      return acc;
    }, [])
    .map(({ token, code }) => {
      return { article: token, code };
    });
}

module.exports = { classifyTokens, extractReferences, codesFullNames };
