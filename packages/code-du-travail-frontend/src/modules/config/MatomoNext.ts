interface HTMLTrustedScriptElement extends Omit<HTMLScriptElement, "src"> {
  src: TrustedScriptURL | string;
}

interface InitSettings {
  url: string;
  siteId: string;
  jsTrackerFile?: string;
  phpTrackerFile?: string;
  excludeUrlsPatterns?: RegExp[];
  disableCookies?: boolean;
  onRouteChangeStart?: (path: string) => void;
  onRouteChangeComplete?: (path: string) => void;
  onInitialization?: () => void;
  onScriptLoadingError?: () => void;
  nonce?: string;
  trustedPolicyName?: string;
  logExcludedTracks?: boolean;
}

// to push custom events
export function push(
  args: (
    | Dimensions
    | number[]
    | string[]
    | number
    | string
    | null
    | undefined
  )[]
): void {
  if (!window._paq) {
    window._paq = [];
  }
  window._paq.push(args);
}

const trustedPolicyHooks: TrustedTypePolicyOptions = {
  createScript: (s) => s,
  createScriptURL: (s) => s,
};

// initialize the tracker
export function init({
  url,
  siteId,
  jsTrackerFile = "matomo.js",
  phpTrackerFile = "matomo.php",
  disableCookies = false,
  onInitialization = undefined,
  onScriptLoadingError = undefined,
  nonce,
  trustedPolicyName = "matomo-next",
}: InitSettings): void {
  window._paq = window._paq !== null ? window._paq : [];
  if (!url) {
    console.warn("Matomo disabled, please provide matomo url");
    return;
  }

  const sanitizer =
    window.trustedTypes?.createPolicy(trustedPolicyName, trustedPolicyHooks) ??
    trustedPolicyHooks;

  if (onInitialization) onInitialization();

  if (disableCookies) {
    push(["disableCookies"]);
  }

  push(["enableLinkTracking"]);
  push(["setTrackerUrl", `${url}/${phpTrackerFile}`]);
  push(["setSiteId", siteId]);

  const scriptElement: HTMLTrustedScriptElement =
    document.createElement("script");
  const refElement = document.getElementsByTagName("script")[0];
  if (nonce) {
    scriptElement.setAttribute("nonce", nonce);
  }
  scriptElement.type = "text/javascript";
  scriptElement.async = true;
  scriptElement.defer = true;
  const fullUrl = `${url}/${jsTrackerFile}`;
  scriptElement.src = sanitizer.createScriptURL?.(fullUrl) ?? fullUrl;
  if (onScriptLoadingError) {
    scriptElement.onerror = () => {
      onScriptLoadingError();
    };
  }
  if (refElement.parentNode) {
    refElement.parentNode.insertBefore(scriptElement, refElement);
  }
}

export default init;
