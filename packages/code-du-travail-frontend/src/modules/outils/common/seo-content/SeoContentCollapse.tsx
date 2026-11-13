"use client";

import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import { css } from "@styled-system/css";
import { ReactNode, useEffect, useId, useState } from "react";

// Matches the DSFR "md" breakpoint (768px).
const MOBILE_QUERY = "(max-width: 767.98px)";

type Props = {
  children: ReactNode;
};

// On mobile, the editorial text is longer than the simulator step itself:
// collapse it behind a "Lire la suite" button. The server always renders the
// full text (crawlers and no-JS users get everything); the collapse is only
// applied client-side, below the fold, so it causes no visible layout shift.
export const SeoContentCollapse = ({ children }: Props) => {
  const contentId = useId();
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const isCollapsed = isMobile && !isExpanded;

  return (
    <>
      <div
        id={contentId}
        className={isCollapsed ? collapsed : undefined}
        inert={isCollapsed}
        data-testid="tool-seo-content-body"
      >
        {children}
      </div>
      {isMobile && (
        <Button
          priority="tertiary no outline"
          size="small"
          iconId={isExpanded ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"}
          iconPosition="right"
          className={fr.cx("fr-mt-2v")}
          onClick={() => setIsExpanded((value) => !value)}
          nativeButtonProps={{
            "aria-expanded": isExpanded,
            "aria-controls": contentId,
          }}
        >
          {isExpanded ? "Réduire" : "Lire la suite"}
        </Button>
      )}
    </>
  );
};

const collapsed = css({
  position: "relative",
  maxHeight: "9rem",
  overflow: "hidden",
  _after: {
    content: '""',
    position: "absolute",
    insetInline: 0,
    bottom: 0,
    height: "4rem",
    background:
      "linear-gradient(to bottom, transparent, var(--background-default-grey))",
  },
});
