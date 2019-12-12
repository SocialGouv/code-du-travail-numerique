import React from "react";
import { NakedList } from ".";

export default {
  component: NakedList,
  title: "Components|NakedList"
};

export const base = () => (
  <>
    <NakedList>
      <li>This is the most</li>
      <li>minimalist</li>
      <li>list</li>
      <li>you’ll ever get</li>
    </NakedList>
  </>
);
