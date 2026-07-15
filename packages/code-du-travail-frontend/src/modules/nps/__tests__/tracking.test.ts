/** @jest-environment jsdom */
import { renderHook } from "@testing-library/react";
import { sendEvent } from "@socialgouv/matomo-next";
import { useNpsEvents } from "../tracking";
import { NpsEvent, NpsTrigger } from "../constants";

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
      category: NpsEvent.DISPLAYED,
      action: NpsTrigger.EXIT_INTENT,
      name: "contribution/conges-payes",
    });
  });

  it("trackRefusal → sendEvent standard (category=refusal)", () => {
    const { result } = renderHook(() => useNpsEvents());
    result.current.trackRefusal(
      NpsTrigger.MAIN,
      "/modeles-de-courriers/lettre-de-demission"
    );
    expect(mockSendEvent).toHaveBeenCalledWith({
      category: NpsEvent.REFUSAL,
      action: NpsTrigger.MAIN,
      name: "modeles-de-courriers/lettre-de-demission",
    });
  });
});
