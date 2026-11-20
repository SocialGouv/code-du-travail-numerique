import { buildFaqPageJsonLd } from "../../../seo/jsonld/builders";
import { ToolSeoSection } from "./types";

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Serialises a section's visible text into the HTML subset Google accepts in
// `acceptedAnswer.text` (p, ul, li, a).
export const toFaqAnswerHtml = ({ text, items }: ToolSeoSection): string => {
  const paragraph = text ? `<p>${escapeHtml(text)}</p>` : "";
  const list = items?.length
    ? `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
    : "";
  return paragraph + list;
};

// One question per h2: each section is a distinct FAQ entry, mirroring the
// visible headings and text.
export const buildToolFaqJsonLd = (
  sections: ToolSeoSection[],
  path: string
): Record<string, unknown> =>
  buildFaqPageJsonLd({
    entries: sections.map((section) => ({
      question: section.title,
      answer: toFaqAnswerHtml(section),
    })),
    url: path,
  });
