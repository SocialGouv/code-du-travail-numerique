import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Table } from "@cdt/ui";

const Metadata = ({ texte }) => {
  const { nature, date_texte, origine_publi } = texte.data;
  const [expanded, setExpanded] = useState(false);

  if (!nature) return null;
  if (!expanded) {
    return (
      <div>
        <Button variant={"link"} onClick={() => setExpanded(true)}>
          <i>afficher les détails de ce texte</i>
        </Button>
      </div>
    );
  }
  return (
    <Table>
      <tbody>
        <tr>
          <th>Nature</th>
          <td>{nature}</td>
        </tr>
        <tr>
          <th>Date</th>
          <td>{date_texte.substr(0, 10)}</td>
        </tr>
        {origine_publi && (
          <tr>
            <th>Origine Publication</th>
            <td>{origine_publi}</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

Metadata.propTypes = {
  nature: PropTypes.string,
  date_texte: PropTypes.string,
  origine_publi: PropTypes.string
};

export default Metadata;
