import slugify from "@socialgouv/cdtn-slugify";
import {
  getLabelBySource,
  getRouteBySource,
  SOURCES,
} from "@socialgouv/cdtn-sources";
import { Tile } from "@socialgouv/cdtn-ui";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { Convention } from "../../../conventions/Search/api/entreprises.service";
import { matopush } from "../../../piwik";

type Props = {
  agreement: Convention;
};

const getConventionSlug = (convention: Convention) =>
  slugify(`${convention.idcc}-${convention.shortTitle}`.substring(0, 80));

export function AgreementTile({ agreement }: Props): JSX.Element {
  const router = useRouter();
  const clickHandler = () => {
    matopush([
      "trackEvent",
      "cc_compagny_select_cc",
      router.asPath,
      agreement.shortTitle,
    ]);
  };
  return (
    <Link
      href={`/${getRouteBySource(SOURCES.CCN)}/${getConventionSlug(agreement)}`}
      passHref
    >
      <Tile
        wide
        title={agreement.shortTitle}
        subtitle={getLabelBySource(SOURCES.CCN)}
        onClick={clickHandler}
      >
        Retrouvez les questions-réponses les plus fréquentes organisées par
        thème et élaborées par le Ministère du travail concernant cette
        convention collective
      </Tile>
    </Link>
  );
}
