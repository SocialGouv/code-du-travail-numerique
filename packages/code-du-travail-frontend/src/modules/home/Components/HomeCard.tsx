import { fr } from "@codegouvfr/react-dsfr";
import { Card } from "@codegouvfr/react-dsfr/Card";

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
    start={<p className={fr.cx("fr-tag", "fr-tag--sm")}>{theme}</p>}
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
    end={<p className={fr.cx("fr-m-0", "fr-text--xs")}>Consulter</p>}
    classes={{
      start: fr.cx("fr-mb-2w"),
      end: fr.cx("fr-text--xs"),
    }}
  />
);
