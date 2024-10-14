import { fr } from "@codegouvfr/react-dsfr";
import { Breadcrumb, BreadcrumbProps } from "@codegouvfr/react-dsfr/Breadcrumb";
import { useBreakpointsValuesPx } from "@codegouvfr/react-dsfr/useBreakpointsValuesPx";
import { useWindowInnerSize } from "@codegouvfr/react-dsfr/tools/useWindowInnerSize";

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
  const { breakpointsValues } = useBreakpointsValuesPx();
  const { windowInnerWidth } = useWindowInnerSize();
  const isMobile = windowInnerWidth < breakpointsValues.md;
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
      <div>
        {children}
        <div
          className={fr.cx(isMobile ? "fr-col-12" : "fr-col-7", "fr-my-12v")}
        >
          <Feedback />
        </div>
      </div>
      <div className={fr.cx(isMobile ? "fr-col-12" : "fr-col-8")}>
        <RelatedItems relatedItems={relatedItems} />
      </div>
      <div className={fr.cx(isMobile ? "fr-col-12" : "fr-col-4", "fr-mb-12v")}>
        <Share title={title} metaDescription={description} />
      </div>
    </div>
  );
};
