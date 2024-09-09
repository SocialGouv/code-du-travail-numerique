import { fr } from "@codegouvfr/react-dsfr";
import { RelatedItems } from "../common/RelatedItems";
import { Share } from "../common/Share";

export const Container2Columns = ({
  children,
  relatedItems,
  title,
  description,
}) => {
  return (
    <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters", "fr-my-4w", "fr-my-md-12w")}>
      <div className={fr.cx("fr-col-12", "fr-col-md-7")}>
        {children}
        {/*<Feedback url={router.asPath} />*/}
      </div>

      <div className={fr.cx("fr-col-12", "fr-col-offset-md-1", "fr-col-md-4")}>
        <RelatedItems items={relatedItems} />
        <Share title={title} metaDescription={description} />
      </div>
    </div>
  );
};
