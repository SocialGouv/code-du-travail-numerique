import { renderForm } from "../../../../../test/renderForm";
import { AgreementStep } from "../AgreementStep";

describe("<AgreementStep />", () => {
  it("should render", () => {
    const { getAllByRole, queryByText } = renderForm(AgreementStep);

    expect(getAllByRole("radio")).toHaveLength(2);
    expect(queryByText(/Je ne souhaite pas renseigner/)).not.toBeInTheDocument();
    expect(
      queryByText(/La convention collective est nécessaire pour obtenir/)
    ).toBeInTheDocument();
  });
});
