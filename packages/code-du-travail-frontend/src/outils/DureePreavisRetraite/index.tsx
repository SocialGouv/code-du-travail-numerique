import React, { useRef } from "react";
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
}: Props): JSX.Element => {
  const store = useRef(createPreavisRetraiteStore(title, slug)).current;
  return (
    <PreavisRetraiteProvider value={store}>
      <PreavisRetraiteSimulator
        icon={icon}
        title={title}
        displayTitle={displayTitle}
      />
    </PreavisRetraiteProvider>
  );
};

export { DureePreavisRetraite };
