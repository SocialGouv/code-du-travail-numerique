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
  const { num, shortTitle } = agreement;
  const { trackEvent, title, uuid } = useTrackingContext();
  const clickHandler = () => {
    trackEvent("cc_select", title, num.toString(), uuid);
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
