import { fr } from "@codegouvfr/react-dsfr";
import Link from "next/link";
import React from "react";
import { GlossaryByLetter } from "./types";
import { ListWithArrow } from "../common/ListWithArrow";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";

type GlossaryTermsProps = {
  letters: GlossaryByLetter;
};

export const GlossaryTerms = ({ letters }: GlossaryTermsProps) => {
  return (
    <div className={fr.cx("fr-grid-row")}>
      {letters.map(({ letter, terms }) => {
        if (terms.length === 0) {
          return null;
        }

        return (
          <div key={letter} className={fr.cx("fr-col-12", "fr-mb-4w")}>
            <h2 className={fr.cx("fr-mb-2w")} id={letter} tabIndex={-1}>
              {letter}
            </h2>
            <ListWithArrow
              items={terms.map(({ term, slug }) => {
                return (
                  <Link
                    key={slug}
                    href={`/${getRouteBySource(SOURCES.GLOSSARY)}/${slug}`}
                  >
                    {term}
                  </Link>
                );
              })}
            />
          </div>
        );
      })}
    </div>
  );
};
