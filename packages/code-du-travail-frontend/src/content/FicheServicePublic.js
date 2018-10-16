import React from "react";
import { default as _fetch } from "isomorphic-unfetch";
import styled from "styled-components";
import { ExternalLink } from "react-feather";

import Answer from "../search/Answer";

const ServicePublicCss = styled.div`
  .sp__Titre {
    font-size: 1.5rem;
  }
`;

export const fetch = ({ slug }) =>
  _fetch(`${process.env.API_URL}/items/fiches_service_public/${slug}`);

const Source = ({ name, url }) => (
  <a href={url} target="_blank">
    Voir le contenu original sur : {name}{" "}
    <ExternalLink
      style={{ verticalAlign: "middle", margin: "0 5px" }}
      size={16}
    />
  </a>
);

export const View = ({ title, url, html }) => (
  <ServicePublicCss>
    <Answer
      title={title}
      emptyMessage="Cette fiche n'a pas été trouvée"
      html={html}
      footer={<Source name="service-public.fr" url={url} />}
    />
  </ServicePublicCss>
);

export default View;
