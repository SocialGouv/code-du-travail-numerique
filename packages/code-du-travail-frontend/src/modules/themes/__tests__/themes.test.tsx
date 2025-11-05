import { getAllByRole, render } from "@testing-library/react";
import { Themes } from "../Themes";

afterEach(() => {
  jest.resetAllMocks();
});

const dataThemes = [
  {
    title: "Theme 1",
    icon: "",
    slug: "theme1",
    children: [
      {
        label: "children 1",
        slug: "children1_1",
      },
      {
        label: "children 2",
        slug: "children1_2",
      },
    ],
  },
  {
    title: "Theme 2",
    icon: "",
    slug: "theme2",
    children: [
      {
        label: "children 3",
        slug: "children2_3",
      },
      {
        label: "children 4",
        slug: "children2_4",
      },
    ],
  },
];

describe("<Themes />", () => {
  it("affiche la liste des thèmes principaux", () => {
    const { container } = render(<Themes themes={dataThemes} />, {
      legacyRoot: true,
    });
    const themesList = getAllByRole(container, "list")[1];
    const themes = getAllByRole(themesList, "listitem");
    expect(themes).toHaveLength(2);
    expect(getAllByRole(themes[0], "link")).toHaveLength(1);
    expect(getAllByRole(themes[0], "link")[0].getAttribute("href")).toEqual(
      "/themes/theme1"
    );

    expect(container).toMatchSnapshot();
  });
});
