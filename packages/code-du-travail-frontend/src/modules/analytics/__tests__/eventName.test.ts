import { toEventName } from "../eventName";

describe("toEventName", () => {
  it("retire le slash initial d'un chemin", () => {
    expect(toEventName("/contribution/mon-slug")).toEqual(
      "contribution/mon-slug"
    );
  });

  it("laisse intact un chemin déjà relatif", () => {
    expect(toEventName("contribution/mon-slug")).toEqual(
      "contribution/mon-slug"
    );
  });

  it("conserve les slashs internes et le hash", () => {
    expect(toEventName("/contribution/les-conges/2120#cdt")).toEqual(
      "contribution/les-conges/2120#cdt"
    );
  });

  it("retire les slashs initiaux redondants", () => {
    expect(toEventName("//themes/mon-slug")).toEqual("themes/mon-slug");
  });

  it("accepte la racine", () => {
    expect(toEventName("/")).toEqual("");
  });
});
