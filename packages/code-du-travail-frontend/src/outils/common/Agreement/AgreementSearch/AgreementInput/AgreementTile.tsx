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
import { Agreement } from "src/modules/outils/indemnite-depart/types";

type Props = {
  agreement: Agreement;
  isWidgetMode?: boolean;
  noRedirect?: boolean;
} & TrackingProps;

export function AgreementTile({
  agreement,
  onUserAction,
  isWidgetMode,
  noRedirect,
}: Props): JSX.Element {
  const clickHandler = () => {
    onUserAction(UserAction.SelectAgreement, `idcc${agreement.num.toString()}`);
    window.parent?.postMessage(
      {
        name: "agreement",
        kind: "select",
        extra: { idcc: agreement.num, title: agreement.title },
      },
      "*"
    );
  };
  return (
    <LinkedTile
      wide
      title={`${agreement.shortTitle} IDCC${formatIdcc(agreement.num)}`}
      subtitle={getLabelBySource(SOURCES.CCN)}
      onClick={clickHandler}
      href={`${isWidgetMode ? SITE_URL : ""}/${getRouteBySource(SOURCES.CCN)}/${agreement.slug}`}
      target={isWidgetMode ? "_blank" : "_self"}
      noRedirect={noRedirect}
    >
      <Paragraph noMargin>
        {agreement.contributions
          ? "Retrouvez les questions-réponses les plus fréquentes organisées par thème et élaborées par le Ministère du travail concernant cette convention collective"
          : "Consultez les dispositions de cette convention collective"}
      </Paragraph>
    </LinkedTile>
  );
}
