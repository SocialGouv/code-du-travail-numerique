import { fr } from "@codegouvfr/react-dsfr";
import { Breadcrumb, BreadcrumbProps } from "@codegouvfr/react-dsfr/Breadcrumb";
import { ReactNode } from "react";
import { SummaryNavigation } from "./SummaryNavigation";
import { css } from "@styled-system/css";
import { BreadcrumbListJsonLd } from "../seo/jsonld";

type SidebarSection = {
  id: string;
  label: string;
};

type Props = {
  title: string;
  description: string;
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
  return (
    <div className={fr.cx("fr-grid-row", "fr-mb-12w")}>
      <BreadcrumbListJsonLd
        currentPageLabel={title}
        items={breadcrumbSegments.map((segment) => ({
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
        segments={breadcrumbSegments}
        className={fr.cx("fr-mb-2v")}
      />

      <div className={fr.cx("fr-col-12")}>
        <div className={fr.cx("fr-mb-5w")}>
          <h1 id="main-content" className={fr.cx("fr-mt-0", "fr-mb-3w")}>
            {title}
          </h1>
          <p className={fr.cx("fr-text--lead", "fr-mb-3w")}>{description}</p>
        </div>

        <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
          <div className={fr.cx("fr-col-12", "fr-col-xl-3")}>
            <div className={stickySidebarStyles}>
              <SummaryNavigation sections={sidebarSections} />
            </div>
          </div>
          <div className={fr.cx("fr-col-12", "fr-col-xl-9")}>{children}</div>
        </div>
      </div>
    </div>
  );
};

const stickySidebarStyles = css({
  position: { xl: "sticky" },
  top: { xl: "64px" },
  maxHeight: { xl: "calc(100vh - 64px)" },
  overflowY: { xl: "auto" },
});
