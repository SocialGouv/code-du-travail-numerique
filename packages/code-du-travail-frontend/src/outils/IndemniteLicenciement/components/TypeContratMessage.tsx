import { Paragraph } from "@socialgouv/cdtn-ui";
import React from "react";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";
import Link from "next/link";
import { A11yLink } from "../../../common/A11yLink";

const TypeContratMessage = (): JSX.Element => {
  return (
    <Paragraph>
      L’indemnité de licenciement n’est pas dûe pour les CDD et contrats de
      travail temporaires. Sous certaines conditions, le salarié peut avoir le
      droit à une&nbsp;
      <Link
        href={`${getRouteBySource(SOURCES.TOOLS)}/imdemnite-precarite`}
        passHref
      >
        <A11yLink
          href="/fiche-service-public/le-salarie-touche-t-il-la-prime-de-precarite-a-la-fin-dun-contrat-de-travail"
          target="_blank"
          rel="noopener noreferrer"
        >
          indemnité de précarité (nouvelle fenêtre)
        </A11yLink>
      </Link>
      .
    </Paragraph>
  );
};

export default TypeContratMessage;
