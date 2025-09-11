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
        <h3 className={classNameTitle}>Sources</h3>
        <ul data-testid="sources">
          {references
            .filter(({ article }) => article !== null)
            .map(({ article, url }, id) => (
              <li key={`${url}-${id}`} data-testid={`source-${id}`}>
                <Link
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${url} - nouvelle fenêtre`}
                >
                  {article}
                </Link>
              </li>
            ))}
        </ul>
      </>
    )}
  </>
);
