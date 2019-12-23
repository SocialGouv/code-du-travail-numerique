import React from "react";
import PropTypes from "prop-types";
import { format, parseISO } from "date-fns";
import { Accordion, Table } from "@socialgouv/react-ui";
import { formatIdcc } from "@cdt/data/lib";

const Info = ({ convention: { num, title, date_publi, url, nbTextes } }) => (
  <Accordion
    items={[
      {
        title: "Plus d’informations sur cette convention collective.",
        body: Details({ num, title, date_publi, url, nbTextes })
      }
    ]}
  />
);

function Details({ num, title, date_publi, url, nbTextes }) {
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
            <td>{formatIdcc(num)}</td>
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
        </tbody>
      </Table>
      <p>
        <a target="_blank" rel="noopener noreferrer nofollow" href={url}>
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
