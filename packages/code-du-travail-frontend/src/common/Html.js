import React from "react";

const Html = ({ children }) => (
  <div dangerouslySetInnerHTML={{ __html: children }} />
);

export default Html;
