import { URL_TRACKED } from ".";

export const trackUrl = async (path: string): Promise<void> => {
  if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
    const isConsent = /tarteaucitron=!gtag=true/.test(document.cookie);
    const findUrl = URL_TRACKED.find((urlTracked) => urlTracked.url === path);
    if (isConsent && findUrl) {
      window.gtag("event", "conversion", {
        allow_custom_scripts: true,
        send_to: `DC-3048978/emplo253/${findUrl.type}+unique`,
        u1: `${window.location.origin}${findUrl.url}`,
      });
    }
  }
};
