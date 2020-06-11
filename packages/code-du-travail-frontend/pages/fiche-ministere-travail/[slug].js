import React from "react";
import { useRouter } from "next/router";
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

export async function getServerSideProps({ query: { slug } }) {
  const response = await fetch(`${API_URL}/sheets-mt/${slug}`);
  if (!response.ok) {
    return { props: { errorCode: response.status } };
  }

  const data = await response.json();
  return { props: { data, slug } };
}

const Fiche = ({ data = { _source: {} }, errorCode, slug }) => {
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

  const titledSections = sections
    .filter((section) => section.anchor)
    .map(({ anchor, html, title }) => ({
      id: anchor,
      title: <h2>{title}</h2>,
      body: <TabContent>{decode(html)}</TabContent>,
    }));

  const { asPath } = useRouter();
  const anchor = asPath.split("#")[1];

  // titleless section have the page title but no anchor.
  const untitledSection = sections.find((section) => !section.anchor);
  return (
    <Layout errorCode={errorCode}>
      <Metas
        description={description}
        pathname={`/fiche-ministere-travail/${slug}`}
        title={title}
      />
      <StyledAnswer
        title={title}
        relatedItems={relatedItems}
        emptyMessage="Cette fiche n'a pas été trouvée"
        intro={intro}
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

export default Fiche;

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
