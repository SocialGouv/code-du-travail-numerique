import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";

class ConventionInfos extends React.Component {
  render() {
    const { convention, conteneur } = this.props;
    const { url } = convention;
    return (
      <React.Fragment>
        <table>
          <tbody>
            <tr>
              <th>IDCC</th>
              <td>{conteneur.num}</td>
            </tr>
            <tr>
              <th>Date de publication originale</th>
              <td>{format(conteneur.date_publi, "DD/MM/YYYY")}</td>
            </tr>
          </tbody>
        </table>

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
