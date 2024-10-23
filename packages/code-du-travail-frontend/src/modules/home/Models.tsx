import { MatomoHomeEvent, useHomeTracking } from "./tracking";
import { HomeCardItem } from "./queries";
import { HomeButton, HomeCard, SectionContainer } from "./Components";

type Props = {
  items: HomeCardItem[];
};

export const Models = ({ items }: Props) => {
  const { emitHomeClickButtonEvent } = useHomeTracking();

  return (
    <SectionContainer
      sectionId="home-modeles-de-courriers"
      title="Modèles de documents"
      subtitle="Téléchargez et personnalisez les modèles de documents et de lettres pour vos démarches en lien avec le droit du travail"
      footerNode={
        <HomeButton
          buttonLink="/modeles-de-courriers"
          buttonText="Voir tous les modèles de documents"
          onButtonClick={() => {
            emitHomeClickButtonEvent(
              MatomoHomeEvent.CLICK_VOIR_TOUS_LES_MODELES
            );
          }}
        />
      }
    >
      {items.map((item, index) => (
        <HomeCard
          key={`${index}${JSON.stringify(item)}`}
          title={item.title}
          description={item.description}
          link={item.link}
          theme={item.theme}
        />
      ))}
    </SectionContainer>
  );
};
