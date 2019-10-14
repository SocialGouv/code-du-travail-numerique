import React from "react";
import { List, ListItem } from ".";

export default {
  component: List,
  title: "Components|List"
};

export const base = () => (
  <List>
    <ListItem>
      <p>Des elements</p>
    </ListItem>
    <ListItem>{"Ou du texte"}</ListItem>
  </List>
);
