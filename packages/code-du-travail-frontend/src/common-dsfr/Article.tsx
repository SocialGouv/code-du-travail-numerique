import React, { PropsWithChildren, ReactNode } from "react";
import { Title } from "../design-system/base/Title";
import { styled } from "@mui/system";
import { fr } from "@codegouvfr/react-dsfr";
import { Follow } from "./Follow";

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
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Follow />
      {suptitle && (
        <p className={"fr-text--sm"}
          style={{
            textTransform: "uppercase",
            margin: "1rem 0 0 0",
            fontWeight: "bold",
            color: fr.colors.decisions.text.actionHigh.blueCumulus.default,
          }}
        >
          {suptitle}
        </p>
      )}
      <h1
        className={"fr-mt-1v fr-h2"}
      >
        {title}
      </h1>
      {subtitle && <p>{subtitle}</p>}
      {children}
    </div>
  );
};

export default Article;
