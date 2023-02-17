import { Container, Section, theme, Title } from "@socialgouv/cdtn-ui";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

export function Partners() {
  return (
    <Section variant="white">
      <Container>
        <Title as="p" isFirst stripe="left">
          Sites associés
        </Title>
        <Flex>
          <Link
            href="https://service-public.fr"
            title="aller sur le site service-public.fr"
            className="no-after"
          >
            <Image
              src="/static/assets/img/logo_sp_hd_rvb@2x.png"
              alt="service-public.fr, le site officiel de l'administration française"
              width="297"
              height="63"
            />
          </Link>
          <Link
            href="https://travail-emploi.gouv.fr"
            title="aller sur le site travail-emploi.gouv.fr"
            className="no-after"
          >
            <Image
              alt="le site du ministere du travail, de l'emploi et de l'insertion"
              src="/static/assets/img/ministere-travail.png"
              width="170"
              height="141"
            />
          </Link>
          <Link
            href="https://legifrance.gouv.fr"
            title="aller sur le site legifrance"
            className="no-after"
          >
            <Image
              src="/static/assets/img/legifrance.svg"
              alt="legifrance.gouv.fr - le service public de la diffusion du droit"
              width="236"
              height="62"
            />
          </Link>
        </Flex>
      </Container>
    </Section>
  );
}

const { breakpoints, spacings } = theme;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & :first-child {
    margin-left: 0;
  }

  & :last-child {
    margin-right: 0;
  }
`;

const Link = styled.a`
  display: block;
  justify-content: space-between;
  margin: 0 ${spacings.large};
  @media (max-width: ${breakpoints.mobile}) {
    margin: 0 ${spacings.xsmall};
  }
`;
