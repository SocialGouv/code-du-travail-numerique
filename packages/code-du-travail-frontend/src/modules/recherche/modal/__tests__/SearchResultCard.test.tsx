import { render, screen } from "@testing-library/react";
import { SearchResultCard } from "../SearchResultCard";
import { SearchInput } from "../SearchInput";

describe("SearchResultCard", () => {
  it("renders badge before title in DOM (badge first, title second)", () => {
    const result = {
      title: "Mon titre",
      slug: "mon-slug",
      source: "code_du_travail",
      cdtnId: "1",
    } as any;

    const { container } = render(<SearchResultCard result={result} />);

    const nodes = Array.from(container.querySelectorAll("span"));
    expect(nodes).toHaveLength(2);
    expect(nodes[0]?.textContent).toBe("CODE DU TRAVAIL");
    expect(nodes[1]?.textContent).toBe("Mon titre");
  });

  it("search input exposes a single accessible label (no duplicated labels)", () => {
    // This is a regression test for the modal search input:
    // the visible label is outside of DSFR Input, so DSFR must not add an extra
    // associated label (otherwise the input ends up with 2 labels).
    //
    // We mount the modal SearchInput and assert the combobox accessible name does
    // not contain duplicated label text (regression for DSFR Input adding its own
    // associated label on top of the external one).
    render(
      <SearchInput
        onChangeQuery={() => {}}
        hasSearched={false}
        resultsCount={0}
        contextType="modal"
      />
    );

    const input = screen.getByRole("combobox");

    expect(input).toHaveAccessibleName(/rechercher/i);
  });
});
