import { fr } from "@codegouvfr/react-dsfr";
import { Breadcrumb, BreadcrumbProps } from "@codegouvfr/react-dsfr/Breadcrumb";

type Props = {
  title: string;
  children: React.ReactNode;
} & Partial<Pick<BreadcrumbProps, "segments">>;

export const ContainerList = ({ children, title, segments = [] }: Props) => {
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
      <div className={fr.cx("fr-col-12", "fr-mb-4w", "fr-mb-md-12w")}>
        {children}
      </div>
    </div>
  );
};
