import { HomeTileItem } from "../../api";
import { HomeTile } from "./HomeTile";
import { HomeWrapper } from "./HomeWrapper";

type Props = {
  title: string;
  subtitle: string;
  items: HomeTileItem[];
  buttonLink: string;
  buttonText: string;
  onButtonClick: () => void;
};

export const HomeSectionTile = (props: Props) => (
  <HomeWrapper
    isTint
    hasButton
    buttonLink={props.buttonLink}
    buttonText={props.buttonText}
    onButtonClick={props.onButtonClick}
    title={props.title}
    subtitle={props.subtitle}
  >
    {props.items.map((item, index) => (
      <HomeTile
        key={`${index}${JSON.stringify(item)}`}
        title={item.title}
        description={item.description}
        link={item.link}
        iconName={item.iconName}
        iconFolder="tools"
      />
    ))}
  </HomeWrapper>
);
