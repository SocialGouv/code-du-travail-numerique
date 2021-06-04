import { getNotifications } from "@socialgouv/modeles-social";
import { getReferences } from "@socialgouv/modeles-social/bin/utils/GetReferences";
import Engine from "publicodes";
import { useState } from "react";

import type {
  MissingArgs,
  PublicodesContextInterface,
  PublicodesResult,
  SituationElement,
} from "./index";

interface State {
  engine: Engine;
  targetRule: string;
}

type PublicodeData = {
  situation: Map<string, SituationElement>;
  missingArgs: MissingArgs[];
  result: PublicodesResult | null;
};

const usePublicodesHandler = ({
  engine,
  targetRule,
}: State): PublicodesContextInterface => {
  const [data, setData] = useState<PublicodeData>({
    missingArgs: [],
    result: null,
    situation: new Map(),
  });

  function newSituation(args: Record<string, string>): void {
    const situation: Map<string, SituationElement> = new Map();
    Object.entries(args).forEach(([key, value]) => {
      const publiKey = key.replace(/ - /g, " . ");
      const detail = engine.getRule(publiKey);
      situation.set(publiKey, {
        name: key,
        rawNode: detail.rawNode,
        value: value,
      });
    });
    engine.setSituation(buildSituation(situation));
    const result = engine.evaluate(targetRule);

    setData({
      missingArgs: buildMissingArgs(result.missingVariables),
      result: { unit: result.unit, value: result.nodeValue },
      situation,
    });
  }

  const buildSituation = (
    map: Map<string, SituationElement>
  ): Record<string, string> => {
    const situation: Record<string, string> = {};
    map.forEach((arg) => {
      situation[arg.rawNode.nom] = arg.value;
    });
    return situation;
  };

  const buildMissingArgs = (missingArgs: Record<string, number>) => {
    return Object.entries(missingArgs)
      .map(([key, value]) => {
        const detail = engine.getRule(key);
        return {
          indice: value,
          name: key.replace(/ \. /g, " - "),
          rawNode: detail.rawNode,
        };
      })
      .sort((a, b) => b.indice - a.indice);
  };

  return {
    getNotifications: () => getNotifications(engine),
    getReferences: () => getReferences(engine),
    missingArgs: data.missingArgs,
    result: data.result,
    setSituation: newSituation,
    situation: Array.from(data.situation.values()),
  };
};

export default usePublicodesHandler;
