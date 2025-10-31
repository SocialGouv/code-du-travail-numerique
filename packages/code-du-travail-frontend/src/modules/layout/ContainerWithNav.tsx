import { fr } from "@codegouvfr/react-dsfr";
import { Breadcrumb, BreadcrumbProps } from "@codegouvfr/react-dsfr/Breadcrumb";
import { ReactNode } from "react";
import { SummaryNavigation } from "./SummaryNavigation";
import { css } from "@styled-system/css";

type SidebarSection = {
  id: string;
  label: string;
};

type Props = {
  title: string;
  description?: string;
  children: ReactNode;
  sidebarSections?: SidebarSection[];
  breadcrumbSegments?: BreadcrumbProps["segments"];
};

export const ContainerWithNav = ({
  children,
  title,
  description,
  sidebarSections = [],
  breadcrumbSegments = [],
}: Props) => {
  return (
    <div className={fr.cx("fr-grid-row")}>
      <Breadcrumb
        currentPageLabel={title}
        homeLinkProps={{
          href: "/",
        }}
        segments={breadcrumbSegments}
        className={fr.cx("fr-mb-2v")}
      />

      <div className={fr.cx("fr-col-12", "fr-mb-4w", "fr-mb-md-12w")}>
        <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
          {sidebarSections.length > 0 && (
            <div className={fr.cx("fr-col-12", "fr-col-md-3", "fr-mb-4w")}>
              <div className={stickySidebarStyles}>
                <SummaryNavigation sections={sidebarSections} />
              </div>
            </div>
          )}

          <div
            className={fr.cx(
              "fr-col-12",
              sidebarSections.length > 0 ? "fr-col-md-9" : "fr-col-md-12",
              "fr-mb-4w",
              "fr-mb-md-12w"
            )}
          >
            <h1 id="main-content" className={fr.cx("fr-mt-0", "fr-mb-4w")}>
              {title}
            </h1>

            {description && (
              <p className={fr.cx("fr-text--lead", "fr-mb-6w")}>
                {description}
              </p>
            )}

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const stickySidebarStyles = css({
  position: "sticky",
  top: "4rem",
  maxHeight: "calc(100vh - 4rem)",
  overflowY: "auto",
});
