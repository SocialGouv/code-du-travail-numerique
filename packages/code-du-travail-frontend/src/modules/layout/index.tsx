import { fr } from "@codegouvfr/react-dsfr";
import { Footer } from "./Footer";
import { Header } from "./header";
import { NeedMoreInfo } from "./NeedMoreInfo";
import { Feedback } from "./feedback";

export const DsfrLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <Header />
        <main className={fr.cx("fr-container")}>
          {children}
          <Feedback />
        </main>
        <NeedMoreInfo />
        <Footer />
      </body>
    </html>
  );
};
