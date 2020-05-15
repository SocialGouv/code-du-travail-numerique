// https://nextjs.org/docs/advanced-features/custom-error-page
import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Button, Container, icons, theme } from "@socialgouv/react-ui";

import { Layout } from "../../src/layout/Layout";

export default function SuppressionAttestation() {
  return (
    <Layout>
      <Container>
        <Header>
          <Warning />
          <H1>Suppression de l’attestation garde d’enfant</H1>
        </Header>
        <p>
          L’attestation garde d’enfant n’existe plus depuis le 1er mai 2020. En
          effet, depuis cette date, le salarié qui ne dispose pas de solution de
          garde pour un enfant de moins de 16 ans ou de solution de prise en
          charge pour un enfant en situation de handicap en informe son
          employeur. Ce dernier le placera alors en activité partielle.
        </p>
        <Redirect>
          <p>
            Pour une information complète, reportez-vous au contenu suivant :
          </p>
          <Link
            href="/fiche-ministere-travail/garde-denfants-et-personnes-vulnerables"
            passHref
          >
            <Button variant="primary" as="a">
              Garde d’enfants et personnes vulnérables
            </Button>
          </Link>
        </Redirect>
      </Container>
    </Layout>
  );
}

const { spacings } = theme;

const Header = styled.header`
  display: flex;
  flex-wrap: wrap;
`;

const Warning = styled(icons.Warning)`
  width: 5.2rem;
  height: 5.2rem;
  margin-right: ${spacings.xmedium};
`;

const H1 = styled.h1`
  margin-bottom: 0;
`;

const Redirect = styled.div`
  margin-top: ${spacings.larger};
  margin-bottom: ${spacings.large};
`;
