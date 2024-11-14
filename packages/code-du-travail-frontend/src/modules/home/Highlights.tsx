import { fr } from "@codegouvfr/react-dsfr";
import { HomeCardItem } from "./queries";
import { HomeCard } from "./Components";

type Props = {
  items: HomeCardItem[];
};

export const Highlights = (props: Props) => (
  <div id={"home-highlights"}>
    <div className={fr.cx("fr-my-8w", "fr-container")}>
      <h2 className={fr.cx("fr-mb-3v")}>À la une</h2>
      <div
        className={fr.cx(
          "fr-grid-row",
          "fr-grid-row--gutters",
          "fr-grid-row--right"
        )}
      >
        {props.items.map((item, index) => (
          <div
            key={`${index}-highlight`}
            className={fr.cx("fr-col-12", "fr-col-md-6", "fr-col-lg-6")}
          >
            <HomeCard {...item} />
          </div>
        ))}
      </div>
    </div>
  </div>
);
