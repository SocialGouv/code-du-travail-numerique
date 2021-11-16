import { getTools } from "..";

test("getTools should return tools", () => {
  expect(getTools()).toMatchSnapshot();
});

test("getTools should return only prod tools", () => {
  process.env.NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT = "true";
  expect(getTools()).toMatchSnapshot();
});

afterEach(() => {
  delete process.env.NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT;
});
