import { fr } from "@codegouvfr/react-dsfr";
import { Breadcrumb, BreadcrumbProps } from "@codegouvfr/react-dsfr/Breadcrumb";

import { RelatedItems } from "../common/RelatedItems";
import { RelatedItem } from "../documents";
import { Feedback } from "./feedback";
import { css } from "@styled-system/css";
import { BreadcrumbListJsonLd } from "../seo/jsonld";

type Props = {
  relatedItems: { items: RelatedItem[]; title: string }[];
  title: string;
  children: React.ReactNode;
} & Pick<BreadcrumbProps, "segments">;

export const ContainerSimulator = ({
  children,
  relatedItems,
  title,
  segments = [],
}: Props) => {
  return (
    <div className={`${fr.cx("fr-grid-row")} ${printOnlySpace}`}>
      <BreadcrumbListJsonLd
        currentPageLabel={title}
        items={segments.map((segment) => ({
          label: String(segment.label),
          href:
            typeof segment.linkProps.href === "string"
              ? segment.linkProps.href
              : (segment.linkProps.href.pathname ?? "/"),
        }))}
      />
      <Breadcrumb
        currentPageLabel={title}
        homeLinkProps={{
          href: "/",
        }}
        segments={segments}
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
