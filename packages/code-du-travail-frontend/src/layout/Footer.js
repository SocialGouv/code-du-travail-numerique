import React, { useState, useEffect } from "react";
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
import { ContactModal } from "../common/ContactModal";
import { useRouter } from "next/router";

const { DirectionRight: DirectionRightIcon } = icons;
const { publicRuntimeConfig } = getConfig();

const GITHUB_REPO = "https://github.com/SocialGouv/code-du-travail-numerique";

const Footer = () => {
  const router = useRouter();
  const path = router.asPath;

  const [cookieConsent, setCookieConsent] = useState(false);
  useEffect(() => {
    const consent = /tarteaucitron=!gtag=true/.test(document.cookie);
    setCookieConsent(consent);
  }, [path]);

  return (
    <OverflowWrapper>
      <StyledFooter>
        <ServiceSection>
          <Container>
            <Title as="h3" isFirst topStripped>
              Besoin de plus d’informations&nbsp;?
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
                <StyledHeading isFirst>Code du travail numérique</StyledHeading>
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
                    <Link passHref href="/politique-confidentialite">
                      <StyledLink>Politique de confidentialité</StyledLink>
                    </Link>
                  </StyledListItem>
                  <StyledListItem>
                    <Link passHref href="/stats">
                      <StyledLink>Statistiques d’utilisation</StyledLink>
                    </Link>
                  </StyledListItem>
                  <StyledListItem>
                    <ContactModal>
                      {openModal => (
                        <StyledLink onClick={openModal}>Contact</StyledLink>
                      )}
                    </ContactModal>
                  </StyledListItem>
                </StyledList>
              </Category>
              <Category>
                <StyledHeading isFirst>
                  Aidez-nous à améliorer cet outil
                </StyledHeading>
                <StyledList>
                  <StyledListItem>
                    <StyledLink
                      href="https://calendly.com/code-du-travail-numerique/ambassadeur-du-code-du-travail-numerique"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Devenir ambassadeur
                    </StyledLink>
                  </StyledListItem>
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
                <StyledHeading isFirst>En collaboration avec</StyledHeading>
                <StyledList>
                  <StyledListItem>
                    <StyledLink
                      href={
                        "https://travail-emploi.gouv.fr/ministere/organisation/organisation-des-directions-et-services/article/organisation-de-la-direction-generale-du-travail-dgt"
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
        <GovernmentSection>
          <StyledGovLink
            href={"https://travail-emploi.gouv.fr"}
            target="_blank"
            rel="noopener noreferrer"
          >
            travail-emploi.gouv.fr
          </StyledGovLink>
          <Separator aria-hidden>|</Separator>
          <StyledGovLink
            href={"https://www.service-public.fr"}
            target="_blank"
            rel="noopener noreferrer"
          >
            service-public.fr
          </StyledGovLink>
          <Separator aria-hidden>|</Separator>
          <StyledGovLink
            href={"https://www.legifrance.gouv.fr"}
            target="_blank"
            rel="noopener noreferrer"
          >
            legifrance.gouv.fr
          </StyledGovLink>
          <Separator aria-hidden>|</Separator>
          <StyledGovLink
            href={"https://www.data.gouv.fr"}
            target="_blank"
            rel="noopener noreferrer"
          >
            data.gouv.fr
          </StyledGovLink>
          <Separator aria-hidden>|</Separator>
          <StyledGovLink
            href={"https://www.gouvernement.fr"}
            target="_blank"
            rel="noopener noreferrer"
          >
            gouvernement.fr
          </StyledGovLink>
          <Separator aria-hidden>|</Separator>
          <StyledGovLink
            href={"https://www.cnil.fr/"}
            target="_blank"
            rel="noopener noreferrer"
          >
            cnil.fr
          </StyledGovLink>
        </GovernmentSection>
        {cookieConsent && (
          <img
            style={{ position: "absolute" }}
            src={`https://ad.doubleclick.net/ddm/activity/src=3048978;type=emplo253;cat=lpcodet;u1=${path};dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord=1;num=1?`}
            width="1"
            height="1"
            alt=""
          />
        )}
      </StyledFooter>
    </OverflowWrapper>
  );
};

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
  cursor: pointer;
`;

const GovernmentSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.bgTertiary};
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
