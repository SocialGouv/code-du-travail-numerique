import React from "react";
import styled from "styled-components";
import FicheServicePublic from "@socialgouv/react-fiche-service-public";
import { Accordion, Alert, theme, Wrapper } from "@socialgouv/react-ui";
import Html from "../../src/common/Html";

//Custom MDX component
const Tab = props => (
  <StyledAccordion
    items={[
      {
        title: <h3>{props.title}</h3>,
        body: props.children
      }
    ]}
  />
);

const Hdn = props => (
  <Alert variant="info">
    <h4>Texte applicable</h4>
    <div {...props} />
  </Alert>
);

const ContentSP = ({ raw }) => (
  <>
    {raw && (
      <StyledContent>
        <FicheServicePublic data={JSON.parse(raw).children} />
      </StyledContent>
    )}
  </>
);

const ContentMT = props => {
  const { intro, sections } = props;
  return (
    <>
      {intro && (
        <IntroWrapper>
          <Intro>{intro}</Intro>
        </IntroWrapper>
      )}
      <Accordion
        items={sections.map(section => ({
          id: section.anchor,
          title: <h3>{section.title}</h3>,
          body: <TabContent>{section.html}</TabContent>
        }))}
      />
    </>
  );
};

const customComponentsMdx = content => {
  const contentComponent =
    content && content.raw ? (
      <ContentSP raw={content.raw} />
    ) : (
      <ContentMT {...content} />
    );
  return {
    tab: Tab,
    hdn: Hdn,
    content: () => contentComponent
  };
};

const { box, spacing } = theme;

const StyledAccordion = styled(Accordion)`
  *[data-accordion-component="AccordionItem"] {
    &:nth-of-type(1) {
      border-bottom: ${box.border};
    }
  }
  *[data-accordion-component="AccordionItemButton"] {
    padding-left: ${spacing.small};
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
  margin-bottom: ${spacing.large};
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
  margin: ${spacing.base} auto;
`;

export default customComponentsMdx;
