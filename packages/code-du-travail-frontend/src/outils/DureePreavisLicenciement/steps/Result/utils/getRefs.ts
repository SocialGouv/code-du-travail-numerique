import { Situations } from "./types";
import { OldReference } from "../../../../publicodes";

export const getRefs = ({ legal, agreement }: Situations): OldReference[] => {
  const refs: OldReference[] = [];
  if (legal) {
    refs.push({
      ref: "Article L.1234-1 du code du travail",
      refUrl:
        "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000006901112&cidTexte=LEGITEXT000006072050&dateTexte=20080501",
    });
  }
  if (agreement) {
    if (agreement.ref && agreement.refUrl) {
      refs.push({ ref: agreement.ref, refUrl: agreement.refUrl });
    }
    if (agreement.ref2 && agreement.ref2Url) {
      refs.push({ ref: agreement.ref2, refUrl: agreement.ref2Url });
    }
  }
  return refs;
};
