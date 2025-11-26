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
  THÉMATIQUE: css({
    backgroundColor: "var(--background-contrast-info) !important", // light decision background background contrast info
    color: "var(--text-default-info) !important", // light decision text default info
  }),
  "DROIT DU TRAVAIL": css({
    backgroundColor: "var(--background-alt-yellow-tournesol) !important", // light option illustration color 950 default yellow tournesol
    color: "var(--text-action-high-yellow-tournesol) !important", // light option illustration color sun default yellow tournesol
  }),
  "CONVENTION COLLECTIVE": css({
    backgroundColor: "var(--background-contrast-success) !important", // light decision background background contrast success
    color: "var(--text-default-success) !important", // light decision text default success
  }),
  "MODÈLE DE DOCUMENT": css({
    backgroundColor: "var(--background-alt-purple-glycine) !important", // light option illustration color 950 default purple glycine
    color: "var(--text-action-high-purple-glycine) !important", // light option illustration color sun default purple glycine
  }),
  SIMULATEUR: css({
    backgroundColor: "var(--background-contrast-warning) !important", // light decision background background contrast warning
    color: "var(--text-default-warning) !important", // light decision text default warning
  }),
  INFOGRAPHIE: css({
    backgroundColor: "var(--background-alt-brown-cafe-creme) !important", // light option illustration color 975 default brown cafe creme
    color: "var(--text-action-high-purple-glycine) !important", // light option illustration color sun default purple glycine
  }),
  "FICHE PRATIQUE": css({
    backgroundColor: "var(--background-alt-green-archipel) !important", // light option illustration color 975 default green archipel
    color: "var(--text-action-high-green-archipel) !important", // light option illustration color sun default green archipel
  }),
};

const titleStyle = css({
  color: "var(--text-action-high-blue-france) !important",
});
