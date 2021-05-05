import { Tag, Text, theme } from "@socialgouv/cdtn-ui";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

import { Entreprise } from "../../../conventions/Search/api/entreprises.service";
import { matopush } from "../../../piwik";

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
    siren,
    label,
    etablissements,
    highlightLabel,
    simpleLabel,
    activitePrincipale,
    matchingEtablissement,
  } = entreprise;
  const router = useRouter();
  const clickHandler = () => {
    matopush(["trackEvent", "cc_compagny_select", router.asPath, siren]);
    onClick(entreprise);
  };
  const showTitleWithHighlight = label === simpleLabel;
  return (
    <ItemButton isFirst={isFirst} onClick={clickHandler}>
      {showTitleWithHighlight ? (
        <Title
          as="div"
          fontSize="medium"
          dangerouslySetInnerHTML={{ __html: highlightLabel }}
        />
      ) : (
        <>
          <Title as="div" fontSize="medium">
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

const { spacings, fonts } = theme;

const Activity = styled(Text)`
  color: ${({ theme }) => theme.altText};
  padding-bottom: ${spacings.xsmall};
`;

const ItemButton = styled.button`
  display: block;
  appearance: none;
  width: 100%;
  background-color: transparent;
  font-weight: 500;
  border: none;
  font-size: ${fonts.sizes.default};
  padding: ${({ small }) => (small ? spacings.xsmall : spacings.medium)}
    ${spacings.xmedium};
  color: ${({ theme }) => theme.paragraph};
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  &:hover {
    color: ${({ theme }) => theme.title};
    background-color: ${({ theme }) => theme.border};
  }
  &:hover ${Activity} {
    color: ${({ theme }) => theme.paragraph};
  }
  &:not(:hover)::before {
    content: "";
    position: absolute;
    display: block;
    left: 0;
    right: 0;
    top: -1px;
    margin: 0 ${spacings.xmedium};
    border-top: solid ${({ theme }) => theme.border};
    border-top-width: ${({ isFirst }) => (isFirst ? "0px" : "1px")};
  }
`;

const Title = styled(Text)`
  padding-bottom: ${spacings.xsmall};
`;
const Subtitle = styled(Text)`
  padding-bottom: ${spacings.xsmall};
`;
