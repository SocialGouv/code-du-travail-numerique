import { token } from "@styled-system/tokens";
import { getIdccByQuery } from "../../idcc";
import {
  articleMatcher,
  classifyTokens,
  extractReferences,
} from "./referenceExtractor";
import { extractHits } from "./search";
import { complex } from "talisman/stemmers/french/unine";
import fingerprint from "talisman/tokenizers/fingerprint";

const keyword_std = [
  "a conservatoir mise pied",
  "a convoc disciplinair entretien prealabl sanction une",
  "a de depart indemnit la retrait",
  "a de depart la prim retrait",
  "a lamiabl ruptur",
  "a mise pied",
  "acident de trajet",
  "acord dentrepris",
  "acquis aret cong malad paye pendant",
  "acquis cong paye",
  "afichag obligatoir",
  "alait",
  "alternanc contrat daprentisag et",
  "amenag de du post travail",
  "ancienet",
  "aprentisag",
  "aret de maintien malad salair",
  "aret de travail",
  "aret malad",
  "atest de travail",
  "au avenant contrat de travail",
  "au harcel moral travail",
  "au inaptitud travail",
  "averti",
  "calcul compt de sold tout",
  "carenc cdd de delai",
  "cdd contrat",
  "cdd renouvel",
  "cdi convention ruptur",
  "cdi demision",
  "cdi preavi",
  "certificat de travail",
  "claus concurenc de non",
  "compens repo",
  "complementair heur",
  "compt de sold tout",
  "cong dancienet",
  "cong dece",
  "cong dece grand parent pour",
  "cong enfant malad",
  "cong et fraction paye",
  "cong et malad paye",
  "cong et mi paye temp therapeut",
  "cong even familial les pour",
  "cong exception",
  "cong parental",
  "cong paternit",
  "cong san sold",
  "contrat de delai document fin",
  "cse",
  "cse entrepris",
  "csp",
  "dan du le paie retard salair",
  "dancienet prim",
  "de delai desai et period prevenanc ruptur",
  "de delai desai period prevenanc",
  "de deleg heur",
  "de demision du dure preavi",
  "de demision letr",
  "de deplac domicil frai trajet travail",
  "de et maintien malad salair",
  "de fich paie",
  "de frai indemnit repa",
  "de gril salair",
  "de indemnit licenc",
  "de letr licenc model type",
  "de paus temp",
  "dece employeu",
  "demenag",
  "dimanch le travail",
  "disciplinair pouvoi",
  "du dure preavi",
  "enfant malad",
  "et mutuel retrait",
  "faut licenc pour",
  "fer jour travail",
  "harcel moral",
  "heur non paye suplementair",
  "impay salair",
  "indemnit licenc",
  "indemnit repa",
  "medical travail visit",
  "minimum salair",
  "mitemp therapeut",
  "preavi",
  "prevoyanc",
  "retard",
  "syntec",
];

export const CC_SCORE_THRESHOLD = 20;

export enum LabelEnum {
  CC = "cc",
  CC_FOUND = "cc_found",
  KEYWORD = "keyword",
  KEYWORD_STD = "keyword_standard",
  ARTICLE = "article",
  THEME = "theme",
  NATURAL = "natural",
}

export const LABELS = Object.values(LabelEnum);

export type StructuredQueryLabel = {
  label: LabelEnum;
  details?: string;
  score?: number;
};

const matchingCC = [
  "convention",
  "collective",
  "collectif",
  "national",
  "branche",
  "idcc",
  "ccn",
];

// const getTokens()
// const tokenDiff

// remove

const ccSearch = async (query): Promise<StructuredQueryLabel | undefined> => {
  const idccResults = await getIdccByQuery(query, 1);

  const hits = extractHits(idccResults);

  //   console.log({ query });
  //   console.log({ hits });

  if (hits.length > 0 && (hits[0]["_score"] || 0) > CC_SCORE_THRESHOLD) {
    const hit = hits[0];
    return {
      label: LabelEnum.CC_FOUND,
      details: hit["_source"]["slug"],
      score: hit["_score"] || undefined,
    };
  }
};

