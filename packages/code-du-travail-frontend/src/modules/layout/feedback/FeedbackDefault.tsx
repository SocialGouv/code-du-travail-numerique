import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";

type Props = {
  onClickNo: () => void;
  onClickYes: () => void;
};

export const FeedbackDefault = (props: Props) => {
  return (
    <div className="fr-grid-row">
      <div className="fr-col-12 fr-col-md">
        <h2 className={fr.cx("fr-h5", "fr-mb-md-0")} id="feedback-title">
          Avez-vous trouvé la réponse à votre question ?
        </h2>
      </div>
      <div>
        <Button
          type="button"
          priority="secondary"
          className={fr.cx("fr-mr-2w")}
          onClick={props.onClickNo}
          aria-describedby="feedback-title"
        >
          Non
        </Button>
        <Button
          type="button"
          priority="secondary"
          onClick={props.onClickYes}
          aria-describedby="feedback-title"
        >
          Oui
        </Button>
      </div>
    </div>
  );
};
