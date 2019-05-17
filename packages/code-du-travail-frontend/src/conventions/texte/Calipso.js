import React from "react";

const Calipso = ({ calipso }) => (
  <div
    style={{
      display: "inline-block",
      backgroundColor: "rgb(0, 83, 179)",
      color: "#fff",
      borderRadius: "2px",
      margin: "2px",
      fontSize: "0.8rem",
      padding: "2px 10px"
    }}
  >
    {calipso}
  </div>
);

export default Calipso;
