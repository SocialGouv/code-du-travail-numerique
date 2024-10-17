import { HomeCardItem } from "./queries";
import { HomeCard } from "./HomeCard";
import { HomeWrapper } from "./HomeWrapper";
import { HomeButton } from "./HomeButton";

type Props = {
  sectionId: string;
  isTint?: boolean;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  items: HomeCardItem[];
  isSmallCard?: boolean;
  buttonLink: string;
  buttonText: string;
  onButtonClick: () => void;
};

export const HomeSectionCardWithButton = (props: Props) => (
  <HomeWrapper
    sectionId={props.sectionId}
    isTint={props.isTint}
    title={props.title}
    subtitle={props.subtitle}
    footerNode={
      <HomeButton
        buttonLink={props.buttonLink}
        buttonText={props.buttonText}
        onButtonClick={props.onButtonClick}
      />
    }
  >
    {props.items.map((item, index) => (
      <HomeCard
        key={`${index}${JSON.stringify(item)}`}
        isSmall={props.isSmallCard}
        title={item.title}
        description={item.description}
        link={item.link}
        theme={item.theme}
      />
    ))}
  </HomeWrapper>
);
