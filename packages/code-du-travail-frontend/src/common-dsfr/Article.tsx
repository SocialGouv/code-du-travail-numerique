import React, { PropsWithChildren, ReactNode } from "react";
import { Title } from "../design-system/base/Title";
import { styled } from "@mui/system";
import { fr } from "@codegouvfr/react-dsfr";

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
      {suptitle && (
        <p
          style={{
            textTransform: "uppercase",
            margin: 0,
            fontWeight: "bold",
            color: fr.colors.decisions.text.actionHigh.blueCumulus.default,
          }}
        >
          {suptitle}
        </p>
      )}
      <h1
        style={{
          marginTop: fr.spacing("1v"),
          color: fr.colors.decisions.text.title.blueFrance.default,
        }}
      >
        {title}
      </h1>
      {subtitle && <p>{subtitle}</p>}
      {children}
    </div>
  );
};

const SubTitle = styled("p")`
  text-transform: uppercase;
  margin: 0;
  font-weight: bold;
  color: ${fr.colors.decisions.text.actionHigh.blueCumulus.default};
`;

const ArticleTitle = styled("h1")`
  margin-top: ${fr.spacing("1v")};
  padding-top: ${fr.spacing("1v")};
  color: ${fr.colors.decisions.text.title.blueFrance.default};
`;

export default Article;
