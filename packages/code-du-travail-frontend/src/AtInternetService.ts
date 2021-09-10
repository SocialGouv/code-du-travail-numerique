import Router from "next/router";

declare const ATInternet: any;

type PageInfo = {
  name: string;
  path: string;
};

class AtInternetService {
  private atTag?: any;

  constructor() {
    try {
      this.atTag = new ATInternet.Tracker.Tag();
    } catch (e) {
      console.error(`Unable to load AT internet.`, e);
    }
  }

  sendPage(data: PageInfo): void {
    this.atTag.page.set(data);
    this.atTag.dispatch();
  }
}

export const ATService = new AtInternetService();

export const initATInternetService = (): void => {
  ATService.sendPage({ name: document.title, path: location.pathname });
  Router.events.on("routeChangeComplete", (path) => {
    const [pathname] = path.split("?");
    // In order to ensure that the page title had been updated,
    // we delayed pushing the tracking to the next tick.
    setTimeout(() => {
      ATService.sendPage({ name: document.title, path: pathname });
    }, 0);
  });
};
