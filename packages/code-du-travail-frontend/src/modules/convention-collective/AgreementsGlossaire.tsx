"use client";
import { fr } from "@codegouvfr/react-dsfr";
import Link from "next/link";
import { css } from "../../../styled-system/css";

type Props = {
  letters: string[];
};

export const AgreementsGlossaire = ({ letters }: Props) => {
  return (
    <>
      <h2>Les conventions collectives traitées</h2>
      <p className={fr.cx("fr-mb-6w")}>
        Les conventions collectives présentées sont les plus représentatives en
        terme de nombres de salariés.
      </p>
      <ul className={`${fr.cx("fr-pl-0", "fr-m-0")} ${ul}`}>
        {letters.map((letter, index) => (
          <>
            {index !== 0 ? (
              <li className={fr.cx("fr-h3", "fr-px-1w", "fr-mb-0")}>-</li>
            ) : (
              <></>
            )}
            <li key={letter} className={"fr-mb-0"}>
              <Link href={`#${letter}`} className={fr.cx("fr-h3")}>
                {letter}
              </Link>
            </li>
          </>
        ))}
      </ul>
    </>
  );
};

const ul = css({
  listStyle: "none!",
  display: "flex",
  flexDirection: "row",
});
