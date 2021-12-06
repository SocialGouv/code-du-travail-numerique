import {
  Container,
  icons,
  IconStripe,
  InsertTitle,
  PageTitle,
  Paragraph,
  Section,
  theme,
  Title,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import Metas from "../src/common/Metas";
import Hierarchy from "../src/droit-du-travail/Hierarchy";
import Origins from "../src/droit-du-travail/Origins";
import { Layout } from "../src/layout/Layout";

const DroitDuTravail = ({ hash }) => (
  <Layout>
    <Metas
      title="Le droit du travail"
      description="Qu’est-ce que le droit du travail ?"
    />
    <Section>
      <Container>
        <PageTitle
          subtitle={
            <>
              Retrouvez la définition du droit du travail, les textes qui en
              sont à l’origine <DesktopOnlyLineBreak />
              ainsi que leur articulation.
            </>
          }
        >
          Le droit du travail
        </PageTitle>
        <Container narrow noPadding>
          <Wrapper variant="main">
            <Title shift={spacings.larger}>
              Qu’est-ce que le droit du travail&nbsp;?
            </Title>
            <p>
              <strong>
                Le droit du travail est l’ensemble des règles juridiques
                applicables aux relations entre employeurs privés et salariés, à
                l’occasion du travail.
              </strong>
            </p>
            <p>
              Le droit du travail organise les relations professionnelles de
              travail entre l’employeur et le salarié individuellement et la
              collectivité des salariés. Il encadre de nombreux domaines tels
              que le contrat de travail, la rémunération, la durée du travail,
              les congés, la discipline, le licenciement, l’emploi, la
              formation, la sécurité et la santé au travail, la négociation
              collective, la grève et la représentation du personnel.
            </p>
            <p>
              Le droit du travail est un droit en constante évolution car il
              comprend des enjeux sociaux, économiques et politiques forts.
            </p>
            <Wrapper variant="dark">
              <IconStripe icon={icons.Warning}>
                <StyledInsertTitle>
                  Le droit du travail, ce n’est pas…
                </StyledInsertTitle>
                <Paragraph noMargin>
                  Le droit du travail ne concerne pas les travailleurs qui sont
                  soumis au droit public (par exemple, les fonctionnaires), les
                  travailleurs indépendants (artisan, commerçant, professions
                  libérales…), les bénévoles et les dirigeants d’entreprise.
                </Paragraph>
              </IconStripe>
            </Wrapper>
          </Wrapper>
        </Container>
      </Container>
      <Origins />
      <Hierarchy hash={hash} />
    </Section>
  </Layout>
);

export default DroitDuTravail;

DroitDuTravail.getInitialProps = ({ asPath }) => {
  const hash = asPath.split("#")[1];
  return { hash };
};

const { breakpoints, spacings } = theme;

const StyledInsertTitle = styled(InsertTitle).attrs({
  "aria-level": "4",
  role: "heading",
})``;

const DesktopOnlyLineBreak = styled.br`
  @media (max-width: ${breakpoints.desktop}) {
    display: none;
  }
`;
