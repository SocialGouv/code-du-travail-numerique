import Breadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";
import { BreadcrumbListJsonLd } from "../../seo/jsonld";
import type { BreadcrumbSegment } from "./segments";

type Props = {
  /** Dernier maillon, non cliquable. Sert aussi de `name` au JSON-LD. */
  currentPageLabel: string;
  /**
   * Maillons intermédiaires, du plus général au plus précis. « Accueil » est
   * ajouté automatiquement, côté rendu comme côté JSON-LD.
   */
  segments?: BreadcrumbSegment[];
  /** Espacement propre au layout appelant, passé tel quel au DSFR. */
  className?: string;
};

/**
 * Fil d'Ariane du site : rend le composant DSFR et son `BreadcrumbList`
 * schema.org à partir d'une seule liste de segments.
 *
 * Deux contraintes à ne pas lever :
 *
 * 1. **Pas de directive `"use client"`.** `BreadcrumbListJsonLd` est déjà un
 *    composant client (il lit `usePathname()`), mais le `Breadcrumb` DSFR n'en
 *    est pas un et rend côté serveur dans la plupart des conteneurs. Ajouter la
 *    directive ici les basculerait tous dans le bundle client.
 * 2. **Retourner un Fragment, jamais un `<div>`.** Plusieurs conteneurs rendent
 *    le fil d'Ariane en enfant direct d'un `fr-grid-row` (flex) ; un wrapper
 *    casserait leur mise en page. Le `<script>` JSON-LD, lui, n'est pas un
 *    flex-item (`display: none`).
 */
export const Breadcrumbs = ({
  currentPageLabel,
  segments = [],
  className,
}: Props) => (
  <>
    <BreadcrumbListJsonLd
      currentPageLabel={currentPageLabel}
      items={segments}
    />
    <Breadcrumb
      currentPageLabel={currentPageLabel}
      homeLinkProps={{ href: "/" }}
      segments={segments.map(({ label, href }) => ({
        label,
        linkProps: { href },
      }))}
      className={className}
    />
  </>
);
