import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import Link from "src/modules/common/Link";
import {
  generateSearchLink,
  getSourceLabel,
  badgeColorClasses,
} from "../utils";
import { SearchResult } from "src/api";

type Props = {
  result: SearchResult;
  onClick?: () => void;
};

export const SearchResultCard = ({ result, onClick }: Props) => {
  const isExternal = result.source === "external" && Boolean(result.url);
  const href = generateSearchLink(
    result.source,
    result.slug,
    result.url,
    result.parentSlug
  );
  const hasHash = href.includes("#");

  return (
    <Link
      href={href}
      className={linkStyle}
      onClick={onClick}
      scroll={!hasHash}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      title={isExternal ? result.title : undefined}
    >
      <div className={cardContainer}>
        <div className={`${fr.cx("fr-mb-1w")} ${badgeContainer}`}>
          <span className={`${badgeBase} ${badgeColorClasses[result.source]}`}>
            {getSourceLabel(result.source).toUpperCase()}
          </span>
        </div>
        <span
          className={`${fr.cx("fr-text--md", "fr-mb-0", "fr-text--bold")} ${titleStyle}`}
        >
          {result.title}
        </span>
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

const titleStyle = css({
  color: "var(--text-action-high-blue-france) !important",
});
