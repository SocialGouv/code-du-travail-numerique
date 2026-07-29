/** @jest-environment jsdom */
import { act, renderHook } from "@testing-library/react";
import { useContentViewTracking } from "../useContentViewTracking";

// jsdom n'implémente pas IntersectionObserver : on le remplace par un mock qui
// capture le callback pour piloter manuellement les entrées d'intersection.
// `jest.useFakeTimers()` fait avancer setTimeout ET Date.now() ensemble, ce qui
// permet de simuler le temps de présence (dwell) de façon déterministe.

type IOEntry = { isIntersecting: boolean; boundingClientRect: { top: number } };

const DWELL = 1000;

describe("useContentViewTracking", () => {
  let ioCallback: ((entries: IOEntry[]) => void) | undefined;
  let ioOptions: IntersectionObserverInit | undefined;
  let observe: jest.Mock;
  let disconnect: jest.Mock;
  let IOConstructor: jest.Mock;
  let visibilityValue: DocumentVisibilityState;

  const renderTracking = (
    options?: Parameters<typeof useContentViewTracking>[2]
  ) => {
    const ref = { current: document.createElement("h2") };
    const onView = jest.fn();
    const view = renderHook(() =>
      useContentViewTracking(ref, onView, { dwellMs: DWELL, ...options })
    );
    return { onView, ...view };
  };

  const fireIO = (isIntersecting: boolean, top = 100) => {
    act(() => {
      ioCallback?.([{ isIntersecting, boundingClientRect: { top } }]);
    });
  };

  const advance = (ms: number) => {
    act(() => {
      jest.advanceTimersByTime(ms);
    });
  };

  const setVisibility = (state: DocumentVisibilityState) => {
    visibilityValue = state;
    act(() => {
      document.dispatchEvent(new Event("visibilitychange"));
    });
  };

  beforeEach(() => {
    jest.useFakeTimers();
    observe = jest.fn();
    disconnect = jest.fn();
    ioCallback = undefined;
    ioOptions = undefined;
    IOConstructor = jest.fn((cb: (entries: IOEntry[]) => void, opts) => {
      ioCallback = cb;
      ioOptions = opts;
      return {
        observe,
        disconnect,
        unobserve: jest.fn(),
        takeRecords: jest.fn(),
      };
    });
    (
      global as unknown as { IntersectionObserver: unknown }
    ).IntersectionObserver = IOConstructor;
    visibilityValue = "visible";
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      get: () => visibilityValue,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
    delete (global as unknown as { IntersectionObserver?: unknown })
      .IntersectionObserver;
  });

  it("émet onView une seule fois après un temps de présence continu", () => {
    const { onView } = renderTracking();

    fireIO(true);
    advance(DWELL - 1);
    expect(onView).not.toHaveBeenCalled();

    advance(1);
    expect(onView).toHaveBeenCalledTimes(1);

    // Aucun second envoi ensuite (one-shot).
    advance(DWELL * 5);
    expect(onView).toHaveBeenCalledTimes(1);
  });

  it("n'émet pas si le contenu n'est jamais entré dans la bande haute", () => {
    const { onView } = renderTracking();

    // Titre visible mais sous la bande (top > bande) → pas de décompte.
    fireIO(false, 500);
    advance(DWELL * 3);
    expect(onView).not.toHaveBeenCalled();
  });

  it("remet le compteur à zéro quand l'utilisateur remonte au-dessus du bloc", () => {
    const { onView } = renderTracking();

    fireIO(true);
    advance(DWELL / 2);

    // Titre repassé sous la bande (top > 0, non intersecté) → reset.
    fireIO(false, 800);
    advance(DWELL); // l'ancien timer a été annulé
    expect(onView).not.toHaveBeenCalled();

    // Nouvelle entrée : il faut de nouveau DWELL complet.
    fireIO(true);
    advance(DWELL - 1);
    expect(onView).not.toHaveBeenCalled();
    advance(1);
    expect(onView).toHaveBeenCalledTimes(1);
  });

  it("continue de compter quand le titre sort par le haut (lecture du contenu)", () => {
    const { onView } = renderTracking();

    fireIO(true);
    advance(DWELL / 2);

    // Titre sorti par le haut (top < 0) : on continue, le timer initial court.
    fireIO(false, -50);
    advance(DWELL / 2);
    expect(onView).toHaveBeenCalledTimes(1);
  });

  it("met en pause quand l'onglet est masqué et reprend au retour (temps cumulé)", () => {
    const { onView } = renderTracking();

    fireIO(true);
    advance(400);

    setVisibility("hidden");
    advance(DWELL * 3); // rien ne tourne pendant l'invisibilité
    expect(onView).not.toHaveBeenCalled();

    setVisibility("visible");
    advance(600 - 1); // 400 + 599 < DWELL
    expect(onView).not.toHaveBeenCalled();
    advance(1); // total cumulé actif = 1000
    expect(onView).toHaveBeenCalledTimes(1);
  });

  it("déconnecte l'observer après l'émission et ne ré-émet pas", () => {
    const { onView } = renderTracking();

    fireIO(true);
    advance(DWELL);
    expect(onView).toHaveBeenCalledTimes(1);
    expect(disconnect).toHaveBeenCalled();

    // Après émission, une nouvelle intersection ne déclenche plus rien.
    fireIO(true);
    advance(DWELL * 2);
    expect(onView).toHaveBeenCalledTimes(1);
  });

  it("ne pose aucun observer quand enabled = false", () => {
    const { onView } = renderTracking({ enabled: false });

    expect(IOConstructor).not.toHaveBeenCalled();
    expect(observe).not.toHaveBeenCalled();
    advance(DWELL * 3);
    expect(onView).not.toHaveBeenCalled();
  });

  it("traduit topBandRatio en rootMargin et borne les valeurs hors plage", () => {
    renderTracking({ topBandRatio: 0.25 });
    expect(ioOptions?.rootMargin).toBe("0px 0px -75% 0px");

    renderTracking({ topBandRatio: 2 }); // borné à 1 → -0%
    expect(ioOptions?.rootMargin).toBe("0px 0px -0% 0px");

    renderTracking({ topBandRatio: 0 }); // borné à 0.01 → -99%
    expect(ioOptions?.rootMargin).toBe("0px 0px -99% 0px");
  });
});
