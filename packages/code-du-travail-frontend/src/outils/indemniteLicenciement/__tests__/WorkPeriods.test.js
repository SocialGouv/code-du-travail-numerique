import React from "react";
import { render } from "react-testing-library";
import { WorkPeriods } from "../WorkPeriods";

describe("<WorkPeriods />", () => {
  it("should render", () => {
    const periods = [
      { uid: "1", salaire: "1300", type: "temps-plein", duree: "10" },
      { uid: "2", salaire: "1000", type: "temps-partiel", duree: "10" }
    ];
    const onDelete = jest.fn();
    const onUpdate = jest.fn();
    const props = { periods, onDelete, onUpdate };
    const { container } = render(<WorkPeriods {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("should call onDelete", () => {
    const periods = [
      { uid: "1", salaire: "1300", type: "temps-plein", duree: "10" },
      { uid: "2", salaire: "1000", type: "temps-partiel", duree: "10" }
    ];
    const onDelete = jest.fn();
    const onUpdate = jest.fn();
    const props = { periods, onDelete, onUpdate };
    const { getByText } = render(<WorkPeriods {...props} />);
    getByText(/supprimer/i).click();
    expect(onDelete).toBeCalledWith({
      uid: "1",
      salaire: "1300",
      type: "temps-plein",
      duree: "10"
    });
  });

  it("should call onChange", () => {
    const periods = [
      { uid: "1", salaire: "1300", type: "temps-plein", duree: "10" },
      { uid: "2", salaire: "1000", type: "temps-partiel", duree: "10" }
    ];
    const onDelete = jest.fn();
    const onEdit = jest.fn();
    const props = { periods, onDelete, onEdit };
    const { getByText } = render(<WorkPeriods {...props} />);
    getByText(/modifier/i).click();
    expect(onEdit).toBeCalledWith({
      uid: "1",
      salaire: "1300",
      type: "temps-plein",
      duree: "10"
    });
  });
});
