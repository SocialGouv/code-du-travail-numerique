import React from "react";
import getConfig from "next/config";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";
import { Container, Section, theme } from "@cdt/ui-old";

import { Layout } from "../../src/layout/Layout";
import ModeleCourrierIcon from "../../src/icons/ModeleCourrierIcon";
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
            <Title>Les modèles de documents à télécharger</Title>
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
          <ModeleLink>
            <ModeleCourrier modele={_source} />
          </ModeleLink>
        </Link>
      </li>
    ))}
  </ul>
);

const ModeleCourrier = ({ modele }) => {
  const { filename, title, editor } = modele;
  const [, extension] = filename.split(/\.([a-z]{2,4})$/);
  return (
    <React.Fragment>
      <Icon />
      <TextWrapper>
        <strong>{title}</strong>
        <P>
          <Label>Source</Label>: <Label>{editor}</Label>
          {extension && editor ? " - " : null}
          <Value>{extension}</Value>
        </P>
      </TextWrapper>
    </React.Fragment>
  );
};

const { box, colors, spacing } = theme;

const ModeleCourrierList = styled(List)`
  list-style-type: none;
  padding-left: 0;
`;
const Title = styled.h1`
  text-align: center;
`;

const ModeleLink = styled.a`
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  border-radius: ${box.borderRadius};
  padding: ${spacing.base};
  :link {
    text-decoration: none;
  }
  :hover {
    border-color: ${colors.lightGrey};
    background: ${colors.darkBackground};
  }
  :hover strong {
    text-decoration: underline;
  }
`;
const TextWrapper = styled.div`
  padding-left: 1rem;
`;
const P = styled.p`
  margin-bottom: 0;
  font-size: 0.9em;
`;
const Icon = styled(ModeleCourrierIcon)`
  width: 25px;
  flex-shrink: 0;
  color: ${colors.darkGrey};
`;

const Label = styled.span`
  font-weight: 700;
  color: ${colors.darkerGrey};
`;

const Value = styled.span`
  font-weight: 700;
  text-transform: uppercase;
  color: ${colors.grey};
`;

export default Modeles;
