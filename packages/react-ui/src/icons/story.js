import React from "react";
import styled from "styled-components";

import { Section } from "../layout/Section/index.js";
import { Heading } from "../Titles/Heading/index.js";
import { PageTitle } from "../Titles/PageTitle/index.js";
import { Title } from "../Titles/Title/index.js";
import * as icons from "./index.js";

export default {
  component: icons,
  title: "Components/Icons",
};

export const base = () => {
  return Object.entries(icons).map(([name, Icon]) => (
    <StyledSection key={name}>
      <Name>{name} :</Name>
      <Icon width="4rem" />
    </StyledSection>
  ));
};

const StyledSection = styled(Section)`
  display: flex;
  align-items: center;
`;

const Name = styled.span`
  padding-right: 2rem;
`;

export const readme = () => (
  <>
    <PageTitle>How to: </PageTitle>
    <Title>Embed a new icon</Title>
    <ol>
      <li>Place the monochrome or bicolor icon into the according folder</li>
      <li>
        Run <code>yarn svg</code>. Your SVG component will be created in the{" "}
        <b>components</b> folder
      </li>
      <li>
        Export the new icon in the <b>index.js</b> file.{" "}
        <code>{`export { default as MyNewIcon } from "./components/bicolor/MyNewIcon.js"`}</code>
      </li>
    </ol>
    <Title>Use the icon</Title>
    <Heading>Inside the UI repo</Heading>
    <p>
      <code>
        {`import { Calculator } from "../icons/index.js"`}
        <br />
        {`<Calculator />`}
      </code>
    </p>
    <Heading>Outside the UI repo</Heading>
    <p>
      <code>
        {`import { icons } from "../theme.js"`}
        <br />
        {`const { Calculator } = icons;`}
        <br />
        {`<Calculator />`}
      </code>
    </p>
    <Title>Size the icon</Title>
    <p>
      The icon will take all the space available so make sure you set a width to
      it or wrap it in a container that has a fixed width
    </p>
    <hr />
    <br />
    <Title>Exception</Title>
    <p>
      Exceptionally you can use the icons available{" "}
      <a href="https://feathericons.com/">here</a> wrapped into react components
      thanks to this package:{" "}
      <a href="https://github.com/feathericons/react-feather">react-feather</a>
      <br />
      <code>
        {`import { Layers } from "react-feather";`}
        <br />
        {`<Layers />`}
      </code>
    </p>
  </>
);
