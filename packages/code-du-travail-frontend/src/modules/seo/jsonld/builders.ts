import { SITE_URL } from "../../../config";

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

// Convertit une date FR `JJ/MM/AAAA` (format d'affichage du site) en ISO 8601
// `AAAA-MM-JJ` attendu par schema.org. Tolère aussi une date déjà ISO. Renvoie
// undefined si le format n'est pas reconnu → jamais de date invalide émise.
function toIsoDate(date?: string): string | undefined {
  const value = date?.trim();
  if (!value) return undefined;
  const frMatch = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (frMatch) {
    const [, day, month, year] = frMatch;
    return `${year}-${month}-${day}`;
  }
  return /^\d{4}-\d{2}-\d{2}/.test(value) ? value : undefined;
}

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
  const isoDate = toIsoDate(datePublished);

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

export function buildNewsArticleJsonLd({
  headline,
  url,
  datePublished,
  description,
}: {
  headline: string;
  url: string;
  datePublished: string;
  description?: string;
}): Record<string, unknown> {
  const absoluteUrl = toAbsoluteUrl(url);

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline,
    url: absoluteUrl,
    mainEntityOfPage: absoluteUrl,
    datePublished,
    dateModified: datePublished,
    ...(description ? { description } : {}),
    author: {
      "@type": "Organization",
      name: "Code du travail numérique",
    },
    publisher: {
      "@id": JSON_LD_ENTITY_IDS.organization,
    },
    inLanguage: "fr-FR",
  };
}
