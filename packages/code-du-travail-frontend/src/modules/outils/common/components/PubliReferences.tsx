import { References } from "@socialgouv/modeles-social";
import React from "react";
import Link from "../../../common/Link";

type Props = {
  references: References[];
  classNameTitle?: string;
};

export const PubliReferences: React.FC<Props> = ({
  references,
  classNameTitle,
}) => (
  <>
    {references && references.length > 0 && (
      <>
        <h4 className={classNameTitle}>Sources</h4>
        <ul data-testid="sources">
          {references
            .filter(({ article }) => article !== null)
            .map(({ article, url }, id) => (
              <li key={`${url}-${id}`} data-testid={`source-${id}`}>
                <Link href={url} target="_blank" rel="noopener noreferrer">
                  {article}
                </Link>
              </li>
            ))}
        </ul>
      </>
    )}
  </>
);
