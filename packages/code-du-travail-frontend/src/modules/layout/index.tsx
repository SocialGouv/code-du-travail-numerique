import { fr } from "@codegouvfr/react-dsfr";
import { Footer } from "./Footer";
import { Header } from "./header";
import { NeedMoreInfo } from "./infos";
import { SkipLinks } from "./SkipLinks";

export const DsfrLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SkipLinks />
      <Header />
      <main className={fr.cx("fr-container")} id="main">
        {children}
      </main>
      <NeedMoreInfo />
      <Footer />
    </>
  );
};
