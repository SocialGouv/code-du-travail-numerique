/*global tarteaucitron, ga, Shareaholic, stLight, clicky, top, google, Typekit, FB, ferankReady, IN, stButtons, twttr, PCWidget*/
/*jslint regexp: true, nomen: true*/

// generic iframe
tarteaucitron.services.iframe = {
  key: "iframe",
  type: "other",
  name: "Web content",
  uri: "",
  needConsent: true,
  cookies: [],
  js: function() {
    "use strict";
    tarteaucitron.fallback(["tac_iframe"], function(x) {
      var width = x.getAttribute("width"),
        height = x.getAttribute("height"),
        url = x.getAttribute("data-url");

      return (
        '<iframe src="' +
        url +
        '" width="' +
        width +
        '" height="' +
        height +
        '" frameborder="0" scrolling="no" allowtransparency allowfullscreen></iframe>'
      );
    });
  },
  fallback: function() {
    "use strict";
    var id = "iframe";
    tarteaucitron.fallback(["tac_iframe"], function(elem) {
      elem.style.width = elem.getAttribute("width") + "px";
      elem.style.height = elem.getAttribute("height") + "px";
      return tarteaucitron.engage(id);
    });
  }
};

// google analytics multiple
tarteaucitron.services.multiplegtag = {
  key: "multiplegtag",
  type: "analytic",
  name: "Google Analytics (gtag.js)",
  uri: "https://support.google.com/analytics/answer/6004245",
  needConsent: true,
  cookies: (function() {
    var cookies = [
      "_ga",
      "_gat",
      "_gid",
      "__utma",
      "__utmb",
      "__utmc",
      "__utmt",
      "__utmz"
    ];

    if (tarteaucitron.user.multiplegtagUa !== undefined) {
      tarteaucitron.user.multiplegtagUa.forEach(function(ua) {
        cookies.push("_gat_gtag_" + ua.replace(/-/g, "_"));
      });
    }

    return cookies;
  })(),
  js: function() {
    "use strict";
    window.dataLayer = window.dataLayer || [];

    tarteaucitron.user.multiplegtagUa.forEach(function(ua) {
      tarteaucitron.addScript(
        "https://www.googletagmanager.com/gtag/js?id=" + ua,
        "",
        function() {
          window.gtag = function gtag() {
            dataLayer.push(arguments);
          };
          gtag("js", new Date());
          gtag("config", ua);
        }
      );
    });
  }
};
