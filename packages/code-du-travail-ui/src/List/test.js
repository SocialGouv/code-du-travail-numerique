import React from "react";
import { render } from "react-testing-library";
import { List, ListItem } from ".";

describe("<List />", () => {
  test("should render", () => {
    const { container } = render(
      <List>
        <ListItem>{"un truc"}</ListItem>,
        <ListItem>
          <p>Un autre truc</p>
        </ListItem>
      </List>
    );
    expect(container).toMatchSnapshot();
  });
});
