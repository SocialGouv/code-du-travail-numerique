import React from "react";
import { getText } from "../utils";
import { FicheSPDataTitreFlottant } from "../type";
import { getTitleLevel } from "./Title";

export const TitreFlottant = ({
  level,
  data,
  className,
}: {
  level: number;
  data: FicheSPDataTitreFlottant;
  className?: string;
}) => {
  if (data.children.length === 0) {
    return <></>;
  }
  const Heading = getTitleLevel(level);
  return <Heading className={className}>{getText(data.children[0])}</Heading>;
};

export default TitreFlottant;
