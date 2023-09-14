import { getLabelBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { Button, FlatList, Paragraph, theme } from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import { SectionTitle } from "../../common/stepStyles";
import { ScreenType, useNavContext } from "../common/NavContext";
import { TrackingProps } from "../types";
import { AgreementTile } from "../../common/Agreement/AgreementSearch/AgreementInput/AgreementTile";
import { useRouter } from "next/router";
import { Tile } from "@socialgouv/cdtn-ui/lib";

type EnterpriseSearchStepProps = {
  onBackClick: () => void;
  isWidgetMode?: boolean;
} & TrackingProps;

const AgreementSelectionStep = ({
  onBackClick,
  onUserAction,
  isWidgetMode,
}: EnterpriseSearchStepProps): JSX.Element => {
  const { enterprise } = useNavContext();
  const router = useRouter();

  if (!enterprise) {
    router.push(
      `/${SOURCES.TOOLS}/convention-collective/${ScreenType.enterprise}`
    );
    return <></>;
  }
  return (
    <>
      <SectionTitle>Convention collective</SectionTitle>
      <Paragraph variant="primary">
        {(enterprise.conventions.length ?? 0) > 1
          ? `${enterprise.conventions.length} conventions collectives trouvées pour `
          : `${
              enterprise.conventions.length ?? 0
            } convention collective trouvée pour `}
        <strong>
          « {enterprise.simpleLabel}
          {enterprise.address &&
            ` , ${enterprise.firstMatchingEtablissement?.address}`}{" "}
          »
        </strong>
      </Paragraph>
      <FlatList>
        {enterprise.conventions.map((agreement) => (
          <Li key={agreement.id}>
            {agreement.slug ? (
              agreement.url ? (
                <AgreementTile
                  onUserAction={onUserAction}
                  agreement={agreement}
                  isWidgetMode={isWidgetMode}
                />
              ) : (
                <DisabledTile
                  wide
                  subtitle={getLabelBySource(SOURCES.CCN)}
                  title={`${agreement.shortTitle} IDCC${agreement.num}`}
                >
                  <p>
                    Nous n’avons pas d’informations concernant cette convention
                    collective
                  </p>
                </DisabledTile>
              )
            ) : (
              <DisabledTile
                wide
                subtitle={getLabelBySource(SOURCES.CCN)}
                title={`IDCC${agreement.num}`}
              >
                <p>
                  Cette convention collective déclarée par l’entreprise n’est
                  pas reconnue par notre site
                </p>
              </DisabledTile>
            )}
          </Li>
        ))}
      </FlatList>

      {isWidgetMode ? (
        <Button small type="button" onClick={onBackClick} variant="flat">
          Précédent
        </Button>
      ) : (
        <Link
          href={`/${SOURCES.TOOLS}/convention-collective/entreprise`}
          passHref
          legacyBehavior
        >
          <Button
            as="a"
            small
            type="button"
            onClick={onBackClick}
            variant="flat"
          >
            Précédent
          </Button>
        </Link>
      )}
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

const DisabledTile = styled(Tile)`
  cursor: auto;
  color: ${theme.colors.placeholder};

  :hover {
    transform: none;
    color: ${theme.colors.placeholder};
  }
`;
