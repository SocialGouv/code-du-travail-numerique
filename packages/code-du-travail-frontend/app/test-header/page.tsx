"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { fr } from "@codegouvfr/react-dsfr";
import { DsfrLayout } from "../../src/dsfr/layout";

function Index() {
  const router = useRouter();
  return (
    <DsfrLayout>
      <section>
        <Link href="/">Accueil with link</Link>
        <button
          onClick={() => {
            console.log("ok");
            router.push("/");
          }}
        >
          Accueil with router
        </button>
        <br />
        <a href="/">Accueil without router</a>
      </section>
      <section>
        example icon :<i className={fr.cx("fr-icon-account-pin-circle-line")} />
      </section>
    </DsfrLayout>
  );
}

export default Index;
