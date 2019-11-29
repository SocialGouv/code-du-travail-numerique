import React from "react";
import { Heading } from "@socialgouv/react-ui";

const Explainer = () => {
  return (
    <>
      <Heading>Qu’est-ce qu’une convention collective ?</Heading>
      <p>
        Une convention collective est un accord négocié entre des organisations
        syndicales de salariés et des organisations d’employeurs.
        <br />
        Elle permet d’aménager les règles issues du code du travail concernant
        les conditions d’emploi, la formation professionnelle, le travail des
        salariés et les garanties sociales aux spécificités des secteurs
        d’activité et géographiques concernés. Elle peut également prévoir
        d’autres mesures qui ne sont pas prévues par le code du travail.
      </p>
      <Heading>
        Une convention collective de branche s’applique-t-elle à ma situation ?
      </Heading>
      <p>
        Pour pouvoir s’appliquer à vous, la convention collective de branche
        doit être applicable à votre entreprise.
        <br />
        L’employeur a l’obligation d’appliquer la convention collective lorsque
        l’entreprise entre dans le champ d’application professionnel et
        géographie défini par la convention et que :
      </p>
      <ul>
        <li>
          La convention collective de branche a été étendue par le ministère du
          travail.
        </li>
        <li>
          L’entreprise est adhérente à une organisation patronale signataire de
          la convention collective.
        </li>
      </ul>
    </>
  );
};

export { Explainer };
