import { fr } from "@codegouvfr/react-dsfr";

import { RelatedItems } from "../common/RelatedItems";
import { RelatedItem } from "../documents";
import { Feedback } from "./feedback";
import { css } from "@styled-system/css";
import { Breadcrumbs, BreadcrumbSegment } from "./breadcrumb";

type Props = {
  relatedItems: { items: RelatedItem[]; title: string }[];
  title: string;
  description: string;
  children: React.ReactNode;
  breadcrumbSegments?: BreadcrumbSegment[];
};

export const ContainerSimulatorLight = ({
  children,
  relatedItems,
  title,
  breadcrumbSegments = [],
}: Props) => {
  return (
    <div className={`${fr.cx("fr-grid-row")} ${printOnlySpace}`}>
      <Breadcrumbs
        currentPageLabel={title}
        segments={breadcrumbSegments}
        className={fr.cx("fr-mb-9v")}
      />
      <div className={fr.cx("fr-col-12")}>{children}</div>
      <div className={fr.cx("fr-col-12", "fr-col-md-7", "fr-my-12v")}>
        <Feedback />
      </div>

      {relatedItems.length > 0 && (
        <div className={fr.cx("fr-grid-row", "fr-col-12")}>
          <div className={fr.cx("fr-col-12", "fr-col-md-8")}>
            <RelatedItems relatedItems={relatedItems} />
          </div>
        </div>
      )}
    </div>
  );
};

const printOnlySpace = css({
  "@media print": {
    marginTop: "30px!",
  },
});
