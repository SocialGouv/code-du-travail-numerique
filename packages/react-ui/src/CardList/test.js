import React from "react";
import { render } from "@testing-library/react";
import { CardList } from ".";
import { Tile } from "../Tile";

export const items = [
  {
    title: "Title 1",
    id: "1"
  },
  {
    title: "Title 2",
    id: "2"
  }
];

describe("<CardList />", () => {
  test("should render a collection with a title and description", () => {
    const { container } = render(
      <CardList title="Hello" desc="Hello Tiles">
        {items.map(item => (
          <Tile noButton key={item.id}>
            {item.title}
          </Tile>
        ))}
      </CardList>
    );
    expect(container).toMatchSnapshot();
  });
  test("should render a signle title", () => {
    const { container } = render(
      <CardList title="Hello">
        <Tile href="#">coucou</Tile>
      </CardList>
    );
    expect(container).toMatchSnapshot();
  });
  test("should render a collection with a title", () => {
    const { container } = render(
      <CardList title="Hello">
        {items.map(item => (
          <Tile key={item.id}>{item.title}</Tile>
        ))}
      </CardList>
    );
    expect(container).toMatchSnapshot();
  });
  test("should render a collection with a title with a link and a desc", () => {
    const { container } = render(
      <CardList
        title="CDTN"
        href="https://code.travail.gouv.fr"
        desc="le code du travail numérique"
      >
        {items.map(item => (
          <Tile key={item.id}>{item.title}</Tile>
        ))}
      </CardList>
    );
    expect(container).toMatchSnapshot();
  });
});
