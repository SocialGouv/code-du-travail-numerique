import { SITE_URL } from "../../../../config";
import { buildFaqPageJsonLd } from "../../../seo/jsonld/builders";
import { splitReferences } from "./articles";
import { ToolSeoContentData } from "./types";

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Serialises the visible text into the HTML subset Google accepts in
// `acceptedAnswer.text` (p, strong, ul, li, a).
export const toFaqAnswerHtml = ({
  blocks,
  references,
}: ToolSeoContentData): string => {
  const body = blocks
    .map(({ lead, text, items }) => {
      // Sub-headings are not allowed by Google here, so they become bold
      // paragraphs.
      const heading = lead ? `<p><strong>${escapeHtml(lead)}</strong></p>` : "";
      const paragraph = text ? `<p>${escapeHtml(text)}</p>` : "";
      const list = items?.length
        ? `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
        : "";
      return heading + paragraph + list;
    })
    .join("");

  const referencesHtml = splitReferences(references)
    .map((part) =>
      part.type === "article"
        ? `<a href="${SITE_URL}${part.href}">${escapeHtml(part.value)}</a>`
        : escapeHtml(part.value)
    )
    .join("");

  return `${body}<p>Références : ${referencesHtml}</p>`;
};

export const buildToolFaqJsonLd = (
  content: ToolSeoContentData,
  path: string
): Record<string, unknown> =>
  buildFaqPageJsonLd({
    question: content.title,
    answer: toFaqAnswerHtml(content),
    url: path,
  });
