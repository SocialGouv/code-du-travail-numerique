export default function scrollToTop(): void {
  window.scrollTo(0, 0);
  window.parent?.postMessage({ kind: "scroll-to-top" }, "*");
}
