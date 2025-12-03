import { render, screen, within } from "@testing-library/react";
import { WhatIsNew } from "../WhatIsNew";
import type { WhatIsNewMonth } from "../queries";

const mockMonth: WhatIsNewMonth = {
  period: "10-2025",
  label: "Octobre 2025",
  shortLabel: "10/25",
  weeks: [
    {
      id: "w1",
      label: "Semaine 1",
      hasUpdates: false,
    },
    {
      id: "w2",
      label: "Semaine 2",
      hasUpdates: true,
      categories: [
        {
          kind: "evolution-juridique",
          label: "Évolution juridique",
          items: [
            {
              title: "Changement A",
              href: "/a",
              description: "Desc A",
            },
          ],
        },
        {
          kind: "mise-a-jour-fonctionnelle",
          label: "Mise à jour fonctionnelle",
          items: [
            {
              title: "Changement B",
              description: "Desc B",
            },
          ],
        },
      ],
    },
  ],
};

jest.mock("../queries", () => ({
  getPeriods: jest.fn(() => ["09-2025", "10-2025", "11-2025"]),
  fetchWhatIsNewMonth: jest.fn(async (_period: string) => mockMonth),
}));

jest.mock("../../layout/ContainerList", () => ({
  ContainerList: ({ children }: any) => (
    <div data-testid="container">{children}</div>
  ),
}));

jest.mock("../../layout/feedback", () => ({
  Feedback: () => <div data-testid="feedback" ></div>,
}));

jest.mock("next/link", () => {
  const Link = ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
  Link.displayName = "Link";
  return Link;
});

import { fetchWhatIsNewMonth } from "../queries";

describe("WhatIsNew – intégration complète avec fetchWhatIsNewMonth mocké", () => {
  let monthFromFetch: WhatIsNewMonth;

  beforeAll(async () => {
    monthFromFetch = (await fetchWhatIsNewMonth("10-2025")) as WhatIsNewMonth;
  });

  test("affiche le titre principal et le texte d’introduction", () => {
    render(<WhatIsNew month={monthFromFetch} />);

    expect(
      screen.getByRole("heading", {
        name: /Quoi de neuf sur le code du travail/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/modifications importantes du site/i)
    ).toBeInTheDocument();
  });

  test("affiche la navigation du haut et du bas", () => {
    render(<WhatIsNew month={monthFromFetch} />);

    const navs = screen.getAllByRole("navigation", {
      name: /Navigation entre les mois/,
    });
    expect(navs).toHaveLength(2);
  });

  test("la pagination affiche les mois du plus récent au plus ancien", () => {
    render(<WhatIsNew month={monthFromFetch} />);

    const navs = screen.getAllByRole("navigation", {
      name: /Navigation entre les mois/,
    });
    const topNav = navs[0];

    const monthLinks = within(topNav)
      .getAllByRole("link")
      .filter((el) => /^\d{2}\/\d{2}$/.test(el.textContent || ""));

    const labels = monthLinks.map((el) => el.textContent);
    expect(labels).toEqual(["11/25", "10/25", "09/25"]);
  });

  test("affiche les semaines et le message 'Aucune nouveauté cette semaine.' quand hasUpdates = false", () => {
    render(<WhatIsNew month={monthFromFetch} />);

    expect(screen.getByText("Semaine 1")).toBeInTheDocument();
    expect(
      screen.getByText("Aucune nouveauté cette semaine.")
    ).toBeInTheDocument();
  });

  test("affiche les catégories 'Évolution juridique' et 'Mise à jour fonctionnelle' pour les semaines avec mises à jour", () => {
    render(<WhatIsNew month={monthFromFetch} />);

    expect(screen.getByText("Semaine 2")).toBeInTheDocument();
    expect(screen.getByText("Évolution juridique")).toBeInTheDocument();
    expect(screen.getByText("Mise à jour fonctionnelle")).toBeInTheDocument();
  });

  test("affiche les items avec lien et sans lien dans les catégories", () => {
    render(<WhatIsNew month={monthFromFetch} />);

    const lienA = screen.getByRole("link", { name: /Changement A/i });
    expect(lienA).toHaveAttribute("href", "/a");

    expect(screen.getByText("Changement B")).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /Changement B/i })
    ).not.toBeInTheDocument();
  });

  test("affiche les descriptions des items", () => {
    render(<WhatIsNew month={monthFromFetch} />);

    expect(screen.getByText("Desc A")).toBeInTheDocument();
    expect(screen.getByText("Desc B")).toBeInTheDocument();
  });

  test("inclut le composant Feedback via le layout", () => {
    render(<WhatIsNew month={monthFromFetch} />);

    expect(screen.getByTestId("feedback")).toBeInTheDocument();
  });
});
