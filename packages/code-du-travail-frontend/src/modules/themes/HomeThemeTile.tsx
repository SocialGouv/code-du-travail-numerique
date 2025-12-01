import Link from "../common/Link";
import { css } from "@styled-system/css";
import { fr } from "@codegouvfr/react-dsfr";
import { ThemeIcon } from "../common";

type Props = {
  title: string;
  iconName: string;
  link: string;
};

export const HomeThemeTile = (props: Props) => (
  <div
    className={fr.cx(
      "fr-tile",
      "fr-enlarge-link",
      "fr-tile--no-icon",
      "fr-tile--sm"
    )}
  >
    <p className={fr.cx("fr-tile__title")}>
      <Link href={props.link}>{props.title}</Link>
    </p>

    <div className={`${fr.cx("fr-tile__img")} ${frTileImgSmall}`}>
      <ThemeIcon name={props.iconName} />
    </div>
  </div>
);

const frTileImgSmall = css({
  width: "56px !important",
  height: "56px !important",
});
