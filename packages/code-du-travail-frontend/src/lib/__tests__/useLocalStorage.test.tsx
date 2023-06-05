import { act, render } from "@testing-library/react";
import React from "react";

import { useLocalStorage } from "../useLocalStorage";

function renderApp(key, initialValue) {
  function App() {
    const [value, setValue] = useLocalStorage(key, initialValue);
    return (
      <div data-testid="container">
        <p data-testid="value">{value}</p>
        <button data-testid="button" onClick={() => setValue("updated!")}>
          udpate
        </button>
      </div>
    );
  }

  return render(<App />);
}

describe("useLocalStorage", () => {
  it("initializes value", () => {
    const { getByTestId } = renderApp("foo", "hello cdtn");
    const valueElement = getByTestId("value");
    expect(valueElement.innerHTML).toBe("hello cdtn");
  });
  it("updates value", () => {
    const { getByTestId } = renderApp("foo", "bar");
    act(() => {
      getByTestId("button").click();
    });
    const valueElement = getByTestId("value");
    expect(valueElement.innerHTML).toBe("updated!");
  });
});
