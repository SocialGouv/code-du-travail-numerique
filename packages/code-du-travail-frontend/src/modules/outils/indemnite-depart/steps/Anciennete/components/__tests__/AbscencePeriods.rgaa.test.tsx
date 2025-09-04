import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AbsencePeriods, { AbsenceWithKey } from "../AbsencePeriods";
import AbsencePeriod from "../AbsencePeriod";
import { Motif, MotifKeys } from "@socialgouv/modeles-social";
import { fr } from "@codegouvfr/react-dsfr";

// Mock external dependencies
jest.mock("@codegouvfr/react-dsfr/Button", () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));
jest.mock("@codegouvfr/react-dsfr/Select", () => ({
  Select: ({ label, nativeSelectProps, children }: any) => (
    <>
      <label htmlFor={nativeSelectProps.id}>{label}</label>
      <select {...nativeSelectProps}>{children}</select>
    </>
  ),
}));
jest.mock("@codegouvfr/react-dsfr/Input", () => ({
  Input: ({ label, nativeInputProps, stateRelatedMessage }: any) => (
    <>
      <label htmlFor={nativeInputProps.id}>{label}</label>
      <input {...nativeInputProps} />
      {stateRelatedMessage && <span>{stateRelatedMessage}</span>}
    </>
  ),
}));
jest.mock("../../../../../../common/Html", () => {
  const MockHtml = ({ children }: any) => <div>{children}</div>;
  MockHtml.displayName = "Html";
  return MockHtml;
});
jest.mock("../../../../../common/utils/input", () => ({
  preventScroll: jest.fn(),
  handleNumberInput: (e: any) => e.target.value,
}));

// Sample data for testing
const mockMotifs = [
  {
    key: MotifKeys.absenceInjustifiée,
    label: "Mock Motif 1",
    value: 1,
    startAt: () => false,
  },
  {
    key: MotifKeys.accidentTrajet,
    label: "Mock Motif 2",
    value: 1,
    startAt: () => true,
  },
] as Motif[];
const mockAbsences: AbsenceWithKey[] = [];
const mockInformationData = {};
const mockOnChange = jest.fn();

describe("AbsencePeriods Component - Accessibility and Error Handling Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Adds an empty <div aria-live="polite"> in the source code and generates status message inside it when global error occurs', async () => {
    const { rerender, container } = render(
      <AbsencePeriods
        onChange={mockOnChange}
        motifs={mockMotifs}
        absences={mockAbsences}
        informationData={mockInformationData}
      />
    );

    // Initially, the div is empty
    const politeDiv = container.querySelector(
      '[aria-live="polite"]'
    ) as HTMLElement;
    expect(politeDiv).toBeInTheDocument();
    expect(politeDiv).toHaveAttribute("aria-live", "polite");
    expect(politeDiv).toHaveClass("sr-only");
    expect(politeDiv).toHaveTextContent("");

    // Rerender with global error
    rerender(
      <AbsencePeriods
        onChange={mockOnChange}
        motifs={mockMotifs}
        absences={mockAbsences}
        informationData={mockInformationData}
        error={{ global: "Global error message" }}
      />
    );

    // Wait for useEffect to update textContent
    await waitFor(() => {
      expect(politeDiv).toHaveTextContent("Global error message");
    });
  });

  test("Displays global error message in a <p> inside the error container", () => {
    render(
      <AbsencePeriods
        onChange={mockOnChange}
        motifs={mockMotifs}
        absences={mockAbsences}
        informationData={mockInformationData}
        error={{ global: "Global error message" }}
      />
    );

    const errorContainer = screen.getByText("Global error message", {
      selector: "p",
    });
    expect(errorContainer.tagName).toBe("P");
  });
});

describe("AbsencePeriod Component - Accessibility and Error Handling Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Replaces <h3> with <p> for absence title", () => {
    render(
      <AbsencePeriod
        index={0}
        onSelectMotif={jest.fn()}
        onSetDurationDate={jest.fn()}
        onSetAbsenceDate={jest.fn()}
        onDeleteAbsence={jest.fn()}
        motifs={mockMotifs}
        absence={{
          key: "test-key",
          motif: mockMotifs[0],
          durationInMonth: undefined,
        }}
        showDeleteButton={false}
        informationData={mockInformationData}
      />
    );

    const titleElement = screen.getByText("Absence 1");
    expect(titleElement.tagName).toBe("LEGEND");
    expect(titleElement).toHaveClass(fr.cx("fr-text--bold", "fr-mb-1w"));
  });

  test("Adds aria-describedby to the duration field when error is present", () => {
    render(
      <AbsencePeriods
        onChange={mockOnChange}
        motifs={mockMotifs}
        absences={mockAbsences}
        informationData={mockInformationData}
        error={{ global: "Global error" }}
      />
    );

    const durationInput = screen.getByLabelText("Durée (en mois)");
    expect(durationInput).toHaveAttribute(
      "aria-describedby",
      "absence-total-error"
    );
  });

  test("Sets focus on the duration field of the first absence when global error is present", () => {
    render(
      <AbsencePeriods
        onChange={mockOnChange}
        motifs={mockMotifs}
        absences={mockAbsences}
        informationData={mockInformationData}
        error={{ global: "Global error" }}
      />
    );

    const durationInput = screen.getByLabelText("Durée (en mois)");
    expect(durationInput).toHaveFocus();
  });

  test("Does not set focus when no global error", () => {
    render(
      <AbsencePeriods
        onChange={mockOnChange}
        motifs={mockMotifs}
        absences={mockAbsences}
        informationData={mockInformationData}
      />
    );

    const durationInput = screen.getByLabelText("Durée (en mois)");
    expect(durationInput).not.toHaveFocus();
  });
});
