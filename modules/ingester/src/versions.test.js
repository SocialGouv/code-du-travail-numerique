import { getVersions } from "./versions";

jest.mock("../package.json", () => ({
  dependencies: {
    "@socialgouv/lib-a": "1",
    "@socialgouv/lib-b": "2",
    "@socialgouv/lib-c": "3",
    foo: "bar",
    "foo/foo": "bar",
  },
}));

test("version shoud return version that match default pattern", () => {
  expect(getVersions()).toEqual({
    "@socialgouv/lib-a": "1",
    "@socialgouv/lib-b": "2",
    "@socialgouv/lib-c": "3",
  });
});

test("version shoud return version that match given pattern $foo", () => {
  expect(getVersions("^foo")).toEqual({
    foo: "bar",
    "foo/foo": "bar",
  });
});
