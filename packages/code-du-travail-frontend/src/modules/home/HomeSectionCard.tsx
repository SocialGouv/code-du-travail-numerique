import { HomeCardItem } from "./queries";
import { HomeCard } from "./HomeCard";
import { HomeWrapper } from "./HomeWrapper";

type Props = {
  sectionId: string;
  isTint?: boolean;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  items: HomeCardItem[];
  isSmallCard?: boolean;
};

export const HomeSectionCard = (props: Props) => (
  <HomeWrapper
    sectionId={props.sectionId}
    isTint={props.isTint}
    title={props.title}
    subtitle={props.subtitle}
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
