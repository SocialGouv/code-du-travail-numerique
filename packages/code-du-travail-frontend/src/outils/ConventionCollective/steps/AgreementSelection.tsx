import { SOURCES } from "@socialgouv/cdtn-sources";
import { Button, FlatList, Paragraph, theme } from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import { SectionTitle } from "../../common/stepStyles";
import { AgreementTile } from "../agreement/AgreementTile";
import { useNavContext } from "../common/NavContext";

type EnterpriseSearchStepProps = {
  onBackClick: () => void;
};

const AgreementSelectionStep = ({
  onBackClick,
}: EnterpriseSearchStepProps): JSX.Element => {
  const { enterprise } = useNavContext();

  return (
    <>
      <SectionTitle>Convention collective</SectionTitle>
      <Paragraph noMargin variant="primary">
        {(enterprise?.conventions?.length ?? 0) > 1
          ? `${enterprise?.conventions.length} conventions collectives trouvées pour `
          : `${
              enterprise?.conventions.length ?? 0
            } convention collective trouvée pour `}
        <strong>
          « {enterprise?.simpleLabel}
          {enterprise?.address &&
            ` , ${enterprise?.matchingEtablissement?.address}`}{" "}
          »
        </strong>
      </Paragraph>
      <FlatList>
        {enterprise?.conventions.map((agreement) => (
          <Li key={agreement.id}>
            <AgreementTile agreement={agreement} />
          </Li>
        ))}
      </FlatList>

      <Link
        href={`/${SOURCES.TOOLS}/convention-collective#entreprise`}
        passHref
      >
        <Button as="a" small type="button" onClick={onBackClick} variant="flat">
          Précédent
        </Button>
      </Link>
    </>
  );
};

export { AgreementSelectionStep };

const Li = styled.li`
  & + & {
    margin-top: ${theme.spacings.base};
  }

  &:last-child {
    margin-bottom: ${theme.spacings.large};
  }
`;
