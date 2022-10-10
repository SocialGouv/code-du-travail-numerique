import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import AbsencePeriod from "../AbsencePeriod";
import {
  motif2WithDate,
  sampleMotifs,
  sampleMotifsWithStartedDate,
} from "./AbscencePeriod.data";

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
      />
    );
    expect(getByRole("button", { name: /supprimer/i })).toBeInTheDocument();
  });

  it("should show the absence date field when user selected Motif 2", () => {
    const { getByRole } = render(
      <AbsencePeriod
        index={0}
        onSelectMotif={() => {}}
        onSetDurationDate={() => {}}
        onSetAbsenceDate={() => {}}
        motifs={sampleMotifsWithStartedDate}
        showDeleteButton={false}
        onDeleteAbsence={() => {}}
        informationData={{}}
      />
    );
    userEvent.selectOptions(
      getByRole("combobox"),
      getByRole("option", { name: "Motif 2" })
    );
    expect(
      (
        getByRole("option", {
          name: "Motif 2",
        }) as HTMLOptionElement
      ).selected
    ).toBe(true);
    expect(getByRole("textbox", { name: "0.dateAbsence" })).toBeInTheDocument();
  });

  it("should show the absence date field if selected motif required date", () => {
    const { getByRole } = render(
      <AbsencePeriod
        index={0}
        onSelectMotif={() => {}}
        onSetDurationDate={() => {}}
        onSetAbsenceDate={() => {}}
        motifs={sampleMotifsWithStartedDate}
        showDeleteButton={false}
        onDeleteAbsence={() => {}}
        absence={{
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
    expect(getByRole("textbox", { name: "0.dateAbsence" })).toBeInTheDocument();
  });

  it("should call callbacks on user actions", () => {
    const onSelectModifMock = jest.fn();
    const onSetDurationDate = jest.fn();
    const onSetAbsenceDate = jest.fn();
    const onDeleteAbsence = jest.fn();
    const { getByRole } = render(
      <AbsencePeriod
        index={0}
        onSelectMotif={onSelectModifMock}
        onSetDurationDate={onSetDurationDate}
        onSetAbsenceDate={onSetAbsenceDate}
        motifs={sampleMotifsWithStartedDate}
        showDeleteButton={true}
        onDeleteAbsence={onDeleteAbsence}
        informationData={{}}
      />
    );
    userEvent.selectOptions(
      getByRole("combobox"),
      getByRole("option", { name: "Motif 2" })
    );
    expect(onSelectModifMock.mock.calls.length).toBe(1);
    userEvent.type(getByRole("spinbutton", { name: "0.duration" }), "5");
    expect(onSetDurationDate.mock.calls.length).toBe(1);
    userEvent.type(
      getByRole("textbox", { name: "0.dateAbsence" }),
      "01/01/2020"
    );
    expect(onSetAbsenceDate.mock.calls.length).toBe(10);
    userEvent.click(getByRole("button", { name: /supprimer/i }));
    expect(onDeleteAbsence.mock.calls.length).toBe(1);
  });
});
