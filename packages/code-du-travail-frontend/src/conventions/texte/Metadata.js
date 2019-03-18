import React, { useState } from "react";

const Metadata = ({ texte }) => {
  const { nature, date_texte, origine_publi } = texte.data;
  const [expanded, setExpanded] = useState(false);

  if (!nature) return null;
  if (!expanded) {
    return (
      <div>
        <ButtonLink eventHandler={() => setExpanded(true)}>
          <i>afficher les détails de ce texte</i>
        </ButtonLink>
      </div>
    );
  }
  return (
    <table>
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
    </table>
  );
};

const ButtonLink = ({ eventHandler, children }) => (
  <a
    onClick={eventHandler}
    onKeyUp={eventHandler}
    role="button"
    tabIndex={0}
    style={{
      color: "black",
      cursor: "pointer"
    }}
  >
    {children}
  </a>
);

export default Metadata;
