import React from "react";

type Props = {
  title: string;
};

export default function ErrorPublicodes(props: Props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>
        Nous n&apos;avons pas pu calculer votre indemnité de licenciement, en
        raison d&apos;une erreur liée à notre moteur de calcul. Veuillez
        vérifier les informations saisies ou rafraîchir la page si le problème
        persiste.
      </p>
    </div>
  );
}
