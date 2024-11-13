import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { ContainerRich } from "../layout/ContainerRich";
import { RelatedItem } from "../documents";
import { RelatedItems } from "../common/RelatedItems";
import { Share } from "../common/Share";
import { Feedback } from "../layout/feedback";
import { AgreementSearchIntro } from "../convention-collective";
import { FindAgreementBlock } from "../outils";

type Props = {
  metaDescription: string;
  date: string;
  relatedItems: { items: RelatedItem[]; title: string }[];
  title: string;
};

export function ContributionLayout({
  metaDescription,
  date,
  relatedItems,
  title,
}: Props) {
  return (
    <div className={fr.cx("fr-grid-row--gutters", "fr-my-4w", "fr-my-md-12w")}>
      <h1 className={fr.cx("fr-mb-6w")}>{title}</h1>
      <p>Mis à jour le&nbsp;: {date}</p>
      <FindAgreementBlock>
        <AgreementSearchIntro navigationUrl="/widgets/convention-collective" />
      </FindAgreementBlock>
      <div className={fr.cx("fr-grid-row")}>
        <div
          className={fr.cx(
            "fr-col-12",
            "fr-col-md-7",
            "fr-mb-6w",
            "fr-mb-md-0"
          )}
        >
          MyContent
          <Feedback />
        </div>

        <div
          className={fr.cx("fr-col-12", "fr-col-offset-md-1", "fr-col-md-4")}
        >
          <RelatedItems relatedItems={relatedItems} />
          <Share title={title} metaDescription={metaDescription} />
        </div>
      </div>
    </div>
  );
}
