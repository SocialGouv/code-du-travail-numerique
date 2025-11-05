import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactDOMClient from "react-dom/client";
import { getQueriesForElement, prettyDOM } from "@testing-library/dom";
import { act } from "@testing-library/react";

type RenderOptions = {
  container?: HTMLElement;
  baseElement?: HTMLElement;
  hydrate?: boolean;
  wrapper?: React.ComponentType<{ children: React.ReactNode }>;
  reactStrictMode?: boolean;
};

type RenderResult = ReturnType<typeof getQueriesForElement> & {
  container: HTMLElement;
  baseElement: HTMLElement;
  debug: (
    el?: HTMLElement | HTMLElement[],
    maxLength?: number,
    options?: any
  ) => void;
  unmount: () => void;
  rerender: (rerenderUi: React.ReactElement) => void;
  asFragment: () => DocumentFragment;
};

const mountedContainers = new Set<HTMLElement>();
const mountedRootEntries: Array<{
  container: HTMLElement;
  root: any;
}> = [];

function strictModeIfNeeded(
  innerElement: React.ReactElement,
  reactStrictMode?: boolean
): React.ReactElement {
  return reactStrictMode
    ? React.createElement(React.StrictMode, null, innerElement)
    : innerElement;
}

function wrapUiIfNeeded(
  innerElement: React.ReactElement,
  wrapperComponent?: React.ComponentType<{ children: React.ReactNode }>
): React.ReactElement {
  return wrapperComponent
    ? React.createElement(wrapperComponent, null, innerElement)
    : innerElement;
}

/**
 * Creates a legacy root using ReactDOM.render (React 17/18)
 * or falls back to createRoot/hydrateRoot (React 19+)
 */
function createLegacyRoot(container: HTMLElement) {
  // Check if legacy API is available (React 17/18)
  if (typeof (ReactDOM as any).render === "function") {
    return {
      hydrate(element: React.ReactElement) {
        (ReactDOM as any).hydrate(element, container);
      },
      render(element: React.ReactElement) {
        (ReactDOM as any).render(element, container);
      },
      unmount() {
        (ReactDOM as any).unmountComponentAtNode(container);
      },
    };
  }

  // Fallback to concurrent API (React 19+)
  let root: ReactDOMClient.Root | null = null;

  return {
    hydrate(element: React.ReactElement) {
      if (!root) {
        act(() => {
          root = ReactDOMClient.hydrateRoot(container, element);
        });
      } else {
        act(() => {
          root!.render(element);
        });
      }
    },
    render(element: React.ReactElement) {
      if (!root) {
        root = ReactDOMClient.createRoot(container);
      }
      act(() => {
        root!.render(element);
      });
    },
    unmount() {
      if (root) {
        act(() => {
          root!.unmount();
        });
      }
    },
  };
}

function renderRoot(
  ui: React.ReactElement,
  {
    baseElement,
    container,
    hydrate,
    root,
    wrapper: WrapperComponent,
    reactStrictMode,
  }: {
    baseElement: HTMLElement;
    container: HTMLElement;
    hydrate?: boolean;
    root: ReturnType<typeof createLegacyRoot>;
    wrapper?: React.ComponentType<{ children: React.ReactNode }>;
    reactStrictMode?: boolean;
  }
): RenderResult {
  const wrappedUi = strictModeIfNeeded(
    wrapUiIfNeeded(ui, WrapperComponent),
    reactStrictMode
  );

  // Only wrap in act() if using legacy API (React 17/18)
  if (typeof (ReactDOM as any).render === "function") {
    act(() => {
      if (hydrate) {
        root.hydrate(wrappedUi);
      } else {
        root.render(wrappedUi);
      }
    });
  } else {
    // For React 19+, act() is already called inside createLegacyRoot
    if (hydrate) {
      root.hydrate(wrappedUi);
    } else {
      root.render(wrappedUi);
    }
  }

  const queries = getQueriesForElement(baseElement);

  return {
    container,
    baseElement,
    debug: (el = baseElement, maxLength?: number, options?: any) =>
      Array.isArray(el)
        ? el.forEach((e) => console.log(prettyDOM(e, maxLength, options)))
        : console.log(prettyDOM(el, maxLength, options)),
    unmount: () => {
      if (typeof (ReactDOM as any).render === "function") {
        act(() => {
          root.unmount();
        });
      } else {
        root.unmount();
      }
    },
    rerender: (rerenderUi: React.ReactElement) => {
      renderRoot(rerenderUi, {
        container,
        baseElement,
        root,
        wrapper: WrapperComponent,
        reactStrictMode,
        hydrate,
      });
    },
    asFragment: () => {
      if (typeof document.createRange === "function") {
        return document
          .createRange()
          .createContextualFragment(container.innerHTML);
      } else {
        const template = document.createElement("template");
        template.innerHTML = container.innerHTML;
        return template.content;
      }
    },
    ...queries,
  };
}

/**
 * Custom render function that works with both React 17/18 (legacy API) and React 19+ (concurrent API).
 *
 * This function automatically detects the available React API:
 * - React 17/18: Uses ReactDOM.render, ReactDOM.hydrate, ReactDOM.unmountComponentAtNode
 * - React 19+: Uses createRoot and hydrateRoot
 *
 * Use this as a drop-in replacement for render(..., { legacyRoot: true })
 *
 * @param ui - The React element to render
 * @param options - Render options (wrapper, reactStrictMode, hydrate, container, baseElement)
 * @returns RenderResult with container, queries, and utility methods
 *
 * @example
 * ```tsx
 * import { legacyRender } from './legacyRender';
 *
 * // Instead of: render(<MyComponent />, { legacyRoot: true })
 * const { getByText } = legacyRender(<MyComponent />);
 * expect(getByText('Hello')).toBeInTheDocument();
 * ```
 */
export function legacyRender(
  ui: React.ReactElement,
  options: RenderOptions = {}
): RenderResult {
  const {
    container,
    baseElement: baseElementOption,
    hydrate = false,
    wrapper,
    reactStrictMode,
  } = options;

  let baseElement = baseElementOption;
  let containerElement = container;

  if (!baseElement) {
    baseElement = document.body;
  }

  if (!containerElement) {
    containerElement = baseElement.appendChild(document.createElement("div"));
  }

  let root: ReturnType<typeof createLegacyRoot>;

  if (!mountedContainers.has(containerElement)) {
    root = createLegacyRoot(containerElement);

    mountedRootEntries.push({
      container: containerElement,
      root,
    });
    mountedContainers.add(containerElement);
  } else {
    const rootEntry = mountedRootEntries.find(
      (entry) => entry.container === containerElement
    );
    if (rootEntry) {
      root = rootEntry.root;
    } else {
      throw new Error("Root not found for container");
    }
  }

  return renderRoot(ui, {
    container: containerElement,
    baseElement,
    hydrate,
    wrapper,
    root,
    reactStrictMode,
  });
}

/**
 * Cleanup function to unmount all components and remove containers.
 * Call this in your test cleanup (e.g., afterEach).
 *
 * @example
 * ```tsx
 * import { cleanup } from './legacyRender';
 *
 * afterEach(() => {
 *   cleanup();
 * });
 * ```
 */
export function cleanup() {
  mountedRootEntries.forEach(({ root, container }) => {
    if (typeof (ReactDOM as any).render === "function") {
      act(() => {
        root.unmount();
      });
    } else {
      root.unmount();
    }
    if (container.parentNode === document.body) {
      document.body.removeChild(container);
    }
  });
  mountedRootEntries.length = 0;
  mountedContainers.clear();
}
