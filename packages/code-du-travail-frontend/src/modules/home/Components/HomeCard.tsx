import { fr } from "@codegouvfr/react-dsfr";
import { Card } from "@codegouvfr/react-dsfr/Card";
import { Tag } from "@codegouvfr/react-dsfr/Tag";

export type HomeCardProps = {
  theme: string;
  title: string;
  description: string;
  link: string;
};

export const HomeCard = ({
  theme,
  title,
  description,
  link,
}: HomeCardProps) => (
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
);
