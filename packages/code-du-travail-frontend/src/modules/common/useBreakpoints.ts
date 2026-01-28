import { useState, useEffect } from "react";

const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1248,
  "2xl": 1536,
} as const;

type BreakpointKey = keyof typeof breakpoints;

type BreakpointState = {
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  is2xl: boolean;
  width: number;
  isBelow: (breakpoint: BreakpointKey) => boolean;
  isAbove: (breakpoint: BreakpointKey) => boolean;
};

/**
 * Hook to detect and track screen breakpoints
 * @returns {BreakpointState} Object containing breakpoint states and helper functions
 *
 * @example
 * const { isMd, isBelow } = useBreakpoints();
 *
 * // Check if screen is mobile (below md breakpoint)
 * if (isBelow('md')) {
 *   // Render mobile view
 * }
 *
 * // Check if screen is at md breakpoint or above
 * if (isMd) {
 *   // Render desktop view
 * }
 */
export const useBreakpoints = (): BreakpointState => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isBelow = (breakpoint: BreakpointKey): boolean => {
    return width < breakpoints[breakpoint];
  };

  const isAbove = (breakpoint: BreakpointKey): boolean => {
    return width >= breakpoints[breakpoint];
  };

  return {
    isSm: width >= breakpoints.sm,
    isMd: width >= breakpoints.md,
    isLg: width >= breakpoints.lg,
    isXl: width >= breakpoints.xl,
    is2xl: width >= breakpoints["2xl"],
    width,
    isBelow,
    isAbove,
  };
};
