import { fr } from "@codegouvfr/react-dsfr";
import { Breadcrumb, BreadcrumbProps } from "@codegouvfr/react-dsfr/Breadcrumb";

import { RelatedItems } from "../common/RelatedItems";
import { Share } from "../common/Share";
import { RelatedItem } from "../documents";
import { Feedback } from "../layout/feedback";

type Props = {
  relatedItems: { items: RelatedItem[]; title: string }[];
  title: string;
  description: string;
  children: React.ReactNode;
} & Pick<BreadcrumbProps, "segments">;

export const ContainerSimulator = ({
  children,
  relatedItems,
  title,
  description,
  segments = [],
}: Props) => {
  return (
    <div className={fr.cx("fr-grid-row")}>
      <Breadcrumb
        currentPageLabel={title}
        homeLinkProps={{
          href: "/",
        }}
        segments={segments}
        className={fr.cx("fr-mb-2v")}
      />
      <div className={fr.cx("fr-col-12")}>{children}</div>
      <div className={fr.cx("fr-col-12", "fr-col-md-7", "fr-my-12v")}>
        <Feedback />
      </div>

      <div className={fr.cx("fr-grid-row", "fr-col-12")}>
        {relatedItems.length > 0 && (
          <div className={fr.cx("fr-col-12", "fr-col-md-8")}>
            <RelatedItems relatedItems={relatedItems} />
          </div>
        )}
        <div className={fr.cx("fr-col-12", "fr-col-md-4", "fr-mb-12v")}>
          <Share title={title} metaDescription={description} />
        </div>
      </div>
    </div>
  );
};
