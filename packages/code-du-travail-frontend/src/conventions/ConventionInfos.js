import React from "react";
import PropTypes from "prop-types";
import { format, parseISO } from "date-fns";
import { Table } from "@cdt/ui-old";

class ConventionInfos extends React.Component {
  render() {
    const { convention, conteneur } = this.props;
    const { url } = convention;
    return (
      <React.Fragment>
        <Table>
          <tbody>
            <tr>
              <th>IDCC</th>
              <td>{conteneur.num}</td>
            </tr>
            <tr>
              <th>Date d’entrée en vigueur</th>
              <td>{format(parseISO(conteneur.date_publi), "dd/MM/yyyy")}</td>
            </tr>
          </tbody>
        </Table>

        <p>
          <a target="_blank" rel="noopener noreferrer" href={url}>
            Voir la convention sur Legifrance ↗
          </a>
        </p>
      </React.Fragment>
    );
  }
}

ConventionInfos.propTypes = {
  convention: PropTypes.shape({
    url: PropTypes.string
  }).isRequired,
  conteneur: PropTypes.shape({
    num: PropTypes.string,
    date_publi: PropTypes.string
  }).isRequired
};

export default ConventionInfos;
