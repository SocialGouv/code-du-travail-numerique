import { findPayloadIncoherences } from "../payload-coherence";
import type { ExtractedEvent } from "../events.schema";

const ev = (action: string, namePattern: string | null): ExtractedEvent => ({
  category: "<PageCategory>",
  action,
  name_pattern: namePattern,
  resolution: "literal",
  emit_function: null,
  file: "input.ts",
  line: 1,
  enum_refs: [],
  tracking_method: "track",
  has_value: false,
});

describe("findPayloadIncoherences", () => {
  it("accepte une action émise partout avec le même contexte", () => {
    expect(
      findPayloadIncoherences([
        ev("select_agreement_p1", "{path, idcc}"),
        ev("select_agreement_p1", "{path, idcc}"),
      ])
    ).toEqual([]);
  });

  // Le cas réellement rencontré pendant la refonte : deux émetteurs de la même
  // action, l'un envoyant une clé de contexte que l'autre ignorait.
  it("signale une clé présente chez un émetteur et absente chez l'autre", () => {
    const issues = findPayloadIncoherences([
      ev("select_agreement_supported", "{path, idcc}"),
      ev("select_agreement_supported", "{path, context, idcc}"),
    ]);

    expect(issues).toHaveLength(1);
    expect(issues[0].action).toBe("select_agreement_supported");
    expect(issues[0].unexpectedKeys).toEqual(["context"]);
  });

  it("tolère une clé déclarée optionnelle, avec sa justification", () => {
    expect(
      findPayloadIncoherences([
        ev("select_result", "{path, algo, target}"),
        ev("select_result", "{path, target}"),
      ])
    ).toEqual([]);
  });

  it("signale quand même les autres clés d'une action à optionnelle déclarée", () => {
    const issues = findPayloadIncoherences([
      ev("select_result", "{path, algo, target}"),
      ev("select_result", "{path, algo}"),
    ]);

    expect(issues[0].unexpectedKeys).toEqual(["target"]);
  });

  // La recherche interne native de Matomo et le relai de notation ont des noms
  // calculés au runtime : ils sont hors du contrat de payload.
  it("ignore les events dont le nom n'est pas une enveloppe JSON", () => {
    expect(
      findPayloadIncoherences([
        ev("<query>", null),
        ev("<rateContentAction(value)>", "<JSON.stringify({ path })>"),
      ])
    ).toEqual([]);
  });
});
