import { SITE_URL } from "../../../config";
import { toIsoDateTimeParis } from "../../utils/date";

export const JSON_LD_IDS = {
  organization: "jsonld-government-organization",
  website: "jsonld-website",
  breadcrumbs: "jsonld-breadcrumbs",
  legislation: "jsonld-legislation",
  newsArticle: "jsonld-news-article",
  article: "jsonld-article",
} as const;

export const JSON_LD_ENTITY_IDS = {
  organization: `${SITE_URL}/#government-organization`,
  website: `${SITE_URL}/#website`,
} as const;

function toAbsoluteUrl(href: string): string {
  // Handles already-absolute URLs.
  if (/^https?:\/\//.test(href)) return href;
  const base = SITE_URL.endsWith("/") ? SITE_URL.slice(0, -1) : SITE_URL;
  const path = href.startsWith("/") ? href : `/${href}`;
  return `${base}${path}`;
}

export function buildGovernmentOrganizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    "@id": JSON_LD_ENTITY_IDS.organization,
    name: "Code du travail numérique",
    url: SITE_URL,
    logo: toAbsoluteUrl("/static/assets/img/logo.svg"),
  };
}

export function buildWebSiteWithSearchActionJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": JSON_LD_ENTITY_IDS.website,
    url: SITE_URL,
    name: "Code du travail numérique",
    inLanguage: "fr-FR",
    publisher: {
      "@id": JSON_LD_ENTITY_IDS.organization,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${toAbsoluteUrl("/recherche")}?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export type BreadcrumbItem = {
  label: string;
  href: string;
};

export function buildBreadcrumbListJsonLd({
  items,
  currentPageLabel,
  currentPageHref,
}: {
  items: BreadcrumbItem[];
  currentPageLabel: string;
  currentPageHref: string;
}): Record<string, unknown> {
  const list: BreadcrumbItem[] = [
    { label: "Accueil", href: "/" },
    ...items,
    { label: currentPageLabel, href: currentPageHref },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: list.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: toAbsoluteUrl(item.href),
    })),
  };
}

export type ContentThemeItem = {
  label: string;
  slug: string;
};

// Article schema.org représentant une page de contenu éditorial. Rattaché au
// site (`isPartOf`) et à son éditeur/auteur (le Code du travail numérique), daté
// (`datePublished`/`dateModified`), et décrit par son thème / sous-thème via
// `about`, `articleSection` et `keywords`. Complète le `BreadcrumbList` (le fil
// d'Ariane) sans le remplacer. Les libellés sont les titres COMPLETS (le libellé
// raccourci ne sert qu'à l'affichage des tags).
export function buildContentThemeJsonLd({
  name,
  url,
  datePublished,
  themes,
}: {
  name: string;
  url: string;
  datePublished?: string;
  themes: ContentThemeItem[];
}): Record<string, unknown> {
  const absoluteUrl = toAbsoluteUrl(url);
  const rootTheme = themes[0];
  // ISO 8601 avec heure (minuit Paris) et fuseau, cf. toIsoDateTimeParis.
  const isoDate = toIsoDateTimeParis(datePublished);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: name,
    url: absoluteUrl,
    mainEntityOfPage: absoluteUrl,
    inLanguage: "fr-FR",
    isPartOf: { "@id": JSON_LD_ENTITY_IDS.website },
    author: { "@id": JSON_LD_ENTITY_IDS.organization },
    publisher: { "@id": JSON_LD_ENTITY_IDS.organization },
    ...(isoDate ? { datePublished: isoDate, dateModified: isoDate } : {}),
    ...(rootTheme ? { articleSection: rootTheme.label } : {}),
    about: themes.map((theme) => ({
      "@type": "Thing",
      name: theme.label,
      url: toAbsoluteUrl(theme.slug),
    })),
    keywords: themes.map((theme) => theme.label),
  };
}

export function buildLegislationJsonLd({
  name,
  url,
  identifier,
  datePublished,
  isBasedOn,
}: {
  name: string;
  url: string;
  identifier?: string;
  datePublished?: string;
  isBasedOn?: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Legislation",
    name,
    url: toAbsoluteUrl(url),
    ...(identifier
      ? {
          legislationIdentifier: identifier,
          identifier,
        }
      : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(isBasedOn ? { isBasedOn } : {}),
    publisher: {
      "@id": JSON_LD_ENTITY_IDS.organization,
    },
    inLanguage: "fr-FR",
    legislationJurisdiction: "FR",
  };
}

// NewsArticle schema.org d'une actualité. La date stockée (`JJ/MM/AAAA` saisie
// dans l'admin) est convertie en ISO 8601 avec heure et fuseau (minuit Paris),
// format attendu par Google Actualités. `dateModified` est la date de dernière
// modification (ISO 8601) quand elle est fournie, sinon `datePublished`. Date
// de publication absente ou invalide → les deux champs sont omis plutôt
// qu'émis avec une valeur invalide. `citation` liste les URL des articles de
// loi cités par l'actualité.
export function buildNewsArticleJsonLd({
  headline,
  url,
  datePublished,
  dateModified,
  description,
  image,
  citations,
}: {
  headline: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  description?: string;
  image?: { url: string; width?: number; height?: number };
  citations?: string[];
}): Record<string, unknown> {
  const absoluteUrl = toAbsoluteUrl(url);
  const isoDate = toIsoDateTimeParis(datePublished);

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline,
    url: absoluteUrl,
    mainEntityOfPage: absoluteUrl,
    ...(isoDate
      ? { datePublished: isoDate, dateModified: dateModified ?? isoDate }
      : {}),
    ...(description ? { description } : {}),
    // Image de l'actualité, en URL absolue. Largeur et hauteur ne sont émises
    // que si les deux sont connues.
    ...(image
      ? {
          image: [
            {
              "@type": "ImageObject",
              url: toAbsoluteUrl(image.url),
              ...(image.width && image.height
                ? { width: image.width, height: image.height }
                : {}),
            },
          ],
        }
      : {}),
    // Même entité que `publisher` et que l'Article des autres contenus : Google
    // recommande un auteur identifié (nom + url), portés par l'entité
    // GovernmentOrganization émise sur toutes les pages.
    author: { "@id": JSON_LD_ENTITY_IDS.organization },
    publisher: { "@id": JSON_LD_ENTITY_IDS.organization },
    inLanguage: "fr-FR",
    isAccessibleForFree: true,
    ...(citations?.length ? { citation: citations } : {}),
  };
}
