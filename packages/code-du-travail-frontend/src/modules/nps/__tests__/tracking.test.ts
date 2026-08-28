/** @jest-environment jsdom */
import { renderHook } from "@testing-library/react";
import { sendEvent } from "@socialgouv/matomo-next";
import { useNpsEvents } from "../tracking";
import { NpsTrigger } from "../constants";

jest.mock("@socialgouv/matomo-next", () => ({ sendEvent: jest.fn() }));

const mockPathname = jest.fn<string, []>();
jest.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

const mockSendEvent = sendEvent as jest.MockedFunction<typeof sendEvent>;

describe("useNpsEvents", () => {
  beforeEach(() => jest.clearAllMocks());

  // La catégorie n'est plus « nps » en dur : elle vaut le TYPE DE PAGE où
  // l'usager a été sollicité. Un NPS sur une contribution et un NPS sur un
  // modèle de courrier deviennent comparables dans les rapports.
  it("trackDisplayed prend la catégorie de la page et porte le déclencheur en payload", () => {
    mockPathname.mockReturnValue("/contribution/conges-payes");

    const { result } = renderHook(() => useNpsEvents());
    result.current.trackDisplayed(NpsTrigger.EXIT_INTENT);

    expect(mockSendEvent).toHaveBeenCalledWith({
      category: "contribution",
      action: "display_nps",
      name: `{"path":"contribution/conges-payes","trigger":"${NpsTrigger.EXIT_INTENT}"}`,
    });
  });

  it("trackRefusal distingue le refus simple de l'opt-out", () => {
    mockPathname.mockReturnValue("/modeles-de-courriers/lettre-de-demission");

    const { result } = renderHook(() => useNpsEvents());
    result.current.trackRefusal(NpsTrigger.MAIN);
    result.current.trackOptOut(NpsTrigger.MAIN);

    expect(mockSendEvent).toHaveBeenNthCalledWith(1, {
      category: "modeles-de-courriers",
      action: "refuse_nps",
      name: `{"path":"modeles-de-courriers/lettre-de-demission","trigger":"${NpsTrigger.MAIN}"}`,
    });
    expect(mockSendEvent).toHaveBeenNthCalledWith(2, {
      category: "modeles-de-courriers",
      action: "optout_nps",
      name: `{"path":"modeles-de-courriers/lettre-de-demission","trigger":"${NpsTrigger.MAIN}"}`,
    });
  });

  // Le déclencheur suffixait l'action dans l'ancien schéma
  // (`display_exit_intent`, `display_main`…) : une action par déclencheur, donc
  // une action de plus à chaque nouveau déclencheur. Il est désormais en payload.
  it("garde une action unique quel que soit le déclencheur", () => {
    mockPathname.mockReturnValue("/contribution/x");

    const { result } = renderHook(() => useNpsEvents());
    result.current.trackDisplayed(NpsTrigger.EXIT_INTENT);
    result.current.trackDisplayed(NpsTrigger.MAIN);

    const actions = mockSendEvent.mock.calls.map(([event]) => event.action);
    expect(new Set(actions)).toEqual(new Set(["display_nps"]));
  });
});
