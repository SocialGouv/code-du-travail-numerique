import { formatIdcc } from "@cdt/data";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";
import { theme } from "@socialgouv/cdtn-ui";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

import { Agreement } from "../../../conventions/Search/api/convention.service";
import { matopush } from "../../../piwik";

type AgreementItemProps = {
  agreement: Agreement;
  isFirst: boolean;
};

export function AgreementLink({
  agreement,
  isFirst,
}: AgreementItemProps): JSX.Element {
  const { num, shortTitle } = agreement;
  const router = useRouter();
  const clickHandler = () => {
    matopush(["trackEvent", "cc_select", router.asPath, shortTitle]);
  };

  return (
    <Link href={`/${getRouteBySource(SOURCES.CCN)}/${agreement.slug}`} passHref>
      <StyledLink isFirst={isFirst} onClick={clickHandler}>
        {shortTitle} <IDCC>(IDCC {formatIdcc(num)})</IDCC>
      </StyledLink>
    </Link>
  );
}
const { spacings } = theme;
const StyledLink = styled.a`
  display: block;
  padding: ${({ small }) => (small ? spacings.xsmall : spacings.medium)}
    ${spacings.xmedium};
  color: ${({ theme }) => theme.paragraph};
  font-weight: 600;
  text-align: left;
  text-decoration: none;
  position: relative;
  &:hover {
    color: ${({ theme }) => theme.title};
    background-color: ${({ theme }) => theme.border};
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
const IDCC = styled.span`
  font-weight: normal;
`;
