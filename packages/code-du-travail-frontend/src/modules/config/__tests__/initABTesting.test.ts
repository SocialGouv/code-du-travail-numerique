import { ABTestVariant, ABTesting, initABTesting } from "../initABTesting";

describe("initABTesting", () => {
  afterEach(() => {
    jest.resetAllMocks();
    delete (window as any)._paq;
    delete (window as any).__MATOMO_AB_TEST__;
  });

  it("should not send AbTesting::create when pathname is excluded", () => {
    const paqPush = jest.fn();
    (window as any)._paq = { push: paqPush };

    initABTesting("/widgets/foo", [/^\/widgets/]);

    expect(paqPush).not.toHaveBeenCalled();
    expect((window as any).__MATOMO_AB_TEST__).toEqual({
      abTest: ABTesting.SEARCH,
      variant: ABTestVariant.SEARCH_V2,
      isReady: false,
    });
  });

  it("should send AbTesting::create when pathname is not excluded", () => {
    const paqPush = jest.fn();
    (window as any)._paq = { push: paqPush };

    initABTesting("/recherche", [/^\/widgets/]);

    expect(paqPush).toHaveBeenCalledTimes(1);

    const [eventName, config] = (paqPush as jest.Mock).mock.calls[0][0];

    expect(eventName).toBe("AbTesting::create");
    expect(config).toEqual(
      expect.objectContaining({
        name: ABTesting.SEARCH,
        percentage: 100,
      })
    );
  });

  it("should do nothing when window._paq is missing", () => {
    delete (window as any)._paq;

    expect(() => initABTesting("/recherche")).not.toThrow();
    expect((window as any).__MATOMO_AB_TEST__).toBeUndefined();
  });
});
