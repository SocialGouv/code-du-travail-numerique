import { onRouteChangeStart } from "../hooks";
import { push } from "@socialgouv/matomo-next";

jest.mock("@socialgouv/matomo-next", () => {
  return {
    push: jest.fn(),
  };
});

describe("hooks matomo", () => {
  it.each`
    path                                                                                                                  | referrerUrl
    ${"https://code.travail.gouv.fr/outils/indemnite-licenciement?src_url=https://www.service-public.fr"}                 | ${"https://www.service-public.fr"}
    ${"code.travail.gouv.fr/outils/indemnite-licenciement?src_url=https://www.service-public.fr"}                         | ${"https://www.service-public.fr"}
    ${"code.travail.gouv.fr/outils/indemnite-licenciement?src_url=https://service-public.fr/particuliers/vosdroits/F987"} | ${"https://service-public.fr"}
  `("should do something", ({ path, referrerUrl }) => {
    onRouteChangeStart(path);
    expect(push).toHaveBeenCalledWith(["setReferrerUrl", referrerUrl]);
  });
});
