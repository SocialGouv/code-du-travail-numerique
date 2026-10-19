import { htmlToDOM } from "html-react-parser";
import type { DOMNode, Element } from "html-react-parser";

import {
  computeChallengerReference,
  formatChallengerEur,
  isChallengerFormula,
} from "@socialgouv/cdtn-utils";

import { SITE_URL } from "../../../config";
import { parseChallengerAmount } from "../../common/challenger";

// Réponse d'un FAQPage (#7493) : Google n'accepte qu'un sous-ensemble de HTML
// dans `acceptedAnswer.text` (h1-h6, br, ol, ul, li, a, p, div, b, strong, i,
// em). Le contenu des contributions (HTML Tiptap, stocké dans Elasticsearch)
// contient aussi des tableaux, des accordéons `details`, des infographies, des
// info-bulles… Ce module le réécrit dans le sous-ensemble autorisé :
//
// - balises autorisées : conservées (sans attributs, sauf `href` des liens) ;
// - `details` / `summary` : l'accordéon est mis à plat, son titre en gras ;
// - montants « challenger » (`span[data-challenger-formula]`) : même
//   substitution à partir du SMIC que `DisplayContent`, pour que le FAQ cite les
//   montants réellement affichés dans la page ;
// - `span.title` / `span.sub-title` : intertitres, rendus en paragraphe gras ;
// - `table` : une ligne devient un `<li>` « première cellule : colonne : valeur » ;
// - infographies, images, scripts, styles : supprimés ;
// - toute autre balise : retirée, son contenu est conservé.

const PASS_THROUGH = new Set([
  "p",
  "ul",
  "ol",
  "li",
  "strong",
  "b",
  "em",
  "i",
  "br",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
]);
const DROPPED = new Set([
  "script",
  "style",
  "svg",
  "img",
  "picture",
  "figure",
  "iframe",
  "button",
]);
const ROW_SEPARATOR = " : ";

