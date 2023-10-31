/*global tarteaucitron, ga, Shareaholic, stLight, clicky, top, google, Typekit, FB, ferankReady, IN, stButtons, twttr, PCWidget*/
/*jslint regexp: true, nomen: true*/
tarteaucitron.services.adform = {
  key: "adform",
  type: "analytic",
  name: "Adform",
  uri: "https://site.adform.com/privacy-center/overview",
  needConsent: true,
  cookies: [],
  js: function () {
    "use strict";
    window.dataLayer = window.dataLayer || [];
    tarteaucitron.user.adftrackMore();
  },
};
