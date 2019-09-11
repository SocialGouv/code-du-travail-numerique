import React, { useContext } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Button } from "@socialgouv/react-ui";
import { ThemeContext } from "../../theme-context";

export const ColorsToggler = () => {
  const { toggleColors } = useContext(ThemeContext);
  return (
    <Button onClick={() => toggleColors()}>{"Inverser les couleurs"}</Button>
  );
};
