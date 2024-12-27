import React from "react";

type Props = {
  title: string;
  children: React.ReactNode;
  dataTestId?: string;
};

export const Disclaimer = ({
  title,
  children,
  dataTestId,
}: Props): JSX.Element => (
  <div data-testid={dataTestId}>
    <h2>{title}</h2>
    {children}
  </div>
);
