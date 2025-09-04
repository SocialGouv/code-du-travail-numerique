export const COOKIE_BANNER_ENABLED = false;

export const COOKIE_BANNER_PATHS: string[] = [];

export const COOKIE_BANNER_PATHS_SET: Set<string> = new Set(
  COOKIE_BANNER_PATHS.map((path) =>
    path.trim().toLowerCase().replace(/\/+$/, "")
  )
);

export const shouldShowCookieBanner = (pathname: string): boolean => {
  if (!COOKIE_BANNER_ENABLED) {
    return false;
  }

  if (typeof pathname !== "string" || pathname.length > 2048) {
    return false;
  }

  if (pathname.startsWith("/widgets")) {
    return false;
  }

  if (COOKIE_BANNER_PATHS_SET.size === 0) {
    return true;
  }

  let normalizedPathname = pathname.split("?")[0].trim();
  while (normalizedPathname.endsWith("/")) {
    normalizedPathname = normalizedPathname.slice(0, -1);
  }
  normalizedPathname = normalizedPathname.toLowerCase();

  return COOKIE_BANNER_PATHS_SET.has(normalizedPathname);
};
