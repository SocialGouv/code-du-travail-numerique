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

export const HomeCard = (props: HomeCardProps) => (
  <div
    className={fr.cx(
      "fr-col-12",
      props.isSmall ? "fr-col-md-3" : "fr-col-md-6"
    )}
  >
    <Card
      start={<Tag>{props.theme}</Tag>}
      border
      desc={props.description}
      horizontal
      linkProps={{
        href: props.link,
      }}
      size="medium"
      title={props.title}
      titleAs="h3"
      enlargeLink
    />
  </div>
);
