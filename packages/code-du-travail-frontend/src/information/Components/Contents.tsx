import { theme, Tabs, Accordion } from "@socialgouv/cdtn-ui";
import styled from "styled-components";
import { Content, SectionDisplayMode } from "cdtn-types";

import { ContentBlocks } from "./ContentBlocks";

import { trackClickInfoPageTab } from "../../questionnaire";

const { breakpoints, spacings } = theme;

type ContentsParameters = {
  contents?: Omit<Content, "references">[];
  dismissalProcess: boolean;
  sectionDisplayMode?: SectionDisplayMode;
  anchor: string[];
};

export const Contents = ({
  anchor,
  sectionDisplayMode,
  dismissalProcess,
  contents = [],
}: ContentsParameters) => {
  let editorialContent = contents?.map(({ name, blocks }) => {
    return (
      <ContentBlocks key={name} name={name} blocks={blocks}></ContentBlocks>
    );
  });
  let contentWrapper;
  if (editorialContent && editorialContent.length > 1) {
    contentWrapper =
      sectionDisplayMode === "tab" ? (
        <Tabs
          data={contents?.map(({ title }, index) => ({
            panel: editorialContent?.[index],
            tab: title,
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
  let sectionTitleStyleWrapper =
    sectionDisplayMode === "tab" ? (
      <TabStylesWrapper data-testid="tabs">{contentWrapper}</TabStylesWrapper>
    ) : (
      <GlobalStylesWrapper data-testid="accordion">
        {contentWrapper}
      </GlobalStylesWrapper>
    );
  return sectionTitleStyleWrapper;
};

const TabStylesWrapper = styled.div`
  & > div > div > div {
    overflow-x: auto;
  }
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
