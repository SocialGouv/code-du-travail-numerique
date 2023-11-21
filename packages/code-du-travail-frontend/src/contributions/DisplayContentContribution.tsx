import { Accordion, Table as UITable, theme } from "@socialgouv/cdtn-ui";

import styled from "styled-components";
import { FicheServicePublic } from "../fiche-service-public";
import parse, { domToReact } from "html-react-parser";
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

const mapSummary = (titleLevel, domNode, summary) => (
  <StyledAccordion
    titleLevel={titleLevel}
    data-testid="contrib-accordion"
    items={[
      {
        body: domToReact(domNode.children, options(titleLevel + 1)),
        title: domToReact(summary.children, {
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
      },
    ]}
  />
);

function getFirstElementChild(domNode) {
  let child = domNode.children.shift();
  while (child && child.type !== "tag") {
    child = domNode.children.shift();
  }
  return child;
}

const mapTbody = (tbody) => {
  const tr = getFirstElementChild(tbody);

  return (
    <UITable>
      <thead>{domToReact(tr.children, { trim: true })}</thead>
      <tbody>{domToReact(tbody.children, { trim: true })}</tbody>
    </UITable>
  );
};

const options = (titleLevel) => ({
  replace(domNode) {
    if (domNode.name === "h3") {
      titleLevel = 4;
    }
    if (domNode.name === "details") {
      const summary = getFirstElementChild(domNode);
      if (summary.name === "summary") {
        return mapSummary(titleLevel, domNode, summary);
      }
    }
    if (domNode.name === "table") {
      const tableContent = getFirstElementChild(domNode);
      if (tableContent.name === "tbody") {
        return mapTbody(tableContent);
      } else {
        return domNode;
      }
    }
    if (domNode.name === "p" && !domNode.children.length) {
      return <></>;
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
