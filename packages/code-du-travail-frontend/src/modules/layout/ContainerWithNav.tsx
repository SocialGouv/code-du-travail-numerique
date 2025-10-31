import { fr } from "@codegouvfr/react-dsfr";
import { Breadcrumb, BreadcrumbProps } from "@codegouvfr/react-dsfr/Breadcrumb";
import { ReactNode, useEffect, useState } from "react";
import { SummaryNavigation } from "./SummaryNavigation";
import { css } from "@styled-system/css";
import { useBreakpoints } from "../common/useBreakpoints";

type SidebarSection = {
  id: string;
  label: string;
};

type Props = {
  title: string;
  description?: string;
  children: ReactNode;
  sidebarSections: SidebarSection[];
  breadcrumbSegments: BreadcrumbProps["segments"];
};

export const ContainerWithNav = ({
  children,
  title,
  description,
  sidebarSections = [],
  breadcrumbSegments = [],
}: Props) => {
  const { isBelow } = useBreakpoints();
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    setIsMobileOrTablet(isBelow("lg"));
  }, [isBelow]);

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
          <div
            className={`${fr.cx("fr-col-12", "fr-col-lg-9", "fr-col-offset-lg-3")} ${relativeContainerStyles}`}
          >
            <h1 id="main-content" className={fr.cx("fr-mt-0", "fr-mb-3w")}>
              {title}
            </h1>

            {description && (
              <p className={fr.cx("fr-text--lead", "fr-mb-3w")}>
                {description}
              </p>
            )}

            {isMobileOrTablet && (
              <div id="summary-navigation" className={fr.cx("fr-mb-3w")}>
                <SummaryNavigation sections={sidebarSections} />
              </div>
            )}

            {!isMobileOrTablet && (
              <div id="summary-navigation" className={absoluteContainerStyles}>
                <div className={stickySidebarStyles}>
                  <SummaryNavigation sections={sidebarSections} />
                </div>
              </div>
            )}

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const relativeContainerStyles = css({
  position: "relative",
});

const absoluteContainerStyles = css({
  position: "absolute",
  height: "100%",
  width: "300px",
  left: "-330px",
});

const stickySidebarStyles = css({
  position: "sticky",
  top: "4rem",
  maxHeight: "calc(100vh - 4rem)",
  overflowY: "auto",
});
