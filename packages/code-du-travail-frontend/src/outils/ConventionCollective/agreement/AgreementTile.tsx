import { formatIdcc } from "@cdt/data";
import {
  getLabelBySource,
  getRouteBySource,
  SOURCES,
} from "@socialgouv/cdtn-sources";
import { Paragraph, Tile } from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";

import { AgreementData } from "../../../conventions/Search/api/enterprises.service";
import { useTrackingContext } from "../common/TrackingContext";

type Props = {
  agreement: AgreementData;
};

export function AgreementTile({ agreement }: Props): JSX.Element {
  const { trackEvent, title, uuid } = useTrackingContext();

  const clickHandler = () => {
    trackEvent("cc_select_p2", title, `idcc${agreement.num.toString()}`, uuid);
  };
  return (
    <Link href={`/${getRouteBySource(SOURCES.CCN)}/${agreement.slug}`} passHref>
      <Tile
        wide
        title={`${agreement.shortTitle} IDCC${formatIdcc(agreement.num)}`}
        subtitle={getLabelBySource(SOURCES.CCN)}
        onClick={clickHandler}
      >
        <Paragraph noMargin>
          Retrouvez les questions-réponses les plus fréquentes organisées par
          thème et élaborées par le Ministère du travail concernant cette
          convention collective
        </Paragraph>
      </Tile>
    </Link>
  );
}
