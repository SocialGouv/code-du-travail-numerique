import { formatIdcc } from "@socialgouv/modeles-social";
import {
  getLabelBySource,
  getRouteBySource,
  SOURCES,
} from "@socialgouv/cdtn-utils";
import { Paragraph } from "@socialgouv/cdtn-ui";
import React from "react";
import {
  TrackingProps,
  UserAction,
} from "../../../../ConventionCollective/types";
import { LinkedTile } from "../../../../../common/tiles/LinkedTile";
import { SITE_URL } from "../../../../../config";
import { EnterpriseAgreement } from "../../../../../conventions/Search/api/enterprises.service";

type Props = {
  agreement: EnterpriseAgreement;
  isWidgetMode?: boolean;
} & TrackingProps;

export function AgreementTile({
  agreement,
  onUserAction,
  isWidgetMode,
}: Props): JSX.Element {
  const clickHandler = () => {
    onUserAction(UserAction.SelectAgreement, `idcc${agreement.num.toString()}`);
  };
  return (
    <LinkedTile
      wide
      title={`${agreement.shortTitle} IDCC${formatIdcc(agreement.num)}`}
      subtitle={getLabelBySource(SOURCES.CCN)}
      onClick={clickHandler}
      href={`${isWidgetMode ? SITE_URL : ""}/${getRouteBySource(SOURCES.CCN)}/${
        agreement.slug
      }`}
      target={isWidgetMode ? "_blank" : "_self"}
    >
      <Paragraph noMargin>
        {agreement.contributions
          ? "Retrouvez les questions-réponses les plus fréquentes organisées par thème et élaborées par le Ministère du travail concernant cette convention collective"
          : "Consultez les dispositions de cette convention collective"}
      </Paragraph>
    </LinkedTile>
  );
}
