import type Engine from "publicodes";

export declare global {
  interface global {
    engine: Engine;
    __engine__: Engine;
  }
}
