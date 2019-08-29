import React from "react";
import { Condition } from "../Condition";
import { renderForm } from "../../../../test/renderForm";

//eslint-disable-next-line react/display-name
const componentBuilder = matchValue => () => (
  <Condition when="foo" is={matchValue}>
    foo is bar
  </Condition>
);

const component = componentBuilder("bar");
const componentWithFunction = componentBuilder(value => value === "bar");
const componentWithFalse = componentBuilder(false);
const componentWithTrue = componentBuilder(true);
const componentWithNumber = componentBuilder(42);

describe("<Condition />", () => {
  describe("Using a string as prop", () => {
    test("should not render children if form field does not match `is` inline prop", () => {
      const { container } = renderForm(component, { foo: "baz" });
      expect(container).toMatchInlineSnapshot(`<div />`);
    });

    test("should render children if form field match `is` inline prop", () => {
      const { container } = renderForm(component, { foo: "bar" });
      expect(container).toMatchInlineSnapshot(`
<div>
  foo is bar
</div>
`);
    });
  });

  describe("Using a function as prop", () => {
    test("should not render children if form field does not match `is` function prop", () => {
      const { container } = renderForm(componentWithFunction, { foo: "foo" });
      expect(container).toMatchInlineSnapshot(`<div />`);
    });
    test("should render children if form field does match `is` function prop", () => {
      const { container } = renderForm(componentWithFunction, { foo: "bar" });
      expect(container).toMatchInlineSnapshot(`
<div>
  foo is bar
</div>
`);
    });
  });

  describe("Using a boolean as prop", () => {
    test("should not render children if form field does not match `is` false boolean prop", () => {
      const { container } = renderForm(componentWithFalse, { foo: "foo" });
      expect(container).toMatchInlineSnapshot(`<div />`);
    });
    test("should not render children if form field does not match `is` true boolean prop", () => {
      const { container } = renderForm(componentWithTrue, { foo: "foo" });
      expect(container).toMatchInlineSnapshot(`<div />`);
    });
    test("should render children if form field does match `is` true boolean true prop", () => {
      const { container } = renderForm(componentWithTrue, { foo: true });
      expect(container).toMatchInlineSnapshot(`
<div>
  foo is bar
</div>
`);
    });
    test("should render children if form field does match `is` false boolean prop", () => {
      const { container } = renderForm(componentWithFalse, { foo: false });
      expect(container).toMatchInlineSnapshot(`
<div>
  foo is bar
</div>
`);
    });
  });

  describe("Using a number as prop", () => {
    test("should not render children if form field does not match `is` number prop", () => {
      const { container } = renderForm(componentWithFalse, { foo: 13 });
      expect(container).toMatchInlineSnapshot(`<div />`);
    });
    test("should render children if form field does match `is` number prop", () => {
      const { container } = renderForm(componentWithNumber, { foo: 42 });
      expect(container).toMatchInlineSnapshot(`
<div>
  foo is bar
</div>
`);
    });
  });
});
