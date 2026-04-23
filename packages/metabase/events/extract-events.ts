// extract-events.ts
// ----------------------------------------------------------------------------
// Scanne les fichiers tracking.{ts,tsx} et events/*.{ts,tsx} du frontend pour
// extraire TOUS les appels a sendEvent({ category, action, name? }) et les
// serialise dans events/events.extracted.json (source de verite technique).
//
// Les references a des membres d'enum (ex: TrackingContributionCategory.TOOL)
// sont resolues statiquement en scannant tous les enums exportes par les
// memes fichiers + packages/code-du-travail-frontend/src/modules/analytics.
//
// Voir events/CLAUDE.md pour le contrat complet.
// ----------------------------------------------------------------------------

import { Project, Node, SyntaxKind } from "ts-morph";
import type { ObjectLiteralExpression } from "ts-morph";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const METABASE_DIR = path.resolve(__dirname, "..");
const REPO_ROOT = path.resolve(METABASE_DIR, "..", "..");
const FRONTEND_SRC = path.resolve(
  REPO_ROOT,
  "packages/code-du-travail-frontend/src"
);

// Scanne TOUT src/modules/**/*.{ts,tsx} sauf les tests/specs.
// Raison : sendEvent peut etre appele depuis n'importe quel module (ex: stores
// zustand dans `outils/preavis-retraite/steps/*/store.ts`, composants inline
// comme `LegiFranceSearch.tsx`), pas seulement dans les fichiers "tracking.ts".
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

type ExtractedEvent = {
  category: string;
  action: string;
  name_pattern: string | null;
  emit_function: string | null;
  file: string;
  line: number;
  enum_refs: string[];
  tracking_method: string;
};

type MatomoConfigCall = {
  command: string;
  args: string[];
  file: string;
  line: number;
};

// Commandes Matomo qui PRODUISENT un event (a documenter dans events.md).
// Les autres pushes sont de la config (setReferrerUrl, AbTesting::create,
// HeatmapSessionRecording, opt-out, etc.) -> liste a part.
const EVENT_COMMANDS = new Set([
  "trackEvent",
  "trackSiteSearch",
  "trackPageView",
  "trackGoal",
  "trackLink",
  "trackContentImpression",
  "trackContentInteraction",
]);

// Heuristique : ces noms d'expression sont consideres comme un push Matomo.
// Les autres `.push()` (Array.prototype.push) sont filtrees par la structure
// de l'argument (ArrayLiteralExpression avec StringLiteral commande en tete).
const MATOMO_PUSH_CALLEES = new Set([
  "push",
  "_paq.push",
  "window._paq.push",
  "paq.push",
]);

const project = new Project({
  compilerOptions: {
    allowJs: false,
    jsx: 4 /* ReactJSX */,
    target: 99 /* ESNext */,
    module: 99 /* ESNext */,
    moduleResolution: 2 /* NodeJs */,
    esModuleInterop: true,
    skipLibCheck: true,
  },
  skipFileDependencyResolution: true,
  skipAddingFilesFromTsConfig: true,
});

for (const pattern of GLOB_PATTERNS) {
  project.addSourceFilesAtPaths(pattern);
}

const loadedFiles = project.getSourceFiles();
if (loadedFiles.length === 0) {
  console.error(
    "[extract-events] Aucun fichier trouve. Verifier les patterns de glob."
  );
  process.exit(1);
}

// Build global enum value map: "EnumName.Member" -> "value"
const enumMap = new Map<string, string>();

for (const sf of loadedFiles) {
  for (const decl of sf.getEnums()) {
    const enumName = decl.getName();
    for (const member of decl.getMembers()) {
      const value = member.getValue();
      if (typeof value === "string") {
        enumMap.set(`${enumName}.${member.getName()}`, value);
      }
    }
  }
}

