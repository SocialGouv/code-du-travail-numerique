import React from "react";
import PropTypes from "prop-types";
import { format, parseISO } from "date-fns";
import { Table } from "@cdt/ui-old";

const Info = ({ container: { idcc, categorisation, date_publi, url } }) => {
  return (
    <>
      <Table>
        <tbody>
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
          {categorisation && (
            <tr>
              <th>Categories</th>
              <td>
                {categorisation.map((categorie, index) => (
                  <div key={index}>{categorie}</div>
                ))}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <p>
        <a target="_blank" rel="noopener noreferrer" href={url}>
          Voir la convention sur Legifrance
        </a>
      </p>
    </>
  );
};

Info.propTypes = {
  container: PropTypes.shape({
    url: PropTypes.string,
    idcc: PropTypes.string,
    date_publi: PropTypes.string,
    categorisation: PropTypes.array
  }).isRequired
};

export default Info;
