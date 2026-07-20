import { fr } from "@codegouvfr/react-dsfr";
import { RelatedItems } from "../common/RelatedItems";
import { RelatedItem } from "../documents";
import { Feedback } from "./feedback";
import { WhatsNewLink } from "./whatsnew";
import React from "react";

export type ContainerRichProps = {
  relatedItems: { items: RelatedItem[]; title: string }[];
  title: string;
  description: string;
  showFeedback?: boolean;
  showWhatsNewLink?: boolean;
  children: React.ReactNode;
};

export const ContainerRich = ({
  children,
  relatedItems,
  showFeedback = true,
  showWhatsNewLink = false,
}: ContainerRichProps) => {
  return (
    <div
      className={fr.cx(
        "fr-grid-row",
        "fr-grid-row--gutters",
        "fr-my-4w",
        "fr-my-md-12w"
      )}
    >
      <div
        className={fr.cx("fr-col-12", "fr-col-md-7", "fr-mb-6w", "fr-mb-md-0")}
      >
        {children}
        {showFeedback && <Feedback />}
      </div>

      <div className={fr.cx("fr-col-12", "fr-col-offset-md-1", "fr-col-md-4")}>
        {showWhatsNewLink && <WhatsNewLink />}
        <RelatedItems relatedItems={relatedItems} />
      </div>
    </div>
  );
};
