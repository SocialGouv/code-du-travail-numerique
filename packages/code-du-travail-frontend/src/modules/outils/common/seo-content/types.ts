export type ToolSeoSlug =
  | "simulateur-embauche"
  | "preavis-demission"
  | "indemnite-precarite"
  | "indemnite-rupture-conventionnelle"
  | "convention-collective"
  | "indemnite-retraite"
  | "preavis-licenciement"
  | "preavis-retraite";

/**
 * A block of the SEO text: an optional bold lead-in, an optional paragraph
 * text and an optional bullet list rendered after the paragraph.
 */
export type ToolSeoBlock = {
  lead?: string;
  text?: string;
  items?: string[];
};

export type ToolSeoContentData = {
  title: string;
  blocks: ToolSeoBlock[];
  /** Legal references; article numbers are turned into links. */
  references: string;
};
