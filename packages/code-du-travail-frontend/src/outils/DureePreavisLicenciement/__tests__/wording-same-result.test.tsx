import { DureePreavisLicenciement } from "../index";
import { ui } from "./ui";
import { fireEvent, render, screen } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
        {
          "num": 3239,
          "shortTitle": "shortTitle",
          "id": "id",
          "title": "title",
          "url": "https://www.url.fr",
          "slug": "3239"
        }
        `
);

describe("DureePreavisLicenciement : wording on same result", () => {
  test("Should display a specific message when legal and agreement result are equals", () => {
    render(<DureePreavisLicenciement icon={""} title={""} displayTitle={""} />);
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(screen.getByTestId("seriousMisconduct-non"));
    fireEvent.click(ui.next.get());

    fireEvent.click(screen.getByTestId("disabledWorker-non"));
    fireEvent.click(ui.next.get());

    fireEvent.change(screen.getByTestId("cdt.ancienneté"), {
      target: { value: "43| Plus de 2 ans" },
    });
    fireEvent.click(ui.next.get());

    fireEvent.click(ui.next.get());

    fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
      target: { value: "100| Salariés du particulier employeur" },
    });
    fireEvent.click(ui.next.get());

    fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
      target: { value: "42| 2 ans ou plus" },
    });
    fireEvent.click(ui.next.get());

    expect(
      screen.queryByText(
        /La durée prévue par le code du travail est le même que celle prévue par la convention collective/
      )
    ).toBeInTheDocument();
  });

  test("Should display default message when legal and agreement result are not equals", () => {
    render(<DureePreavisLicenciement icon={""} title={""} displayTitle={""} />);
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(screen.getByTestId("seriousMisconduct-non"));
    fireEvent.click(ui.next.get());

    fireEvent.click(screen.getByTestId("disabledWorker-non"));
    fireEvent.click(ui.next.get());

    fireEvent.change(screen.getByTestId("cdt.ancienneté"), {
      target: { value: "15| Moins de 6 mois" },
    });
    fireEvent.click(ui.next.get());

    fireEvent.click(ui.next.get());

    fireEvent.change(screen.getByTestId("criteria.catégorie professionnelle"), {
      target: { value: "100| Salariés du particulier employeur" },
    });
    fireEvent.click(ui.next.get());

    fireEvent.change(screen.getByTestId("criteria.ancienneté"), {
      target: { value: "42| 2 ans ou plus" },
    });
    fireEvent.click(ui.next.get());

    expect(
      screen.queryByText(
        /Il s’agit de la durée la plus longue entre la durée légale prévue par le Code du travail et la durée conventionnelle prévue par la convention collective/
      )
    ).toBeInTheDocument();
  });
});
