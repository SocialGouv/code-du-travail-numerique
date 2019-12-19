import React from "react";
import getConfig from "next/config";
import Link from "next/link";
import styled from "styled-components";
import {
  Button,
  Container,
  Heading,
  icons,
  FlatList,
  Section,
  theme,
  Title
} from "@socialgouv/react-ui";

import { ServiceRenseignementModal } from "../common/ServiceRenseignementModal";

const { DirectionRight: DirectionRightIcon } = icons;
const { publicRuntimeConfig } = getConfig();

const GITHUB_REPO = "https://github.com/SocialGouv/code-du-travail-numerique";

const Footer = () => (
  <OverflowWrapper>
    <StyledFooter>
      <ServiceSection>
        <Container>
          <Title as="h3" topStripped>
            Besoin de plus d’information&nbsp;?
          </Title>
          <StyledContainer narrow noPadding>
            Les services du ministère du Travail en région informent,
            conseillent et orientent les salariés et les employeurs du secteur
            privé sur leurs questions en droit du travail.
          </StyledContainer>
          <ServiceRenseignementModal>
            {openModal => (
              <Button onClick={openModal}>
                Contacter nos services en région
                <StyledDirectionRightIcon />
              </Button>
            )}
          </ServiceRenseignementModal>
        </Container>
      </ServiceSection>
      <NavSection>
        <nav>
          <Links>
            <Category>
              <StyledHeading>Code du travail numérique</StyledHeading>
              <StyledList>
                <StyledListItem>
                  <Link passHref href="/droit-du-travail">
                    <StyledLink>Le droit du travail</StyledLink>
                  </Link>
                </StyledListItem>
                <StyledListItem>
                  <Link passHref href="/glossaire">
                    <StyledLink>Glossaire</StyledLink>
                  </Link>
                </StyledListItem>
                <StyledListItem>
                  <Link passHref href="/a-propos">
                    <StyledLink>À propos</StyledLink>
                  </Link>
                </StyledListItem>
                <StyledListItem>
                  <Link passHref href="/mentions-legales">
                    <StyledLink>Mentions légales</StyledLink>
                  </Link>
                </StyledListItem>
                <StyledListItem>
                  <StyledLink href="mailto:codedutravailnumerique@travail.gouv.fr">
                    Contact
                  </StyledLink>
                </StyledListItem>
              </StyledList>
            </Category>
            <Category>
              <StyledHeading>Aidez-nous à améliorer cet outil</StyledHeading>
              <StyledList>
                <StyledListItem>
                  <StyledLink
                    href={`${GITHUB_REPO}/tree/${publicRuntimeConfig.PACKAGE_VERSION}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contribuer sur Github
                  </StyledLink>
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
                      <StyledLink
                        href={`${GITHUB_REPO}/${path}/${packageVersion}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Journal des modifications
                      </StyledLink>
                    );
                  })()}
                </StyledListItem>
              </StyledList>
            </Category>
            <Category>
              <StyledHeading>En collaboration avec</StyledHeading>
              <StyledList>
                <StyledListItem>
                  <StyledLink
                    href={
                      "https://travail-emploi.gouv.fr/ministere/organisation/article/dgt-direction-generale-du-travail"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    La Direction Générale du Travail
                  </StyledLink>
                </StyledListItem>
                <StyledListItem>
                  <StyledLink
                    href={"https://incubateur.social.gouv.fr/"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    L’incubateur des ministères sociaux
                  </StyledLink>
                </StyledListItem>
                <StyledListItem>
                  <StyledLink
                    href={"https://beta.gouv.fr/"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    beta.gouv.fr
                  </StyledLink>
                </StyledListItem>
              </StyledList>
            </Category>
          </Links>
        </nav>
      </NavSection>
    </StyledFooter>
  </OverflowWrapper>
);

export default Footer;

const { breakpoints, fonts, spacings } = theme;

const OverflowWrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

const StyledFooter = styled.footer`
  position: relative;
  z-index: 1;
  margin-top: ${spacings.larger};
  padding-top: ${spacings.base};
  background-color: ${({ theme }) => theme.bgSecondary};
  &:before {
    position: absolute;
    top: -27px;
    left: -50%;
    z-index: -1;
    width: 200%;
    height: 400px;
    background-color: ${({ theme }) => theme.bgSecondary};
    border-radius: 100%;
    content: "";
  }
  @media print {
    display: none;
  }
`;

const ServiceSection = styled(Section)`
  position: relative;
  padding-bottom: ${spacings.larger};
  text-align: center;
`;

const StyledContainer = styled(Container)`
  margin-bottom: ${spacings.medium};
`;

const StyledDirectionRightIcon = styled(DirectionRightIcon)`
  width: 1.5em;
  margin-left: ${spacings.base};
`;

const NavSection = styled(Section)`
  padding: ${spacings.larger} 0;
  background-color: ${({ theme }) => theme.bgTertiary};
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

const StyledList = styled(FlatList)`
  @media (max-width: ${breakpoints.mobile}) {
    text-align: center;
  }
`;

const StyledHeading = styled(Heading)`
  font-size: ${fonts.sizes.default};
  @media (max-width: ${breakpoints.mobile}) {
    margin-top: ${spacings.small};
    text-align: center;
  }
`;

const StyledListItem = styled.li`
  margin: ${spacings.tiny} 0;
`;
const StyledLink = styled.a`
  font-weight: normal;
  text-decoration: none;
`;
