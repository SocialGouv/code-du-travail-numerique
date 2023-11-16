import { Accordion, theme } from "@socialgouv/cdtn-ui";
import styled from "styled-components";
import { FicheServicePublic } from "../fiche-service-public";
import parse, { domToReact } from "html-react-parser";

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

const options = (titleLevel) => ({
  replace(domNode) {
    if (domNode.name === "h3") {
      titleLevel = 4;
    }
    if (domNode.name === "details") {
      const summary = domNode.children.shift();
      if (summary.name === "summary") {
        const summaryText = domToReact(summary.children, {});

        return (
          <StyledAccordion
            titleLevel={titleLevel}
            items={[
              {
                body: domToReact(domNode.children, options(titleLevel + 1)),
                title: domToReact(summary, {}),
              },
            ]}
          />
        );
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
  return parse(content, options(3));
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
