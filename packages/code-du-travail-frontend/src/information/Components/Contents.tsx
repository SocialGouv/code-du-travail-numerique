import { Heading, Section, Tabs, theme } from "@socialgouv/cdtn-ui";
import { AccordionWithAnchor as Accordion } from "../../../src/common/AccordionWithAnchor";

import styled from "styled-components";
import {
  EditorialContentBaseContentPart,
  EditorialSectionDisplayMode,
} from "@socialgouv/cdtn-types";

import { BlockList } from "./BlockList";

import { trackClickInfoPageTab } from "../../questionnaire";
import References from "../../common/References";

const { breakpoints, spacings } = theme;

type ContentsParameters = {
  contents?: EditorialContentBaseContentPart[];
  dismissalProcess: boolean;
  sectionDisplayMode?: EditorialSectionDisplayMode;
  anchor: string;
};

export const Contents = ({
  anchor,
  sectionDisplayMode,
  dismissalProcess,
  contents = [],
}: ContentsParameters) => {
  let editorialContent = contents?.map(({ name, blocks, references }) => {
    return (
      <>
        <BlockList key={name} name={name} blocks={blocks}></BlockList>
        {references &&
          references.map(
            ({ label, links }, index) =>
              links.length > 0 && (
                <Section key={`section-${index}`}>
                  <References
                    label={label}
                    accordionDisplay={1}
                    references={links.map((reference, index) => ({
                      ...reference,
                      id: reference.id || `${name}-${index}`,
                    }))}
                  />
                </Section>
              ),
          )}
      </>
    );
  });
  let contentWrapper;
  if (editorialContent && editorialContent.length > 1) {
    contentWrapper =
      sectionDisplayMode === "tab" ? (
        <Tabs
          data={contents?.map(({ title }, index) => ({
            panel: editorialContent?.[index],
            tab: <Heading as="h2">{title}</Heading>,
          }))}
          onSelect={(index) => {
            if (dismissalProcess && contents) {
              const content = contents[index];
              trackClickInfoPageTab(content.name);
            }
          }}
          data-testid="contents-tabs"
        />
      ) : (
        <Accordion
          titleLevel={2}
          preExpanded={[anchor]}
          items={contents?.map(({ title, name }, index) => ({
            body: editorialContent?.[index],
            id: name,
            title,
          }))}
          data-testid="contents-accordions"
        />
      );
  }
  return sectionDisplayMode === "tab" ? (
    <TabStylesWrapper data-testid="tabs">{contentWrapper}</TabStylesWrapper>
  ) : (
    <GlobalStylesWrapper data-testid="accordion">
      {contentWrapper}
    </GlobalStylesWrapper>
  );
};

const TabStylesWrapper = styled.div`
  img {
    max-width: 100%;
    height: auto;
  }

  li {
    flex: 1;
    font-size: 16px;
  }
`;

const GlobalStylesWrapper = styled.div`
  img {
    max-width: 100%;
    height: auto;
  }

  ul,
  ol {
    padding-left: ${spacings.larger};
  }

  li + li {
    margin-top: ${spacings.base};
    @media (max-width: ${breakpoints.mobile}) {
      margin-top: ${spacings.small};
    }
  }
`;
