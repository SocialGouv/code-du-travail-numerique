import {
  Button,
  Container,
  FlatList,
  Heading,
  icons,
  Section,
  theme,
  Title,
} from "@socialgouv/cdtn-ui";
import getConfig from "next/config";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

import { ContactModal } from "../common/ContactModal";
import { ServiceRenseignementModal } from "../common/ServiceRenseignementModal";
import { Partners } from "../home/Partners";
import { matopush } from "../piwik";

const { DirectionRight: DirectionRightIcon } = icons;
const { publicRuntimeConfig } = getConfig();

const GITHUB_REPO = "https://github.com/SocialGouv/code-du-travail-numerique";

const Footer = (): JSX.Element => {
  const router = useRouter();
  const path = router.asPath;

  return (
    <OverflowWrapper>
      <StyledFooter>
        <ServiceSection>
          <Container>
            <Title as="strong" isFirst stripe="top">
              Besoin de plus d’informations&nbsp;?
            </Title>
            <StyledContainer narrow noPadding>
              Les services du ministère du Travail en région informent,
              conseillent et orientent les salariés et les employeurs du secteur
              privé sur leurs questions en droit du travail.
            </StyledContainer>
            <ServiceRenseignementModal>
              {(openModal) => (
                <Button onClick={openModal}>
                  Contacter nos services en région
                  <StyledDirectionRightIcon />
                </Button>
              )}
            </ServiceRenseignementModal>
          </Container>
        </ServiceSection>

        {router.pathname === "/" && <Partners />}

        <NavSection>
          <Links>
            <Category>
              <Heading as={StyledStrong} isFirst>
                Code du travail numérique
              </Heading>
              <StyledList>
                <li>
                  <Link passHref href="/droit-du-travail">
                    <StyledLink>Le droit du travail</StyledLink>
                  </Link>
                </li>
                <li>
                  <Link passHref href="/glossaire">
                    <StyledLink>Glossaire</StyledLink>
                  </Link>
                </li>
                <li>
                  <Link passHref href="/a-propos">
                    <StyledLink>À propos</StyledLink>
                  </Link>
                </li>
                <li>
                  <Link passHref href="/mentions-legales">
                    <StyledLink>Mentions légales</StyledLink>
                  </Link>
                </li>
                <li>
                  <Link passHref href="/accessibilite">
                    <StyledLink>
                      Accessibilité&nbsp;: partiellement conforme
                    </StyledLink>
                  </Link>
                </li>
                <li>
                  <Link passHref href="/politique-confidentialite">
                    <StyledLink>Politique de confidentialité</StyledLink>
                  </Link>
                </li>
                <li>
                  <Link passHref href="/stats">
                    <StyledLink>Statistiques d’utilisation</StyledLink>
                  </Link>
                </li>
                <li>
                  <Link passHref href="/integration">
                    <StyledLink>
                      Intégrer le Code du travail numérique
                    </StyledLink>
                  </Link>
                </li>
              </StyledList>
            </Category>
            <Category>
              <Heading as={StyledStrong} isFirst>
                Aidez-nous à améliorer cet outil
              </Heading>
              <StyledList>
                <li>
                  <ContactModal>
                    {(openModal) => (
                      <StyledButton
                        variant="navLink"
                        onClick={() => {
                          matopush([
                            "trackEvent",
                            "contact",
                            "click_contact_cdtn_team",
                            path,
                          ]);
                          openModal();
                        }}
                      >
                        Contact
                      </StyledButton>
                    )}
                  </ContactModal>
                </li>
                <li>
                  <StyledLink
                    href={`${GITHUB_REPO}/tree/${publicRuntimeConfig.PACKAGE_VERSION}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contribuer sur Github
                  </StyledLink>
                </li>
                <li>
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
                </li>
              </StyledList>
            </Category>
            <Category>
              <Heading as={StyledStrong} isFirst>
                En collaboration avec
              </Heading>
              <StyledList>
                <li>
                  <StyledLink
                    href={
                      "https://travail-emploi.gouv.fr/ministere/organisation/organisation-des-directions-et-services/article/organisation-de-la-direction-generale-du-travail-dgt"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    La Direction Générale du Travail
                  </StyledLink>
                </li>
                <li>
                  <StyledLink
                    href={"https://fabrique.social.gouv.fr/"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    La fabrique des Ministères sociaux
                  </StyledLink>
                </li>
                <li>
                  <StyledLink
                    href={"https://beta.gouv.fr/"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    beta.gouv.fr
                  </StyledLink>
                </li>
              </StyledList>
            </Category>
          </Links>
        </NavSection>
        <GovernmentSection>
          <li>
            <StyledGovLink
              href={"https://travail-emploi.gouv.fr"}
              target="_blank"
              rel="noopener noreferrer"
            >
              travail-emploi.gouv.fr
            </StyledGovLink>
            <Separator aria-hidden>|</Separator>
          </li>
          <li>
            <StyledGovLink
              href={"https://www.service-public.fr"}
              target="_blank"
              rel="noopener noreferrer"
            >
              service-public.fr
            </StyledGovLink>
            <Separator aria-hidden>|</Separator>
          </li>

          <li>
            <StyledGovLink
              href={"https://www.legifrance.gouv.fr"}
              target="_blank"
              rel="noopener noreferrer"
            >
              legifrance.gouv.fr
            </StyledGovLink>
            <Separator aria-hidden>|</Separator>
          </li>

          <li>
            <StyledGovLink
              href={"https://www.data.gouv.fr"}
              target="_blank"
              rel="noopener noreferrer"
            >
              data.gouv.fr
            </StyledGovLink>
            <Separator aria-hidden>|</Separator>
          </li>
          <li>
            <StyledGovLink
              href={"https://www.gouvernement.fr"}
              target="_blank"
              rel="noopener noreferrer"
            >
              gouvernement.fr
            </StyledGovLink>
            <Separator aria-hidden>|</Separator>
          </li>
          <li>
            <StyledGovLink
              href={"https://www.cnil.fr/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              cnil.fr
            </StyledGovLink>
          </li>
        </GovernmentSection>
      </StyledFooter>
    </OverflowWrapper>
  );
};

export default Footer;

const { breakpoints, fonts, spacings } = theme;

const OverflowWrapper = styled.div`
  width: 100%;
  padding-top: ${spacings.larger};
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
  padding-bottom: 7rem;
  text-align: center;
  @media (max-width: ${breakpoints.mobile}) {
    padding-top: 0;
    padding-bottom: ${spacings.larger};
  }
`;

const StyledContainer = styled(Container)`
  margin-bottom: ${spacings.medium};
`;

const StyledDirectionRightIcon = styled(DirectionRightIcon)`
  width: 1.5em;
  margin-left: ${spacings.base};
`;

const NavSection = styled(Section)`
  padding: 5rem 0;
  background-color: ${({ theme }) => theme.bgTertiary};
  @media (max-width: ${breakpoints.mobile}) {
    padding-bottom: ${spacings.larger};
  }
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

const StyledStrong = styled.strong`
  font-size: ${fonts.sizes.default};
  @media (max-width: ${breakpoints.mobile}) {
    margin-top: ${spacings.small};
    text-align: center;
  }
`;

const StyledLink = styled.a.attrs((props) => ({
  ...(props.target === "_blank" && {
    "aria-label": `${props.children} (Nouvelle fenêtre)`,
  }),
}))`
  font-weight: normal;
  text-decoration: none;
  cursor: pointer;
  padding: ${spacings.tiny} 0;
  display: inline-block;
`;
const StyledButton = styled(Button)`
  padding: ${spacings.tiny} 0;
`;

const GovernmentSection = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.bgSecondary};
  list-style-type: none;
  margin: 0;
  padding-bottom: ${spacings.base};
`;

const StyledGovLink = styled(StyledLink)`
  margin: 0 ${spacings.small} ${spacings.small} ${spacings.small};
`;

const Separator = styled.span`
  margin-bottom: ${spacings.small};
  user-select: none;
  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;
