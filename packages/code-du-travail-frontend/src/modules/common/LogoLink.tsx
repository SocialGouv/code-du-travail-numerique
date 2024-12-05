"use client";
import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import Link from "next/link";

export const LogoLink = () => {
  return (
    <>
      <Link
        title="Code du travail numérique, Ministère du Travail"
        href="/"
        target="_blank"
        className={noTarget}
      >
        <img
          className={fr.cx("fr-responsive-img")}
          src="/static/assets/img/logo.svg"
          alt="Code du travail numérique"
          data-fr-js-ratio="true"
        />
      </Link>
    </>
  );
};

const noTarget = css({
  _after: {
    display: "none !important",
  },
});
