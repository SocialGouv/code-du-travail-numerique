import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import { SearchResult } from "./types";
import Link from "src/modules/common/Link";

type Props = {
  result: SearchResult;
};

export const SearchResultCard = ({ result }: Props) => {
  const getBadgeColor = (type: SearchResult["type"]) => {
    switch (type) {
      case "MODELE DE DOCUMENT":
        return "background-alt-pink-macaron";
      case "THEME":
        return "background-alt-blue-cumulus";
      case "ARTICLE DU DROIT DU TRAVAIL":
        return "background-alt-yellow-tournesol";
      case "CONVENTION COLLECTIVE":
        return "background-alt-green-tilleul-verveine";
      case "CONTENU":
        return "background-alt-red-marianne";
      default:
        return "background-alt-blue-cumulus";
    }
  };

  return (
    <Link href={result.slug} className={linkStyle}>
      <div className={cardContainer}>
        <div className={fr.cx("fr-mb-1w")}>
          <span
            className={`${fr.cx("fr-badge")} ${badgeStyle(getBadgeColor(result.type))}`}
          >
            {result.type}
          </span>
        </div>
        <h3
          className={`${fr.cx("fr-text--md", "fr-mb-0", "fr-text--bold")} ${titleStyle}`}
        >
          {result.title}
        </h3>
      </div>
    </Link>
  );
};

const cardContainer = css({
  padding: "1.5rem",
  backgroundColor: "white",
  border: "1px solid var(--border-default-grey)",
  borderRadius: "0.25rem",
  transition: "box-shadow 0.2s ease-in-out",
  cursor: "pointer",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  _hover: {
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
});

const linkStyle = css({
  textDecoration: "none",
  color: "inherit",
  display: "block",
  height: "100%",
  backgroundImage: "none!",
  _hover: {
    backgroundImage: "none!",
  },
});

const badgeStyle = (color: string) =>
  css({
    backgroundColor: `var(--${color})!`,
    color: `var(--${color}-active)!`,
    fontSize: "0.6rem!",
    fontWeight: "bold!",
    textTransform: "uppercase",
    padding: "0.25rem 0.5rem!",
  });

const titleStyle = css({
  color: "var(--text-action-high-blue-france)!",
});
