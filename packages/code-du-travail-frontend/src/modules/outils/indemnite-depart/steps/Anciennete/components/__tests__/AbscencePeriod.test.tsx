import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import AbsencePeriod from "../AbsencePeriod";
import {
  motif1,
  motif2WithDate,
  sampleMotifs,
  sampleMotifsWithStartedDate,
} from "./AbscencePeriod.data";
import { AbsenceWithKey } from "../AbsencePeriods";

const absence: AbsenceWithKey = {
  key: "abc",
  motif: motif1,
};

describe("<AbsencePeriod />", () => {
  it("should render", () => {
    expect(
      render(
        <AbsencePeriod
          index={0}
          onSelectMotif={() => {}}
          onSetDurationDate={() => {}}
          onSetAbsenceDate={() => {}}
          motifs={[]}
          showDeleteButton={false}
          onDeleteAbsence={() => {}}
          informationData={{}}
          absence={absence}
        />
      )
    ).toBeTruthy();
  });

  it("should show all motifs with the first selected by default", () => {
    const { getByRole, getAllByRole } = render(
      <AbsencePeriod
        index={0}
        onSelectMotif={() => {}}
        onSetDurationDate={() => {}}
        onSetAbsenceDate={() => {}}
        motifs={sampleMotifs}
        showDeleteButton={false}
        onDeleteAbsence={() => {}}
        informationData={{}}
        absence={absence}
      />
    );
    expect(getAllByRole("option").length).toBe(sampleMotifs.length);
    // Motif 1 doit être sélectionné par défaut
    const motif1Option = getByRole("option", {
      name: "Motif 1",
    }) as HTMLOptionElement;
    expect(motif1Option).toBeInTheDocument();
    expect(motif1Option.selected).toBe(true);
    const motif2Option = getByRole("option", {
      name: "Motif 2",
    }) as HTMLOptionElement;
    expect(motif2Option).toBeInTheDocument();
    expect(motif2Option.selected).toBe(false);
  });

  it("should not show the delete button", () => {
    const { queryByRole } = render(
      <AbsencePeriod
        index={0}
        onSelectMotif={() => {}}
        onSetDurationDate={() => {}}
        onSetAbsenceDate={() => {}}
        motifs={sampleMotifs}
        showDeleteButton={false}
        onDeleteAbsence={() => {}}
        informationData={{}}
        absence={absence}
      />
    );
    expect(
      queryByRole("button", { name: /supprimer/i })
    ).not.toBeInTheDocument();
  });

  it("should show the delete button", () => {
    const { getByRole } = render(
      <AbsencePeriod
        index={0}
        onSelectMotif={() => {}}
        onSetDurationDate={() => {}}
        onSetAbsenceDate={() => {}}
        motifs={sampleMotifs}
        showDeleteButton={true}
        onDeleteAbsence={() => {}}
        informationData={{}}
        absence={absence}
      />
    );
    expect(getByRole("button", { name: /supprimer/i })).toBeInTheDocument();
  });

  it("should show the absence date field when user selected Motif 2", () => {
    const { getByRole, getByTestId } = render(
      <AbsencePeriod
        index={0}
        onSelectMotif={() => {}}
        onSetDurationDate={() => {}}
        onSetAbsenceDate={() => {}}
        motifs={sampleMotifsWithStartedDate}
        showDeleteButton={false}
        onDeleteAbsence={() => {}}
        informationData={{}}
        absence={{
          ...absence,
          motif: motif1,
        }}
      />
    );

    userEvent.selectOptions(
      getByRole("combobox"),
      getByRole("option", { name: "Motif 2" })
    );
    expect(getByTestId("absence-date-0")).toBeInTheDocument();
  });

  it("should show the absence date field if selected motif required date", () => {
    const { getByRole, getByTestId } = render(
      <AbsencePeriod
        index={0}
        onSelectMotif={() => {}}
        onSetDurationDate={() => {}}
        onSetAbsenceDate={() => {}}
        motifs={sampleMotifsWithStartedDate}
        showDeleteButton={false}
        onDeleteAbsence={() => {}}
        absence={{
          ...absence,
          motif: motif2WithDate,
          durationInMonth: 4,
          startedAt: "01/01/2021",
        }}
        informationData={{}}
      />
    );
    expect(
      (
        getByRole("option", {
          name: "Motif 2",
        }) as HTMLOptionElement
      ).selected
    ).toBe(true);
    expect(getByTestId("absence-date-0")).toBeInTheDocument();
  });

  it("should call callbacks on user actions", () => {
    const onSelectModifMock = jest.fn();
    const onSetDurationDate = jest.fn();
    const onSetAbsenceDate = jest.fn();
    const onDeleteAbsence = jest.fn();
    const { getByRole, getByTestId } = render(
      <AbsencePeriod
        index={0}
        onSelectMotif={onSelectModifMock}
        onSetDurationDate={onSetDurationDate}
        onSetAbsenceDate={onSetAbsenceDate}
        motifs={sampleMotifsWithStartedDate}
        showDeleteButton={true}
        onDeleteAbsence={onDeleteAbsence}
        informationData={{}}
        absence={absence}
      />
    );
    userEvent.selectOptions(
      getByRole("combobox"),
      getByRole("option", { name: "Motif 2" })
    );
    expect(onSelectModifMock.mock.calls.length).toBe(1);
    expect(onSetDurationDate.mock.calls.length).toBe(0);
    userEvent.type(getByTestId("absence-duree-0"), "5");
    expect(onSetDurationDate.mock.calls.length).toBeGreaterThan(0);
    expect(onSetAbsenceDate.mock.calls.length).toBe(0);
    userEvent.type(getByTestId("absence-date-0"), "2024-01-01");
    expect(onSetAbsenceDate.mock.calls.length).toBeGreaterThan(0);
    expect(onDeleteAbsence.mock.calls.length).toBe(0);
    userEvent.click(getByRole("button", { name: /supprimer/i }));
    expect(onDeleteAbsence.mock.calls.length).toBe(1);
  });
});
