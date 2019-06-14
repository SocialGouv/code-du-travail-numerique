import React from "react";
import { withRouter } from "next/router";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";
import Answer from "../src/common/Answer";
import { DownloadFile } from "../src/common/DownloadFile";
import ModeleCourrierIcon from "../src/icons/ModeleCourrierIcon";
import {
  AsideTitle,
  Container,
  List,
  ListItem,
  Section,
  theme,
  Wrapper
} from "@cdt/ui";
import styled from "styled-components";
import ArticleIcon from "../src/icons/ArticleIcon";
import { BigLink } from "../src/common/BigLink";
import ReponseIcon from "../src/icons/ReponseIcon";
import { PageLayout } from "../src/layout/PageLayout";
import { Metas } from "../src/common/Metas";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const fetchQuestion = ({ slug }) =>
  fetch(`${API_URL}/items/faq/${slug}`).then(r => r.json());

class Question extends React.Component {
  static async getInitialProps({ query }) {
    const data = await fetchQuestion(query);
    if (data.status === 404) {
      return { data: { _source: {}, relatedItems: {} } };
    }
    return { data };
  }

  render() {
    const { data, pageUrl, ogImage } = this.props;
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
          <Container narrow>
            <DisclaimerContent>
              Pensez à vérifier votre accord d’entreprise : S’il prévoit des «
              garanties au moins équivalentes » à ce sujet, ces clauses
              s’appliquent dans votre cas -
              <a href="#" title="consulter la hierachie des normes">
                En savoir plus
              </a>
            </DisclaimerContent>
          </Container>
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
        >
          {modeles_de_courriers.length > 0 && (
            <React.Fragment>
              <AsideTitle>Télécharger le modèle</AsideTitle>
              <DownloadFile
                title={modeles_de_courriers[0]._source.title}
                file={`${API_URL}/docs/${
                  modeles_de_courriers[0]._source.filename
                }`}
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
      <Container>
        <Wrapper>
          <SectionTitle>{title}</SectionTitle>
          {children}
          <StyledList>
            {items.map(item => (
              <ListItem key={item._id}>
                <BigLink data={item} icon={icon} query={query} />
              </ListItem>
            ))}
          </StyledList>
        </Wrapper>
      </Container>
    </Section>
  );
}

const { breakpoints, colors, spacing } = theme;

const SectionTitle = styled.h2`
  text-align: center;
  font-weight: 700;
`;

const DisclaimerContent = styled.div`
  color: ${colors.darkerGRey};
`;

const StyledList = styled(List)`
  margin: ${spacing.medium} 130px ${spacing.medium} 100px;
  @media (max-width: ${breakpoints.mobile}) {
    margin: ${spacing.medium} 0;
  }
`;
