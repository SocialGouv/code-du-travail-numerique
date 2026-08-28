// Parcourt les fichiers source et détecte chaque callsite de tracking :
//   - track(action, payload?, value?)          socle normalisé (hooks React)
//   - sendPageEvent(action, payload?, value?)  socle normalisé (hors React)
//   - sendEvent({ category, action, name? })   appel Matomo brut
//   - push([cmd, ...]) / _paq.push([...])      events & config Matomo natifs
// Produit les events (après expansion des enums) et les listes annexes.

import { Node, SyntaxKind } from "ts-morph";
import type { SourceFile } from "ts-morph";
import * as path from "node:path";
import type {
  EventResolution,
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

// Émetteurs du socle normalisé (`modules/analytics/events`). Ils ne reçoivent
// PAS de catégorie : elle est déduite de la route courante au runtime, ce qui
// est justement ce qui rend la convention impossible à contourner.
const SOCLE_EMITTERS = new Set(["track", "sendPageEvent"]);

// Placeholder de la catégorie pour ces émetteurs : le type de page n'est
// connaissable qu'à l'exécution. Les valeurs possibles sont l'enum PageCategory.
const PAGE_CATEGORY_PLACEHOLDER = "<PageCategory>";

// `track` est un nom courant : on ne le traite comme un émetteur que si le
// fichier importe réellement le socle. Sans ce garde-fou, n'importe quelle
// fonction locale nommée `track` polluerait le catalogue.
function importsTrackingSocle(sf: SourceFile): boolean {
  return sf
    .getImportDeclarations()
    .some((decl) =>
      decl.getModuleSpecifierValue().includes("analytics/events")
    );
}

// Décrit la FORME du payload plutôt que ses valeurs : `{path, simulator, step}`.
// C'est ce dont le plan de tracking a besoin — quelles informations voyagent —
// et ça reste stable quand une valeur runtime change.
// L'ordre reproduit celui de la sérialisation : `path` en tête, le reste trié.
function payloadShape(node: Node | undefined): string | null {
  if (!node) return "{path}";
  if (!Node.isObjectLiteralExpression(node)) {
    return `<${node.getText().slice(0, 80)}>`;
  }

  const keys: string[] = [];
  for (const prop of node.getProperties()) {
    if (Node.isPropertyAssignment(prop)) {
      keys.push(prop.getName().replace(/^["']|["']$/g, ""));
    } else if (Node.isShorthandPropertyAssignment(prop)) {
      keys.push(prop.getName());
    } else if (Node.isSpreadAssignment(prop)) {
      keys.push("...");
    }
  }

  // `path` est toujours présent, que l'appelant le passe ou non : le socle
  // l'injecte depuis la route courante. On le remet donc en tête sans se
  // demander s'il figure dans l'appel.
  const rest = keys.filter((key) => key !== "path").sort();
  return `{${["path", ...rest].join(", ")}}`;
}

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
    trackingMethod: string,
    hasValue = false,
    // Résolution imposée. Utile au socle normalisé : sa catégorie est TOUJOURS
    // dérivée de la route, donc toujours "dynamic" ; la retenir écraserait
    // l'information utile — l'action, elle, est littérale. Le repère 📌/🔀 du
    // plan de tracking porte alors sur ce qui identifie l'event.
    resolutionOverride?: EventResolution
  ): void {
    callsiteKeys.add(`${relFile}:${line}`);
    for (const cat of cats) {
      for (const act of acts) {
        events.push({
          category: cat.value,
          action: act.value,
          name_pattern: namePattern,
          resolution: resolutionOverride ?? worstKind([cat.kind, act.kind]),
          emit_function: emitFunction,
          file: relFile,
          line,
          enum_refs: enumRefs,
          tracking_method: trackingMethod,
          has_value: hasValue,
        });
      }
    }
  }

  for (const sf of eventFiles) {
    const hasSocleImport = importsTrackingSocle(sf);

    sf.forEachDescendant((node) => {
      if (!Node.isCallExpression(node)) return;
      const expr = node.getExpression();
      const exprText = expr.getText();
      const line = node.getStartLineNumber();
      const relFile = path.relative(repoRoot, sf.getFilePath());
      const args = node.getArguments();

      // ---- Cas 0 : socle normalisé — track(action, payload?, value?) ----
      // La catégorie n'est pas dans l'appel : elle vient de la route courante.
      // C'est le cœur de la normalisation — un appelant ne PEUT pas se tromper
      // de catégorie — mais ça la rend, par construction, non résoluble
      // statiquement : elle est notée `<PageCategory>`.
      if (hasSocleImport && SOCLE_EMITTERS.has(exprText)) {
        if (args.length === 0) {
          unresolved.push({
            file: relFile,
            line,
            reason: `${exprText} appelé sans action`,
          });
          return;
        }

        const acts = resolveValues(args[0]);
        pushEvents(
          [{ value: PAGE_CATEGORY_PLACEHOLDER, kind: "dynamic" }],
          acts,
          payloadShape(args[1]),
          findContainingFunctionName(node),
          relFile,
          line,
          Node.isObjectLiteralExpression(args[1] as Node)
            ? getEnumRefs(args[1] as never)
            : [],
          exprText,
          args.length > 2,
          // La catégorie est dérivée de la route par construction : c'est
          // l'action qui identifie l'event, et c'est donc sa résolution qui
          // compte.
          worstKind(acts.map((a) => a.kind))
        );
        return;
      }

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
