import FicheServicePublic from "@socialgouv/react-fiche-service-public";
import {
  Accordion,
  Alert,
  Heading,
  theme,
  Wrapper,
} from "@socialgouv/react-ui";
import React from "react";
import styled from "styled-components";

import Html from "../../src/common/Html";

//Custom MDX component
const Tab = (props) => (
  <StyledAccordion
    items={[
      {
        body: props.children,
        title: <h3>{props.title}</h3>,
      },
    ]}
  />
);

const Hdn = (props) => (
  <Alert>
    <Heading>Texte applicable</Heading>
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

const ContentMT = (props) => {
  const { intro, sections } = props;
  return (
    <>
      {intro && (
        <IntroWrapper>
          <Intro>{intro}</Intro>
        </IntroWrapper>
      )}
      {sections && (
        <Accordion
          items={sections.map((section) => ({
            body: <TabContent>{section.html}</TabContent>,
            id: section.anchor,
            title: <h3>{section.title}</h3>,
          }))}
        />
      )}
    </>
  );
};

const rehypeToReact = (content) => {
  const contentComponent =
    content && content.raw ? (
      <ContentSP raw={content.raw} />
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
