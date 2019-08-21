import Sentry from "@sentry/browser";
import getConfig from "next/config";

const {
  publicRuntimeConfig: { SENTRY_PUBLIC_DSN, PACKAGE_VERSION }
} = getConfig();

const isEnable = typeof window !== "undefined" && SENTRY_PUBLIC_DSN;

export function initializeSentry() {
  if (!isEnable) {
    return;
  }

  const packageVersion = PACKAGE_VERSION || "";
  // NOTE(douglasduteil): is pre production if we can find the version in the url
  // All "http://<version>.code-du-travail-numerique.[...].fr" are preprod
  // "http://code-du-travail-numerique.[...].fr" is prod
  const isPreProduction =
    packageVersion && /^v\d+-\d+-\d+/.test(location.hostname);
  const environment = isPreProduction ? "preproduction" : "production";
  Sentry.init({
    dsn: SENTRY_PUBLIC_DSN,
    debug: isPreProduction,
    environment,
    release: packageVersion
  });
}

export function notifySentry(statusCode, message) {
  if (!isEnable) {
    return;
  }

  Sentry.withScope(scope => {
    scope.setTag(`ssr`, false);
    Sentry.captureMessage(
      `Error ${statusCode}${message ? ` - ${message}` : ""}`,
      "error"
    );
  });
}
