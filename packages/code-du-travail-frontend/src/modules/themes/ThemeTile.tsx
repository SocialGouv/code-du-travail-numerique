import Image from "next/image";

type Props = {
  title: string;
  iconName: string;
  link: string;
};

export const ThemeTile = (props: Props) => (
  <div className="fr-tile fr-enlarge-link fr-tile--vertical fr-tile--no-icon fr-tile--sm">
    <div className="fr-tile__body">
      <div className="fr-tile__content">
        <p className="fr-tile__title">
          <a href={props.link}>{props.title}</a>
        </p>
      </div>
    </div>
    <div className="fr-tile__header">
      <div className="fr-tile__img fr-mb-0">
        <Image
          src={`/static/assets/icons/themes/${props.iconName}.svg`}
          alt=""
          width={56}
          height={56}
        ></Image>
      </div>
    </div>
  </div>
);
