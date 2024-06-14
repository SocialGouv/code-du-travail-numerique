import { getLabelBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { Button, FlatList, Paragraph, theme, Tile } from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import { SectionTitle } from "../../common/stepStyles";
import { ScreenType, useNavContext } from "../common/NavContext";
import { TrackingProps } from "../types";
import { AgreementTile } from "../../common/Agreement/AgreementSearch/AgreementInput/AgreementTile";
import { useRouter } from "next/router";

type EnterpriseSearchStepProps = {
  onBackClick: () => void;
  isWidgetMode?: boolean;
  noRedirect?: boolean;
} & TrackingProps;

const AgreementSelectionStep = ({
  onBackClick,
  onUserAction,
  isWidgetMode,
  noRedirect,
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
        {enterprise.conventions.length === 0
          ? `Aucune convention collective n'a été déclarée pour l'entreprise `
          : enterprise.conventions.length === 1
          ? `1 convention collective trouvée pour `
          : `${enterprise.conventions.length} conventions collectives trouvées pour `}
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
              agreement.url || agreement.contributions ? (
                <AgreementTile
                  onUserAction={onUserAction}
                  agreement={agreement}
                  isWidgetMode={isWidgetMode}
                  noRedirect={noRedirect}
                />
              ) : (
                <Tile
                  wide
                  subtitle={getLabelBySource(SOURCES.CCN)}
                  title={`${agreement.shortTitle} IDCC${agreement.num}`}
                  disabled
                >
                  <p>
                    Nous n’avons pas d’informations concernant cette convention
                    collective
                  </p>
                </Tile>
              )
            ) : (
              <Tile
                wide
                subtitle={getLabelBySource(SOURCES.CCN)}
                title={`IDCC${agreement.num}`}
                disabled
              >
                <p>
                  Cette convention collective déclarée par l’entreprise n’est
                  pas reconnue par notre site
                </p>
              </Tile>
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
