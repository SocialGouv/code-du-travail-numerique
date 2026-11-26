// Tools that display an editorial SEO text under their simulator. Add a slug
// here (and its entry in TOOL_SEO_CONTENT) to enable the text on another tool.
export type ToolSeoSlug = "simulateur-embauche";

/**
 * A section of the SEO text, rendered as an anchored h2 followed by optional
 * paragraphs and an optional bullet list (introduced by the last paragraph).
 */
export type ToolSeoSection = {
  /** Anchor of the h2, listed in the summary (stable: used in links). */
  id: string;
  /** Phrased as a question: it is also a FAQPage question. */
  title: string;
  paragraphs?: string[];
  items?: string[];
};

export type ToolSeoContentData = {
  sections: ToolSeoSection[];
  /**
   * Labour code articles (e.g. "R3243-1") listed in the "Références"
   * accordion, each linked to its page.
   */
  references: string[];
};
