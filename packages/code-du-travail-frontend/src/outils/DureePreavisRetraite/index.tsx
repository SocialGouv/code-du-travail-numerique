import React from "react";
import { createPreavisRetraiteStore, PreavisRetraiteProvider } from "./state";
import { PreavisRetraiteSimulator } from "./Components";

interface Props {
  icon: string;
  title: string;
  displayTitle: string;
  publicodesRules: any;
}

const DureePreavisRetraite = ({
  icon,
  title,
  displayTitle,
  publicodesRules,
}: Props): JSX.Element => (
  <PreavisRetraiteProvider
    createStore={() => createPreavisRetraiteStore(publicodesRules, title)}
  >
    <PreavisRetraiteSimulator
      icon={icon}
      title={title}
      displayTitle={displayTitle}
    />
  </PreavisRetraiteProvider>
);

export { DureePreavisRetraite };
