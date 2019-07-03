import React from "react";
import getConfig from "next/config";
import styled from "styled-components";
import { Button, Container, List, ListItem, Section, theme } from "@cdt/ui";

import { Link } from "../../routes";
import ServiceRenseignementModal from "../common/ServiceRenseignementModal";

const { publicRuntimeConfig } = getConfig();

const Footer = () => (
  <StyledFooter>
    <Section>
      <FirstContainerWrapper>
        <h2>Besoin d’un accompagnement personnalisé ?</h2>
        <SecondContainerWrapper narrow noPadding>
          Les services de renseignement en droit du travail peuvent vous donner
          des informations juridiques générales relatives au Code du travail,
          aux conventions collectives, à la jurisprudence. Ils peuvent également
          vous conseiller et vous orienter dans vos démarches.
        </SecondContainerWrapper>
        <ServiceRenseignementModal>
          <Button variant="primary">
            Contacter les services de renseignement
          </Button>
        </ServiceRenseignementModal>
      </FirstContainerWrapper>
    </Section>
    <Section>
      <Links>
        <Category>
          <CategoryTitle>Code du travail numérique</CategoryTitle>
          <List>
            <StyledListItem>
              <Link route="droit-du-travail">
                <a>Le droit du travail</a>
              </Link>
            </StyledListItem>
            <StyledListItem>
              <Link route="about">
                <a>À propos</a>
              </Link>
            </StyledListItem>
            <StyledListItem>
              <Link route="mentions-legales">
                <a>Mentions légales</a>
              </Link>
            </StyledListItem>
            <StyledListItem>
              <a href="mailto:codedutravail@beta.gouv.fr">Contact</a>
            </StyledListItem>
          </List>
        </Category>
        <Category>
          <CategoryTitle>Aidez-nous à améliorer cet outil</CategoryTitle>
          <List>
            <StyledListItem>
              <a
                href={
                  "https://github.com/SocialGouv/code-du-travail-numerique/tree/v" +
                  publicRuntimeConfig.PACKAGE_VERSION
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                Contribuer sur Github
              </a>
            </StyledListItem>
            <StyledListItem>
              <a
                href={
                  "https://github.com/SocialGouv/code-du-travail-numerique/releases/tag/v" +
                  publicRuntimeConfig.PACKAGE_VERSION
                }
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
            <StyledListItem>
              <a
                href={
                  "https://travail-emploi.gouv.fr/ministere/organisation/article/dgt-direction-generale-du-travail"
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                La Direction Générale du Travail
              </a>
            </StyledListItem>
            <StyledListItem>
              <a
                href={"https://incubateur.social.gouv.fr/"}
                target="_blank"
                rel="noopener noreferrer"
              >
                L’incubateur des ministères sociaux
              </a>
            </StyledListItem>
            <StyledListItem>
              <a
                href={"https://beta.gouv.fr/"}
                target="_blank"
                rel="noopener noreferrer"
              >
                beta.gouv.fr
              </a>
            </StyledListItem>
          </List>
        </Category>
      </Links>
    </Section>
  </StyledFooter>
);

export default Footer;

const { breakpoints, colors, fonts, spacing } = theme;

const StyledFooter = styled.footer`
  @media print {
    display: none;
  }
`;

const FirstContainerWrapper = styled(Container)`
  text-align: center;
`;

const SecondContainerWrapper = styled(Container)`
  margin-bottom: ${spacing.interComponent};
  text-align: left;
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
  font-weight: bold;
`;

const StyledListItem = styled(ListItem)`
  margin: ${spacing.xsmall} 0;
  a,
  a:visited {
    color: ${colors.darkText};
  }
`;
