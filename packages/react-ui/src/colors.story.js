import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

export default {
  title: "Theme|Colors",
};

export const Colors = () => {
  const ColorsComponent = () => {
    const theme = useContext(ThemeContext);
    return Object.keys(theme).map((key) => (
      <div key={key} style={{ alignItems: "center", display: "flex" }}>
        <span
          key={key}
          style={{
            background: theme[key],
            border: "1px solid silver",
            display: "inline-block",
            height: "1em",
            margin: "10px",
            width: "100px",
          }}
        />
        <span>{key}</span>
      </div>
    ));
  };
  return <ColorsComponent />;
};
