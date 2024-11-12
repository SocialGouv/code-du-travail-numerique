import { Footer } from "./Footer";
import { Header } from "./header";
import { NeedMoreInfo } from "./infos";
import { SkipLinks } from "./SkipLinks";

type Props = {
  children: React.ReactNode;
  container?: "fr-container" | "fr-container--fluid";
};

export const DsfrLayout = ({ children, container = "fr-container" }: Props) => {
  return (
    <>
      <SkipLinks />
      <Header />
      <main className={container} id="main">
        {children}
      </main>
      <NeedMoreInfo />
      <Footer />
    </>
  );
};
