import { fr } from "@codegouvfr/react-dsfr";
import Link from "../../common/Link";
import { css } from "@styled-system/css";

type Props = {
  letters: string[];
};

export const AgreementsGlossaire = ({ letters }: Props) => {
  return (
    <>
      <h2>Les conventions collectives traitées</h2>
      <p className={fr.cx("fr-mb-6w")}>
        Les conventions collectives présentées sont les plus représentatives en
        termes de nombre de salariés.
      </p>
      <div>
        <ul className={`${fr.cx("fr-grid-row")} ${ul}`}>
          {letters.map((letter, index) => (
            <li key={letter} className={fr.cx("fr-mx-1v")}>
              {index > 0 && (
                <strong aria-hidden="true" className={fr.cx("fr-h3")}>
                  {" "}
                  -{" "}
                </strong>
              )}
              <Link href={`#${letter}`} className={fr.cx("fr-h3")}>
                {letter}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ul = css({
  listStyle: "none!",
});