function resolveExpression(node: Node): string | null {
  if (
    node.getKind() === SyntaxKind.StringLiteral ||
    node.getKind() === SyntaxKind.NoSubstitutionTemplateLiteral
  ) {
    return (node as unknown as { getLiteralValue(): string }).getLiteralValue();
  }
  if (Node.isPropertyAccessExpression(node)) {
    const fullText = node.getText();
    // Handle namespaced: foo.bar.EnumName.MEMBER -> take last two segments
    const parts = fullText.split(".");
    if (parts.length >= 2) {
      const shortKey = parts.slice(-2).join(".");
      const resolved = enumMap.get(shortKey);
      if (resolved !== undefined) return resolved;
    }
    return `<${fullText}>`;
  }
  if (Node.isTemplateExpression(node)) {
    // Template with expressions: give a readable pattern
    return node.getText();
  }
  if (Node.isIdentifier(node)) {
    return `<${node.getText()}>`;
  }
  if (Node.isCallExpression(node)) {
    const text = node.getText();
    return `<${text.length > 80 ? text.slice(0, 77) + "..." : text}>`;
  }
  if (Node.isConditionalExpression(node)) {
    const whenTrue = resolveExpression(node.getWhenTrue());
    const whenFalse = resolveExpression(node.getWhenFalse());
    return `${whenTrue ?? "?"} | ${whenFalse ?? "?"}`;
  }
  return `<${node.getText().slice(0, 80)}>`;
}

function resolveProperty(
  obj: ObjectLiteralExpression,
  propName: string
): string | null {
  const prop = obj.getProperty(propName);
  if (!prop) return null;
  if (Node.isPropertyAssignment(prop)) {
    const initializer = prop.getInitializer();
    if (!initializer) return null;
    return resolveExpression(initializer);
  }
  if (Node.isShorthandPropertyAssignment(prop)) {
    return `<${prop.getName()}>`;
  }
  return null;
}

function findContainingFunctionName(node: Node): string | null {
  let cur: Node | undefined = node.getParent();
  while (cur) {
    if (Node.isArrowFunction(cur) || Node.isFunctionExpression(cur)) {
      const parent = cur.getParent();
      if (Node.isVariableDeclaration(parent)) {
        return parent.getName();
      }
      if (Node.isPropertyAssignment(parent)) {
        return parent.getName();
      }
    }
    if (Node.isFunctionDeclaration(cur)) {
      const name = cur.getName();
      if (name) return name;
    }
    cur = cur.getParent();
  }
  return null;
}

function getEnumRefs(obj: ObjectLiteralExpression): string[] {
  const refs = new Set<string>();
  obj.forEachDescendant((d) => {
    if (Node.isPropertyAccessExpression(d)) {
      const text = d.getText();
      // heuristic: PascalCase.UPPER_OR_CAMEL
      if (/^[A-Z][A-Za-z0-9]*\.[A-Za-z_][A-Za-z0-9_]*$/.test(text)) {
        refs.add(text);
      }
    }
  });
  return [...refs].sort((a, b) => a.localeCompare(b));
}

const events: ExtractedEvent[] = [];
const unresolvedCalls: { file: string; line: number; reason: string }[] = [];
const configCalls: MatomoConfigCall[] = [];

function isMatomoPushCallee(exprText: string): boolean {
  if (MATOMO_PUSH_CALLEES.has(exprText)) return true;
  // Gere `something._paq.push`
  return exprText.endsWith("._paq.push");
}

