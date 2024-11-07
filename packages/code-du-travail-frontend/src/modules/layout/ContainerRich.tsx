import { fr } from "@codegouvfr/react-dsfr";
import { RelatedItems } from "../common/RelatedItems";
import { Share } from "../common/Share";
import { RelatedItem } from "../documents";
import { Feedback } from "./feedback";

export type ContainerRichProps = {
  relatedItems: { items: RelatedItem[]; title: string }[];
  title: string;
  description: string;
  children: React.ReactNode;
};

export const ContainerRich = ({
  children,
  relatedItems,
  title,
  description,
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
        <Feedback />
      </div>

      <div className={fr.cx("fr-col-12", "fr-col-offset-md-1", "fr-col-md-4")}>
        <RelatedItems relatedItems={relatedItems} />
        <Share title={title} metaDescription={description} />
      </div>
    </div>
  );
};
