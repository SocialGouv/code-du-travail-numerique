import { fr } from "@codegouvfr/react-dsfr";
import { Card } from "@codegouvfr/react-dsfr/Card";
import { css } from "@styled-system/css";

export type TemplateHomeCardProps = {
  title: string;
  link: string;
};

export const TemplateHomeCard = ({ title, link }: TemplateHomeCardProps) => (
  <Card
    border
    horizontal
    linkProps={{
      href: link,
    }}
    size="small"
    title={<span className={titleLimited}>{title}</span>}
    titleAs="h3"
    enlargeLink
    end={<p className={fr.cx("fr-m-0", "fr-text--xs")}>Consulter</p>}
    classes={{
      end: fr.cx("fr-text--xs"),
    }}
  />
);

const titleLimited = css({
  display: "-webkit-box !important",
  // @ts-expect-error - vendor prefixed properties
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 3,
  overflow: "hidden",
  textOverflow: "ellipsis",
  overflowWrap: "break-word",
  whiteSpace: "normal", // Important : force le retour à la ligne
});
