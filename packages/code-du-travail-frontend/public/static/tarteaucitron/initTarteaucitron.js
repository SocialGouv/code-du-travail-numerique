/* globals tarteaucitron */
var currentLanguage = document.documentElement.lang;
window.tarteaucitronForceLanguage = currentLanguage;

tarteaucitron.init({
  privacyUrl: "/politique-confidentialite#cookie" /* Privacy policy url */,
  hashtag: "#tarteaucitron" /* Open the panel with this hashtag */,
  cookieName: "tarteaucitron" /* Cookie name */,
  orientation: "bottom" /* Banner position (top - bottom) */,
  showAlertSmall: false /* Show the small banner on bottom right */,
  cookieslist: false /* Show the cookie list */,
  adblocker: false /* Show a Warning if an adblocker is detected */,
  AcceptAllCta: true /* Show the accept all button when highPrivacy on */,
  highPrivacy: true /* Disable auto consent */,
  handleBrowserDNTRequest: false /* If Do Not Track == 1, disallow all */,
  removeCredit: true /* Remove credit link */,
  moreInfoLink: true /* Show more info link */,
  useExternalCss: false /* If false, the tarteaucitron.css file will be loaded */,
  readmoreLink:
    "/politique-confidentialite#cookie" /* Change the default readmore link */
});
tarteaucitron.user.gtagUa = "DC-3048978";
tarteaucitron.user.gtagMore = function() {
  gtag("event", "conversion", {
    allow_custom_scripts: true,
    u1: location.pathname,
    send_to: "DC-3048978/emplo253/lpcodet+unique"
  });
};
(tarteaucitron.job = tarteaucitron.job || []).push("gtag");
	