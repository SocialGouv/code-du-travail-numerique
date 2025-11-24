import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import { SearchResult } from "./types";
import Link from "src/modules/common/Link";

type Props = {
  result: SearchResult;
  onClick?: () => void;
};

export const SearchResultCard = ({ result, onClick }: Props) => {
  return (
    <Link href={result.slug} className={linkStyle} onClick={onClick}>
      <div className={cardContainer}>
        <div className={fr.cx("fr-mb-1w")}>
          <span className={`${badgeBase} ${badgeColorClasses[result.type]}`}>
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
  "&:hover": {
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
});

const linkStyle = css({
  textDecoration: "none",
  color: "inherit",
  display: "block",
  height: "100%",
  backgroundImage: "none !important",
  "&:hover": {
    backgroundImage: "none !important",
  },
});

const badgeBase = css({
  display: "inline-block",
  borderRadius: "0.25rem",
  fontSize: "0.6rem !important",
  fontWeight: "bold !important",
  textTransform: "uppercase",
  padding: "0.25rem 0.5rem !important",
  lineHeight: 1,
});

const badgeColorClasses: Record<SearchResult["type"], string> = {
  "MODELE DE DOCUMENT": css({
    backgroundColor: "var(--background-alt-pink-macaron) !important",
    color: "var(--background-alt-pink-macaron-active) !important",
  }),
  THEME: css({
    backgroundColor: "var(--background-alt-blue-cumulus) !important",
    color: "var(--background-alt-blue-cumulus-active) !important",
  }),
  "ARTICLE DU DROIT DU TRAVAIL": css({
    backgroundColor: "var(--background-alt-yellow-tournesol) !important",
    color: "var(--background-alt-yellow-tournesol-active) !important",
  }),
  "CONVENTION COLLECTIVE": css({
    backgroundColor: "var(--background-alt-green-tilleul-verveine) !important",
    color: "var(--background-alt-green-tilleul-verveine-active) !important",
  }),
  CONTENU: css({
    backgroundColor: "var(--background-alt-red-marianne) !important",
    color: "var(--background-alt-red-marianne-active) !important",
  }),
};

const titleStyle = css({
  color: "var(--text-action-high-blue-france) !important",
});
