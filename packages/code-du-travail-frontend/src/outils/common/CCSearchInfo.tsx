import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import Link from "next/link";
import React from "react";

import { Agreement } from "@socialgouv/cdtn-types";

type Props = {
  ccn: Agreement;
};

const CCSearchInfo: React.FC<Props> = ({ ccn }) => (
  <p>
    Vous pouvez faire une recherche par mots-clés dans{" "}
    <Link href={`/${getRouteBySource(SOURCES.CCN)}/${ccn.slug}`}>
      votre convention collective
    </Link>
  </p>
);

export default CCSearchInfo;
