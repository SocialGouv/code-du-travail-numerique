import React, { useEffect, useState } from "react";
import { theme } from "@socialgouv/react-ui";
import glossary from "@cdt/data...datafiller/glossary.data.json";
import Tooltip from "@reach/tooltip";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Html from "../common/Html";

const { box, colors, fonts } = theme;

const StyledTooltip = styled(Tooltip)`
  z-index: 10;
  pointer-events: none;
  position: absolute;
  padding: 0.25em 0.5em;
  box-shadow: ${box.shadow};
  width: 300px;
  max-width: 70vw;
  font-size: ${fonts.sizeBase};
  background: ${colors.lightBackground};
  color: ${colors.lightText};
  border: solid 1px ${colors.elementBorder};
`;

const Underline = styled.span`
  border-bottom: 1px dotted ${colors.blueLight};
`;

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
        "[data-main-content] p, [data-main-content] li:not([role=tab])"
      )
    ).reduce((state, node) => {
      const internalRefMap = new Map();
      let refCounter = 0;
      glossary.forEach(item => {
        // we cannot use \b word boundary since \w does not match diacritics
        // So we do a kind of \b equivalent.
        // the main différence is that matched pattern can include a whitespace as first char
        const frDiacritics = "àâäçéèêëïîôöùûüÿœæÀÂÄÇÉÈÊËÎÏÔÖÙÛÜŸŒÆ";
        const wordBoundaryStart = `(?!^|[^\\w${frDiacritics}])`;
        const wordBoundaryEnd = `(?![\\w${frDiacritics}])`;
        const patterns = [...new Set([item.title, ...item.variants])]
          .map(
            term =>
              new RegExp(`${wordBoundaryStart}${term}${wordBoundaryEnd}`, "gi")
          )
          .concat(item.abbrs.map(abbr => new RegExp(`\\b${abbr}\\b`, "g")));

        patterns.forEach(pattern => {
          //we use an internal ref to
          node.innerHTML = node.innerHTML.replace(pattern, function(term) {
            const internalRef = `__tt__${refCounter++}`;
            internalRefMap.set(internalRef, { slug: item.slug, term });
            return `<span data-tooltip-ref="${internalRef}"></span>`;
          });
        });
      });
      return state.concat(
        Array.from(node.querySelectorAll("[data-tooltip-ref]")).map(node => {
          const { slug, term } = internalRefMap.get(
            node.getAttribute("data-tooltip-ref")
          );
          return {
            node,
            term,
            definition: glossaryBySlug[slug].definition
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
