import { renderForm } from "../../../../../test/renderForm";
import { AgreementStep } from "../AgreementStep";

describe("<AgreementStep />", () => {
  it("should render", () => {
    const { getAllByRole, queryByText } = renderForm(AgreementStep);

    expect(getAllByRole("radio").length).toBe(2);
    expect(queryByText(/Je ne souhaite pas renseigner/)).toBeNull();
    expect(
      queryByText(/La convention collective est nécessaire pour obtenir/)
    ).toBeInTheDocument();
  });
});
