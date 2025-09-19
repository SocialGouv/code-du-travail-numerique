import Image from "next/image";
import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import Link from "../common/Link";

type Props = {
  title: string;
  iconName: string;
  link: string;
  subThemes: string[];
};

export const ThemeTile = ({ title, iconName, link, subThemes }: Props) => (
  <div className={`${fr.cx("fr-tile", "fr-enlarge-link")}`}>
    <p className={fr.cx("fr-tile__title")}>
      <Link href={link}>{title}</Link>
    </p>
    <p className={`${fr.cx("fr-tile__detail", "fr-mb-4w")} ${centerDetail}`}>
      {subThemes.slice(0, 3).join(" • ")}
      {subThemes.length > 2 && <>&nbsp;&hellip;</>}
    </p>
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
