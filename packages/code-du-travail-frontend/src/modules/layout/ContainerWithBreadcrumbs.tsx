import { fr } from "@codegouvfr/react-dsfr";
import Breadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";
import { Breadcrumb as BreadcrumbType } from "@socialgouv/cdtn-types";

type Props = {
  children: React.ReactNode;
  currentPage: string;
  breacrumbs: BreadcrumbType[];
};

export const ContainerWithBreadcrumbs = ({
  children,
  currentPage,
  breacrumbs,
}: Props) => {
  return (
    <div>
      <Breadcrumb
        currentPageLabel={currentPage}
        homeLinkProps={{
          href: "/",
        }}
        segments={breacrumbs.map(({ label, slug }) => ({
          label: <>{label}</>,
          linkProps: { href: slug },
        }))}
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
