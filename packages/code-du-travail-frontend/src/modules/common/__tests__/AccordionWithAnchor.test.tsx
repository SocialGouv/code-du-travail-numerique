import { render } from "@testing-library/react";
import { AccordionWithAnchor } from "../AccordionWithAnchor";

const sampleItems = [
  { title: "Title 1", id: "title-1", content: <p>Content 1</p> },
  {
    title: "Title 2",
    id: "title-2",
    content: <p>Content 2</p>,
  },
];
describe("<AccordionWithAnchor />", () => {
  test("if no items", () => {
    const { container } = render(<AccordionWithAnchor items={[]} />);
    expect(container).toMatchInlineSnapshot(`<div />`);
  });

  test("with items", () => {
    const { container } = render(
      <AccordionWithAnchor titleAs="h3" items={sampleItems} />
    );
    expect(container).toMatchSnapshot();
  });

  test("anchor is handle correctly", () => {
    Object.defineProperty(window, "location", {
      writable: true,
      value: {
        hash: "#title-2",
      },
    });
    const scrollIntoViewMock = jest.fn();
    Element.prototype.scrollIntoView = scrollIntoViewMock;

    const { getByText } = render(<AccordionWithAnchor items={sampleItems} />);

    // On a bien le bon accordéon déplié
    const title1Button = getByText("Title 1");
    expect(title1Button).toHaveAttribute("aria-expanded", "false");
    const title2Button = getByText("Title 2");
    expect(title2Button).toHaveAttribute("aria-expanded", "true");
    // On a bien scroll vers le bon accordéon
    expect(scrollIntoViewMock).toHaveBeenCalled();
    expect(scrollIntoViewMock.mock.instances[0]).toBe(title2Button);
  });
});
