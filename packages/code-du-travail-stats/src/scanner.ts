// Parcourt les fichiers source et détecte chaque callsite de tracking :
//   - sendEvent({ category, action, name? })
//   - push([cmd, ...]) / _paq.push([...])  events & config Matomo natifs
// Produit les events (après expansion des enums) et les listes annexes.

import { Node, SyntaxKind } from "ts-morph";
import type { SourceFile } from "ts-morph";
import * as path from "node:path";
import type {
  ExtractedEvent,
  MatomoConfigCall,
  Resolved,
  UnresolvedCall,
} from "./events.schema";
import type { Resolver } from "./value-resolver";
import { worstKind } from "./text-utils";
import { findContainingFunctionName, getEnumRefs } from "./ast-utils";
import { EVENT_COMMANDS, isMatomoPushCallee } from "./matomo-commands";

export type ScanResult = {
  events: ExtractedEvent[];
  unresolved: UnresolvedCall[];
  configCalls: MatomoConfigCall[];
  callsiteKeys: Set<string>;
};

export function scanSourceFiles(
  eventFiles: SourceFile[],
  resolver: Resolver,
  repoRoot: string
): ScanResult {
  const { resolveValues, resolvePropertyValues, resolveNamePattern } = resolver;

  const events: ExtractedEvent[] = [];
  const unresolved: UnresolvedCall[] = [];
  const configCalls: MatomoConfigCall[] = [];
  const callsiteKeys = new Set<string>();

  function pushEvents(
    cats: Resolved[],
    acts: Resolved[],
    namePattern: string | null,
    emitFunction: string | null,
    relFile: string,
    line: number,
    enumRefs: string[],
    trackingMethod: string
  ): void {
    callsiteKeys.add(`${relFile}:${line}`);
    for (const cat of cats) {
      for (const act of acts) {
        events.push({
          category: cat.value,
          action: act.value,
          name_pattern: namePattern,
          resolution: worstKind([cat.kind, act.kind]),
          emit_function: emitFunction,
          file: relFile,
          line,
          enum_refs: enumRefs,
          tracking_method: trackingMethod,
        });
      }
    }
  }

  for (const sf of eventFiles) {
    sf.forEachDescendant((node) => {
      if (!Node.isCallExpression(node)) return;
      const expr = node.getExpression();
      const exprText = expr.getText();
      const line = node.getStartLineNumber();
      const relFile = path.relative(repoRoot, sf.getFilePath());
      const args = node.getArguments();

      // ---- Cas 1 : sendEvent({ category, action, name? }) ----
      if (exprText === "sendEvent" || exprText.endsWith(".sendEvent")) {
        if (args.length === 0) return;
        const firstArg = args[0];
        if (!Node.isObjectLiteralExpression(firstArg)) {
          unresolved.push({
            file: relFile,
            line,
            reason: "sendEvent appelé avec un argument non-objet-littéral",
          });
          return;
        }
        const cats = resolvePropertyValues(firstArg, "category");
        const acts = resolvePropertyValues(firstArg, "action");
        if (!cats || !acts) {
          unresolved.push({
            file: relFile,
            line,
            reason: `Missing ${!cats ? "category" : ""}${
              !cats && !acts ? "+" : ""
            }${!acts ? "action" : ""}`,
          });
          return;
        }
        pushEvents(
          cats,
          acts,
          resolveNamePattern(firstArg),
          findContainingFunctionName(node),
          relFile,
          line,
          getEnumRefs(firstArg),
          "sendEvent"
        );
        return;
      }

      // ---- Cas 2 : push([cmd, ...]) / _paq.push([cmd, ...]) ----
      if (!isMatomoPushCallee(exprText)) return;
      if (args.length === 0) return;
      const firstArg = args[0];
      if (!Node.isArrayLiteralExpression(firstArg)) return;
      const elements = firstArg.getElements();
      if (elements.length === 0) return;
      const cmdNode = elements[0];
      if (cmdNode.getKind() !== SyntaxKind.StringLiteral) return;
      const cmdValue = (
        cmdNode as unknown as { getLiteralValue(): string }
      ).getLiteralValue();

      if (EVENT_COMMANDS.has(cmdValue)) {
        const method = `push:${cmdValue}`;
        let cats: Resolved[];
        let acts: Resolved[];
        let namePattern: string | null = null;

        if (cmdValue === "trackEvent") {
          cats = elements[1]
            ? resolveValues(elements[1])
            : [{ value: "<unknown>", kind: "dynamic" }];
          acts = elements[2]
            ? resolveValues(elements[2])
            : [{ value: "<unknown>", kind: "dynamic" }];
          namePattern = elements[3]
            ? resolveValues(elements[3])[0].value
            : null;
        } else {
          cats = [{ value: `_matomo_${cmdValue}`, kind: "literal" }];
          acts = elements[1]
            ? resolveValues(elements[1])
            : [{ value: "<no-arg>", kind: "dynamic" }];
          namePattern = elements[2]
            ? resolveValues(elements[2])[0].value
            : null;
        }

        pushEvents(
          cats,
          acts,
          namePattern,
          findContainingFunctionName(node),
          relFile,
          line,
          [],
          method
        );
      } else {
        const argStrings = elements.slice(1).map((e) => {
          const v = resolveValues(e)[0]?.value;
          return v ?? e.getText().slice(0, 80);
        });
        configCalls.push({
          command: cmdValue,
          args: argStrings,
          file: relFile,
          line,
        });
      }
    });
  }

  return {
    events,
    unresolved,
    configCalls,
    callsiteKeys,
  };
}
