"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { Container } from "../layout/Container";
import { useEffect, useState } from "react";
import { useNeedMoreInfoEvents } from "../layout/footer/infos/tracking";
import Image from "next/image";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { css } from "@styled-system/css";
import { Alert } from "@codegouvfr/react-dsfr/Alert";
import {
  getServiceInfo,
  ServiceRenseignement,
} from "./data/servicesDeRenseignement";
import Link from "../common/Link";

export const BesoinPlusInformations = () => {
  const [department, setDepartment] = useState<string>("");
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [inputRef, setInputRef] = useState<HTMLInputElement | null>();
  const [linkRef, setLinkRef] = useState<HTMLAnchorElement | null>();
  const [result, setResult] = useState<undefined | ServiceRenseignement>(
    undefined
  );
  const { emitTrackNumber } = useNeedMoreInfoEvents();

  const onSearchInput = () => {
    const departmentNum = (department.replace(/^0+/, "") || "").toLowerCase();
    const departmentData = getServiceInfo(departmentNum);
    setResult(departmentData);
    setHasSearched(true);
  };

  const onClickLinkPhoneNumber = () => {
    emitTrackNumber();
  };

  useEffect(() => {
    setHasError(hasSearched && !result);
    if (hasError) {
      inputRef?.focus();
    }
  }, [hasSearched, result]);

  useEffect(() => {
    linkRef?.focus();
  }, [linkRef]);
  return (
    <Container>
      <h1 id="mentions-legales" className={fr.cx("fr-mt-0")}>
        Besoin de plus d&apos;informations
      </h1>
      <p className={fr.cx("fr-mt-6w", "fr-mb-6w", "fr-text--lg")}>
        Les services du ministère du Travail en région informent, conseillent et
        orientent les salariés et les employeurs du secteur privé sur leurs
        questions en droit du travail.
      </p>

      <section className={fr.cx("fr-mb-6w")}>
        <h2 className={fr.cx("fr-h5", "fr-mb-2w")}>Contact téléphonique</h2>

        <a href="tel:+33806000126" onClick={onClickLinkPhoneNumber}>
          <Image
            src="/static/assets/img/srdt.svg"
            alt="Contactez les services de renseignements au droit du travail au 0806 000 126, service gratuit en plus du prix d'un appel"
            width={350}
            height={100}
          />
        </a>
      </section>
      <section className={fr.cx("fr-mb-6w")}>
        <h2 className={fr.cx("fr-h5", "fr-mb-2w")}>
          Contact par email et prise de rendez-vous
        </h2>
        <Input
          id="search-service"
          label="Saisissez le numéro de votre département"
          stateRelatedMessage={
            <>
              {hasError && (
                <span>
                  Aucun service de renseignement n&apos;a été trouvé pour ce
                  département.
                </span>
              )}
            </>
          }
          state={hasError ? "error" : undefined}
          nativeInputProps={{
            maxLength: 3,
            onChange: (e) => setDepartment(e.target.value),
            onKeyDown: (e) => {
              if (e.key === "Enter") {
                onSearchInput();
              }
            },
            "aria-invalid": hasError ? true : undefined,
            ref: setInputRef,
          }}
          addon={
            <Button
              iconId="fr-icon-search-line"
              data-testid="button-search-service"
              onClick={onSearchInput}
              title="Lancer la recherche par numéro de département"
            />
          }
          classes={{
            nativeInputOrTextArea: inputCss,
          }}
        />
        {result && (
          <Link
            className={fr.cx("fr-link")}
            href={result.url}
            target="_blank"
            data-testid="result-search-service"
            ref={setLinkRef}
          >
            {result.url}
          </Link>
        )}
      </section>
      <Alert
        severity={"info"}
        small
        description={
          <>
            <p className={fr.cx("fr-mb-2w", "fr-text--lg")}>
              Attention, ces services délivrent une information juridique, ils
              ne sont pas compétents pour :
            </p>
            <ul>
              <li className={fr.cx("fr-mb-0", "fr-text--lg")}>
                les demandes d&apos;intervention en entreprise
              </li>
              <li className={fr.cx("fr-mb-0", "fr-text--lg")}>
                la constitution des dossiers prud’homaux
              </li>
              <li className={fr.cx("fr-mb-0", "fr-text--lg")}>
                les calculs de droit au chômage
              </li>
              <li className={fr.cx("fr-mb-0", "fr-text--lg")}>
                vous renseigner sur les cotisations sociales
              </li>
            </ul>
          </>
        }
      ></Alert>
    </Container>
  );
};

const inputCss = css({
  maxWidth: "280px",
});
