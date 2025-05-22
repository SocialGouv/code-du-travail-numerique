import { fr } from "@codegouvfr/react-dsfr";
import Link from "../common/Link";
import { css } from "@styled-system/css";

export type Props = {
  letters: string[];
};

export const AlphabeticList = ({ letters }: Props) => {
  return (
    <ul className={`${fr.cx("fr-grid-row")} ${ulStyle}`}>
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
  );
};

const ulStyle = css({
  listStyle: "none!",
});
