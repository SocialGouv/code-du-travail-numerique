import React from "react";
import getConfig from "next/config";
import Link from "next/link";
import styled from "styled-components";
import {
  Button,
  Container,
  Heading,
  Section,
  theme,
  Title
} from "@socialgouv/react-ui";

import ServiceRenseignementModal from "../common/ServiceRenseignementModal";

const { publicRuntimeConfig } = getConfig();

const GITHUB_REPO = "https://github.com/SocialGouv/code-du-travail-numerique";

const Footer = () => (
  <StyledFooter>
    <Section>
      <FirstContainerWrapper>
        <Title>Besoin d’un accompagnement personnalisé ?</Title>
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
          <Heading>Code du travail numérique</Heading>
          <ul>
            <StyledListItem>
              <Link href="/droit-du-travail">
                <a>Le droit du travail</a>
              </Link>
            </StyledListItem>
            <StyledListItem>
              <Link href="/glossaire">
                <a>Glossaire</a>
              </Link>
            </StyledListItem>
            <StyledListItem>
              <Link href="/a-propos">
                <a>À propos</a>
              </Link>
            </StyledListItem>
            <StyledListItem>
              <Link href="/mentions-legales">
                <a>Mentions légales</a>
              </Link>
            </StyledListItem>
            <StyledListItem>
              <a href="mailto:codedutravailnumerique@travail.gouv.fr">
                Contact
              </a>
            </StyledListItem>
          </ul>
        </Category>
        <Category>
          <Heading>Aidez-nous à améliorer cet outil</Heading>
          <ul>
            <StyledListItem>
              <a
                href={`${GITHUB_REPO}/tree/${publicRuntimeConfig.PACKAGE_VERSION}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Contribuer sur Github
              </a>
            </StyledListItem>
            <StyledListItem>
              {(() => {
                const packageVersion =
                  publicRuntimeConfig.PACKAGE_VERSION || "";
                const isTag = packageVersion[0] === "v";
                const path = isTag
                  ? "releases/tag"
                  : packageVersion === "master"
                  ? "commits"
                  : "compare";
                return (
                  <a
                    href={`${GITHUB_REPO}/${path}/${packageVersion}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Journal des modifications
                  </a>
                );
              })()}
            </StyledListItem>
          </ul>
        </Category>
        <Category>
          <Heading>En collaboration avec</Heading>
          <ul>
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
          </ul>
        </Category>
      </Links>
    </Section>
  </StyledFooter>
);

export default Footer;

const { breakpoints, spacings } = theme;

const StyledFooter = styled.footer`
  background-color: ${({ theme }) => theme.bgSecondary};
  @media print {
    display: none;
  }
`;

const FirstContainerWrapper = styled(Container)`
  text-align: center;
`;

const SecondContainerWrapper = styled(Container)`
  margin-bottom: ${spacings.medium};
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
    padding-left: ${spacings.base};
    @media (max-width: ${breakpoints.mobile}) {
      padding-left: 0;
    }
  }
`;

const StyledListItem = styled.li`
  margin: ${spacings.tiny} 0;
  a {
    text-decoration: none;
  }
`;
