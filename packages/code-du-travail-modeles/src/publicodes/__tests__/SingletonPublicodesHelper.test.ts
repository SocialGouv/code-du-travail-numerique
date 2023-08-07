import SingletonPublicodesHelper from "../SingletonPublicodesHelper";
import { PublicodesSimulator } from "../types";

describe("SingletonPublicodesHelper", () => {
  describe("getInstance", () => {
    it("should return the same instance for the same simulator and idcc", () => {
      const simulator = PublicodesSimulator.INDEMNITE_LICENCIEMENT;
      const idcc = "1234";
      const instance1 = SingletonPublicodesHelper.getInstance<typeof simulator>(
        simulator,
        idcc
      );
      const instance2 = SingletonPublicodesHelper.getInstance<typeof simulator>(
        simulator,
        idcc
      );
      expect(instance1).toBe(instance2);
    });

    it("should return different instances for different simulators", () => {
      const instance1 =
        SingletonPublicodesHelper.getInstance<PublicodesSimulator.INDEMNITE_LICENCIEMENT>(
          PublicodesSimulator.INDEMNITE_LICENCIEMENT
        );
      const instance2 =
        SingletonPublicodesHelper.getInstance<PublicodesSimulator.PREAVIS_RETRAITE>(
          PublicodesSimulator.PREAVIS_RETRAITE
        );
      expect(instance1).not.toBe(instance2);
    });

    it("should return different instances for different idcc", () => {
      const simulator = PublicodesSimulator.INDEMNITE_LICENCIEMENT;
      const instance1 = SingletonPublicodesHelper.getInstance<typeof simulator>(
        simulator,
        "1234"
      );
      const instance2 = SingletonPublicodesHelper.getInstance<typeof simulator>(
        simulator,
        "5678"
      );
      expect(instance1).not.toBe(instance2);
    });

    it("should throw an error for unsupported simulators", () => {
      expect(() =>
        SingletonPublicodesHelper.getInstance<any>("unsupported" as any)
      ).toThrow("Simulator not supported");
    });
  });
});
