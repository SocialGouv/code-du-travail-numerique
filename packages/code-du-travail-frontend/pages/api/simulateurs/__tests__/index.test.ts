import { getTools } from "..";

test("getTools should return tools", () => {
  expect(getTools()).toMatchSnapshot();
});

test("getTools should return only prod tools", () => {
  process.env.IS_PRODUCTION_DEPLOYMENT = "true";
  expect(getTools()).toMatchSnapshot();
});

afterEach(() => {
  delete process.env.IS_PRODUCTION_DEPLOYMENT;
});
