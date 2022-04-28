import { Tag, Text, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import { Enterprise } from "../../../../../conventions/Search/api/enterprises.service";
import { ResultItem } from "../../components/ResultList";
import Html from "../../../../../common/Html";
import {
  TrackingProps,
  UserAction,
} from "../../../../ConventionCollective/types";

type CompagnyItemProps = {
  enterprise: Enterprise;
  isFirst: boolean;
  showAddress: boolean;
  onClick: (enterprise: Enterprise) => void;
} & TrackingProps;

export function EnterpriseButton({
  enterprise,
  isFirst,
  showAddress,
  onClick,
  onUserAction,
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

  const clickHandler = () => {
    onUserAction(UserAction.SelectEnterprise, { label, siren });
    onClick(enterprise);
  };
  const showTitleWithHighlight = label === simpleLabel;
  return (
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
      {!showAddress && matching > 1 ? (
        <Tag> {matching} établissements </Tag>
      ) : (
        <Text>{address || firstMatchingEtablissement?.address}</Text>
      )}
    </ItemButton>
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
