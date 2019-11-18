import React from "react";
import styled from "styled-components";
import {
  Container,
  PageTitle,
  Section,
  theme,
  Title,
  Wrapper
} from "@socialgouv/react-ui";

import { Layout } from "../src/layout/Layout";
import Metas from "../src/common/Metas";
import Origins from "../src/droit-du-travail/Origins";
import Hierarchy from "../src/droit-du-travail/Hierarchy";

const DroitDuTravail = ({ ogImage, pageUrl }) => (
  <Layout>
    <Metas
      url={pageUrl}
      title="Le droit du travail - Code du travail numérique"
      description="Le droit du travail, c'est quoi ?"
      image={ogImage}
    />
    <StyledSection variant="white">
      <StyledContainer>
        <BigBlock>
          <Wrapper>
            <PageTitle>Le droit du travail, c’est quoi ?</PageTitle>
            <strong>
              Le droit du travail est l’ensemble des règles juridiques
              applicables aux relations entre employeurs privés et salariés, à
              l’occasion du travail.
            </strong>
            <p>
              Le droit du travail organise les relations professionnelles de
              travail entre l’employeur et le salarié individuellement et la
              collectivité des salariés. Il encadre de nombreux domaines tels
              que la rémunération, la durée du travail, les congés, la
              discipline, le licenciement, l’emploi, la formation, la sécurité
              et la santé au travail, la négociation collective, la grève et la
              représentation du personnel.
            </p>
            <p>
              Le droit du travail est un droit en constante évolution car il
              comprend des enjeux politiques, économiques et sociaux forts.
            </p>
          </Wrapper>
        </BigBlock>
        <SmallBlock>
          <Wrapper>
            <Title>Ce n’est pas... </Title>
            <p>
              Le droit du travail ne concerne pas les travailleurs qui sont
              soumis au droit public (par exemple, les fonctionnaires), les
              travailleurs indépendants (artisan, commerçant, professions
              libérales...), les bénévoles et les dirigeants d’entreprise.
            </p>
          </Wrapper>
        </SmallBlock>
      </StyledContainer>
    </StyledSection>
    <Origins />
    <Hierarchy />
  </Layout>
);

export default DroitDuTravail;

const { box, breakpoints, colors, fonts, spacings } = theme;

const StyledSection = styled(Section)`
  padding: ${spacings.larger} 0;
`;

const StyledContainer = styled(Container)`
  position: relative;
  display: flex;
  align-items: flex-end;
  max-width: 1200px;
  margin-bottom: ${spacings.large};
  @media (max-width: ${breakpoints.tablet}) {
    flex-wrap: wrap;
    margin-bottom: 0;
  }
`;

const BigBlock = styled.div`
  position: relative;
  left: 4%;
  flex-basis: 80%;
  padding-right: 8%;
  background-color: ${colors.bgSecondary};
  border-radius: ${box.borderRadius};
  @media (max-width: ${breakpoints.tablet}) {
    left: 0;
    flex-basis: 100%;
    margin-bottom: ${spacings.medium};
    padding: 0;
  }
`;

const H1 = styled.h1`
  font-size: ${fonts.sizes.headings.large};
`;

const SmallBlock = styled.div`
  position: relative;
  right: 4%;
  bottom: ${spacings.medium};
  flex-basis: 410px;
  flex-shrink: 0;
  background-color: ${colors.bgTertiary};
  border-radius: ${box.borderRadius};
  @media (max-width: ${breakpoints.tablet}) {
    right: 0;
    bottom: 0;
    flex-basis: 100%;
    padding: 0;
  }
`;
