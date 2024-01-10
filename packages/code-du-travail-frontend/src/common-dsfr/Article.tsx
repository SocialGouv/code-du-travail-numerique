import React, { PropsWithChildren, ReactNode } from "react";

type Props = PropsWithChildren<{
  date?: string;
  dateLabel?: string;
  metaDescription: string;
  source: {
    name: string;
    url: string;
  };
  style?: any;
  subtitle?: ReactNode;
  suptitle?: ReactNode;
  title: string;
}>;

const Article = ({
  children,
  date,
  dateLabel = "Mis à jour le",
  source,
  subtitle = undefined,
  suptitle = undefined,
  title,
  metaDescription = "",
}: Props) => {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default Article;
