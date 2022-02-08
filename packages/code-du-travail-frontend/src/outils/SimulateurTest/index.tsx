import React from "react";

import { Wizard } from "./common/wizard/Wizard";
import * as Steps from "./steps";
import { useLocalStore } from "./store";

interface Props {
  icon: string;
  title: string;
}

const SimulateurTest = ({ icon, title }: Props): JSX.Element => {
  const localState = useLocalStore((state) => state);

  return (
    //FIXME: on devrait plutôt renommer ce composant layout, le but étant de le rendre compatible avec le reste du code
    <Wizard
      icon={icon}
      title={title}
      duration="1 à 2 min"
      step={localState.step}
      onPrev={localState.onPrev} // ça évite d'avoir de la logique de traitement dans l'ui
      onNext={localState.onNext}
      items={[
        { label: "Introduction", name: "Introduction" },
        { label: "Information", name: "information" },
        { label: "Resultat", name: "Resultat" },
      ]}
    >
      {/* TODO: LA IL FAUDRAIT METTRE DES ANIMATIONS POUR LE UNMOUNT DEMOUNT, IL FAUDRAIT LE METTRE DANS LE WIZARD */}
      {localState.step === 0 && <Steps.StepIntro />}
      {localState.step === 1 && <Steps.StepInformation />}
      {localState.step === 2 && <Steps.StepResult />}
    </Wizard>
  );
};

export { SimulateurTest };
