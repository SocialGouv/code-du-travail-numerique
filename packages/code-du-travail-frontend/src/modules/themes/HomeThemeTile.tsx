import Image from "next/image";
import Link from "../common/Link";

type Props = {
  title: string;
  iconName: string;
  link: string;
};

export const HomeThemeTile = (props: Props) => (
  <div className="fr-tile fr-enlarge-link fr-tile--no-icon fr-tile--sm">
    <p className="fr-tile__title">
      <Link href={props.link}>{props.title}</Link>
    </p>

    <div className="fr-tile__img">
      <Image
        src={`/static/assets/icons/themes/${props.iconName}.svg`}
        alt=""
        width={56}
        height={56}
      />
    </div>
  </div>
);
