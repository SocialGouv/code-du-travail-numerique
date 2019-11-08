import React from "react";
import { CardList } from ".";
import { Tile } from "../Tile";

export default {
  component: CardList,
  title: "Components|CardList"
};

const items = Array.from({ length: 7 }, (_, index) => ({
  title: `Title ${index + 1}`,
  id: `${index + 1}`
}));

export const base = () => (
  <>
    <CardList
      title="Boîte à outils"
      desc="Trouvez des réponses personnalisées selon votre situation"
      columns={3}
    >
      {items.map(item => (
        <Tile key={item.id}>{item.title}</Tile>
      ))}
    </CardList>
    <CardList
      title="Boîte à outils"
      desc="Trouvez des réponses personnalisées selon votre situation"
    >
      {items.map(item => (
        <Tile href="#" key={item.id}>
          {item.title}
        </Tile>
      ))}
    </CardList>
    <CardList title="Les articles les plus populaires">
      <Tile href="#">Hello Tile</Tile>
    </CardList>
    <CardList title="Les articles les plus populaires">
      {items.map(item => (
        <Tile href="#" key={item.id}>
          {item.title}
        </Tile>
      ))}
    </CardList>
    <CardList
      title="Thèmes"
      href="http://code.travail.gouv.fr"
      desc="Retrouvez tous nos contenus autour de grands thèmes"
    >
      {items.map(item => (
        <Tile href="#" key={item.id}>
          {item.title}
        </Tile>
      ))}
    </CardList>
  </>
);
