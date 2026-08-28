import { toCountEventName, toEventName } from "../eventName";

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

describe("toCountEventName", () => {
  // Le zéro est le seul cas qui pose problème : Matomo traite la chaîne "0"
  // comme vide et jette le nom de l'event, rendant invisible tout le seau
  // « aucun résultat ».
  it('étiquette le zéro au lieu d\'envoyer "0"', () => {
    expect(toCountEventName(0)).toEqual("aucun");
  });

  it("laisse les valeurs non nulles en chiffres, pour ne pas rompre la continuité des rapports", () => {
    expect(toCountEventName(1)).toEqual("1");
    expect(toCountEventName(19)).toEqual("19");
    expect(toCountEventName(164)).toEqual("164");
  });
});
