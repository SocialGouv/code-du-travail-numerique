import React from "react";
import { createPreavisRetraiteStore, PreavisRetraiteProvider } from "./state";
import { PreavisRetraiteSimulator } from "./Components";

interface Props {
  icon: string;
  title: string;
  displayTitle: string;
  slug: string;
}

const DureePreavisRetraite = ({
  icon,
  title,
  displayTitle,
  slug,
}: Props): JSX.Element => (
  <PreavisRetraiteProvider
    createStore={() => createPreavisRetraiteStore(title, slug)}
  >
    <PreavisRetraiteSimulator
      icon={icon}
      title={title}
      displayTitle={displayTitle}
    />
  </PreavisRetraiteProvider>
);

export { DureePreavisRetraite };
