"use client";

import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { Introduction, Origins, Hierarchy } from "./index";
import { Container } from "../layout/Container";
import { Breadcrumbs } from "../layout/breadcrumb";

export const DroitDuTravailWrapper = () => {
  return (
    <>
      <div className={fr.cx("fr-container")}>
        <Breadcrumbs
          currentPageLabel="Le droit du travail"
          className={fr.cx("fr-mb-2w", "fr-mt-2w")}
        />
      </div>
      <div className={fr.cx("fr-container")}>
        <Container isNormalMd>
          <Introduction />
        </Container>
      </div>

      <Origins />

      <div className={fr.cx("fr-container")}>
        <Container isNormalMd>
          <Hierarchy />
        </Container>
      </div>
    </>
  );
};

export default DroitDuTravailWrapper;
