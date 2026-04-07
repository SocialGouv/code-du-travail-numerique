import { NewsSummary } from "../type";
import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import DisplayContent from "../../common/DisplayContent";
import { formatDateAsFrenchText } from "../../utils";

type Props = NewsSummary;

export const NewsItem = ({ date, title, content, slug }: Props) => {
  return (
    <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters", "fr-mb-3w")}>
      <div
        className={fr.cx(
          "fr-col-md-2",
          "fr-col-12",
          "fr-mt-2v",
          "fr-grid-row",
          "fr-grid-row--right",
          "fr-grid-row--top"
        )}
      >
        <p className={fr.cx("fr-text--lg", "fr-mb-1v")}>
          {formatDateAsFrenchText(date)}
        </p>
      </div>
      <div className={fr.cx("fr-col-md-10", "fr-col-12")}>
        <h2 className={fr.cx("fr-mb-0")}>{title}</h2>
      </div>
      <div className={fr.cx("fr-col-md-10", "fr-col-offset-md-2", "fr-col-12")}>
        <DisplayContent content={content} titleLevel={3} />

        <Button
          title={`Lire l'actualité ${title}`}
          priority="secondary"
          iconId={"fr-icon-arrow-right-line"}
          iconPosition="right"
          linkProps={{
            href: `/actualite/${slug}`,
          }}
        >
          Lire l&apos;actualité
        </Button>
      </div>
    </div>
  );
};
