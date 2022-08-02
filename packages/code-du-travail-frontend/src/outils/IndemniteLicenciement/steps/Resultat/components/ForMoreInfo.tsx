import Link from "next/link";

export default function ForMoreInfo() {
  return (
    <p>
      Pour en savoir plus sur l’indemnité de licenciement et son mode de calcul,
      consultez{" "}
      <Link
        href={`/fiche-service-public/indemnite-de-licenciement-du-salarie-en-cdi`}
        passHref
      >
        <a target="_blank">cet article</a>
      </Link>
      .
    </p>
  );
}
