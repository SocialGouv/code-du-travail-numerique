import React from "react";
import { createPreavisRetraiteStore, PreavisRetraiteProvider } from "./state";
import { PreavisRetraiteSimulator } from "./Components";

interface Props {
  icon: string;
  title: string;
  publicodesRules: any;
}

const DureePreavisRetraite = ({
  icon,
  title,
  publicodesRules,
}: Props): JSX.Element => (
  <PreavisRetraiteProvider
    createStore={() => createPreavisRetraiteStore(publicodesRules, title)}
  >
    <PreavisRetraiteSimulator icon={icon} title={title} />
  </PreavisRetraiteProvider>
);

export { DureePreavisRetraite };
