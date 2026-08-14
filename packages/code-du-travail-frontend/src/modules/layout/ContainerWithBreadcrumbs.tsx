import { fr } from "@codegouvfr/react-dsfr";
import { Breadcrumbs, BreadcrumbSegment } from "./breadcrumb";

type Props = {
  children: React.ReactNode;
  currentPage: string;
  breadcrumbSegments?: BreadcrumbSegment[];
};

export const ContainerWithBreadcrumbs = ({
  children,
  currentPage,
  breadcrumbSegments = [],
}: Props) => {
  return (
    <div>
      <Breadcrumbs
        currentPageLabel={currentPage}
        segments={breadcrumbSegments}
        className={fr.cx("fr-mb-2w", "fr-mt-2w")}
      />
      <div
        className={fr.cx(
          "fr-grid-row",
          "fr-grid-row--gutters",
          "fr-grid-row--center"
        )}
      >
        <div className={fr.cx("fr-col-12")}>{children}</div>
      </div>
    </div>
  );
};
