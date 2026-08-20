import { fr } from "@codegouvfr/react-dsfr";

import { RelatedItems } from "../common/RelatedItems";
import { RelatedItem } from "../documents";
import { Feedback } from "./feedback";
import { css } from "@styled-system/css";
import { Breadcrumbs, BreadcrumbSegment } from "./breadcrumb";

type Props = {
  relatedItems: { items: RelatedItem[]; title: string }[];
  title: string;
  children: React.ReactNode;
  breadcrumbSegments?: BreadcrumbSegment[];
};

export const ContainerSimulator = ({
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
        className={fr.cx("fr-mb-2v")}
      />
      <div className={fr.cx("fr-col-12")}>
        <h1 className={fr.cx("fr-mb-6w")}>{title}</h1>
        <div className={`${fr.cx("fr-mb-3w")} ${line}`} />
        {children}
      </div>
      <div className={`${fr.cx("fr-m-0")} ${line}`} />
      {relatedItems.length > 0 && (
        <div
          className={fr.cx("fr-grid-row", "fr-col-12", "fr-mt-12v", "fr-mb-2v")}
        >
          <div className={fr.cx("fr-col-12", "fr-col-md-8")}>
            <RelatedItems relatedItems={relatedItems} />
          </div>
        </div>
      )}
      <div className={fr.cx("fr-col-12", "fr-col-md-7", "fr-mb-12w")}>
        <Feedback />
      </div>
    </div>
  );
};

const printOnlySpace = css({
  "@media print": {
    marginTop: "30px!",
  },
});

const line = css({
  height: "1px",
  padding: "0",
  width: "100%",
  backgroundColor: "var(--border-default-blue-cumulus)",
});
