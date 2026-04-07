import { fr } from "@codegouvfr/react-dsfr";
import { Card } from "@codegouvfr/react-dsfr/Card";
import DisplayContent from "../../common/DisplayContent";
import { HomeNewsCardItem } from "../queries";
import { formatDateAsFrenchText } from "../../utils";
import { css } from "@styled-system/css";

export type HomeCardProps = HomeNewsCardItem;

export const HomeNewsCard = ({
  title,
  description,
  link,
  date,
}: HomeCardProps) => (
  <Card
    border
    desc={
      <span className={contentLimited}>
        <DisplayContent
          content={description}
          titleLevel={4}
          extra={{ disableLink: true }}
        />
      </span>
    }
    horizontal
    linkProps={{
      href: link,
    }}
    size="medium"
    title={title}
    titleAs="h3"
    enlargeLink
    end={
      <p className={fr.cx("fr-m-0", "fr-card__detail")}>
        {formatDateAsFrenchText(date)}
      </p>
    }
    classes={{
      start: fr.cx("fr-mb-2w"),
    }}
  />
);

const contentLimited = css({
  display: "-webkit-box !important",
  // @ts-expect-error - vendor prefixed properties
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 5,
  overflow: "hidden",
  textOverflow: "ellipsis",
  overflowWrap: "break-word",
  whiteSpace: "normal", // Important : force le retour à la ligne
});
