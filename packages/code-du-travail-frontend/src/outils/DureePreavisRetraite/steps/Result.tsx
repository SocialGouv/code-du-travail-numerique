import { Alert } from "@socialgouv/cdtn-ui";
import React from "react";

import { A11yLink } from "../../../common/A11yLink";
import Mdx from "../../../common/Mdx";
import { Highlight, SectionTitle } from "../../common/stepStyles";
import { usePublicodes } from "../../publicodes";

function ResultStep(): JSX.Element {
  const publicodesContext = usePublicodes();

  const notifications = publicodesContext.getNotifications();
  const references = publicodesContext.getReferences();
  return (
    <>
      <SectionTitle>Durée du préavis</SectionTitle>
      <p>
        À partir des éléments que vous avez saisis, la durée du préavis de
        départ à la retraite est estimée à&nbsp;
        <Highlight>
          {publicodesContext.result.value}{" "}
          {publicodesContext.result.unit.numerators[0]}
        </Highlight>
        .
      </p>
      {notifications.length > 0 && (
        <Alert>
          {publicodesContext.getNotifications().map((notification) => (
            <Mdx
              key={notification.dottedName}
              markdown={notification.description}
            />
          ))}
        </Alert>
      )}
      {references.length > 0 && (
        <>
          <SectionTitle>Source</SectionTitle>
          <ul>
            {references.map(({ article, url }, id) => (
              <li key={`${url}-${id}`}>
                <A11yLink
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Consultez l’${article.toLowerCase()}`}
                >
                  {article}
                </A11yLink>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export { ResultStep };
