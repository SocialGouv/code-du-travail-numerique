import { formatIdcc } from "@cdt/data";
import slugify from "@socialgouv/cdtn-slugify";
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

const getConventionSlug = (convention: AgreementData) =>
  slugify(`${convention.idcc}-${convention.shortTitle}`.substring(0, 80));

export function AgreementTile({ agreement }: Props): JSX.Element {
  const { trackEvent, title, uuid } = useTrackingContext();

  const clickHandler = () => {
    trackEvent("cc_select_p2", title, `idcc${agreement.idcc.toString()}`, uuid);
  };
  return (
    <Link
      href={`/${getRouteBySource(SOURCES.CCN)}/${getConventionSlug(agreement)}`}
      passHref
    >
      <Tile
        wide
        title={`${agreement.shortTitle} IDCC${formatIdcc(agreement.idcc)}`}
        subtitle={getLabelBySource(SOURCES.CCN)}
        onClick={clickHandler}
      >
        <Paragraph isLikeSpan>
          Retrouvez les questions-réponses les plus fréquentes organisées par
          thème et élaborées par le Ministère du travail concernant cette
          convention collective
        </Paragraph>
      </Tile>
    </Link>
  );
}
