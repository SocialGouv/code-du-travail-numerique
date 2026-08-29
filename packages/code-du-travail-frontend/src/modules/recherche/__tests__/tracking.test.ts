/** @jest-environment jsdom */
import { renderHook } from "@testing-library/react";
import { sendEvent } from "@socialgouv/matomo-next";
import { useSearchTracking } from "../tracking";
import { MatomoBaseEvent } from "../../analytics/types";

jest.mock("@socialgouv/matomo-next", () => ({
  sendEvent: jest.fn(),
  push: jest.fn(),
}));

const mockSendEvent = sendEvent as jest.MockedFunction<typeof sendEvent>;

describe("emitWidgetSubmitSearchEvent", () => {
  beforeEach(() => jest.clearAllMocks());

  it("envoie la requête telle quelle", () => {
    const { result } = renderHook(() => useSearchTracking());
    result.current.emitWidgetSubmitSearchEvent("congés payés");

    expect(mockSendEvent).toHaveBeenCalledWith({
      category: MatomoBaseEvent.WIDGET_SEARCH,
      action: "submit_search",
      name: "congés payés",
    });
  });

  // Le widget laisse soumettre à vide, et c'est le cas majoritaire. Envoyée
  // telle quelle, la chaîne vide fait jeter le nom de l'event par Matomo : la
  // soumission à vide devient invisible dans les rapports.
  it("étiquette la requête vide au lieu d'envoyer un nom vide", () => {
    const { result } = renderHook(() => useSearchTracking());
    result.current.emitWidgetSubmitSearchEvent("");

    expect(mockSendEvent).toHaveBeenCalledWith({
      category: MatomoBaseEvent.WIDGET_SEARCH,
      action: "submit_search",
      name: "(vide)",
    });
  });
});
