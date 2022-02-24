import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";
import Link from "next/link";
import React from "react";

import { ConventionCollective } from "./type/WizardType";

type Props = {
  ccn: ConventionCollective;
};

const CCSearchInfo: React.FC<Props> = ({ ccn }) => (
  <p>
    Vous pouvez faire une recherche par mots-clés dans{" "}
    <Link href={`/${getRouteBySource(SOURCES.CCN)}/${ccn.slug}`}>
      <a>votre convention collective</a>
    </Link>
  </p>
);

export default CCSearchInfo;
