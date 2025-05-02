"use client";

import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import Breadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";
import { Introduction, Origins, Hierarchy } from "./index";
import { Container } from "../layout/Container";

export const DroitDuTravailWrapper = () => {
  return (
    <>
      <div className={fr.cx("fr-container")}>
        <Breadcrumb
          currentPageLabel={"Le droit du travail"}
          homeLinkProps={{
            href: "/",
          }}
          segments={[]}
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
