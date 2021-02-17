import { buildGetBreadcrumbs } from "../breadcrumbs";
import themes from "./breadcrumbs_data_test.json";

describe("build breadcrumbs", () => {
  const getBreadcrumb = buildGetBreadcrumbs(themes);

  const expectedBreadcrumb = [
    {
      label: "Départ de l’entreprise",
      position: 8,
      slug: "/themes/depart-de-lentreprise",
    },
    { label: "Retraite", position: 5, slug: "/themes/retraite" },
    {
      label: "Mise à la retraite",
      position: 1,
      slug: "/themes/mise-a-la-retraite",
    },
  ];

  test("should return the breadcrumb for a specific document", async () => {
    const breadcrumb = getBreadcrumb("a7a6ec976a");

    expect(breadcrumb.length).toBe(3);
    expect(breadcrumb).toStrictEqual(expectedBreadcrumb);
  });

  test("should return a the breadcrumb of the generic contribution for a specific contribution", async () => {
    const breadcrumb = getBreadcrumb("dbca50da87", { contributionIndex: 29 });

    expect(breadcrumb.length).toBe(3);
    expect(breadcrumb).toStrictEqual(expectedBreadcrumb);
  });
});
