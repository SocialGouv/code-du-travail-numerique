import React, { useEffect, useState } from "react";
import { withRouter } from "next/router";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";
import { decode } from "@socialgouv/fiches-travail-data";
import { Accordion } from "@socialgouv/react-ui";

import Answer from "../../src/common/Answer";
import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";
import Html from "../../src/common/Html";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

const fetchSheetMT = ({ slug }) => fetch(`${API_URL}/sheets-mt/${slug}`);

const buildAccordionSections = (sections) =>
  sections
    .filter((section) => section.anchor)
    .map(({ anchor, html, title }) => ({
      id: anchor,
      title: <h2>{title}</h2>,
      body: <TabContent>{html}</TabContent>,
    }));

const Fiche = ({ data = { _source: {} }, anchor, pageUrl, ogImage }) => {
  const {
    _source: {
      breadcrumbs,
      date,
      description,
      intro,
      sections = [],
      title,
      url,
    },
    relatedItems,
  } = data;

  const [titledSections, setTitledSections] = useState(
    buildAccordionSections(sections)
  );

  useEffect(() => {
    setTitledSections(
      buildAccordionSections(
        sections.map((section) => ({
          ...section,
          html: decode(section.html),
        }))
      )
    );
  }, [sections]);

  // titleless section have the page title but no anchor.
  const untitledSection = sections.find((section) => !section.anchor);
  return (
    <Layout>
      <Metas
        url={pageUrl}
        title={title}
        description={description}
        image={ogImage}
      />
      <StyledAnswer
        title={title}
        relatedItems={relatedItems}
        emptyMessage="Cette fiche n'a pas été trouvée"
        intro={intro && <Intro>{intro}</Intro>}
        date={date}
        source={{ name: "Fiche Ministère du travail", url }}
        breadcrumbs={breadcrumbs}
      >
        {untitledSection && <Html>{untitledSection.html}</Html>}
        <Accordion preExpanded={[anchor]} items={titledSections} />
      </StyledAnswer>
    </Layout>
  );
};

Fiche.getInitialProps = async ({ query, asPath }) => {
  // beware, this one is undefined when rendered server-side
  const anchor = asPath.split("#")[1];
  const response = await fetchSheetMT(query);
  if (!response.ok) {
    return { statusCode: response.status };
  }

  const data = await response.json();
  return { data, anchor };
};

export default withRouter(Fiche);

const Intro = styled(Html)`
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
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

const StyledAnswer = styled(Answer)`
  img {
    max-width: 100%;
    height: auto;
  }
`;
