export const COOKIE_BANNER_ENABLED = false;

export const COOKIE_BANNER_PATHS: string[] = [];

export const COOKIE_BANNER_PATHS_SET: Set<string> = new Set(
  COOKIE_BANNER_PATHS.length > 0
    ? COOKIE_BANNER_PATHS.map((path) => {
        let normalizedPath = path.trim().toLowerCase();
        while (normalizedPath.endsWith("/")) {
          normalizedPath = normalizedPath.slice(0, -1);
        }
        return normalizedPath;
      })
    : []
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

  return COOKIE_BANNER_PATHS_SET.has(pathname);
};
