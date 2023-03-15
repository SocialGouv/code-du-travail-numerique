import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { theme, Container } from "@socialgouv/cdtn-ui";
import { GITHUB_REPO, PACKAGE_VERSION } from "../../config";
import { ContactModal } from "../../common/ContactModal";
import { useRouter } from "next/router";
import { push as matopush } from "@socialgouv/matomo-next";

export const GouvernementSection = () => {
  const router = useRouter();
  const path = router.asPath;
  return (
    <StyledContainer>
      <StyledTopSection>
        <Image
          alt="le site du ministere du travail, de l'emploi et de l'insertion"
          src="/static/assets/img/ministere_logo.svg"
          width="170"
          height="141"
        />
        <StyledTopUl>
          <li>
            <Link href={"https://travail-emploi.gouv.fr"}>
              travail-emploi.gouv.fr
            </Link>
          </li>
          <li>
            <Link href={"https://www.service-public.fr"}>
              service-public.fr
            </Link>
          </li>
          <li>
            <Link href={"https://www.legifrance.gouv.fr"}>
              legifrance.gouv.fr
            </Link>
          </li>
          <li>
            <Link href={"https://www.data.gouv.fr"}>data.gouv.fr</Link>
          </li>
          <li>
            <Link href={"https://www.gouvernement.fr"}>gouvernement.fr</Link>
          </li>
        </StyledTopUl>
      </StyledTopSection>
      <SectionSeparator />
      <StyledBottomSection>
        <StyledBottomUl>
          <li>
            <Link href="/mentions-legales">Mentions légales</Link>
          </li>
          <li>
            <Link href="/accessibilite">Accessibilité&nbsp;: partiellement conforme</Link>
          </li>
          <li>
            <Link href="/politique-confidentialite">Politique de confidentialité</Link>
          </li>
          <li>
            <Link rel="noopener noreferrer" href={`${GITHUB_REPO}/tree/v${PACKAGE_VERSION}`}>Contribuer sur Github</Link>
          </li>
          <li>
            <ContactModal>
              {(openModal) => (
                <StyledContactLink
                  aria-label="Nous contacter"
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
                  Nous contacter
                </StyledContactLink>
              )}
            </ContactModal>
          </li>
        </StyledBottomUl>
      </StyledBottomSection>
    </StyledContainer>
  );
};

const { spacings, breakpoints } = theme;

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
`;

const StyledTopSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${spacings.medium};
  padding-top: ${spacings.medium};
  @media (max-width: ${breakpoints.tablet}) {
    padding-bottom: ${spacings.small};
    padding-top: ${spacings.small};
  }
`;

const StyledTopUl = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    margin: 0 ${spacings.small};
    @media (max-width: ${breakpoints.tablet}) {
      margin: 0 ${spacings.xsmall};
    }
  }
  a {
    text-decoration: none;
    &:after {
      content: "" !important;
    }
  }
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
  }
  flex-wrap: wrap;
`;

const StyledBottomSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: ${spacings.medium} 0;
  @media (max-width: ${breakpoints.tablet}) {
    padding: ${spacings.small};
    margin-left: 0;
    justify-content: center;
  }
`;

const StyledBottomUl = styled(StyledTopUl)`
  a {
    color: #666;
    font-weight: 400;
    margin-right: ${spacings.small};
  }
`;

const SectionSeparator = styled.div`
  width: 100%;
  align-self: center;
  height: 1px;
  background-color: #666;
  margin: ${spacings.base} 0;
  @media (max-width: ${breakpoints.tablet}) {
    margin: ${spacings.small} 0;
  }
`;

const StyledContactLink = styled.a.attrs({
  role: "link",
  tabindex: "0"
})`
  cursor: pointer;
`;

