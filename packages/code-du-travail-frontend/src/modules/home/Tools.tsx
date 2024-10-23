import { HomeTileItem } from "./queries";
import { HomeButton, HomeTile, SectionContainer } from "./Components";
import { MatomoHomeEvent, useHomeTracking } from "./tracking";

type Props = {
  items: HomeTileItem[];
};

export const Tools = (props: Props) => {
  const { emitHomeClickButtonEvent } = useHomeTracking();
  return (
    <SectionContainer
      sectionId="home-outils"
      isTint
      title="Boîte à outils"
      subtitle="Trouvez des réponses personnalisées selon votre situation"
      footerNode={
        <HomeButton
          buttonLink="/outils"
          buttonText="Voir tous les outils"
          onButtonClick={() => {
            emitHomeClickButtonEvent(
              MatomoHomeEvent.CLICK_VOIR_TOUS_LES_OUTILS
            );
          }}
        />
      }
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
    </SectionContainer>
  );
};
