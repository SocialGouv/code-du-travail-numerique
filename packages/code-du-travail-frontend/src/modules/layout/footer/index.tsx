import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import React from "react";
import { BrandTop } from "../BrandTop";
import { NeedMoreInfo } from "./infos";
import { FooterTop } from "./FooterTop";
import { FooterContent } from "./FooterContent";
import { FooterBottom } from "./FooterBottom";

export const Footer = () => {
  return (
    <footer className={footerStyle}>
      <NeedMoreInfo />
      <div className={fr.cx("fr-footer")}>
        <FooterTop />
        <div className={fr.cx("fr-container")}>
          <div className={fr.cx("fr-footer__body")}>
            <div className={fr.cx("fr-footer__brand", "fr-enlarge-link")}>
              <div className={fr.cx("fr-logo")}>
                <BrandTop />
              </div>
            </div>
            <FooterContent />
          </div>
          <FooterBottom />
        </div>
      </div>
    </footer>
  );
};

const footerStyle = css({
  "@media print": {
    display: "none",
  },
});
