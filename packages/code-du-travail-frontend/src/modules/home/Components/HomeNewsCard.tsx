import { fr } from "@codegouvfr/react-dsfr";
import DisplayContent from "../../common/DisplayContent";
import { HomeNewsCardItem } from "../queries";
import { formatDateAsFrenchText } from "../../utils";
import { css } from "@styled-system/css";
import Link from "../../common/Link";

export type HomeCardProps = HomeNewsCardItem;

export const HomeNewsCard = ({
  title,
  description,
  link,
  date,
}: HomeCardProps) => (
  <div className={fr.cx("fr-card", "fr-enlarge-link", "fr-card--horizontal")}>
    <div className={fr.cx("fr-card__body")}>
      <div className={fr.cx("fr-card__content")}>
        <h3 className={fr.cx("fr-card__title")}>
          <Link href={link}>{title}</Link>
        </h3>
        <div className={fr.cx("fr-card__desc")}>
          <span className={contentLimited}>
            <DisplayContent
              content={description}
              titleLevel={4}
              extra={{ disableLink: true }}
            />
          </span>
        </div>
        <div className={fr.cx("fr-card__end")}>
          <p className={fr.cx("fr-m-0", "fr-card__detail")}>
            {formatDateAsFrenchText(date)}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const contentLimited = css({
  display: "-webkit-box !important",
  // @ts-expect-error - vendor prefixed properties
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
  overflowWrap: "break-word",
  whiteSpace: "normal", // Important : force le retour à la ligne
});
