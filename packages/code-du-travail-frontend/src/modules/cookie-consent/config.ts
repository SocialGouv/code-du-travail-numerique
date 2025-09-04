export const COOKIE_BANNER_ENABLED = false;

export const COOKIE_BANNER_PATHS: string[] = [];

export const shouldShowCookieBanner = (pathname: string): boolean => {
  if (!COOKIE_BANNER_ENABLED) {
    return false;
  }

  if (pathname.startsWith("/widgets")) {
    return false;
  }

  if (COOKIE_BANNER_PATHS.length === 0) {
    return true;
  }

  return COOKIE_BANNER_PATHS.some((path) => {
    const normalizedConfigPath = path.replace(/\/+$/, "");
    const normalizedCurrentPath = pathname.replace(/\/+$/, "");

    return normalizedCurrentPath === normalizedConfigPath;
  });
};
