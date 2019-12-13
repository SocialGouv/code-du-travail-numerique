import React from "react";
import PropTypes from "prop-types";
import { format, parseISO } from "date-fns";
import { Accordion, Table } from "@socialgouv/react-ui";
import { pluralize } from "../../lib/pluralize";
const Info = ({
  convention: { idcc, title, date_publi, url, nbTextes, nbArticles }
}) => (
  <Accordion
    items={[
      {
        title: "Plus d’informations sur cette convention collective.",
        body: Details({ idcc, title, date_publi, url, nbTextes, nbArticles })
      }
    ]}
  />
);

function Details({ idcc, title, date_publi, url, nbTextes, nbArticles }) {
  return (
    <>
      <Table>
        <tbody>
          <tr>
            <th>Nom complet</th>
            <td>{title}</td>
          </tr>
          <tr>
            <th>IDCC</th>
            <td>{idcc}</td>
          </tr>
          {date_publi && (
            <tr>
              <th>Date d’entrée en vigueur</th>
              <td>{format(parseISO(date_publi), "dd/MM/yyyy")}</td>
            </tr>
          )}
          <tr>
            <th>Nombre de textes</th>
            <td>{nbTextes}</td>
          </tr>
          <tr>
            <th>Nombre d’articles</th>
            <td>
              {nbArticles.vigueurEtendu + nbArticles.vigueurNonEtendu}
              {nbArticles.vigueurEtendu + nbArticles.vigueurNonEtendu > 0
                ? "("
                : ""}
              {nbArticles.vigueurEtendu > 1
                ? `${pluralize(
                    { 1: "#{} étendu", other: "#{} etendus" },
                    nbArticles.vigueurEtendu
                  )}`
                : null}
              {nbArticles.vigueurEtendu > 0 && nbArticles.vigueurNonEtendu > 0
                ? ", "
                : null}
              {nbArticles.vigueurNonEtendu > 1
                ? `${pluralize(
                    { 1: "#{} non étendu", other: "#{} non étendus" },
                    nbArticles.vigueurNonEtendu
                  )}`
                : null}
              {nbArticles.vigueurEtendu + nbArticles.vigueurNonEtendu > 0
                ? ")"
                : ""}
            </td>
          </tr>
        </tbody>
      </Table>
      <p>
        <a target="_blank" rel="noopener noreferrer" href={url}>
          Voir la convention sur Legifrance
        </a>
      </p>
    </>
  );
}

Info.propTypes = {
  convention: PropTypes.shape({
    url: PropTypes.string,
    idcc: PropTypes.string,
    date_publi: PropTypes.string
  }).isRequired
};

export { Info };
