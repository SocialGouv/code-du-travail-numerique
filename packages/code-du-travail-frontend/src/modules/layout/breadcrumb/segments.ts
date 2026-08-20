import type { Breadcrumb as DocumentBreadcrumb } from "@socialgouv/cdtn-types";
import {
  getLabelBySource,
  getRouteBySource,
  type SourceKeys,
} from "@socialgouv/cdtn-utils";
import type { BreadcrumbItem } from "../../seo/jsonld";

/**
 * Un maillon du fil d'Ariane. C'est volontairement le type du JSON-LD : la même
 * liste alimente le rendu DSFR et le `BreadcrumbList`, donc les deux ne peuvent
 * pas diverger.
 *
 * `label` est une `string` et jamais un `ReactNode` : c'est ce qui rend
 * impossible le `"[object Object]"` qu'on obtenait quand un fragment JSX
 * traversait un `String(...)` avant d'atterrir dans le JSON-LD.
 */
export type BreadcrumbSegment = BreadcrumbItem;

/**
 * Adapte les `breadcrumbs` (chaîne de thèmes) portés par un document
 * Elasticsearch. Le champ `position` est ignoré : c'est l'ordre d'un thème
 * parmi ses frères, pas sa profondeur — le tableau est déjà trié racine →
 * sous-thème le plus profond.
 */
export const fromDocumentBreadcrumbs = (
  breadcrumbs: DocumentBreadcrumb[] = []
): BreadcrumbSegment[] =>
  breadcrumbs.map(({ label, slug }) => ({ label, href: slug }));

/**
 * Maillon « page de listing » d'un type de contenu : Fiches pratiques,
 * Infographies, Modèles de documents, Simulateurs…
 *
 * Attention, tous les libellés de `labelBySource` ne sont pas affichables tels
 * quels dans un fil d'Ariane : `THEMES` vaut « Themes » (sans accent) et `CCN`
 * « Conventions collectives » au pluriel, là où les pages affichent « Thèmes »
 * et « Convention collective ». Ces deux segments restent écrits en dur.
 */
export const listingSegment = (source: SourceKeys): BreadcrumbSegment => ({
  label: getLabelBySource(source),
  href: `/${getRouteBySource(source)}`,
});
