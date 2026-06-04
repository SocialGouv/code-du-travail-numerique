// Parcourt les fichiers source et détecte chaque callsite de tracking :
//   - sendEvent({ category, action, name? })
//   - gtag("event", ...)                  conversions Google (SEA)
//   - trackAppRouter({...})                auto-tracking matomo-next
//   - push([cmd, ...]) / _paq.push([...])  events & config Matomo natifs
// Produit les events (après expansion des enums) et les listes annexes.

import { Node, SyntaxKind } from "ts-morph";
import type { SourceFile } from "ts-morph";
import * as path from "node:path";
import type {
  ExtractedEvent,
  FrameworkAutoTracking,
  MatomoConfigCall,
  OtherTracking,
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
  frameworkAuto: FrameworkAutoTracking[];
  otherTracking: OtherTracking[];
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
  const frameworkAuto: FrameworkAutoTracking[] = [];
  const otherTracking: OtherTracking[] = [];
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

      // ---- Cas 2 : gtag("event", "<type>", { send_to }) (Google SEA) ----
      if (exprText === "gtag" || exprText.endsWith(".gtag")) {
        if (args.length >= 2 && Node.isStringLiteral(args[0])) {
          const kind = args[0].getLiteralValue();
          if (kind === "event") {
            const evt = resolveValues(args[1])[0]?.value ?? "<unknown>";
            let detail = "";
            if (args[2] && Node.isObjectLiteralExpression(args[2])) {
              const sendTo = resolvePropertyValues(args[2], "send_to");
              detail = sendTo?.[0]?.value ?? "";
            }
            otherTracking.push({
              system: "google-gtag",
              event: evt,
              detail,
              file: relFile,
              line,
            });
          }
        }
        return;
      }

      // ---- Cas 3 : trackAppRouter({...}) (auto-tracking matomo-next) ----
      if (
        exprText === "trackAppRouter" ||
        exprText.endsWith(".trackAppRouter")
      ) {
        const autoEvents = ["trackPageView (changement de route SPA)"];
        if (args[0] && Node.isObjectLiteralExpression(args[0])) {
          const cfg = args[0];
          if (cfg.getProperty("searchKeyword"))
            autoEvents.push("trackSiteSearch (searchKeyword)");
          if (cfg.getProperty("abTests"))
            autoEvents.push("AbTesting (A/B content tracking)");
        }
        // matomo-next active le link tracking par défaut (outlinks / downloads).
        autoEvents.push("outlink / download (enableLinkTracking par défaut)");
        frameworkAuto.push({
          installer: "trackAppRouter",
          auto_events: autoEvents,
          file: relFile,
          line,
        });
        return;
      }

      // ---- Cas 4 : push([cmd, ...]) / _paq.push([cmd, ...]) ----
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
    frameworkAuto,
    otherTracking,
    callsiteKeys,
  };
}
