/*global tarteaucitron, ga, Shareaholic, stLight, clicky, top, google, Typekit, FB, ferankReady, IN, stButtons, twttr, PCWidget*/
/*jslint regexp: true, nomen: true*/
// google analytics
tarteaucitron.services.gtag = {
  key: "gtag",
  type: "analytic",
  name: "Google Analytics (gtag.js)",
  uri: "https://support.google.com/analytics/answer/6004245",
  needConsent: true,
  cookies: (function() {
    // Add _gat_gtag_UA_XXXXXXX_XX cookie to cookies array
    var gatGtagUaCookie = "_gat_gtag_" + tarteaucitron.user.gtagUa;
    gatGtagUaCookie = gatGtagUaCookie.replace(/-/g, "_");
    return [
      "_ga",
      "_gat",
      "_gid",
      "__utma",
      "__utmb",
      "__utmc",
      "__utmt",
      "__utmz",
      gatGtagUaCookie
    ];
  })(),
  js: function() {
    "use strict";
    window.dataLayer = window.dataLayer || [];
    tarteaucitron.addScript(
      "https://www.googletagmanager.com/gtag/js?id=" +
        tarteaucitron.user.gtagUa,
      "",
      function() {
        window.gtag = function gtag() {
          dataLayer.push(arguments);
        };
        gtag("js", new Date());
        gtag("config", tarteaucitron.user.gtagUa);
        if (typeof tarteaucitron.user.gtagMore === "function") {
          tarteaucitron.user.gtagMore();
        }
      }
    );
  }
};