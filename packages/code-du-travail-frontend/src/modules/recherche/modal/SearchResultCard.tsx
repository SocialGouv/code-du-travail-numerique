import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import Link from "next/link";
import { SearchResult } from "./types";

interface SearchResultCardProps {
  result: SearchResult;
  onClick?: () => void;
}

export const SearchResultCard = ({
  result,
  onClick,
}: SearchResultCardProps) => {
  const getBadgeColor = (type: SearchResult["type"]) => {
    switch (type) {
      case "MODELE DE DOCUMENT":
        return "pink-tuile";
      case "THEME":
        return "blue-ecume";
      case "ARTICLE DU DROIT DU TRAVAIL":
        return "yellow-tournesol";
      case "CONVENTION COLLECTIVE":
        return "green-tilleul-verveine";
      case "CONTENU":
        return "blue-ecume";
      default:
        return "blue-ecume";
    }
  };

  const content = (
    <div className={cardContainer}>
      <div className={fr.cx("fr-mb-1w")}>
        <span
          className={`${fr.cx("fr-badge")} ${badgeStyle(getBadgeColor(result.type))}`}
        >
          {result.type}
        </span>
      </div>
      <h3 className={fr.cx("fr-text--md", "fr-mb-0", "fr-text--bold")}>
        {result.title}
      </h3>
    </div>
  );

  if (result.slug) {
    return (
      <Link href={result.slug} className={linkStyle} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return <div onClick={onClick}>{content}</div>;
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
    color: "var(--text-default-grey)!",
    fontSize: "0.75rem!",
    fontWeight: "bold!",
    textTransform: "uppercase",
    padding: "0.25rem 0.5rem!",
  });
