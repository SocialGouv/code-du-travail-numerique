import { fr } from "@codegouvfr/react-dsfr";
import { useEffect, useState } from "react";

export const FeedbackAnswered = () => {
  const [titleRef, setTitleRef] = useState<HTMLHeadingElement | null>();
  useEffect(() => {
    titleRef?.focus();
  }, [titleRef]);
  return (
    <>
      <h2 className={fr.cx("fr-h5")} tabIndex={-1} ref={setTitleRef}>
        Merci pour votre réponse.
      </h2>
      <p>
        L’équipe du Code du travail numérique vous remercie pour votre réponse.
      </p>
    </>
  );
};
