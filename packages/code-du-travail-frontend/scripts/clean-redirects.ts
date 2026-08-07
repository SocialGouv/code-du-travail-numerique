/**
 * This script clean the redirects.json file
 * To work, you need to download ingress log files of all redirections
 * https://grafana.fabrique.social.gouv.fr/explore?schemaVersion=1&panes=%7B%2252k%22:%7B%22datasource%22:%22P8E80F9AEF21F6940%22,%22queries%22:%5B%7B%22refId%22:%22A%22,%22expr%22:%22%7Bnamespace%3D%5C%22ingress-nginx%5C%22,%20cluster%3D%5C%22ovh-prod%5C%22%7D%20%7C%20json%20%7C%20vhost%20%3D%20%60code.travail.gouv.fr%60%20%7C%20status%20%3D%20%60308%60%20%7C%20path%20%21%3D%20%60%2Fwidget.html%60%22,%22queryType%22:%22range%22,%22datasource%22:%7B%22type%22:%22loki%22,%22uid%22:%22P8E80F9AEF21F6940%22%7D,%22editorMode%22:%22code%22%7D%5D,%22range%22:%7B%22from%22:%22now-6h%22,%22to%22:%22now%22%7D,%22panelsState%22:%7B%22logs%22:%7B%22columns%22:%7B%220%22:%22Time%22,%221%22:%22path%22,%222%22:%22http_referrer%22,%223%22:%22Line%22,%224%22:%22request_method%22%7D,%22visualisationType%22:%22table%22,%22labelFieldName%22:%22labels%22,%22refId%22:%22A%22%7D%7D%7D%7D&orgId=1
 *
 * To avoid freeze, split by days and download a file for each day.
 * Then copy all files in the logs folder.
 *
 * Now, you can run this script : pnpm clean:redirects
 * It will update the redirects.json file by removing outdated redirections
 */

import * as fs from "fs";
import * as path from "path";

interface LogEntry {
  fields: {
    path: string;
    http_user_agent: string;
    http_referrer?: string;
  };
}

interface Redirection {
  source: string;
  destination: string;
  permanent: boolean;
}

// Résolus depuis la racine du package : ce fichier est exécuté compilé depuis
// `dist/` (pnpm clean:redirects) mais lu depuis `scripts/` par les tests, et
// `__dirname` diffère donc entre les deux.
const PACKAGE_ROOT = path.join(__dirname, "..");
const LOG_DIR = path.join(PACKAGE_ROOT, "scripts", "logs");
const REDIRECTIONS_FILE = path.join(PACKAGE_ROOT, "redirects.json");

const exclusionSources = ["/widget.html", "/health"];
const botKeywords = [
  "bot",
  "crawl",
  "spider",
  "slurp",
  "bingbot",
  "googlebot",
  "yahoo",
  "baidu",
  "duckduckgo",
  "yandex",
  "applebot",
];

const readJsonFile = <T>(filePath: string): T => {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data) as T;
};

const excludedRedirects = (redirection: Redirection) =>
  exclusionSources.some((exclusion) => exclusion === redirection.source);

const extractMatchingLogs = (
  sourceRegex: RegExp,
  logs: LogEntry[]
): LogEntry[] => {
  return logs.filter(
    (log) =>
      sourceRegex.test(log.fields.path) &&
      !isBotUserAgent(log.fields.http_user_agent)
  );
};

const transformNextPatternToRegex = (pattern: string): RegExp => {
  let regexPattern = pattern.replace(/:([a-zA-Z]+)/g, "[^/]+");

  regexPattern = regexPattern.replace(/\\d/g, "[0-9]");

  return new RegExp(`^${regexPattern}$`);
};

const isBotUserAgent = (userAgent: string): boolean => {
  const lowerUserAgent = userAgent.toLowerCase();
  return botKeywords.some((keyword) => lowerUserAgent.includes(keyword));
};

export const extract = (redirection: Redirection, logs: LogEntry[]) => {
  const sourceRegex = transformNextPatternToRegex(redirection.source);

  return extractMatchingLogs(sourceRegex, logs);
};

const main = () => {
  const redirections: Redirection[] =
    readJsonFile<Redirection[]>(REDIRECTIONS_FILE);
  const initialRedirectCount = redirections.length;
  const logFiles = fs
    .readdirSync(LOG_DIR)
    .filter((file) => file.endsWith(".json"));

  // Sans logs, aucune redirection ne paraît utilisée et le fichier serait vidé
  // de bout en bout. On refuse d'écrire plutôt que de supprimer par erreur.
  if (logFiles.length === 0) {
    console.error(
      `Aucun fichier de logs dans ${LOG_DIR}. Téléchargez-les depuis Grafana (cf. en-tête de ce script) avant de relancer.\nredirects.json est laissé intact.`
    );
    process.exitCode = 1;
    return;
  }

  const allLogs = logFiles.flatMap((file) =>
    readJsonFile<LogEntry[]>(path.join(LOG_DIR, file))
  );

  console.log(`Perform on ${allLogs.length} logs`);

  const redirectionsWithData = redirections.map((redirection) => ({
    redirection,
    logs: extract(redirection, allLogs),
  }));

  const newRedirections = redirectionsWithData
    .filter(
      ({ logs, redirection }) =>
        excludedRedirects(redirection) || logs.length > 0
    )
    .map(({ redirection }) => ({ ...redirection }));

  fs.writeFileSync(REDIRECTIONS_FILE, JSON.stringify(newRedirections, null, 2));
  console.log(
    `Redirections supprimées : ${initialRedirectCount - newRedirections.length}. Il reste ${newRedirections.length} / ${initialRedirectCount} redirections`
  );
};

// Ne s'exécute qu'en invocation directe (`pnpm clean:redirects`). Le test
// importe `extract` depuis ce module : sans ce garde, l'import suffisait à
// lancer main() et à réécrire redirects.json.
if (require.main === module) {
  main();
}
