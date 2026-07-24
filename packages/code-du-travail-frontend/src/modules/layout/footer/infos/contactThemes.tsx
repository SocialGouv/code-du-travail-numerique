import { fr } from "@codegouvfr/react-dsfr";
import { ReactNode } from "react";
import Link from "src/modules/common/Link";

// Thèmes proposés à l'écran « Précisez votre question ». Seul `secteur-prive`
// relève des services de renseignement en droit du travail (SRDT) et mène au
// numéro de téléphone ; les autres sont hors périmètre et mènent à un message de
// redirection. Le mapping est piloté par la donnée pour rester extensible quand
// d'autres canaux seront ajoutés.
export type ThemeKey =
  | "secteur-prive"
  | "indemnisation-arret"
  | "cotisations-salaire"
  | "secteur-public"
  | "autorisation-travail-etranger";

export type ContactTheme = {
  key: ThemeKey;
  label: string;
};

export const CONTACT_THEMES: ContactTheme[] = [
  {
    key: "secteur-prive",
    label: "Question de droit du travail dans le secteur privé",
  },
  {
    key: "indemnisation-arret",
    label: "Indemnisation de l'arrêt de travail ou invalidité",
  },
  { key: "cotisations-salaire", label: "Cotisations sur salaire" },
  { key: "secteur-public", label: "Secteur public" },
  {
    key: "autorisation-travail-etranger",
    label: "Autorisation de travail d'un étranger",
  },
];

// Seul thème traité par les SRDT.
export const SRDT_THEME = "secteur-prive" as const;

export type OffScopeThemeKey = Exclude<ThemeKey, typeof SRDT_THEME>;

export const isOffScopeTheme = (theme: ThemeKey): theme is OffScopeThemeKey =>
  theme !== SRDT_THEME;

// Numéro des services de renseignement en droit du travail.
export const SRDT_PHONE = {
  display: "0 806 000 126",
  href: "tel:0806000126",
} as const;

const ExternalLink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={fr.cx("fr-link")}
  >
    {children}
  </Link>
);

// Messages affichés quand le thème sélectionné ne relève pas des SRDT. Rendus
// comme ReactNode car ils embarquent des liens de redirection (nouvel onglet).
export const OFF_SCOPE_THEME_MESSAGES: Record<OffScopeThemeKey, ReactNode> = {
  "secteur-public": (
    <>
      Votre demande concerne le secteur public : elle ne relève pas des services
      de renseignements en droit du travail. Pour obtenir des informations,
      consultez le site{" "}
      <ExternalLink href="https://www.service-public.fr">
        service-public.fr
      </ExternalLink>
      , le site{" "}
      <ExternalLink href="https://www.fonction-publique.gouv.fr">
        fonction-publique.gouv.fr
      </ExternalLink>
      , ou rapprochez-vous de vos organisations syndicales.
    </>
  ),
  "autorisation-travail-etranger": (
    <>
      Votre demande concerne la main-d&apos;œuvre étrangère : elle ne relève pas
      des services de renseignements en droit du travail. Pour obtenir des
      informations, contactez le{" "}
      <Link href="tel:0806001620">0 806 001 620</Link> ou rendez-vous sur la
      plateforme régionale accessible sur{" "}
      <ExternalLink href="https://administration-etrangers-en-france.gouv.fr">
        administration-etrangers-en-france.gouv.fr
      </ExternalLink>
      .
    </>
  ),
  "indemnisation-arret": (
    <>
      Votre demande ne relève pas des services de renseignements en droit du
      travail. Pour obtenir des informations, rapprochez-vous de votre caisse
      d&apos;assurance maladie ou rendez-vous sur le site internet{" "}
      <ExternalLink href="https://www.ameli.fr/assure/adresses-et-contacts/un-autre-sujet">
        ameli.fr
      </ExternalLink>
      .
    </>
  ),
  "cotisations-salaire": (
    <>
      Votre demande ne relève pas des services de renseignements en droit du
      travail. Pour obtenir des informations, rapprochez-vous de l&apos;
      <ExternalLink href="https://www.urssaf.fr/accueil/contacter-urssaf.html">
        URSSAF
      </ExternalLink>
      .
    </>
  ),
};

// Questions les plus fréquentes, affichées à l'écran 1 pour permettre à
// l'usager de trouver sa réponse avant de contacter les services. Liens internes
// CDTN (navigation client-side).
export const FREQUENT_QUESTIONS: { label: string; href: string }[] = [
  {
    label: "Calculer l'indemnité de licenciement",
    href: "/contribution/outils/indemnite-licenciement",
  },
  {
    label: "Calculer l'indemnité de précarité",
    href: "/outils/indemnite-precarite",
  },
  {
    label: "Quelle est la durée du préavis en cas de démission ?",
    href: "/contribution/quelle-est-la-duree-du-preavis-en-cas-de-demission",
  },
  {
    label: "En cas d'arrêt maladie, quel maintien de salaire ?",
    href: "/contribution/en-cas-darret-maladie-du-salarie-lemployeur-doit-il-assurer-le-maintien-de-salaire",
  },
  {
    label:
      "Quelle rémunération ou repos compensateur des heures supplémentaires ?",
    href: "/contribution/heures-supplementaires",
  },
];
