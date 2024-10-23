import { fr } from "@codegouvfr/react-dsfr";
import { Card } from "@codegouvfr/react-dsfr/Card";
import { Tag } from "@codegouvfr/react-dsfr/Tag";

export type HomeCardProps = {
  theme: string;
  title: string;
  description: string;
  link: string;
  isSmall?: boolean;
};

export const HomeCard = ({
  theme,
  title,
  description,
  link,
  isSmall,
}: HomeCardProps) => (
  <div
    className={fr.cx(
      "fr-col-12",
      "fr-col-md-6",
      isSmall ? "fr-col-lg-3" : "fr-col-lg-6"
    )}
  >
    <Card
      start={<Tag small>{theme}</Tag>}
      border
      desc={description}
      horizontal
      linkProps={{
        href: link,
      }}
      size="medium"
      title={title}
      titleAs="h3"
      enlargeLink
      end={<span>Consulter</span>}
      classes={{
        start: fr.cx("fr-mb-2w"),
        end: fr.cx("fr-text--xs"),
      }}
    />
  </div>
);
