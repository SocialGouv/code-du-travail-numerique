import { theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import Metas from "../common/Metas";
import { Layout } from "../layout/Layout";
import Answer from "../common/Answer";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";

type Props = {
  idcc: string;
};

export const ConventionNotFound = ({ idcc }: Props): JSX.Element => {
  return (
    <>
      <Metas
        title={`Convention collective IDCC ${idcc}`}
        description="Cette convetion collective n'est pas référencée sur notre site."
      />
      <Layout>
        <Answer
          breadcrumbs={[
            {
              label: "Conventions collectives",
              slug: `/outils/${getRouteBySource(SOURCES.CCN)}`,
              position: 0,
            },
          ]}
          title={`Convention collective IDCC ${idcc}`}
        >
          <Suptitle>
            Cette convention collective n&apos;est pas référencée sur notre
            site.
          </Suptitle>
        </Answer>
      </Layout>
    </>
  );
};
const { fonts, spacings } = theme;

const Suptitle = styled.div`
  margin-bottom: ${spacings.base};
  color: ${({ theme }) => theme.altText};
  font-size: ${fonts.sizes.headings.small};
`;
