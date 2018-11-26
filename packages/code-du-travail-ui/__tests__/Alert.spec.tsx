//

import React from "react";
import { create } from "react-test-renderer";
import { Alert } from "src/components/Alert";

test("<Alert>Alert !</Alert> should render an Alert component", () => {
  const component = create(<Alert>Alert !</Alert>);
  expect(component.toJSON()).toMatchSnapshot();
});

test("<Alert primary>Primary</Alert> should have 'alert__primary' class", () => {
  const component = create(<Alert primary>Primary</Alert>);
  expect(component.toJSON()).toMatchSnapshot();
});

test("<Alert secondary>Secondary</Alert> should have 'alert__secondary' class", () => {
  const component = create(<Alert secondary>Secondary</Alert>);
  expect(component.toJSON()).toMatchSnapshot();
});

test("<Alert warning>Warning</Alert> should have 'alert__warning' class", () => {
  const component = create(<Alert warning>Warning</Alert>);
  expect(component.toJSON()).toMatchSnapshot();
});

test("<Alert success>Success</Alert> should have 'alert__success' class", () => {
  const component = create(<Alert success>Success</Alert>);
  expect(component.toJSON()).toMatchSnapshot();
});

test("<Alert info>Info</Alert> should have 'alert__info' class", () => {
  const component = create(<Alert info>Info</Alert>);
  expect(component.toJSON()).toMatchSnapshot();
});

test("<Alert danger>Danger</Alert> should have 'alert__danger' class", () => {
  const component = create(<Alert danger>Danger</Alert>);
  expect(component.toJSON()).toMatchSnapshot();
});

test("<Alert link>Link</Alert> should have 'alert__link' class", () => {
  const component = create(<Alert link>Link</Alert>);
  expect(component.toJSON()).toMatchSnapshot();
});

test("<Alert primary style={{ color: 'bar' }}>Link</Alert> should support style attribute", () => {
  const component = create(
    <Alert primary style={{ color: "bar" }}>
      Link
    </Alert>
  );
  expect(component.toJSON()).toMatchSnapshot();
});
