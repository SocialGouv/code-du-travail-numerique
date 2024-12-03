import React from "react";

export const getTitleLevel = (level: number) => {
  switch (level) {
    case 0:
      return "h2";
    case 1:
      return "h3";
    case 2:
      return "h4";
    case 3:
      return "h5";
    default:
      return "h6";
  }
};

export const Title = ({
  level,
  children,
  className,
}: {
  level: number;
  children: string;
  className?: string;
}) => {
  const Heading = getTitleLevel(level);
  return <Heading className={className}>{children}</Heading>;
};

export default Title;
