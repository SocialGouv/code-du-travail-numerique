/*global tarteaucitron, ga, Shareaholic, stLight, clicky, top, google, Typekit, FB, ferankReady, IN, stButtons, twttr, PCWidget*/
/*jslint regexp: true, nomen: true*/
// google analytics
tarteaucitron.services._adftrack = {
  key: "_adftrack",
  type: "analytic",
  name: "Google Analytics",
  uri: "https://support.google.com/analytics/answer/6004245",
  needConsent: true,
  js: function () {
    "use strict";
    window.dataLayer = window.dataLayer || [];
    tarteaucitron.addScript(
      "https://s2.adform.net/banners/scripts/st/trackpoint-async.js",
      "",
      function () {
        if (typeof tarteaucitron.user.adftrackMore === "function") {
          tarteaucitron.user.adftrackMore();
        }
      }
    );
  },
};
