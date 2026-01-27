import { fr } from "@codegouvfr/react-dsfr";
import { getRouteBySource } from "@socialgouv/cdtn-utils";
import { css } from "@styled-system/css";
import Link from "src/modules/common/Link";
import { getSourceLabel } from "../utils";
import { SearchResult } from "src/api";

type Props = {
  result: SearchResult;
  onClick?: () => void;
  headingLevel?: "h2" | "h3" | "h4";
};

export const SearchResultCard = ({
  result,
  onClick,
  headingLevel = "h3",
}: Props) => {
  const HeadingTag = headingLevel;

  return (
    <Link
      href={`/${getRouteBySource(result.source)}/${result.slug}`}
      className={linkStyle}
      onClick={onClick}
    >
      <div className={cardContainer}>
        <HeadingTag
          className={`${fr.cx("fr-text--md", "fr-mb-0", "fr-text--bold")} ${titleStyle}`}
        >
          {result.title}
        </HeadingTag>
        <div className={`${fr.cx("fr-mb-1w")} ${badgeContainer}`}>
          <span className={`${badgeBase} ${badgeColorClasses[result.source]}`}>
            {getSourceLabel(result.source).toUpperCase()}
          </span>
        </div>
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

const badgeContainer = css({
  order: -1,
  display: "block",
});

const badgeColorClasses: Partial<Record<SearchResult["source"], string>> = {
  themes: css({
    backgroundColor: "var(--background-contrast-info) !important", // light decision background background contrast info
    color: "var(--text-default-info) !important", // light decision text default info
  }),
  code_du_travail: css({
    backgroundColor: "var(--background-alt-yellow-tournesol) !important", // light option illustration color 950 default yellow tournesol
    color: "var(--text-action-high-yellow-tournesol) !important", // light option illustration color sun default yellow tournesol
  }),
  conventions_collectives: css({
    backgroundColor: "var(--background-contrast-success) !important", // light decision background background contrast success
    color: "var(--text-default-success) !important", // light decision text default success
  }),
  modeles_de_courriers: css({
    backgroundColor: "var(--background-alt-purple-glycine) !important", // light option illustration color 950 default purple glycine
    color: "var(--text-action-high-purple-glycine) !important", // light option illustration color sun default purple glycine
  }),
  outils: css({
    backgroundColor: "var(--background-contrast-warning) !important", // light decision background background contrast warning
    color: "var(--text-default-warning) !important", // light decision text default warning
  }),
  external: css({
    backgroundColor: "var(--background-contrast-warning) !important", // light decision background background contrast warning
    color: "var(--text-default-warning) !important", // light decision text default warning
  }),
  infographies: css({
    backgroundColor: "var(--background-alt-brown-cafe-creme) !important", // light option illustration color 975 default brown cafe creme
    color: "var(--text-action-high-purple-glycine) !important", // light option illustration color sun default purple glycine
  }),
  contributions: css({
    backgroundColor: "var(--background-alt-green-archipel) !important", // light option illustration color 975 default green archipel
    color: "var(--text-action-high-green-archipel) !important", // light option illustration color sun default green archipel
  }),
  fiches_ministere_travail: css({
    backgroundColor: "var(--background-alt-green-archipel) !important", // light option illustration color 975 default green archipel
    color: "var(--text-action-high-green-archipel) !important", // light option illustration color sun default green archipel
  }),
  fiches_service_public: css({
    backgroundColor: "var(--background-alt-green-archipel) !important", // light option illustration color 975 default green archipel
    color: "var(--text-action-high-green-archipel) !important", // light option illustration color sun default green archipel
  }),
  information: css({
    backgroundColor: "var(--background-alt-green-archipel) !important", // light option illustration color 975 default green archipel
    color: "var(--text-action-high-green-archipel) !important", // light option illustration color sun default green archipel
  }),
  page_fiche_ministere_travail: css({
    backgroundColor: "var(--background-alt-green-archipel) !important", // light option illustration color 975 default green archipel
    color: "var(--text-action-high-green-archipel) !important", // light option illustration color sun default green archipel
  }),
};

const titleStyle = css({
  color: "var(--text-action-high-blue-france) !important",
});
