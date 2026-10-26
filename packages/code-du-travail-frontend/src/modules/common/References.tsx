import Accordion from "@codegouvfr/react-dsfr/Accordion";
import { fr } from "@codegouvfr/react-dsfr";
import { ListWithArrow } from "./ListWithArrow";
import Link from "./Link";
import React from "react";

export type Props = {
  label: string;
  links: {
    title: string;
    url: string;
    intro?: string;
  }[];
  titleAs?: `h${2 | 3 | 4 | 5 | 6}`;
};

export const References = ({ label, links, titleAs }: Props) => {
  return (
    <Accordion label={label} className={fr.cx("fr-mt-6w")} titleAs={titleAs}>
      <ListWithArrow
        items={links.map(({ title, url, intro }) => {
          if (!url) return <></>;
          const link = (
            <Link key={title} href={url} target="_blank">
              {title}
            </Link>
          );
          return intro ? (
            <React.Fragment key={title}>
              {intro}&nbsp;: {link}
            </React.Fragment>
          ) : (
            link
          );
        })}
      />
    </Accordion>
  );
};
