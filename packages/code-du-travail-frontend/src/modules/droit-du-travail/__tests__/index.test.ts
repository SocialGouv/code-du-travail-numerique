import { Introduction, Origins, Hierarchy } from "../index";

describe("droit-du-travail module exports", () => {
  it("exports Introduction component", () => {
    expect(Introduction).toBeDefined();
  });

  it("exports Origins component", () => {
    expect(Origins).toBeDefined();
  });

  it("exports Hierarchy component", () => {
    expect(Hierarchy).toBeDefined();
  });
});
