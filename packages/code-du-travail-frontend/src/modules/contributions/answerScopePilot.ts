import { removeCCNumberFromSlug } from "../utils/removeCCNumberFromSlug";
import { GENERIC_CONTENT_HASH } from "./contributionUtils";
import type { Contribution } from "./type";

// Test « citation correcte de nos contributions » (#7493) : sur quelques pages
// pilotes, la portée de la réponse (Code du travail vs convention collective)
// est écrite en clair dans la page et dans le JSON-LD, pour que les moteurs de
// réponse IA la citent avec la bonne nuance. Les pages témoins, laissées
// intactes, ne figurent volontairement pas ici.
//
// Le ciblage est une simple liste en dur : retirer une entrée (ou tout le
// fichier) rend la page à son comportement d'origine.

/** Disclaimer : le lien est inséré entre `before` et `after`. */
export type AnswerScopeDisclaimer = {
  before: string;
  linkLabel: string;
  linkHref: string;
  after: string;
};

type AnswerScopePilotPage = {
  disclaimer: AnswerScopeDisclaimer;
  // Précise la portée de l'Article dans le JSON-LD.
  disambiguatingDescription: string;
  // Chemins de suivi Matomo de la page (avec ou sans « / » initial).
  trackingPathPattern: RegExp;
};

type AnswerScopePilot = {
  genericSlug: string;
  generic: AnswerScopePilotPage;
  agreement: AnswerScopePilotPage & { idcc: string };
};

const GENERIC_CDT_DESCRIPTION =
  "Réponse d'après le Code du travail, applicable en l'absence de dispositions conventionnelles plus favorables.";

const genericHref = (slug: string) =>
  `/contribution/${slug}${GENERIC_CONTENT_HASH}`;

const ALTERNANTS_SLUG = "quel-est-le-salaire-minimum-dun-alternant-en-2026";
const CONGES_SLUG = "les-conges-pour-evenements-familiaux";

const ANSWER_SCOPE_PILOTS: AnswerScopePilot[] = [
  {
    genericSlug: ALTERNANTS_SLUG,
    generic: {
      disclaimer: {
        before: "Sauf ",
        linkLabel: "dispositions conventionnelles",
        linkHref: "/outils/convention-collective",
        after:
          " plus favorables, le salaire minimum d’un apprenti est fixé par la loi, en fonction de son âge et de son évolution dans le cycle de formation.",
      },
      disambiguatingDescription: GENERIC_CDT_DESCRIPTION,
      trackingPathPattern: new RegExp(`^/?contribution/${ALTERNANTS_SLUG}$`),
    },
    agreement: {
      idcc: "1518",
      disclaimer: {
        before:
          "Cette réponse s'applique aux entreprises relevant de la convention collective ÉCLAT (IDCC 1518). Le minimum légal du Code du travail, applicable en l'absence de convention collective, peut être différent, ",
        linkLabel: "voir la réponse générique",
        linkHref: genericHref(ALTERNANTS_SLUG),
        after: ".",
      },
      disambiguatingDescription:
        "Réponse spécifique à la convention collective ÉCLAT (IDCC 1518) ; le Code du travail peut prévoir des règles différentes.",
      trackingPathPattern: new RegExp(
        `^/?contribution/1518-${ALTERNANTS_SLUG}$`
      ),
    },
  },
  {
    genericSlug: CONGES_SLUG,
    generic: {
      disclaimer: {
        before:
          "Les informations présentes sur cette page sont issues du Code du travail. D’autres textes ou votre contrat de travail peuvent également prévoir des règles spécifiques sur ce sujet qui s’appliqueront à condition d’être au moins aussi favorables que le Code du travail.",
        linkLabel: "",
        linkHref: "",
        after: "",
      },
      disambiguatingDescription: GENERIC_CDT_DESCRIPTION,
      trackingPathPattern: new RegExp(`^/?contribution/${CONGES_SLUG}$`),
    },
    agreement: {
      idcc: "3239",
      disclaimer: {
        before:
          "Cette réponse s'applique aux entreprises relevant de la convention collective des Particuliers employeurs et emploi à domicile (IDCC 3239). Le nombre de congés alloués par le code du travail peut être différent, ",
        linkLabel: "voir la réponse générique",
        linkHref: genericHref(CONGES_SLUG),
        after: ".",
      },
      disambiguatingDescription:
        "Réponse spécifique à la convention collective des Particuliers employeurs et emploi à domicile (IDCC 3239) ; le Code du travail peut prévoir des règles différentes.",
      // Arbre « congés » : /contribution/<slug>/<idcc>[-<slug de la CC>].
      trackingPathPattern: new RegExp(
        `^/?contribution/${CONGES_SLUG}/3239(-.*)?$`
      ),
    },
  },
];

export type AnswerScopePilotConfig = AnswerScopePilotPage & {
  // Convention collective de la page, absente sur la page mère.
  idcc?: string;
};

/** Configuration de la page pilote correspondant à la contribution, sinon `undefined`. */
export const getAnswerScopePilot = (
  contribution: Contribution
): AnswerScopePilotConfig | undefined => {
  if (contribution.isGeneric) {
    return ANSWER_SCOPE_PILOTS.find(
      ({ genericSlug }) => genericSlug === contribution.slug
    )?.generic;
  }
  const genericSlug = removeCCNumberFromSlug(contribution.slug);
  const pilot = ANSWER_SCOPE_PILOTS.find((p) => p.genericSlug === genericSlug);
  if (!pilot || pilot.agreement.idcc !== contribution.idcc) return undefined;
  return pilot.agreement;
};

/** Texte brut du disclaimer, tel que lu par l'usager (repris à l'identique dans le JSON-LD). */
export const answerScopeDisclaimerText = ({
  before,
  linkLabel,
  after,
}: AnswerScopeDisclaimer): string => `${before}${linkLabel}${after}`;

/**
 * Le chemin de suivi Matomo correspond-il à une page pilote ? Sert à router les
 * events du funnel de choix de CC vers `cc_search_funnel_test`, pour ne pas
 * mélanger les pilotes (contenu visible d'emblée) au funnel historique.
 */
export const isAnswerScopePilotPath = (path: string): boolean => {
  const clean = path.split(/[?#]/)[0];
  return ANSWER_SCOPE_PILOTS.some(({ generic, agreement }) =>
    [generic, agreement].some(({ trackingPathPattern }) =>
      trackingPathPattern.test(clean)
    )
  );
};
