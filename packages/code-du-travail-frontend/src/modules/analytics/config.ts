type CookieConfig = {
  heatmap: boolean;
  ads: boolean;
  paths?: string[];
};

export const COOKIE_CONFIG: CookieConfig = {
  heatmap: true,
  ads: false,
};

export const shouldShowCookieBanner = (pathname: string): boolean => {
  return (
    (COOKIE_CONFIG.ads || COOKIE_CONFIG.heatmap) &&
    isEnabledForPath(pathname, COOKIE_CONFIG)
  );
};

export const isHeatmapEnabled = (pathname?: string): boolean => {
  if (pathname) {
    return COOKIE_CONFIG.heatmap && isEnabledForPath(pathname, COOKIE_CONFIG);
  }
  return COOKIE_CONFIG.heatmap;
};

export const isAdsEnabled = (pathname?: string): boolean => {
  if (pathname) {
    return COOKIE_CONFIG.ads && isEnabledForPath(pathname, COOKIE_CONFIG);
  }
  return COOKIE_CONFIG.ads;
};

const normalizePathname = (pathname: string): string => {
  // Drop query/hash defensively (usePathname() should already do it, but keep it safe)
  const withoutQueryOrHash = pathname.split(/[?#]/)[0];

  // Remove trailing slashes except for the root path
  const trimmed = withoutQueryOrHash.replace(/\/+$/, "");

  return trimmed === "" ? "/" : trimmed;
};

const isEnabledForPath = (pathname: string, config: CookieConfig): boolean => {
  if (typeof pathname !== "string" || pathname.length > 2048) {
    return false;
  }

  const normalizedPathname = normalizePathname(pathname);

  if (normalizedPathname.startsWith("/widgets")) {
    return false;
  }

  if (!config.paths || config.paths.length === 0) {
    return true;
  }

  return config.paths.some(
    (path) => normalizePathname(path) === normalizedPathname
  );
};
