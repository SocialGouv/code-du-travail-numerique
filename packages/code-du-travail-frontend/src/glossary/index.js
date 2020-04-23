import slugify from "@cdt/data/slugify";
import Tooltip from "@reach/tooltip";
import glossaryRaw from "@socialgouv/datafiller-data/data/glossary.json";
import { theme } from "@socialgouv/react-ui";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Html from "../common/Html";

const { box, fonts } = theme;

const StyledTooltip = styled(Tooltip)`
  position: absolute;
  z-index: 2;
  width: 300px;
  max-width: 70vw;
  padding: 0.25em 0.5em;
  color: ${({ theme }) => theme.paragraph};
  font-size: ${fonts.sizes.default};
  background: ${({ theme }) => theme.bgTertiary};
  border: ${({ theme }) => box.border(theme.border)};
  box-shadow: ${({ theme }) => box.shadow.default(theme.secondary)};
  pointer-events: none;
`;

const Underline = styled.span`
  border-bottom: 1px dotted ${({ theme }) => theme.secondary};
`;

const glossary = glossaryRaw.map((word) => ({
  ...word,
  slug: slugify(word.title),
}));

const glossaryBySlug = glossary.reduce(
  (state, item) => ({ ...state, [item.slug]: item }),
  {}
);

const Portal = ({ node, children }) => {
  if (!node) return null;

  return ReactDOM.createPortal(children, node);
};

const DefinitonTerm = ({ term, definition }) => {
  return (
    <>
      <StyledTooltip label={<Html>{definition}</Html>} aria-label={definition}>
        <Underline tabIndex="0">{term}</Underline>
      </StyledTooltip>
    </>
  );
};

export default function useGlossary(children, html) {
  const [portalComponents, setPortalComponents] = useState();
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll(
        "[data-main-content] p:not([data-no-glossary]), [data-main-content] li:not([role=tab])"
      )
    ).reduce((state, node) => {
      const internalRefMap = new Map();
      let refCounter = 0;
      glossary.forEach((item) => {
        // we cannot use \b word boundary since \w does not match diacritics
        // So we do a kind of \b equivalent.
        // the main différence is that matched pattern can include a whitespace as first char
        const frDiacritics = "àâäçéèêëïîôöùûüÿœæÀÂÄÇÉÈÊËÎÏÔÖÙÛÜŸŒÆ";
        const wordBoundaryStart = `(?:^|[^_/\\w${frDiacritics}-])`;
        const wordBoundaryEnd = `(?![\\w${frDiacritics}])`;
        const patterns = [...new Set([item.title, ...item.variants])]
          .map(
            (term) =>
              new RegExp(
                `${wordBoundaryStart}(${term})${wordBoundaryEnd}`,
                "gi"
              )
          )
          .concat(item.abbrs ? new RegExp(`\\b(${item.abbrs})\\b`, "g") : []);

        patterns.forEach((pattern) => {
          // we use an internal ref counter to track pattern replacement
          node.innerHTML = node.innerHTML.replace(pattern, function (_, term) {
            const internalRef = `__tt__${refCounter++}`;
            internalRefMap.set(internalRef, { slug: item.slug, term });
            return _.replace(
              new RegExp(term),
              `<span data-tooltip-ref="${internalRef}"></span>`
            );
          });
        });
      });
      return state.concat(
        Array.from(node.querySelectorAll("[data-tooltip-ref]")).map((node) => {
          const { slug, term } = internalRefMap.get(
            node.getAttribute("data-tooltip-ref")
          );
          return {
            node,
            term,
            definition: glossaryBySlug[slug].definition,
          };
        })
      );
    }, []);
    setPortalComponents(
      nodes.map(({ node, term, definition }, i) => {
        return (
          <Portal key={`item-${i}`} node={node}>
            <DefinitonTerm term={term} definition={definition} />
          </Portal>
        );
      })
    );
    return function cleanEffect() {};
  }, [children, html]);
  return portalComponents;
}
