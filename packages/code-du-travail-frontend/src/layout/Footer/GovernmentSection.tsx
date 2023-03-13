import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { theme } from "@socialgouv/cdtn-ui";
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
            <Separator>|</Separator>
          </li>
          <li>
            <Link href="/accessibilite">Accessibilité&nbsp;: partiellement conforme</Link>
            <Separator>|</Separator>
          </li>
          <li>
            <Link href="/politique-confidentialite">Politique de confidentialité</Link>
            <Separator>|</Separator>
          </li>
          <li>
            <Link href={`${GITHUB_REPO}/tree/${PACKAGE_VERSION}`}>Contribuer sur Github</Link>
            <Separator>|</Separator>
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

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTopSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: ${spacings.medium};
  @media (max-width: ${breakpoints.tablet}) {
    padding: ${spacings.small};
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
`;

const StyledBottomSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-left: 10%;
  align-items: center;
  padding: ${spacings.medium};
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
  }
`;

const SectionSeparator = styled.div`
  width: 90%;
  align-self: center;
  height: 1px;
  background-color: #666;
  margin: ${spacings.base} 0;
  @media (max-width: ${breakpoints.tablet}) {
    margin: ${spacings.small} 0;
  }
`;

const Separator = styled.span`
  margin-left: ${spacings.small};
  color: #666;
  user-select: none;
  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

const StyledContactLink = styled.a.attrs({
  role: "link",
  tabindex: "0"
})`
  cursor: pointer;
`;

