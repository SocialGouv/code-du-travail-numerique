import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

export default {
  title: "Theme|Colors"
};

export const Colors = () => {
  const ColorsComponent = () => {
    const theme = useContext(ThemeContext);
    return Object.keys(theme).map(key => (
      <div key={key} style={{ display: "flex", alignItems: "center" }}>
        <span
          key={key}
          style={{
            display: "inline-block",
            margin: "10px",
            width: "100px",
            height: "1em",
            background: theme[key],
            border: "1px solid silver"
          }}
        />
        <span>{key}</span>
      </div>
    ));
  };
  return <ColorsComponent />;
};
