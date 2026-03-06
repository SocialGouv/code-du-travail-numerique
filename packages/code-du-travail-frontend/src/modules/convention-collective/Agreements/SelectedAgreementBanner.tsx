"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import Link from "src/modules/common/Link";
import { useAgreementStorageSync } from "../AgreementSelectionModal/useAgreementStorageSync";

export const SelectedAgreementBanner = () => {
  const { agreement } = useAgreementStorageSync();

  if (!agreement?.slug) return null;

  const ccRoute = getRouteBySource(SOURCES.CCN);

  return (
    <div className={`${fr.cx("fr-mb-4w")} ${container}`}>
      <span className={`${fr.cx("ri-arrow-right-line")} ${arrowIcon}`} />
      <span>
        <Link href={`/${ccRoute}/${agreement.slug}`}>
          {agreement.shortTitle}
        </Link>
      </span>
    </div>
  );
};

const container = css({
  display: "flex",
  columnGap: ".5rem",
  alignItems: "baseline",
});

const arrowIcon = css({
  color: "var(--artwork-minor-blue-cumulus)",
});
