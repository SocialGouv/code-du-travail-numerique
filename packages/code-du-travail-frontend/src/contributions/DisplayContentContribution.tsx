import { Accordion, Alert, Table as UITable, theme } from "@socialgouv/cdtn-ui";

import styled from "styled-components";
import { FicheServicePublic } from "../fiche-service-public";
import parse, {
  DOMNode,
  domToReact,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";
import { xssWrapper } from "../lib";

export const ContentSP = ({ raw }) => {
  return (
    <>
      {raw && (
        <StyledContent>
          <FicheServicePublic data={JSON.parse(raw).children} />
        </StyledContent>
      )}
    </>
  );
};

const mapItem = (titleLevel: number, domNode: Element, summary: Element) => ({
  body: domToReact(domNode.children as DOMNode[], options(titleLevel + 1)),
  title: domToReact(summary.children as DOMNode[], {
    transform: (reactNode, domNode) => {
      // @ts-ignore
      if (domNode.children) {
        // @ts-ignore
        return domNode.children[0].data;
      }
      // @ts-ignore
      return domNode.data;
    },
    trim: true,
  }),
});
const mapToAccordion = (titleLevel: number, items) => (
  <StyledAccordion
    titleLevel={titleLevel}
    data-testid="contrib-accordion"
    items={items}
  />
);

function getFirstElementChild(domNode: Element) {
  let child = domNode.children.shift();
  while (child && child.type !== "tag") {
    child = domNode.children.shift();
  }
  return child;
}

function getNextFirstElement(domNode: Element) {
  let next = domNode.next;
  while (next && next.type !== "tag") {
    next = next.next;
  }
  return next;
}

const theadMaxRowspan = (tr: Element) => {
  const rowspans = tr.children.map((child) => {
    if (child.type === "tag" && child.name === "td") {
      return parseInt(child.attribs["rowspan"] ?? -1);
    } else {
      return -1;
    }
  });
  const maxRowspan = rowspans.reduce(
    (previousValue, currentValue, currentIndex, array) =>
      currentValue > previousValue ? currentValue : previousValue,
    0
  );
  return maxRowspan === -1 ? 1 : maxRowspan;
};

const mapTbody = (tbody: Element) => {
  let theadChildren: Element[] = [];
  const firstLine = getFirstElementChild(tbody);

  if (firstLine) {
    let maxRowspan = theadMaxRowspan(firstLine);
    theadChildren.push(firstLine);
    for (let i = 1; i < maxRowspan; i++) {
      let child = getFirstElementChild(tbody);
      if (child) {
        theadChildren.push(child);
      }
    }
  }

  return (
    <UITable>
      {theadChildren.length > 0 && (
        <thead>
          {theadChildren.map((child, index) => (
            <tr key={`tr-${index}`}>
              {domToReact(child.children as DOMNode[], { trim: true })}
            </tr>
          ))}
        </thead>
      )}
      <tbody>{domToReact(tbody.children as DOMNode[], { trim: true })}</tbody>
    </UITable>
  );
};

function getItem(domNode: Element, titleLevel: number) {
  const summary = getFirstElementChild(domNode);
  if (summary && summary.name === "summary") {
    return mapItem(titleLevel, domNode, summary);
  }
}

const options = (titleLevel: number): HTMLReactParserOptions => ({
  replace(domNode) {
    if (domNode instanceof Element) {
      if (domNode.name === "h3") {
        titleLevel = 4;
      }
      if (domNode.name === "details") {
        const items: any[] = [];
        const item = getItem(domNode, titleLevel);
        if (item) {
          items.push(item);
        }
        let next = getNextFirstElement(domNode);
        while (next && next.name === "details") {
          const item = getItem(next, titleLevel);
          if (item) {
            items.push(item);
          }
          next = getNextFirstElement(next);
        }
        return items.length ? mapToAccordion(titleLevel, items) : <></>;
      }
      if (domNode.name === "table") {
        const tableContent = getFirstElementChild(domNode);
        if (tableContent?.name === "tbody") {
          return mapTbody(tableContent);
        } else {
          return domNode;
        }
      }
      if (domNode.name === "div" && domNode.attribs.class === "alert") {
        return (
          <Alert>
            {domToReact(domNode.children as DOMNode[], { trim: true })}
          </Alert>
        );
      }
      if (domNode.name === "p" && !domNode.children.length) {
        return <></>;
      }
      if (domNode.name === "strong") {
        // Disable trim on strong
        return (
          <strong>
            {domToReact(domNode.children as DOMNode[], { trim: false })}
          </strong>
        );
      }
      if (domNode.name === "em") {
        // Disable trim on em
        return (
          <em>{domToReact(domNode.children as DOMNode[], { trim: false })}</em>
        );
      }
    }
  },
  trim: true,
});

type Props = {
  content: string;
};
const DisplayContentContribution = ({
  content,
}: Props): string | JSX.Element | JSX.Element[] => {
  return parse(xssWrapper(content), options(3));
};

const { spacings } = theme;

const StyledAccordion = styled(Accordion)`
  *[data-accordion-component="AccordionItemButton"] {
    padding-left: ${spacings.small};
  }
`;

const StyledContent = styled.div`
  margin-bottom: ${spacings.large};
`;

export default DisplayContentContribution;
