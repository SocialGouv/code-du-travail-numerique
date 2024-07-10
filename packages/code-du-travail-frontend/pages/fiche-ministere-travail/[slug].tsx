import { decode } from "@socialgouv/fiches-travail-data";
import styled from "styled-components";

import Answer from "../../src/common/Answer";
import Html from "../../src/common/Html";
import Metas from "../../src/common/Metas";
import { Layout } from "../../src/layout/Layout";
import { Breadcrumb, FicheTravailEmploi } from "@socialgouv/cdtn-types";
import { AccordionWithAnchor as Accordion } from "../../src/common/AccordionWithAnchor";
import { getBySourceAndSlugItems, getSheetsMtService } from "../../src/api";

const buildAccordionSections = (sections) =>
  sections
    .filter((section) => section.anchor)
    .map(({ anchor, html, title }) => {
      return {
        body: <TabContent>{decode(html)}</TabContent>,
        id: anchor,
        title,
      };
    });

interface Props {
  breadcrumbs: Breadcrumb[];
  date: string;
  description: string;
  intro: string;
  sections: Array<any>;
  title: string;
  url: string;
  relatedItems: Array<any>;
}

function Fiche(props: Props): JSX.Element {
  const {
    breadcrumbs,
    date,
    description,
    intro,
    sections = [],
    title,
    url,
    relatedItems,
  } = props;

  const titledSections = buildAccordionSections(sections);

  // titleless section have the page title but no anchor.
  const untitledSection = sections.find((section) => !section.anchor);
  return (
    <Layout>
      <Metas title={title} description={description} overrideCanonical={url} />
      <StyledAnswer
        title={title}
        relatedItems={relatedItems}
        intro={intro}
        date={date}
        source={{ name: "Fiche Ministère du travail", url }}
        breadcrumbs={breadcrumbs}
      >
        {untitledSection && <Html>{untitledSection.html}</Html>}
        <Accordion titleLevel={2} items={titledSections} />
      </StyledAnswer>
    </Layout>
  );
}

export const getServerSideProps = async ({ query }) => {
  const data = await getBySourceAndSlugItems<FicheTravailEmploi>(
    "contributions",
    query.slug
  );
  return { props: { relatedItems: data.relatedItems, ...data._source } };
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
