import {
  ArrowLink,
  Container,
  FlatList,
  icons,
  IconStripe,
  PageTitle,
  Section,
  TableOfContent,
  theme,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import fetch from "isomorphic-unfetch";
import getConfig from "next/config";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import Answer from "../../src/common/Answer";
import Metas from "../../src/common/Metas";
import { Layout } from "../../src/layout/Layout";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

function DossierThematique({ dossier }) {
  if (!dossier) {
    return <Answer emptyMessage="Ce dossier thématique n'a pas été trouvé" />;
  }
  const {
    description = "",
    metaDescription,
    populars,
    sections = [],
    title,
  } = dossier;

  return (
    <Layout>
      <Metas
        title={title}
        description={metaDescription || description || title}
      />
      <Section>
        <Container narrow>
          <PageTitle subtitle={description}>{title}</PageTitle>
        </Container>
        <MainContainer>
          <FixedWrapper>
            <NavTitle>Sommaire</NavTitle>
            <TableOfContent
              ids={sections.map(({ categories }) =>
                categories.map((category) => category.id)
              )}
            />
          </FixedWrapper>
          <Content>
            {populars.length > 0 && (
              <StyledWrapper variant="light">
                <IconStripe centered icon={icons["Populars"]}>
                  <H2
                    id="populaires"
                    data-short-title="Contenu les plus populaires"
                  >
                    Contenus populaires
                  </H2>
                </IconStripe>
                <StyledFlatList>
                  {populars.map((ref) => (
                    <Li key={ref.url || ref.externalUrl}>
                      <DossierLink {...ref} />
                    </Li>
                  ))}
                </StyledFlatList>
              </StyledWrapper>
            )}
            {sections.map(({ label, categories }) => (
              <>
                {label}
                {categories.map(({ icon, id, refs, shortTitle, title }) => (
                  <StyledWrapper key={id}>
                    <IconStripe centered icon={icons[icon]}>
                      <H2 id={id} data-short-title={shortTitle}>
                        {title}
                      </H2>
                    </IconStripe>
                    <StyledFlatList>
                      {refs.map((ref) => (
                        <Li key={ref.url || ref.externalUrl}>
                          <DossierLink {...ref} />
                        </Li>
                      ))}
                    </StyledFlatList>
                  </StyledWrapper>
                ))}
              </>
            ))}
          </Content>
        </MainContainer>
      </Section>
    </Layout>
  );
}

DossierThematique.getInitialProps = async ({ query: { slug } }) => {
  // const responseContainer = await fetch(`${API_URL}/dossiers/${slug}`);
  // if (!responseContainer.ok) {
  //   return { statusCode: responseContainer.status };
  // }
  // const dossier = await responseContainer.json();
  const dossier = {
    metaDescription: "oui oui",
    populars: [
      {
        title:
          "Covid-19 : Les mesures de protection en entreprise (Protocole national)",
        url:
          "/information/covid-19-les-mesures-de-protection-en-entreprise-protocole-national",
      },
      {
        title:
          "Covid-19 : évaluer le risque sanitaire (document d'évaluation des risques) [Infographie]",
        url:
          "/information/covid-19-integrer-le-risque-sanitaire-dans-lentreprise-protocole-national",
      },
    ],
    sections: [
      {
        categories: [
          {
            icon: "Health",
            id: "no-label",
            refs: [
              {
                title:
                  "Arrêt maladie : indemnités journalières versées au salarié",
                url:
                  "/fiche-service-public/arret-maladie-indemnites-journalieres-versees-au-salarie",
              },
              {
                title: "Personnes vulnérables",
                url:
                  "https://www.service-public.fr/particuliers/actualites/A14380",
              },
              {
                title: "Cas contact : demander un arrêt maladie en ligne",
                url: "https://declare.ameli.fr/cas-contact/conditions",
              },
            ],
            title: "Je suis une catégorie sans label, bien placée",
          },
        ],
      },
      {
        categories: [
          {
            icon: "Health",
            id: "jeunes",
            refs: [
              {
                title:
                  "Arrêt maladie : indemnités journalières versées au salarié",
                url:
                  "/fiche-service-public/arret-maladie-indemnites-journalieres-versees-au-salarie",
              },
              {
                title: "Personnes vulnérables",
                url:
                  "https://www.service-public.fr/particuliers/actualites/A14380",
              },
              {
                title: "Cas contact : demander un arrêt maladie en ligne",
                url: "https://declare.ameli.fr/cas-contact/conditions",
              },
            ],
            title: "Jeunes",
          },
          {
            icon: "Health",
            id: "jeuness",
            refs: [
              {
                title:
                  "Arrêt maladie : indemnités journalières versées au salarié",
                url:
                  "/fiche-service-public/arret-maladie-indemnites-journalieres-versees-au-salarie",
              },
              {
                title: "Personnes vulnérables",
                url:
                  "https://www.service-public.fr/particuliers/actualites/A14380",
              },
              {
                title: "Cas contact : demander un arrêt maladie en ligne",
                url: "https://declare.ameli.fr/cas-contact/conditions",
              },
            ],
            title: "Jaunes",
          },
        ],
        label: "Aides pour recruter",
      },
      {
        categories: [
          {
            icon: "Health",
            id: "jeunessss",
            refs: [
              {
                title:
                  "Arrêt maladie : indemnités journalières versées au salarié",
                url:
                  "/fiche-service-public/arret-maladie-indemnites-journalieres-versees-au-salarie",
              },
              {
                title: "Personnes vulnérables",
                url:
                  "https://www.service-public.fr/particuliers/actualites/A14380",
              },
              {
                title: "Cas contact : demander un arrêt maladie en ligne",
                url: "https://declare.ameli.fr/cas-contact/conditions",
              },
            ],
            title: "Jeunes",
          },
          {
            icon: "Health",
            id: "jeunesss",
            refs: [
              {
                title:
                  "Arrêt maladie : indemnités journalières versées au salarié",
                url:
                  "/fiche-service-public/arret-maladie-indemnites-journalieres-versees-au-salarie",
              },
              {
                title: "Personnes vulnérables",
                url:
                  "https://www.service-public.fr/particuliers/actualites/A14380",
              },
              {
                title: "Cas contact : demander un arrêt maladie en ligne",
                url: "https://declare.ameli.fr/cas-contact/conditions",
              },
            ],
            title: "Jaunes",
          },
        ],
        label: "Truc muches",
      },
    ],
    title: "ok ok",
  };
  return { dossier };
};

const { breakpoints, fonts, spacings } = theme;

const MainContainer = styled(Container)`
  display: flex;
  align-items: flex-start;
  @media (max-width: ${breakpoints.tablet}) {
    display: block;
  }
`;

const FixedWrapper = styled.div`
  position: sticky;
  top: 14rem;
  z-index: 1;
  width: calc(30% - ${spacings.larger});
  margin-right: ${spacings.larger};
  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

const NavTitle = styled.strong`
  display: block;
  margin-bottom: ${spacings.small};
  font-size: ${fonts.sizes.headings.small};
`;

const Content = styled.div`
  width: 75%;
  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
  }
`;

const StyledWrapper = styled(Wrapper)`
  margin-bottom: ${spacings.large};
  padding-top: ${spacings.large};
  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: ${spacings.xmedium};
  }
`;

const H2 = styled.h2`
  margin: 0;
`;

const StyledFlatList = styled(FlatList)`
  display: flex;
  flex-wrap: wrap;
  margin-top: ${spacings.large};
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    margin-top: ${spacings.xmedium};
  }
`;

const Li = styled.li`
  width: 48%;
  padding-bottom: ${spacings.small};
  &:nth-child(even) {
    margin-left: 4%;
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    &:nth-child(even) {
      margin-left: 0;
    }
  }
`;

const DossierLink = ({ url, title }) => {
  if (!url.includes("http")) {
    return (
      <Link href={url} passHref>
        <LeftArrowLink>{title}</LeftArrowLink>
      </Link>
    );
  }
  return (
    <LeftArrowLink href={url} rel="noopener noreferrer" target="_blank">
      {title}
    </LeftArrowLink>
  );
};

const LeftArrowLink = styled(ArrowLink).attrs(() => ({
  arrowPosition: "left",
  className: "no-after",
}))`
  word-break: break-word;
`;

export default DossierThematique;
