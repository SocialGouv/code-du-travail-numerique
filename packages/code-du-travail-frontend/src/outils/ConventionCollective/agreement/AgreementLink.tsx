import { formatIdcc } from "@cdt/data";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import { Agreement } from "../../../conventions/Search/api/agreement.service";
import { ResultItem } from "../common/ResultList";
import { useTrackingContext } from "../common/TrackingContext";

type AgreementItemProps = {
  agreement: Agreement;
  isFirst: boolean;
};

export function AgreementLink({
  agreement,
  isFirst,
}: AgreementItemProps): JSX.Element {
  // @ts-ignore
  const { idcc, shortTitle, url } = agreement.conventions[0];
  const { trackEvent, title, uuid } = useTrackingContext();
  const clickHandler = () => {
    trackEvent("cc_select_p1", title, `idcc${idcc.toString()}`, uuid);
  };
  console.log(agreement);
  return (
    <Link href={`/${getRouteBySource(SOURCES.CCN)}/${url}`} passHref>
      <ResultItem as="a" isFirst={isFirst} onClick={clickHandler}>
        {shortTitle} <IDCC>(IDCC {formatIdcc(idcc)})</IDCC>
      </ResultItem>
    </Link>
  );
}

const IDCC = styled.span`
  font-weight: normal;
`;
