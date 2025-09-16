import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { References } from "@socialgouv/modeles-social";
import Link from "src/modules/common/Link";

type Props = {
  references: References[];
  title?: string;
};

const JuridicalReferences: React.FC<Props> = ({
  references,
  title = "Références juridiques",
}) => {
  if (!references || references.length === 0) {
    return null;
  }

  return (
    <div className={fr.cx("fr-mt-4w")}>
      <h3 className={fr.cx("fr-h5")}>{title}</h3>
      <ul>
        {references.map((ref, index) => (
          <li key={index}>
            <Link
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {ref.article}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JuridicalReferences;
