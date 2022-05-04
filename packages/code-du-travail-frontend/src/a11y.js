import { ScreenReaderOnly } from "@socialgouv/cdtn-ui";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

import SkipNavLink from "./layout/Header/SkipNavLink";

export function A11y({ initialTitle = "" }) {
  const router = useRouter();
  const [ariaTitle, setAriaTitle] = useState(initialTitle);
  const refTitle = useRef();
  useEffect(() => {
    const routeChangeComplete = () => {
      /**
       * HACK(lionelb):
       * when the callback is called, url from routeChangeComplete
       * and document.title or not in sync. So we use setTimeout
       * to defer the call to retrieve the correct page title
       *
       * Moving the focus after we set Aria-title seems to works better since
       * page title is annouced with aria-live and then focus is moved
       * moving cursor outside the setTimeout seems to skip
       * the aria-live annouvement.
       */
      setTimeout(() => {
        const titleNode = document.querySelector("h1");
        if (titleNode) {
          setAriaTitle(`${titleNode.textContent}`);
        }
        if (refTitle.current) {
          refTitle.current.focus();
        }
      }, 0);
    };
    router.events.on("routeChangeComplete", routeChangeComplete);
    return () => {
      router.events.off("routeChangeComplete", routeChangeComplete);
    };
  }, [router.events]);

  return (
    <>
      <ScreenReaderOnly
        aria-live="polite"
        role="status"
        ref={refTitle}
        tabIndex="-1"
      >
        {ariaTitle}
      </ScreenReaderOnly>
      <SkipNavLink />
    </>
  );
}
