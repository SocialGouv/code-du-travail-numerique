import { Accordion, Alert, Heading, theme, Wrapper } from "@socialgouv/cdtn-ui";
import { FicheServicePublic } from "@socialgouv/react-fiche-service-public";
import React from "react";
import styled from "styled-components";

import Html from "../../src/common/Html";

//Custom MDX component
const Tab = (props) => (
  <StyledAccordion
    titleLevel={3}
    items={[
      {
        body: props.children,
        title: props.title,
      },
    ]}
  />
);

const Hdn = (props) => (
  <Alert>
    <Heading as="p">Texte applicable</Heading>
    <div {...props} />
  </Alert>
);

const ContentSP = ({ raw }) => {
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

const ContentMT = ({ intro, sections }) => {
  return (
    <>
      {intro && (
        <IntroWrapper>
          <Intro>{intro}</Intro>
        </IntroWrapper>
      )}
      {sections && (
        <Accordion
          levelTitle={3}
          items={sections.map((section) => ({
            body: <TabContent>{section.html}</TabContent>,
            id: section.anchor,
            title: section.title,
          }))}
        />
      )}
    </>
  );
};

const rehypeToReact = (content) => {
  const contentComponent =
    content && content.raw ? (
      <ContentSP {...content} />
    ) : (
      <ContentMT {...content} />
    );
  return {
    content: () => contentComponent,
    hdn: Hdn,
    tab: Tab,
  };
};

const { spacings } = theme;

const StyledAccordion = styled(Accordion)`
  *[data-accordion-component="AccordionItemButton"] {
    padding-left: ${spacings.small};
  }
`;

const TabContent = styled(Html)`
  & > *:first-child {
    margin-top: 0;
  }

  & > *:last-child {
    margin-bottom: 0;
  }
`;

const StyledContent = styled.div`
  margin-bottom: ${spacings.large};
`;

const Intro = styled(Html)`
  & > *:first-child {
    margin-top: 0;
  }

  & > *:last-child {
    margin-bottom: 0;
  }
`;

const IntroWrapper = styled(Wrapper)`
  margin: ${spacings.base} auto;
`;

export default rehypeToReact;
