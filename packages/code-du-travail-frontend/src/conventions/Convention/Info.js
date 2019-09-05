import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { Table } from "@cdt/ui-old";

const Info = ({
  convention: { url },
  container: { date_publi, num, categorisation }
}) => {
  return (
    <>
      <Table>
        <tbody>
          <tr>
            <th>IDCC</th>
            <td>{num}</td>
          </tr>
          {date_publi && (
            <tr>
              <th>Date d’entrée en vigueur</th>
              <td>{format(date_publi, "DD/MM/YYYY")}</td>
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
  convention: PropTypes.shape({
    url: PropTypes.string
  }).isRequired,
  container: PropTypes.shape({
    num: PropTypes.string,
    date_publi: PropTypes.string,
    categorisation: PropTypes.array
  }).isRequired
};

export default Info;
