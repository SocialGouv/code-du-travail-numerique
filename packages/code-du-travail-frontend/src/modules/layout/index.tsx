import { PolyfillComponent } from "../config/PolyfillComponent";
import { Footer } from "./footer";
import { Header } from "./header";
import { SkipLinks } from "./SkipLinks";

type Props = {
  children: React.ReactNode;
  container?: "fr-container" | "fr-container--fluid";
};

export const DsfrLayout = ({ children, container = "fr-container" }: Props) => {
  return (
    <>
      <PolyfillComponent />
      <SkipLinks />
      <Header />
      <main className={container} id="main" role="main">
        {children}
      </main>
      <Footer />
    </>
  );
};