const isNumToken = (token) =>
  // TODO make use of a curated list of idcc valid codes
  !isNaN(token) && !isNaN(parseFloat(token)) && parseFloat(token) > 10;

const isCC = async (query: string) => {
  const tokens = fingerprint(query);

  if (
    matchingCC.find((t) => tokens.includes(t))?.length ||
    tokens.find(isNumToken)
  ) {
    const remainingTokens = Array.from([
      ...tokens.filter((t) => !matchingCC.includes(t)),
    ]);

    // in case we find a number, we assume idcc search and remove other tokens to avoid noise
    // otherwise, we run search with all non-matchingCC tokens
    const searchTokens = remainingTokens.find(isNumToken)
      ? remainingTokens.filter(isNumToken)
      : remainingTokens;

    // TODO remove "theme"-like tokens when performing CC search
    // or only select tokens that appear in all conventions titles

    const found = await ccSearch(searchTokens.join(" "));
    return (
      found ||
      (tokens.find(isNumToken)
        ? undefined
        : {
            label: LabelEnum.CC,
            details: `cc related content, but no match ${searchTokens.join(" ")}`,
          })
    );
  } else {
    const foundNoCC = ccSearch(query);
    return foundNoCC;
  }
};

const getStandardKeyword = (pQuery: string[]) =>
  keyword_std.includes(pQuery.join(" "))
    ? { label: LabelEnum.KEYWORD_STD }
    : undefined;

const getArticles = (query): StructuredQueryLabel[] | undefined => {
  // proper references
  let refs = extractReferences(query);
  if (refs.length < 1) {
    // first token matching regex
    const match = articleMatcher(query.split(" ")[0]);
    if (match) {
      refs.push(match);
    }
  }
  return refs.length > 0
    ? refs.map((r) => ({ label: LabelEnum.ARTICLE, details: r.text }))
    : undefined;
};

const prepro = (token: string): string[] => fingerprint(token).map(complex);

const getThemes = (pQuery: string[], themes: string[]) => {
  //   console.log({ query, themes });

  const pThemes = themes.map((theme) => ({ theme, pTheme: prepro(theme) }));

  let match = pThemes.find((th) => th.pTheme == pQuery);
  if (!match) {
    // in this case, we should select the highest one in the hierarchy
    match = pThemes.find((th) => pQuery.every((to) => th.pTheme.includes(to)));
  }
  return match ? { label: LabelEnum.THEME, details: match.theme } : undefined;
};

const isNatural = (query: string) => {
  const tokens = fingerprint(query);
  const matching = [
    "comment",
    "combien",
    "quand",
    "je",
    "nous",
    "me",
    "il",
    "doit",
    "quel",
    "quels",
    "on",
  ];
  return (
    query.includes("?") ||
    matching.find((m) => tokens.includes(m)) ||
    tokens.length >= 8
  );
};

export const parseQuery = async (query: string, themes: string[]) => {
  const results: StructuredQueryLabel[] = [];

  const pQuery = prepro(query);

  const cc = await isCC(query);
  if (cc) {
    results.push(cc);
  }

  const articles = getArticles(query);
  if (articles?.length) {
    results.push(...articles);
  }

  const matchingTheme = getThemes(pQuery, themes);
  if (matchingTheme) {
    results.push(matchingTheme);
  }

  const matchingStd = getStandardKeyword(pQuery);
  if (matchingStd) {
    results.push(matchingStd);
  }

  if (results.length == 0) {
    const natural = isNatural(query);
    results.push({
      label: natural ? LabelEnum.NATURAL : LabelEnum.KEYWORD,
      details: query,
    });
  }

  if (results[0].label == LabelEnum.CC && results.length > 1) {
    results.pop();
  }

  return { nq: pQuery, results };
};
