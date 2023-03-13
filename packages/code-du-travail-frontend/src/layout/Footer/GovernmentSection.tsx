import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { theme } from "@socialgouv/cdtn-ui";

export const GouvernementSection = () => {
  return (
    <StyledContainer>
      <StyledTopSection>
        <Image
          alt="le site du ministere du travail, de l'emploi et de l'insertion"
          src="/static/assets/img/ministere_logo.svg"
          width="170"
          height="141"
        />
        <StyledUl>
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
        </StyledUl>
      </StyledTopSection>
      <SectionSeparator />
      <StyledBottomSection>
        <StyledUl>
          <li>
            <Link href={"https://www.legifrance.gouv.fr"}>Legifrance</Link>
            <Separator>|</Separator>
          </li>
        </StyledUl>
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

const StyledBottomSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: ${spacings.medium};
  @media (max-width: ${breakpoints.tablet}) {
    padding: ${spacings.small};
  }
`;

const StyledUl = styled.ul`
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
    @media (max-width: ${breakpoints.tablet}) {
      font-size: 1rem;
    }
    &:after {
      content: "" !important;
    }
  }
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const SectionSeparator = styled.div`
  width: 90%;
  align-self: center;
  height: 1px;
  background-color: gray;
  margin: ${spacings.base} 0;
  @media (max-width: ${breakpoints.tablet}) {
    margin: ${spacings.small} 0;
  }
`;

const Separator = styled.span`
  margin-bottom: ${spacings.small};
  user-select: none;
  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;
