"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { HomePageProps } from "./queries";
import { Search } from "./Search";
import { Highlights } from "./Highlights";
import { Tools } from "./Tools";
import { Models } from "./Models";
import { Contributions } from "./Contributions";
import { Agreements } from "./Agreements";
import { Themes } from "./Themes";

export const Home = (props: HomePageProps) => {
  return (
    <div className={fr.cx("fr-grid-row")}>
      <div className={fr.cx("fr-col-12")}>
        <Search />
        <Highlights items={props.highlights} />
        <Tools items={props.tools} />
        <Models items={props.modeles} />
        <Contributions items={props.contributions} />
        <Agreements items={props.agreements} />
        <Themes items={props.themes} />
      </div>
    </div>
  );
};
