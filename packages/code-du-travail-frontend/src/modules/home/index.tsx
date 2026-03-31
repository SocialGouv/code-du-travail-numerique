"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { HomePageProps } from "./queries";
import { Search } from "./Search";
import { Tools } from "./Tools";
import { Models } from "./Models";
import { Contributions } from "./Contributions";
import { Agreements } from "./Agreements";
import { Themes } from "./Themes";
import { ComprendreLeDroitDuTravail } from "./ComprendreLeDroitDuTravail";
import { LaQuestionAction } from "./LaQuestionAction";
import { News } from "./News";

export const Home = (props: HomePageProps) => {
  return (
    <div className={fr.cx("fr-grid-row")}>
      <div className={fr.cx("fr-col-12")}>
        <Search />
        {props.news.length > 1 && <News items={props.news} />}
        <ComprendreLeDroitDuTravail />
        <LaQuestionAction />
        <Tools items={props.tools} />
        <Models items={props.modeles} />
        <Contributions items={props.contributions} />
        <Agreements items={props.agreements} />
        <Themes items={props.themes} />
      </div>
    </div>
  );
};
