import Image from "next/image";
import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";

type Props = {
  title: string;
  iconName: string;
  link: string;
  detail: string;
};

export const ThemeTile = ({ title, iconName, link, detail }: Props) => (
  <div className={`${fr.cx("fr-tile", "fr-enlarge-link")}`}>
    <p className={fr.cx("fr-tile__title")}>
      <a href={link}>{title}</a>
    </p>
    <p className={`${fr.cx("fr-tile__detail")} ${centerDetail}`}>{detail}</p>
    <div className={fr.cx("fr-tile__img")}>
      <Image
        src={`/static/assets/icons/themes/${iconName}.svg`}
        alt=""
        width={80}
        height={80}
      ></Image>
    </div>
  </div>
);

const centerDetail = css({
  justifyContent: "center",
});
