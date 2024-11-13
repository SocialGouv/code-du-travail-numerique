/**
 This component is used to inject the polyfill replace-all for pandacss
 See PR : https://github.com/chakra-ui/panda/pull/2607#issuecomment-2209389462
 See issue : https://github.com/vercel/next.js/discussions/20992
 */
"use client";

import "core-js/features/string/replace-all";

export const PolyfillComponent = () => {
  return <></>;
};
