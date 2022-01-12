import { SOURCES } from "@socialgouv/cdtn-sources";
import { Tag, Text, theme } from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import Html from "../../../common/Html";
import { Enterprise } from "../../../conventions/Search/api/enterprises.service";
import { ScreenType } from "../common/NavContext";
import { ResultItem } from "../common/ResultList";
import { useTrackingContext } from "../common/TrackingContext";

type CompagnyItemProps = {
  enterprise: Enterprise;
  isFirst: boolean;
  showAddress: boolean;
  onClick: (enterprise: Enterprise) => void;
};

export function EnterpriseButton({
  enterprise,
  isFirst,
  showAddress,
  onClick,
}: CompagnyItemProps): JSX.Element {
  const {
    label,
    matching,
    highlightLabel,
    simpleLabel,
    activitePrincipale,
    address,
    siren,
    firstMatchingEtablissement,
  } = enterprise;

  const { trackEvent, title, uuid } = useTrackingContext();

  const clickHandler = () => {
    trackEvent(
      "enterprise_select",
      title,
      JSON.stringify({ label, siren }),
      uuid
    );
    onClick(enterprise);
  };
  const showTitleWithHighlight = label === simpleLabel;
  return (
    <Link
      href={`/${SOURCES.TOOLS}/convention-collective#${ScreenType.agreementSelection}`}
      passHref
    >
      <ItemButton isFirst={isFirst} onClick={clickHandler}>
        {showTitleWithHighlight ? (
          <Title fontSize="hsmall" fontWeight="600">
            {highlightLabel}
          </Title>
        ) : (
          <>
            <Title fontWeight="600" fontSize="hsmall">
              {simpleLabel}
            </Title>
            <Subtitle fontSize="small">{highlightLabel}</Subtitle>
          </>
        )}
        {activitePrincipale && (
          <Activity as="div">Activité : {activitePrincipale}</Activity>
        )}
        {!showAddress || matching > 1 ? (
          <Tag> {matching} établissements </Tag>
        ) : (
          <Text>{address || firstMatchingEtablissement.address}</Text>
        )}
      </ItemButton>
    </Link>
  );
}

const { spacings } = theme;

const Activity = styled(Text)`
  color: ${({ theme }) => theme.altText};
  padding-bottom: ${spacings.xsmall};
`;

const ItemButton = styled(ResultItem)`
  &:hover ${Activity} {
    color: ${({ theme }) => theme.paragraph};
  }
`;

const Title = styled(Html)`
  padding-bottom: ${spacings.xsmall};
  & b {
    font-weight: 700;
  }
`;
const Subtitle = styled(Html)`
  padding-bottom: ${spacings.xsmall};
`;
