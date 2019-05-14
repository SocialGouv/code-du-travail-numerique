import React from "react";
import getConfig from "next/config";
import styled from "styled-components";
import { Button, Container, List, ListItem, Section, theme } from "@cdt/ui";

import { Link } from "../../routes";
import ServiceRenseignementModal from "../common/ServiceRenseignementModal";

const { publicRuntimeConfig } = getConfig();

const Footer = () => (
  <footer className="site-footer" id="footer">
    <Section variant="light">
      <Container className="center">
        <h2>Besoin d’un accompagnement personnalisé ?</h2>
        <ContainerWrapper>
          <Container narrow noPadding>
            Les services de renseignement en droit du travail peuvent vous
            donner des informations juridiques générales relatives au Code du
            travail, aux conventions collectives, à la jurisprudence. Ils
            peuvent également vous conseiller et vous orienter dans vos
            démarches.
          </Container>
        </ContainerWrapper>
        <ServiceRenseignementModal>
          <Button variant="primary">
            Contacter les services de renseignement
          </Button>
        </ServiceRenseignementModal>
      </Container>
    </Section>
    <LinkSection>
      <Links>
        <Category>
          <CategoryTitle>Code du travail numérique</CategoryTitle>
          <List>
            <StyledListItem key="0">
              <Link route="about">
                <a>À propos</a>
              </Link>
            </StyledListItem>
            <StyledListItem key="1">
              <Link route="mentions-legales">
                <a>Mentions légales</a>
              </Link>
            </StyledListItem>
            <StyledListItem key="2">
              <a href="mailto:codedutravail@beta.gouv.fr">Contact</a>
            </StyledListItem>
          </List>
        </Category>
        <Category>
          <CategoryTitle>Aidez-nous à améliorer cet outil</CategoryTitle>
          <List>
            <StyledListItem key="0">
              <a
                href={
                  "https://github.com/SocialGouv/code-du-travail-numerique/tree/v" +
                  publicRuntimeConfig.PACKAGE_VERSION
                }
                className="external-link__after"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contribuer sur Github
              </a>
            </StyledListItem>
            <StyledListItem key="1">
              <a
                href={
                  "https://github.com/SocialGouv/code-du-travail-numerique/releases/tag/v" +
                  publicRuntimeConfig.PACKAGE_VERSION
                }
                className="external-link__after"
                target="_blank"
                rel="noopener noreferrer"
              >
                Journal des modifications
              </a>
            </StyledListItem>
          </List>
        </Category>
        <Category>
          <CategoryTitle>En collaboration avec</CategoryTitle>
          <List>
            <StyledListItem key="0">
              <a
                href={
                  "https://travail-emploi.gouv.fr/ministere/organisation/article/dgt-direction-generale-du-travail"
                }
                className="external-link__after"
                target="_blank"
                rel="noopener noreferrer"
              >
                La Direction Générale du Travail
              </a>
            </StyledListItem>
            <StyledListItem key="1">
              <a
                href={"https://incubateur.social.gouv.fr/"}
                className="external-link__after"
                target="_blank"
                rel="noopener noreferrer"
              >
                L’incubateur des ministères sociaux
              </a>
            </StyledListItem>
            <StyledListItem key="2">
              <a
                href={"https://beta.gouv.fr/"}
                className="external-link__after"
                target="_blank"
                rel="noopener noreferrer"
              >
                beta.gouv.fr
              </a>
            </StyledListItem>
          </List>
        </Category>
      </Links>
    </LinkSection>
  </footer>
);

export default Footer;

const { breakpoints, colors, fonts, spacing } = theme;

const ContainerWrapper = styled.div`
  margin-bottom: ${spacing.interComponent};
  text-align: left;
`;

const LinkSection = styled(Section)`
  box-shadow: 0 -10px 10px -10px ${colors.lightGrey};
`;

const Links = styled(Container)`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const Category = styled.div`
  & + & {
    padding-left: ${spacing.base};
    @media (max-width: ${breakpoints.mobile}) {
      padding-left: 0;
    }
  }
`;

const CategoryTitle = styled.h3`
  font-size: ${fonts.sizeBase};
  font-weight: 700;
`;

const StyledListItem = styled(ListItem)`
  margin: ${spacing.xsmall} 0;
  a {
    color: ${colors.darkText};
  }
`;
