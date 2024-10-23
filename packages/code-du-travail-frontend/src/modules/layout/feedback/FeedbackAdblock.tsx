import { fr } from "@codegouvfr/react-dsfr";

export const FeedbackAdblock = () => {
  return (
    <>
      <h2 className={fr.cx("fr-h5")}>Un adblock a été détecté.</h2>
      <p>
        Il n&apos;est pas possible de soumettre un feedback si un adblock est
        détecté. Merci de désactiver votre adblock et de recharger la page.
      </p>
    </>
  );
};
