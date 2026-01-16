import React from "react";
import { render } from "@testing-library/react";
import {
  BreadcrumbListJsonLd,
  GovernmentOrganizationJsonLd,
  HowToJsonLd,
  LegislationJsonLd,
  WebSiteJsonLd,
  JSON_LD_IDS,
} from "../index";
import { NonceProvider } from "../../../config/NonceContext";
import { usePathname } from "next/navigation";

describe("jsonld components", () => {
  it("GovernmentOrganizationJsonLd renders a JSON-LD script with nonce", () => {
    render(
      <NonceProvider nonce="unit-test-nonce">
        <GovernmentOrganizationJsonLd />
      </NonceProvider>
    );

    const script = document.querySelector(
      `script#${JSON_LD_IDS.organization}`
    ) as HTMLScriptElement | null;

    expect(script).not.toBeNull();
    expect(script?.type).toBe("application/ld+json");
    expect(script?.getAttribute("nonce")).toBe("unit-test-nonce");
  });

  it("WebSiteJsonLd renders a JSON-LD script", () => {
    render(<WebSiteJsonLd />);

    const script = document.querySelector(
      `script#${JSON_LD_IDS.website}`
    ) as HTMLScriptElement | null;

    expect(script).not.toBeNull();
    expect(script?.type).toBe("application/ld+json");
  });

  it("BreadcrumbListJsonLd uses current pathname", () => {
    (usePathname as unknown as jest.Mock).mockReturnValue("/une-page");
    render(
      <BreadcrumbListJsonLd
        currentPageLabel="Une page"
        items={[{ label: "Section", href: "/section" }]}
      />
    );

    const script = document.querySelector(
      `script#${JSON_LD_IDS.breadcrumbs}`
    ) as HTMLScriptElement | null;

    expect(script?.textContent).toContain("/une-page");
  });

  it("HowToJsonLd renders a JSON-LD script", () => {
    render(
      <HowToJsonLd
        name="Simulateur"
        url="/outils/x"
        steps={["Étape 1", "Étape 2"]}
      />
    );

    const script = document.querySelector(
      `script#${JSON_LD_IDS.howTo}`
    ) as HTMLScriptElement | null;
    expect(script).not.toBeNull();
    expect(script?.textContent).toContain("HowTo");
  });

  it("LegislationJsonLd renders a JSON-LD script", () => {
    render(
      <LegislationJsonLd
        name="Article"
        url="/code-du-travail/l123"
        identifier="L123"
      />
    );

    const script = document.querySelector(
      `script#${JSON_LD_IDS.legislation}`
    ) as HTMLScriptElement | null;
    expect(script).not.toBeNull();
    expect(script?.textContent).toContain("Legislation");
  });
});
