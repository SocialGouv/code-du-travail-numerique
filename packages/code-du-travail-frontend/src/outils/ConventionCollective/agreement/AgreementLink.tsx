import { formatIdcc } from "@cdt/data";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";
import { Paragraph } from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import { Agreement } from "../../../conventions/Search/api/type";
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
    trackEvent("cc_select_p1", title, `idcc${num.toString()}`, uuid);
  };

  return (
    <Link href={`/${getRouteBySource(SOURCES.CCN)}/${agreement.slug}`} passHref>
      <ResultItem as="a" isFirst={isFirst} onClick={clickHandler}>
        {shortTitle} <IDCC>(IDCC {formatIdcc(num)})</IDCC>
        {agreement.highlight && agreement.highlight.searchInfo && (
          <Paragraph variant="altText" noMargin>
            {agreement.highlight.searchInfo}
          </Paragraph>
        )}
      </ResultItem>
    </Link>
  );
}

const IDCC = styled.span`
  font-weight: normal;
`;
