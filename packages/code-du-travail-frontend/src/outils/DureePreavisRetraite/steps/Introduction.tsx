import React from "react";

const IntroductionStep = (): JSX.Element => (
  <>
    <p>
      Ce simulateur vous permet de calculer la durée de préavis à respecter en
      cas de départ ou de mise à la retraite, telle qu’elle est prévue par la
      loi et la convention collective applicable.
    </p>
    <p>
      En cas de départ ou de mise à la retraite, le salarié ne peut pas quitter
      l’entreprise immédiatement. Il doit y rester durant une certaine période
      (appelée préavis ou parfois délai congé).
    </p>
    <p>
      Vous aurez besoin d’informations concernant la situation du salarié, comme
      sa convention collective, sa catégorie ou son coefficient. La plupart de
      ces informations se trouvent sur le bulletin de salaire ou le contrat de
      travail.
    </p>
  </>
);

export { IntroductionStep };
