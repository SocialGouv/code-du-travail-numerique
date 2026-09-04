/** @jest-environment jsdom */
import { renderHook } from "@testing-library/react";
import { sendEvent } from "@socialgouv/matomo-next";
import { useNpsEvents } from "../tracking";
import { NPS_CATEGORY, NpsTrigger } from "../constants";

jest.mock("@socialgouv/matomo-next", () => ({ sendEvent: jest.fn() }));

const mockSendEvent = sendEvent as jest.MockedFunction<typeof sendEvent>;

describe("useNpsEvents", () => {
  beforeEach(() => jest.clearAllMocks());

  it("trackDisplayed → sendEvent standard (category=event, action=trigger, name=chemin)", () => {
    const { result } = renderHook(() => useNpsEvents());
    result.current.trackDisplayed(
      NpsTrigger.EXIT_INTENT,
      "/contribution/conges-payes"
    );
    expect(mockSendEvent).toHaveBeenCalledWith({
      category: NPS_CATEGORY,
      action: `display_${NpsTrigger.EXIT_INTENT}`,
      name: "contribution/conges-payes",
    });
  });

  // Sur la page d'accueil, le chemin se réduit à "" une fois le slash retiré —
  // un nom falsy que Matomo jette. Le widget NPS est présent sur toutes les
  // pages, l'accueil compris.
  it("étiquette la page d'accueil au lieu d'envoyer un nom vide", () => {
    const { result } = renderHook(() => useNpsEvents());
    result.current.trackDisplayed(NpsTrigger.MAIN, "/");
    result.current.trackRefusal(NpsTrigger.MAIN, "/");
    result.current.trackOptOut(NpsTrigger.MAIN, "/");
    expect(mockSendEvent.mock.calls.map(([event]) => event.name)).toEqual([
      "index",
      "index",
      "index",
    ]);
  });

  it("trackRefusal → sendEvent standard (category=refusal)", () => {
    const { result } = renderHook(() => useNpsEvents());
    result.current.trackRefusal(
      NpsTrigger.MAIN,
      "/modeles-de-courriers/lettre-de-demission"
    );
    expect(mockSendEvent).toHaveBeenCalledWith({
      category: NPS_CATEGORY,
      action: `refusal_${NpsTrigger.MAIN}`,
      name: "modeles-de-courriers/lettre-de-demission",
    });
  });
});
