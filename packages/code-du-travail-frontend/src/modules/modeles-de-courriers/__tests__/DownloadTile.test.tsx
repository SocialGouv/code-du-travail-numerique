import { render } from "@testing-library/react";
import { DownloadTile } from "../components/DownloadTile";

describe("<DownloadTile />", () => {
  it("should render a DownloadTile with a Format displayed", () => {
    const { getByText } = render(
      <DownloadTile
        title="Mon modele"
        filesize={145.8}
        extension={"docx"}
        filename={"mon-fichier.docx"}
      />
    );
    expect(getByText("Format docx - 145.8Ko")).toBeInTheDocument();
  });
});
