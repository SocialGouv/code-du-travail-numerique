// extract-events.ts
// ----------------------------------------------------------------------------
// Scanne `packages/code-du-travail-frontend/src/modules/**/*.{ts,tsx}` (hors
// tests) et extrait TOUS les events de tracking émis :
//   - sendEvent({ category, action, name? })            de @socialgouv/matomo-next
//   - push(["trackEvent" | "trackSiteSearch" | ...])    events Matomo natifs
//   - _paq.push([...]) / paq.push([...])
//   - gtag("event", ...)                                conversions Google (SEA)
//   - trackAppRouter({...})                             tracking auto matomo-next
//
// RÉSOLUTION DES VALEURS
//   - membres d'enum (MatomoSearchAgreementCategory.PARCOURS_1) → "click_p1"
//   - paramètre typé enum (action: MatomoHomeEvent) → une ligne PAR valeur de
//     l'enum (expansion), pour rendre chaque event statiquement visible.
//   - ternaires / binaires de littéraux → une ligne par branche.
//   - reste calculé à runtime → placeholder <...> (resolution: "dynamic").
//
// `extractEvents()` renvoie le résultat en mémoire (utilisé par check-events.ts).
// Lancé directement, le script écrit `events/events.extracted.json`.
// ----------------------------------------------------------------------------

import { Project, Node, SyntaxKind, ts } from "ts-morph";
import type { ObjectLiteralExpression } from "ts-morph";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import type {
  EventResolution,
  EventsExtraction,
  ExtractedEvent,
  FrameworkAutoTracking,
  MatomoConfigCall,
  OtherTracking,
  UnresolvedCall,
} from "./events.schema";
import { EVENT_KEY } from "./events.schema";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STATS_DIR = path.resolve(__dirname, "..");
const REPO_ROOT = path.resolve(STATS_DIR, "..", "..");
const FRONTEND_SRC = path.resolve(
  REPO_ROOT,
  "packages/code-du-travail-frontend/src"
);
const OUTPUT_PATH = path.join(STATS_DIR, "events", "events.extracted.json");

// On scanne TOUT src/modules/**/*.{ts,tsx} (hors tests) : sendEvent peut être
// appelé depuis n'importe quel module (stores zustand, composants inline...),
// pas seulement dans les fichiers `tracking.ts`.
const GLOB_PATTERNS = [
  path.join(FRONTEND_SRC, "modules/**/*.ts"),
  path.join(FRONTEND_SRC, "modules/**/*.tsx"),
  `!${path.join(FRONTEND_SRC, "modules/**/__tests__/**")}`,
  `!${path.join(FRONTEND_SRC, "modules/**/*.test.ts")}`,
  `!${path.join(FRONTEND_SRC, "modules/**/*.test.tsx")}`,
  `!${path.join(FRONTEND_SRC, "modules/**/*.spec.ts")}`,
  `!${path.join(FRONTEND_SRC, "modules/**/*.spec.tsx")}`,
  `!${path.join(FRONTEND_SRC, "modules/**/*.stories.ts")}`,
  `!${path.join(FRONTEND_SRC, "modules/**/*.stories.tsx")}`,
];

// Commandes Matomo qui PRODUISENT un event. Les autres pushes sont de la
// configuration (setReferrerUrl, opt-out, AbTesting...) → liste à part.
const EVENT_COMMANDS = new Set([
  "trackEvent",
  "trackSiteSearch",
  "trackPageView",
  "trackGoal",
  "trackLink",
  "trackContentImpression",
  "trackContentInteraction",
]);

const MATOMO_PUSH_CALLEES = new Set([
  "push",
  "_paq.push",
  "window._paq.push",
  "paq.push",
]);

function isMatomoPushCallee(exprText: string): boolean {
  if (MATOMO_PUSH_CALLEES.has(exprText)) return true;
  return exprText.endsWith("._paq.push");
}

// Valeur résolue d'un champ category/action, avec sa provenance.
type Resolved = { value: string; kind: EventResolution };

function worstKind(kinds: EventResolution[]): EventResolution {
  if (kinds.includes("dynamic")) return "dynamic";
  if (kinds.includes("enum-param")) return "enum-param";
  return "literal";
}

