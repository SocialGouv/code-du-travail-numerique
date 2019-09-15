import React from "react";
import { withRouter } from "next/router";
import getConfig from "next/config";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";

import { getRouteBySource, getLabelBySource } from "@cdt/sources";

import {
  Container,
  List,
  LargeLink,
  ListItem,
  Section,
  theme,
  icons
} from "@cdt/ui-old";

import Answer from "../../src/common/Answer";
import { DownloadFile } from "../../src/common/DownloadFile";
import ModeleCourrierIcon from "../../src/icons/ModeleCourrierIcon";
import ArticleIcon from "../../src/icons/ArticleIcon";
import ReponseIcon from "../../src/icons/ReponseIcon";
import { PageLayout } from "../../src/layout/PageLayout";
import Metas from "../../src/common/Metas";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const fetchQuestion = ({ slug }) => fetch(`${API_URL}/items/faq/${slug}`);

class Question extends React.Component {
  static async getInitialProps({ query }) {
    const response = await fetchQuestion(query);
    if (!response.ok) {
      return { statusCode: response.status };
    }
    const data = await response.json();
    return { data };
  }

  render() {
    const {
      data = { _source: {}, relatedItems: {} },
      pageUrl,
      ogImage
    } = this.props;
    const { query } = this.props.router;

    const {
      modeles_de_courriers = [],
      code_du_travail = [],
      faq = []
    } = data.relatedItems;

    let author;
    switch (data._source.author) {
      case "DGT":
        author = "Informations fournies par la Direction Générale du Travail";
        break;
      default:
        author =
          "Informations fournies par vos services de renseignement des DIRECCTE en région";
    }

    const additionalContent = (
      <React.Fragment>
        <MoreLinks
          title="Articles de loi correspondants"
          icon={ArticleIcon}
          query={query.q}
          items={code_du_travail}
        >
          <DisclaimerContent>
            Pensez à vérifier votre accord d’entreprise : S’il prévoit des «
            garanties au moins équivalentes » à ce sujet, ces clauses
            s’appliquent dans votre cas -&nbsp;
            <a href="#" title="consulter la hierachie des normes">
              En savoir plus
            </a>
          </DisclaimerContent>
        </MoreLinks>
        <MoreLinks
          title="Pour aller plus loin"
          icon={ReponseIcon}
          query={query.q}
          items={faq}
        />
      </React.Fragment>
    );

    return (
      <PageLayout>
        <Metas
          url={pageUrl}
          title={data._source.title}
          description={data._source.description}
          image={ogImage}
        />
        <Answer
          title={data._source.title}
          emptyMessage="Cette question n'a pas été trouvée"
          html={data._source.html}
          date={data._source.date}
          sourceType="Réponse détaillée"
          footer={author}
          additionalContent={additionalContent}
          icon={icons.Question}
        >
          {modeles_de_courriers.length > 0 && (
            <React.Fragment>
              <h4>Télécharger le modèle</h4>
              <DownloadFile
                title={modeles_de_courriers[0]._source.title}
                file={`${API_URL}/docs/${modeles_de_courriers[0]._source.filename}`}
                type="Modèle de document"
                icon={ModeleCourrierIcon}
              />
            </React.Fragment>
          )}
        </Answer>
      </PageLayout>
    );
  }
}

export default withRouter(Question);

function MoreLinks({ items, icon, query, title, children }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <Section>
      <Container narrow>
        <SectionTitle>{title}</SectionTitle>
        {children}
        <List>
          {items.map(({ _id, _source: { slug, title, source, path = "" } }) => (
            <ListItem key={_id}>
              <Link
                href={{
                  pathname: `/${getRouteBySource(source)}[slug]`,
                  query: { q: query }
                }}
                as={`/${getRouteBySource(source)}/${slug}?q=${query}`}
                passHref
              >
                <LargeLink icon={icon}>
                  <Title>{title}</Title>
                  {path && <Path>{path.substr(1).replace(/\//g, " » ")}</Path>}
                  <Source>source: {getLabelBySource(source)}</Source>
                </LargeLink>
              </Link>
            </ListItem>
          ))}
        </List>
      </Container>
    </Section>
  );
}

const { colors, spacing } = theme;

const SectionTitle = styled.h2`
  text-align: center;
`;

const DisclaimerContent = styled.div`
  margin-bottom: ${spacing.interComponent};
  color: ${colors.darkerGRey};
`;

const Title = styled.strong`
  display: block;
  text-decoration: none;
`;

const Path = styled.span`
  display: block;
`;

const Source = styled.span`
  font-weight: 700;
  color: ${colors.darkGrey};
`;
