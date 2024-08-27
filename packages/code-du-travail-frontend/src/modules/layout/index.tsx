import { Footer } from "./Footer";
import { Header } from "./header";
import { NeedMoreInfo } from "./NeedMoreInfo";

export const DsfrLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="fr-container fr-pb-2w fr-pt-2w">{children}</div>
      <NeedMoreInfo />
      <Footer />
    </>
  );
};