for (const sf of loadedFiles) {
  sf.forEachDescendant((node) => {
    if (!Node.isCallExpression(node)) return;
    const expr = node.getExpression();
    const exprText = expr.getText();
    const line = node.getStartLineNumber();
    const relFile = path.relative(REPO_ROOT, sf.getFilePath());

    // ---- Cas 1 : sendEvent({ category, action, name }) ----
    if (exprText === "sendEvent" || exprText.endsWith(".sendEvent")) {
      const args = node.getArguments();
      if (args.length === 0) return;
      const firstArg = args[0];
      if (!Node.isObjectLiteralExpression(firstArg)) return;

      const category = resolveProperty(firstArg, "category");
      const action = resolveProperty(firstArg, "action");
      const namePattern = resolveProperty(firstArg, "name");

      if (!category || !action) {
        unresolvedCalls.push({
          file: relFile,
          line,
          reason: `Missing ${!category ? "category" : ""}${
            !category && !action ? "+" : ""
          }${!action ? "action" : ""}`,
        });
        return;
      }

      events.push({
        category,
        action,
        name_pattern: namePattern,
        emit_function: findContainingFunctionName(node),
        file: relFile,
        line,
        enum_refs: getEnumRefs(firstArg),
        tracking_method: "sendEvent",
      });
      return;
    }

    // ---- Cas 2 : push([cmd, ...args]) ou _paq.push([cmd, ...args]) ----
    if (!isMatomoPushCallee(exprText)) return;

    const args = node.getArguments();
    if (args.length === 0) return;
    const firstArg = args[0];
    if (!Node.isArrayLiteralExpression(firstArg)) return;

    const elements = firstArg.getElements();
    if (elements.length === 0) return;
    const cmdNode = elements[0];
    // Le premier element doit etre un StringLiteral pour qu'on sache que c'est
    // un push Matomo (et pas un Array.prototype.push quelconque).
    if (cmdNode.getKind() !== SyntaxKind.StringLiteral) return;
    const cmdValue = (
      cmdNode as unknown as { getLiteralValue(): string }
    ).getLiteralValue();

    if (EVENT_COMMANDS.has(cmdValue)) {
      // Event Matomo : on le normalise en category/action pour le docs pipeline.
      const method = `push:${cmdValue}`;
      let category: string;
      let action: string;
      let namePattern: string | null = null;

      if (cmdValue === "trackEvent") {
        category = elements[1] ? resolveExpression(elements[1]) ?? "<unknown>" : "<unknown>";
        action = elements[2] ? resolveExpression(elements[2]) ?? "<unknown>" : "<unknown>";
        namePattern = elements[3] ? resolveExpression(elements[3]) : null;
      } else {
        // Pour les autres events (trackSiteSearch, trackPageView, trackGoal, etc.)
        // on utilise une pseudo-category "_matomo:<cmd>" et on met le 1er arg en action.
        // Utiliser `_` comme separateur (pas `:`) pour que le split
        // category:action en aval ne confonde pas _matomo:cmd:action.
        category = `_matomo_${cmdValue}`;
        action = elements[1] ? resolveExpression(elements[1]) ?? "<dynamic>" : "<no-arg>";
        namePattern = elements[2] ? resolveExpression(elements[2]) : null;
      }

      events.push({
        category,
        action,
        name_pattern: namePattern,
        emit_function: findContainingFunctionName(node),
        file: relFile,
        line,
        enum_refs: [],
        tracking_method: method,
      });
    } else {
      // Commande de configuration (setReferrerUrl, AbTesting::create, opt-out, etc.)
      const argStrings = elements
        .slice(1)
        .map((e) => {
          const v = resolveExpression(e);
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

events.sort(
  (a, b) =>
    a.category.localeCompare(b.category) ||
    a.action.localeCompare(b.action) ||
    a.file.localeCompare(b.file) ||
    a.line - b.line
);

const uniqueKeys = new Set(events.map((e) => `${e.category}:${e.action}`));

configCalls.sort(
  (a, b) =>
    a.command.localeCompare(b.command) ||
    a.file.localeCompare(b.file) ||
    a.line - b.line
);

const output = {
  generated_at: new Date().toISOString(),
  scan_root: path.relative(REPO_ROOT, FRONTEND_SRC),
  total_callsites: events.length,
  unique_events: uniqueKeys.size,
  unresolved_callsites: unresolvedCalls.length,
  events,
  unresolved: unresolvedCalls,
  matomo_config_calls: configCalls,
};

const outputPath = path.join(METABASE_DIR, "events/events.extracted.json");
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + "\n");

console.log(
  `[extract-events] ${events.length} callsites events, ${uniqueKeys.size} events uniques, ${unresolvedCalls.length} non-resolus, ${configCalls.length} commandes config`
);
console.log(`[extract-events] Ecrit: ${path.relative(REPO_ROOT, outputPath)}`);
