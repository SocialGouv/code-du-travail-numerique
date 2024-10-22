import { fr } from "@codegouvfr/react-dsfr";

export const FeedbackAdblock = () => {
  return (
    <>
      <h2 className={fr.cx("fr-h5")}>
        Nous n&apos;avons pas pu envoyer votre réponse
      </h2>
      <p>
        Pour soumettre votre avis, merci de désactiver temporairement votre
        bloqueur de publicité et recharger la page.
      </p>
    </>
  );
};
