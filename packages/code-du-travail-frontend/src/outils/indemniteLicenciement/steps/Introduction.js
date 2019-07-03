import React from "react";
import { Container, Wrapper } from "@cdt/ui/";

const StepIntro = () => (
  <Container>
    <Wrapper>
      <p>
        Cet outil permet de calculer l’indemnité minimale de licenciement d’un
        salarié.
      </p>
      <p>
        Vous pourrez calculer simplement le montant de l’indemnité légale
        (définie par le Code du travail) et de l’indemnité conventionnelle (si
        votre branche d’activité prévoit un montant supérieur au Code du
        travail).
      </p>
      <p>
        Cette simulation nécessite entre 5 et 10 minutes pour être complétée.
        Afin de pouvoir remplir les renseignements demandés, munissez-vous des
        informations relatives à votre licenciement (dates d’entrée et de sortie
        de l’entreprise, courrier de licenciement, derniers bulletins de
        salaire, etc.).
      </p>
      <p>
        Pour en savoir plus sur l’indemnité de licenciement et son mode de
        calcul, consultez cet article (lien vers la fiche SP sur l’IDL). Pour
        commencer la simulation cliquez sur &quot;Suivant&quot;.
      </p>
    </Wrapper>
  </Container>
);

export { StepIntro };
