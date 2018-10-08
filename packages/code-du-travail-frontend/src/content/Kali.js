import React from "react";
import { default as _fetch } from "isomorphic-unfetch";
import { Button } from "@socialgouv/code-du-travail-ui";
import { ExternalLink } from "react-feather";

import Answer from "../search/Answer";

// a Kali content
export const fetch = ({ slug }) =>
  fetch(`${process.env.API_URL}/items/kali/${slug}`);

export const View = ({ title, url }) => (
  <Answer
    title={title}
    emptyMessage="Cette convention collective n'a pas été trouvée"
    footer="Informations fournies par la DILA"
  >
    <p>
      Cliquez sur le lien ci dessous pour accéder à la convention collective sur
      LegiFrance :
    </p>
    <a target="_blank" href={url}>
      <Button primary>
        <ExternalLink style={{ verticalAlign: "middle", marginRight: 10 }} />
        {title}
      </Button>{" "}
    </a>
  </Answer>
);

export default View;
