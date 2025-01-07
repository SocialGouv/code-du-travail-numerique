"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { useEffect, useRef } from "react";
import { ListWithArrow } from "../../common/ListWithArrow";
import Link from "../../common/Link";
import { ElasticAgreement } from "@socialgouv/cdtn-types";

type Agreement = Pick<ElasticAgreement, "shortTitle" | "slug">;
type Props = {
  letter: string;
  agreements: Agreement[];
};

export const AgreementsSection = ({ letter, agreements }: Props) => {
  const letterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.location.hash === `#${letter}` && letterRef.current) {
      letterRef.current.focus();
    }
  }, [letter]);

  return (
    <>
      <p id={letter} ref={letterRef} tabIndex={-1} className={fr.cx("fr-h3")}>
        {letter}
      </p>
      <ListWithArrow
        items={agreements.map(({ shortTitle, slug }) => {
          return (
            <Link key={slug} href={`/${getRouteBySource(SOURCES.CCN)}/${slug}`}>
              {shortTitle}
            </Link>
          );
        })}
      />
    </>
  );
};
