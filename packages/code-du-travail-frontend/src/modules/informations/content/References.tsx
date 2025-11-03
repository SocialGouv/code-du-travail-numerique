import Accordion from "@codegouvfr/react-dsfr/Accordion";
import { fr } from "@codegouvfr/react-dsfr";
import { ListWithArrow } from "../../common/ListWithArrow";
import Link from "../../common/Link";
import React from "react";

export type Props = {
  label: string;
  links: {
    title: string;
    url: string;
  }[];
  titleAs?: `h${2 | 3 | 4 | 5 | 6}`;
};

export const References = ({ label, links, titleAs }: Props) => {
  return (
    <Accordion label={label} className={fr.cx("fr-mt-6w")} titleAs={titleAs}>
      <ListWithArrow
        items={links.map(({ title, url }) => {
          if (!url) return <></>;
          return (
            <Link key={title} href={url} target="_blank">
              {title}
            </Link>
          );
        })}
      />
    </Accordion>
  );
};
