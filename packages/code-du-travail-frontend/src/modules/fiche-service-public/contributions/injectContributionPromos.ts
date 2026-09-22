import {
  FicheSPData,
  FicheSPDataContributionPromo,
  isFicheSPDataChapitre,
} from "../builder/type";
import {
  ContributionPromoConfig,
  ContributionPromoPlacement,
  getContributionPromos,
} from "./config";

/** Point d'insertion : le tableau `children` cible et l'index où insérer. */
type Slot = { parent: FicheSPData[]; index: number };

const isElement = (
  node: FicheSPData
): node is Extract<FicheSPData, { type: "element" }> => node.type === "element";

const hasChapitre = (node: FicheSPData) =>
  isElement(node) &&
  Array.isArray(node.children) &&
  node.children.some((child) => isFicheSPDataChapitre(child));

// Un `Texte` contenant des `Chapitre` est rendu en accordéons (cf. Accordion.tsx).
const isAccordionGroup = (node: FicheSPData) =>
  isElement(node) && node.name === "Texte" && hasChapitre(node);

// Éléments que l'ElementBuilder traverse sans changer le niveau de titre :
// leurs enfants sont donc encore « au premier niveau » de la fiche.
const TRANSPARENT_WRAPPERS = [
  "Texte",
  "Description",
  "FragmentConditionne",
  "SousChapitre",
  "Complement",
];

const isTransparentWrapper = (node: FicheSPData) =>
  isElement(node) &&
  TRANSPARENT_WRAPPERS.includes(node.name) &&
  Array.isArray(node.children) &&
  !isAccordionGroup(node);

/**
 * Parcourt, dans l'ordre du document, les nœuds de premier niveau de la fiche
 * (ceux rendus au niveau de titre 0), en descendant dans les wrappers
 * transparents mais pas dans les accordéons ni les blocs (Cas, ANoter…).
 */
const walkLevelZero = (
  children: FicheSPData[],
  visit: (node: FicheSPData, parent: FicheSPData[], index: number) => void
) => {
  children.forEach((node, index) => {
    visit(node, children, index);
    if (isTransparentWrapper(node)) {
      walkLevelZero((node as { children: FicheSPData[] }).children, visit);
    }
  });
};

const indexAfterTitle = (children: FicheSPData[]) => {
  const titleIndex = children.findIndex(
    (child) => isElement(child) && child.name === "Titre"
  );
  return titleIndex + 1;
};

const findPageSlot = (tree: FicheSPData[]): Slot => {
  const introIndex = tree.findIndex(
    (node) => isElement(node) && node.name === "Introduction"
  );
  return { parent: tree, index: introIndex + 1 };
};

const findAccordionSlot = (
  tree: FicheSPData[],
  index: number
): Slot | undefined => {
  const accordionItems: FicheSPData[][] = [];
  walkLevelZero(tree, (node) => {
    if (!isAccordionGroup(node)) return;
    (node as { children: FicheSPData[] }).children.forEach((child) => {
      if (
        isFicheSPDataChapitre(child) &&
        isElement(child) &&
        indexAfterTitle(child.children) > 0
      ) {
        accordionItems.push(child.children);
      }
    });
  });
  const item = accordionItems[index - 1];
  if (!item) return undefined;
  // En deuxième position du contenu (après le premier élément qui suit le
  // titre), pour ne pas ouvrir l'accordéon directement sur le bloc. Un
  // accordéon réduit à un seul élément reçoit le bloc en fin de contenu.
  return {
    parent: item,
    index: Math.min(indexAfterTitle(item) + 1, item.length),
  };
};

const findSectionSlot = (
  tree: FicheSPData[],
  index: number
): Slot | undefined => {
  const sections: Slot[] = [];
  walkLevelZero(tree, (node, parent, nodeIndex) => {
    if (!isElement(node)) return;
    if (node.name === "Titre") {
      sections.push({ parent, index: nodeIndex + 1 });
    } else if (node.name === "Cas" && indexAfterTitle(node.children) > 0) {
      sections.push({
        parent: node.children,
        index: indexAfterTitle(node.children),
      });
    }
  });
  return sections[index - 1];
};

const findSlot = (
  tree: FicheSPData[],
  placement: ContributionPromoPlacement
): Slot | undefined => {
  switch (placement.type) {
    case "page":
      return findPageSlot(tree);
    case "accordion":
      return findAccordionSlot(tree, placement.index);
    case "section":
      return findSectionSlot(tree, placement.index);
  }
};

export const CONTRIBUTION_PROMO_NODE_NAME = "CdtnContributionPromo";

const buildPromoNode = (
  promo: ContributionPromoConfig
): FicheSPDataContributionPromo => ({
  type: "element",
  name: CONTRIBUTION_PROMO_NODE_NAME,
  attributes: { contributionSlug: promo.contributionSlug },
  children: [],
});

/**
 * Retourne une copie de l'arbre de la fiche SP dans laquelle les blocs de mise
 * en avant configurés pour `spSlug` ont été insérés. L'arbre d'origine n'est
 * pas modifié. Un emplacement introuvable (accordéon ou section inexistant)
 * est ignoré silencieusement.
 */
export const injectContributionPromos = (
  children: FicheSPData[],
  spSlug: string
): FicheSPData[] => {
  const promos = getContributionPromos(spSlug);
  if (promos.length === 0) return children;

  const tree: FicheSPData[] = JSON.parse(JSON.stringify(children));

  // Les emplacements sont résolus sur l'arbre avant toute insertion, puis les
  // insertions se font de l'index le plus grand au plus petit pour ne pas
  // décaler les emplacements suivants du même tableau. À emplacement égal,
  // l'ordre de la configuration est conservé.
  promos
    .map((promo, order) => ({
      order,
      node: buildPromoNode(promo),
      slot: findSlot(tree, promo.placement),
    }))
    .filter((entry): entry is typeof entry & { slot: Slot } => !!entry.slot)
    .sort((a, b) => b.slot.index - a.slot.index || b.order - a.order)
    .forEach(({ slot, node }) => {
      slot.parent.splice(slot.index, 0, node);
    });

  return tree;
};
