import { References } from "@socialgouv/modeles-social";
import React from "react";

import { A11yLink } from "../../common/A11yLink";
import { SectionTitle } from "./stepStyles";

type Props = {
  references: References[];
};

const PubliReferences: React.FC<Props> = ({ references }) => (
  <>
    {references && references.length > 0 && (
      <>
        <SectionTitle>Sources</SectionTitle>
        <ul data-testid="sources">
          {references
            .filter(({ article }) => article !== null)
            .map(({ article, url }, id) => (
              <li key={`${url}-${id}`} data-testid={`source-${id}`}>
                <A11yLink href={url} target="_blank" rel="noopener noreferrer">
                  {article}
                </A11yLink>
              </li>
            ))}
        </ul>
        {references.length === 0 && <li>Source non disponible...</li>}
      </>
    )}
  </>
);

export default PubliReferences;
