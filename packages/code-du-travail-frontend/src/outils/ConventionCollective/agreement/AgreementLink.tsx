import { formatIdcc } from "@cdt/data";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";
import { theme } from "@socialgouv/cdtn-ui";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

import { Agreement } from "../../../conventions/Search/api/convention.service";
import { matopush } from "../../../piwik";
import { ResultItem } from "../common/ResultList";

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
      <ResultItem as="a" isFirst={isFirst} onClick={clickHandler}>
        {shortTitle} <IDCC>(IDCC {formatIdcc(num)})</IDCC>
      </ResultItem>
    </Link>
  );
}

const IDCC = styled.span`
  font-weight: normal;
`;
