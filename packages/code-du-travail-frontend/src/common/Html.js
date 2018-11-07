import React from "react";

const Html = ({ children, className }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: children }} />
);

export default Html;
