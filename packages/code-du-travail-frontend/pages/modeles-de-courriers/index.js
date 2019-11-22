import React from "react";
import getConfig from "next/config";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";
import {
  Container,
  LargeLink,
  PageTitle,
  Section,
  theme
} from "@socialgouv/react-ui";

import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

class Modeles extends React.Component {
  static async getInitialProps() {
    const response = await fetch(`${API_URL}/modeles`);
    if (!response.ok) {
      return { statusCode: response.status };
    }
    const data = await response.json();
    return { data };
  }

  render() {
    const { data = { hits: {} }, pageUrl, ogImage } = this.props;
    return (
      <Layout>
        <Metas
          url={pageUrl}
          title="Modèles de courriers - Code du travail numérique"
          description="Retrouvez l'ensemble des modèles de courriers à votre disposition."
          image={ogImage}
        />
        <Section>
          <Container narrow>
            <PageTitle>Les modèles de documents à télécharger</PageTitle>
            <ModeleCourrierList items={data.hits.hits} />
          </Container>
        </Section>
      </Layout>
    );
  }
}

const List = ({ items = [], ...props }) => (
  <ul {...props}>
    {items.map(({ _id, _source }) => (
      <li key={_id}>
        <Link
          href="modeles-de-courriers/[slug]"
          as={`modeles-de-courriers/${_source.slug}`}
          passHref
        >
          <ModeleCourrier modele={_source} />
        </Link>
      </li>
    ))}
  </ul>
);

const ModeleCourrier = ({ modele, ...props }) => {
  const { filename, title, editor } = modele;
  const [, extension] = filename.split(/\.([a-z]{2,4})$/);
  return (
    <LargeLink {...props}>
      <>
        <strong>{title}</strong>
        <P>
          <Label>Source</Label>: <Label>{editor}</Label>
          {extension && editor ? " - " : null}
          <Value>{extension}</Value>
        </P>
      </>
    </LargeLink>
  );
};

const { colors } = theme;

const ModeleCourrierList = styled(List)`
  padding-left: 0;
  list-style-type: none;
`;

const P = styled.p`
  margin-bottom: 0;
  font-size: 0.9em;
`;

const Label = styled.span`
  color: ${colors.altText};
  font-weight: 700;
`;

const Value = styled.span`
  color: ${colors.altText};
  font-weight: 700;
  text-transform: uppercase;
`;

export default Modeles;
