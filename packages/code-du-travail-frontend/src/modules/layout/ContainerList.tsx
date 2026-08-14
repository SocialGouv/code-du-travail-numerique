import { fr } from "@codegouvfr/react-dsfr";
import { Breadcrumbs, BreadcrumbSegment } from "./breadcrumb";

type Props = {
  title: string;
  children: React.ReactNode;
  breadcrumbSegments?: BreadcrumbSegment[];
};

export const ContainerList = ({
  children,
  title,
  breadcrumbSegments = [],
}: Props) => {
  return (
    <div className={fr.cx("fr-grid-row")}>
      <Breadcrumbs
        currentPageLabel={title}
        segments={breadcrumbSegments}
        className={fr.cx("fr-mb-2v")}
      />
      <div className={fr.cx("fr-col-12", "fr-mb-4w", "fr-mb-md-12w")}>
        {children}
      </div>
    </div>
  );
};
