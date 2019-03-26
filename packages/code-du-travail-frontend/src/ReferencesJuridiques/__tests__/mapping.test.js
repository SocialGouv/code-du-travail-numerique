import TYPE_REFERENCE from "../typeReference";
import { mapReferencesToBlocs } from "../mapping";

const references = [
  {
    title: "Article L1244-3 du code du travail",
    type: TYPE_REFERENCE.codeDuTravail,
    id: "l1244-3"
  },
  {
    title: "Article L1244-4 du code du travail",
    type: TYPE_REFERENCE.codeDuTravail,
    id: "l1244-4"
  },
  {
    title: "Article L3121-44 du code du travail",
    type: TYPE_REFERENCE.codeDuTravail,
    id: "l3121-44"
  },
  // the two below are not linked to any bloc
  {
    title: "Article xxx du code du travail",
    type: TYPE_REFERENCE.journalOfficiel,
    id: "xxx"
  },
  {
    title: "Article yyy du code du travail",
    type: TYPE_REFERENCE.conventionCollective,
    id: "yyy"
  }
];

describe("<ReferencesJuridiques />", () => {
  it("should corectly sort references into blocs", () => {
    const { concernedBlocs, autresReferences } = mapReferencesToBlocs(
      references
    );
    expect(concernedBlocs).toHaveProperty("size", 2);
    let blocScopedReferences = [];
    expect(
      concernedBlocs.forEach(value => {
        blocScopedReferences = blocScopedReferences.concat(value);
      })
    );
    expect(blocScopedReferences).toHaveLength(3);
    expect(autresReferences).toHaveLength(2);
  });
});
