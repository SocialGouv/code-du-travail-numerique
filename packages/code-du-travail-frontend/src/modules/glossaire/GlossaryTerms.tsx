import { fr } from "@codegouvfr/react-dsfr";
import Link from "next/link";
import React from "react";
import { GlossaryLetter } from "./types";
import { ListWithArrow } from "../common/ListWithArrow";

type GlossaryTermsProps = {
  letters: GlossaryLetter[];
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
            <h2 className={fr.cx("fr-mb-2w")} id={`ancre-${letter}`}>
              {letter}
            </h2>
            <ListWithArrow
              items={terms.map(({ term, slug }) => {
                return (
                  <Link key={slug} href={`/glossaire/${slug}`}>
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
