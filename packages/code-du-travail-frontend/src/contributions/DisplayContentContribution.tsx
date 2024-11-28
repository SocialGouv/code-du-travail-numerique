import { Alert, Heading, Table as UITable, theme } from "@socialgouv/cdtn-ui";
import { AccordionWithAnchor as Accordion } from "../../src/common/AccordionWithAnchor";

import styled from "styled-components";
import { FicheServicePublic } from "../fiche-service-public";
import parse, {
  DOMNode,
  domToReact,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";
import { xssWrapper } from "../lib";

export const ContentSP = ({ raw, titleLevel }) => {
  return (
    <>
      {raw && (
        <StyledContent>
          <FicheServicePublic
            data={JSON.parse(raw).children}
            headingLevel={titleLevel}
          />
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
const mapToAccordion = (titleLevel: number, items) => {
  const props = titleLevel <= 6 ? { titleLevel: titleLevel } : {};

  return (
    <StyledAccordion {...props} data-testid="contrib-accordion" items={items} />
  );
};

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
    (previousValue, currentValue) =>
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
              {domToReact(child.children as DOMNode[])}
            </tr>
          ))}
        </thead>
      )}
      <tbody>{renderChildrenWithNoTrim(domNode)}</tbody>
    </UITable>
  );
};

function getItem(domNode: Element, titleLevel: number) {
  const summary = getFirstElementChild(domNode);
  if (summary && summary.name === "summary") {
    return mapItem(titleLevel, domNode, summary);
  }
}

function renderChildrenWithNoTrim(domNode) {
  return domToReact(domNode.children as DOMNode[]);
}

const getHeadingElement = (titleLevel: number, domNode) => {
  return titleLevel <= 6 ? (
    <Heading as={`h${titleLevel}`}>{renderChildrenWithNoTrim(domNode)}</Heading>
  ) : (
    <strong>{renderChildrenWithNoTrim(domNode)}</strong>
  );
};

const options = (titleLevel: number): HTMLReactParserOptions => {
  let accordionTitle = titleLevel;

  return {
    replace(domNode) {
      if (domNode instanceof Element) {
        if (domNode.name === "span" && domNode.attribs.class === "title") {
          accordionTitle = titleLevel + 1;
          return getHeadingElement(titleLevel, domNode);
        }
        if (domNode.name === "span" && domNode.attribs.class === "sub-title") {
          accordionTitle = titleLevel + 1;
          return getHeadingElement(titleLevel + 1, domNode);
        }
        if (domNode.name === "details") {
          const items: any[] = [];
          const item = getItem(domNode, accordionTitle);
          if (item) {
            items.push(item);
          }
          let next = getNextFirstElement(domNode);
          while (next && next.name === "details") {
            const item = getItem(next, accordionTitle);
            if (item) {
              items.push(item);
            }
            next = getNextFirstElement(next);
          }
          return items.length ? mapToAccordion(accordionTitle, items) : <></>;
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
        if (domNode.name === "strong") {
          // Disable trim on strong
          return <strong>{renderChildrenWithNoTrim(domNode)}</strong>;
        }
        if (domNode.name === "em") {
          // Disable trim on em
          return <em>{renderChildrenWithNoTrim(domNode)}</em>;
        }
        if (domNode.name === "p") {
          if (!domNode.children.length) {
            return <br />;
          }
          // Disable trim on p
          return <p>{renderChildrenWithNoTrim(domNode)}</p>;
        }
      }
    },
    trim: true,
  };
};

type Props = {
  content: string;
  titleLevel: number;
};
const DisplayContentContribution = ({
  content,
  titleLevel,
}: Props): string | JSX.Element | JSX.Element[] => {
  return (
    <ContentStyled>
      {parse(xssWrapper(content), options(titleLevel))}
    </ContentStyled>
  );
};

const { spacings } = theme;

const ContentStyled = styled("div")`
  li {
    margin-bottom: ${spacings.small};

    p {
      margin: 0;
    }
  }
`;

const StyledAccordion = styled(Accordion)`
  *[data-accordion-component="AccordionItemButton"] {
    padding-left: ${spacings.small};
  }
`;

const StyledContent = styled.div`
  margin-bottom: ${spacings.large};
`;

export default DisplayContentContribution;
