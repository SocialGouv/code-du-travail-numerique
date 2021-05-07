import { Tag, Text, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import { Entreprise } from "../../../conventions/Search/api/entreprises.service";
import { ResultItem } from "../common/ResultList";
import { useTrackingContext } from "../common/TrackingContext";

type CompagnyItemProps = {
  entreprise: Entreprise;
  isFirst: boolean;
  showAddress: boolean;
  onClick: (entreprise: Entreprise) => void;
};

export function EnterpriseButton({
  entreprise,
  isFirst,
  showAddress,
  onClick,
}: CompagnyItemProps): JSX.Element {
  const {
    label,
    etablissements,
    highlightLabel,
    simpleLabel,
    activitePrincipale,
    matchingEtablissement,
  } = entreprise;

  const { trackEvent, title, uuid } = useTrackingContext();

  const clickHandler = () => {
    trackEvent("enterprise_select", title, label, uuid);
    onClick(entreprise);
  };
  const showTitleWithHighlight = label === simpleLabel;
  return (
    <ItemButton as="button" isFirst={isFirst} onClick={clickHandler}>
      {showTitleWithHighlight ? (
        <Title
          as="div"
          fontSize="hsmall"
          fontWeight="600"
          dangerouslySetInnerHTML={{ __html: highlightLabel }}
        />
      ) : (
        <>
          <Title as="div" fontWeight="600" fontSize="hsmall">
            {simpleLabel}
          </Title>
          <Subtitle
            as="div"
            dangerouslySetInnerHTML={{ __html: highlightLabel }}
          />
        </>
      )}
      {activitePrincipale && <Activity as="div">{activitePrincipale}</Activity>}
      {!showAddress && etablissements > 1 ? (
        <Tag> {etablissements} établissements </Tag>
      ) : (
        <Text>{matchingEtablissement.address}</Text>
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

const Title = styled(Text)`
  padding-bottom: ${spacings.xsmall};
  & b {
    font-weight: 700;
  }
`;
const Subtitle = styled(Text)`
  padding-bottom: ${spacings.xsmall};
`;
