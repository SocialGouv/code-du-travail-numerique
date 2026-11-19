// Tools that display an editorial SEO text under their simulator. Add a slug
// here (and its entry in TOOL_SEO_CONTENT) to enable the text on another tool.
export type ToolSeoSlug = "simulateur-embauche";

/**
 * A section of the SEO text, rendered as an anchored h2 followed by an
 * optional paragraph and an optional bullet list.
 */
export type ToolSeoSection = {
  /** Anchor of the h2, listed in the summary (stable: used in links). */
  id: string;
  /** Phrased as a question: it is also a FAQPage question. */
  title: string;
  text?: string;
  items?: string[];
};

export type ToolSeoContentData = {
  sections: ToolSeoSection[];
  /** Legal references; article numbers are turned into links. */
  references: string;
};
