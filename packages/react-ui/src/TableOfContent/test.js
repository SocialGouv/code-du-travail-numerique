import React from "react";
import { render } from "@testing-library/react";
import { TableOfContent } from ".";

describe("<TableOfContent />", () => {
  const observeMock = jest.fn();
  const disconnectMock = jest.fn();
  beforeAll(() => {
    global.IntersectionObserver = () => ({
      observe: observeMock,
      disconnect: disconnectMock,
    });
  });
  beforeEach(() => {
    observeMock.mockClear();
    disconnectMock.mockClear();
  });

  it("renders with nav items", () => {
    expect(observeMock.mock.calls.length).toBe(0);
    const { container, unmount } = render(
      <>
        <TableOfContent ids={["it-works-1", "it-works-2"]} />
        <h3 id="it-works-1">This should appear inside the table of content</h3>
        <h2 id="it-works-2" data-short-title="this should appear">
          This text should not appear inside the table of content, its
          data-short-title attribute should.
        </h2>
      </>
    );
    expect(container).toMatchSnapshot();
    expect(observeMock.mock.calls.length).toBe(2);
    expect(disconnectMock.mock.calls.length).toBe(0);
    unmount();
    expect(disconnectMock.mock.calls.length).toBe(1);
  });
  it("renders without nav items", () => {
    const { container } = render(<TableOfContent ids={["dumb-id"]} />);
    expect(container).toMatchSnapshot();
  });
});
