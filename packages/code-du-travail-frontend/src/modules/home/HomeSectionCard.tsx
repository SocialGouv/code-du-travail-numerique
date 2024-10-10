import { HomeCard, HomeCardProps } from "./HomeCard";
import { HomeWrapper, HomeWrapperProps } from "./HomeWrapper";

type Props = HomeWrapperProps & {
  items: HomeCardProps[];
  isSmallCard?: boolean;
};

export const HomeSectionCard = (props: Props) => (
  <>
    {props.hasButton ? (
      <HomeWrapper
        isTint={props.isTint}
        hasButton={true}
        buttonLink={props.buttonLink}
        buttonText={props.buttonText}
        onButtonClick={props.onButtonClick}
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
    ) : (
      <HomeWrapper
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
    )}
  </>
);
