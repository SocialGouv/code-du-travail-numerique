import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";

type Props = {
  onClickNo: () => void;
  onClickYes: () => void;
};

export const FeedbackDefault = (props: Props) => {
  return (
    <>
      <h2 className={fr.cx("fr-h5", "fr-mb-0")}>
        Avez-vous trouvé la réponse à votre question ?
      </h2>
      <div className={fr.cx("fr-ml-3w")}>
        <Button
          type="button"
          priority="secondary"
          className={fr.cx("fr-mr-3w")}
          onClick={props.onClickNo}
        >
          Non
        </Button>
        <Button type="button" priority="secondary" onClick={props.onClickYes}>
          Oui
        </Button>
      </div>
    </>
  );
};
