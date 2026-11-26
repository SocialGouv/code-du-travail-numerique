import { fireEvent, render, screen } from "@testing-library/react";
import Link from "../Link";

const mockBaseLink = jest.fn();

jest.mock("next/link", () => {
  const React = require("react");
  const MockBaseLink = React.forwardRef(
    (
      { prefetch, href, ...rest }: Record<string, unknown>,
      ref: React.Ref<HTMLAnchorElement>
    ) => {
      mockBaseLink({ prefetch });
      return <a ref={ref} href={href as string} {...rest} />;
    }
  );
  MockBaseLink.displayName = "MockBaseLink";
  return {
    __esModule: true,
    default: MockBaseLink,
  };
});

const lastPrefetch = () => mockBaseLink.mock.calls.at(-1)?.[0].prefetch;

describe("<Link />", () => {
  beforeEach(() => {
    mockBaseLink.mockClear();
  });

  test("does not prefetch before any user intent", () => {
    render(<Link href="/fiche">Fiche</Link>);
    expect(lastPrefetch()).toBe(false);
  });

  test.each([
    ["mouseEnter", fireEvent.mouseEnter],
    ["touchStart", fireEvent.touchStart],
    ["focus", fireEvent.focus],
  ])("enables the default prefetch on %s", (_, fire) => {
    render(<Link href="/fiche">Fiche</Link>);
    fire(screen.getByText("Fiche"));
    expect(lastPrefetch()).toBeNull();
  });

  test("keeps an explicit prefetch value", () => {
    render(
      <Link href="/fiche" prefetch={true}>
        Fiche
      </Link>
    );
    expect(lastPrefetch()).toBe(true);
    fireEvent.mouseEnter(screen.getByText("Fiche"));
    expect(lastPrefetch()).toBe(true);
  });

  test("calls the handlers given by the caller", () => {
    const onMouseEnter = jest.fn();
    const onTouchStart = jest.fn();
    const onFocus = jest.fn();
    render(
      <Link
        href="/fiche"
        onMouseEnter={onMouseEnter}
        onTouchStart={onTouchStart}
        onFocus={onFocus}
      >
        Fiche
      </Link>
    );
    const link = screen.getByText("Fiche");
    fireEvent.mouseEnter(link);
    fireEvent.touchStart(link);
    fireEvent.focus(link);
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
    expect(onTouchStart).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  test("adds the new window mention to the title of external links", () => {
    render(
      <Link href="https://example.org" target="_blank">
        Example
      </Link>
    );
    expect(screen.getByText("Example").getAttribute("title")).toBe(
      "Example - nouvelle fenêtre"
    );
  });
});
