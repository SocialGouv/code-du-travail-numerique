import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "./merger";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class SingletonEnginePublicodes {
  private static readonly instance: Engine;

  private constructor() {
    return new Engine(mergeIndemniteLicenciementModels());
  }

  public static getInstance(): Engine {
    if (!SingletonEnginePublicodes.instance) {
      (SingletonEnginePublicodes as any).instance = new SingletonEnginePublicodes();
    }
    return SingletonEnginePublicodes.instance;
  }
}
