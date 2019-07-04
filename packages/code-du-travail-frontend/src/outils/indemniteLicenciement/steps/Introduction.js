import React from "react";
import { Container, Wrapper } from "@cdt/ui/";

const StepIntro = () => (
  <Container>
    <Wrapper>
      <p>
        Ce simulateur est un outil qui permet d’estimer le montant de
        l’indemnité minimale de licenciement d’un salarié.
      </p>
      <p>
        Vous pourrez simuler simplement le montant de l’indemnité légale définie
        par le Code du travail et le montant de l’indemnité conventionnelle de
        licenciement si votre branche d’activité prévoit un montant supérieur au
        Code du travail.
      </p>
      <p>
        Cette simulation nécessite entre 5 et 10 minutes. Afin de pouvoir
        remplir les renseignements demandés, munissez-vous des informations
        relatives à votre licenciement (dates d’entrée et de sortie de
        l’entreprise, courrier de licenciement, derniers bulletins de salaire,
        etc.).
      </p>
      <p>
        Pour en savoir plus sur l’indemnité de licenciement et son mode de
        calcul, consultez cet article (lien vers la fiche SP sur l’IDL).
      </p>
      <p>Pour commencer la simulation cliquez sur &quot;Suivant&quot;.</p>
    </Wrapper>
  </Container>
);

export { StepIntro };
