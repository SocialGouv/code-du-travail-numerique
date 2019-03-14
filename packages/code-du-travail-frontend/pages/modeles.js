import React from "react";
import getConfig from "next/config";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";
import { Link } from "../routes";
import { Container } from "@cdt/ui";

import SeeAlso from "../src/common/SeeAlso";
import Search from "../src/search/Search";
import { PageLayout } from "../src/layout/PageLayout";
import ModeleCourrierIcon from "../src/icons/ModeleCourrierIcon";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const fetchAllModeles = () => fetch(`${API_URL}/modeles`).then(r => r.json());

class Modeles extends React.Component {
  static async getInitialProps() {
    const data = await fetchAllModeles();
    return { data };
  }

  render() {
    const { data } = this.props;
    return (
      <PageLayout>
        <Head>
          <title>Modèles de courriers - Code du travail numérique</title>
        </Head>
        <Search />
        <div className="section">
          <Container>
            <div className="wrapper-narrow">
              <Title>Les modèles de documents à télécharger</Title>
              <ModeleCourrierList items={data.hits.hits} />
            </div>
          </Container>
        </div>
        <SeeAlso />
      </PageLayout>
    );
  }
}

const List = ({ className, items }) => (
  <ul className={className}>
    {items.map(({ id, _source }) => (
      <Item key={id}>
        <Link
          route="modeles-de-courriers"
          params={{ slug: _source.slug }}
          passHref
        >
          <ModeleLink>
            <ModeleCourrier modele={_source} />
          </ModeleLink>
        </Link>
      </Item>
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

const ModeleCourrierList = styled(List)`
  list-style-type: none;
  padding-left: 0;
`;
const Title = styled.h3`
  text-align: center;
`;
const Item = styled.li``;

const ModeleLink = styled.a`
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  border-radius: var(--border-radius-base);
  padding: 1rem;
  padding: var(--spacing-base);
  :link {
    text-decoration: none;
  }
  :hover {
    border-color: #c9d3df;
    border-color: var(--color-element-border);
    background: #ebeff3;
    background: var(--color-dark-background);
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
  color: #8393a7;
  color: var(--color-dark-grey);
`;

const Label = styled.span`
  font-weight: 700;
  color: #53657d;
  color: var(--color-darker-grey);
`;

const Value = styled.span`
  font-weight: 700;
  text-transform: uppercase;
  color: #adb9c9;
  color: var(--color-grey);
`;

export default Modeles;
