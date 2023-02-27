import { formatIdcc } from "@socialgouv/modeles-social";
import {
  getLabelBySource,
  getRouteBySource,
  SOURCES,
} from "@socialgouv/cdtn-sources";
import { Paragraph } from "@socialgouv/cdtn-ui";
import React from "react";
import { Agreement } from "../../../../../conventions/Search/api/type";
import {
  TrackingProps,
  UserAction,
} from "../../../../ConventionCollective/types";
import { LinkedTile } from "../../../../../common/tiles/LinkedTile";

type Props = {
  agreement: Agreement;
} & TrackingProps;

export function AgreementTile({ agreement, onUserAction }: Props): JSX.Element {
  const clickHandler = () => {
    onUserAction(UserAction.SelectAgreement, `idcc${agreement.num.toString()}`);
  };
  return (
    <LinkedTile
      wide
      title={`${agreement.shortTitle} IDCC${formatIdcc(agreement.num)}`}
      subtitle={getLabelBySource(SOURCES.CCN)}
      onClick={clickHandler}
      href={`/${getRouteBySource(SOURCES.CCN)}/${agreement.slug}`}
    >
      <Paragraph noMargin>
        Retrouvez les questions-réponses les plus fréquentes organisées par
        thème et élaborées par le Ministère du travail concernant cette
        convention collective
      </Paragraph>
    </LinkedTile>
  );
}
