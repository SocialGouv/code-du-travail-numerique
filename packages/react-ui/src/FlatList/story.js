import React from "react";

import { FlatList } from "./index.js";

export default {
  component: FlatList,
  title: "Components/FlatList",
};

export const base = () => (
  <>
    <FlatList>
      <li>This is the most</li>
      <li>minimalist</li>
      <li>list</li>
      <li>you’ll ever get</li>
    </FlatList>
  </>
);
