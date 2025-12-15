import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SearchModalProvider, useSearchModal } from "../SearchModalContext";

const TestConsumer = () => {
  const { isOpen, openModal, closeModal } = useSearchModal();

  return (
    <div>
      <button onClick={openModal}>Open</button>
      <button onClick={closeModal}>Close</button>
      <div>{isOpen ? "OPEN" : "CLOSED"}</div>
    </div>
  );
};

const FocusConsumer = ({ id }: { id: string }) => {
  const { isOpen, openModal } = useSearchModal();

  return (
    <div>
      <button onClick={openModal}>Open focus</button>
      {isOpen && <input id={id} data-testid="modal-input" />}
    </div>
  );
};

describe("SearchModalContext", () => {
  it("openModal toggles isOpen to true", () => {
    render(
      <SearchModalProvider>
        <TestConsumer />
      </SearchModalProvider>
    );

    expect(screen.getByText("CLOSED")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Open$/ }));

    expect(screen.getByText("OPEN")).toBeInTheDocument();
  });

  it("openModal focuses the modal search autocomplete input when mounted", async () => {
    render(
      <SearchModalProvider>
        <FocusConsumer id="search-modal-autocomplete" />
      </SearchModalProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: /Open focus/ }));

    await waitFor(
      () => expect(screen.getByTestId("modal-input")).toHaveFocus(),
      { timeout: 1000 }
    );
  });

  it("openModal focuses the search-modal-autocomplete input when mounted (alternate id)", async () => {
    render(
      <SearchModalProvider>
        <FocusConsumer id="search-modal-autocomplete" />
      </SearchModalProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: /Open focus/ }));

    await waitFor(
      () => expect(screen.getByTestId("modal-input")).toHaveFocus(),
      {
        timeout: 1000,
      }
    );
  });
});
