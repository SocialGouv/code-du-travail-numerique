import Link from "next/link";

export default function ForMoreInfo() {
  return (
    <p>
      Pour en savoir plus sur l’indemnité de licenciement et son mode de calcul,
      consultez{" "}
      <Link
        href={`/fiche-service-public/indemnite-de-licenciement-du-salarie-en-cdi`}
      >
        <a>cet article</a>
      </Link>
      .
    </p>
  );
}
