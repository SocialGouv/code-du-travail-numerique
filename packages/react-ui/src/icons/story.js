import React from "react";
import * as icons from ".";

export default {
  component: icons,
  title: "Components|Icons"
};

export const base = () => (
  <p>
    We use the icons available <a href="https://feathericons.com/">here</a>{" "}
    wrapped into react components thanks to this package:{" "}
    <a href="https://github.com/feathericons/react-feather">react-feather</a>
  </p>
);

export const custom = () => {
  return Object.entries(icons).map(([name, Icon]) => (
    <div key={name}>
      <p>{name}</p>
      <Icon width="3rem" />
    </div>
  ));
};
