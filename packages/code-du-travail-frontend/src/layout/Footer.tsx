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
import { push as matopush } from "@socialgouv/matomo-next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

import { ContactModal } from "../common/ContactModal";
import { ServiceRenseignementModal } from "../common/ServiceRenseignementModal";
import { PACKAGE_VERSION } from "../config";
import { Partners } from "../home";
import { GouvernementSection } from "./Footer/GovernmentSection";

const { DirectionRight: DirectionRightIcon } = icons;

const GITHUB_REPO = "https://github.com/SocialGouv/code-du-travail-numerique";

const Footer = (): JSX.Element => {
  const router = useRouter();
  const path = router.asPath;

  return (
    <OverflowWrapper>
      <StyledFooter>
        <ServiceSection>
          <Container>
            <Title as="p" role="heading" aria-level="2" isFirst stripe="top">
              Besoin de plus d’informations&nbsp;?
            </Title>
            <StyledContainer narrow noPadding>
              <p>
                Les services du ministère du Travail en région informent,
                conseillent et orientent les salariés et les employeurs du
                secteur privé sur leurs questions en droit du travail.
              </p>
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
            <div>
              <Category>
                <Heading as={StyledHeading} isFirst>
                  Code du travail numérique
                </Heading>
                <StyledList>
                  <li>
                    <Link passHref href="/droit-du-travail" legacyBehavior>
                      <StyledLink>Le droit du travail</StyledLink>
                    </Link>
                  </li>
                  <li>
                    <Link passHref href="/glossaire" legacyBehavior>
                      <StyledLink>Glossaire</StyledLink>
                    </Link>
                  </li>
                  <li>
                    <Link passHref href="/a-propos" legacyBehavior>
                      <StyledLink>À propos</StyledLink>
                    </Link>
                  </li>
                  <li>
                    <Link passHref href="/stats" legacyBehavior>
                      <StyledLink>Statistiques d’utilisation</StyledLink>
                    </Link>
                  </li>
                  <li>
                    <Link passHref href="/integration" legacyBehavior>
                      <StyledLink>
                        Intégrer les outils du Code du travail numérique
                      </StyledLink>
                    </Link>
                  </li>
                </StyledList>
              </Category>
            </div>
            <div>
              <Category>
                <Heading as={StyledHeading} isFirst>
                  Outils populaires
                </Heading>
                <StyledList>
                  <li>
                    <Link
                      passHref
                      href="/outils/simulateur-embauche"
                      legacyBehavior
                    >
                      <StyledLink>Calcul du salaire brut/net</StyledLink>
                    </Link>
                  </li>
                  <li>
                    <Link
                      passHref
                      href="/outils/indemnite-licenciement"
                      legacyBehavior
                    >
                      <StyledLink>
                        Calcul de l&apos;indemnité de licenciement de
                        licenciement
                      </StyledLink>
                    </Link>
                  </li>
                  <li>
                    <Link
                      passHref
                      href="/outils/convention-collective"
                      legacyBehavior
                    >
                      <StyledLink>Trouver sa convention collective</StyledLink>
                    </Link>
                  </li>
                </StyledList>
              </Category>
              <Category>
                <Heading as={StyledHeading} isFirst>
                  Modèles populaires
                </Heading>
                <StyledList>
                  <li>
                    <Link
                      passHref
                      href="/modeles-de-courriers/lettre-de-demission"
                      legacyBehavior
                    >
                      <StyledLink>Lettre de démission</StyledLink>
                    </Link>
                  </li>
                  <li>
                    <Link
                      passHref
                      href="/modeles-de-courriers/rupture-du-contrat-en-periode-dessai-par-le-salarie"
                      legacyBehavior
                    >
                      <StyledLink>
                        Rupture du contrat en période d&apos;essai pour le
                        salarié
                      </StyledLink>
                    </Link>
                  </li>
                  <li>
                    <Link
                      passHref
                      href="/modeles-de-courriers/convocation-a-un-entretien-prealable-au-licenciement-pour-motif-personnel"
                      legacyBehavior
                    >
                      <StyledLink>
                        Convocation à un entretien préalable au licenciement
                        pour motif personnel
                      </StyledLink>
                    </Link>
                  </li>
                </StyledList>
              </Category>
            </div>
            <div>
              <Category>
                <Heading as={StyledHeading} isFirst>
                  Fiches pratiques populaires
                </Heading>
                <StyledList>
                  <li>
                    <Link
                      passHref
                      href="/contribution/quelle-est-la-duree-du-preavis-en-cas-de-demission"
                      legacyBehavior
                    >
                      <StyledLink>Durée du préavis de démission</StyledLink>
                    </Link>
                  </li>
                  <li>
                    <Link
                      passHref
                      href="/contribution/les-conges-pour-evenements-familiaux"
                      legacyBehavior
                    >
                      <StyledLink>Congé pour évènements familiaux</StyledLink>
                    </Link>
                  </li>
                  <li>
                    <Link
                      passHref
                      href="/contribution/en-cas-darret-maladie-du-salarie-lemployeur-doit-il-assurer-le-maintien-de-salaire"
                      legacyBehavior
                    >
                      <StyledLink>
                        Maintien du salaire en cas d&apos;arrêt maladie
                      </StyledLink>
                    </Link>
                  </li>
                </StyledList>
              </Category>
              <Category>
                <Heading as={StyledHeading} isFirst>
                  Conventions collectives populaires
                </Heading>
                <StyledList>
                  <li>
                    <Link
                      passHref
                      href="/convention-collective/1090-services-de-lautomobile-commerce-et-reparation-de-lautomobile-du-cycle"
                      legacyBehavior
                    >
                      <StyledLink>Services de l&apos;automobile</StyledLink>
                    </Link>
                  </li>
                  <li>
                    <Link
                      passHref
                      href="/convention-collective/650-metallurgie-ingenieurs-et-cadres"
                      legacyBehavior
                    >
                      <StyledLink>Métallurgie ingénieurs et cadres</StyledLink>
                    </Link>
                  </li>
                  <li>
                    <Link
                      passHref
                      href="/convention-collective/573-commerces-de-gros"
                      legacyBehavior
                    >
                      <StyledLink>Commerce de gros</StyledLink>
                    </Link>
                  </li>
                </StyledList>
              </Category>
            </div>
          </Links>
        </NavSection>
      </StyledFooter>
      <GouvernementSection />
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

const Category = styled.div``;

const StyledList = styled(FlatList)`
  @media (max-width: ${breakpoints.mobile}) {
    text-align: center;
  }
`;

const StyledHeading = styled.strong.attrs({
  "aria-level": "2",
  role: "heading",
})`
  margin-top: ${spacings.base};
  margin-bottom: ${spacings.xsmall};
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
  padding: ${spacings.xsmall} 0;
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
