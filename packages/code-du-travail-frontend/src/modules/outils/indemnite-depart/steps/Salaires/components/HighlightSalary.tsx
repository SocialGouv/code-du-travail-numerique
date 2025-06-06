import { fr } from "@codegouvfr/react-dsfr";
import React from "react";

const HighlightSalary = ({
  agreementNumber,
  salaireTempsPleinMessage,
}: {
  agreementNumber?: number;
  salaireTempsPleinMessage?: string;
}): JSX.Element | undefined => {
  if (agreementNumber === 3239) return undefined;
  return (
    <div className={fr.cx("fr-highlight", "fr-mb-2w")}>
      {salaireTempsPleinMessage && <p>{salaireTempsPleinMessage}</p>}
      <p>
        Prendre en compte le salaire fixe et variable (ex : commissions), les
        primes et avantages en nature. <br />
        Les éléments de rémunération suivants sont <strong>à exclure</strong> :
      </p>
      <ul>
        <li>
          <strong>Les remboursements de frais professionnels</strong> (exemple :
          frais de repas, frais d’utilisation d’un véhicule personnel à des fins
          professionnelles, frais de transport, frais de logement).
        </li>
        <li>
          <strong>L’indemnité compensatrice de congés payés</strong> : somme
          versée par l’employeur en contrepartie des jours de congés payés
          acquis mais non pris par le salarié.
        </li>
        <li>
          <strong>L’indemnité compensatrice de préavis</strong> : si l’employeur
          décide lui seul de dispenser le salarié d’exécuter un préavis
          obligatoire.
        </li>
        {agreementNumber === 176 && (
          <li>
            Les primes d&apos;insalubrité, de travaux salissants, de danger, de
            froid et de pénibilité.
          </li>
        )}
        <li>
          <strong>
            Une prime ou gratification librement versée par l’employeur
          </strong>{" "}
          à une catégorie de salariés et/ou à l’occasion d’un évènement unique
          (exemple : prime de partage de la valeur).
        </li>
        <li>
          <strong>La participation aux résultats de l’entreprise</strong>{" "}
          (exemple : prime d’intéressement, prime de participation).
        </li>
      </ul>
    </div>
  );
};

export default HighlightSalary;
