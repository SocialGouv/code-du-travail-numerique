type CookieConfig = {
  heatmap: boolean;
  ads: boolean;
  paths?: string[];
};

export const COOKIE_CONFIG: CookieConfig = {
  heatmap: true,
  ads: false,
  paths: [
    "/",
    "/infographie",
    "/infographie/licenciement-pour-inaptitude-medicale",
    "/infographie/rupture-conventionnelle-les-etapes-de-la-procedure-et-les-delais",
  ],
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

const isEnabledForPath = (pathname: string, config: CookieConfig): boolean => {
  if (typeof pathname !== "string" || pathname.length > 2048) {
    return false;
  }

  if (pathname.startsWith("/widgets")) {
    return false;
  }

  if (!config.paths || config.paths.length === 0) {
    return true;
  }

  return config.paths.some((path) => path === pathname);
};
