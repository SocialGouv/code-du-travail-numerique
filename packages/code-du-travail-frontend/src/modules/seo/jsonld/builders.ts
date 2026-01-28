import { SITE_URL } from "../../../config";

export const JSON_LD_IDS = {
  organization: "jsonld-government-organization",
  website: "jsonld-website",
  breadcrumbs: "jsonld-breadcrumbs",
  legislation: "jsonld-legislation",
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
