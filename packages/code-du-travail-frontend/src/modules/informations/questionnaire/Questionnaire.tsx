import { useContext, useEffect, useState } from "react";
import { DossierLicenciementContext } from "src/questionnaire";
import { useStore } from "src/questionnaire/store";
import { PreviousResponse } from "src/questionnaire/type";
import { Summary } from "./summary";
import { fr } from "@codegouvfr/react-dsfr";
import Image from "next/image";
import AgreementSearch from "../../convention-collective/AgreementSearch.svg";
import { css } from "@styled-system/css";

type QuestionnaireProps = {
  slug: string;
  title: string;
  className?: string;
};

export const Questionnaire = ({
  slug,
  title,
  className,
}: QuestionnaireProps) => {
  const store = useContext(DossierLicenciementContext);
  const init = useStore(store, (state) => state.init);
  const getSlugResponses = useStore(store, (state) => state.getSlugResponses);
  init();

  return (
    <div
      id="situation"
      className={`${fr.cx("fr-px-md-3w", "fr-px-1w", "fr-pt-4w", "fr-pb-11v")} ${block} ${className ?? ""}`}
    >
      <div className={fr.cx("fr-grid-row", "fr-mb-4w")}>
        <Image
          priority
          src={AgreementSearch}
          alt=""
          className={fr.cx("fr-unhidden-md", "fr-hidden")}
        />
        <h2 className={fr.cx("fr-h3", "fr-mt-1w", "fr-mb-1w", "fr-ml-1v")}>
          {title}
        </h2>
      </div>
      <div>
        <Summary responses={getSlugResponses(slug) ?? []} />
      </div>
    </div>
  );
};

const block = css({
  background: "var(--background-alt-blue-cumulus) !important",
});