// Nom de la fonction/variable englobant un appel (pour retrouver l'émetteur).
function findContainingFunctionName(node: Node): string | null {
  let cur: Node | undefined = node.getParent();
  while (cur) {
    if (Node.isArrowFunction(cur) || Node.isFunctionExpression(cur)) {
      const parent = cur.getParent();
      if (Node.isVariableDeclaration(parent)) return parent.getName();
      if (Node.isPropertyAssignment(parent)) return parent.getName();
    }
    if (Node.isFunctionDeclaration(cur)) {
      const name = cur.getName();
      if (name) return name;
    }
    cur = cur.getParent();
  }
  return null;
}

// Réduit un texte multi-ligne en une seule ligne lisible.
function compact(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function getEnumRefs(obj: ObjectLiteralExpression): string[] {
  const refs = new Set<string>();
  obj.forEachDescendant((d) => {
    if (Node.isPropertyAccessExpression(d)) {
      const text = d.getText();
      if (/^[A-Z][A-Za-z0-9]*\.[A-Za-z_][A-Za-z0-9_]*$/.test(text)) {
        refs.add(text);
      }
    }
  });
  return [...refs].sort((a, b) => a.localeCompare(b));
}

export function extractEvents(): EventsExtraction {
  const project = new Project({
    compilerOptions: {
      allowJs: false,
      jsx: ts.JsxEmit.ReactJSX,
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      esModuleInterop: true,
      skipLibCheck: true,
    },
    skipFileDependencyResolution: true,
    skipAddingFilesFromTsConfig: true,
  });

  for (const pattern of GLOB_PATTERNS) {
    project.addSourceFilesAtPaths(pattern);
  }

  // Fichiers réellement scannés pour les events (frontend modules).
  const eventFiles = project.getSourceFiles();
  if (eventFiles.length === 0) {
    throw new Error(
      "[extract-events] Aucun fichier trouvé. Vérifier les patterns de glob et FRONTEND_SRC."
    );
  }

  // Enums externes référencés par le tracking (ex: PublicodesSimulator de
  // @socialgouv/modeles-social) — ajoutés UNIQUEMENT pour résoudre des valeurs,
  // pas scannés pour des events.
  project.addSourceFilesAtPaths(
    path.join(
      REPO_ROOT,
      "packages/code-du-travail-modeles/src/publicodes/**/*.ts"
    )
  );
  const enumFiles = project.getSourceFiles();

  // Map "EnumName.Member" -> "value" et "EnumName" -> [valeurs string].
  const enumMap = new Map<string, string>();
  const enumMembersByName = new Map<string, string[]>();
  for (const sf of enumFiles) {
    for (const decl of sf.getEnums()) {
      const enumName = decl.getName();
      const values: string[] = [];
      for (const member of decl.getMembers()) {
        const value = member.getValue();
        if (typeof value === "string") {
          enumMap.set(`${enumName}.${member.getName()}`, value);
          values.push(value);
        }
      }
      if (values.length) enumMembersByName.set(enumName, values);
    }
  }

  // Index "nom de la fonction appelée" -> CallExpressions. Permet de résoudre
  // la valeur RÉELLEMENT passée à un paramètre d'émetteur (ex: simulatorTitle),
  // cross-fichiers, de façon purement syntaxique (pas de type-checker).
  const callsByName = new Map<string, Node[]>();
  // Nombre de définitions par nom de fonction : si un nom est ambigu (≥2
  // définitions, ex: deux `emitSelectEvent`), on NE résout PAS via les appelants
  // pour éviter de mélanger les call sites de fonctions homonymes.
  const defsByName = new Map<string, number>();
  const bumpDef = (nm: string | null | undefined) => {
    if (nm) defsByName.set(nm, (defsByName.get(nm) ?? 0) + 1);
  };
  for (const sf of eventFiles) {
    sf.forEachDescendant((n) => {
      if (Node.isCallExpression(n)) {
        const callee = n.getExpression();
        let nm: string | null = null;
        if (Node.isIdentifier(callee)) nm = callee.getText();
        else if (Node.isPropertyAccessExpression(callee)) nm = callee.getName();
        if (nm) {
          const arr = callsByName.get(nm);
          if (arr) arr.push(n);
          else callsByName.set(nm, [n]);
        }
        return;
      }
      if (Node.isFunctionDeclaration(n)) bumpDef(n.getName());
      else if (Node.isVariableDeclaration(n)) {
        const init = n.getInitializer();
        if (
          init &&
          (Node.isArrowFunction(init) || Node.isFunctionExpression(init))
        )
          bumpDef(n.getName());
      }
    });
  }

  function functionNameOf(fn: Node): string | null {
    if (Node.isFunctionDeclaration(fn)) return fn.getName() ?? null;
    const parent = fn.getParent();
    if (Node.isVariableDeclaration(parent)) return parent.getName();
    if (Node.isPropertyAssignment(parent)) return parent.getName();
    return null;
  }

  function dedupResolved(arr: Resolved[]): Resolved[] {
    const seen = new Map<string, Resolved>();
    for (const r of arr) if (!seen.has(r.value)) seen.set(r.value, r);
    return [...seen.values()];
  }

  // Un identifiant qui réfère à un paramètre typé enum → ses valeurs possibles.
  // Résolution purement syntaxique (annotation de type), sans type-checker.
  function paramEnumValues(idNode: Node): string[] | null {
    const name = idNode.getText();
    let cur: Node | undefined = idNode.getParent();
    while (cur) {
      if (
        Node.isArrowFunction(cur) ||
        Node.isFunctionDeclaration(cur) ||
        Node.isFunctionExpression(cur) ||
        Node.isMethodDeclaration(cur)
      ) {
        for (const param of cur.getParameters()) {
          if (param.getName() === name) {
            const typeNode = param.getTypeNode();
            if (typeNode && Node.isTypeReference(typeNode)) {
              return (
                enumMembersByName.get(typeNode.getTypeName().getText()) ?? null
              );
            }
            return null;
          }
        }
      }
      cur = cur.getParent();
    }
    return null;
  }

  // `view_step_${Enum.MEMBER}` -> view_step_<valeur résolue> ; `_${title}` ->
  // _<title>. Reste "literal" si toutes les substitutions sont des enums résolus.
  function resolveTemplate(node: Node): Resolved {
    let text = node.getText();
    if (text.startsWith("`") && text.endsWith("`")) text = text.slice(1, -1);
    let kind: EventResolution = "literal";
    const value = text.replace(/\$\{([^}]+)\}/g, (_m, raw) => {
      const expr = String(raw).trim();
      const parts = expr.split(".");
      if (parts.length >= 2) {
        const resolved = enumMap.get(parts.slice(-2).join("."));
        if (resolved !== undefined) return resolved;
      }
      kind = "dynamic";
      return `<${expr}>`;
    });
    return { value: compact(value), kind };
  }

  // Un identifiant = paramètre d'émetteur → valeurs RÉELLEMENT passées par les
  // appelants (récursif, cross-fichiers). Plus précis que le type de l'enum :
  // ne liste que les valeurs effectivement émises. `visited` coupe les cycles.
  function resolveParamViaCallers(
    idNode: Node,
    visited: Set<string>
  ): Resolved[] | null {
    if (visited.size > 12) return null;
    const name = idNode.getText();
    let cur: Node | undefined = idNode.getParent();
    let fnName: string | null = null;
    let paramIndex = -1;
    while (cur) {
      if (
        Node.isArrowFunction(cur) ||
        Node.isFunctionDeclaration(cur) ||
        Node.isFunctionExpression(cur) ||
        Node.isMethodDeclaration(cur)
      ) {
        const idx = cur.getParameters().findIndex((p) => p.getName() === name);
        if (idx >= 0) {
          paramIndex = idx;
          fnName = functionNameOf(cur);
          break;
        }
      }
      cur = cur.getParent();
    }
    if (paramIndex < 0 || !fnName) return null;
    // Nom de fonction ambigu (homonymes) → résolution non fiable, on s'abstient.
    if (defsByName.get(fnName) !== 1) return null;
    const key = `${fnName}#${paramIndex}`;
    if (visited.has(key)) return [];
    visited.add(key);
    const calls = callsByName.get(fnName);
    if (!calls || calls.length === 0) return null;
    const out: Resolved[] = [];
    for (const call of calls) {
      if (!Node.isCallExpression(call)) continue;
      const arg = call.getArguments()[paramIndex];
      if (arg) out.push(...resolveValues(arg, visited));
    }
    return out.length ? dedupResolved(out) : null;
  }

  // Résout une expression category/action en une LISTE de valeurs possibles.
  function resolveValues(
    node: Node,
    visited: Set<string> = new Set()
  ): Resolved[] {
    if (
      node.getKind() === SyntaxKind.StringLiteral ||
      node.getKind() === SyntaxKind.NoSubstitutionTemplateLiteral
    ) {
      const v = (
        node as unknown as { getLiteralValue(): string }
      ).getLiteralValue();
      return [{ value: v, kind: "literal" }];
    }
    if (Node.isParenthesizedExpression(node)) {
      return resolveValues(node.getExpression(), visited);
    }
    if (Node.isPropertyAccessExpression(node)) {
      const fullText = node.getText();
      const parts = fullText.split(".");
      if (parts.length >= 2) {
        const resolved = enumMap.get(parts.slice(-2).join("."));
        if (resolved !== undefined)
          return [{ value: resolved, kind: "literal" }];
      }
      return [{ value: `<${fullText}>`, kind: "dynamic" }];
    }
    if (Node.isIdentifier(node)) {
      const name = node.getText();
      // 1) valeurs RÉELLEMENT passées par les appelants. On ne garde ce résultat
      //    que s'il apporte au moins une valeur concrète ; les valeurs non
      //    résolues sont repliées en un seul placeholder <param>.
      const viaCallers = resolveParamViaCallers(node, visited);
      if (viaCallers && viaCallers.some((r) => !r.value.includes("<"))) {
        return dedupResolved(
          viaCallers.map((r) =>
            r.value.includes("<")
              ? { value: `<${name}>`, kind: "dynamic" as const }
              : r
          )
        );
      }
      // 2) sinon, repli sur le type enum du paramètre (espace possible).
      const members = paramEnumValues(node);
      if (members && members.length) {
        return members.map((v) => ({ value: v, kind: "enum-param" as const }));
      }
      return [{ value: `<${name}>`, kind: "dynamic" }];
    }
    if (Node.isConditionalExpression(node)) {
      return [
        ...resolveValues(node.getWhenTrue(), visited),
        ...resolveValues(node.getWhenFalse(), visited),
      ];
    }
    if (Node.isBinaryExpression(node)) {
      // Concaténation de chaînes : produit cartésien gauche × droite.
      if (node.getOperatorToken().getKind() === SyntaxKind.PlusToken) {
        const left = resolveValues(node.getLeft(), visited);
        const right = resolveValues(node.getRight(), visited);
        if (left.length * right.length <= 12) {
          const out: Resolved[] = [];
          for (const l of left)
            for (const r of right)
              out.push({
                value: l.value + r.value,
                kind: worstKind([l.kind, r.kind]),
              });
          return out;
        }
      }
      return [
        { value: `<${compact(node.getText()).slice(0, 80)}>`, kind: "dynamic" },
      ];
    }
    if (Node.isTemplateExpression(node)) {
      return [resolveTemplate(node)];
    }
    if (Node.isCallExpression(node)) {
      const text = compact(node.getText());
      return [
        {
          value: `<${text.length > 80 ? text.slice(0, 77) + "..." : text}>`,
          kind: "dynamic",
        },
      ];
    }
    return [
      { value: `<${compact(node.getText()).slice(0, 80)}>`, kind: "dynamic" },
    ];
  }

  // Résout une propriété d'un objet en liste de valeurs. null = propriété absente.
  function resolvePropertyValues(
    obj: ObjectLiteralExpression,
    propName: string
  ): Resolved[] | null {
    const prop = obj.getProperty(propName);
    if (!prop) return null;
    if (Node.isPropertyAssignment(prop)) {
      const init = prop.getInitializer();
      if (!init) return null;
      return resolveValues(init);
    }
    if (Node.isShorthandPropertyAssignment(prop)) {
      return resolveValues(prop.getNameNode());
    }
    return [
      { value: `<${prop.getSymbol()?.getName() ?? "?"}>`, kind: "dynamic" },
    ];
  }

  // Le `name` n'identifie pas l'event : une seule valeur (pas d'expansion enum).
  function resolveNamePattern(obj: ObjectLiteralExpression): string | null {
    const prop = obj.getProperty("name");
    if (!prop) return null;
    let node: Node | undefined;
    if (Node.isPropertyAssignment(prop)) node = prop.getInitializer();
    else if (Node.isShorthandPropertyAssignment(prop))
      node = prop.getNameNode();
    if (!node) return null;
    // On NE déplie PAS les enums du name (sinon name = longue liste). On prend
    // la valeur littérale si possible, sinon un placeholder unique.
    if (
      node.getKind() === SyntaxKind.StringLiteral ||
      node.getKind() === SyntaxKind.NoSubstitutionTemplateLiteral
    ) {
      return (
        node as unknown as { getLiteralValue(): string }
      ).getLiteralValue();
    }
    if (Node.isPropertyAccessExpression(node)) {
      const parts = node.getText().split(".");
      const resolved = enumMap.get(parts.slice(-2).join("."));
      return resolved ?? `<${node.getText()}>`;
    }
    if (Node.isTemplateExpression(node)) return resolveTemplate(node).value;
    return `<${compact(node.getText()).slice(0, 80)}>`;
  }

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
      const relFile = path.relative(REPO_ROOT, sf.getFilePath());
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

  const byCatActionFileLine = (
    a: { category: string; action: string; file: string; line: number },
    b: { category: string; action: string; file: string; line: number }
  ) =>
    a.category.localeCompare(b.category) ||
    a.action.localeCompare(b.action) ||
    a.file.localeCompare(b.file) ||
    a.line - b.line;

  events.sort(byCatActionFileLine);
  configCalls.sort(
    (a, b) =>
      a.command.localeCompare(b.command) ||
      a.file.localeCompare(b.file) ||
      a.line - b.line
  );
  frameworkAuto.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line);
  otherTracking.sort(
    (a, b) =>
      a.system.localeCompare(b.system) ||
      a.file.localeCompare(b.file) ||
      a.line - b.line
  );
  unresolved.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line);

  const uniqueKeys = new Set(events.map((e) => EVENT_KEY(e)));

  return {
    scan_root: path.relative(REPO_ROOT, FRONTEND_SRC),
    callsites: callsiteKeys.size,
    total_events: events.length,
    unique_events: uniqueKeys.size,
    unresolved_callsites: unresolved.length,
    events,
    unresolved,
    matomo_config_calls: configCalls,
    framework_auto_tracking: frameworkAuto,
    other_tracking: otherTracking,
  };
}

// Sérialisation déterministe (pas de timestamp) : drift check = égalité stricte.
export function serializeExtraction(extraction: EventsExtraction): string {
  return JSON.stringify(extraction, null, 2) + "\n";
}

export { OUTPUT_PATH };

function main(): void {
  const extraction = extractEvents();
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, serializeExtraction(extraction));
  console.log(
    `[extract-events] ${extraction.callsites} callsites · ${extraction.total_events} events (${extraction.unique_events} uniques) · ${extraction.unresolved_callsites} non résolus · ${extraction.matomo_config_calls.length} config · ${extraction.framework_auto_tracking.length} auto · ${extraction.other_tracking.length} autres`
  );
  console.log(
    `[extract-events] Écrit : ${path.relative(REPO_ROOT, OUTPUT_PATH)}`
  );
}

// Lancé directement (tsx src/extract-events.ts) → écrit le fichier.
// Importé (par check-events.ts) → n'exécute rien.
const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : "";
if (invokedPath === fileURLToPath(import.meta.url)) {
  main();
}
