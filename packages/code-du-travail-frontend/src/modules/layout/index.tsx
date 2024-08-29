import { fr } from "@codegouvfr/react-dsfr";
import { Footer } from "./Footer";
import { Header } from "./header";
import { NeedMoreInfo } from "./NeedMoreInfo";

export const DsfrLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className={fr.cx("fr-container")}>{children}</div>
      <NeedMoreInfo />
      <Footer />
    </>
  );
};
