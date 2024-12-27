import { References } from "@socialgouv/modeles-social";
import React from "react";

type Props = {
  references: References[];
};

export const PubliReferences: React.FC<Props> = ({ references }) => (
  <>
    {references && references.length > 0 && (
      <>
        <h2>Sources</h2>
        <ul data-testid="sources">
          {references
            .filter(({ article }) => article !== null)
            .map(({ article, url }, id) => (
              <li key={`${url}-${id}`} data-testid={`source-${id}`}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {article}
                </a>
              </li>
            ))}
        </ul>
        {references.length === 0 && <li>Source non disponible...</li>}
      </>
    )}
  </>
);
