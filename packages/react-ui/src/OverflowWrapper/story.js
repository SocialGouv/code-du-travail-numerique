import React from "react";

import { Section } from "../layout/Section/index.js";
import { OverflowWrapper } from "./index.js";

export default {
  component: OverflowWrapper,
  title: "Components/OverflowWrapper",
};

export const base = () => (
  <>
    <p>
      The overflow wrapper has shadows on the left and right sides to indicate
      that a scroll is possible. You can define its color.
    </p>
    <Section>
      <OverflowWrapper>
        <div style={{ backgroundColor: "white", minWidth: "1200px" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </OverflowWrapper>
    </Section>
    <Section>
      <div style={{ background: "black", padding: "1rem" }}>
        <OverflowWrapper shadowColor="red">
          <div style={{ backgroundColor: "red", minWidth: "1200px" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </OverflowWrapper>
      </div>
    </Section>
    <Section>
      <div style={{ background: "black", padding: "1rem" }}>
        <OverflowWrapper shadowColor="white">
          <div
            style={{ color: "white", minHeight: "10rem", minWidth: "400px" }}
          >
            Resize the window ! Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </div>
        </OverflowWrapper>
      </div>
    </Section>
  </>
);
