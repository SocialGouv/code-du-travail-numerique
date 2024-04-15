import {
  getAllContributionsGroupByQuestion,
  getByIdsContributions,
  getGenericContributionsGroupByThemes,
} from "../service";
import { getAllAgreements } from "../../agreements";

describe("Contributions", () => {
  it("getGenericContributions", async () => {
    const result = await getGenericContributionsGroupByThemes();
    expect(result).toMatchSnapshot();
  });

  it("getByIdsContributions", async () => {
    const result = await getByIdsContributions(["eba7a4592f"]);
    expect(result).toMatchSnapshot();
  });

  it("getAllContributions", async () => {
    const agreements = await getAllAgreements();
    const result = await getAllContributionsGroupByQuestion(agreements);
    expect(result).toMatchSnapshot();
  });
});
