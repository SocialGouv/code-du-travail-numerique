import React from "react";

const IntroductionStep = (): JSX.Element => (
  <>
    <p>
      Ce simulateur est un outil qui permet de calculer la durée de préavis à
      respecter en cas de départ ou de mise à la retraite, telle qu&apos;elle
      est prévue par la loi et la convention collective applicable.
    </p>
    <p>
      En effet, en cas de départ ou de mise à la retraite, le salarié ne peut
      pas quitter l’entreprise immédiatement. Il doit y rester durant une
      certaine période, qu’on appelle préavis ou parfois délai congé.
    </p>
    <p>
      Afin de réaliser cette simulation, vous aurez besoin d’informations
      concernant la situation du salarié, comme sa convention collective, sa
      catégorie ou son coefficient. La plupart de ces informations se trouvent
      sur le bulletin de salaire ou le contrat de travail. Prévoyez environ 5
      minutes pour cette simulation.
    </p>
    <p>Cliquez sur commencer pour démarrer la simulation.</p>
  </>
);

export { IntroductionStep };
