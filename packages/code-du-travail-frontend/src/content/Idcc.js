import React from "react";
import { Button } from "@socialgouv/code-du-travail-ui";
import { Download } from "react-feather";
import { default as _fetch } from "isomorphic-unfetch";

import Answer from "../search/Answer";

// a IDCC content

export const fetch = ({ slug }) =>
  _fetch(`${process.env.API_URL}/items/idcc/${slug}`);

export const View = ({ id, title }) => (
  <Answer
    title={title}
    emptyMessage="Cette convention collective n'a pas été trouvée"
    footer="Informations fournies par la DILA"
  >
    <p>
      Cliquez sur le lien ci dessous pour accéder à la convention collective sur
      LegiFrance :
    </p>
    <a
      target="_blank"
      href={`https://www.legifrance.gouv.fr/rechConvColl.do?&champIDCC=${id}`}
    >
      <Button primary>
        <Download style={{ verticalAlign: "middle", marginRight: 10 }} />
        {title}
      </Button>{" "}
    </a>
  </Answer>
);

export default View;
