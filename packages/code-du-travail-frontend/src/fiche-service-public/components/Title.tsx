import React from "react";

export const Title = ({
  level,
  children,
}: {
  children: string;
  level: number;
}) => {
  switch (level) {
    case 0:
      return <h2>{children}</h2>;
    case 1:
      return <h3>{children}</h3>;
    case 2:
      return <h4>{children}</h4>;
    case 3:
      return <h5>{children}</h5>;
    default:
      return <h6>{children}</h6>;
  }
};

export default Title;
