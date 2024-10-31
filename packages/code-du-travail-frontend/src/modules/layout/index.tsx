import { fr } from "@codegouvfr/react-dsfr";
import { Footer } from "./Footer";
import { Header } from "./header";
import { NeedMoreInfo } from "./infos";
import { SkipLinks } from "./SkipLinks";

type Props = {
  children: React.ReactNode;
  doNotWrapInContainer?: boolean;
};

export const DsfrLayout = (props: Props) => {
  return (
    <>
      <SkipLinks />
      <Header />
      {props.doNotWrapInContainer ? (
        <main id="main">{props.children}</main>
      ) : (
        <main className={fr.cx("fr-container")} id="main">
          {props.children}
        </main>
      )}
      <NeedMoreInfo />
      <Footer />
    </>
  );
};
