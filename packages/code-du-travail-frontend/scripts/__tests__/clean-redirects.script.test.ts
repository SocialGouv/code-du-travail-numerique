import { extract } from "../clean-redirects";

describe("Clean redirects file", () => {
  it("should detect basic redirection in logs", () => {
    const redirection = {
      source:
        "/fiche-service-public/regles-de-licenciement-dans-une-entreprise-en-difficulte",
      permanent: true,
      destination:
        "/fiche-service-public/licenciement-dans-une-entreprise-en-difficulte-quelles-sont-les-regles",
    };
    const logs = [
      {
        fields: {
          http_user_agent: "",
          path: "/fiche-service-public/regles-de-licenciement-dans-une-entreprise-en-difficulte",
        },
      },
    ];
    const result = extract(redirection, logs);
    expect(result).toEqual(logs);
  });

  it("should detect specific next.js redirection in logs", () => {
    const redirection = {
      source: "/contribution/1740-:slug",
      permanent: true,
      destination: "/contribution/:slug",
    };
    const logs = [
      {
        fields: {
          http_user_agent: "",
          path: "/contribution/1740-test",
        },
      },
      {
        fields: {
          http_user_agent: "",
          path: "/contribution/1740",
        },
      },

      {
        fields: {
          http_user_agent: "",
          path: "/contribution/test",
        },
      },
    ];
    const result = extract(redirection, logs);
    expect(result).toEqual([logs[0]]);
  });

  it("should detect specific next.js redirection with regex in logs", () => {
    const redirection = {
      source: "/convention-collective/(0172|172(?:-[a-z0-9-]+)?)",
      destination:
        "/convention-collective/158-travail-mecanique-du-bois-des-scieries-du-negoce-et-de-limportation-des-b",
      permanent: true,
    };
    const logs = [
      {
        fields: {
          http_user_agent: "",
          path: "/convention-collective/0172",
        },
      },
      {
        fields: {
          http_user_agent: "",
          path: "/convention-collective/172-old",
        },
      },
      {
        fields: {
          http_user_agent: "",
          path: "/convention-collective/172",
        },
      },

      {
        fields: {
          http_user_agent: "",
          path: "/convention-collective/not-expected",
        },
      },
      {
        fields: {
          http_user_agent: "",
          path: "/convention-collective/0172-not-expected",
        },
      },
    ];
    const result = extract(redirection, logs);
    expect(result).toEqual([logs[0], logs[1], logs[2]]);
  });

  it("should detect specific next.js redirection with custom regex in logs", () => {
    const redirection = {
      destination: "/themes/:slug",
      permanent: true,
      source: "/themes/(\\d{1,}-):slug",
    };
    const logs = [
      {
        fields: {
          http_user_agent: "",
          path: "/themes/1-theme",
        },
      },
      {
        fields: {
          http_user_agent: "",
          path: "/themes/10-theme",
        },
      },
      {
        fields: {
          http_user_agent: "",
          path: "/themes/-theme",
        },
      },
      {
        fields: {
          http_user_agent: "",
          path: "/themes/1theme",
        },
      },
      {
        fields: {
          http_user_agent: "",
          path: "/themes/theme",
        },
      },
    ];
    const result = extract(redirection, logs);
    expect(result).toEqual([logs[0], logs[1]]);
  });
});
