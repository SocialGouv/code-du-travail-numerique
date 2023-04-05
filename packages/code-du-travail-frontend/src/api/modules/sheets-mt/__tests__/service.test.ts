import { getSheetsMtService } from "../service";

describe("Sheets MT", () => {
  it("getSheetsMtService", async () => {
    const result = await getSheetsMtService(
      "5-questions-reponses-sur-la-sante-au-travail"
    );
    expect(result).toMatchSnapshot();
  });
});
