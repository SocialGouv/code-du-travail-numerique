import Image from "next/image";

type Props = {
  title: string;
  iconName: string;
  link: string;
};

export const ThemeTile = (props: Props) => (
  <div className="fr-tile fr-enlarge-link fr-tile--no-icon fr-tile--sm">
    <p className="fr-tile__title">
      <a href={props.link}>{props.title}</a>
    </p>

    <div className="fr-tile__img">
      <Image
        src={`/static/assets/icons/themes/${props.iconName}.svg`}
        alt=""
        width={56}
        height={56}
      ></Image>
    </div>
  </div>
);