export const escapeHtml = (text: string): string =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const escapeAttr = (text: string): string =>
  escapeHtml(text).replace(/"/g, "&quot;");

export const toAbsoluteUrl = (href: string): string => {
  if (/^https?:\/\//.test(href)) return href;
  const base = SITE_URL.endsWith("/") ? SITE_URL.slice(0, -1) : SITE_URL;
  return `${base}${href.startsWith("/") ? href : `/${href}`}`;
};

const isElement = (node: DOMNode): node is Element => node.type === "tag";
const childrenOf = (node: Element): DOMNode[] => node.children as DOMNode[];

const rawText = (node: DOMNode): string => {
  if (node.type === "text") return node.data;
  if (!isElement(node) || DROPPED.has(node.name)) return "";
  return childrenOf(node).map(rawText).join(" ");
};

// Texte d'un nœud, montants « challenger » recalculés comme dans la page.
const textOf = (node: DOMNode, options: Options): string => {
  if (node.type === "text") return node.data;
  if (!isElement(node) || DROPPED.has(node.name)) return "";
  if (node.attribs["data-challenger-formula"]) {
    return challengerAmount(node, options);
  }
  return childrenOf(node)
    .map((child) => textOf(child, options))
    .join(" ");
};
const cleanText = (text: string): string => text.replace(/\s+/g, " ").trim();

// Descendants nommés `name`, sans entrer dans un tableau imbriqué.
const findAll = (node: Element, name: string): Element[] =>
  childrenOf(node)
    .filter(isElement)
    .flatMap((child) => [
      ...(child.name === name ? [child] : []),
      ...(child.name === "table" ? [] : findAll(child, name)),
    ]);

const spanOf = (cell: Element, attribute: "colspan" | "rowspan"): number => {
  const value = parseInt(cell.attribs[attribute] ?? "1", 10);
  return Number.isNaN(value) || value < 1 ? 1 : value;
};

// Cellules d'une ligne, étendues selon `colspan` (le libellé d'une cellule
// fusionnée est répété sur ses colonnes dans l'en-tête, vide dans le corps).
const cellsOf = (row: Element, options: Options, repeat: boolean): string[] =>
  childrenOf(row)
    .filter(isElement)
    .filter(({ name }) => name === "td" || name === "th")
    .flatMap((cell) => {
      const text = cleanText(textOf(cell, options));
      const span = spanOf(cell, "colspan");
      return [text, ...Array(span - 1).fill(repeat ? text : "")];
    });

// Même règle que `DisplayContent` : la première ligne du tableau est l'en-tête
// (étendue aux lignes couvertes par son plus grand `rowspan`), `th` ou non.
const headerRowCount = (firstRow: Element): number =>
  Math.max(
    1,
    ...childrenOf(firstRow)
      .filter(isElement)
      .map((cell) => spanOf(cell, "rowspan"))
  );

const serializeTable = (table: Element, options: Options): string => {
  const trs = findAll(table, "tr");
  if (trs.length === 0) return "";

  // Un tableau d'une seule ligne n'a pas de corps : on la garde comme contenu.
  const headerCount = trs.length > 1 ? headerRowCount(trs[0]) : 0;
  const headerCells = trs
    .slice(0, headerCount)
    .map((row) => cellsOf(row, options, true));
  // Libellé de colonne : cellules d'en-tête de la colonne, de haut en bas.
  const labelAt = (index: number): string =>
    [
      ...new Set(
        headerCells.map((cells) => cells[index]).filter((text) => !!text)
      ),
    ].join(" ");

  const bodyRows = trs
    .slice(headerCount)
    .map((row) => cellsOf(row, options, false))
    .filter((cells) => cells.some(Boolean));

  const items = bodyRows.map((cells) => {
    const [first, ...rest] = cells;
    const values = rest
      .map((value, index) => {
        if (!value) return "";
        const label = labelAt(index + 1);
        // « Jours » devant « 12 jours » n'apporte rien.
        const redundant =
          !label || value.toLowerCase().includes(label.toLowerCase());
        return redundant ? value : `${label}${ROW_SEPARATOR}${value}`;
      })
      .filter(Boolean);
    const parts = [first, values.join(", ")].filter(Boolean);
    return `<li>${escapeHtml(parts.join(ROW_SEPARATOR))}</li>`;
  });
  if (items.length === 0) return "";

  // Libellé de la colonne des lignes (« Décès d'un enfant », « Année du
  // contrat »…) : il introduit la liste.
  const title = labelAt(0);
  const intro = title ? `<p><strong>${escapeHtml(title)}</strong></p>` : "";
  return `${intro}<ul>${items.join("")}</ul>`;
};

type Options = {
  // SMIC horaire de la contribution, pour recalculer les montants « challenger ».
  smicHourly?: number;
};

const serializeNodes = (nodes: DOMNode[], options: Options): string =>
  nodes.map((node) => serializeNode(node, options)).join("");

const hasClass = (node: Element, className: string): boolean =>
  (node.attribs.class ?? "").split(/\s+/).includes(className);

// Même règle que `DisplayContent` : le montant saisi n'est conservé que s'il est
// supérieur au montant calculé, sinon il est remplacé par celui-ci.
const challengerAmount = (node: Element, options: Options): string => {
  const entered = cleanText(rawText(node));
  const formula = node.attribs["data-challenger-formula"];
  if (options.smicHourly === undefined || !isChallengerFormula(formula)) {
    return entered;
  }
  const computed = computeChallengerReference(
    formula,
    node.attribs["data-challenger-parameter"],
    options.smicHourly
  );
  const enteredAmount = parseChallengerAmount(entered);
  if (enteredAmount !== undefined && enteredAmount > computed) return entered;
  return formatChallengerEur(computed);
};

function serializeNode(node: DOMNode, options: Options): string {
  if (node.type === "text") return escapeHtml(node.data);
  if (!isElement(node)) return "";

  const { name } = node;
  if (DROPPED.has(name)) return "";
  if (name === "div" && node.attribs.class?.includes("infographic")) return "";
  if (name === "table") return serializeTable(node, options);

  if (name === "span" && node.attribs["data-challenger-formula"]) {
    return escapeHtml(challengerAmount(node, options));
  }
  if (
    name === "span" &&
    (hasClass(node, "title") || hasClass(node, "sub-title"))
  ) {
    const title = cleanText(textOf(node, options));
    return title ? `<p><strong>${escapeHtml(title)}</strong></p>` : "";
  }

  if (name === "summary") {
    const title = cleanText(textOf(node, options));
    return title ? `<p><strong>${escapeHtml(title)}</strong></p>` : "";
  }
  if (name === "a") {
    const inner = serializeNodes(childrenOf(node), options);
    const href = node.attribs.href;
    if (!href || href.startsWith("#") || !cleanText(rawText(node)))
      return inner;
    return `<a href="${escapeAttr(toAbsoluteUrl(href))}">${inner}</a>`;
  }
  if (name === "br") return "<br>";
  if (PASS_THROUGH.has(name)) {
    return `<${name}>${serializeNodes(childrenOf(node), options)}</${name}>`;
  }
  // `details`, `div`, `span`, `section`, info-bulles… : on garde le contenu.
  return serializeNodes(childrenOf(node), options);
}

// Retire les éléments devenus vides et normalise les espaces. Les espaces entre
// balises en ligne (`</strong> <em>`) sont conservées : seules celles qui bordent
// une balise de bloc sont retirées.
const tidy = (html: string): string => {
  let previous: string;
  let current = html;
  do {
    previous = current;
    current = current.replace(/<(p|li|ul|ol|strong|b|em|i)>\s*<\/\1>/g, "");
  } while (current !== previous);
  return current
    .replace(/\s+/g, " ")
    .replace(/\s*(<\/?(?:p|ul|ol|li|h[1-6])>|<br>)\s*/g, "$1")
    .trim();
};

/** Réécrit le HTML d'une contribution dans le sous-ensemble accepté par Google. */
export function contentToFaqAnswerHtml(
  html?: string,
  options: Options = {}
): string {
  if (!html) return "";
  return tidy(serializeNodes(htmlToDOM(html) as DOMNode[], options));
}
