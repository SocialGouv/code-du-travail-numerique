import React from "react";

const Panel = ({ title, small = "", children }) => (
  <div className="panel">
    <div className="panel__header">
      <h3>{title}</h3>
      <small className="panel__header-extra">{small}</small>
    </div>
    <div className="form__group">{children}</div>
  </div>
);

export default Panel;
