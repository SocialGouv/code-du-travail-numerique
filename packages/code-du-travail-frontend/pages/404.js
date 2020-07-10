// https://nextjs.org/docs/advanced-features/custom-error-page
import { Button, Container, icons as Icons, theme } from "@soocialgouv/cdtn-ui";
import Link from "next/link";
import React, { useEffect } from "react";
import styled from "styled-components";

import { Layout } from "../src/layout/Layout";
import { initializeSentry, notifySentry } from "../src/sentry";

initializeSentry();

export default function Custom404() {
  useEffect(() => {
    notifySentry(404);
  }, []);
  return (
    <Layout>
      <CenteredContainer>
        <Suptitle>ERREUR 404</Suptitle>
        <StyledOups />
        <H1>Oups, nous ne trouvons pas cette page…</H1>
        <div>
          Vérifiez le lien de la page, il est peut être incorrect. Dans le cas
          contraire, la page a été supprimée ou déplacée.
        </div>
        <Redirect>
          <p>
            Nous vous invitons à revenir sur notre page d’accueil et à effectuer
            une recherche.
          </p>
          <Link href="/" passHref>
            <Button variant="primary" as="a">
              Revenir à la page d’accueil
            </Button>
          </Link>
        </Redirect>
      </CenteredContainer>
    </Layout>
  );
}

const { breakpoints, fonts, spacings } = theme;

const Suptitle = styled.div`
  margin-bottom: ${spacings.base};
  color: ${({ theme }) => theme.altText};
  font-weight: bold;
  font-size: ${fonts.sizes.headings.small};
`;

const StyledOups = styled(Icons.Oups)`
  width: 5.2rem;
  height: 5.2rem;
  ${({ theme }) => theme.noColors && "display: none;"}
`;

const H1 = styled.h1`
  margin-top: ${spacings.base};
  margin-bottom: ${spacings.base};
`;

const CenteredContainer = styled(Container)`
  text-align: center;
  @media (min-width: ${breakpoints.desktop}) {
    text-align: left;
  }
`;

const Redirect = styled.div`
  margin-top: ${spacings.larger};
  margin-bottom: ${spacings.large};
`;
