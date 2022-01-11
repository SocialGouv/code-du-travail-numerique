import type { RuleNode } from "publicodes";
import type Engine from "publicodes";

type CdtnRawNode = RuleNode["rawNode"] & { cdtn?: Record<string, any> };

export type SelectedResult =
  | {
      rawNode: CdtnRawNode;
    }
  | undefined;

type FilterType = {
  dottedName: RuleNode["dottedName"];
  rawNode: CdtnRawNode;
};

export function getSelectedResult(engine: Engine): SelectedResult {
  return Object.values(engine.getParsedRules())
    .filter(
      ({ rawNode, dottedName }: FilterType) =>
        rawNode.cdtn && !!engine.evaluate(dottedName).nodeValue
    )
    .map(({ rawNode }) => ({
      rawNode,
    }))
    .pop();
}
